/**
 * The Lali app shows the website's animated books inside a web view. There, "close" and
 * "finished" go to the app (which records stars with the family's account) instead of the site.
 */
type AppMessage = { type: "lali:close" } | { type: "lali:finished"; storyId: string };

type Bridge = { postMessage: (data: string) => void };

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
