const COLORS = ["#E8513B", "#0E8C80", "#F5B21E", "#D63B72", "#2F5BD3"];

/** A short burst of confetti over the whole window. Does nothing for reduced motion. */
export function confetti(originY = 0.45) {
  if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, { position: "fixed", inset: "0", width: "100%", height: "100%", pointerEvents: "none", zIndex: "100" });
  document.body.append(canvas);
  const dpr = window.devicePixelRatio || 1;
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);

  let parts = Array.from({ length: 170 }, () => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * 240,
    y: innerHeight * originY,
    vx: (Math.random() - 0.5) * 17,
    vy: -Math.random() * 16 - 6,
    r: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    w: 8 + Math.random() * 8,
    h: 5 + Math.random() * 6,
    c: COLORS[Math.floor(Math.random() * COLORS.length)],
    life: 0,
  }));

  const tick = () => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const p of parts) {
      p.vy += 0.45;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      p.life++;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    parts = parts.filter((p) => p.y < innerHeight + 40 && p.life < 260);
    if (parts.length) requestAnimationFrame(tick);
    else canvas.remove();
  };
  requestAnimationFrame(tick);
}
