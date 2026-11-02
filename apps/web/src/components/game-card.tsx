import Link from "next/link";

import { agesLabel } from "@/content/stories";
import type { Game } from "@/lib/games";
import { Bee } from "./characters";

/** A game on the shelf. Locked games lead to the plans page. */
export function GameCard({ game }: { game: Game }) {
  return (
    <Link
      href={game.locked ? "/subscribe?plan=reader" : `/games/${game.slug}`}
      className="group block overflow-hidden rounded-[28px] bg-white shadow-[0_6px_0_var(--color-line)] transition hover:-translate-y-1"
    >
      <div className="relative grid aspect-[4/3] place-items-center" style={{ background: game.color }}>
        {game.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={game.thumbnail} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="animate-float transition-transform group-hover:scale-110">
            <Bee size={84} />
          </div>
        )}
        {game.locked && <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-bold shadow">🔒 With a plan</span>}
      </div>
      <div className="space-y-1 p-5">
        <h3 className="font-display text-xl font-extrabold">{game.title}</h3>
        {game.titleAm && <p className="font-ethiopic text-sm text-muted">{game.titleAm}</p>}
        {game.description && <p className="text-sm text-muted">{game.description}</p>}
        <p className="pt-1 text-sm font-bold text-muted">
          Ages {agesLabel(game.ageBands)}
          {game.isFree && <span className="ml-2 rounded-full bg-teal px-2 py-0.5 text-xs text-white">Free</span>}
        </p>
      </div>
    </Link>
  );
}
