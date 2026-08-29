import { useMemo, useState } from "react";
import {
  BookOpen,
  Star,
  MagnifyingGlass,
  Sparkle,
  ArrowSquareOut,
} from "@phosphor-icons/react";

import { PageMeta } from "../components/PageMeta";
import { PageHeader } from "../components/PageHeader";
import {
  AnchorButton,
  Container,
  ExternalLink,
  Panel,
  Reveal,
  SectionTitle,
  cx,
} from "../components/primitives";
import { goodreadsProfileUrl, goodreadsShelfUrl } from "../content/site";
import { booksData, type Book } from "../content/books";

const RECOMMENDATIONS_URL = "https://www.goodreads.com/recommendations";

const dateFmt = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" });

function monthYear(iso: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : dateFmt.format(d);
}

/** Author surname for the primary sort. */
function surname(author: string) {
  const parts = author.trim().split(/\s+/);
  return (parts[parts.length - 1] || author).toLowerCase();
}

// Goodreads titles carry series info as a trailing "(Series Name, #N)".
const SERIES_RE = /\(([^()]+?),?\s*#(\d+(?:\.\d+)?)\)\s*$/;

function seriesOf(title: string) {
  const m = title.match(SERIES_RE);
  return m ? { name: m[1].trim().toLowerCase(), num: parseFloat(m[2]) } : null;
}

/**
 * Sort by author surname, then group by series (ordered by series name, then
 * by number within it). Standalone books sort by title, interleaved with the
 * series alphabetically by their name.
 */
function compareBooks(a: Book, b: Book) {
  const byAuthor = surname(a.author).localeCompare(surname(b.author));
  if (byAuthor) return byAuthor;

  const sa = seriesOf(a.title);
  const sb = seriesOf(b.title);
  const groupA = sa?.name ?? a.title.toLowerCase();
  const groupB = sb?.name ?? b.title.toLowerCase();
  const byGroup = groupA.localeCompare(groupB);
  if (byGroup) return byGroup;

  const byNumber = (sa?.num ?? 0) - (sb?.num ?? 0);
  if (byNumber) return byNumber;

  return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
}

type Section = {
  id: string;
  label: string;
  kicker: string;
  books: Book[];
  showDate: boolean;
  shelf: "currently-reading" | "read" | "to-read";
};

export default function Books() {
  const { currentlyReading, read, toRead, updatedAt } = booksData;
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const sift = (list: Book[]) =>
    [...list]
      .sort(compareBooks)
      .filter(
        (b) => !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q),
      );

  const current = useMemo(() => sift(currentlyReading), [currentlyReading, q]);
  const readList = useMemo(() => sift(read), [read, q]);
  const toReadList = useMemo(() => sift(toRead), [toRead, q]);

  const sections: Section[] = [
    { id: "currently-reading", label: "Currently Reading", kicker: "01", books: current, showDate: false, shelf: "currently-reading" },
    { id: "read", label: "Read", kicker: "02", books: readList, showDate: true, shelf: "read" },
    { id: "want-to-read", label: "Want to Read", kicker: "03", books: toReadList, showDate: false, shelf: "to-read" },
  ];
  const visible = sections.filter((s) => s.books.length > 0);

  const nothingSynced =
    currentlyReading.length === 0 && read.length === 0 && toRead.length === 0;
  const noMatches = !nothingSynced && visible.length === 0;

  return (
    <>
      <PageMeta
        title="Books"
        description="Books Travis McCormick is reading, has read, and wants to read, synced automatically from Goodreads."
      />
      <PageHeader
        kicker="CAT ~/READING/*"
        title="Books"
        intro="What I'm reading now, what I've finished, and what's next, sorted by author and synced from Goodreads so this stays current on its own."
        actions={
          <AnchorButton
            href={RECOMMENDATIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            <Sparkle size={15} weight="fill" />
            Goodreads recommendations
          </AnchorButton>
        }
      />

      {visible.length > 1 && (
        <div className="sticky top-16 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
          <Container>
            <nav className="flex flex-wrap gap-2 py-3" aria-label="Jump to shelf">
              {visible.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-full border border-border px-3 py-1 font-mono text-xs text-ink-dim transition-colors hover:border-border-bright hover:text-ink"
                >
                  {s.label} <span className="text-ink-faint">{s.books.length}</span>
                </a>
              ))}
            </nav>
          </Container>
        </div>
      )}

      <Container className="py-14">
        {nothingSynced ? (
          <Reveal>
            <Panel className="p-8 text-center">
              <BookOpen size={24} className="mx-auto text-accent" weight="duotone" />
              <p className="mx-auto mt-3 max-w-[44ch] text-sm text-ink-dim">
                This page syncs from my Goodreads shelves and rebuilds daily. Nothing has
                synced yet.
              </p>
              <ExternalLink
                href={goodreadsProfileUrl}
                className="mt-4 inline-flex items-center gap-1.5 text-sm"
              >
                Goodreads profile <ArrowSquareOut size={13} />
              </ExternalLink>
            </Panel>
          </Reveal>
        ) : (
          <div className="space-y-14">
            <div className="relative max-w-sm">
              <MagnifyingGlass
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title or author"
                aria-label="Search books"
                className="w-full rounded-full border border-border bg-surface-2 py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
              />
            </div>

            {noMatches ? (
              <p className="text-sm text-ink-dim">
                No books match <span className="text-ink">&ldquo;{query}&rdquo;</span>.
              </p>
            ) : (
              visible.map((s) => (
                <Shelf
                  key={s.id}
                  id={s.id}
                  kicker={s.kicker}
                  title={s.label}
                  books={s.books}
                  showDate={s.showDate}
                />
              ))
            )}

            <p className="text-xs text-ink-faint">
              synced from Goodreads
              {updatedAt && ` · updated ${monthYear(updatedAt) ?? "recently"}`} ·{" "}
              <ExternalLink href={goodreadsShelfUrl("currently-reading")} className="text-xs">
                currently reading
              </ExternalLink>{" "}
              ·{" "}
              <ExternalLink href={goodreadsShelfUrl("read")} className="text-xs">
                read
              </ExternalLink>{" "}
              ·{" "}
              <ExternalLink href={goodreadsShelfUrl("to-read")} className="text-xs">
                want to read
              </ExternalLink>{" "}
              ·{" "}
              <ExternalLink href={RECOMMENDATIONS_URL} className="text-xs">
                recommendations
              </ExternalLink>{" "}
              ·{" "}
              <ExternalLink href={goodreadsProfileUrl} className="text-xs">
                profile
              </ExternalLink>
            </p>
          </div>
        )}
      </Container>
    </>
  );
}

function Shelf({
  id,
  kicker,
  title,
  books,
  showDate,
}: {
  id: string;
  kicker: string;
  title: string;
  books: Book[];
  showDate: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-32">
      <SectionTitle kicker={kicker}>
        {title}
        <span className="ml-3 align-middle font-mono text-sm font-normal text-ink-faint">
          {books.length}
        </span>
      </SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book, i) => (
          <Reveal key={book.id || book.title} delay={Math.min(i, 8) * 0.03}>
            <BookCard book={book} showDate={showDate} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BookCard({ book, showDate }: { book: Book; showDate: boolean }) {
  const read = showDate ? monthYear(book.readAt) : null;

  return (
    <a
      href={book.link || goodreadsProfileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      <Panel interactive className="flex h-full gap-4 p-4">
        <div className="h-[108px] w-[72px] shrink-0 overflow-hidden rounded-md border border-border bg-surface-2">
          {book.cover ? (
            <img
              src={book.cover}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="grid h-full w-full place-items-center text-ink-faint">
              <BookOpen size={20} />
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-col">
          <h3 className="text-sm font-semibold leading-snug text-ink">{book.title}</h3>
          <p className="mt-0.5 text-sm text-ink-dim">{book.author}</p>

          {(book.rating > 0 || read) && (
            <div className="mt-auto flex items-center gap-2 pt-3">
              {book.rating > 0 && (
                <span
                  className="flex items-center gap-0.5"
                  aria-label={`${book.rating} out of 5`}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={12}
                      weight={i < book.rating ? "fill" : "regular"}
                      className={cx(i < book.rating ? "text-accent" : "text-ink-faint")}
                    />
                  ))}
                </span>
              )}
              {read && <span className="font-mono text-[11px] text-ink-faint">{read}</span>}
            </div>
          )}
        </div>
      </Panel>
    </a>
  );
}
