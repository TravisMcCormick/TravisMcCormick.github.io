// Builds src/content/books.generated.json from the public Goodreads shelf RSS
// feeds. Runs before every build. On any failure it keeps the previous JSON and
// still exits 0 so the build never breaks.
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const SITE_TS = resolve(here, "../src/content/site.ts");
const OUT = resolve(here, "../src/content/books.generated.json");

const PLACEHOLDER = "REPLACE_WITH_YOUR_GOODREADS_ID";
const EMPTY = { updatedAt: null, currentlyReading: [], read: [], toRead: [] };

// [shelf name, sort param, output key]
const SHELVES = [
  ["currently-reading", "date_added", "currentlyReading"],
  ["read", "date_read", "read"],
  ["to-read", "date_added", "toRead"],
];

// Custom Goodreads shelves whose membership tags a book with a boolean flag.
// [shelf name, book flag]
const TAG_SHELVES = [
  ["owned", "owned"],
  ["audiobooks", "audiobook"],
];

async function readUserId() {
  const env = process.env.GOODREADS_USER_ID?.trim();
  if (env) return env;
  const src = await readFile(SITE_TS, "utf8");
  return src.match(/goodreadsUserId:\s*["']([^"']+)["']/)?.[1]?.trim() ?? "";
}

async function readExisting() {
  try {
    return { ...EMPTY, ...JSON.parse(await readFile(OUT, "utf8")) };
  } catch {
    return { ...EMPTY };
  }
}

// Text of <tag>...</tag>, unwrapping CDATA and decoding common entities.
function tag(block, name) {
  const m = block.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`, "i"));
  if (!m) return "";
  return m[1]
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .trim();
}

function toIso(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

function mapItem(block) {
  return {
    id: tag(block, "book_id") || tag(block, "guid"),
    title: tag(block, "title"),
    author: tag(block, "author_name"),
    cover:
      tag(block, "book_large_image_url") ||
      tag(block, "book_image_url") ||
      tag(block, "book_medium_image_url") ||
      null,
    rating: Number(tag(block, "user_rating")) || 0,
    readAt: toIso(tag(block, "user_read_at")),
    addedAt: toIso(tag(block, "user_date_added")) || toIso(tag(block, "pubDate")),
    link: (tag(block, "link") || "").split("?")[0],
    owned: false,
    audiobook: false,
  };
}

async function fetchShelf(userId, shelf, sort) {
  const url =
    `https://www.goodreads.com/review/list_rss/${userId}` +
    `?shelf=${shelf}&sort=${sort}&order=d&per_page=200`;
  const res = await fetch(url, {
    headers: { "User-Agent": "travismccormick.github.io book sync" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const xml = await res.text();
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return items
    .map(mapItem)
    .filter((b) => b.title)
    .sort((a, b) =>
      (b.readAt ?? b.addedAt ?? "").localeCompare(a.readAt ?? a.addedAt ?? ""),
    );
}

// Set of book ids on a custom shelf, used only to tag books on the main shelves.
async function fetchShelfIds(userId, shelf) {
  const books = await fetchShelf(userId, shelf, "date_added");
  return new Set(books.map((b) => b.id));
}

const userId = await readUserId();
const existing = await readExisting();

if (!userId || userId === PLACEHOLDER) {
  console.warn("[fetch-books] Goodreads user id not set - leaving JSON untouched");
  await writeFile(OUT, JSON.stringify(existing, null, 2) + "\n");
  process.exit(0);
}

const out = { ...EMPTY, updatedAt: existing.updatedAt };
let ok = false;

for (const [shelf, sort, key] of SHELVES) {
  try {
    out[key] = await fetchShelf(userId, shelf, sort);
    ok = true;
  } catch (err) {
    out[key] = existing[key] ?? [];
    console.warn(`[fetch-books] ${shelf}: ${err.message} - keeping previous`);
  }
}

// Tag books that also sit on a custom shelf (owned, audiobooks, ...). A shelf
// that fails to fetch falls back to the flags already in the previous JSON.
const allBooks = [...out.currentlyReading, ...out.read, ...out.toRead];
const prevBooks = [
  ...existing.currentlyReading,
  ...existing.read,
  ...existing.toRead,
];
for (const [shelf, flag] of TAG_SHELVES) {
  let ids;
  try {
    ids = await fetchShelfIds(userId, shelf);
  } catch (err) {
    ids = new Set(prevBooks.filter((b) => b[flag]).map((b) => b.id));
    console.warn(`[fetch-books] ${shelf}: ${err.message} - keeping previous`);
  }
  for (const b of allBooks) b[flag] = ids.has(b.id);
}

if (ok) out.updatedAt = new Date().toISOString();

await writeFile(OUT, JSON.stringify(out, null, 2) + "\n");
const flagged = (flag) => allBooks.filter((b) => b[flag]).length;
console.log(
  `[fetch-books] currentlyReading=${out.currentlyReading.length} ` +
    `read=${out.read.length} toRead=${out.toRead.length} ` +
    `owned=${flagged("owned")} audiobook=${flagged("audiobook")}`,
);
