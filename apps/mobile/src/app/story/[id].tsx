import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { Bee } from '@/components/characters';
import { Scene } from '@/components/scenes';
import { ChunkyButton, Heading } from '@/components/ui';
import { getStory, type Story } from '@/content/stories';
import { actions, isLimitReached, useAppState, type Lang } from '@/lib/store';
import { fonts, textFont, useTheme } from '@/lib/theme';
import { useReadAlong } from '@/lib/use-read-along';

const PAGE_INK = '#2A2414';

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

function PageText({ text, lang, onWordDone }: { text: string; lang: Lang; onWordDone?: () => void }) {
  const { words, active, reading, silent, start, stop, speakWord } = useReadAlong(text, lang);
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
      {silent && reading && lang === 'am' && (
        <Text style={styles.hint}>Words light up for now. Recorded Amharic narration is coming.</Text>
      )}
      <ChunkyButton
        label={reading ? (lang === 'am' ? 'አቁም' : 'Stop') : lang === 'am' ? 'አንብብልኝ' : 'Read to me'}
        fontFamily={lang === 'am' ? fonts.ethiopicBold : undefined}
        onPress={reading ? stop : start}
        style={{ alignSelf: 'center' }}
      />
    </>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 14 }, (_, i) => i);
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {pieces.map((i) => (
        <FallingStar key={i} index={i} />
      ))}
    </View>
  );
}

function FallingStar({ index }: { index: number }) {
  const y = useSharedValue(-40);
  const rot = useSharedValue(0);
  useEffect(() => {
    y.value = withDelay(index * 90, withTiming(520, { duration: 2200 + (index % 4) * 300 }));
    rot.value = withRepeat(withTiming(360, { duration: 1400 }), -1);
  }, [index, y, rot]);
  const style = useAnimatedStyle(() => ({ transform: [{ translateY: y.value }, { rotate: `${rot.value}deg` }] }));
  const colors = ['#F5B21E', '#E8513B', '#0E8C80', '#D63B72', '#2F5BD3'];
  return (
    <Animated.Text style={[styles.confetti, { left: `${(index * 37) % 100}%`, color: colors[index % colors.length] }, style]}>★</Animated.Text>
  );
}

function TheEnd({ story, lang, onAgain }: { story: Story; lang: Lang; onAgain: () => void }) {
  const t = useTheme();
  const stars = useAppState((s) => s.stars);
  const limitReached = useAppState(isLimitReached);
  const bounce = useSharedValue(0);
  const awarded = useRef(false);

  useEffect(() => {
    if (!awarded.current) {
      awarded.current = true;
      actions.finishStory(story.id);
    }
    bounce.value = withRepeat(withSequence(withSpring(-14), withSpring(0)), -1);
  }, [story.id, bounce]);

  const starStyle = useAnimatedStyle(() => ({ transform: [{ translateY: bounce.value }] }));

  return (
    <Animated.View entering={ZoomIn.springify()} style={[styles.end, { backgroundColor: t.surface }]}>
      <Confetti />
      <Animated.Text style={[styles.bigStar, starStyle]}>★</Animated.Text>
      <Heading style={{ textAlign: 'center' }}>{lang === 'am' ? 'ተፈጸመ!' : 'The End!'}</Heading>
      <Text style={[styles.endText, { color: t.muted }]}>You earned a star. You have {stars} now!</Text>
      <Bee size={56} />
      <View style={styles.endButtons}>
        {limitReached ? (
          <Text style={[styles.endText, { color: t.ink }]}>That was the last story for tonight. Goodnight!</Text>
        ) : (
          <ChunkyButton variant="plain" label="Read again" onPress={onAgain} />
        )}
        <ChunkyButton label="Back to bookshelf" onPress={() => router.back()} />
      </View>
    </Animated.View>
  );
}

export default function Reader() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const story = getStory(String(id));
  const t = useTheme();
  const lang = useAppState((s) => s.lang);
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [pageRead, setPageRead] = useState(false);

  if (!story) {
    return (
      <SafeAreaView style={[styles.screen, { backgroundColor: t.bg, alignItems: 'center', justifyContent: 'center', gap: 16 }]}>
        <Heading>We couldn’t find that story</Heading>
        <ChunkyButton label="Back to bookshelf" onPress={() => router.replace('/')} />
      </SafeAreaView>
    );
  }

  const total = story.pages.length;
  const atEnd = page >= total;
  const go = (to: number) => {
    setDir(to > page ? 1 : -1);
    setPageRead(false);
    setPage(Math.max(0, Math.min(total, to)));
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: t.bg }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.inner}>
          <View style={styles.topBar}>
            <ChunkyButton small variant="plain" label="Close" onPress={() => router.back()} accessibilityLabel="Close the story" />
            <Text style={[styles.title, { color: t.muted, fontFamily: lang === 'am' ? fonts.ethiopicBold : fonts.displayBold }]} numberOfLines={1}>
              {story.title[lang]}
            </Text>
            <View style={styles.langToggle}>
              {(['en', 'am'] as const).map((l) => (
                <Pressable
                  key={l}
                  accessibilityRole="button"
                  accessibilityState={{ selected: lang === l }}
                  onPress={() => actions.setLang(l)}
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
                <Scene kind={story.scene} page={page} />
              </Animated.View>

              <Animated.View
                key={`text-${page}-${lang}`}
                entering={(dir === 1 ? FadeInRight : FadeInLeft).springify().damping(16)}
                style={styles.paper}
              >
                <PageText text={story.pages[page][lang]} lang={lang} onWordDone={() => setPageRead(true)} />
              </Animated.View>

              <View style={styles.controls}>
                <RoundButton label="Previous page" onPress={() => go(page - 1)} disabled={page === 0}>
                  <Arrow dir="left" />
                </RoundButton>
                <View style={styles.dots}>
                  {story.pages.map((_, i) => (
                    <View key={i} style={[styles.dot, i === page && [styles.dotOn, { backgroundColor: t.coral }]]} />
                  ))}
                </View>
                <RoundButton label={page === total - 1 ? 'Finish the story' : 'Next page'} onPress={() => go(page + 1)}>
                  <Arrow dir="right" />
                </RoundButton>
              </View>
              {pageRead && (
                <Animated.Text entering={FadeIn} style={[styles.nudge, { color: t.muted }]}>
                  {page === total - 1 ? 'Tap the arrow to finish!' : 'Tap the arrow to turn the page'}
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
  hint: { fontFamily: fonts.body, fontSize: 14, color: '#7A6A45', textAlign: 'center' },
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
  dots: { flexDirection: 'row', gap: 8 },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#D9D2BC' },
  dotOn: { width: 30 },
  nudge: { textAlign: 'center', fontFamily: fonts.bodyBold, fontSize: 15 },
  end: { borderRadius: 28, padding: 28, alignItems: 'center', gap: 12, overflow: 'hidden', minHeight: 440 },
  bigStar: { fontSize: 110, color: '#F5B21E', lineHeight: 120 },
  endText: { fontFamily: fonts.body, fontSize: 18, textAlign: 'center' },
  endButtons: { gap: 12, alignItems: 'center', marginTop: 8 },
  confetti: { position: 'absolute', top: 0, fontSize: 26 },
});
