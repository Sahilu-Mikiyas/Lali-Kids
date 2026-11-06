import type { Lang } from '@/lib/api';

export type BookMessage = { type: 'lali:close' } | { type: 'lali:finished'; storyId: string };

/** On the app's web build the native reader is used; the website itself has the animated book. */
export function AnimatedBook(props: { id: string; lang: Lang; onMessage: (m: BookMessage) => void; onFail: () => void }) {
  void props;
  return null;
}
