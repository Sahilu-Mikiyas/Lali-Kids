import { router, type Href } from 'expo-router';

/** Go back if there is somewhere to go back to; on the web a story can be opened straight from a link. */
export function goBackOr(fallback: Href) {
  if (router.canGoBack()) router.back();
  else router.replace(fallback);
}
