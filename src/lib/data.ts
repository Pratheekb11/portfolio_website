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
      "Twenty-five short lessons, each one a game you play before anything is explained: a live tokenizer, a decision boundary swinging into place, a threshold sliding through 1,115 real messages.",
      "Nothing is simulated. Every token, weight and probability is computed live by a real model or precomputed by a committed script, with its source recorded.",
      "100+ users with 50+ returning. The retention half is the number that matters.",
      "Nothing to sign up for. You play first, you read afterwards.",
    ],
    stack: ["Next.js", "LLM APIs", "Vercel"],
    status: "100+ users · 50+ recurring",
  },
  {
    id: "liverate",
    kind: "Live Audience Voting",
    year: "2026",
    figures: [{ value: "9", label: "QUESTION TYPES" }, { value: "1.5 S", label: "TO THE BIG SCREEN" }, { value: "400+", label: "TESTS" }],
    name: "LIVERATE",
    tag: "Personal · Live",
    live: "https://liverate-beta.vercel.app/",
    shot: asset("/media/liverate.png"),
    summary:
      "Asking a room what it thinks usually means a sign-up wall for the presenter and an app for the audience. LiveRate needs neither: start as a guest, show a QR code, and the answers land on the big screen as people tap.",
    detail: [
      "Nine question types: rate topics on your own criteria, polls, ranking, numbers, open answers, word clouds, audience Q&A with upvotes, and a timed quiz with a live leaderboard.",
      "Every tap is one SQL statement that upserts on voter and cell, so a changed answer replaces the old one and never counts twice. A queue on the phone retries through dropped connections and reloads.",
      "Anonymous by design: no names, no IPs, voter ids replaced with R1, R2 in exports. Guest presentations delete themselves after 7 days.",
      "AI insights are opt-in per presentation and never touch the voting path, so a guest who ignores them gets exactly the same app.",
    ],
    stack: ["Next.js", "Neon Postgres", "Tailwind", "Gemini", "Vercel"],
    status: "Live",
  },
  {
    id: "nenapu",
    kind: "Agent Memory",
    year: "2026 to now",
    figures: [{ value: "6", label: "BELIEF SIGNALS" }, { value: "0", label: "TOOL CALLS TO RECALL" }, { value: "1,200+", label: "TESTS" }],
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
    id: "founder-copilot",
    kind: "AI Advisor",
    year: "2026",
    figures: [{ value: "999", label: "DEAD STARTUPS" }, { value: "10", label: "ADVICE SOURCES" }, { value: "$0", label: "TO RUN" }],
    name: "FOUNDER COPILOT",
    tag: "Personal · Live",
    live: "https://founders-assist.vercel.app/",
    shot: asset("/media/founder-copilot.png"),
    summary:
      "Founders ask a chatbot whether their idea is good and get encouragement. Founder Copilot answers from the 999 startups that already tried something similar and died.",
    detail: [
      "Each dead startup is embedded locally and tagged with its causes of death, so an idea gets real cause-of-death odds before any model writes a word.",
      "Three modes: assess my idea, find me a dead idea worth rebuilding, and pitch to a skeptical VC who asks one hard question at a time.",
      "Tool-calling agent over the graveyard, a credited advice corpus from 10 sources and live Hacker News demand checks. Runs entirely on free LLM tiers.",
    ],
    stack: ["FastAPI", "fastembed", "Tool-calling LLMs", "OpenRouter / Gemini"],
    status: "Live",
  },
  {
    id: "takedown",
    kind: "Game",
    year: "2026",
    figures: [{ value: "0", label: "LIBRARIES" }, { value: "8", label: "FIGHTS PER ARCADE RUN" }, { value: "3", label: "INPUT TYPES" }],
    name: "TAKE DOWN",
    tag: "Personal · Playable",
    repo: "https://github.com/Pratheekb11/takedown",
    shot: asset("/media/takedown.png"),
    summary:
      "A 1v1 street fighter in the style of 16-bit arcade games, written in plain JavaScript and Canvas with no libraries and no build step.",
    detail: [
      "A Python tool cuts sprite sheets into animation atlases, so adding a fighter means adding a sheet, not writing code.",
      "Arcade mode runs eight fights with scoring, continues and per-fighter stars across three CPU difficulties.",
      "Keyboard, touch and gamepad all drive the same input layer, which is what makes the planned two-player mode a small change.",
    ],
    stack: ["JavaScript", "Canvas", "Python", "PWA"],
    status: "Playable · open source",
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
      "For the OOH marketplace I ran around 20 structured discovery interviews with advertisers and agencies before writing a line of code. LiveRate went guest-first for the same reason: a presenter should be asking the room within seconds, not filling in a sign-up form.",
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
      "AI in Five has 100+ users and 50+ who came back, which is the number I actually watch. LiveRate's audience needs no app and no account, because every extra step costs answers.",
    figure: { value: "50+", label: "RETURNING USERS" },
  },
];
