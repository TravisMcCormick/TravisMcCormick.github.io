/**
 * Fetches the Goodreads "currently-reading", "read", and "to-read" shelf RSS
 * feeds and writes them to src/content/books.generated.json for the /books page.
 *
 * Runs before every build (see package.json "build" script) and on the daily
 * schedule in .github/workflows/deploy.yml, so shelving a book on Goodreads
 * shows up on the site within a day with no commit.
 *
 * Goodreads shut down its API, but shelf RSS feeds still work and need no auth.
 * The only input is the numeric user id, read from src/content/site.ts so there
 * is a single source of truth. If a shelf fails to fetch, the previous data for
 * that shelf is kept. The script always exits 0 so the build never breaks.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const SITE_TS = resolve(here, "../src/content/site.ts");
const OUT = resolve(here, "../src/content/books.generated.json");

const PLACEHOLDER = "REPLACE_WITH_YOUR_GOODREADS_ID";
const EMPTY = { updatedAt: null, currentlyReading: [], read: [], toRead: [] };

// [goodreads shelf name, sort param, key in the output JSON]
const SHELVES = [
  ["currently-reading", "date_added", "currentlyReading"],
  ["read", "date_read", "read"],
  ["to-read", "date_added", "toRead"],
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

/** Pull the text of <tag>...</tag>, unwrapping CDATA and decoding entities. */
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

if (ok) out.updatedAt = new Date().toISOString();

await writeFile(OUT, JSON.stringify(out, null, 2) + "\n");
console.log(
  `[fetch-books] currentlyReading=${out.currentlyReading.length} ` +
    `read=${out.read.length} toRead=${out.toRead.length}`,
);
