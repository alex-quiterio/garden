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
          body: "I build with AI every day and design the factory around it, so that what comes out can be reviewed, tested and shipped.",
        },
        {
          title: "distributed systems from the metal up",
          body: "Fork choice, randomness, stand-in validators so proof of stake never halts, replay protection, mempool limits, peer banning, headers-first sync.",
        },
        {
          title: "languages and tooling",
          body: "Compilers, interpreters and concurrency primitives, because they teach you what a program really is.",
        },
        {
          title: "product that respects people",
          body: "Local-first, privacy-preserving apps where the data stays on the user's device.",
        },
      ],
    },
    {
      id: "background",
      title: "background",
      entries: [
        { title: "now", meta: "Amsterdam", body: "Staff engineer at Seenons." },
        {
          title: "since 2011",
          body: "Shipping software across Rust, TypeScript, Ruby, Java and C++, and building systems that hold under load.",
        },
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
