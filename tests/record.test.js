import { describe, expect, test } from "vitest";
import { record } from "../src/record.js";
import { graph } from "../src/graph.js";

describe("Concept Record module", () => {
  test("every concept has a complete record", () => {
    for (const id of graph.ids()) {
      const r = record(id);
      expect(r.status, `${id} status`).toMatch(/understood|practicing|introduced|not yet/);
      expect(r.desc.length, `${id} desc`).toBeGreaterThan(10);
      expect(r.evidence.length, `${id} evidence`).toBeGreaterThan(0);
      expect(r.reviewed, `${id} reviewed`).toBeTruthy();
      expect(r.introduced, `${id} introduced`).toBeTruthy();
      expect(r.cta, `${id} cta`).toBeTruthy();
      expect(r.note, `${id} note`).toBeTruthy();
    }
  });

  test("status has a single source: the concept node, never the curated record", () => {
    // chat-client has a curated record; its status must still come from the node.
    expect(record("chat-client").status).toBe(graph.node("chat-client").status);
    expect(record("chat-client").status).toBe("understood");
  });

  test("curated records win over the fallback", () => {
    expect(record("chat-client").desc).toContain("fluent");
    // fallback wording for an uncurated concept
    expect(record("chroma").desc).toContain("Spring AI");
  });

  test("unlocks list every real neighbor — no silent truncation", () => {
    for (const id of graph.ids()) {
      const neighbors = graph.connected(id);
      const listed = record(id).unlocks
        .split(", ")
        .filter(Boolean)
        .map(x => x.replaceAll(" ", "-"));
      expect(listed, `${id} unlocks`).toEqual(neighbors);
    }
  });

  test("evidence entries are [text, meta] pairs", () => {
    for (const id of graph.ids()) {
      for (const entry of record(id).evidence) {
        expect(entry.length).toBe(2);
        expect(typeof entry[0]).toBe("string");
        expect(typeof entry[1]).toBe("string");
      }
    }
  });
});
