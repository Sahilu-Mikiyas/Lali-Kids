import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { Bee } from '@/components/characters';
import { Scene } from '@/components/scenes';
import { BuzzingBee, ChunkyButton, Heading } from '@/components/ui';
import { STORIES, type Story } from '@/content/stories';
import { actions, isLimitReached, useAppState } from '@/lib/store';
import { fonts, textFont, useTheme } from '@/lib/theme';

const CATEGORY_COLOR: Record<Story['category'], string> = {
  Bedtime: '#E8513B',
  Maths: '#2F5BD3',
  Values: '#D63B72',
  English: '#0E8C80',
};

function openStory(id: string) {
  router.push({ pathname: '/story/[id]', params: { id } });
}

function StoryCard({ story, width, index }: { story: Story; width: number; index: number }) {
  const t = useTheme();
  const lang = useAppState((s) => s.lang);
  const times = useAppState((s) => s.finished[story.id] ?? 0);
  return (
    <Animated.View entering={FadeInDown.delay(120 + index * 90).springify()} style={{ width }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Read ${story.title.en}`}
        onPress={() => openStory(story.id)}
        style={({ pressed }) => [styles.card, { backgroundColor: story.color }, pressed && { transform: [{ scale: 0.96 }] }]}
      >
        <View style={styles.cardArt}>
          <Scene kind={story.scene} page={story.coverPage} />
        </View>
        <Text style={[styles.cardTitle, { fontFamily: lang === 'am' ? fonts.ethiopicBold : fonts.displayBold }]} numberOfLines={2}>
          {story.title[lang]}
        </Text>
        {times > 0 && (
          <View style={styles.doneBadge}>
            <Text style={styles.doneText}>★ {times}</Text>
          </View>
        )}
      </Pressable>
      <View style={styles.cardMeta}>
        <Text style={[styles.tag, { backgroundColor: CATEGORY_COLOR[story.category] }]}>{story.category}</Text>
        <Text style={[styles.metaText, { color: t.muted }]}>Ages {story.ages}</Text>
      </View>
    </Animated.View>
  );
}

function Goodnight() {
  const t = useTheme();
  return (
    <Animated.View entering={FadeInDown} style={[styles.goodnight, { backgroundColor: t.surface }]}>
      <Bee size={72} />
      <Heading style={{ textAlign: 'center' }}>That’s all the stories for tonight</Heading>
      <Text style={[styles.goodnightText, { color: t.muted }]}>Lali is going to sleep. Close your eyes and dream about the moon. See you tomorrow!</Text>
      <Text style={[styles.goodnightText, { color: t.muted, fontFamily: fonts.ethiopic }]}>መልካም ሌሊት!</Text>
    </Animated.View>
  );
}

export default function Home() {
  const t = useTheme();
  const { width } = useWindowDimensions();
  const stars = useAppState((s) => s.stars);
  const bedtime = useAppState((s) => s.bedtime);
  const lang = useAppState((s) => s.lang);
  const limitReached = useAppState(isLimitReached);
  const finishedIds = useAppState((s) => Object.keys(s.finished).join(','));

  const contentWidth = Math.min(width, 720) - 32;
  const columns = contentWidth > 520 ? 3 : 2;
  const cardWidth = (contentWidth - 16 * (columns - 1)) / columns;
  const tonight = STORIES.find((s) => !finishedIds.split(',').includes(s.id)) ?? STORIES[0];

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: t.bg }]} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.inner}>
          <View style={styles.topBar}>
            <View style={styles.brand}>
              <Bee size={38} />
              <Text style={[styles.brandText, { color: t.ink }]}>Lali</Text>
              <Text style={[styles.brandEthi, { color: t.muted }]}>ላሊ</Text>
            </View>
            <View style={[styles.starPill, { backgroundColor: t.surface }]} accessibilityLabel={`${stars} stars earned`}>
              <Text style={styles.starIcon}>★</Text>
              <Text style={[styles.starCount, { color: t.ink }]}>{stars}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <ChunkyButton small variant="plain" label={bedtime ? 'Daytime' : 'Bedtime'} onPress={actions.toggleBedtime} />
            <ChunkyButton
              small
              variant="plain"
              label={lang === 'en' ? 'አማርኛ' : 'English'}
              fontFamily={lang === 'en' ? fonts.ethiopicBold : fonts.displayBold}
              accessibilityLabel={lang === 'en' ? 'Switch stories to Amharic' : 'Switch stories to English'}
              onPress={() => actions.setLang(lang === 'en' ? 'am' : 'en')}
            />
            <View style={{ flex: 1 }} />
            <ChunkyButton small variant="plain" label="Grown-ups" onPress={() => router.push('/parents')} />
          </View>

          {limitReached ? (
            <Goodnight />
          ) : (
            <>
              <Animated.View entering={FadeInDown.springify()} style={[styles.hero, { backgroundColor: tonight.color }]}>
                <View style={styles.heroArt}>
                  <Scene kind={tonight.scene} page={0} />
                </View>
                <View style={styles.heroBody}>
                  <Text style={styles.heroEyebrow}>{lang === 'am' ? 'የዛሬ ምሽት ተረት' : "Tonight's story"}</Text>
                  <Text style={[styles.heroTitle, { fontFamily: lang === 'am' ? fonts.ethiopicBold : fonts.display }]}>{tonight.title[lang]}</Text>
                  <ChunkyButton
                    label={lang === 'am' ? 'እናንብብ!' : "Let's read!"}
                    fontFamily={lang === 'am' ? fonts.ethiopicBold : undefined}
                    onPress={() => openStory(tonight.id)}
                    style={{ alignSelf: 'flex-start' }}
                  />
                </View>
              </Animated.View>

              <View style={styles.shelfHead}>
                <Heading>{lang === 'am' ? 'የመጽሐፍ መደርደሪያ' : 'Bookshelf'}</Heading>
                <BuzzingBee size={34} range={50} />
              </View>
              <View style={styles.grid}>
                {STORIES.map((s, i) => (
                  <StoryCard key={s.id} story={s} width={cardWidth} index={i} />
                ))}
              </View>
              <View style={[styles.plank, { backgroundColor: t.gold }]} />
            </>
          )}

          <View style={styles.hills} pointerEvents="none">
            <Svg width="100%" height={70} viewBox="0 0 400 70" preserveAspectRatio="none">
              <Path d="M0 40 Q100 0 200 30 T400 24 L400 70 L0 70Z" fill={bedtime ? '#1C4E55' : '#86D696'} />
              <Path d="M0 56 Q200 34 400 56 L400 70 L0 70Z" fill={bedtime ? '#123B44' : '#4DBA74'} />
            </Svg>
          </View>
          <Text style={[styles.footer, { color: t.muted, fontFamily: textFont('en') }]}>Stories over scrolling. Made in Addis Ababa.</Text>
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
  hero: { borderRadius: 28, overflow: 'hidden' },
  heroArt: { width: '100%', aspectRatio: 16 / 9 },
  heroBody: { padding: 20, gap: 10 },
  heroEyebrow: { color: 'rgba(255,255,255,0.85)', fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 1.2, textTransform: 'uppercase' },
  heroTitle: { color: '#fff', fontSize: 28, lineHeight: 34 },
  shelfHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  card: { borderRadius: 20, overflow: 'hidden', borderLeftWidth: 8, borderLeftColor: 'rgba(0,0,0,0.18)' },
  cardArt: { width: '100%', aspectRatio: 4 / 3 },
  cardTitle: { color: '#fff', fontSize: 17, lineHeight: 22, padding: 12, minHeight: 66 },
  doneBadge: { position: 'absolute', top: 8, right: 8, backgroundColor: '#F5B21E', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 2 },
  doneText: { fontFamily: fonts.display, color: '#2A1A00', fontSize: 14 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  tag: { color: '#fff', fontFamily: fonts.bodyBold, fontSize: 12, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, overflow: 'hidden' },
  metaText: { fontFamily: fonts.bodyBold, fontSize: 13 },
  plank: { height: 14, borderRadius: 6, marginTop: -4 },
  goodnight: { borderRadius: 28, padding: 28, alignItems: 'center', gap: 12 },
  goodnightText: { fontFamily: fonts.body, fontSize: 18, lineHeight: 26, textAlign: 'center' },
  hills: { marginTop: 10 },
  footer: { textAlign: 'center', fontSize: 14 },
});
