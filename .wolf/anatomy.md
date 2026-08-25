# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-08-25T07:10:15.389Z
> Files: 22 tracked | Anatomy hits: 0 | Misses: 0

> Project structure index. Auto-maintained by OpenWolf hooks and daemon.
> Run `openwolf scan` to generate, or wait for the first Claude Code session.
> Status: Pending initial scan

## ./

- `.gitignore` — Git ignore rules (~16 tok)
- `AGENTS.md` — OpenWolf (~75 tok)
- `app.js` — Boot: owns the app state and routes every interaction through (~196 tok)
- `CLAUDE.md` — OpenWolf (~161 tok)
- `GEMINI.md` — OpenWolf (~75 tok)
- `index.html` — Spring AI Knowledge Graph — Altitude inspired (~4256 tok)
- `package.json` — Node.js package manifest (~46 tok)
- `vitest.config.js` — /*.test.js"] (~45 tok)

## .playwright-mcp/

- `console-2026-08-25T05-59-49-889Z.log` (~40 tok)
- `page-2026-08-25T05-59-50-867Z.yml` (~4268 tok)
- `page-2026-08-25T06-00-02-433Z.yml` — Declares isOverdue (~4405 tok)

## docs/agents/

- `domain.md` — Domain Docs (~484 tok)
- `issue-tracker.md` — Issue tracker: GitHub (~933 tok)

## src/

- `data.js` — Spring AI 2.0.1 — full dataset. (~2857 tok)
- `graph.js` — Graph module: owns concept adjacency (prerequisite relations). (~190 tok)
- `record.js` — Concept Record module: the single source of truth for what the panel (~433 tok)
- `render.js` — render(state): the ONLY writer of the stage's visual channels — (~2186 tok)

## tests/

- `graph.test.js` — Declares ids (~356 tok)
- `helpers.js` — Exports loadPage (~75 tok)
- `record.test.js` — Declares id (~588 tok)
- `render.test.js` — Declares edgeBetween (~1842 tok)
- `smoke.test.js` (~147 tok)
