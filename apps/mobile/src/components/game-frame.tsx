import { StyleSheet } from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';
import type { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes';

import { originOf, parseGameMessage, type GameMessage } from './game-message';

export type { GameMessage } from './game-message';

/**
 * Runs before the game's own code. At the top of a web view `window.parent` is the page itself,
 * so a game's `window.parent.postMessage({type: "lali:…"}, "*")` arrives here as a message
 * event; pass it on to the app. Pop-ups are switched off.
 */
const BRIDGE = `(function () {
  if (window.__laliBridge) return;
  window.__laliBridge = true;
  window.addEventListener('message', function (e) {
    var d = e && e.data;
    if (!d || typeof d.type !== 'string' || d.type.indexOf('lali:') !== 0) return;
    try {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: d.type, score: typeof d.score === 'number' ? d.score : undefined }));
    } catch (err) {}
  });
  window.open = function () { return null; };
})();
true;`;

/** A sealed-off web view for one game: no pop-ups, and no pages from anywhere but the game's own site. */
export function GameFrame({ url, title, onMessage }: { url: string; title: string; onMessage: (m: GameMessage) => void }) {
  const origin = originOf(url);
  return (
    <WebView
      source={{ uri: url }}
      style={styles.frame}
      accessibilityLabel={title}
      injectedJavaScriptBeforeContentLoaded={BRIDGE}
      injectedJavaScriptBeforeContentLoadedForMainFrameOnly={false}
      onMessage={(e: WebViewMessageEvent): void => {
        const m = parseGameMessage(e.nativeEvent.data);
        if (m) onMessage(m);
      }}
      onShouldStartLoadWithRequest={(req: ShouldStartLoadRequest): boolean => {
        if (/^(about:blank|about:srcdoc|data:|blob:)/i.test(req.url)) return true;
        return originOf(req.url) === origin;
      }}
      // Every address goes through the check above: anything the web view's own list refuses is
      // handed to the phone (Linking.openURL), which would be a way out of the children's area.
      originWhitelist={['*']}
      onOpenWindow={(): void => undefined}
      setSupportMultipleWindows={false}
      javaScriptCanOpenWindowsAutomatically={false}
      allowsBackForwardNavigationGestures={false}
      allowsLinkPreview={false}
      allowFileAccess={false}
      allowsInlineMediaPlayback
      mediaPlaybackRequiresUserAction={false}
      setBuiltInZoomControls={false}
      overScrollMode="never"
      bounces={false}
      textInteractionEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  frame: { flex: 1, backgroundColor: 'transparent' },
});
