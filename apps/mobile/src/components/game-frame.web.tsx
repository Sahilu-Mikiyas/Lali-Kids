import { createElement, useEffect, useState } from 'react';

import { config } from '@/lib/config';
import { originOf, parseGameMessage, type GameMessage } from './game-message';

export type { GameMessage } from './game-message';

/** The web build shows games the way the website does: a sandboxed frame with no pop-ups or navigation out. */
export function GameFrame({ url, title, onMessage }: { url: string; title: string; onMessage: (m: GameMessage) => void }) {
  const [frame, setFrame] = useState<HTMLIFrameElement | null>(null);
  const origin = originOf(url);

  useEffect(() => {
    const listen = (e: MessageEvent) => {
      if (!frame || e.source !== frame.contentWindow) return;
      const m = parseGameMessage(e.data);
      if (m) onMessage(m);
    };
    window.addEventListener('message', listen);
    return () => window.removeEventListener('message', listen);
  }, [frame, onMessage]);

  return createElement('iframe', {
    ref: setFrame,
    src: url,
    title,
    // No allow-popups, allow-top-navigation or allow-forms: the game stays inside its box.
    // Games hosted on Lali's own site run without same-origin rights (as on the website), so they
    // can't reach the family's sign-in there; outside games keep their own origin.
    sandbox: origin && origin !== originOf(config.apiUrl) ? 'allow-scripts allow-same-origin allow-pointer-lock' : 'allow-scripts allow-pointer-lock',
    allow: 'autoplay; fullscreen; gamepad',
    referrerPolicy: 'no-referrer',
    style: { border: 0, width: '100%', height: '100%', display: 'block' },
  });
}
