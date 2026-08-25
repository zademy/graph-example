import { readFileSync } from "node:fs";

export function loadPage() {
  const html = readFileSync(`${process.cwd()}/index.html`, "utf8");
  document.body.innerHTML = html
    .match(/<body>([\s\S]*)<\/body>/)[1]
    .replace(/<script[\s\S]*?<\/script>/g, "");
}

export function groupOf(id) {
  return document.querySelector(`#nodesLayer .node-set[data-id="${id}"]`);
}

export function labelOf(id) {
  return [...document.getElementById("labelsLayer").children].find(l => l.textContent === id);
}

export function edgeBetween(a, b) {
  return document.querySelector(`.edge[data-a="${a}"][data-b="${b}"], .edge[data-a="${b}"][data-b="${a}"]`);
}
