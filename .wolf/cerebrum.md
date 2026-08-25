---
description: learned preferences, project conventions, and Do-Not-Repeat rules
budget_tokens: 2000
---
# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-08-25

## User Preferences

- El usuario valida UI con capturas: usar Playwright MCP para navegar/capturar y Z-AI Vision MCP para interpretarlas.
- Comunicación en español.

## Key Learnings

- **Project:** graph-example
- Ancho real de los labels del grafo ≈ 3.32 px/char en unidades viewBox (medido por DOM, Inter ~9px). Usar 3.82 px/char (+15%) al planificar posiciones.
- Los labels HTML se posicionan con % de W/H; si W/H de data.js cambia, el viewBox del SVG y aspect-ratio de .graph-wrap deben coincidir.
- .stage tiene overflow:hidden — todo label que exceda el viewBox se corta (causa del bug-006).
- Theming dual dark/light: CSS `stop-color` con clase en `<stop>` pisa el atributo SVG; los fills de nodos van por clases `st-*` en CSS (render.js ya no setea fill/stroke inline). localStorage es undefined en el jsdom de vitest — siempre acceso defensivo (try/catch + `?.`).
- El hook de OpenWolf reformatea archivos JS/JSON tras escribirlos (Prettier-like): no asumir el formato exacto de un oldString entre sesiones; releer antes de editar.
- Contraste WCAG mínimo para gráficos = 3.0: validar fills de nodos vs color de stage con fórmula de luminancia relativa ANTES de aceptar una paleta (los "not yet" originales daban 1.38 dark / 1.51 light).
- getComputedStyle sobre fills SVG con var() puede devolver el valor viejo en el mismo tick del cambio de data-theme; medir tras await/setTimeout (artefacto, no bug).
- Labels a 11.5px ≈ 4.3 px/char: con offsets -13/12px sigue sin colisiones en viewBox 640x520.

## Do-Not-Repeat

- [2026-08-25] Colocar nodos cerca del borde derecho/inferior sin calcular el half-width de su label (len × 3.82 / 2) — provoca texto cortado.

## Decision Log

- [2026-08-25] **Paleta Banamex** sobre tema oscuro: fondo navy #060B16 derivado del azul institucional #104B84; understood=coral #F0704F y practicing=turquesa #1BA8A0 (nueva identidad 2024); review ring=rojo #EC2023. Se conservó la semántica "más cálido = más aprendido".
- [2026-08-25] **ViewBox 640x520**: área extra da margen anti-corte a labels largos (question-answer-advisor) sin romper tests (ningún test depende de coordenadas).
- [2026-08-25] **Modo claro por vars CSS** (no por JS): `<html data-theme>` + override de ~50 vars; colores de nodos movidos de render.js a clases CSS para que el toggle sea instantáneo sin re-render. Light usa azul institucional #104B84 como acento y coral #D9532B para texto (contraste AA sobre blanco).
