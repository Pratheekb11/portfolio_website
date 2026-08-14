import { asset } from "./asset";

export const PLAYER = {
  location: "Bengaluru, IN",
  email: "bpratheek633@gmail.com",
  linkedin: "https://linkedin.com/in/bpratheek",
  github: "https://github.com/Pratheekb11",
  bio:
    "I look for the friction before I look for the tool. Inconsistent agent outputs, slow doc search, messy design-to-code handoffs. I find where teams lose time, then ship the fix they actually keep using."
};

export type Loadout = {
  id: string;
  name: string;
  tag: string;
  live?: string;
  repo?: string;
  shot?: string;
  summary: string;
  detail: string[];
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
    live: "https://ai-in-five.vercel.app/",
    shot: asset("/media/ai-in-five.jpg"),
    summary:
      "Most people use a language model daily and have never seen what it does while it answers, so I made them play against one first.",
    detail: [
      "One five-minute game against a real model (DistilGPT-2, read directly), then six short chapters if you want them.",
      "100+ users with 50+ returning. The retention half is the number that matters.",
      "Nothing to sign up for. You play first, you read afterwards.",
    ],
    stack: ["Next.js", "LLM APIs", "Vercel"],
    status: "100+ users · 50+ recurring",
  },
  {
    id: "nenapu",
    kind: "Agent Memory",
    year: "2026 to now",
    figures: [{ value: "6", label: "BELIEF SIGNALS" }, { value: "0", label: "TOOL CALLS TO RECALL" }, { value: "288", label: "TESTS" }],
    name: "NENAPU",
    tag: "Personal · Work in progress",
    repo: "https://github.com/Pratheekb11/Nenapu",
    shot: asset("/media/nenapu.png"),
    summary:
      "Every agent memory system I tried was write-and-retrieve, so a fact could be stale for months and still come back at full confidence. Nenapu (ನೆನಪು, memory in Kannada) is the memory layer that tracks what a fact rests on and whether recalling it actually helped.",
    detail: [
      "Belief is six signals rather than a number you set: asserted confidence, provenance, decay, a verification command, track record and support. Falsify one fact and the collapse cascades to everything inferred from it.",
      "Nothing declares those dependencies. Recall fact A and write fact B in the same session and B is recorded as resting on A, so a rename that breaks A quietly demotes B too.",
      "It is a layer, not a tool call. Two Claude Code hooks do the work: SessionStart injects what it has learned, Stop reads the finished transcript in the background and extracts the corrections. Cursor and Codex reach the same store over MCP.",
      "Still in progress and openly unfinished. Python on SQLite, one file at ~/.nenapu, credentials redacted upstream of both the model call and the store.",
    ],
    stack: ["Python", "SQLite", "MCP", "Claude Code hooks", "Typer"],
    status: "Work in progress · open source",
  },
  {
    id: "ooh",
    kind: "Marketplace",
    year: "2024 to now",
    figures: [{ value: "~20", label: "DISCOVERY INTERVIEWS" }, { value: "66", label: "FUNCTIONAL REQS" }, { value: "5", label: "PERSONAS" }],
    name: "OOH MARKETPLACE",
    tag: "Founder-mode · Pre-launch",
    live: "https://adspace-ooh.vercel.app/",
    shot: asset("/media/ooh.jpg"),
    summary:
      "Advertisers and agencies had no straightforward way to discover and book out-of-home ad space, so I built the marketplace.",
    detail: [
      "Ran ~20 structured discovery interviews to validate the pain before writing a line of code.",
      "Wrote the full PRD solo: 11 sections, 5 personas, 66 functional requirements, C4 architecture.",
      "Then built it full stack, FastAPI on the back and React with Vite on the front, moving between the two as the problem demanded.",
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
    summary:
      "Test engineers had no way to tell whether LLM-generated mutants improved real test quality or just added noise.",
    detail: [
      "Observability dashboard on Grafana + Prometheus, backed by OpenTelemetry.",
      "Surfaces token spend, latency, mutation bias, coverage, an LLM trust score, and LLM-as-judge recommendations.",
      "Full pipeline instrumented: a check-in triggers GitHub Actions, which compiles, generates mutants via the Claude API, runs G-Test and logs the results back.",
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
    summary:
      "Closes the gap between a design doc and shipped code, running from design ingestion through code generation and unit testing to a human review gate.",
    detail: [
      "End-to-end multi-agent pipeline with custom orchestration logic.",
      "Human review is a gate, not an afterthought.",
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
    summary:
      "Traced recurring complaints about bad LLM output quality back to the real cause: everyone was writing their own prompts from scratch.",
    detail: [
      "VS Code plugin adopted by 50+ engineers across the org.",
      "Prompt iteration time down 45%.",
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
  },
  {
    id: "cod",
    title: "CALL OF DUTY",
    kind: "PACE",
    line: "For the days when the answer is simply to move faster, aim better and stop overthinking it.",
  },
  {
    id: "soccer",
    title: "SOCCER",
    kind: "OFFLINE",
    line: "Ninety minutes with no notifications. Still the best debugger I own.",
  },
  {
    id: "running",
    title: "RUNNING",
    kind: "SOLO",
    line: "Long, boring and repetitive on purpose. Most of my design problems get solved somewhere in the middle of a run.",
  },
  {
    id: "philosophy",
    title: "PHILOSOPHY",
    kind: "READING",
    line: "German and Greek, mostly. Kant and Nietzsche on one side, the Stoics and Aristotle on the other. Old arguments about how to think clearly, which turns out to be the job.",
  },
];

export const SECTIONS = [
  { id: "intro", label: "INTRO", n: "00" },
  { id: "builds", label: "PROJECTS", n: "01" },
  { id: "product", label: "PRODUCT", n: "02" },
  { id: "stack", label: "SKILLS", n: "03" },
  { id: "beyond", label: "BEYOND WORK", n: "04" },
  { id: "contact", label: "CONTACT", n: "05" },
];

/* The product half of the job, evidenced rather than claimed. */
export const PRODUCT = [
  {
    id: "users-first",
    title: "START WITH THE USER",
    lead: "Nothing gets built until I understand who is losing time and why.",
    body:
      "For the OOH marketplace I ran around 20 structured discovery interviews with advertisers and agencies before writing a line of code. At Bosch, every tool I have shipped started as a complaint someone kept repeating in standups.",
    figure: { value: "~20", label: "DISCOVERY INTERVIEWS" },
  },
  {
    id: "write-it-down",
    title: "WRITE IT DOWN FIRST",
    lead: "If I cannot spec it, I do not understand it yet.",
    body:
      "I wrote the full PRD for the marketplace on my own: 11 sections, 5 personas, 66 functional requirements and a C4 architecture. I hold an IREB CPRE certification because requirements work is the part most engineers skip.",
    figure: { value: "66", label: "FUNCTIONAL REQUIREMENTS" },
  },
  {
    id: "adoption",
    title: "ADOPTION IS THE SCORE",
    lead: "Shipping is the halfway mark. People choosing to keep using it is the result.",
    body:
      "250+ developers on the instruction-set extension, 50+ on the prompt library, and a 25% lift in AI tool adoption across the org. AI in Five has 100+ users and 50+ who came back, which is the number I actually watch.",
    figure: { value: "+25%", label: "ORG TOOL ADOPTION" },
  },
];
