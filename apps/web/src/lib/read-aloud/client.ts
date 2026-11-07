"use client";

import { useEffect, useSyncExternalStore } from "react";

import { appAuthHeaders } from "@/lib/in-app";

/*
  The read-along microphone's settings in the browser.

  "Listen to my child read" is a parent's choice, off by default: with it on, the reader uses the
  browser's speech recognition, which sends the child's voice to the browser maker's servers.
  Signed in, the choice is kept with the family (profiles.mic_listen) and this browser keeps a
  copy; signed out, only this browser keeps it. Without it the reader records on the device only.
*/

const KEY = "lali-mic-listen";

export type ReaderInfo = { signedIn: boolean; ageBand: string | null; micListen: boolean | null };

let info: ReaderInfo | null = null;
let loading: Promise<ReaderInfo> | null = null;
let localValue: boolean | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

function readLocal(): boolean {
  if (localValue !== null) return localValue;
  try {
    localValue = window.localStorage.getItem(KEY) === "on";
  } catch {
    localValue = false;
  }
  return localValue;
}

function writeLocal(on: boolean) {
  localValue = on;
  try {
    window.localStorage.setItem(KEY, on ? "on" : "off");
  } catch {
    // Storage blocked: the choice lasts until the page closes.
  }
}

/** Asks the server once per page load who is reading and what the family chose. */
export function loadReaderInfo(): Promise<ReaderInfo> {
  if (loading) return loading;
  loading = fetch("/api/read-aloud", { headers: appAuthHeaders(), cache: "no-store" })
    .then((r) => (r.ok ? r.json() : { signedIn: false }))
    .then((b: Partial<ReaderInfo>) => {
      info = { signedIn: Boolean(b.signedIn), ageBand: typeof b.ageBand === "string" ? b.ageBand : null, micListen: typeof b.micListen === "boolean" ? b.micListen : null };
      if (info.signedIn && info.micListen !== null) writeLocal(info.micListen);
      emit();
      return info;
    })
    .catch(() => {
      info = { signedIn: false, ageBand: null, micListen: null };
      emit();
      return info;
    });
  return loading;
}

const getInfo = () => info;

/** Who is reading (null until known). */
export function useReaderInfo(): ReaderInfo | null {
  useEffect(() => {
    void loadReaderInfo();
  }, []);
  return useSyncExternalStore(subscribe, getInfo, () => null);
}

/** Whether a grown-up turned on "Listen to my child read". */
export function useMicListen(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => (info?.signedIn && info.micListen !== null ? info.micListen : readLocal()),
    () => false,
  );
}

/** Changes the choice: in this browser, and with the family when signed in. Returns whether the server kept it. */
export async function setMicListen(on: boolean): Promise<boolean> {
  writeLocal(on);
  if (info) info = { ...info, micListen: info.signedIn ? on : info.micListen };
  emit();
  if (!info?.signedIn) return false;
  try {
    const r = await fetch("/api/read-aloud", { method: "PATCH", headers: { "Content-Type": "application/json", ...appAuthHeaders() }, body: JSON.stringify({ micListen: on }) });
    const b = (await r.json().catch(() => ({}))) as { saved?: boolean };
    return Boolean(r.ok && b.saved);
  } catch {
    return false;
  }
}

/** For the Grown-ups' corner, which already read the family's choice on the server. */
export function adoptMicListen(serverValue: boolean | null) {
  if (typeof window === "undefined" || serverValue === null) return;
  writeLocal(serverValue);
  info = { signedIn: true, ageBand: info?.ageBand ?? null, micListen: serverValue };
  loading ??= Promise.resolve(info);
  emit();
}

/** Speech recognition, where the browser has it. */
type RecognitionCtor = new () => SpeechRecognitionLike;
export type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: SpeechResultEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  onstart?: (() => void) | null;
};
export type SpeechResultEvent = {
  resultIndex: number;
  results: ArrayLike<ArrayLike<{ transcript: string; confidence?: number }> & { isFinal: boolean }>;
};

export function recognitionCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/** Recording on the device (the fallback that always works where there's a microphone). */
export function canRecord(): boolean {
  return typeof window !== "undefined" && typeof MediaRecorder !== "undefined" && Boolean(navigator.mediaDevices?.getUserMedia);
}
