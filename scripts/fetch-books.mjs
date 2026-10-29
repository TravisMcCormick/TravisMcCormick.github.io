// Builds src/content/books.generated.json from a Goodreads library export.
// Goodreads' shelf RSS feeds started returning 404 in Oct 2026, so the source is
// now data/goodreads_library_export.csv (goodreads.com → My Books → Import and
// export → Export library). Replace that file and push to update the page.
// Runs before every build. On any failure it keeps the previous JSON and still
// exits 0 so the build never breaks.
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const CSV = resolve(here, "../data/goodreads_library_export.csv");
const OUT = resolve(here, "../src/content/books.generated.json");

const EMPTY = { updatedAt: null, currentlyReading: [], read: [], toRead: [] };

// [Exclusive Shelf value, output key]
const SHELVES = [
  ["currently-reading", "currentlyReading"],
  ["read", "read"],
  ["to-read", "toRead"],
];

// Custom Goodreads shelves whose membership tags a book with a boolean flag.
// [shelf name, book flag]
const TAG_SHELVES = [
  ["owned", "owned"],
  ["audiobooks", "audiobook"],
];

async function readExisting() {
  try {
    return { ...EMPTY, ...JSON.parse(await readFile(OUT, "utf8")) };
  } catch {
    return { ...EMPTY };
  }
}

// Quoted-field CSV parser (titles and reviews can hold commas, quotes, newlines).
function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else quoted = false;
      } else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(field); field = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(field); rows.push(row); row = []; field = "";
    } else field += ch;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function toIso(value) {
  if (!value) return null;
  const d = new Date(value.replace(/\//g, "-"));
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

// ISBNs arrive wrapped like ="0439023483"; empty ones as =""
const digits = (v) => (v || "").replace(/[^\dX]/gi, "");

// Amazon's cover URLs take ISBN-10, the export mostly has ISBN-13
function isbn10(isbn) {
  if (isbn.length === 10) return isbn;
  if (isbn.length !== 13 || !isbn.startsWith("978")) return "";
  const body = isbn.slice(3, 12);
  const sum = [...body].reduce((s, c, i) => s + (10 - i) * Number(c), 0);
  const check = (11 - (sum % 11)) % 11;
  return body + (check === 10 ? "X" : check);
}

// Only the columns the page needs are read, so reviews / private notes in a
// future export never reach the generated JSON.
function mapRow(r, col) {
  const isbn = digits(r[col["ISBN13"]]) || digits(r[col["ISBN"]]);
  const shelves = (r[col["Bookshelves"]] || "").split(",").map((s) => s.trim());
  const book = {
    id: r[col["Book Id"]],
    title: r[col["Title"]],
    author: r[col["Author"]],
    cover: null,
    rating: Number(r[col["My Rating"]]) || 0,
    readAt: toIso(r[col["Date Read"]]),
    addedAt: toIso(r[col["Date Added"]]),
    link: `https://www.goodreads.com/book/show/${r[col["Book Id"]]}`,
    owned: false,
    audiobook: false,
  };
  for (const [shelf, flag] of TAG_SHELVES) book[flag] = shelves.includes(shelf);
  return { book, isbn, shelf: r[col["Exclusive Shelf"]] };
}

// ----- covers (the export has none) -----
// previous JSON (keeps the Goodreads covers the RSS era saved) → Amazon by
// ISBN → Apple Books search. Found covers land in the JSON, so each book is
// only looked up once.

async function amazonCover(isbn) {
  const i10 = isbn10(isbn);
  if (!i10) return null;
  const url = `https://images-na.ssl-images-amazon.com/images/P/${i10}.01.L.jpg`;
  try {
    const res = await fetch(url);
    const size = (await res.arrayBuffer()).byteLength;
    return res.ok && size > 1000 ? url : null; // "no image" is a 43-byte 1×1 gif
  } catch {
    return null;
  }
}

// "The Storm (H2O) by Virginia Bergin" → "The Storm"
const searchTitle = (t) =>
  t.replace(/\s*\([^()]*\)/g, "").split(/\s+by\s+|:|\s-\s|,/)[0].trim();
const norm = (s) => (s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Same author and a title that matches or starts with ours, else nothing:
// no cover beats the wrong book's cover. Apple allows ~20 searches a minute.
async function appleCover(book) {
  const t = searchTitle(book.title);
  const last = norm(book.author).split(" ").pop();
  const q = new URLSearchParams({
    term: `${t} ${book.author}`, media: "ebook", entity: "ebook", limit: "10",
  });
  try {
    await sleep(3500);
    const res = await fetch(`https://itunes.apple.com/search?${q}`);
    if (!res.ok) return null;
    const mine = ((await res.json()).results ?? []).filter((x) =>
      norm(x.artistName).includes(last),
    );
    const hit =
      mine.find((x) => norm(x.trackName) === norm(t)) ||
      mine.find((x) => norm(x.trackName).startsWith(norm(t)));
    return hit?.artworkUrl100?.replace(/\/\d+x\d+bb\./, "/600x900bb.") ?? null;
  } catch {
    return null;
  }
}

const existing = await readExisting();

let rows;
try {
  rows = parseCsv(await readFile(CSV, "utf8"));
} catch (err) {
  console.warn(`[fetch-books] ${err.message} - keeping previous JSON`);
  await writeFile(OUT, JSON.stringify(existing, null, 2) + "\n");
  process.exit(0);
}

const [head, ...body] = rows;
const col = Object.fromEntries(head.map((name, i) => [name, i]));
const entries = body.filter((r) => r.length > 1).map((r) => mapRow(r, col));

const prevCovers = new Map(
  [...existing.currentlyReading, ...existing.read, ...existing.toRead]
    .filter((b) => b.cover)
    .map((b) => [b.id, b.cover]),
);

const out = { ...EMPTY, updatedAt: new Date().toISOString() };
let looked = 0, missing = 0;
for (const [shelf, key] of SHELVES) {
  const list = entries.filter((e) => e.shelf === shelf);
  for (const e of list) {
    e.book.cover = prevCovers.get(e.book.id) ?? null;
    if (!e.book.cover) {
      looked++;
      e.book.cover = (await amazonCover(e.isbn)) ?? (await appleCover(e.book));
      if (!e.book.cover) missing++;
    }
  }
  out[key] = list
    .map((e) => e.book)
    .sort((a, b) =>
      (b.readAt ?? b.addedAt ?? "").localeCompare(a.readAt ?? a.addedAt ?? ""),
    );
}

await writeFile(OUT, JSON.stringify(out, null, 2) + "\n");
const all = [...out.currentlyReading, ...out.read, ...out.toRead];
const flagged = (flag) => all.filter((b) => b[flag]).length;
console.log(
  `[fetch-books] currentlyReading=${out.currentlyReading.length} ` +
    `read=${out.read.length} toRead=${out.toRead.length} ` +
    `owned=${flagged("owned")} audiobook=${flagged("audiobook")} ` +
    `covers looked up=${looked} still missing=${missing}`,
);
