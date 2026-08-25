// Graph module: owns concept adjacency (prerequisite relations).
// Interface: node(id), neighbors(id), ids(), all(), sectionOf(id).
import { concepts, edgePairs } from "./data.js";

const byId = new Map(concepts.map(n => [n.id, n]));
const adjacency = new Map(concepts.map(n => [n.id, new Set()]));

for (const [a, b] of edgePairs) {
  const na = adjacency.get(a);
  const nb = adjacency.get(b);
  if (na && nb) {
    na.add(b);
    nb.add(a);
  }
}

export const graph = {
  node: id => byId.get(id),
  neighbors: id => new Set(adjacency.get(id) ?? []),
  connected: id => [...(adjacency.get(id) ?? [])],
  ids: () => concepts.map(n => n.id),
  sectionOf: id => byId.get(id)?.section
};
