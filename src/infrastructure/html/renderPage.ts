import type { Entry, Link } from "@domain/profile";
import type { PageModel, PageSection } from "@application/composePage";
import { PLANT_ORDER } from "@domain/pixel";
import { plantSvg } from "@infrastructure/html/pixelSvg";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const isExternal = (url: string) => url.startsWith("http");

function renderEntry(e: Entry, index: number, offset: number): string {
  const title = e.url
    ? `<a href="${escapeHtml(e.url)}"${isExternal(e.url) ? ' rel="noopener"' : ""}>${escapeHtml(e.title)}</a>`
    : escapeHtml(e.title);
  const meta = e.meta ? `<span class="meta">${escapeHtml(e.meta)}</span>` : "";
  const kind = PLANT_ORDER[(index + offset) % PLANT_ORDER.length] ?? "sprout";
  return `<li class="entry${e.url ? " linked" : ""}"><span class="plant">${plantSvg(kind)}</span><div class="entry-body"><h3>${title}</h3>${meta}<p>${escapeHtml(e.body)}</p>${renderPoints(e.points)}</div></li>`;
}

const linkAttrs = (url: string) => `href="${escapeHtml(url)}"${isExternal(url) ? ' rel="noopener"' : ""}`;

function renderPoints(points?: string[]): string {
  return points?.length ? `<ul class="points">${points.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>` : "";
}

function renderTags(tags?: string[]): string {
  return tags?.length ? `<ul class="tags">${tags.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>` : "";
}

/** A case-study card: a tended plot with a name, what it is, what it proves and what it's made of. */
function renderCard(e: Entry, index: number): string {
  const kind = PLANT_ORDER[index % PLANT_ORDER.length] ?? "sprout";
  const title = e.url ? `<a ${linkAttrs(e.url)}>${escapeHtml(e.title)}</a>` : escapeHtml(e.title);
  const more = e.url ? `<span class="card-more" aria-hidden="true">${e.url.includes("github.com") ? "source" : "open"} →</span>` : `<span class="card-more private">private</span>`;
  return `<li class="card${e.url ? " linked" : ""}">
    <div class="card-head"><span class="plant">${plantSvg(kind)}</span><div><h3>${title}</h3>${e.meta ? `<span class="meta">${escapeHtml(e.meta)}</span>` : ""}</div></div>
    <p>${escapeHtml(e.body)}</p>
    ${renderPoints(e.points)}
    <div class="card-foot">${renderTags(e.tags)}${more}</div>
  </li>`;
}

function renderSection(s: PageSection): string {
  const intro = s.intro ? `<p class="section-intro">${escapeHtml(s.intro)}</p>` : "";
  const offset = (s.letter.charCodeAt(0) - 97) * 3;
  const list =
    s.layout === "cards"
      ? `<ul class="cards">${s.entries.map(renderCard).join("")}</ul>`
      : `<ul class="entries">${s.entries.map((e, i) => renderEntry(e, i, offset)).join("")}</ul>`;
  return `<section id="${s.id}" class="section">
  <h2><span class="letter" aria-hidden="true">${s.letter}.</span>${escapeHtml(s.title)}</h2>
  ${intro}
  ${list}
</section>`;
}

const button = (l: Link, kind: "primary" | "ghost") => `<a class="btn btn-${kind}" ${linkAttrs(l.url)}>${escapeHtml(l.label)}</a>`;

const LANDSCAPE = `<div class="sky-band">
<canvas id="scene" class="scene" role="img" aria-label="A pixel-art hill with trees and a fox, under a sun or moon that follows the day or night setting"></canvas>
</div>`;

export function renderPage(page: PageModel, opts: { timeZone: string }): string {
  const { profile } = page;
  const menu = page.sections
    .filter((s) => s.inMenu)
    .map((s) => `<a href="#${s.id}"><span class="letter">${s.letter}.</span> ${escapeHtml(s.title)}</a>`)
    .join("") + `<a href="#contact" class="menu-cta">hire me</a>`;
  const links = profile.links
    .map((l) => `<a href="${escapeHtml(l.url)}"${isExternal(l.url) ? ' rel="noopener"' : ""}>${escapeHtml(l.label)}</a>`)
    .join("");
  const facts = profile.facts.map((f) => `<li>${escapeHtml(f)}</li>`).join("");
  const stats = profile.stats
    .map((st) => `<li><span class="stat-value">${escapeHtml(st.value)}</span><span class="stat-label">${escapeHtml(st.label)}</span></li>`)
    .join("");
  const status = profile.availability
    ? `<p class="status"><span class="status-dot" aria-hidden="true"></span>${escapeHtml(profile.availability)}</p>`
    : "";
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    jobTitle: profile.role,
    description: profile.headline,
    address: { "@type": "PostalAddress", addressLocality: profile.place },
    sameAs: profile.links.filter((l) => isExternal(l.url)).map((l) => l.url),
  }).replace(/</g, "\\u003c");

  return `<!doctype html>
<html lang="en" data-tz="${escapeHtml(opts.timeZone)}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>${escapeHtml(page.documentTitle)}</title>
<meta name="description" content="${escapeHtml(page.description)}" />
<meta name="author" content="${escapeHtml(profile.fullName)}" />
<meta property="og:type" content="profile" />
<meta property="og:title" content="${escapeHtml(page.documentTitle)}" />
<meta property="og:description" content="${escapeHtml(page.description)}" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="${escapeHtml(page.documentTitle)}" />
<meta name="twitter:description" content="${escapeHtml(page.description)}" />
<script type="application/ld+json">${jsonLd}</script>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ctext y='26' font-size='26'%3E%F0%9F%8C%BF%3C/text%3E%3C/svg%3E" />
<link rel="preload" href="styles/fonts/pixelify-sans-latin.woff2" as="font" type="font/woff2" crossorigin />
<link rel="stylesheet" href="styles/fonts.css" />
<link rel="stylesheet" href="styles/tokens.css" />
<link rel="stylesheet" href="styles/base.css" />
<link rel="stylesheet" href="styles/layout.css" />
<link rel="stylesheet" href="styles/sections.css" />
<link rel="stylesheet" href="styles/garden.css" />
<link rel="stylesheet" href="styles/pro.css" />
</head>
<body>
<canvas id="weather" class="weather" aria-hidden="true"></canvas>
<header class="top">
  <div class="bar">
    <nav class="menu" aria-label="Sections">${menu}</nav>
    <button type="button" id="mode" class="mode" aria-pressed="false" aria-label="Switch between day and night"><span id="mode-icon" aria-hidden="true"></span><span id="mode-label">day</span></button>
  </div>
</header>
<main>
  <section class="hero">
    ${status}
    <h1>${escapeHtml(profile.greeting)}</h1>
    <p class="headline">${escapeHtml(profile.headline)}</p>
    ${profile.intro.map((p) => `<p class="lead">${escapeHtml(p)}</p>`).join("")}
    <div class="actions">${button(profile.actions.primary, "primary")}${profile.actions.secondary.map((l) => button(l, "ghost")).join("")}</div>
    <ul class="stats" aria-label="At a glance">${stats}</ul>
    <ul class="facts">${facts}</ul>
  </section>
</main>
${LANDSCAPE}
<main>
  ${page.sections.map(renderSection).join("\n")}
</main>
<main>
  <section id="contact" class="contact">
    <h2>${escapeHtml(profile.contact.title)}</h2>
    <p>${escapeHtml(profile.contact.body)}</p>
    <div class="actions">${button(profile.contact.action, "primary")}</div>
  </section>
</main>
<footer class="foot">
  <nav class="links" aria-label="Elsewhere">${links}</nav>
  <p class="note">${escapeHtml(profile.closingNote)}</p>
</footer>
<script type="module" src="main.js"></script>
</body>
</html>
`;
}
