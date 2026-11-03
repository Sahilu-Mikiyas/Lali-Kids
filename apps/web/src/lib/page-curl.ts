/*
  Geometry for a page that curls over as it turns (a "page peel").

  Coordinates: the spine is x = 0, the page being turned lies on x ∈ [0, W], y ∈ [0, H],
  and a finished turn lands it on x ∈ [-W, 0]. The reader drags the corner C (bottom or
  top outer corner) to a point P. The fold is the line halfway between C and P, at right
  angles to CP. The part of the page beyond the fold flips over (mirrored across it);
  the rest stays flat. Everything is plain 2D: clip polygons and one affine transform,
  which browsers composite cheaply.
*/

export type Pt = { x: number; y: number };

const sub = (a: Pt, b: Pt): Pt => ({ x: a.x - b.x, y: a.y - b.y });
const dot = (a: Pt, b: Pt) => a.x * b.x + a.y * b.y;
const len = (a: Pt) => Math.hypot(a.x, a.y);

/** Keep P where a real page could reach: the page stays joined to the spine. */
export function constrain(P: Pt, W: number, H: number, cornerY: number): Pt {
  let p = { ...P };
  const near: Pt = { x: 0, y: cornerY }; // spine end on the corner's side
  const far: Pt = { x: 0, y: H - cornerY }; // the other spine end
  const d1 = len(sub(p, near));
  if (d1 > W) p = { x: near.x + ((p.x - near.x) * W) / d1, y: near.y + ((p.y - near.y) * W) / d1 };
  const diag = Math.hypot(W, H);
  const d2 = len(sub(p, far));
  if (d2 > diag) p = { x: far.x + ((p.x - far.x) * diag) / d2, y: far.y + ((p.y - far.y) * diag) / d2 };
  return p;
}

/** Cut a polygon to the side of a line where (v − M)·n ≤ 0. */
function clipHalf(poly: Pt[], M: Pt, n: Pt): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const fa = dot(sub(a, M), n);
    const fb = dot(sub(b, M), n);
    if (fa <= 0) out.push(a);
    if ((fa < 0 && fb > 0) || (fa > 0 && fb < 0)) {
      const t = fa / (fa - fb);
      out.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
    }
  }
  return out;
}

export type Curl = {
  /** 0 = flat and unturned, 1 = turned over completely. */
  t: number;
  /** Part of the page still lying flat, in page coordinates. */
  front: Pt[];
  /** The folded-over part, where it now lies (spine coordinates). */
  flap: Pt[];
  /** The part of the page lifted away, where it was (spine coordinates). */
  lifted: Pt[];
  /** Mirror across the fold: v' = A·v + b, as [a, b, c, d, e, f] like CSS matrix(). */
  reflect: [number, number, number, number, number, number];
  /** A point on the fold and the unit normal pointing back toward the corner. */
  M: Pt;
  n: Pt;
  /** Distance from the fold to the lifted corner. */
  depth: number;
};

export function computeCurl(P: Pt, W: number, H: number, cornerY: number): Curl {
  const C: Pt = { x: W, y: cornerY };
  const page: Pt[] = [
    { x: 0, y: 0 },
    { x: W, y: 0 },
    { x: W, y: H },
    { x: 0, y: H },
  ];
  const d = sub(C, P);
  const dl = len(d);
  const t = Math.min(1, Math.max(0, (W - P.x) / (2 * W)));
  if (dl < 0.5) {
    return { t: 0, front: page, flap: [], lifted: [], reflect: [1, 0, 0, 1, 0, 0], M: C, n: { x: 1, y: 0 }, depth: 0 };
  }
  const n = { x: d.x / dl, y: d.y / dl };
  const M = { x: (P.x + C.x) / 2, y: (P.y + C.y) / 2 };
  const front = clipHalf(page, M, n);
  const lifted = clipHalf(page, M, { x: -n.x, y: -n.y });
  // Reflection across the fold line through M with normal n.
  const a = 1 - 2 * n.x * n.x;
  const bc = -2 * n.x * n.y;
  const dd = 1 - 2 * n.y * n.y;
  const k = 2 * dot(M, n);
  const e = k * n.x;
  const f = k * n.y;
  const flap = lifted.map((v) => ({ x: a * v.x + bc * v.y + e, y: bc * v.x + dd * v.y + f }));
  return { t, front, flap, lifted, reflect: [a, bc, bc, dd, e, f], M, n, depth: dl / 2 };
}

export const polygon = (pts: Pt[], dx = 0, dy = 0) =>
  pts.length ? `polygon(${pts.map((p) => `${(p.x + dx).toFixed(1)}px ${(p.y + dy).toFixed(1)}px`).join(",")})` : "polygon(0 0)";

export const points = (pts: Pt[], dx = 0, dy = 0) => pts.map((p) => `${(p.x + dx).toFixed(1)},${(p.y + dy).toFixed(1)}`).join(" ");

/**
 * CSS transform for the back of the turning page. The back face is drawn as a normal
 * page sitting where it lands (x ∈ [-W, 0]); mirroring it across the spine and then across
 * the fold puts it on the flap, the right way round.
 */
export function backTransform(c: Curl, W: number): string {
  const [a, b, cc, d, e, f] = c.reflect;
  // Compose: local l → screen q = l + O, with O = (−W, 0); then S(q) = (−q.x, q.y); then reflect.
  // Matrix of reflect∘S = [[−a, cc], [−b, d]]; offset = reflect∘S(O) + (e, f) − O.
  const A = -a;
  const B = -b;
  const Cc = cc;
  const D = d;
  const ox = A * -W + e + W;
  const oy = B * -W + f;
  return `matrix(${A.toFixed(5)},${B.toFixed(5)},${Cc.toFixed(5)},${D.toFixed(5)},${ox.toFixed(2)},${oy.toFixed(2)})`;
}

/** The lifted region seen from the back face's own box (x ∈ [0, W]). */
export function backClip(c: Curl, W: number): string {
  return polygon(
    c.lifted.map((v) => ({ x: -v.x, y: v.y })),
    W,
  );
}

/** Where the corner travels on an automatic turn: across and slightly up, like a lifted page. */
export function cornerPath(u: number, W: number, H: number, cornerY: number): Pt {
  const lift = H * 0.16 * Math.sin(Math.PI * u);
  return { x: W - 2 * W * u, y: cornerY === 0 ? cornerY + lift : cornerY - lift };
}
