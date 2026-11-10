import type { ComponentType } from "react";

import { THINGS } from "@/components/book/courses/amharic-readers/things";
import type { ArtProps } from "../types";

/*
  Small pictures for this course's quiz questions, by id: the same drawings the story scenes use
  (src/components/book/courses/amharic-readers/things.tsx), each in its own square <svg>.
  Ids are English words (goat, lemon, swimmer, notebook…).
*/
function art(id: string): ComponentType<ArtProps> {
  const Draw = THINGS[id];
  function Art({ size = 72, className }: ArtProps) {
    return (
      <svg viewBox="-44 -44 88 88" width={size} height={size} className={className} aria-hidden>
        <Draw />
      </svg>
    );
  }
  Art.displayName = `AmharicReadersArt(${id})`;
  return Art;
}

/** Small pictures for this course's quiz questions, by id. */
export const ART: Record<string, ComponentType<ArtProps>> = Object.fromEntries(Object.keys(THINGS).map((id) => [id, art(id)]));
