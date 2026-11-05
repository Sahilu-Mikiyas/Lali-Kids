import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, AppState, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Bee } from '@/components/characters';
import { Confetti } from '@/components/confetti';
import { GameFrame, type GameMessage } from '@/components/game-frame';
import { ChunkyButton, Heading } from '@/components/ui';
import { useLang, useT, useUiFonts } from '@/i18n';
import { api, type GameStart } from '@/lib/api';
import { goBackOr } from '@/lib/nav';
import { actions } from '@/lib/store';
import { fonts, hasEthiopic, useTheme } from '@/lib/theme';

const TICK_S = 15;

type Started = Extract<GameStart, { ok: true }>;

/**
 * Plays one game. Time counts only while the game is on screen and the app is in front,
 * in 15-second steps reported to the server, which keeps each child's daily total.
 */
export default function Play() {
  const { slug, title: titleParam } = useLocalSearchParams<{ slug: string; title?: string }>();
  const t = useTheme();
  const tr = useT();
  const f = useUiFonts();
  const lang = useLang();
  const [start, setStart] = useState<GameStart | null>(null);
  const [failed, setFailed] = useState(false);
  const [left, setLeft] = useState<number | null>(null);
  const [cheer, setCheer] = useState(0);
  const [title, setTitle] = useState(titleParam ?? '');
  const visible = useRef(true);
  const session = start?.ok ? start.sessionId : null;

  const begin = useCallback(() => {
    api
      .startGame(String(slug))
      .then((s) => {
        setFailed(false);
        setStart(s);
        if (s.ok) setLeft(s.secondsLeft);
      })
      .catch(() => setFailed(true));
    // The shelf knows the game's name; fetch it quietly for the title bar.
    api
      .games()
      .then(({ games }) => {
        const g = games.find((x) => x.slug === slug);
        if (g) setTitle((lang === 'am' && g.titleAm) || g.title);
      })
      .catch(() => undefined);
  }, [slug, lang]);

  useEffect(() => {
    begin();
  }, [begin]);

  // On screen = this screen is focused and the app is in the foreground.
  useFocusEffect(
    useCallback(() => {
      visible.current = AppState.currentState === 'active';
      return () => {
        visible.current = false;
      };
    }, []),
  );

  const timeUp = left !== null && left <= 0;

  useEffect(() => {
    if (!session || timeUp) return;
    let last = Date.now();
    const app = AppState.addEventListener('change', (state) => {
      visible.current = state === 'active';
      // Time away from the app never counts.
      last = Date.now();
    });
    const timer = setInterval(() => {
      const now = Date.now();
      const spent = Math.min(30, (now - last) / 1000);
      last = now;
      if (!visible.current) return;
      setLeft((l) => (l === null ? l : l - spent));
      api
        .tickGame(session, { seconds: Math.round(spent) })
        .then((r) => {
          if (r.secondsLeft !== null) setLeft(r.secondsLeft);
        })
        .catch(() => undefined);
    }, TICK_S * 1000);
    return () => {
      clearInterval(timer);
      app.remove();
    };
  }, [session, timeUp]);

  // Refresh the family's counters when leaving, so the shelf shows the time left.
  useEffect(() => () => void actions.refreshMe(), []);

  const onMessage = useCallback(
    (m: GameMessage) => {
      if (m.type === 'lali:score' && session) api.tickGame(session, { score: m.score }).catch(() => undefined);
      if (m.type === 'lali:finished') {
        setCheer((n) => n + 1);
        setTimeout(() => setCheer(0), 2600);
      }
    },
    [session],
  );

  if (failed) {
    return (
      <Shell>
        <Bee size={64} />
        <Heading style={{ textAlign: 'center' }}>{tr.common.offline}</Heading>
        <ChunkyButton
          label={tr.common.tryAgain}
          onPress={() => {
            setFailed(false);
            setStart(null);
            begin();
          }}
        />
        <ChunkyButton variant="plain" label={tr.common.back} onPress={() => goBackOr('/games')} />
      </Shell>
    );
  }

  if (!start) {
    return (
      <Shell>
        <ActivityIndicator size="large" color={t.coral} />
      </Shell>
    );
  }

  if (!start.ok || timeUp) {
    const reason = start.ok ? 'time-up' : start.reason;
    const message = { 'time-up': tr.games.timeUp, off: tr.games.turnedOff, locked: tr.games.locked, missing: tr.games.missing }[reason];
    return (
      <Shell night>
        <Animated.View entering={ZoomIn.springify()} style={{ alignItems: 'center', gap: 14 }}>
          <Bee size={84} />
          <Text style={[styles.endTitle, { fontFamily: f.display }]}>{message}</Text>
          {reason === 'time-up' && <Text style={[styles.endSub, { fontFamily: f.body }]}>{tr.games.timeUpSub}</Text>}
          <ChunkyButton label={tr.games.readStory} onPress={() => router.replace('/read')} />
          {reason === 'locked' && <ChunkyButton variant="plain" label={tr.reader.seePlans} onPress={() => router.replace('/plan')} />}
        </Animated.View>
      </Shell>
    );
  }

  return <Playing start={start} title={title} left={left} cheer={cheer} onMessage={onMessage} fontFamily={hasEthiopic(title) ? fonts.ethiopicBold : f.displayBold} />;
}

function Playing({ start, title, left, cheer, onMessage, fontFamily }: { start: Started; title: string; left: number | null; cheer: number; onMessage: (m: GameMessage) => void; fontFamily: string }) {
  const t = useTheme();
  const tr = useT();
  const f = useUiFonts();
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: t.bg }]}>
      <View style={styles.bar}>
        <ChunkyButton small variant="plain" label={tr.common.close} onPress={() => goBackOr('/games')} />
        <Text style={[styles.title, { color: t.ink, fontFamily }]} numberOfLines={1}>
          {title}
        </Text>
        {left !== null && (
          <View style={[styles.pill, { backgroundColor: t.surface }]}>
            <Text style={[styles.pillText, { color: t.ink, fontFamily: f.bodyBold }]}>{tr.games.minLeft(Math.max(0, Math.ceil(left / 60)))}</Text>
          </View>
        )}
      </View>
      <View style={[styles.frame, { borderColor: t.line }]}>
        <GameFrame url={start.url} title={title} onMessage={onMessage} />
        {cheer > 0 && (
          <Animated.View key={cheer} entering={FadeIn} style={styles.cheer} pointerEvents="none">
            <Confetti />
            <Text style={[styles.yay, { fontFamily: f.display }]}>{tr.games.yay}</Text>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}

function Shell({ children, night }: { children: React.ReactNode; night?: boolean }) {
  const t = useTheme();
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: night ? '#0E1631' : t.bg }]}>
      <View style={styles.center}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24, maxWidth: 560, width: '100%', alignSelf: 'center' },
  bar: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingVertical: 8 },
  title: { flex: 1, fontSize: 18 },
  pill: { borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  pillText: { fontSize: 14, fontVariant: ['tabular-nums'] },
  frame: { flex: 1, marginHorizontal: 12, marginBottom: 12, borderRadius: 24, overflow: 'hidden', borderBottomWidth: 6 },
  cheer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  yay: { fontSize: 44, color: '#F5B21E', textShadowColor: 'rgba(0,0,0,0.35)', textShadowRadius: 6 },
  endTitle: { color: '#fff', fontSize: 28, lineHeight: 36, textAlign: 'center' },
  endSub: { color: '#AAB5D8', fontSize: 18, textAlign: 'center' },
});
