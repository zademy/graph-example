import { describe, expect, test } from "vitest";
import { graph } from "../src/graph.js";
import { concepts, edgePairs } from "../src/data.js";

describe("graph module", () => {
  test("every edge connects two known concepts", () => {
    const ids = new Set(concepts.map(n => n.id));
    for (const [a, b] of edgePairs) {
      expect(ids.has(a), `unknown endpoint ${a}`).toBe(true);
      expect(ids.has(b), `unknown endpoint ${b}`).toBe(true);
      expect(a).not.toBe(b);
    }
  });

  test("no duplicate concepts", () => {
    const ids = concepts.map(n => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("node() looks concepts up by id", () => {
    expect(graph.node("chat-client").section).toBe("fundamentals");
    expect(graph.node("nope")).toBeUndefined();
  });

  test("neighbors() is symmetric and excludes self", () => {
    expect(graph.neighbors("chat-model").has("chat-client")).toBe(true);
    expect(graph.neighbors("chat-client").has("chat-model")).toBe(true);
    expect(graph.neighbors("chat-client").has("chat-client")).toBe(false);
    expect(graph.neighbors("nope").size).toBe(0);
  });

  test("ids() covers every concept", () => {
    expect(graph.ids().length).toBe(concepts.length);
  });
});
