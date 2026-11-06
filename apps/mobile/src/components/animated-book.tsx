import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';
import type { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes';

import { Bee } from '@/components/characters';
import { config } from '@/lib/config';
import type { Lang } from '@/lib/api';

export type BookMessage = { type: 'lali:close' } | { type: 'lali:finished'; storyId: string };

function parse(data: string): BookMessage | null {
  try {
    const m = JSON.parse(data) as { type?: unknown; storyId?: unknown };
    if (m.type === 'lali:close') return { type: 'lali:close' };
    if (m.type === 'lali:finished' && typeof m.storyId === 'string') return { type: 'lali:finished', storyId: m.storyId };
  } catch {
    // Not one of ours.
  }
  return null;
}

/**
 * The website's full-screen animated book (3D cover, page curls, moving pictures) inside the app,
 * for the launch stories. The page tells the app when the child closes the book or reaches the end,
 * and the app records the star. If the page can't load (offline), `onFail` lets the app's own
 * reader take over.
 */
export function AnimatedBook({ id, pass, lang, onMessage, onFail }: { id: string; pass?: string; lang: Lang; onMessage: (m: BookMessage) => void; onFail: () => void }) {
  const [loading, setLoading] = useState(true);
  const origin = config.apiUrl;
  // /am/… and /en/… set the website's language and then show the plain address.
  const uri = `${origin}/${lang}/stories/${encodeURIComponent(id)}${pass ? `?pass=${encodeURIComponent(pass)}` : ''}`;
  return (
    <View style={styles.wrap}>
      <WebView
        source={{ uri }}
        style={styles.frame}
        onMessage={(e: WebViewMessageEvent): void => {
          const m = parse(e.nativeEvent.data);
          if (m) onMessage(m);
        }}
        // Only Lali's own pages: no links out of the children's area.
        onShouldStartLoadWithRequest={(r: ShouldStartLoadRequest): boolean => r.url.startsWith(origin) || r.url === 'about:blank'}
        originWhitelist={['*']}
        setSupportMultipleWindows={false}
        allowsBackForwardNavigationGestures={false}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback
        onLoadEnd={() => setLoading(false)}
        onError={onFail}
        onHttpError={(e): void => {
          if (e.nativeEvent.statusCode >= 500) onFail();
        }}
      />
      {loading && (
        <View style={styles.loading} pointerEvents="none">
          <ActivityIndicator size="large" color="#E8513B" />
          <Bee size={56} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#1B2A4E' },
  frame: { flex: 1, backgroundColor: 'transparent' },
  loading: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center', gap: 16, backgroundColor: '#F4F9FF' },
});
