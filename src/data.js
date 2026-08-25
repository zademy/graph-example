// Spring AI 2.0.1 — seed dataset (tracer slice).
// Concept ids use the official docs vocabulary (EN).

export const W = 570;
export const H = 495;

export const SECTION_LABELS = {
  fundamentals: "Fundamentals",
  models: "Chat Models",
  tools: "Tools & Agents",
  rag: "RAG",
  ops: "Ops"
};

export const concepts = [
  // Fundamentals
  { id:"ai-concepts", x:85, y:140, status:"understood", important:true, section:"fundamentals" },
  { id:"chat-model", x:150, y:210, status:"understood", important:true, review:true, section:"fundamentals" },
  { id:"chat-client", x:225, y:160, status:"understood", important:true, section:"fundamentals" },
  { id:"prompt-templates", x:140, y:300, status:"practicing", important:true, review:true, section:"fundamentals" },
  { id:"structured-output", x:205, y:340, status:"introduced", section:"fundamentals" },
  { id:"multimodality", x:60, y:365, status:"not yet", section:"fundamentals" },

  // Tools & Agents
  { id:"tool-calling", x:300, y:140, status:"introduced", section:"tools" },
  { id:"advisors", x:340, y:230, status:"not yet", section:"tools" },
  { id:"chat-memory", x:330, y:320, status:"not yet", section:"tools" },
  { id:"mcp", x:395, y:170, status:"not yet", section:"tools" },

  // RAG
  { id:"embeddings", x:300, y:410, status:"not yet", section:"rag" },
  { id:"vector-store", x:390, y:370, status:"not yet", section:"rag" },
  { id:"rag", x:470, y:300, status:"not yet", section:"rag" }
];

// Prerequisite edges (A → B), following the official docs' dependency order.
export const edgePairs = [
  ["ai-concepts","chat-model"],
  ["ai-concepts","multimodality"],
  ["chat-model","chat-client"],
  ["chat-client","prompt-templates"],
  ["chat-client","structured-output"],
  ["prompt-templates","structured-output"],
  ["chat-client","tool-calling"],
  ["chat-client","advisors"],
  ["advisors","chat-memory"],
  ["tool-calling","mcp"],
  ["chat-model","embeddings"],
  ["embeddings","vector-store"],
  ["vector-store","rag"]
];

export const zones = [
  { x:55, y:100, label:"FUNDAMENTALS" },
  { x:285, y:95, label:"TOOLS & AGENTS" },
  { x:420, y:465, label:"RAG" }
];

// Curated Concept Records. NOTE: `status` is intentionally absent —
// the concept node is the single source of truth for status.
export const curated = {
  "chat-client":{
    desc:"The ChatClient offers a fluent API for chatting with AI models. It hides the provider: the same call site works over OpenAI, Anthropic or Ollama.",
    evidence:[
      ["Fluent chain: .prompt().user(...).call().content()","docs · Chat Client API"],
      ["Swapped the OpenAI starter for Ollama without touching call sites.","observed · session 3"]
    ],
    reviewed:"today",
    introduced:"Fundamentals · docs.spring.io/spring-ai",
    cta:"Understood — stays lit",
    note:"The builder comes from ChatModel — this is the facade you'll use 90% of the time."
  },
  "tool-calling":{
    desc:"Tool calling lets the model invoke your Java methods. In 2.x you register @Tool methods and the ToolCallingAdvisor runs the loop for you.",
    evidence:[
      ["FunctionCallback is gone — 2.x uses @Tool and ToolCallback.","docs · Tool Calling"],
      ["Wrote a weather @Tool and watched the advisor re-invoke the model.","observed · session 4"]
    ],
    reviewed:"recently",
    introduced:"Tools & Agents · docs.spring.io/spring-ai",
    cta:"Introduced — first pass",
    note:"Up to 40 tools and 150 tool calls per interaction in 2.0.1."
  }
};
