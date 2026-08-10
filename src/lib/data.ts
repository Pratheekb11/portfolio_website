export const PLAYER = {
  handle: "PRATHEEK B",
  callsign: "pratheek",
  class: "GEN AI ENGINEER",
  spec: "Agentic systems · LLM infrastructure",
  location: "Bengaluru, IN",
  email: "bpratheek633@gmail.com",
  linkedin: "https://linkedin.com/in/bpratheek",
  github: "https://github.com/Pratheekb11",
  bio:
    "I look for the friction before I look for the tool. Inconsistent agent outputs, slow doc search, messy design-to-code handoffs. I find where teams lose time, then ship the fix they actually keep using.",
  // headline numbers, verified against the CV
  stats: [
    { label: "DEVS SERVED", value: 250, suffix: "+", note: "VS Code extension installs" },
    { label: "OEM PROGRAMS", value: 10, suffix: "", note: "production deployments" },
    { label: "QUERIES / WK", value: 500, suffix: "+", note: "live RAG pipeline" },
    { label: "TOOL ADOPTION", value: 25, suffix: "%", note: "org-wide lift, Q1 to Q2 2026" },
  ],
};

export type Mission = {
  id: string;
  op: string;
  short: string;
  org: string;
  role: string;
  period: string;
  status: "ACTIVE" | "COMPLETE";
  objective: string;
  engagement: string;
  outcome: string;
  metric: { value: string; label: string };
  stack: string[];
};

/* Experience reads as mission briefings because the source material already
   has that shape: a friction point, the thing built, the measured result. */
export const MISSIONS: Mission[] = [
  {
    id: "m01",
    op: "INSTRUCTION SETS",
    short: "Shared context for every coding agent in the org",
    org: "Bosch Global Software Technologies",
    role: "Gen AI Engineer",
    period: "Jan 2024 to Present",
    status: "ACTIVE",
    objective:
      "Engineers across teams were getting inconsistent Copilot completions. The agents had no shared context on team-specific conventions.",
    engagement:
      "Built and shipped a VS Code extension that auto-fetches domain-specific instruction sets at the point of use, so every agent starts from the same ground truth.",
    outcome:
      "250+ developers on it. Prompt consistency up 90%, agent output accuracy up 50%.",
    metric: { value: "250+", label: "DEVELOPERS" },
    stack: ["VS Code API", "TypeScript", "Azure OpenAI"],
  },
  {
    id: "m02",
    op: "MULTI-AGENT SDLC",
    short: "Review, design and test assist with human gates",
    org: "Bosch Global Software Technologies",
    role: "Gen AI Engineer",
    period: "2024 to Present",
    status: "ACTIVE",
    objective:
      "Design, code and test handoffs moved slowly and inconsistently between teams. Review was the bottleneck nobody owned.",
    engagement:
      "Built a multi-agent SDLC system with Code Review Assist, Design Assist and Unit Test Assist, each with a human-in-the-loop checkpoint at the gate.",
    outcome: "Manual review effort down 35% for adopting teams.",
    metric: { value: "-35%", label: "REVIEW EFFORT" },
    stack: ["LangChain", "LangGraph", "Azure OpenAI"],
  },
  {
    id: "m03",
    op: "LAYERED MEMORY",
    short: "Intent, decisions and deltas that survive long chains",
    org: "Bosch Global Software Technologies",
    role: "Gen AI Engineer",
    period: "2024 to Present",
    status: "ACTIVE",
    objective:
      "Long multi-agent chains kept losing context between steps. Agents acted on stale information and nobody could tell where the drift started.",
    engagement:
      "Designed a layered memory architecture: an immutable intent layer, an append-only decisions log, and delta tracking with reasoning provenance.",
    outcome: "Context-drift errors down 40%, and every decision is now traceable to its source step.",
    metric: { value: "-40%", label: "DRIFT ERRORS" },
    stack: ["Provenance graph", "LangGraph", "Vector DB"],
  },
  {
    id: "m04",
    op: "PRODUCTION RAG",
    short: "Chunking, retrieval and reranking over embedded docs",
    org: "Bosch Global Software Technologies",
    role: "Gen AI Engineer",
    period: "2024 to Present",
    status: "ACTIVE",
    objective:
      "Engineers burned hours hunting through scattered embedded-software documentation, context-switching the whole way.",
    engagement:
      "Deployed a production RAG pipeline covering chunking, retrieval and reranking on Azure OpenAI and vector databases, exposed over REST so any internal tool can call it.",
    outcome: "Manual search time down 40%. Handles 500+ queries a week in production.",
    metric: { value: "500+", label: "QUERIES / WEEK" },
    stack: ["RAG", "Reranking", "FastAPI", "Vector DB"],
  },
  {
    id: "m05",
    op: "TEST DESIGN ENGINE",
    short: "Knowledge-graph-backed test design that learns",
    org: "Bosch Global Software Technologies",
    role: "Gen AI Engineer",
    period: "2024 to Present",
    status: "ACTIVE",
    objective:
      "Manual test design was slow, and quality depended on which reviewer you drew.",
    engagement:
      "Built a knowledge-graph-backed LLM framework for automated test design, with memory and feedback loops that learn from each review round.",
    outcome: "Test design accuracy up 30% across iterations.",
    metric: { value: "+30%", label: "DESIGN ACCURACY" },
    stack: ["Knowledge Graphs", "LLM feedback loops", "Python"],
  },
  {
    id: "m06",
    op: "RELEASE AUTOMATION",
    short: "Where the embedded domain knowledge came from",
    org: "Bosch Global Software Technologies",
    role: "Project Trainee, Embedded Systems and Test Automation",
    period: "Oct 2022 to May 2023",
    status: "COMPLETE",
    objective:
      "Release testing for embedded targets was manual and repeated every cycle.",
    engagement:
      "Automated 300+ release test cases in Python and Perl against real embedded hardware.",
    outcome:
      "The embedded domain knowledge from this run is exactly what made the later RAG and test-design work land with engineers.",
    metric: { value: "300+", label: "TESTS AUTOMATED" },
    stack: ["Python", "Perl", "Embedded"],
  },
];

export type Loadout = {
  id: string;
  name: string;
  tag: string;
  tier: "PRIMARY" | "SECONDARY" | "UTILITY";
  live?: string;
  shot?: string;
  summary: string;
  detail: string[];
  attrs: { label: string; value: number }[];
  kind: string;
  year: string;
  figures: { value: string; label: string }[];
  stack: string[];
  status: string;
};

export const LOADOUTS: Loadout[] = [
  {
    id: "ai-in-five",
    kind: "AI Literacy",
    year: "2026",
    figures: [{ value: "100+", label: "USERS" }, { value: "50+", label: "RECURRING" }, { value: "5 MIN", label: "TO FIRST INSIGHT" }],
    name: "AI IN FIVE",
    tag: "Shipped · Live",
    tier: "PRIMARY",
    live: "https://ai-in-five.vercel.app/",
    shot: "/media/ai-in-five.jpg",
    summary:
      "Most people use a language model daily and have never seen what it does while it answers, so I made them play against one first.",
    detail: [
      "One five-minute game against a real model (DistilGPT-2, read directly), then six short chapters if you want them.",
      "100+ users with 50+ returning. The retention half is the number that matters.",
      "Nothing to sign up for. You play first, you read afterwards.",
    ],
    attrs: [
      { label: "USERS", value: 78 },
      { label: "RETENTION", value: 88 },
      { label: "SHIP SPEED", value: 92 },
    ],
    stack: ["Next.js", "LLM APIs", "Vercel"],
    status: "100+ users · 50+ recurring",
  },
  {
    id: "ooh",
    kind: "Marketplace",
    year: "2024 to now",
    figures: [{ value: "~20", label: "DISCOVERY INTERVIEWS" }, { value: "66", label: "FUNCTIONAL REQS" }, { value: "5", label: "PERSONAS" }],
    name: "OOH MARKETPLACE",
    tag: "Founder-mode · Pre-launch",
    tier: "PRIMARY",
    live: "https://adspace-ooh.vercel.app/",
    shot: "/media/ooh.jpg",
    summary:
      "Advertisers and agencies had no straightforward way to discover and book out-of-home ad space, so I built the marketplace.",
    detail: [
      "Ran ~20 structured discovery interviews to validate the pain before writing a line of code.",
      "Wrote the full PRD solo: 11 sections, 5 personas, 66 functional requirements, C4 architecture.",
      "Then built it full stack, FastAPI on the back and React with Vite on the front, moving between the two as the problem demanded.",
    ],
    attrs: [
      { label: "DISCOVERY", value: 95 },
      { label: "FULL STACK", value: 85 },
      { label: "SCOPE", value: 90 },
    ],
    stack: ["FastAPI", "React", "Vite", "PRD / C4"],
    status: "Iterating toward MVP",
  },
  {
    id: "mutation-obs",
    kind: "Observability",
    year: "2026",
    figures: [{ value: "7", label: "LIVE SIGNALS" }, { value: "100%", label: "PIPELINE INSTRUMENTED" }, { value: "CI", label: "TRIGGERED" }],
    name: "MUTATION OBSERVABILITY",
    tag: "Bosch · In production",
    tier: "SECONDARY",
    summary:
      "Test engineers had no way to tell whether LLM-generated mutants improved real test quality or just added noise.",
    detail: [
      "Observability dashboard on Grafana + Prometheus, backed by OpenTelemetry.",
      "Surfaces token spend, latency, mutation bias, coverage, an LLM trust score, and LLM-as-judge recommendations.",
      "Full pipeline instrumented: a check-in triggers GitHub Actions, which compiles, generates mutants via the Claude API, runs G-Test and logs the results back.",
    ],
    attrs: [
      { label: "SIGNAL", value: 90 },
      { label: "AUTOMATION", value: 88 },
      { label: "DEPTH", value: 82 },
    ],
    stack: ["Grafana", "Prometheus", "OpenTelemetry", "GitHub Actions"],
    status: "Live pipeline",
  },
  {
    id: "sdlc-orchestrator",
    kind: "Agent Pipeline",
    year: "2024 to now",
    figures: [{ value: "4", label: "AGENT STAGES" }, { value: "1", label: "HUMAN GATE" }, { value: "E2E", label: "DESIGN TO CODE" }],
    name: "AGENTIC SDLC ORCHESTRATOR",
    tag: "Bosch · Internal",
    tier: "SECONDARY",
    summary:
      "Closes the gap between a design doc and shipped code, running from design ingestion through code generation and unit testing to a human review gate.",
    detail: [
      "End-to-end multi-agent pipeline with custom orchestration logic.",
      "Human review is a gate, not an afterthought.",
    ],
    attrs: [
      { label: "ORCHESTRATION", value: 92 },
      { label: "COVERAGE", value: 80 },
      { label: "AUTONOMY", value: 75 },
    ],
    stack: ["LangChain", "Azure OpenAI", "Custom orchestration"],
    status: "Running across teams",
  },
  {
    id: "prompt-library",
    kind: "Developer Tool",
    year: "2025",
    figures: [{ value: "50+", label: "ENGINEERS" }, { value: "-45%", label: "PROMPT ITERATION" }, { value: "1", label: "VS CODE PLUGIN" }],
    name: "PROMPT LIBRARY PLUGIN",
    tag: "Bosch · Shipped",
    tier: "UTILITY",
    summary:
      "Traced recurring complaints about bad LLM output quality back to the real cause: everyone was writing their own prompts from scratch.",
    detail: [
      "VS Code plugin adopted by 50+ engineers across the org.",
      "Prompt iteration time down 45%.",
    ],
    attrs: [
      { label: "ADOPTION", value: 76 },
      { label: "TIME SAVED", value: 85 },
      { label: "SIMPLICITY", value: 94 },
    ],
    stack: ["VS Code API", "TypeScript"],
    status: "50+ engineers",
  },
];

export const ARMORY: { group: string; accent: string; items: string[] }[] = [
  {
    group: "AI-NATIVE BUILDING",
    accent: "var(--signal)",
    items: [
      "Claude Code", "Cursor", "Agent orchestration", "MCP servers",
      "Skills-based workflows", "LangChain", "LangGraph", "Copilot Agents",
      "Prompt engineering at scale",
    ],
  },
  {
    group: "ENGINEERING",
    accent: "var(--comms)",
    items: [
      "Python", "FastAPI", "React / Vite", "REST APIs", "RAG",
      "Knowledge Graphs", "Vector DBs", "Azure OpenAI", "AWS Bedrock",
      "Docker", "CI/CD", "Git", "Grafana", "Prometheus", "OpenTelemetry",
    ],
  },
  {
    group: "PRODUCT",
    accent: "var(--sand)",
    items: [
      "Customer discovery", "PRD authoring", "IREB CPRE", "Prototyping",
      "Shipping solo projects", "Driving adoption",
    ],
  },
];

export const CREDENTIALS = [
  { name: "IREB CPRE Foundation Level", meta: "Apr 2026" },
  { name: "Microsoft Azure AI Fundamentals (AZ-900)", meta: "Certified" },
  { name: "ISTQB CTFL", meta: "Certified" },
  { name: "ISTQB Automotive Tester", meta: "Certified" },
  { name: "B.Tech, Electrical and Electronics, REVA University", meta: "2019 to 2023 · CGPA 8.6" },
];

export const OFF_DUTY = [
  {
    id: "cs",
    title: "COUNTER-STRIKE",
    kind: "TACTICAL",
    line: "Utility, timing, and knowing when not to take the fight. Same instincts as system design, on a much faster clock.",
    color: "var(--signal)",
  },
  {
    id: "cod",
    title: "CALL OF DUTY",
    kind: "PACE",
    line: "For the days when the answer is simply to move faster, aim better and stop overthinking it.",
    color: "var(--frag)",
  },
  {
    id: "soccer",
    title: "SOCCER",
    kind: "OFFLINE",
    line: "Ninety minutes with no notifications. Still the best debugger I own.",
    color: "var(--pitch)",
  },
];

export const SECTIONS = [
  { id: "intro", label: "INTRO", n: "00" },
  { id: "work", label: "EXPERIENCE", n: "01" },
  { id: "builds", label: "PROJECTS", n: "02" },
  { id: "stack", label: "SKILLS", n: "03" },
  { id: "beyond", label: "BEYOND WORK", n: "04" },
  { id: "contact", label: "CONTACT", n: "05" },
];
