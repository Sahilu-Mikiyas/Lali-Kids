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

export type FeaturedVideo = {
  /** The part after `watch?v=` in a YouTube link. */
  id: string;
  title: { en: string; am: string };
  /** The channel that made it, when known. */
  channel?: string;
  /** True for the placeholder videos from other channels (see below). */
  sample?: boolean;
};

/**
 * Videos shown in the home page's little cinema, newest first. The first one is on the big
 * screen; the rest are the playlist row.
 *
 * SAMPLES: every video below is a SAMPLE from someone else's channel, there only to show how
 * videos play on the page. They are marked `sample: true`, and while any are listed the page
 * shows a "Sample videos" note. Replace them with Lali's own videos (and drop `sample`) once
 * the channel has them. With an empty list, the page shows "coming soon" cards instead.
 */
export const FEATURED_VIDEOS: FeaturedVideo[] = [
  // SAMPLE videos from other channels. Swap for Lali's own.
  { id: 'cpEd86gQ7n8', title: { en: 'Amharic alphabet song', am: 'የአማርኛ ፊደል መዝሙር' }, channel: 'Habesha Kids', sample: true },
  { id: 'wOB6-LPUtJU', title: { en: 'Hahu alphabet song', am: 'የሀሁ መዝሙር' }, sample: true },
  { id: '-RB3BPR6eFo', title: { en: 'Amharic letters ሀ and ለ', am: 'የአማርኛ ፊደላት ሀ እና ለ' }, sample: true },
  { id: 'zBJ_Ye54JxE', title: { en: 'Hard-working Alemitu', am: 'ታታሪዋ አለሚቱ' }, sample: true },
  { id: 'jejyf7yxCF4', title: { en: 'The Three Little Pigs in Amharic', am: 'ሦስቱ ትናንሽ አሳማዎች' }, sample: true },
  { id: '23_mESawEEc', title: { en: 'The Lion and the Mouse', am: 'አንበሳውና አይጧ' }, sample: true },
];
