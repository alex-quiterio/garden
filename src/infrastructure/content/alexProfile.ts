import type { Profile } from "@domain/profile";
import type { ProfileSource } from "@application/composePage";

const gh = (repo: string) => `https://github.com/alex-quiterio/${repo}`;
const personalEmail = "alexandre@pm.me";

export const alexProfile: Profile = {
  name: "alex quiterio",
  role: "Staff Engineer · Distributed Systems & AI",
  greeting: "ola! i'm alex.",
  tagline: "staff engineer, wondering",
  headline: "Staff engineer in distributed systems and AI, for software that runs real-world operations.",
  place: "Amsterdam",
  timeZone: "Europe/Amsterdam",
  intro: [
    "At Seenons I own the core platform behind a circular economy for business waste, and build the agent pipelines that take a GitHub issue to a reviewed pull request. Before that I spent five years at Catawiki, helping break a marketplace with millions of monthly users into team-owned services.",
  ],
  availability: "open to staff+ roles · distributed systems, AI, autonomy",
  actions: {
    primary: { label: "get in touch", url: `mailto:${personalEmail}?subject=hello%20alex` },
    secondary: [
      { label: "selected work", url: "#work" },
      { label: "linkedin", url: "https://www.linkedin.com/in/alexandrequiterio/" },
      { label: "github", url: "https://github.com/alex-quiterio" },
    ],
  },
  stats: [
    { value: "owner", label: "of the core platform the company runs on" },
    { value: "millions", label: "of monthly users on a marketplace I helped split into services" },
    { value: "minutes", label: "to ship what used to take hours" },
    { value: "early", label: "engineer who built the team that followed" },
  ],
  facts: ["amsterdam · CET", "typescript · rust · python", "distributed systems · ai engineering"],
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
          points: ["agent pipelines from issue to reviewed PR", "shared Claude Code skills for a whole team", "human review gates and a per-token cost ledger"],
        },
        {
          title: "systems that hold when things fail",
          meta: "event-driven · DDD · Temporal · PostgreSQL",
          body: "I've broken a monolith into team-owned services and architected an event-driven platform that runs physical operations. On the side I write consensus protocols myself, so I know where they break and how to keep a system's promises when a node lies or a network splits.",
          points: ["a marketplace monolith split into team-owned services", "the order and collection model a logistics network runs on", "deploys that take minutes, not hours"],
        },
        {
          title: "a pull toward autonomy",
          meta: "personal work · Rust · simulation",
          body: "On my own time I built beeline, a drone simulator with path planning, optic-flow navigation and collision prevention. It's where I'm heading: problems where software has to decide on its own, quickly and safely.",
          points: ["A* planning in 3D airspace", "PX4-style collision prevention", "deterministic simulation for testing"],
        },
        {
          title: "technical leadership",
          meta: "staff engineer",
          body: "Technical owner of the core platform, and a reviewer on much of what ships to it. I design the interview loop and onboarding, run architecture workshops and pairing, and raise engineers who outgrow their roles.",
          points: ["led a cross-functional marketplace team", "mentored engineers into senior roles", "designed the hiring loop and onboarding"],
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
          meta: "2022 – now · Amsterdam · climate tech",
          body: "Technical owner of the core platform behind a circular economy for business waste, connecting businesses with specialised waste collectors.",
          points: [
            "designed the event-driven order and collection model every transaction flows through",
            "one monorepo and one CI pipeline, so deploys take minutes, not hours",
            "audit-ready CSRD and impact reporting, reconciled against EU waste codes",
            "hardened partner APIs with WAF rules and least-privilege IAM",
          ],
        },
        {
          title: "Senior Software Engineer, Seenons",
          meta: "2021 – 2022 · Amsterdam",
          body: "Joined early and built the engineering team from its first hires.",
          points: ["led the migration to NestJS and TypeScript: a smaller codebase that does more", "made tests a gate in CI, and production bugs dropped with it"],
        },
        {
          title: "Senior Software Engineer, Catawiki",
          meta: "2016 – 2021 · Amsterdam · marketplace",
          body: "Online auction marketplace for special objects, with millions of monthly users across dozens of countries.",
          points: [
            "helped break the monolith into team-owned services for orders, shipping, fulfilment and feedback",
            "built the template every new service starts from, with CI and coverage gates by default",
            "led a cross-functional team on core marketplace features",
            "mentored engineers who went on to senior roles",
          ],
        },
      ],
    },
    {
      id: "toolbox",
      title: "toolbox",
      intro: "Chosen for the problem, not the fashion.",
      entries: [
        { title: "languages", meta: "TypeScript · Rust · Python · Ruby · SQL · C++ · Java", body: "Product and platform in TypeScript, systems work in Rust, services in Python and Ruby." },
        { title: "platforms", meta: "NestJS · React · Rails · FastAPI · PostgreSQL · MongoDB", body: "The frameworks and stores behind a marketplace with millions of users and a climate-tech platform." },
        { title: "cloud", meta: "AWS · GCP · Kubernetes · Pulumi", body: "Infrastructure as code, least-privilege IAM and observability from the first deploy." },
        { title: "AI", meta: "Claude Code · agents · skills · MCP", body: "Agentic workflows with human review gates, team-wide skills and plugins, and cost-accounted LLM tooling." },
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
        { title: "volunteer engineer, FoodCoop Amsterdam", meta: "2018 – 2021", body: "Led two volunteers building the coop's Rails system: inventory for thousands of products and role-based access for hundreds of members." },
        { title: "maths tutor, Academia do Futuro", meta: "2014 – 2016 · Lisbon", body: "Free tutoring for children at risk of leaving school." },
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
    action: { label: personalEmail, url: `mailto:${personalEmail}?subject=hello%20alex` },
  },
  links: [
    { label: "linkedin", url: "https://www.linkedin.com/in/alexandrequiterio/" },
    { label: "github", url: "https://github.com/alex-quiterio" },
    { label: "substack", url: "https://substack.com/@arielquixote" },
    { label: "medium", url: "https://medium.com/@arielquixote" },
    { label: "x", url: "https://x.com/ariel_quixote" },
    { label: "email", url: `mailto:${personalEmail}` },
  ],
  closingNote:
    "This garden follows the sky over Amsterdam. Move the hour or the season above and the hill, the tree and the light change with it.",
};

export const alexProfileSource: ProfileSource = { load: () => alexProfile };
