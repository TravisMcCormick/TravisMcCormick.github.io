# Contributing

This is my personal portfolio site, so it isn't an open project in the usual
sense — but fixes are welcome.

**Good to send:** bug reports, broken links, typos, accessibility problems,
build or dependency issues. Open an issue, or a small PR if the fix is obvious.

**Probably not:** new features, redesigns, or content changes. The design and
copy are deliberate; see the design notes in the commit history before proposing
changes there.

## Local setup

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

See [README.md](../README.md) for project layout and where content lives.
Please run `npm run build` before opening a PR so the type-check passes.
