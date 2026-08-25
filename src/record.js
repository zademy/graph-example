// Concept Record module: the single source of truth for what the panel
// shows about a concept. Curated records win; everything else falls back
// to a record derived from the graph.
//
// `status` and `unlocks` are always derived — a curated record can never
// disagree with the map.
import { curated } from "./data.js";
import { graph } from "./graph.js";

function fallback(id) {
  const n = graph.node(id);
  const connected = graph.connected(id);
  const notYet = n?.status === "not yet";
  return {
    desc:`${id.replaceAll("-", " ")} is part of the Spring AI 2.0.1 map. Select connected concepts to follow its prerequisites and unlocks.`,
    evidence:[
      ["This demo can attach real evidence to every concept.","interactive demo"],
      [`Connected to ${connected.length} concepts in the graph.`,`graph relation · local data`]
    ],
    reviewed:notYet ? "not reviewed yet" : "recently",
    introduced:`${(n?.section || "general").toUpperCase()} section · docs.spring.io/spring-ai`,
    cta:notYet ? "Not yet — keep climbing" : `${n?.status || "introduced"}`,
    note:"You can replace this data with whatever your backend delivers."
  };
}

export function record(id) {
  const connected = graph.connected(id);
  return {
    ...(curated[id] || fallback(id)),
    status: graph.node(id)?.status || "introduced",
    unlocks: connected.map(x => x.replaceAll("-", " ")).join(", ") || "—"
  };
}
