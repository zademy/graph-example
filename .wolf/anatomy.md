# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-08-25T12:00:00.113Z
> Files: 26 tracked | Anatomy hits: 0 | Misses: 0

> Project structure index. Auto-maintained by OpenWolf hooks and daemon.
> Run `openwolf scan` to generate, or wait for the first Claude Code session.
> Status: Pending initial scan

## ./

- `.gitignore` — Git ignore rules (~16 tok)
- `AGENTS.md` — OpenWolf (~75 tok)
- `app.js` — Boot: owns the app state and routes every interaction through (~196 tok)
- `CLAUDE.md` — OpenWolf (~161 tok)
- `GEMINI.md` — OpenWolf (~75 tok)
- `index.html` — Spring AI Knowledge Graph — Altitude inspired (~4265 tok)
- `package.json` — Node.js package manifest (~67 tok)
- `README.md` — Project documentation (~339 tok)
- `vitest.config.js` — /*.test.js"] (~45 tok)

## .playwright-mcp/

- `console-2026-08-25T05-59-49-889Z.log` (~40 tok)
- `console-2026-08-25T07-08-06-801Z.log` (~39 tok)
- `page-2026-08-25T05-59-50-867Z.yml` (~4268 tok)
- `page-2026-08-25T06-00-02-433Z.yml` — Declares isOverdue (~4405 tok)
- `page-2026-08-25T07-08-06-929Z.yml` (~1960 tok)
- `page-2026-08-25T07-26-23-577Z.yml` (~2034 tok)

## docs/agents/

- `domain.md` — Domain Docs (~484 tok)
- `issue-tracker.md` — Issue tracker: GitHub (~933 tok)

## src/

- `data.js` — Spring AI 2.0.1 — full dataset. (~3041 tok)
- `graph.js` — Graph module: owns concept adjacency (prerequisite relations). (~198 tok)
- `record.js` — Concept Record module: the single source of truth for what the panel (~404 tok)
- `render.js` — render(state): the ONLY writer of the stage's visual channels — (~2227 tok)

## tests/

- `graph.test.js` — Declares ids (~687 tok)
- `helpers.js` — Exports loadPage, groupOf, labelOf, edgeBetween (~185 tok)
- `record.test.js` — Declares id (~558 tok)
- `render.test.js` — Declares view (~1814 tok)
- `smoke.test.js` (~147 tok)
