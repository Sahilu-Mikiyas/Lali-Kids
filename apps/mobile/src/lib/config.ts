/**
 * Public settings for talking to Lali's backend (see docs/MOBILE.md).
 * These are safe to ship inside the app; the Supabase secret key never goes here.
 * Set EXPO_PUBLIC_* variables to point a build somewhere else.
 */
export const config = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://ihrdwifjtruakztugwll.supabase.co',
  supabasePublishableKey: process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_vNT4Uq09c8b-sGBVPF9NOw_a66nllMu',
  apiUrl: (process.env.EXPO_PUBLIC_API_URL || 'https://lali-kids.onrender.com').replace(/\/$/, ''),
};

/** Where the sign-in email sends the parent. The website hands the code on to `lali://auth`. */
export const AUTH_REDIRECT = `${config.apiUrl}/auth/callback?app=1`;

/** The website's Grown-ups' corner (Telegram, payment history and receipts). */
export const WEBSITE_ACCOUNT_URL = `${config.apiUrl}/account`;

/** Where the payment page sends the parent back to. */
export const PLAN_RETURN_URL = 'lali://plan';
