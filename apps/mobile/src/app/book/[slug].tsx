import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import * as ScreenCapture from 'expo-screen-capture';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { Bee } from '@/components/characters';
import { ChunkyButton, Heading, Note } from '@/components/ui';
import { useT, useUiFonts } from '@/i18n';
import { api, authHeaders, isApiError, type BookPage } from '@/lib/api';
import { goBackOr } from '@/lib/nav';
import { actions } from '@/lib/store';
import { fonts, hasEthiopic, useTheme } from '@/lib/theme';

/** Pages fetched per request. */
const WINDOW = 6;
/** Ask for fresh links this long before they expire. */
const MARGIN_S = 25;

type Link = BookPage & { at: number };
type Problem = 'signin' | 'plan' | 'tooFast' | 'missing' | 'offline' | null;

/** Android: no screenshots or screen recording while a book page is on screen. */
function useNoScreenshots() {
  useEffect(() => {
    if (Platform.OS === 'web') return;
    ScreenCapture.preventScreenCaptureAsync('book').catch(() => undefined);
    return () => {
      ScreenCapture.allowScreenCaptureAsync('book').catch(() => undefined);
    };
  }, []);
}

function Arrow({ dir }: { dir: 'left' | 'right' }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} stroke="#2A2414" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/**
 * A partner book, one page at a time. Each page is a link that works for 90 seconds and only with
 * the parent's sign-in, so links are fetched a few pages at a time, renewed before they expire,
 * shown from memory and never written to the phone's storage.
 */
export default function BookReader() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const t = useTheme();
  const tr = useT();
  const f = useUiFonts();
  const { width, height } = useWindowDimensions();
  useNoScreenshots();

  const [title, setTitle] = useState('');
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [links, setLinks] = useState<Record<number, Link>>({});
  const [headers, setHeaders] = useState<Record<string, string> | null>(null);
  const [problem, setProblem] = useState<Problem>(null);
  const [broken, setBroken] = useState(false);
  const valid = useRef(90);
  const loading = useRef<Set<number>>(new Set());
  /** The link each page was first shown with: kept so a page on screen doesn't download again. */
  const [shown, setShown] = useState<Record<number, string>>({});
  const finished = useRef(false);

  const fetchFrom = useCallback(
    async (from: number) => {
      if (loading.current.has(from)) return;
      loading.current.add(from);
      try {
        const [res, h] = await Promise.all([api.bookPages(String(slug), from, from + WINDOW - 1), authHeaders()]);
        valid.current = res.validSeconds || 90;
        setHeaders(h);
        setTitle(res.title);
        setCount(res.pageCount);
        const at = Date.now();
        setLinks((old) => {
          const next = { ...old };
          for (const p of res.pages) next[p.n] = { ...p, at };
          return next;
        });
        setProblem(null);
      } catch (e) {
        setProblem(isApiError(e, 'signin') ? 'signin' : isApiError(e, 'plan') ? 'plan' : isApiError(e, 'tooFast') ? 'tooFast' : isApiError(e, 'notfound') ? 'missing' : 'offline');
      } finally {
        loading.current.delete(from);
      }
    },
    [slug],
  );

  const fresh = useCallback((n: number) => {
    const l = links[n];
    return Boolean(l && Date.now() - l.at < (valid.current - MARGIN_S) * 1000);
  }, [links]);

  // Make sure this page and the next have working links; renew them before they run out.
  useEffect(() => {
    const check = () => {
      const need = [page, page + 1].filter((n) => (count === 0 || n <= count) && !shown[n] && !fresh(n));
      if (need.length) fetchFrom(need[0]);
    };
    check();
    const timer = setInterval(check, 15_000);
    return () => clearInterval(timer);
  }, [page, count, fresh, fetchFrom, shown]);

  useEffect(() => {
    if (count > 0 && page === count && !finished.current) {
      finished.current = true;
      actions.finishStory(String(slug), 'book');
    }
  }, [page, count, slug]);

  const link = links[page];
  // A page that has loaded keeps its link, so going back to it doesn't download it again.
  const uri = shown[page] ?? link?.url;

  const go = (to: number) => {
    setBroken(false);
    setPage(Math.max(1, Math.min(count || 1, to)));
  };

  if (problem === 'signin' || problem === 'plan' || problem === 'missing') {
    return (
      <SafeAreaView style={[styles.screen, { backgroundColor: t.bg }]}>
        <View style={styles.center}>
          <Bee size={64} />
          <Heading style={{ textAlign: 'center' }}>{problem === 'signin' ? tr.books.signIn : problem === 'plan' ? `🔒 ${tr.books.locked}` : tr.reader.notFound}</Heading>
          {problem === 'signin' && <ChunkyButton label={tr.parents.signIn} onPress={() => router.replace('/signin')} />}
          {problem === 'plan' && <ChunkyButton label={tr.reader.seePlans} onPress={() => router.replace('/plan')} />}
          <ChunkyButton variant="plain" label={tr.common.back} onPress={() => goBackOr('/books')} />
        </View>
      </SafeAreaView>
    );
  }

  const boxW = Math.min(width, 720) - 32;
  const boxH = height - 220;
  const ratio = link ? link.w / link.h : 3 / 4;
  const pageW = Math.min(boxW, boxH * ratio);

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: t.bg }]}>
      <View style={styles.bar}>
        <ChunkyButton small variant="plain" label={tr.common.close} onPress={() => goBackOr('/books')} />
        <Text style={[styles.title, { color: t.muted, fontFamily: hasEthiopic(title) ? fonts.ethiopicBold : fonts.displayBold }]} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.stage}>
        <View style={[styles.page, { width: pageW, aspectRatio: ratio }]}>
          {uri && headers ? (
            <Animated.View key={page} entering={FadeIn.duration(300)} style={StyleSheet.absoluteFill}>
              <Image
                source={{ uri, headers }}
                style={StyleSheet.absoluteFill}
                contentFit="contain"
                // Memory only: book pages are never written to the phone's storage.
                cachePolicy="memory"
                accessibilityLabel={tr.books.page(page, count)}
                onError={() => {
                  // The link ran out before the page arrived: forget it and ask for a new one.
                  setShown((old) => {
                    const next = { ...old };
                    delete next[page];
                    return next;
                  });
                  setLinks((old) => {
                    const next = { ...old };
                    delete next[page];
                    return next;
                  });
                  setBroken(true);
                  fetchFrom(page);
                }}
                onLoad={() => {
                  setBroken(false);
                  if (uri && !shown[page]) setShown((old) => ({ ...old, [page]: uri }));
                }}
              />
            </Animated.View>
          ) : (
            <ActivityIndicator size="large" color={t.coral} />
          )}
        </View>
      </View>
      {problem === 'tooFast' && <Note tone="error">{tr.books.tooFast}</Note>}
      {problem === 'offline' && <Note tone="error">{tr.common.offline}</Note>}
      {broken && !problem && <Note>{tr.books.pageError}</Note>}
      <View style={styles.controls}>
        <Pressable accessibilityRole="button" accessibilityLabel={tr.books.previous} disabled={page <= 1} onPress={() => go(page - 1)} style={({ pressed }) => [styles.round, page <= 1 && { opacity: 0.35 }, pressed && styles.pressed]}>
          <Arrow dir="left" />
        </Pressable>
        <Text style={[styles.count, { color: t.ink, fontFamily: f.bodyBold }]}>{count ? tr.books.page(page, count) : ' '}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={tr.books.next}
          disabled={!count || page >= count}
          onPress={() => go(page + 1)}
          style={({ pressed }) => [styles.round, (!count || page >= count) && { opacity: 0.35 }, pressed && styles.pressed]}
        >
          <Arrow dir="right" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 },
  bar: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingVertical: 8 },
  title: { flex: 1, fontSize: 16 },
  stage: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  page: { backgroundColor: '#FFFDF6', borderRadius: 12, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', maxHeight: '100%' },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 12 },
  round: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#EDE5CF', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 5, borderBottomColor: '#D6CBAA' },
  pressed: { transform: [{ translateY: 3 }], borderBottomWidth: 1 },
  count: { fontSize: 16 },
});
