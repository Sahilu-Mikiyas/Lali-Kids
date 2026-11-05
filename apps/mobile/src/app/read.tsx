import { router, type Href } from 'expo-router';
import { useMemo } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { Bee } from '@/components/characters';
import { ChildChooser, Goodnight } from '@/components/family';
import { StoryArt } from '@/components/story-art';
import { BuzzingBee, ChunkyButton, Heading, Note } from '@/components/ui';
import { agesLabel } from '@/content/stories';
import { useLang, useT, useUiFonts } from '@/i18n';
import type { ShelfStory } from '@/lib/api';
import { actions, currentChild, isLimitReached, shelfAgeBand, shelfOf, starsOf, useAppState } from '@/lib/store';
import { fonts, useTheme } from '@/lib/theme';

const CATEGORY_COLOR: Record<string, string> = {
  Bedtime: '#E8513B',
  Maths: '#2F5BD3',
  Values: '#D63B72',
  English: '#0E8C80',
  Fidel: '#7A4FD1',
};

function openStory(story: ShelfStory) {
  if (story.locked) router.push('/plan');
  else router.push({ pathname: '/story/[id]', params: { id: story.id } });
}

function StoryCard({ story, width, index }: { story: ShelfStory; width: number; index: number }) {
  const t = useTheme();
  const tr = useT();
  const lang = useLang();
  const f = useUiFonts();
  const times = useAppState((s) => s.finished[story.id] ?? 0);
  const title = story.title[lang] || story.title.en;
  return (
    <Animated.View entering={FadeInDown.delay(120 + Math.min(index, 8) * 90).springify()} style={{ width }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={story.locked ? tr.shelf.lockedLabel(title) : tr.shelf.read(title)}
        onPress={() => openStory(story)}
        style={({ pressed }) => [styles.card, { backgroundColor: story.color }, pressed && { transform: [{ scale: 0.96 }] }]}
      >
        <View style={styles.cardArt}>
          <StoryArt story={story} page={story.coverPage} />
          {story.locked && (
            <View style={styles.lockVeil}>
              <Text style={styles.lockIcon}>🔒</Text>
            </View>
          )}
        </View>
        <Text style={[styles.cardTitle, { fontFamily: lang === 'am' ? fonts.ethiopicBold : fonts.displayBold }]} numberOfLines={3}>
          {title}
        </Text>
        {times > 0 && (
          <View style={styles.doneBadge}>
            <Text style={styles.doneText}>★ {times}</Text>
          </View>
        )}
      </Pressable>
      <View style={styles.cardMeta}>
        <Text style={[styles.tag, { backgroundColor: CATEGORY_COLOR[story.category] ?? t.teal, fontFamily: f.bodyBold }]}>{tr.categories[story.category] ?? story.category}</Text>
        {story.ageBands.length > 0 && <Text style={[styles.metaText, { color: t.muted, fontFamily: f.bodyBold }]}>{tr.shelf.ages(agesLabel(story.ageBands))}</Text>}
      </View>
    </Animated.View>
  );
}

function ShelfTabs() {
  const tr = useT();
  const tabs: { label: string; href: Href | null; color: string }[] = [
    { label: tr.tabs.stories, href: null, color: '#E8513B' },
    { label: tr.tabs.books, href: '/books', color: '#2F5BD3' },
    { label: tr.tabs.games, href: '/games', color: '#0E8C80' },
  ];
  const f = useUiFonts();
  return (
    <View style={styles.tabs} accessibilityRole="tablist">
      {tabs.map((tab) => {
        const on = tab.href === null;
        return (
          <Pressable
            key={tab.label}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            onPress={() => tab.href && router.push(tab.href)}
            style={({ pressed }) => [styles.tab, { backgroundColor: on ? tab.color : 'rgba(127,127,127,0.14)' }, pressed && { transform: [{ translateY: 2 }] }]}
          >
            <Text style={[styles.tabText, { color: on ? '#fff' : tab.color, fontFamily: f.displayBold }]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function ReadHome() {
  const t = useTheme();
  const tr = useT();
  const f = useUiFonts();
  const lang = useLang();
  const { width } = useWindowDimensions();
  const stars = useAppState(starsOf);
  const bedtime = useAppState((s) => s.bedtime);
  const limitReached = useAppState(isLimitReached);
  const all = useAppState(shelfOf);
  const band = useAppState(shelfAgeBand);
  const child = useAppState(currentChild);
  const status = useAppState((s) => s.shelfStatus);
  const finished = useAppState((s) => s.finished);

  const stories = useMemo(() => (band ? all.filter((s) => s.ageBands.includes(band)) : all), [all, band]);
  const contentWidth = Math.min(width, 720) - 32;
  const columns = contentWidth > 520 ? 3 : 2;
  const cardWidth = (contentWidth - 16 * (columns - 1)) / columns;
  const open = stories.filter((s) => !s.locked);
  const tonight = open.find((s) => !finished[s.id]) ?? open[0];

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: t.bg }]} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.inner}>
          <View style={styles.topBar}>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel={tr.top.home}
              disabled={Platform.OS !== 'web'}
              onPress={() => router.push('/')}
              style={styles.brand}
            >
              <Bee size={38} />
              <Text style={[styles.brandText, { color: t.ink }]}>Lali</Text>
              <Text style={[styles.brandEthi, { color: t.muted }]}>ላሊ</Text>
            </Pressable>
            <View style={[styles.starPill, { backgroundColor: t.surface }]} accessibilityLabel={tr.top.stars(stars)}>
              <Text style={styles.starIcon}>★</Text>
              <Text style={[styles.starCount, { color: t.ink }]}>{stars}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <ChunkyButton small variant="plain" label={bedtime ? tr.top.daytime : tr.top.bedtime} onPress={actions.toggleBedtime} />
            <ChunkyButton
              small
              variant="plain"
              label={tr.switchTo}
              fontFamily={lang === 'en' ? fonts.ethiopicBold : fonts.displayBold}
              accessibilityLabel={tr.top.switchLabel}
              onPress={() => actions.setUiLang(lang === 'en' ? 'am' : 'en')}
            />
            <View style={{ flex: 1 }} />
            <ChunkyButton small variant="plain" label={tr.top.grownUps} onPress={() => router.push('/parents')} />
          </View>

          <ShelfTabs />
          <ChildChooser />
          {status === 'cached' && <Note>{tr.common.offline}</Note>}

          {limitReached ? (
            <Goodnight name={child?.name} />
          ) : (
            <>
              {tonight && (
                <Animated.View entering={FadeInDown.springify()} style={[styles.hero, { backgroundColor: tonight.color }]}>
                  <View style={styles.heroArt}>
                    <StoryArt story={tonight} page={tonight.pictures?.length ? tonight.coverPage : 0} />
                  </View>
                  <View style={styles.heroBody}>
                    <Text style={[styles.heroEyebrow, { fontFamily: f.bodyBold }]}>{tr.shelf.tonight}</Text>
                    <Text style={[styles.heroTitle, { fontFamily: lang === 'am' ? fonts.ethiopicBold : fonts.display }]}>{tonight.title[lang] || tonight.title.en}</Text>
                    <ChunkyButton label={tr.shelf.letsRead} onPress={() => openStory(tonight)} style={{ alignSelf: 'flex-start' }} />
                  </View>
                </Animated.View>
              )}

              <View style={styles.shelfHead}>
                <View style={{ flex: 1 }}>
                  <Heading>{tr.shelf.bookshelf}</Heading>
                  {band && (
                    <Text style={[styles.metaText, { color: t.muted, fontFamily: f.bodyBold }]}>
                      {tr.shelf.forAges(band.replace('-', '–'))} · {tr.shelf.lockedHint}
                    </Text>
                  )}
                </View>
                <BuzzingBee size={34} range={50} />
              </View>
              {stories.length === 0 ? (
                <Note>{tr.shelf.empty}</Note>
              ) : (
                <View style={styles.grid}>
                  {stories.map((s, i) => (
                    <StoryCard key={s.id} story={s} width={cardWidth} index={i} />
                  ))}
                </View>
              )}
              <View style={[styles.plank, { backgroundColor: t.gold }]} />
            </>
          )}

          <View style={styles.hills} pointerEvents="none">
            <Svg width="100%" height={70} viewBox="0 0 400 70" preserveAspectRatio="none">
              <Path d="M0 40 Q100 0 200 30 T400 24 L400 70 L0 70Z" fill={bedtime ? '#1C4E55' : '#86D696'} />
              <Path d="M0 56 Q200 34 400 56 L400 70 L0 70Z" fill={bedtime ? '#123B44' : '#4DBA74'} />
            </Svg>
          </View>
          <Text style={[styles.footer, { color: t.muted, fontFamily: f.body }]}>{tr.shelf.footer}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { paddingBottom: 40 },
  inner: { width: '100%', maxWidth: 720, alignSelf: 'center', paddingHorizontal: 16, gap: 18 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandText: { fontFamily: fonts.display, fontSize: 30 },
  brandEthi: { fontFamily: fonts.ethiopic, fontSize: 18 },
  starPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999 },
  starIcon: { color: '#F5B21E', fontSize: 22 },
  starCount: { fontFamily: fonts.display, fontSize: 22 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, alignItems: 'center' },
  tabs: { flexDirection: 'row', gap: 8 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 16 },
  tabText: { fontSize: 17 },
  hero: { borderRadius: 28, overflow: 'hidden' },
  heroArt: { width: '100%', aspectRatio: 16 / 9 },
  heroBody: { padding: 20, gap: 10 },
  heroEyebrow: { color: 'rgba(255,255,255,0.85)', fontSize: 14, letterSpacing: 1.2, textTransform: 'uppercase' },
  heroTitle: { color: '#fff', fontSize: 28, lineHeight: 36 },
  shelfHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6, gap: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  card: { borderRadius: 20, overflow: 'hidden', borderLeftWidth: 8, borderLeftColor: 'rgba(0,0,0,0.18)' },
  cardArt: { width: '100%', aspectRatio: 4 / 3 },
  lockVeil: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(20,20,40,0.35)', alignItems: 'center', justifyContent: 'center' },
  lockIcon: { fontSize: 40 },
  cardTitle: { color: '#fff', fontSize: 17, lineHeight: 23, paddingHorizontal: 12, paddingVertical: 10, minHeight: 66 },
  doneBadge: { position: 'absolute', top: 8, right: 8, backgroundColor: '#F5B21E', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 2 },
  doneText: { fontFamily: fonts.display, color: '#2A1A00', fontSize: 14 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  tag: { color: '#fff', fontSize: 12, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, overflow: 'hidden' },
  metaText: { fontSize: 13 },
  plank: { height: 14, borderRadius: 6, marginTop: -4 },
  hills: { marginTop: 10 },
  footer: { textAlign: 'center', fontSize: 14 },
});
