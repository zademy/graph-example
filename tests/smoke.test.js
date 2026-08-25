import { expect, test } from "vitest";
import { loadPage } from "./helpers.js";

test("boot renders every concept and the initial panel", async () => {
  loadPage();
  await import("../app.js");

  expect(document.querySelectorAll("#nodesLayer .node-set").length).toBe(13);
  expect(document.querySelectorAll("#labelsLayer .label").length).toBe(13);
  expect(document.getElementById("traceName").textContent).toBe("chat-client");
  expect(document.getElementById("statusTag").textContent).toBe("understood");
});
