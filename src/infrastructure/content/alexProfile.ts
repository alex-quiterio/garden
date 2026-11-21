import type { Profile } from "@domain/profile";
import type { ProfileSource } from "@application/composePage";

const gh = (repo: string) => `https://github.com/alex-quiterio/${repo}`;
const personalEmail = "alexandre@pm.me";

export const alexProfile: Profile = {
  name: "alex quiterio",
  fullName: "Alex Quiterio",
  role: "Staff Engineer · AI & Distributed Systems",
  greeting: "ola! i'm alex.",
  tagline: "staff engineer, wondering",
  headline:
    "Staff engineer who turns research-grade ideas (AI agents, consensus, autonomy) into software teams can ship and trust.",
  place: "Amsterdam",
  timeZone: "Europe/Amsterdam",
  intro: [
    "I'm a staff engineer at Seenons, building AI factories: agents and skills wired into real workflows, with the guardrails, review loops and tests that make AI-produced software something you can ship.",
    "For fifteen years I've shipped across Rust, TypeScript, Ruby, Java and C++, from product teams to protocol code. To understand how systems hold under load, I build them from scratch: consensus protocols, Byzantine quorums, compilers, and a drone autopilot simulator.",
  ],
  availability: "open to staff+ roles · AI, autonomy, distributed systems",
  actions: {
    primary: { label: "get in touch", url: `mailto:${personalEmail}?subject=Hello%20Alex` },
    secondary: [
      { label: "selected work", url: "#work" },
      { label: "github", url: "https://github.com/alex-quiterio" },
    ],
  },
  stats: [
    { value: "15+", label: "years shipping software" },
    { value: "staff", label: "engineer, AI platform" },
    { value: "20+", label: "systems built from scratch" },
    { value: "6", label: "languages, Rust to Lisp" },
  ],
  facts: ["amsterdam · CET", "rust · typescript · java", "ai agents · consensus · autonomy"],
  sections: [
    {
      id: "impact",
      title: "what i bring",
      intro: "The work I'm hired for, and what a team gets on day one.",
      entries: [
        {
          title: "AI that ships, not demos",
          meta: "agents · skills · MCP · evals",
          body: "I design the factory around the model: agents and skills wired into real workflows, with review loops, tests, cost ledgers and a way to roll back. The result is AI-produced software a team can put in production.",
          points: ["agent pipelines from issue to reviewed PR", "guardrails and sandboxing by default", "every token and decision auditable"],
        },
        {
          title: "systems that hold when things fail",
          meta: "consensus · replication · Kafka · PostgreSQL",
          body: "Fork choice, quorums, replay protection, headers-first sync, peer banning. I've written these protocols myself, so I know where they break and how to keep a system's promises when a node lies or a network splits.",
          points: ["Byzantine fault tolerance", "proof of work and proof of stake", "event-driven data systems"],
        },
        {
          title: "autonomy and real-time control",
          meta: "Rust · planning · simulation",
          body: "Path planning, optic-flow navigation and collision prevention, simulated end to end. I like problems where software has to decide on its own, quickly and safely, with no human in the loop.",
          points: ["A* planning in 3D airspace", "PX4-style collision prevention", "deterministic simulation for testing"],
        },
        {
          title: "technical leadership",
          meta: "staff engineer",
          body: "I set direction across teams, write the design docs and decision logs, and raise the bar through review and pairing. I make the architecture enforce itself, with lint rules for layer boundaries, so the codebase stays readable as it grows.",
          points: ["architecture and design reviews", "mentoring toward senior and staff", "turning research into roadmaps"],
        },
      ],
    },
    {
      id: "work",
      title: "selected work",
      intro: "Built from first principles, each one to understand a hard problem properly.",
      layout: "cards",
      entries: [
        {
          title: "baikonur",
          meta: "personal AI factory",
          body: "Label a GitHub issue and an agent crew triages it, writes a flight plan for you to edit, then builds it and lands a draft PR.",
          points: [
            "every step is a durable Temporal workflow",
            "agents run without credentials",
            "every token spent goes in a ledger",
          ],
          tags: ["TypeScript", "Temporal", "agents"],
        },
        {
          title: "beeline",
          url: gh("beeline"),
          meta: "autonomous drone simulator",
          body: "An autonomous drone flying over a noir city, with planning, navigation and collision avoidance built from scratch.",
          points: ["A* path planning", "bee-inspired optic-flow navigation", "PX4-style collision prevention"],
          tags: ["Rust", "autonomy", "simulation"],
        },
        {
          title: "blockchain-rs",
          url: gh("blockchain-rs"),
          meta: "a cryptocurrency from first principles",
          body: "A full node with a web UI that explains every block it accepts.",
          points: [
            "proof of work and proof of stake",
            "RANDAO beacons and Merkle proofs",
            "gossiping peers, mempool limits, replay protection",
          ],
          tags: ["Rust", "consensus", "p2p"],
        },
        {
          title: "byzantine-quorums",
          url: gh("byzantine-quorums"),
          meta: "Byzantine fault-tolerant replication",
          body: "Five servers walk into a bar and one of them is lying. A replicated mobile-operator system whose servers vote on every answer.",
          points: ["replicated across five servers", "servers vote on every answer", "keeps answering with a lying replica"],
          tags: ["Java", "distributed systems"],
        },
        {
          title: "peekaboo",
          url: gh("peekaboo"),
          meta: "home network security audit",
          body: "A read-only look at what your router and ISP can see. It scores what it can measure and names the three most useful fixes.",
          points: ["read-only by design", "explainable scoring", "plain-language fixes"],
          tags: ["Rust", "security"],
        },
        {
          title: "loopfield",
          url: "https://alex-quiterio.github.io/loopfield/",
          meta: "live · music as code",
          body: "Albums of electronic music written as code. Every song is a short program you can rewrite while it plays.",
          points: ["real-time audio in the browser", "live code editing", "zero install"],
          tags: ["JavaScript", "audio"],
        },
      ],
    },
    {
      id: "experience",
      title: "experience",
      entries: [
        {
          title: "Staff Engineer, Seenons",
          meta: "now · Amsterdam",
          body: "Bringing AI into how software gets designed, reviewed and shipped: agent workflows, internal skills and tooling, and the guardrails that make them safe to rely on.",
        },
        {
          title: "Software engineer, 2011 onward",
          meta: "product teams to protocol code",
          body: "Fifteen years shipping across Rust, TypeScript, Ruby, Java and C++, from product teams to protocol code, building systems that hold under load.",
        },
        {
          title: "Builder, always",
          meta: "open source",
          body: "A cryptocurrency node, a compiler, a Lisp, a drone simulator, a router auditor, a music player written as code, and a growing zoo of pixel creatures.",
        },
      ],
    },
    {
      id: "toolbox",
      title: "toolbox",
      intro: "Chosen for the problem, not the fashion.",
      entries: [
        { title: "languages", meta: "Rust · TypeScript · Ruby · Java · C++ · Lisp", body: "Systems work in Rust, product and tooling in TypeScript, and a decade of Ruby and Java behind both." },
        { title: "data and messaging", meta: "PostgreSQL · Kafka · Temporal", body: "For systems that have to keep their promises when things fail halfway." },
        { title: "AI", meta: "Claude · agents · skills · MCP", body: "Models, agent loops and tool servers, wired in with reviews, tests and a way to roll back." },
        { title: "architecture", meta: "DDD · layered · local-first", body: "Domain-driven layers with lint rules that enforce the direction of dependencies. This site is built that way." },
      ],
    },
    {
      id: "principles",
      title: "how i work",
      entries: [
        { title: "make the invisible visible", body: "Show what the router can see, what the block contains, what the agent did. Trust follows sight." },
        { title: "small enough to read", body: "A Lisp you can read in one sitting, a protocol you can hold in your head. What fits in a head can be fixed." },
        { title: "guardrails before speed", body: "Speed is what you get after the review loops, the tests and the way back are in place." },
        { title: "data stays with the person", body: "Default to the device, ask before the network, and collect nothing the product does not need." },
        { title: "tend, don't just ship", body: "Software is a garden: it wants weeding, pruning and patience long after launch." },
      ],
    },
    {
      id: "projects",
      title: "more projects",
      inMenu: false,
      intro: "Smaller things, mostly open, each built to understand something.",
      entries: [
        {
          title: "daily sky wheel",
          url: "https://alex-quiterio.github.io/daily-sky-wheel/",
          meta: "TypeScript · live",
          body: "The astrology chart for any day and place, drawn live in your browser.",
        },
        {
          title: "precog trend radar",
          url: "https://alex-quiterio.github.io/precog-trend-radar/",
          meta: "Vue · live",
          body: "A personal situation room: pick a channel, get the gist of what is moving in the topics you care about.",
        },
        {
          title: "gatecast",
          url: "https://alex-quiterio.github.io/gatecast/",
          meta: "TypeScript · live",
          body: "Cast your Human Design chart in the browser: BodyGraph, gate wheel, comparisons and meanings. Nothing leaves your device.",
        },
        {
          title: "wayfarer's atlas",
          url: "https://alex-quiterio.github.io/wayfarers-atlas/",
          meta: "JavaScript · live",
          body: "An interactive map of a notebook.",
        },
        {
          title: "lock-guard",
          url: gh("lock-guard"),
          meta: "Swift",
          body: "Tells you if someone touched your Mac while the screen was locked.",
        },
        {
          title: "pixel splat zoo",
          url: gh("pixel-dino-splats"),
          meta: "TypeScript",
          body: "Creatures made of thousands of 3D gaussian splats, rasterised in software at pixel-art resolution. No WebGL.",
        },
        {
          title: "hearth",
          url: gh("hearth"),
          meta: "TypeScript · Claude",
          body: "A local dashboard with Claude in a side panel, running the same agent skills as the terminal.",
        },
        {
          title: "murmuration",
          url: gh("murmuration"),
          meta: "TypeScript",
          body: "Starling murmurations as boids with topological k-nearest neighbours: emergent flight, simulated.",
        },
        {
          title: "mood-tracker",
          url: gh("mood-tracker"),
          meta: "React Native · AI",
          body: "A private mood journal whose data never leaves the device, turning each week into a reflection prompt for Claude.",
        },
        {
          title: "gratitude-trail",
          url: gh("gratitude-trail"),
          meta: "Web",
          body: "A physical gratitude card with a QR code, growing an append-only timeline of everyone who holds it.",
        },
        {
          title: "playgrounds",
          url: gh("playgrounds"),
          meta: "C · Go · Ruby · Prolog · Lisp",
          body: "Small algorithm and language exercises, each with its own tests.",
        },
        {
          title: "smaller experiments",
          url: "https://github.com/alex-quiterio",
          meta: "Lisp · C++ · Rust · Ruby",
          body: "ttinylisp, a Lisp small enough to read in one sitting; At-Compiler, built on Lex and Yacc; chann, experimental channels; repomate, one command to sync a fleet of repos.",
        },
      ],
    },
    {
      id: "writing",
      title: "writing",
      inMenu: false,
      entries: [
        {
          title: "transmissions on Medium",
          url: "https://medium.com/@arielquixote",
          body: "Essays and field notes, written when something has finished growing.",
        },
      ],
    },
    {
      id: "interests",
      title: "beyond work",
      inMenu: false,
      entries: [
        { title: "emergence", body: "How simple local rules become flocks, networks and communities." },
        { title: "music as code", body: "Songs as short programs that loop, build and fall away." },
        { title: "making with hands", body: "Learning stone, wood and soil as slowly as the screen work is fast, with a pull toward rural Portugal." },
        { title: "active hope", body: "Choosing to act as if the good outcome is possible, and tending the small things that make it likelier." },
      ],
    },
  ],
  contact: {
    title: "let's build something that holds.",
    body: "If your team works on AI systems, autonomy or distributed infrastructure and needs someone who can take an idea from paper to production, I'd like to hear about it.",
    action: { label: personalEmail, url: `mailto:${personalEmail}?subject=Hello%20Alex` },
  },
  links: [
    { label: "github", url: "https://github.com/alex-quiterio" },
    { label: "medium", url: "https://medium.com/@arielquixote" },
    { label: "x", url: "https://x.com/ariel_quixote" },
    { label: "email", url: `mailto:${personalEmail}` },
  ],
  closingNote:
    "This garden follows the sky over Amsterdam. Move the hour or the season above and the hill, the tree and the light change with it.",
};

export const alexProfileSource: ProfileSource = { load: () => alexProfile };
