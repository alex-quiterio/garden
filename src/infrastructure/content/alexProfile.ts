import type { Profile } from "@domain/profile";
import type { ProfileSource } from "@application/composePage";

const gh = (repo: string) => `https://github.com/alex-quiterio/${repo}`;

export const alexProfile: Profile = {
  name: "alex quiterio",
  greeting: "ola! i'm alex.",
  tagline: "staff engineer, wondering",
  place: "Amsterdam",
  timeZone: "Europe/Amsterdam",
  intro: [
    "I'm a staff engineer at Seenons, building AI factories: agents and skills wired into real workflows, with the guardrails, review loops and tests that make AI-produced software something you can ship.",
    "Underneath that I like to understand how things hold under load, so I write consensus protocols, compilers and Lisps from scratch. And alongside the engineering I keep wondering, and looking for active hope.",
    "I'm happiest at the seam between ideas that sound research-grade and software people can rely on: small systems, explained well, tested properly, and kept alive by tending them.",
  ],
  facts: ["staff engineer @ seenons", "amsterdam", "building since 2011", "ai factories · distributed systems"],
  sections: [
    {
      id: "projects",
      title: "projects",
      intro: "Things I built to understand them. Mostly small, mostly open.",
      entries: [
        {
          title: "loopfield",
          url: "https://alex-quiterio.github.io/loopfield/",
          meta: "JavaScript · live",
          body: "Albums of electronic music written as code. Every song is a short program; pick an album, press play, and rewrite any song while it runs.",
        },
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
          title: "peekaboo",
          url: gh("peekaboo"),
          meta: "Rust",
          body: "A read-only peek at what your home router and ISP can see: it scores what it can measure and tells you the three most useful things to fix.",
        },
        {
          title: "pixel splat zoo",
          url: gh("pixel-dino-splats"),
          meta: "TypeScript",
          body: "Creatures made of thousands of 3D gaussian splats, rasterised in software at pixel-art resolution. No WebGL.",
        },
        {
          title: "byzantine-quorums",
          url: gh("byzantine-quorums"),
          meta: "Java",
          body: "Five servers walk into a bar and one of them is lying. A replicated mobile-operator simulation whose servers vote on every answer.",
        },
        {
          title: "blockchain-rs",
          url: gh("blockchain-rs"),
          meta: "Rust",
          body: "A cryptocurrency from first principles: proof of work and proof of stake, RANDAO beacons, Merkle proofs, gossiping peers, and a web UI that explains every block.",
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
      entries: [
        {
          title: "transmissions on Medium",
          url: "https://medium.com/@arielquixote",
          body: "Essays and field notes, written when something has finished growing.",
        },
      ],
    },
    {
      id: "practice",
      title: "practice",
      intro: "What I do when I work, and why it holds.",
      entries: [
        {
          title: "AI engineering and AI factories",
          body: "I build with AI every day and design the factory around it: agents and skills wired into real workflows, with the guardrails, review loops and tests that make what comes out something you can ship.",
        },
        {
          title: "distributed systems from the metal up",
          body: "Fork choice, randomness, stand-in validators so proof of stake never halts, replay protection, mempool limits, peer banning, headers-first sync. I would rather write the protocol once myself than trust that I understand it.",
        },
        {
          title: "languages and tooling",
          body: "Compilers, interpreters and concurrency primitives, because they teach you what a program really is and what it costs.",
        },
        {
          title: "product that respects people",
          body: "Local-first, privacy-preserving apps where the data stays on the user's device, and nothing is collected that the product does not need.",
        },
        {
          title: "security you can read",
          body: "Tools like peekaboo look at a network read-only, score what they can measure, and say in plain words what to fix first.",
        },
        {
          title: "creative computing",
          body: "Pixel creatures from gaussian splats, flocks from three simple rules, songs as programs you can rewrite while they play. Play keeps the craft honest.",
        },
        {
          title: "explaining as engineering",
          body: "If a system cannot explain itself, I build the screen that does: a block explorer that narrates every block, a report that says what it checked and why.",
        },
      ],
    },
    {
      id: "toolbox",
      title: "toolbox",
      intro: "Chosen for the problem, not the fashion.",
      entries: [
        { title: "languages", meta: "Rust · TypeScript · Ruby · Java · C++ · Lisp", body: "Systems work in Rust, product and tooling in TypeScript, and a decade of Ruby and Java behind both." },
        { title: "data and messaging", meta: "PostgreSQL · Kafka", body: "For systems that have to keep their promises when things fail halfway." },
        { title: "AI", meta: "Claude · agents · skills · MCP", body: "Models, agent loops and tool servers, wired in with reviews, tests and a way to roll back." },
        { title: "shape of the code", body: "Domain-driven layers with lint rules that enforce the direction of dependencies, alias imports, and small scripts per app. This site is built that way." },
        { title: "ways of delivering", body: "Local-first apps, static sites, command-line tools and small dashboards: whichever puts the least between a person and the thing they came for." },
      ],
    },
    {
      id: "principles",
      title: "principles",
      entries: [
        { title: "make the invisible visible", body: "Show what the router can see, what the block contains, what the agent did. Trust follows sight." },
        { title: "small enough to read", body: "A Lisp you can read in one sitting, a protocol you can hold in your head. What fits in a head can be fixed." },
        { title: "data stays with the person", body: "Default to the device, ask before the network, and keep the append-only trail honest." },
        { title: "guardrails before speed", body: "Speed is what you get after the review loops, the tests and the way back are in place." },
        { title: "tend, don't just ship", body: "Software is a garden: it wants weeding, pruning and patience long after launch." },
      ],
    },
    {
      id: "background",
      title: "background",
      entries: [
        { title: "now", meta: "Amsterdam", body: "Staff engineer at Seenons, bringing AI into the way software gets designed, reviewed and shipped." },
        { title: "since 2011", body: "Shipping software across Rust, TypeScript, Ruby, Java and C++, from product teams to protocol code, and building systems that hold under load." },
        { title: "on the side", body: "A cryptocurrency node, a compiler, a Lisp, a router checker, a music player written as code, and a growing zoo of pixel creatures." },
      ],
    },
    {
      id: "interests",
      title: "interests",
      entries: [
        { title: "active hope", body: "Choosing to act as if the good outcome is possible, and tending the small things that make it likelier." },
        { title: "emergence", body: "How simple local rules become flocks, networks and communities." },
        { title: "local-first software", body: "Tools that keep working, and keep your data yours, when the network goes away." },
        { title: "the sky", body: "Charts of the heavens, old and new, and what people have read in them." },
        { title: "music as code", body: "Songs as short programs that loop, build and fall away." },
        { title: "making with hands", body: "Learning stone, wood and soil as slowly as the screen work is fast, with a pull toward rural Portugal." },
        { title: "wondering", body: "Keeping the questions open a little longer than is comfortable." },
      ],
    },
  ],
  links: [
    { label: "github", url: "https://github.com/alex-quiterio" },
    { label: "medium", url: "https://medium.com/@arielquixote" },
    { label: "personal", url: "mailto:alexandre@pm.me" },
    { label: "work", url: "mailto:alexandre@seenons.com" },
  ],
  closingNote:
    "This garden follows the sky over Amsterdam. Move the hour or the season above and the hill, the tree and the light change with it.",
};

export const alexProfileSource: ProfileSource = { load: () => alexProfile };
