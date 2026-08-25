import { beforeEach, describe, expect, test } from "vitest";
import { createGraphView } from "../src/render.js";
import { loadPage } from "./helpers.js";

function edgeBetween(a, b) {
  return document.querySelector(`.edge[data-a="${a}"][data-b="${b}"], .edge[data-a="${b}"][data-b="${a}"]`);
}

beforeEach(() => {
  loadPage();
});

describe("render(state) — the single render pass", () => {
  test("boot: selection, halo, tracing pill, panel and derived count", () => {
    const view = createGraphView(document, { onSelect: () => {} });
    view.render({ selected: "chat-client", filter: "all" });

    expect(document.getElementById("traceName").textContent).toBe("chat-client");
    expect(document.querySelectorAll("#selectionLayer .solar-glow").length).toBe(3);
    // 5 lit (understood or practicing) of 37 total
    expect(document.getElementById("countText").textContent).toBe("5 of 37 concepts on the tree");
    // status has one source: the node, not a curated record
    expect(document.getElementById("statusTag").textContent).toBe("understood");
    expect(document.getElementById("sideName").textContent).toBe("chat-client");
    expect(document.querySelectorAll("#evidence .evidence-item").length).toBeGreaterThan(0);
  });

  test("selection lights connected edges and dims the rest", () => {
    const view = createGraphView(document, { onSelect: () => {} });
    view.render({ selected: "chat-client", filter: "all" });

    expect(edgeBetween("chat-model", "chat-client").classList.contains("active")).toBe(true);
    expect(edgeBetween("chat-client", "prompt-templates").classList.contains("active")).toBe(true);
    expect(edgeBetween("advisors", "chat-memory").classList.contains("dim")).toBe(true);

    const label = id => document.querySelector(`#labelsLayer .label:nth-child(${[...document.getElementById("labelsLayer").children].findIndex(l => l.textContent === id) + 1})`);
    expect(label("chat-model").classList.contains("dim")).toBe(false);
    expect(label("mcp").classList.contains("dim")).toBe(true);
    expect(label("chat-client").classList.contains("active")).toBe(true);
  });

  test("review filter: only review-due concepts (and the selection) stay visible", () => {
    const view = createGraphView(document, { onSelect: () => {} });
    view.render({ selected: "chat-client", filter: "review" });

    const group = id => document.querySelector(`#nodesLayer .node-set[data-id="${id}"]`);
    const label = id => [...document.getElementById("labelsLayer").children].find(l => l.textContent === id);

    // review-due: chat-model, prompt-templates
    expect(group("chat-model").style.opacity).toBe("");
    expect(label("prompt-templates").style.display).toBe("");
    // selection stays visible even though it isn't due
    expect(group("chat-client").style.opacity).toBe("");
    // everything else hides
    expect(group("mcp").style.opacity).toBe("0.08");
    expect(label("rag").style.display).toBe("none");
    expect(document.getElementById("countText").textContent).toBe("2 of 37 concepts due for review");
  });

  test("regression: selecting under a filter keeps visibility coherent (one writer)", () => {
    const view = createGraphView(document, { onSelect: () => {} });
    // section filter over a fundamentals node
    view.render({ selected: "chat-client", filter: "section" });

    const group = id => document.querySelector(`#nodesLayer .node-set[data-id="${id}"]`);
    expect(group("prompt-templates").style.opacity).toBe("");
    expect([".07", "0.08"]).toContain(group("tool-calling").style.opacity);

    // now select a concept from ANOTHER section while the filter holds:
    // it must become visible and the panel must follow — no stale state.
    view.render({ selected: "rag", filter: "section" });
    expect(group("vector-store").style.opacity).toBe("");
    expect(group("ai-concepts").style.opacity).not.toBe("");
    expect(document.getElementById("traceName").textContent).toBe("rag");
    expect(document.getElementById("countText").textContent).toBe("11 of 37 concepts in this section");
    // the previous selection no longer keeps itself visible
    expect(group("chat-client").style.opacity).not.toBe("");
  });

  test("onSelect wires hit-area click and keyboard (Enter and Space)", () => {
    const selected = [];
    const view = createGraphView(document, { onSelect: id => selected.push(id) });
    view.render({ selected: "chat-client", filter: "all" });

    const hit = document.querySelector(`#nodesLayer .node-set[data-id="mcp"] .node-hit`);
    hit.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    hit.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    hit.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true, cancelable: true }));

    expect(selected).toEqual(["mcp", "mcp", "mcp"]);
  });

  test("every concept is focusable with a truthful aria-label", () => {
    createGraphView(document, { onSelect: () => {} });
    const hits = document.querySelectorAll("#nodesLayer .node-hit");
    expect(hits.length).toBe(37);
    for (const hit of hits) {
      expect(hit.getAttribute("tabindex")).toBe("0");
      expect(hit.getAttribute("role")).toBe("button");
      expect(hit.getAttribute("aria-label")).toMatch(/^[a-z0-9-]+, (understood|practicing|introduced|not yet)$/);
    }
  });

  test("panel shows the curated record's evidence and cta", () => {
    const view = createGraphView(document, { onSelect: () => {} });
    view.render({ selected: "tool-calling", filter: "all" });

    const evidence = [...document.querySelectorAll("#evidence .evidence-text")].map(e => e.textContent);
    expect(evidence.some(t => t.includes("@Tool"))).toBe(true);
    expect(document.getElementById("ctaBtn").textContent).toBe("Introduced — first pass");
    expect(document.getElementById("statusTag").textContent).toBe("introduced");
  });

  test("every concept can drive the stage without breaking the render", () => {
    const view = createGraphView(document, { onSelect: () => {} });
    const ids = [...document.querySelectorAll("#nodesLayer .node-set")].map(g => g.dataset.id);
    expect(ids.length).toBe(37);

    for (const id of ids) {
      view.render({ selected: id, filter: "all" });
      expect(document.getElementById("traceName").textContent).toBe(id);
      expect(document.getElementById("countText").textContent).toBe("5 of 37 concepts on the tree");
    }
  });
});
