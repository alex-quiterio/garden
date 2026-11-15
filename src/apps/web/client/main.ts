import { seasonOf, skyFor, type Season, type Sky } from "@domain/sky";
import { moonIcon, sunIcon } from "@apps/web/client/icons";
import { createScene } from "@apps/web/client/pixelScene";
import { createWeather } from "@apps/web/client/pixelWeather";

const root = document.documentElement;
const tz = root.dataset.tz ?? "Europe/Amsterdam";

const modeButton = document.getElementById("mode") as HTMLButtonElement;
const modeIcon = document.getElementById("mode-icon") as HTMLElement;
const modeLabel = document.getElementById("mode-label") as HTMLElement;
const sceneCanvas = document.getElementById("scene") as HTMLCanvasElement;
const weatherCanvas = document.getElementById("weather") as HTMLCanvasElement;

const DAY_HOUR = 11;
const NIGHT_HOUR = 23;
const DURATION_MS = 2400;
/** Pixel art moves in steps: about twenty frames a second. */
const FRAME_MS = 50;

/** Real hour and season where the garden is anchored. */
function now(): { hour: number; season: Season } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "numeric",
    month: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { hour: get("hour"), season: seasonOf(get("month") - 1) };
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const start = now();
const season = start.season;
let night = start.hour < 6 || start.hour >= 18;
/** Fractional hour shown when settled; the animation runs it past 24 while the sky turns. */
let shownHour = night ? NIGHT_HOUR : DAY_HOUR;
let anim: { from: number; to: number; t0: number } | null = null;

const scene = createScene(sceneCanvas);
const weather = createWeather(weatherCanvas, season);

function paintCss(sky: Sky): void {
  const set = (k: string, v: string) => root.style.setProperty(k, v);
  set("--bg", sky.bg);
  set("--ink", sky.ink);
  set("--muted", sky.muted);
  set("--accent", sky.accent);
  set("--rule", sky.rule);
  set("--leaf", sky.leaf);
  set("--hill-1", sky.hill1);
  set("--hill-2", sky.hill2);
  set("--body", sky.body);
  set("--leaf-opacity", String(sky.leafOpacity));
  set("--stars", sky.stars.toFixed(3));
  root.style.colorScheme = sky.isNight ? "dark" : "light";
}

function label(): void {
  modeIcon.innerHTML = night ? moonIcon : sunIcon;
  modeLabel.textContent = night ? "night" : "day";
  modeButton.setAttribute("aria-pressed", String(night));
}

function hourAt(nowMs: number): number {
  if (!anim) return shownHour;
  const p = Math.min(1, Math.max(0, (nowMs - anim.t0) / DURATION_MS));
  const hour = anim.from + (anim.to - anim.from) * easeInOut(p);
  if (p >= 1) {
    shownHour = anim.to % 24;
    anim = null;
  }
  return hour;
}

/** One still frame, used when motion is reduced and after a resize. */
function drawStill(): void {
  const sky = skyFor(shownHour, season);
  paintCss(sky);
  scene.draw(sky, 0, false);
  weather.draw(sky, 0, 0);
}

let last = 0;
function frame(nowMs: number): void {
  requestAnimationFrame(frame);
  if (nowMs - last < FRAME_MS) return;
  const dt = Math.min(0.2, (nowMs - last) / 1000);
  last = nowMs;
  const sky = skyFor(hourAt(nowMs), season);
  paintCss(sky);
  scene.draw(sky, nowMs / 1000, true);
  weather.draw(sky, dt, nowMs / 1000);
}

/**
 * Turn the sky forward twelve hours: day → dusk → night, or night → dawn → day.
 * The sun sets behind the hills and the moon rises, because the sky model is
 * continuous in the hour.
 */
function turn(): void {
  night = !night;
  label();
  if (reduceMotion.matches) {
    shownHour = (shownHour + 12) % 24;
    drawStill();
    return;
  }
  anim = { from: shownHour, to: shownHour + 12, t0: performance.now() };
}

modeButton.addEventListener("click", () => {
  if (!anim) turn();
});

// Phones fire resize when the address bar collapses while scrolling; only a width change needs a redraw.
let lastWidth = window.innerWidth;
let resizeTimer: number | undefined;
window.addEventListener("resize", () => {
  if (window.innerWidth === lastWidth) return;
  lastWidth = window.innerWidth;
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    scene.resize();
    weather.resize();
    if (reduceMotion.matches) drawStill();
  }, 120);
});

label();
drawStill();
if (!reduceMotion.matches) requestAnimationFrame(frame);
