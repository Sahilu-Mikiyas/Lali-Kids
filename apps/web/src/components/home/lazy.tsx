"use client";

import dynamic from "next/dynamic";

/*
  Home-page extras that float over the page (the music button and Lali following the reader):
  nothing to read in them, so they load after the page is up instead of with it.
*/
export const LazyMusicPlayer = dynamic(() => import("./music-player").then((m) => m.MusicPlayer), { ssr: false });
export const LazyFollowBee = dynamic(() => import("./follow-bee").then((m) => m.FollowBee), { ssr: false });
