import { mix, type Season, type Sky } from "@domain/sky";

const PX = 2;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  sway: number;
  freq: number;
  phase: number;
  w: number;
  h: number;
  tint: number;
}

export interface Weather {
  resize(): void;
  draw(sky: Sky, dt: number, seconds: number): void;
}

const COLORS: Record<Season, string[]> = {
  spring: ["#f4b6c8", "#f9d5df", "#ffffff"],
  summer: ["#f2d36b", "#fff0a8", "#e8b84a"],
  autumn: ["#d2822f", "#a8461f", "#e0b04a"],
  winter: ["#ffffff", "#dfe9f0", "#c3d3de"],
};

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/** A fixed, full-page layer of seasonal pixels: petals, pollen, leaves or snow. */
export function createWeather(canvas: HTMLCanvasElement, season: Season): Weather {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2d canvas is not available");
  let W = 1;
  let H = 1;
  let particles: Particle[] = [];

  function make(): Particle {
    const falling = season !== "summer";
    return {
      x: rand(0, W),
      y: rand(0, H),
      vx: season === "winter" ? rand(-1, 1) : rand(0.5, 3),
      vy: !falling ? rand(-2, 2) : season === "autumn" ? rand(6, 10) : rand(4, 8),
      sway: season === "autumn" ? rand(4, 9) : season === "spring" ? rand(3, 7) : rand(1, 3),
      freq: rand(0.6, 1.6),
      phase: rand(0, 6.28),
      w: season === "autumn" || season === "spring" ? 2 : Math.random() < 0.2 ? 2 : 1,
      h: season === "autumn" ? 2 : 1,
      tint: Math.floor(Math.random() * 3),
    };
  }

  function resize(): void {
    W = Math.ceil(window.innerWidth / PX);
    H = Math.ceil(window.innerHeight / PX);
    canvas.width = W;
    canvas.height = H;
    particles = Array.from({ length: Math.min(16, Math.max(7, Math.round((W * H) / 18000))) }, make);
  }

  function draw(sky: Sky, dt: number, t: number): void {
    ctx!.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.y += p.vy * dt;
      p.x += (p.vx + Math.sin(t * p.freq + p.phase) * p.sway) * dt;
      if (p.y > H + 2) {
        p.y = -2;
        p.x = rand(0, W);
      } else if (p.y < -2) {
        p.y = H + 2;
        p.x = rand(0, W);
      }
      p.x = ((p.x % W) + W) % W;

      let color = COLORS[season][p.tint] ?? "#ffffff";
      if (season === "winter" && !sky.isNight) color = mix(color, "#8aa0b2", 0.75);
      ctx!.globalAlpha = season === "summer" ? 0.25 + 0.75 * (Math.sin(t * p.freq * 2 + p.phase) * 0.5 + 0.5) : 0.55;
      ctx!.fillStyle = color;
      ctx!.fillRect(Math.round(p.x), Math.round(p.y), p.w, p.h);
    }
    ctx!.globalAlpha = 1;
  }

  resize();
  return { resize, draw };
}
