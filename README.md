# graph-example — Spring AI Knowledge Graph

Mapa de conocimiento interactivo de **Spring AI 2.0.1** (37 conceptos, 5 zonas,
prerrequisitos oficiales), inspirado en el estilo visual de Altitude.
Demo sin build: módulos ES nativos + Vitest.

## Correr la página

Los módulos ES requieren servirse por HTTP (`file://` no funciona):

```bash
npm start        # sirve el repo en http://127.0.0.1:4173
```

## Tests

```bash
npm test         # vitest run (jsdom) — 22 tests
```

Suites: `tests/graph.test.js` (adyacencia), `tests/record.test.js`
(records completos, status con fuente única, unlocks = vecinos),
`tests/render.test.js` (render pass único, filtros+selección, teclado),
`tests/smoke.test.js` (boot end-to-end).

## Arquitectura

| Módulo | Interface | Responsabilidad |
|--------|-----------|-----------------|
| `src/graph.js` | `node(id)`, `neighbors(id)` | adyacencia de prerrequisitos, construida una vez |
| `src/record.js` | `record(id)` | dato del panel; curado pisa al fallback; `status` y `unlocks` SIEMPRE derivados |
| `src/render.js` | `render({selected, filter})` | único escritor de todos los canales visuales + panel + conteo |
| `src/data.js` | — | conceptos, edges, zonas y records curados (Spring AI 2.0.1) |
| `app.js` | — | boot: estado + handlers → render |

Spec: [issue #1](https://github.com/zademy/graph-example/issues/1).
