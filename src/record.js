// Concept Record module: the single source of truth for what the panel
// shows about a concept. Curated records win; everything else falls back
// to a record derived from the graph.
//
// `status` always comes from the concept node and `unlocks` always comes
// from the graph — a curated record can never disagree with the map.
import { curated } from "./data.js";
import { graph } from "./graph.js";

function fallback(id) {
  const n = graph.node(id);
  const connected = [...graph.neighbors(id)].filter(x => x !== id);
  return {
    desc:`${id.replaceAll("-", " ")} is part of the Spring AI 2.0.1 map. Select connected concepts to follow its prerequisites and unlocks.`,
    evidence:[
      ["This demo can attach real evidence to every concept.","interactive demo"],
      [`Connected to ${connected.length} concepts in the graph.`,`graph relation · local data`]
    ],
    reviewed:n?.status === "not yet" ? "not reviewed yet" : "recently",
    introduced:`${(n?.section || "general").toUpperCase()} section · docs.spring.io/spring-ai`,
    cta:n?.status === "not yet" ? "Not yet — keep climbing" : `${n?.status || "introduced"}`,
    note:"You can replace this data with whatever your backend delivers."
  };
}

export function record(id) {
  const connected = [...graph.neighbors(id)].filter(x => x !== id);
  return {
    ...(curated[id] || fallback(id)),
    status: graph.node(id)?.status || "introduced",
    unlocks: connected.slice(0, 4).map(x => x.replaceAll("-", " ")).join(", ") || "—"
  };
}
