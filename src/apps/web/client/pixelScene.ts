import { bayer, CLOUDS, FOX_FRAMES, hash, RIDGES, ridgeRow, TREE_SPRITES, TREES } from "@domain/pixel";
import { hexToRgb, mix, MOON, type Sky } from "@domain/sky";

type RGB = [number, number, number];

export const SCENE_ROWS = 96;
const STAR_COUNT = 48;

export interface Scene {
  resize(): void;
  draw(sky: Sky, seconds: number, animate: boolean): void;
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export function createScene(canvas: HTMLCanvasElement): Scene {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2d canvas is not available");

  const H = SCENE_ROWS;
  let W = 1;
  let px = 4;
  let img = ctx.createImageData(1, H);
  let far = new Int16Array(1);
  let mid = new Int16Array(1);
  let front = new Int16Array(1);
  const stars = Array.from({ length: STAR_COUNT }, (_, i) => ({ u: hash(i * 3 + 1), v: hash(i * 3 + 2) * 0.5 }));

  function resize(): void {
    const width = canvas.parentElement?.clientWidth ?? window.innerWidth;
    px = width < 600 ? 2 : 3;
    W = Math.max(1, Math.ceil(width / px));
    canvas.width = W;
    canvas.height = H;
    canvas.style.height = `${H * px}px`;
    img = ctx!.createImageData(W, H);
    far = new Int16Array(W);
    mid = new Int16Array(W);
    front = new Int16Array(W);
    for (let x = 0; x < W; x++) {
      const u = x / W;
      far[x] = ridgeRow(RIDGES.far, u, H);
      mid[x] = ridgeRow(RIDGES.mid, u, H);
      front[x] = ridgeRow(RIDGES.front, u, H);
    }
  }

  function draw(sky: Sky, t: number, animate: boolean): void {
    const d = img.data;
    d.fill(0);
    const set = (x: number, y: number, c: RGB, a = 255) => {
      if (x < 0 || y < 0 || x >= W || y >= H) return;
      const i = (y * W + x) * 4;
      d[i] = c[0];
      d[i + 1] = c[1];
      d[i + 2] = c[2];
      d[i + 3] = a;
    };
    const col = (hex: string): RGB => hexToRgb(hex);
    const tt = animate ? t : 0;

    // Dithered dusk glow rising from the horizon.
    const glow = col(mix(sky.bg, mix(sky.accent, "#4f5fc4", clamp01(sky.stars)), 0.2));
    for (let y = 0; y < H; y++) {
      const v = Math.pow(clamp01(y / (H * 0.8)), 2.6) * 0.85;
      for (let x = 0; x < W; x++) if (v > bayer(x, y)) set(x, y, glow);
    }

    // Stars.
    const starCol = col(sky.ink);
    stars.forEach((s, i) => {
      if (i / STAR_COUNT >= sky.stars) return;
      if (animate && Math.floor(tt * 2 + i * 1.7) % 9 === 0) return;
      set(Math.floor(s.u * W), Math.floor(s.v * H), starCol);
    });

    // Sun or crescent moon with a dithered halo.
    const cx = Math.round(sky.bodyX * W);
    const cy = Math.round(sky.bodyY * H);
    const bodyCol = col(sky.body);
    const haloCol = col(mix(sky.bg, sky.body, 0.45));
    const isMoon = sky.body === MOON;
    for (let dy = -9; dy <= 9; dy++) {
      for (let dx = -9; dx <= 9; dx++) {
        const r2 = dx * dx + dy * dy;
        if (r2 <= 10) {
          const bite = (dx - 2) * (dx - 2) + (dy + 1) * (dy + 1) <= 8;
          if (!(isMoon && bite)) set(cx + dx, cy + dy, bodyCol);
        } else if (r2 <= 36 && bayer(cx + dx, cy + dy) < 0.3) set(cx + dx, cy + dy, haloCol);
        else if (r2 <= 72 && bayer(cx + dx, cy + dy) < 0.1) set(cx + dx, cy + dy, haloCol);
      }
    }

    // Drifting clouds.
    const cloudCol = col(mix(sky.bg, sky.ink, 0.1));
    for (const cloud of CLOUDS) {
      const c = { ...cloud, w: Math.round(cloud.w * 1.4), row: Math.round((cloud.row * H) / 80) };
      const x0 = ((c.u * W + tt * c.speed * 2) % (W + 40)) - 20;
      for (let dy = -3; dy <= 2; dy++) {
        for (let dx = -c.w; dx <= c.w; dx++) {
          const a = (dx / c.w) ** 2 + (dy / 2.2) ** 2 < 1;
          const b = ((dx - c.w * 0.35) / (c.w * 0.55)) ** 2 + ((dy + 2) / 2) ** 2 < 1;
          if (a || b) set(Math.round(x0 + dx), c.row + dy, cloudCol);
        }
      }
    }

    // Far hill: a checker dither over the sky.
    const farCol = col(sky.hill1);
    for (let x = 0; x < W; x++) {
      for (let y = far[x] ?? 0; y < H; y++) {
        const keep = 0.62 * (1 - clamp01((y - (far[x] ?? 0)) / (H - (far[x] ?? 0))));
        if (bayer(x, y) < keep) set(x, y, farCol);
      }
    }

    // Middle hill, fading out into the page with dither.
    const midCol = col(mix(sky.hill1, sky.hill2, 0.4));
    for (let x = 0; x < W; x++) {
      const top = mid[x] ?? 0;
      for (let y = top; y < H; y++) {
        const keep = 1 - Math.pow(clamp01((y - top) / (H - top)), 1.3);
        if (y === top || bayer(x, y) < keep) set(x, y, midCol);
      }
    }

    // Trees stand on the middle hill and sway a pixel.
    const leaf = sky.leaf;
    const palette: Record<string, RGB> = {
      L: col(leaf),
      h: col(mix(leaf, "#ffffff", 0.3)),
      l: col(mix(leaf, "#000000", 0.3)),
      T: col(mix("#4a3526", sky.bg, 0.25)),
    };
    for (const tree of TREES) {
      const rows = TREE_SPRITES[tree.kind];
      const width = rows[0]?.length ?? 0;
      const ox = Math.round(tree.u * W - width / 2);
      const baseY = mid[Math.min(W - 1, Math.max(0, Math.round(tree.u * W)))] ?? 0;
      const oy = baseY - rows.length + 2;
      const trunkRow = rows.findIndex((r) => r.includes("T"));
      const sway = animate && Math.floor(tt * 0.9 + tree.phase) % 3 === 0 ? 1 : 0;
      rows.forEach((row, ry) => {
        const shift = ry < trunkRow - 2 ? sway : 0;
        for (let rx = 0; rx < row.length; rx++) {
          const ch = row[rx] ?? ".";
          const c = palette[ch];
          if (!c) continue;
          const x = ox + rx + shift;
          const y = oy + ry;
          if (ch !== "T" && bayer(x, y) >= sky.leafOpacity) continue;
          set(x, y, c);
        }
      });
    }

    // Front ground: bright edge, then dither fading out.
    const frontCol = col(sky.hill2);
    const edgeCol = col(mix(sky.hill2, "#ffffff", 0.28 * (1 - sky.stars * 0.65)));
    for (let x = 0; x < W; x++) {
      const top = front[x] ?? 0;
      for (let y = top; y < H; y++) {
        if (y === top) set(x, y, edgeCol);
        else {
          const keep = 1 - clamp01((y - top) / (H - top));
          if (bayer(x, y) < keep) set(x, y, frontCol);
        }
      }
    }

    // Fireflies at night.
    if (sky.stars > 0.4) {
      const fly = col("#f2e36b");
      for (let i = 0; i < 8; i++) {
        const fx = Math.floor(hash(i + 40) * W + Math.sin(tt * 0.6 + i) * 3);
        const fy = (front[Math.min(W - 1, Math.max(0, fx))] ?? 0) - 3 - Math.floor(hash(i + 70) * 9) + Math.round(Math.cos(tt * 0.8 + i * 2));
        if (!animate || Math.sin(tt * 2.5 + i * 1.9) > -0.3) set(fx, fy, fly);
      }
    }

    // A fox patrols the ridge.
    const frame = FOX_FRAMES[animate ? Math.floor(tt * 4) % 2 : 0] ?? FOX_FRAMES[0];
    if (frame) {
      const span = Math.max(1, W * 0.78);
      const p = (tt * 5) % (2 * span);
      const goingRight = p < span;
      const fx = Math.round(W * 0.11 + (goingRight ? p : 2 * span - p));
      const foot = (front[Math.min(W - 1, Math.max(0, fx))] ?? 0) + 1;
      const dim = sky.stars * 0.5;
      const fox: Record<string, RGB> = {
        F: col(mix("#d2742f", sky.bg, dim)),
        W: col(mix("#efe6d2", sky.bg, dim)),
        N: col("#2a2018"),
      };
      frame.forEach((row, ry) => {
        for (let rx = 0; rx < row.length; rx++) {
          const c = fox[row[rx] ?? "."];
          if (!c) continue;
          const x = goingRight ? fx + rx : fx + row.length - 1 - rx;
          set(x, foot - frame.length + ry, c);
        }
      });
    }

    ctx!.putImageData(img, 0, 0);
  }

  resize();
  return { resize, draw };
}
