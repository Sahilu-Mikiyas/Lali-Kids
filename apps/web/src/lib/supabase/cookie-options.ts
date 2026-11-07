/**
 * How the sign-in session cookies are set. Nothing in the browser reads them (the site talks to
 * Supabase only from the server), so they are HttpOnly: a script injected into a page can't steal
 * the session. Secure in production, so they never travel over plain HTTP; SameSite=Lax as before.
 * (Browsers accept Secure cookies on http://localhost, so local production builds still work.)
 */
export const AUTH_COOKIE_OPTIONS = {
  path: "/",
  sameSite: "lax" as const,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};
