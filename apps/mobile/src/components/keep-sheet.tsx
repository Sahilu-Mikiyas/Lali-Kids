import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { cancelAnimation, Easing, FadeIn, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useLang, useT, useUiFonts } from '@/i18n';
import type { ShelfStory } from '@/lib/api';
import { downloads, useDownloads, type KeepResult } from '@/lib/downloads';
import { fonts, useTheme } from '@/lib/theme';
import { Body, ChunkyButton, Heading, Note } from './ui';

const HOLD_MS = 1200;

/**
 * A button that only acts after being held down for a moment. Toddlers tap; grown-ups hold.
 * Screen readers get a normal "activate" action, since holding isn't possible there.
 */
function HoldButton({ label, onDone }: { label: string; onDone: () => void }) {
  const t = useTheme();
  const f = useUiFonts();
  const fill = useSharedValue(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fillStyle = useAnimatedStyle(() => ({ width: `${fill.get() * 100}%` }));

  const release = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    cancelAnimation(fill);
    fill.set(withTiming(0, { duration: 150 }));
  };
  useEffect(() => release, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityActions={[{ name: 'activate', label }]}
      onAccessibilityAction={(e) => e.nativeEvent.actionName === 'activate' && onDone()}
      onPressIn={() => {
        fill.set(withTiming(1, { duration: HOLD_MS, easing: Easing.linear }));
        timer.current = setTimeout(() => {
          timer.current = null;
          onDone();
        }, HOLD_MS);
      }}
      onPressOut={release}
      style={[styles.hold, { backgroundColor: t.teal }]}
    >
      <Animated.View style={[styles.holdFill, fillStyle]} />
      <Text style={[styles.holdText, { color: t.onAccent, fontFamily: f.displayBold }]}>{label}</Text>
    </Pressable>
  );
}

/**
 * "Keep on this phone": a grown-up confirms by holding the button, so a child tapping around
 * doesn't start a download by accident. Opened by a long press on the shelf or from the end of a story.
 */
export function KeepSheet({ story, onClose }: { story: ShelfStory | null; onClose: () => void }) {
  return story ? <Sheet key={story.id} story={story} onClose={onClose} /> : null;
}

function Sheet({ story, onClose }: { story: ShelfStory; onClose: () => void }) {
  const t = useTheme();
  const tr = useT();
  const lang = useLang();
  const wifiOnly = useDownloads((d) => d.wifiOnly);
  const [result, setResult] = useState<KeepResult | null>(null);
  const [working, setWorking] = useState(false);

  const title = story.title[lang] || story.title.en;
  const message: Record<KeepResult, string> = {
    saved: tr.downloads.saved,
    saving: tr.downloads.saving,
    'waiting-wifi': tr.downloads.waitingWifi,
    'waiting-offline': tr.downloads.waitingOffline,
    locked: tr.downloads.locked,
    failed: tr.downloads.failed,
  };

  return (
    <Modal transparent animationType="fade" visible onRequestClose={onClose} supportedOrientations={['portrait', 'landscape']}>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel={tr.downloads.notNow}>
        <Pressable style={[styles.sheet, { backgroundColor: t.surface }]} onPress={() => undefined}>
          <Heading style={{ fontFamily: lang === 'am' ? fonts.ethiopicBold : fonts.display, fontSize: 24, lineHeight: 32 }}>{tr.downloads.keepTitle(title)}</Heading>
          {result === null && !working && (
            <Animated.View entering={FadeIn} style={{ gap: 12 }}>
              <Body>{tr.downloads.keepSub}</Body>
              <Body>{wifiOnly ? tr.downloads.wifiNote : tr.downloads.dataNote}</Body>
              <Note>{tr.downloads.holdHint}</Note>
              <HoldButton
                label={tr.downloads.hold}
                onDone={async () => {
                  setWorking(true);
                  const r = await downloads.keep(story.id);
                  setWorking(false);
                  setResult(r);
                }}
              />
              <ChunkyButton variant="plain" label={tr.downloads.notNow} onPress={onClose} />
            </Animated.View>
          )}
          {working && (
            <>
              <View style={styles.row}>
                <ActivityIndicator color={t.teal} />
                <Body>{tr.downloads.saving}</Body>
              </View>
              {/* Closing doesn't stop the download. */}
              <ChunkyButton variant="plain" label={tr.common.close} onPress={onClose} />
            </>
          )}
          {result && (
            <Animated.View entering={FadeIn} style={{ gap: 12 }}>
              <Note tone={result === 'failed' || result === 'locked' ? 'error' : 'good'}>{message[result]}</Note>
              <ChunkyButton label={tr.common.done} onPress={onClose} />
            </Animated.View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(10,16,40,0.55)', justifyContent: 'flex-end', alignItems: 'center' },
  sheet: { width: '100%', maxWidth: 560, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 22, paddingBottom: 36, gap: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  hold: { borderRadius: 18, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  holdFill: { position: 'absolute', left: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.25)' },
  holdText: { fontSize: 19 },
});
