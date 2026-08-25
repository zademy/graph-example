import { readFileSync } from "node:fs";
import { expect, test } from "vitest";

const html = readFileSync(`${process.cwd()}/index.html`, "utf8");
const body = html
  .match(/<body>([\s\S]*)<\/body>/)[1]
  .replace(/<script[\s\S]*?<\/script>/g, "");

test("boot renders every concept and the initial panel", async () => {
  document.body.innerHTML = body;
  await import("../app.js");

  expect(document.querySelectorAll("#nodesLayer .node-set").length).toBe(41);
  expect(document.querySelectorAll("#labelsLayer .label").length).toBe(41);
  expect(document.getElementById("traceName").textContent).toBe("variables");
  expect(document.getElementById("statusTag").textContent).toBe("practicing");
});
