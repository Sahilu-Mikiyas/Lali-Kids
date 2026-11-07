/*
  The classroom reader (/class/<code>/read/<story>) marks the page, so the reader's own requests
  (/api/read-aloud, /api/stickers, /api/narration) add X-Lali-Pupil: 1 (lib/in-app.ts) and the
  server answers for the pupil in the signed classroom cookie instead of a family. Every other
  page leaves the pupil cookie alone.
*/
export function markClassroom() {
  if (typeof window !== "undefined") (window as unknown as { LaliClassroom?: boolean }).LaliClassroom = true;
}
