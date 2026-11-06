import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInLeft, FadeInRight, ZoomIn, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { AnimatedBook, type BookMessage } from '@/components/animated-book';
import { Bee } from '@/components/characters';
import { Confetti } from '@/components/confetti';
import { Goodnight } from '@/components/family';
import { StoryArt } from '@/components/story-art';
import { ChunkyButton, Heading } from '@/components/ui';
import { bundledShelf } from '@/content/stories';
import { dict, useT, useUiFonts } from '@/i18n';
import { api, isApiError, type Lang, type ShelfStory } from '@/lib/api';
import { goBackOr } from '@/lib/nav';
import { actions, currentChild, getState, isLimitReached, shelfOf, starsOf, uiLangOf, useAppState } from '@/lib/store';
import { fonts, textFont, useTheme } from '@/lib/theme';
import { useReadAlong } from '@/lib/use-read-along';

const PAGE_INK = '#2A2414';

const hasText = (s: ShelfStory | undefined | null): s is ShelfStory => Boolean(s?.pages.some((p) => p.en || p.am));

function Arrow({ dir }: { dir: 'left' | 'right' }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} stroke={PAGE_INK} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function RoundButton({ label, onPress, disabled, children }: { label: string; onPress: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.round, disabled && { opacity: 0.35 }, pressed && { transform: [{ translateY: 3 }], borderBottomWidth: 1 }]}
    >
      {children}
    </Pressable>
  );
}

/** The page text, with read-along. The story's own language decides the words and the font. */
function PageText({ text, lang, audioUrl, onWordDone }: { text: string; lang: Lang; audioUrl: string | null; onWordDone?: () => void }) {
  const tr = dict[lang].reader;
  const { words, active, reading, silent, start, stop, speakWord } = useReadAlong(text, lang, audioUrl);
  const [popped, setPopped] = useState(-1);

  useEffect(() => {
    if (active >= words.length) onWordDone?.();
  }, [active, words.length, onWordDone]);

  return (
    <>
      <Text style={[styles.storyText, { fontFamily: textFont(lang) }]} accessibilityLiveRegion="polite">
        {words.map((w, i) => (
          <Text key={`${i}-${w}`}>
            <Text
              onPress={() => {
                setPopped(i);
                speakWord(w);
              }}
              style={[i === active && styles.wordOn, i < active && styles.wordDone, i === popped && styles.wordPopped]}
            >
              {w}
            </Text>
            {i < words.length - 1 ? ' ' : ''}
          </Text>
        ))}
      </Text>
      {silent && reading && lang === 'am' && <Text style={[styles.hint, { fontFamily: fonts.ethiopic }]}>{tr.silentHint}</Text>}
      <ChunkyButton
        label={reading ? tr.stop : tr.readToMe}
        fontFamily={lang === 'am' ? fonts.ethiopicBold : fonts.displayBold}
        onPress={reading ? stop : start}
        style={{ alignSelf: 'center' }}
      />
    </>
  );
}

function TheEnd({ story, lang, onAgain }: { story: ShelfStory; lang: Lang; onAgain: () => void }) {
  const t = useTheme();
  const tr = dict[lang].reader;
  const f = useUiFonts();
  const back = useT().reader.backToShelf;
  const [result, setResult] = useState<{ stars: number; limitReached: boolean } | null>(null);
  const shownStars = useAppState(starsOf);
  const bounce = useSharedValue(0);
  const awarded = useRef(false);

  useEffect(() => {
    if (!awarded.current) {
      awarded.current = true;
      actions.finishStory(story.id).then(setResult);
    }
    bounce.value = withRepeat(withSequence(withSpring(-14), withSpring(0)), -1);
  }, [story.id, bounce]);

  const starStyle = useAnimatedStyle(() => ({ transform: [{ translateY: bounce.value }] }));
  const stars = result?.stars ?? shownStars;

  return (
    <Animated.View entering={ZoomIn.springify()} style={[styles.end, { backgroundColor: t.surface }]}>
      <Confetti />
      <Animated.Text style={[styles.bigStar, starStyle]}>★</Animated.Text>
      <Heading style={{ textAlign: 'center', fontFamily: lang === 'am' ? fonts.ethiopicBold : fonts.display }}>{tr.theEnd}</Heading>
      <Text style={[styles.endText, { color: t.muted, fontFamily: textFont(lang) }]}>{result ? tr.earned(stars) : ' '}</Text>
      <Bee size={56} />
      <View style={styles.endButtons}>
        {result?.limitReached ? (
          <Text style={[styles.endText, { color: t.ink, fontFamily: textFont(lang) }]}>{tr.lastTonight}</Text>
        ) : (
          <ChunkyButton variant="plain" label={tr.readAgain} fontFamily={f.displayBold} onPress={onAgain} />
        )}
        <ChunkyButton label={back} onPress={() => goBackOr('/read')} />
      </View>
    </Animated.View>
  );
}

type Load = { state: 'loading' } | { state: 'ready'; story: ShelfStory } | { state: 'locked'; story: ShelfStory | null } | { state: 'missing' };

/** The story to read: the server's full copy (pictures and narration), falling back to the shelf's text offline. */
function useStory(id: string): Load {
  const fromShelf = useAppState((s) => shelfOf(s).find((x) => x.id === id) ?? bundledShelf().find((x) => x.id === id));
  const [load, setLoad] = useState<Load>({ state: 'loading' });

  useEffect(() => {
    let alive = true;
    api
      .story(id)
      .then(({ story }) => alive && setLoad({ state: 'ready', story }))
      .catch((e: unknown) => {
        if (!alive) return;
        if (isApiError(e, 'plan')) {
          const body = e.body as { locked?: ShelfStory } | null;
          setLoad({ state: 'locked', story: body?.locked ?? null });
        } else if (isApiError(e, 'notfound')) setLoad({ state: 'missing' });
        else setLoad({ state: 'missing' });
      });
    return () => {
      alive = false;
    };
  }, [id]);

  if (load.state === 'ready' || load.state === 'locked') return load;
  // While loading, or when the server can't be reached, read the shelf's copy if it has the words.
  if (hasText(fromShelf) && !fromShelf.locked) return { state: 'ready', story: fromShelf };
  return load;
}

export default function Reader() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const load = useStory(String(id));
  const t = useTheme();
  const tr = useT();
  // Books open in the app language; the switch at the top changes just this book.
  const [lang, setLang] = useState<Lang>(() => uiLangOf(getState()));
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [pageRead, setPageRead] = useState(false);
  const [closedTonight] = useState(() => isLimitReached(getState()));
  const child = useAppState(currentChild);
  const onWordDone = useCallback(() => setPageRead(true), []);
  // Launch stories open in the website's animated book; offline, or for story-studio stories, the app's own reader.
  const [nativeReader, setNativeReader] = useState(Platform.OS === 'web');
  // Launch stories come without `pictures` (they're drawn); studio stories always have them.
  const animated = !nativeReader && load.state === 'ready' && load.story.pictures === undefined;
  const onBookMessage = useCallback((m: BookMessage) => {
    if (m.type === 'lali:close') goBackOr('/read');
    else void actions.finishStory(m.storyId);
  }, []);

  if (closedTonight) {
    return (
      <SafeAreaView style={[styles.screen, { backgroundColor: t.bg }]}>
        <View style={[styles.inner, { gap: 16, paddingTop: 24 }]}>
          <Goodnight name={child?.name} />
          <ChunkyButton label={tr.reader.backToShelf} onPress={() => goBackOr('/read')} style={{ alignSelf: 'center' }} />
        </View>
      </SafeAreaView>
    );
  }

  if (animated && load.state === 'ready') {
    return <AnimatedBook id={load.story.id} lang={lang} onMessage={onBookMessage} onFail={() => setNativeReader(true)} />;
  }

  if (load.state === 'loading') {
    return (
      <SafeAreaView style={[styles.screen, { backgroundColor: t.bg, alignItems: 'center', justifyContent: 'center', gap: 16 }]}>
        <ActivityIndicator size="large" color={t.coral} />
        <Bee size={56} />
      </SafeAreaView>
    );
  }

  if (load.state === 'missing' || load.state === 'locked') {
    const locked = load.state === 'locked' ? load.story : null;
    return (
      <SafeAreaView style={[styles.screen, { backgroundColor: t.bg }]}>
        <View style={[styles.inner, { gap: 16, paddingTop: 24, alignItems: 'center' }]}>
          {locked && (
            <View style={[styles.art, { backgroundColor: locked.color }]}>
              <StoryArt story={locked} page={0} />
            </View>
          )}
          <Heading style={{ textAlign: 'center' }}>{load.state === 'locked' ? `🔒 ${tr.reader.locked}` : tr.reader.notFound}</Heading>
          {load.state === 'locked' && <ChunkyButton label={tr.reader.seePlans} onPress={() => router.replace('/plan')} />}
          <ChunkyButton variant="plain" label={tr.reader.backToShelf} onPress={() => goBackOr('/read')} />
        </View>
      </SafeAreaView>
    );
  }

  const story = load.story;
  const total = story.pages.length;
  const atEnd = page >= total;
  const go = (to: number) => {
    setDir(to > page ? 1 : -1);
    setPageRead(false);
    setPage(Math.max(0, Math.min(total, to)));
  };
  const rt = dict[lang].reader;
  const text = story.pages[page]?.[lang] || story.pages[page]?.en || '';

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: t.bg }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.inner}>
          <View style={styles.topBar}>
            <ChunkyButton small variant="plain" label={tr.common.close} onPress={() => goBackOr('/read')} accessibilityLabel={tr.reader.closeStory} />
            <Text style={[styles.title, { color: t.muted, fontFamily: lang === 'am' ? fonts.ethiopicBold : fonts.displayBold }]} numberOfLines={1}>
              {story.title[lang] || story.title.en}
            </Text>
            <View style={styles.langToggle}>
              {(['en', 'am'] as const).map((l) => (
                <Pressable
                  key={l}
                  accessibilityRole="button"
                  accessibilityState={{ selected: lang === l }}
                  accessibilityLabel={l === 'en' ? 'English' : 'አማርኛ'}
                  onPress={() => setLang(l)}
                  style={[styles.langBtn, lang === l && { backgroundColor: t.surface }]}
                >
                  <Text style={[styles.langText, { color: t.ink, fontFamily: l === 'am' ? fonts.ethiopicBold : fonts.bodyBold }]}>{l === 'en' ? 'EN' : 'አማ'}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {atEnd ? (
            <TheEnd story={story} lang={lang} onAgain={() => go(0)} />
          ) : (
            <>
              <Animated.View key={`art-${page}`} entering={FadeIn.duration(500)} style={[styles.art, { backgroundColor: story.color }]}>
                <StoryArt story={story} page={page} accessibilityLabel={rt.picture(page + 1)} />
              </Animated.View>

              <Animated.View
                key={`text-${page}-${lang}`}
                entering={(dir === 1 ? FadeInRight : FadeInLeft).springify().damping(16)}
                style={styles.paper}
              >
                <PageText text={text} lang={lang} audioUrl={story.audio?.[page]?.[lang] ?? null} onWordDone={onWordDone} />
              </Animated.View>

              <View style={styles.controls}>
                <RoundButton label={rt.previous} onPress={() => go(page - 1)} disabled={page === 0}>
                  <Arrow dir="left" />
                </RoundButton>
                <View style={styles.dots}>
                  {story.pages.map((_, i) => (
                    <View key={i} style={[styles.dot, total > 8 && styles.dotSmall, i === page && [styles.dotOn, { backgroundColor: t.coral }]]} />
                  ))}
                </View>
                <RoundButton label={page === total - 1 ? rt.finish : rt.next} onPress={() => go(page + 1)}>
                  <Arrow dir="right" />
                </RoundButton>
              </View>
              {pageRead && (
                <Animated.Text entering={FadeIn} style={[styles.nudge, { color: t.muted, fontFamily: textFont(lang, true) }]}>
                  {page === total - 1 ? rt.tapFinish : rt.tapTurn}
                </Animated.Text>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { paddingBottom: 32 },
  inner: { width: '100%', maxWidth: 720, alignSelf: 'center', paddingHorizontal: 16, gap: 16, paddingTop: 8 },
  topBar: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  title: { flex: 1, fontSize: 15, textAlign: 'center' },
  langToggle: { flexDirection: 'row', backgroundColor: 'rgba(127,127,127,0.18)', borderRadius: 999, padding: 3 },
  langBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
  langText: { fontSize: 14 },
  art: { width: '100%', aspectRatio: 4 / 3, borderRadius: 28, overflow: 'hidden' },
  paper: { backgroundColor: '#FFFDF6', borderRadius: 28, padding: 22, gap: 16, borderBottomWidth: 6, borderBottomColor: '#E6DEC9' },
  storyText: { fontSize: 26, lineHeight: 40, color: PAGE_INK },
  wordOn: { backgroundColor: '#F5B21E', color: '#2A1A00', borderRadius: 6 },
  wordDone: { color: '#2B6CB0' },
  wordPopped: { color: '#E8513B' },
  hint: { fontSize: 14, color: '#7A6A45', textAlign: 'center' },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  round: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#EDE5CF',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 5,
    borderBottomColor: '#D6CBAA',
  },
  dots: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, flex: 1, paddingHorizontal: 8 },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#D9D2BC' },
  dotSmall: { width: 8, height: 8, borderRadius: 4 },
  dotOn: { width: 30 },
  nudge: { textAlign: 'center', fontSize: 15 },
  end: { borderRadius: 28, padding: 28, alignItems: 'center', gap: 12, overflow: 'hidden', minHeight: 440 },
  bigStar: { fontSize: 110, color: '#F5B21E', lineHeight: 120 },
  endText: { fontSize: 18, textAlign: 'center' },
  endButtons: { gap: 12, alignItems: 'center', marginTop: 8 },
});
