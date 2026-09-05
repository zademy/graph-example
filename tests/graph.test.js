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

  test("connected() returns neighbors as an array, self excluded", () => {
    expect(graph.connected("chat-client")).toEqual(expect.arrayContaining(["chat-model", "prompt-templates", "tool-calling"]));
    expect(graph.connected("chat-client")).not.toContain("chat-client");
    expect(graph.connected("nope")).toEqual([]);
  });

  test("the official prerequisite map is present", () => {
    // The mandatory pairs from the spec (issue #1), fixed so content
    // edits can't silently drop a documented dependency.
    const mandatory = [
      ["chat-model", "chat-client"],
      ["chat-client", "prompt-templates"],
      ["chat-client", "structured-output"],
      ["chat-client", "advisors"],
      ["chat-client", "tool-calling"],
      ["advisors", "chat-memory"],
      ["embeddings", "vector-store"],
      ["vector-store", "rag"],
      ["rag", "question-answer-advisor"],
      ["tool-calling", "mcp"]
    ];
    const present = new Set(edgePairs.map(([a, b]) => `${a}|${b}`));
    for (const [a, b] of mandatory) {
      expect(present.has(`${a}|${b}`) || present.has(`${b}|${a}`), `missing official edge ${a}→${b}`).toBe(true);
    }
  });

  test("ids() covers every concept", () => {
    expect(graph.ids().length).toBe(concepts.length);
  });

  test("parents() lists concepts with at least one child, no duplicates", () => {
    const parents = graph.parents();
    const expected = new Set(edgePairs.map(([a]) => a));
    // every id listed actually has a child edge
    for (const id of parents) {
      expect(expected.has(id), `${id} has no child edge`).toBe(true);
    }
    // every id with a child edge is listed
    expect(new Set(parents)).toEqual(expected);
    // stable order, no duplicates
    expect(new Set(parents).size).toBe(parents.length);
    expect(graph.parents()).toEqual(parents);
  });

  test("nextParent() cycles through the parents in order", () => {
    const parents = graph.parents();
    expect(graph.nextParent(parents[0])).toBe(parents[1]);
    expect(graph.nextParent(parents[parents.length - 1])).toBe(parents[0]);
    // a full rotation starting anywhere visits every parent exactly once
    const visited = [];
    let cur = parents[0];
    for (let i = 0; i < parents.length; i++) {
      cur = graph.nextParent(cur);
      visited.push(cur);
    }
    expect(new Set(visited).size).toBe(parents.length);
  });

  test("nextParent() restarts from the first parent for leaf/unknown ids", () => {
    const leaf = concepts.find(n => !graph.parents().includes(n.id)).id;
    expect(graph.nextParent(leaf)).toBe(graph.parents()[0]);
    expect(graph.nextParent("nope")).toBe(graph.parents()[0]);
  });
});
