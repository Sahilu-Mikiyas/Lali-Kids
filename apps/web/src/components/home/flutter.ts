"use client";

/*
  The burst that flies out of the pop-up book when a page turns: butterflies, leaves,
  adey abeba petals, sparkles and a bird or two. A few butterflies land on the headline's
  letters (any element marked `data-perch`), rest there, then fly away.

  Every flyer is one small HTML box moved by the Web Animations API with transforms and
  opacity only; butterfly and bird wings are separate boxes that flap with a CSS scale, so
  nothing repaints while they fly. Never more than MAX flyers exist at once, and they remove
  themselves when done. Callers skip this entirely with reduced motion.
*/

const MAX = 30;
let live = 0;

type Pt = { x: number; y: number };

const WINGS: [string, string, string][] = [
  // upper colour, lower colour, edge
  ["#FF8A1F", "#FFB347", "#3A1D0E"],
  ["#3F8CFF", "#7FC4FF", "#13245A"],
  ["#FF6FA8", "#FFB3CF", "#5A1838"],
  ["#FFD23F", "#FFE98A", "#4A3A0A"],
  ["#1FC2B0", "#8DF0DF", "#0B3F3A"],
  ["#9B6BFF", "#CDB6FF", "#2E1B5E"],
];

function wingSvg([up, low, edge]: [string, string, string], dots: boolean) {
  return `<svg viewBox="0 0 20 30" width="100%" height="100%" aria-hidden="true">
<path d="M20 14 C14 2 2 -2 1 6 C0 12 8 16 20 16Z" fill="${up}" stroke="${edge}" stroke-width="1.4"/>
<path d="M20 16 C10 16 3 22 6 27 C9 31 16 25 20 18Z" fill="${low}" stroke="${edge}" stroke-width="1.4"/>
<path d="M19 15 C14 9 8 6 4 6" stroke="${edge}" stroke-width=".8" fill="none" opacity=".55"/>
${dots ? `<circle cx="4" cy="6" r="1.3" fill="#fff"/><circle cx="7.5" cy="4.2" r=".9" fill="#fff"/>` : ""}
<path d="M18 12 C14 7 9 5 6 6" stroke="#fff" stroke-width="1.6" fill="none" opacity=".45" stroke-linecap="round"/>
</svg>`;
}

function butterflyEl(i: number): HTMLElement {
  const c = WINGS[i % WINGS.length];
  const el = document.createElement("div");
  el.className = "home-flyer home-bfly";
  const size = 26 + (i % 3) * 6;
  el.style.width = `${size}px`;
  el.style.height = `${size * 0.8}px`;
  el.innerHTML = `<div class="home-wing home-wing-l">${wingSvg(c, i % 2 === 0)}</div><div class="home-wing home-wing-r">${wingSvg(c, i % 2 === 0)}</div><div class="home-bfly-body"></div>`;
  (el.children[0] as HTMLElement).style.animationDelay = (el.children[1] as HTMLElement).style.animationDelay = `${-(i % 5) * 0.05}s`;
  return el;
}

function birdEl(left: boolean): HTMLElement {
  const el = document.createElement("div");
  el.className = "home-flyer home-bird";
  const wing = `<svg viewBox="0 0 24 12" width="100%" height="100%"><path d="M24 10 C16 0 6 -1 0 4 C8 3 15 6 24 12Z" fill="#2B2F55"/></svg>`;
  el.innerHTML = `<div class="home-bird-in"${left ? ' style="transform:scaleX(-1)"' : ""}><div class="home-wing home-bird-l">${wing}</div><div class="home-wing home-bird-r">${wing}</div><div class="home-bird-body"></div></div>`;
  return el;
}

const LEAF_COLORS = ["#5DBB63", "#3E9B5A", "#9BCB4E", "#F5B21E", "#E9873A"];
function leafEl(i: number): HTMLElement {
  const el = document.createElement("div");
  el.className = "home-flyer";
  const kind = i % 3;
  const size = 14 + (i % 4) * 4;
  el.style.width = el.style.height = `${size}px`;
  if (kind === 0) {
    const c = LEAF_COLORS[i % LEAF_COLORS.length];
    el.innerHTML = `<svg viewBox="0 0 20 20" width="100%" height="100%"><path d="M2 18 C2 8 8 2 18 2 C18 12 12 18 2 18Z" fill="${c}"/><path d="M3 17 L15 5" stroke="#fff" stroke-opacity=".5" stroke-width="1.2"/></svg>`;
  } else if (kind === 1) {
    // an adey abeba (Meskel daisy) petal, bright yellow
    el.innerHTML = `<svg viewBox="0 0 20 20" width="100%" height="100%"><ellipse cx="10" cy="10" rx="4.5" ry="9" fill="${i % 2 ? "#FFD23F" : "#FFE680"}"/><ellipse cx="9" cy="7" rx="1.4" ry="4" fill="#fff" opacity=".55"/></svg>`;
  } else {
    el.innerHTML = `<svg viewBox="0 0 20 20" width="100%" height="100%"><ellipse cx="10" cy="10" rx="5" ry="8" fill="${i % 2 ? "#FF9EC0" : "#FFFFFF"}"/></svg>`;
  }
  return el;
}

function sparkEl(i: number): HTMLElement {
  const el = document.createElement("div");
  el.className = "home-flyer";
  const size = 10 + (i % 3) * 5;
  el.style.width = el.style.height = `${size}px`;
  el.innerHTML = `<svg viewBox="-10 -10 20 20" width="100%" height="100%"><path d="M0 -10 Q1.6 -1.6 10 0 Q1.6 1.6 0 10 Q-1.6 1.6 -10 0 Q-1.6 -1.6 0 -10Z" fill="${["#FFE27A", "#FFFFFF", "#FFC2DA", "#9FE3FF"][i % 4]}"/></svg>`;
  return el;
}

const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const tf = (p: Pt, r = 0, s = 1) => `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px) rotate(${r.toFixed(1)}deg) scale(${s.toFixed(2)})`;

function launch(host: HTMLElement, el: HTMLElement, frames: Keyframe[], ms: number, after?: () => void) {
  live++;
  host.append(el);
  const a = el.animate(frames, { duration: ms, easing: "linear", fill: "both" });
  const done = () => {
    el.remove();
    live--;
    after?.();
  };
  a.onfinish = done;
  a.oncancel = done;
}

/** A wandering path for a butterfly: out of the book, up and away (or to a perch). */
function wander(from: Pt, to: Pt, n: number, wobble: number): Pt[] {
  const pts: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const k = i / n;
    // ease out of the book quickly, then drift
    const e = 1 - Math.pow(1 - k, 1.6);
    const side = Math.sin(k * Math.PI * 2 + rnd(0, 6)) * wobble * Math.sin(k * Math.PI);
    pts.push({ x: from.x + (to.x - from.x) * e + side, y: from.y + (to.y - from.y) * e - Math.sin(k * Math.PI) * rnd(20, 70) });
  }
  pts[n] = to;
  return pts;
}

export type BurstOptions = {
  /** How lively: phones get fewer flyers. */
  butterflies?: number;
  leaves?: number;
  sparks?: number;
  birds?: number;
  /** Letters butterflies may land on. */
  perches?: HTMLElement[];
  /** Colours of the world that just opened: leaves for the forest, bubbles for the lake… */
  kind?: "forest" | "kingdom" | "lake" | "night";
};

/** Release a burst of flyers from `origin` (a point inside `host`, in px). */
export function burst(host: HTMLElement, origin: Pt, o: BurstOptions = {}) {
  const W = host.clientWidth;
  const H = host.clientHeight;
  const hostBox = host.getBoundingClientRect();
  const room = () => MAX - live;
  const nB = Math.min(o.butterflies ?? 10, room());
  const perches = (o.perches ?? []).filter((p) => p.getBoundingClientRect().width > 0).sort(() => Math.random() - 0.5);
  let perched = 0;

  for (let i = 0; i < nB; i++) {
    const el = butterflyEl(i + Math.floor(rnd(0, 6)));
    const start = { x: origin.x + rnd(-30, 30), y: origin.y + rnd(-14, 10) };
    const ang = rnd(-Math.PI * 0.95, -Math.PI * 0.05);
    const perch = perched < 3 && i % 3 === 0 ? perches[perched] : undefined;
    if (perch) {
      perched++;
      const r = perch.getBoundingClientRect();
      const spot = { x: r.left - hostBox.left + r.width / 2 - 16, y: r.top - hostBox.top - 16 + rnd(-2, 4) };
      const out = { x: spot.x + rnd(-1, 1) * W * 0.4, y: -60 };
      const p1 = wander(start, spot, 6, 50);
      const p2 = wander(spot, out, 4, 40);
      const fly1 = 2400 + rnd(0, 600);
      const rest = 1800 + rnd(0, 1400);
      const fly2 = 2200;
      const total = fly1 + rest + fly2;
      const frames: Keyframe[] = [];
      p1.forEach((p, k) => frames.push({ transform: tf(p, k ? rnd(-18, 18) : 0, k ? 1 : 0.2), opacity: k ? 1 : 0, offset: (fly1 * (k / 6)) / total }));
      frames.push({ transform: tf(spot, 0, 1), opacity: 1, offset: (fly1 + rest) / total });
      p2.forEach((p, k) => k && frames.push({ transform: tf(p, rnd(-20, 20), 1), opacity: k === 4 ? 0 : 1, offset: (fly1 + rest + fly2 * (k / 4)) / total }));
      launch(host, el, frames, total);
      setTimeout(() => {
        el.classList.add("home-resting");
        perch.animate([{ translate: "0 0" }, { translate: "0 4px" }, { translate: "0 0" }], { duration: 420, easing: "ease-out" });
      }, fly1);
      setTimeout(() => el.classList.remove("home-resting"), fly1 + rest);
      continue;
    }
    const dist = rnd(0.45, 0.9) * Math.max(W, H);
    const end = { x: start.x + Math.cos(ang) * dist, y: Math.min(start.y + Math.sin(ang) * dist, -40) };
    if (Math.abs(end.x - start.x) < 60) end.x += (end.x < W / 2 ? -1 : 1) * 120;
    const pts = wander(start, end, 7, rnd(30, 70));
    const ms = rnd(3600, 5600);
    launch(
      host,
      el,
      pts.map((p, k) => ({ transform: tf(p, k ? rnd(-22, 22) : 0, k ? rnd(0.85, 1.15) : 0.2), opacity: k === 0 ? 0 : k === pts.length - 1 ? 0 : 1, offset: k / (pts.length - 1) })),
      ms,
    );
  }

  const nL = Math.min(o.leaves ?? 8, room());
  for (let i = 0; i < nL; i++) {
    const el = leafEl(i + (o.kind === "night" ? 1 : 0));
    const start = { x: origin.x + rnd(-40, 40), y: origin.y };
    const up = { x: start.x + rnd(-1, 1) * W * 0.35, y: start.y - rnd(90, 220) };
    const down = { x: up.x + rnd(-80, 80), y: H + 40 };
    const r0 = rnd(0, 360);
    const ms = rnd(3000, 4600);
    launch(
      host,
      el,
      [
        { transform: tf(start, r0, 0.3), opacity: 0 },
        { transform: tf(up, r0 + 180, 1), opacity: 1, offset: 0.25, easing: "ease-in" },
        { transform: tf({ x: (up.x + down.x) / 2 + rnd(-50, 50), y: (up.y + down.y) / 2 }, r0 + 300, 1), opacity: 1, offset: 0.62 },
        { transform: tf(down, r0 + 480, 0.9), opacity: 0 },
      ],
      ms,
    );
  }

  const nS = Math.min(o.sparks ?? 8, room());
  for (let i = 0; i < nS; i++) {
    const el = sparkEl(i);
    const a = (i / nS) * Math.PI * 2;
    const d = rnd(60, 150);
    const start = { x: origin.x, y: origin.y - 10 };
    launch(
      host,
      el,
      [
        { transform: tf(start, 0, 0.2), opacity: 0 },
        { transform: tf({ x: start.x + Math.cos(a) * d * 0.7, y: start.y + Math.sin(a) * d * 0.5 - 30 }, 90, 1.2), opacity: 1, offset: 0.4 },
        { transform: tf({ x: start.x + Math.cos(a) * d, y: start.y + Math.sin(a) * d * 0.6 - 50 }, 180, 0.2), opacity: 0 },
      ],
      rnd(900, 1400),
    );
  }

  const nBird = Math.min(o.birds ?? 1, room());
  for (let i = 0; i < nBird; i++) {
    const left = Math.random() < 0.5;
    const el = birdEl(left);
    const start = { x: origin.x, y: origin.y - 20 };
    const end = { x: left ? -80 : W + 80, y: rnd(20, H * 0.25) };
    const mid = { x: (start.x + end.x) / 2, y: Math.min(start.y, end.y) - rnd(40, 100) };
    const r = left ? -1 : 1;
    launch(
      host,
      el,
      [
        { transform: tf(start, -20 * r, 0.3), opacity: 0 },
        { transform: tf(mid, -12 * r, 1), opacity: 1, offset: 0.45 },
        { transform: tf(end, 6 * r, 0.9), opacity: 1 },
      ],
      rnd(2600, 3400),
    );
  }
}
