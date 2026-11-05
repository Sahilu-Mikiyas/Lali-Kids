/** Messages a game sends to Lali (docs/GAMES.md). */
export type GameMessage = { type: 'lali:score'; score: number } | { type: 'lali:finished' };

export function originOf(url: string): string | null {
  const m = /^(https?:\/\/[^/?#]+)/i.exec(url);
  return m ? m[1].toLowerCase() : null;
}

export function parseGameMessage(raw: unknown): GameMessage | null {
  try {
    const msg = (typeof raw === 'string' ? JSON.parse(raw) : raw) as { type?: string; score?: unknown } | null;
    if (msg?.type === 'lali:score' && typeof msg.score === 'number' && Number.isFinite(msg.score)) return { type: 'lali:score', score: msg.score };
    if (msg?.type === 'lali:finished') return { type: 'lali:finished' };
  } catch {
    // Not one of ours.
  }
  return null;
}
