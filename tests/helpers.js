import { readFileSync } from "node:fs";

export function loadPage() {
  const html = readFileSync(`${process.cwd()}/index.html`, "utf8");
  document.body.innerHTML = html
    .match(/<body>([\s\S]*)<\/body>/)[1]
    .replace(/<script[\s\S]*?<\/script>/g, "");
}
