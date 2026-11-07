/**
 * The Lali app shows the website's animated books inside a web view. There, "close" and
 * "finished" go to the app (which records stars with the family's account) instead of the site.
 */
type AppMessage =
  | { type: "lali:close" }
  | { type: "lali:finished"; storyId: string }
  /** Find Lali: the child found her on this page (the app saves it with POST stickers/finds). */
  | { type: "lali:found"; storyId: string; page: number }
  /** The sticker book was tapped in the reader: the app shows its own (GET stickers). */
  | { type: "lali:stickers" };

type Bridge = { postMessage: (data: string) => void };

/** What the app may inject into the web view before the page loads (see docs/MOBILE.md). */
type AppInfo = { accessToken?: string; childId?: string };

function bridge(): Bridge | null {
  if (typeof window === "undefined") return null;
  return (window as unknown as { ReactNativeWebView?: Bridge }).ReactNativeWebView ?? null;
}

export function inApp(): boolean {
  return bridge() !== null;
}

/** Sends a message to the app; returns false on the plain website. */
export function tellApp(message: AppMessage): boolean {
  const b = bridge();
  if (!b) return false;
  b.postMessage(JSON.stringify(message));
  return true;
}

/**
 * Headers for the website's own API from inside the app: the web view has no website session,
 * so the app injects the parent's access token (and the reading child) as `window.LaliApp`.
 * On the website this is empty and the session cookie does the job.
 */
export function appAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const info = (window as unknown as { LaliApp?: AppInfo }).LaliApp;
  const h: Record<string, string> = {};
  if (info?.accessToken) h.Authorization = `Bearer ${info.accessToken}`;
  if (info?.childId) h["X-Lali-Child"] = info.childId;
  // On a classroom tablet the reader acts as the signed-in pupil (lib/schools/classroom.ts).
  if ((window as unknown as { LaliClassroom?: boolean }).LaliClassroom) h["X-Lali-Pupil"] = "1";
  return h;
}
