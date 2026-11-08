"use client";

import { useState, type ComponentType } from "react";

import type { ArtProps, Demo, DemoProps } from "../../src/content/courses/types";

/* Test-only pictures and demonstration for the fixture courses (see course.ts). */

function Flower({ size = 48, className }: ArtProps) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} aria-hidden data-art="flower">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx={20} cy={11} rx={6} ry={9} fill="#F48FB1" transform={`rotate(${a} 20 20)`} />
      ))}
      <circle cx={20} cy={20} r={6} fill="#FFD23F" />
    </svg>
  );
}

function Stone({ size = 48, className }: ArtProps) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} aria-hidden data-art="stone">
      <ellipse cx={20} cy={24} rx={15} ry={10} fill="#9AA3B5" />
    </svg>
  );
}

export const FIXTURE_ART: Record<string, Record<string, ComponentType<ArtProps>>> = {
  "test-course-a": { flower: Flower, stone: Stone },
  "test-course-b": {},
};

function TapThree({ lang, onDone }: DemoProps) {
  const [n, setN] = useState(0);
  return (
    <div className="grid place-items-center gap-4 p-6" data-demo="tap-three">
      <p className="font-display text-2xl font-black">{lang === "am" ? "ሦስት አበቦችን ንኩ" : "Tap three flowers"}</p>
      <div className="flex gap-3">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            type="button"
            aria-label={`flower ${i + 1}`}
            data-demo-flower={i}
            className={`rounded-full p-2 ${i < n ? "bg-gold/40" : "bg-white"}`}
            onClick={() => {
              if (i !== n) return;
              setN(n + 1);
              if (n + 1 === 3) onDone();
            }}
          >
            <Flower size={56} />
          </button>
        ))}
      </div>
    </div>
  );
}

export const FIXTURE_DEMOS: Record<string, Record<string, Demo>> = {
  "test-course-a": { "tap-three": TapThree },
  "test-course-b": {},
};
