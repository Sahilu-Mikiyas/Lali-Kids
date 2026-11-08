import type { ComponentType } from "react";

import { THINGS } from "@/components/book/courses/fidel-foundations/things";
import type { ArtProps } from "../types";

/*
  Small pictures for this course's quiz questions, by id: the same drawings the story scenes use
  (src/components/book/courses/fidel-foundations/things.tsx), each in its own square <svg>.
  Ids are English words (cow, lemon, watermelon…); see things.tsx for the Amharic word and its letter.
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
  Art.displayName = `FidelArt(${id})`;
  return Art;
}

/** Small pictures for this course's quiz questions, by id. */
export const ART: Record<string, ComponentType<ArtProps>> = Object.fromEntries(Object.keys(THINGS).map((id) => [id, art(id)]));
