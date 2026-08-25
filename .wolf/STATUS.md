---
description: session handoff, regenerate with /handoff when a quest finishes
budget_tokens: 1000
---
# STATUS — graph-example

> Single source of truth for resuming work. Read this FIRST when starting a session.
> Update this file at the end of every work phase so the next `/clear` resumes in 1 read.
> Last updated: 2026-08-25

---

## ✅ Done

- **Contraste de nodos corregido** (2026-08-25): "not yet" dark `#1D3049`→`#587A9F` (1.38→4.13 WCAG) y light `#C6D4E4`→`#7E98B6`; introduced dark `#5B9BD5` / light `#4A7FB5`; practicing dark fill `#14303F` y light `#C9E2DF` con anillo teal `#178A83`. Mínimo gráfico 3.0 cumplido en ambos modos.
- **Tipografía agrandada** (2026-08-25): labels `clamp(9px,1vw,11.5px)` + weight 650 en important; zonas `8.8px`/opacidad .6; offsets marginTop `-13/12px` (render.js). Verificado por DOM: 0 cortes/solapes/sobre-nodo.
- **Modo claro Banamex** (2026-08-25): toggle "Light/Dark mode" en controles con persistencia en localStorage. Arquitectura: todos los colores viven en vars CSS (`:root` dark + `html[data-theme="light"]`); nodos por clases `st-understood/st-practicing/st-introduced/st-notyet`; stops del gradiente solar con clases `.sg-0..3` (CSS `stop-color` pisa el atributo); leyenda con clases; `statusLight` con clase `.off`. Light: fondos blancos `#F5F8FC`/`#FFFFFF`, azul institucional `#104B84` para edges activos/pills, coral oscurecido `#D9532B` para texto, nodes understood `#E8623C` / not-yet `#7E98B6`.
- **Paleta Banamex aplicada** (2026-08-25): azul institucional `#104B84` de fondo/navy, coral terracota `#F0704F` (understood + acentos), turquesa `#1BA8A0` (practicing), azul medio `#4A7FB5` (introduced), rojo Banamex `#EC2023` (review ring). Cambios en `index.html` (CSS vars + gradientes + leyenda), `src/render.js` (statusStyles + statusLight).
- **Redistribución de los 37 nodos**: viewBox 570x495 → 640x520; secciones reagrupadas (Fundamentals columna izq, Chat Models abanico central, Ops arriba-der, Tools abajo-izq, RAG abajo-der en grid 2 filas). 0 colisiones label×label y 0 etiquetas cortadas, verificado por bounding boxes DOM en desktop (1280px) y móvil (390px).
- **Bugs arreglados**: label `question-answer-advisor` cortada en borde derecho (bug-006); favicon 404 (bug-007).
- Tests: 22/22 pasando (`npx vitest run`); interacción verificada con Playwright (selección, filtros all/review/section) y capturas validadas con Z-AI Vision.

---

## 🚀 Next phase

**Goal:** _Posibles mejoras visuales subsecuentes (animación de aristas por sección, dark/light toggle, o leyenda interactiva)._

### Acceptance criteria
1. _<concrete user-visible outcome>_
2. _<...>_

### Files to create / edit
| Type | File | Content |
|---|---|---|
| new | `path/to/file.ts` | _what it does_ |

### Closed decisions
- _<choice + reasoning>_

### Open decisions
- _<question to ask the user before coding>_

---

## 📁 Active architecture

- **Stack:** Vanilla JS (ES modules) + SVG + Vitest/jsdom; servidor estático `python -m http.server 4173`
- **Key tables / modules:** `src/data.js` (37 conceptos, edges, zonas, W/H), `src/graph.js` (adyacencia), `src/render.js` (único escritor visual), `src/record.js`, `app.js` (estado/boostrap)
- **Patterns:** render(state) single-pass; statusStyles dict en render.js; labels HTML sobre SVG posicionados en % de W/H; verificación anti-colisión de labels con px/char ≈ 3.32 (unidades viewBox)

---

## ⚠️ External blockers (don't block coding)

- _<env vars, secrets, external accounts, manual steps>_

---

## 🔧 Useful commands

```bash
# add the most-used commands here so the next session has them ready
```

---

## 📚 References (read IF needed)

- `.wolf/cerebrum.md` — User Preferences + Do-Not-Repeat + Decision Log
- `.wolf/anatomy.md` — token-efficient file index
- `.wolf/buglog.json` — known bugs + fixes
