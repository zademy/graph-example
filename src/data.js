// Spring AI 2.0.1 — full dataset.
// Concept ids and prerequisite edges follow the official docs vocabulary
// (docs.spring.io/spring-ai/reference, verified 2026-08-25).

export const W = 640;
export const H = 520;

export const SECTION_LABELS = {
  fundamentals: "Fundamentals",
  models: "Chat Models",
  tools: "Tools & Agents",
  rag: "RAG",
  ops: "Ops",
};

export const concepts = [
  // ── Fundamentals ──
  {
    id: "ai-concepts",
    x: 70,
    y: 110,
    status: "understood",
    important: true,
    section: "fundamentals",
  },
  {
    id: "chat-model",
    x: 125,
    y: 195,
    status: "understood",
    important: true,
    review: true,
    section: "fundamentals",
  },
  {
    id: "chat-client",
    x: 195,
    y: 140,
    status: "understood",
    important: true,
    section: "fundamentals",
  },
  {
    id: "prompt-templates",
    x: 100,
    y: 270,
    status: "practicing",
    important: true,
    review: true,
    section: "fundamentals",
  },
  {
    id: "structured-output",
    x: 175,
    y: 320,
    status: "introduced",
    section: "fundamentals",
  },
  {
    id: "multimodality",
    x: 75,
    y: 350,
    status: "not yet",
    section: "fundamentals",
  },

  // ── Chat Models ──
  {
    id: "openai",
    x: 250,
    y: 95,
    status: "practicing",
    important: true,
    section: "models",
  },
  { id: "anthropic", x: 300, y: 140, status: "introduced", section: "models" },
  { id: "bedrock", x: 365, y: 75, status: "not yet", section: "models" },
  { id: "mistral", x: 355, y: 165, status: "not yet", section: "models" },
  { id: "ollama", x: 245, y: 225, status: "not yet", section: "models" },
  { id: "azure-openai", x: 315, y: 215, status: "not yet", section: "models" },
  { id: "google-genai", x: 270, y: 290, status: "not yet", section: "models" },
  { id: "deepseek", x: 395, y: 210, status: "not yet", section: "models" },
  {
    id: "moderation-models",
    x: 345,
    y: 290,
    status: "not yet",
    section: "models",
  },
  { id: "image-models", x: 440, y: 70, status: "not yet", section: "models" },
  { id: "audio-models", x: 460, y: 135, status: "not yet", section: "models" },

  // ── Ops ──
  { id: "observability", x: 560, y: 65, status: "not yet", section: "ops" },
  { id: "evaluation", x: 545, y: 130, status: "not yet", section: "ops" },
  { id: "testing", x: 580, y: 195, status: "not yet", section: "ops" },
  { id: "dev-services", x: 515, y: 235, status: "not yet", section: "ops" },

  // ── Tools & Agents ──
  {
    id: "tool-calling",
    x: 95,
    y: 420,
    status: "introduced",
    important: true,
    section: "tools",
  },
  { id: "agents", x: 70, y: 475, status: "not yet", section: "tools" },
  { id: "advisors", x: 175, y: 445, status: "not yet", section: "tools" },
  { id: "chat-memory", x: 250, y: 430, status: "not yet", section: "tools" },
  { id: "mcp", x: 320, y: 465, status: "not yet", section: "tools" },

  // ── RAG ──
  {
    id: "embeddings",
    x: 500,
    y: 280,
    status: "not yet",
    important: true,
    section: "rag",
  },
  { id: "etl-pipeline", x: 575, y: 305, status: "not yet", section: "rag" },
  {
    id: "vector-store",
    x: 465,
    y: 330,
    status: "not yet",
    important: true,
    section: "rag",
  },
  {
    id: "rag",
    x: 585,
    y: 355,
    status: "not yet",
    important: true,
    section: "rag",
  },
  {
    id: "question-answer-advisor",
    x: 555,
    y: 415,
    status: "not yet",
    section: "rag",
  },
  { id: "pgvector", x: 390, y: 395, status: "not yet", section: "rag" },
  { id: "chroma", x: 455, y: 400, status: "not yet", section: "rag" },
  { id: "redis", x: 525, y: 400, status: "not yet", section: "rag" },
  { id: "milvus", x: 405, y: 465, status: "not yet", section: "rag" },
  { id: "pinecone", x: 475, y: 465, status: "not yet", section: "rag" },
  { id: "qdrant", x: 545, y: 460, status: "not yet", section: "rag" },
];

// Prerequisite edges (A → B), following the official docs' dependency order.
export const edgePairs = [
  // Fundamentals
  ["ai-concepts", "chat-model"],
  ["ai-concepts", "multimodality"],
  ["chat-model", "chat-client"],
  ["chat-client", "prompt-templates"],
  ["chat-client", "structured-output"],
  ["prompt-templates", "structured-output"],

  // Chat Models realize the ChatModel contract
  ["chat-model", "openai"],
  ["chat-model", "anthropic"],
  ["chat-model", "ollama"],
  ["chat-model", "azure-openai"],
  ["chat-model", "google-genai"],
  ["chat-model", "bedrock"],
  ["chat-model", "mistral"],
  ["chat-model", "deepseek"],
  ["chat-model", "moderation-models"],
  ["multimodality", "image-models"],
  ["multimodality", "audio-models"],

  // Tools & Agents
  ["chat-client", "tool-calling"],
  ["chat-client", "advisors"],
  ["advisors", "chat-memory"],
  ["tool-calling", "mcp"],
  ["tool-calling", "agents"],

  // RAG
  ["chat-model", "embeddings"],
  ["embeddings", "vector-store"],
  ["etl-pipeline", "vector-store"],
  ["vector-store", "pgvector"],
  ["vector-store", "chroma"],
  ["vector-store", "redis"],
  ["vector-store", "milvus"],
  ["vector-store", "pinecone"],
  ["vector-store", "qdrant"],
  ["vector-store", "rag"],
  ["rag", "question-answer-advisor"],
  ["advisors", "question-answer-advisor"],

  // Ops
  ["chat-client", "observability"],
  ["chat-client", "evaluation"],
  ["evaluation", "testing"],
  ["testing", "dev-services"],
];

export const zones = [
  { section: "fundamentals", x: 45, y: 58 },
  { section: "models", x: 245, y: 42 },
  { section: "ops", x: 585, y: 35 },
  { section: "tools", x: 135, y: 505 },
  { section: "rag", x: 415, y: 355 },
];

// Curated Concept Records. NOTE: `status` is intentionally absent —
// the concept node is the single source of truth for status — and
// `unlocks` is always derived from the graph.
export const curated = {
  "chat-model": {
    desc: "The ChatModel is the model contract: call(Prompt) and stream(Prompt). Every provider — OpenAI, Anthropic, Ollama… — ships it through its starter.",
    evidence: [
      [
        "Spring AI 2.0.1 (released Aug 21, 2026) targets Java 17 and Spring Boot 4.0.x / 4.1.x.",
        "docs · Getting Started",
      ],
      [
        "Pull the BOM spring-ai-bom, then spring-ai-starter-model-openai — no versions to manage.",
        "docs · Dependency Management",
      ],
    ],
    reviewed: "1 day ago",
    introduced: "Fundamentals · docs.spring.io/spring-ai",
    cta: "Understood — review due",
    note: "Fading concept: explain call() vs stream() once to keep it lit.",
  },
  "chat-client": {
    desc: "The ChatClient offers a fluent API for chatting with AI models. It hides the provider: the same call site works over OpenAI, Anthropic or Ollama.",
    evidence: [
      [
        "Fluent chain: .prompt().user(...).call().content()",
        "docs · Chat Client API",
      ],
      [
        "Swapped the OpenAI starter for Ollama without touching call sites.",
        "observed · session 3",
      ],
    ],
    reviewed: "today",
    introduced: "Fundamentals · docs.spring.io/spring-ai",
    cta: "Understood — stays lit",
    note: "The builder comes from ChatModel — this is the facade you'll use 90% of the time.",
  },
  "prompt-templates": {
    desc: "Prompt templates parameterize your prompts with placeholders, so tone and instructions live in one reusable template instead of every call site.",
    evidence: [
      [
        "System and user templates with {placeholders} via PromptTemplate.",
        "docs · Prompts",
      ],
      [
        "Extracted the house style guide into a shared system template.",
        "observed · session 5",
      ],
    ],
    reviewed: "3 days ago",
    introduced: "Fundamentals · docs.spring.io/spring-ai",
    cta: "Practicing — check-in Thu",
    note: "Two clean check-ins move this to understood.",
  },
  "structured-output": {
    desc: "Structured output turns the model's reply into Java objects: call entity(...) and an OutputConverter generates and validates the JSON schema for you.",
    evidence: [
      [
        "entity(Record.class) behind BeanOutputConverter → JsonSchemaGenerator.",
        "docs · Structured Output",
      ],
      [
        "Parsed a Book[] out of a raw completion without hand-rolling JSON.",
        "observed · session 6",
      ],
    ],
    reviewed: "recently",
    introduced: "Fundamentals · docs.spring.io/spring-ai",
    cta: "Introduced — first pass",
    note: "Pair it with Prompt Templates: the converter appends the schema to the prompt for you.",
  },
  "tool-calling": {
    desc: "Tool calling lets the model invoke your Java methods. In 2.x you register @Tool methods and the ToolCallingAdvisor runs the loop for you.",
    evidence: [
      [
        "FunctionCallback is gone — 2.x uses @Tool and ToolCallback.",
        "docs · Tool Calling",
      ],
      [
        "Wrote a weather @Tool and watched the advisor re-invoke the model.",
        "observed · session 4",
      ],
    ],
    reviewed: "recently",
    introduced: "Tools & Agents · docs.spring.io/spring-ai",
    cta: "Introduced — first pass",
    note: "Up to 40 tools and 150 tool calls per interaction in 2.0.1.",
  },
  "chat-memory": {
    desc: "Chat memory keeps the conversation under a conversationId — mandatory in 2.x. MessageWindowChatMemory is the default windowed store.",
    evidence: [
      [
        "PromptChatMemoryAdvisor removed; use MessageChatMemoryAdvisor.",
        "docs · Chat Memory",
      ],
      [
        "Kept a 10-turn conversation coherent under one conversationId.",
        "observed · session 7",
      ],
    ],
    reviewed: "not reviewed yet",
    introduced: "Tools & Agents · docs.spring.io/spring-ai",
    cta: "Not yet — keep climbing",
    note: "The JDBC store adds a sequence_id column in 2.0 — plan the migration by hand.",
  },
  embeddings: {
    desc: "The EmbeddingModel turns text and Documents into vectors, so similarity becomes arithmetic you can delegate to a vector store.",
    evidence: [
      [
        "embed() returns one vector per document; allEmbeddings() for batches.",
        "docs · Embeddings",
      ],
      [
        "Embedded the handbook once, then queried it by cosine similarity.",
        "observed · session 8",
      ],
    ],
    reviewed: "not reviewed yet",
    introduced: "RAG · docs.spring.io/spring-ai",
    cta: "Not yet — keep climbing",
    note: "Prefix per provider in 2.x: spring.ai.openai.embedding.model.",
  },
  rag: {
    desc: "Retrieval Augmented Generation: fetch relevant context from a vector store and append it to the user's prompt, so the model answers from your data.",
    evidence: [
      [
        "The QuestionAnswerAdvisor fetches relevant context and appends it to the prompt.",
        "docs · RAG",
      ],
      [
        "Grounded answers in our handbook chunks; invented facts dropped to zero.",
        "observed · session 8",
      ],
    ],
    reviewed: "not reviewed yet",
    introduced: "RAG · docs.spring.io/spring-ai",
    cta: "Not yet — keep climbing",
    note: "ETL in, similarity out: this node sits at the end of the retrieval pipeline.",
  },
  mcp: {
    desc: "Model Context Protocol: Spring Boot starters expose your @Tool methods as an MCP server, or consume external tools as an MCP client.",
    evidence: [
      [
        "Annotations moved to org.springframework.ai.mcp.annotation in 2.x.",
        "docs · MCP upgrade notes",
      ],
      [
        "Served the same weather tool over MCP and HTTP without rewriting it.",
        "observed · session 9",
      ],
    ],
    reviewed: "not reviewed yet",
    introduced: "Tools & Agents · docs.spring.io/spring-ai",
    cta: "Not yet — keep climbing",
    note: "MCP SDK 2.0 options are immutable: mutate() instead of copy().",
  },
};
