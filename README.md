# Travis McCormick — Portfolio

Personal site for Travis McCormick, an Embedded Cybersecurity Engineer.
Rebuilt as a React single-page app with a dark, blue-anchored cyber-terminal look.

**Live:** https://travismccormick.github.io

## Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`), design tokens in `src/index.css`
- **Motion** (`motion/react`) for subtle mount + page-transition animation
- **React Router** with a `public/404.html` SPA fallback so deep links work on Pages
- **Phosphor Icons**
- **Geist / Geist Mono**, self-hosted via Fontsource (no external font requests)

No runtime backend. Everything builds to static files.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the built dist/ locally
```

## Project layout

```
src/
  main.tsx            App entry, router + font imports
  App.tsx             Route table
  index.css           Tailwind import + design tokens + base + print styles
  components/
    Layout.tsx        Navbar + Footer shell, scroll reset, page transition
    Navbar.tsx        Sticky nav, single-line desktop, mobile menu
    Footer.tsx
    PageHeader.tsx    Shared page title block
    PageMeta.tsx      Per-route <title> / description / og tags
    BootIntro.tsx     One-per-session terminal boot sequence (home)
    SectionNav.tsx    Sticky side nav with scroll-spy (About, Books)
    primitives.tsx    Container, Panel, Reveal, Badge, buttons, links, Prose
  hooks/
    useKeyboardNav.ts Keyboard shortcuts (h/a/r/c/p/k/s, 1-6, g/b)
  pages/              Home, About, Projects, Resume, Books, Swimming, Contact, NotFound
  content/            All copy and structured data, one file per page
                      (books.generated.json is auto-written, do not edit)
scripts/
  fetch-books.mjs    Goodreads shelves -> books.generated.json (build + monthly cron)
public/
  assets/             headshot.jpg + resume PDFs
  favicon.svg
  404.html            SPA redirect for GitHub Pages
  .nojekyll
```

## Content edits

All text lives in `src/content/`. To update a page, edit its data file — no component
changes needed:

- `now.ts` — the "Now" status strip on the home page (update often)
- `projects.ts`, `resume.ts`, `about.ts`, `swimming.ts` — page content
- `site.ts` — name, links, nav items, keyboard shortcut keys, Goodreads id

## Books page (auto-synced)

`/books` renders `src/content/books.generated.json`, which is regenerated from
the Goodreads **currently-reading**, **read**, and **to-read** shelves by
`scripts/fetch-books.mjs` on every build and on the monthly schedule in the
deploy workflow (1st of the month). It also refreshes on any push, and you can
run it on demand from the Actions tab. The page shows the three shelves in that
order with a sticky side rail (shelf nav + tag key), sorts each by author then
series (standalones by title), has a client-side title/author search, and links
to the Goodreads profile.

Two custom shelves are read as tags, not sections: books on **owned** get a gold
`Books` icon and books on **audiobooks** get a violet `Headphones` icon in the
card's meta row (`text-owned` / `text-audio` tokens in `index.css`). The key
("Owned" / "Audiobook" chips) sits under the shelf nav on desktop, under the
search box otherwise, and doubles as a filter — clicking a chip narrows every
shelf to titles with that tag; both together is an AND, and the shelf grid
re-reveals on each change. Add/remove a flag by shelving the book on Goodreads.
New tag shelves go in `TAG_SHELVES` in `fetch-books.mjs` plus the `Book` type and
card in `src/pages/Books.tsx`.

**Setup is done:** the Goodreads id lives in `site.ts` → `goodreadsUserId`
(the digits in the profile URL). All shelves must stay public. If the id is
cleared, the page falls back to an empty state.

- Manual refresh: Actions tab → "Deploy to GitHub Pages" → "Run workflow".
- Local: `npm run fetch:books` (also runs automatically before `npm run dev`).
- If Goodreads is unreachable at build time, the last good JSON is kept.
- GitHub disables scheduled workflows after 60 days of repo inactivity;
  re-enable from the Actions tab if the monthly sync stops.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`: it builds the site and
publishes `dist/` to GitHub Pages. It also runs monthly to pick up new books.

**One-time setup:** in the repo, go to **Settings → Pages → Build and deployment**
and set **Source** to **GitHub Actions**.

## Keyboard shortcuts

| Key | Action | Key | Action |
| --- | --- | --- | --- |
| `H` | Home | `P` / `4` | Projects |
| `A` / `1` | About | `K` / `5` | Books |
| `R` / `2` | Resume | `S` / `6` | Swimming |
| `C` / `3` | Contact | `G` / `B` | Scroll top / bottom |

## License

© Travis McCormick. All rights reserved.
