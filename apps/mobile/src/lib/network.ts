import * as Network from 'expo-network';

import type { Net } from './offline/policy';

function toNet(s: Network.NetworkState): Net {
  const online = s.isConnected === false || s.isInternetReachable === false ? false : s.isConnected === true ? true : null;
  return { online, type: s.type ?? null };
}

/**
 * Follows the phone's connection with expo-network: online or not, and Wi-Fi or mobile data.
 * On the web build it follows the browser's online/offline events.
 */
export function watchNetwork(onChange: (net: Net) => void): () => void {
  let alive = true;
  Network.getNetworkStateAsync()
    .then((s) => alive && onChange(toNet(s)))
    .catch(() => undefined);
  let sub: { remove: () => void } | null = null;
  try {
    sub = Network.addNetworkStateListener((s) => onChange(toNet(s)));
  } catch {
    // No listener on this platform; the first answer and failed fetches still tell us.
  }
  return () => {
    alive = false;
    sub?.remove();
  };
}
