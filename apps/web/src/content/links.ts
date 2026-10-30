/**
 * Lali's channels and app store pages.
 * Fill each one in once the account exists. Anything left as null shows as
 * "coming soon" on the website instead of a broken link.
 */
export const SOCIAL: Record<SocialNetwork, string | null> = {
  youtube: null, // e.g. 'https://www.youtube.com/@lalikids'
  tiktok: null, // e.g. 'https://www.tiktok.com/@lalikids'
  telegram: null, // e.g. 'https://t.me/lalikids'
  instagram: null, // e.g. 'https://www.instagram.com/lalikids'
  facebook: null, // e.g. 'https://www.facebook.com/lalikids'
};

export type SocialNetwork = 'youtube' | 'tiktok' | 'telegram' | 'instagram' | 'facebook';

export const APP_STORES: { googlePlay: string | null; appStore: string | null } = {
  googlePlay: null,
  appStore: null,
};

/**
 * Videos shown on the home page, newest first. `id` is the part after
 * `watch?v=` in a YouTube link. Until there are videos, the page shows
 * "coming soon" cards made from the story pictures.
 */
export const FEATURED_VIDEOS: { id: string; title: string }[] = [];
