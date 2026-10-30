import { Link, router } from 'expo-router';
import Head from 'expo-router/head';
import { createElement, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type PressableStateCallbackType,
  type ScrollViewInstance,
} from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { Bee } from '@/components/characters';
import { Scene } from '@/components/scenes';
import { SOCIAL_LABEL, SocialIcon } from '@/components/social-icons';
import { BuzzingBee, ChunkyButton } from '@/components/ui';
import { APP_STORES, FEATURED_VIDEOS, SOCIAL, type SocialNetwork } from '@/content/links';
import { STORIES } from '@/content/stories';
import { actions, useAppState } from '@/lib/store';
import { fonts, useTheme, type Palette } from '@/lib/theme';

const NETWORKS = Object.keys(SOCIAL) as SocialNetwork[];

/** Pressable reports hover on the web, though React Native's types don't list it. */
const isHovered = (state: PressableStateCallbackType) => Boolean((state as { hovered?: boolean }).hovered);
const GAP = 20;
const GLYPHS = ['A', 'ሀ', '3', 'b', 'ለ', '★', '7', 'መ'];

function FloatingGlyph({ char, index, color }: { char: string; index: number; color: string }) {
  const p = useSharedValue(0);
  useEffect(() => {
    p.value = withDelay(index * 520, withRepeat(withTiming(1, { duration: 4200, easing: Easing.out(Easing.quad) }), -1));
  }, [index, p]);
  const drift = ((index % 4) - 1.5) * 46;
  const style = useAnimatedStyle(() => ({
    opacity: p.value < 0.15 ? p.value / 0.15 : 1 - (p.value - 0.15) / 0.85,
    transform: [{ translateY: -p.value * 190 }, { translateX: p.value * drift }, { rotate: `${p.value * drift * 0.4}deg` }],
  }));
  const ethiopic = /[ሀ-፿]/.test(char);
  return (
    <Animated.Text
      style={[styles.glyph, { color, fontFamily: ethiopic ? fonts.ethiopicBold : fonts.display }, style]}
      aria-hidden
    >
      {char}
    </Animated.Text>
  );
}

function ExternalLink({ href, label, children, style }: { href: string; label: string; children: ReactNode; style?: object }) {
  return (
    <Link href={href as never} target="_blank" rel="noopener" asChild>
      <Pressable accessibilityRole="link" accessibilityLabel={label} style={(state) => [style, isHovered(state) && { transform: [{ translateY: -3 }] }]}>
        {children}
      </Pressable>
    </Link>
  );
}

function VideoCard({ id, title, t }: { id: string; title: string; t: Palette }) {
  const [playing, setPlaying] = useState(false);
  return (
    <View style={[styles.video, { backgroundColor: t.surface }]}>
      <View style={styles.videoFrame}>
        {playing ? (
          createElement('iframe', {
            src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`,
            title,
            allow: 'autoplay; encrypted-media; picture-in-picture',
            allowFullScreen: true,
            style: { width: '100%', height: '100%', border: 0 },
          })
        ) : (
          <Pressable accessibilityRole="button" accessibilityLabel={`Play ${title}`} onPress={() => setPlaying(true)} style={StyleSheet.absoluteFill}>
            <Image source={{ uri: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` }} style={StyleSheet.absoluteFill} resizeMode="cover" />
            <View style={styles.playBadge}>
              <Svg width={28} height={28} viewBox="0 0 24 24">
                <Path d="M8 5 L19 12 L8 19Z" fill="#fff" />
              </Svg>
            </View>
          </Pressable>
        )}
      </View>
      <Text style={[styles.videoTitle, { color: t.ink }]} numberOfLines={2}>
        {title}
      </Text>
    </View>
  );
}

function ComingSoonVideo({ index, t }: { index: number; t: Palette }) {
  const story = STORIES[index % STORIES.length];
  return (
    <View style={[styles.video, { backgroundColor: t.surface }]}>
      <View style={[styles.videoFrame, { backgroundColor: story.color }]}>
        <Scene kind={story.scene} page={index % story.pages.length} />
        <View style={styles.soonBadge}>
          <Text style={styles.soonText}>Coming to YouTube</Text>
        </View>
      </View>
      <Text style={[styles.videoTitle, { color: t.ink }]} numberOfLines={2}>
        {story.title.en}
      </Text>
    </View>
  );
}

function StoreButton({ store, url }: { store: 'googlePlay' | 'appStore'; url: string | null }) {
  const name = store === 'googlePlay' ? 'Google Play' : 'the App Store';
  const body = (
    <View style={[styles.store, !url && { opacity: 0.55 }]}>
      <Svg width={26} height={26} viewBox="0 0 24 24">
        {store === 'googlePlay' ? (
          <>
            <Path d="M4 2.5 L13.5 12 L4 21.5Z" fill="#00D7FE" />
            <Path d="M4 2.5 L16.8 9.4 L13.5 12Z" fill="#00F076" />
            <Path d="M4 21.5 L16.8 14.6 L13.5 12Z" fill="#FF3A44" />
            <Path d="M16.8 9.4 L20.5 11.4 Q21.5 12 20.5 12.6 L16.8 14.6 L13.5 12Z" fill="#FFD400" />
          </>
        ) : (
          <Path
            d="M16.4 12.6c0-2.4 2-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.5-1-2.5-3.7zM14.2 5.5c.6-.8 1.1-1.8 1-2.9-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.7-1 2.8 1 .1 2-.5 2.7-1.3z"
            fill="#fff"
          />
        )}
      </Svg>
      <View>
        <Text style={styles.storeSmall}>{url ? (store === 'googlePlay' ? 'GET IT ON' : 'Download on') : 'Coming soon to'}</Text>
        <Text style={styles.storeBig}>{store === 'googlePlay' ? 'Google Play' : 'App Store'}</Text>
      </View>
    </View>
  );
  return url ? (
    <ExternalLink href={url} label={`Get Lali on ${name}`}>
      {body}
    </ExternalLink>
  ) : (
    <View accessibilityLabel={`Lali is coming soon to ${name}`}>{body}</View>
  );
}

function Section({ title, sub, children, t }: { title: string; sub?: string; children: ReactNode; t: Palette }) {
  return (
    <View style={styles.section}>
      <Text style={[styles.h2, { color: t.ink }]}>{title}</Text>
      {sub && <Text style={[styles.sub, { color: t.muted }]}>{sub}</Text>}
      {children}
    </View>
  );
}

export default function Landing() {
  const t = useTheme();
  const bedtime = useAppState((s) => s.bedtime);
  const { width } = useWindowDimensions();
  const wide = width >= 860;
  const inner = Math.min(width, 1120) - 32;
  const videoCols = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const videoW = Math.floor((inner - GAP * (videoCols - 1)) / videoCols);
  const bookCols = width >= 900 ? 3 : 2;
  const bookW = Math.floor((inner - GAP * (bookCols - 1)) / bookCols);
  const promiseCols = wide ? 4 : width >= 600 ? 2 : 1;
  const promiseW = Math.floor((inner - GAP * (promiseCols - 1)) / promiseCols);
  const anyChannel = NETWORKS.some((n) => SOCIAL[n]);
  const glyphColors = [t.coral, t.teal, t.gold, t.berry, t.blue];
  const scrollRef = useRef<ScrollViewInstance>(null);
  const [innerY, setInnerY] = useState(0);
  const [watchY, setWatchY] = useState(0);

  return (
    <>
      <Head>
        <title>Lali: stories for Ethiopian kids in English and Amharic</title>
        <meta
          name="description"
          content="Beautiful read-along stories in English and Amharic for kids aged 3 to 9. Read free in your browser, watch on YouTube, and follow Lali on TikTok and Telegram."
        />
      </Head>
      <ScrollView ref={scrollRef} style={{ backgroundColor: t.bg }}>
        {/* Nav */}
        <View style={[styles.navBand, { backgroundColor: t.sky }]}>
          <View style={[styles.inner, styles.nav]}>
            <View style={styles.brand}>
              <Bee size={40} />
              <Text style={[styles.brandText, { color: t.ink }]}>Lali</Text>
              <Text style={[styles.brandEthi, { color: t.muted }]}>ላሊ</Text>
            </View>
            <View style={styles.navRight}>
              <ChunkyButton small variant="plain" label={bedtime ? 'Daytime' : 'Bedtime'} onPress={actions.toggleBedtime} />
              <ChunkyButton small label="Start reading" onPress={() => router.push('/read')} />
            </View>
          </View>
        </View>

        {/* Hero */}
        <View style={[styles.heroBand, { backgroundColor: t.sky }]}>
          <View style={[styles.inner, styles.hero, wide && { flexDirection: 'row', alignItems: 'center' }]}>
            <Animated.View entering={FadeInDown.springify()} style={[styles.heroCopy, wide && { flex: 1.05 }]}>
              <Text style={[styles.h1, { color: t.ink, fontSize: wide ? 76 : 52, lineHeight: wide ? 80 : 56 }]}>
                <Text style={{ color: t.coral }}>One </Text>
                <Text style={{ color: t.teal }}>more </Text>
                <Text style={{ color: t.blue }}>page, </Text>
                <Text style={{ color: t.berry }}>please!</Text>
              </Text>
              <Text style={[styles.lede, { color: t.ink }]}>
                Read-along stories in English and Amharic that turn screen time into reading time. Free in your browser, nothing to
                install. <Text style={{ fontFamily: fonts.ethiopic, color: t.muted }}>ለልጆች የተሰሩ ተረቶች።</Text>
              </Text>
              <View style={styles.ctaRow}>
                <ChunkyButton label="Read a story free" onPress={() => router.push('/read')} />
                {SOCIAL.youtube ? (
                  <ExternalLink href={SOCIAL.youtube} label="Watch Lali on YouTube">
                    <View style={[styles.ytButton, { backgroundColor: t.surface, borderBottomColor: t.line }]}>
                      <SocialIcon network="youtube" size={24} />
                      <Text style={[styles.ytText, { color: t.ink }]}>Watch on YouTube</Text>
                    </View>
                  </ExternalLink>
                ) : (
                  <ChunkyButton variant="plain" label="Watch the videos" onPress={() => scrollRef.current?.scrollTo({ y: innerY + watchY - 16, animated: true })} />
                )}
              </View>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(150).springify()} style={[styles.stage, wide && { flex: 1 }]}>
              <View style={[styles.stageArt, { backgroundColor: STORIES[0].color }]}>
                <Scene kind="moon" page={3} />
              </View>
              <View style={styles.glyphs} pointerEvents="none">
                {GLYPHS.map((g, i) => (
                  <FloatingGlyph key={i} char={g} index={i} color={glyphColors[i % glyphColors.length]} />
                ))}
              </View>
              <View style={styles.stageBee} pointerEvents="none">
                <BuzzingBee size={52} range={120} />
              </View>
            </Animated.View>
          </View>
          <Svg width="100%" height={90} viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ marginTop: -20 }}>
            <Path d="M0 40 C240 0 480 10 720 45 S1200 90 1440 30 L1440 90 L0 90Z" fill={bedtime ? '#1C4E55' : '#86D696'} />
            <Path d="M0 70 C360 45 720 85 1080 60 S1360 55 1440 66 L1440 90 L0 90Z" fill={t.bg} />
          </Svg>
        </View>

        <View style={styles.inner} onLayout={(e) => setInnerY(e.nativeEvent.layout.y)}>
          {/* Videos */}
          <View onLayout={(e) => setWatchY(e.nativeEvent.layout.y)}>
            <Section
              t={t}
              title="Watch Lali"
              sub="Short animated stories and songs with Anbessa, Gugu and Lali the bee. New episodes every week on YouTube."
            >
              <View style={styles.grid}>
                {FEATURED_VIDEOS.length > 0
                  ? FEATURED_VIDEOS.slice(0, 6).map((v) => (
                      <View key={v.id} style={{ width: videoW }}>
                        <VideoCard id={v.id} title={v.title} t={t} />
                      </View>
                    ))
                  : [0, 1, 2].map((i) => (
                      <View key={i} style={{ width: videoW }}>
                        <ComingSoonVideo index={i} t={t} />
                      </View>
                    ))}
              </View>
            </Section>
          </View>

          {/* Social */}
          <View style={[styles.socialCard, { backgroundColor: t.surface }]}>
            <View style={{ flex: 1, minWidth: 240, gap: 6 }}>
              <Text style={[styles.h3, { color: t.ink }]}>Follow Lali</Text>
              <Text style={[styles.sub, { color: t.muted }]}>
                {anyChannel
                  ? 'New stories, songs and colouring pages every week.'
                  : 'Our channels are launching soon. New stories, songs and colouring pages every week.'}
              </Text>
            </View>
            <View style={styles.socialRow}>
              {NETWORKS.map((n) => {
                const url = SOCIAL[n];
                const chip = (
                  <View style={[styles.socialChip, { borderColor: t.line, opacity: url ? 1 : 0.5 }]}>
                    <SocialIcon network={n} />
                    <Text style={[styles.socialText, { color: t.ink }]}>{SOCIAL_LABEL[n]}</Text>
                  </View>
                );
                return url ? (
                  <ExternalLink key={n} href={url} label={`Lali on ${SOCIAL_LABEL[n]}`}>
                    {chip}
                  </ExternalLink>
                ) : (
                  <View key={n} accessibilityLabel={`${SOCIAL_LABEL[n]}, coming soon`}>
                    {chip}
                  </View>
                );
              })}
            </View>
          </View>

          {/* Read free */}
          <Section t={t} title="Read free, right here" sub="Every story is illustrated and read aloud, with the words lighting up as they're read. Tap a book to open it.">
            <View style={styles.grid}>
              {STORIES.map((s) => (
                <Pressable
                  key={s.id}
                  accessibilityRole="link"
                  accessibilityLabel={`Read ${s.title.en}`}
                  onPress={() => router.push({ pathname: '/story/[id]', params: { id: s.id } })}
                  style={(state) => [{ width: bookW }, isHovered(state) && { transform: [{ translateY: -6 }, { rotate: '-1deg' }] }]}
                >
                  <View style={[styles.book, { backgroundColor: s.color }]}>
                    <View style={styles.bookArt}>
                      <Scene kind={s.scene} page={s.coverPage} />
                    </View>
                    <Text style={styles.bookTitle} numberOfLines={2}>
                      {s.title.en}
                    </Text>
                    <Text style={styles.bookAm} numberOfLines={1}>
                      {s.title.am}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </Section>

          {/* Parents */}
          <Section t={t} title="For the grown-ups" sub="Lali is built to end. Stories finish, the screen goes quiet, and you can see what your child learned.">
            <View style={styles.grid}>
              {[
                ['No ads, ever', 'No ads, no strangers’ videos, no links out of the kids’ area.', t.coral],
                ['A bedtime limit you set', 'After the last story, Lali says goodnight until tomorrow.', t.teal],
                ['English and Amharic', 'Switch any story between the two with one tap.', t.blue],
                ['Pay your way', 'Telebirr, CBE Birr or card, when paid plans launch.', t.berry],
              ].map(([h, p, c]) => (
                <View key={h} style={[styles.promise, { backgroundColor: t.surface, width: promiseW }]}>
                  <View style={[styles.dot, { backgroundColor: c }]} />
                  <Text style={[styles.promiseTitle, { color: t.ink }]}>{h}</Text>
                  <Text style={[styles.promiseText, { color: t.muted }]}>{p}</Text>
                </View>
              ))}
            </View>
          </Section>

          {/* App */}
          <View style={[styles.appCard, { backgroundColor: t.surface }]}>
            <View style={{ flex: 1, minWidth: 260, gap: 8 }}>
              <Text style={[styles.h3, { color: t.ink }]}>Lali on your phone</Text>
              <Text style={[styles.sub, { color: t.muted }]}>
                The website works on any phone today. The app adds offline downloads for reading without data.
              </Text>
              <View style={styles.storeRow}>
                <StoreButton store="googlePlay" url={APP_STORES.googlePlay} />
                <StoreButton store="appStore" url={APP_STORES.appStore} />
              </View>
            </View>
            <BuzzingBee size={70} range={40} />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: t.muted }]}>
            Lali comes from Lalibela, whose name legend says means “the bees recognise his greatness.” Made in Addis Ababa.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  inner: { width: '100%', maxWidth: 1120, alignSelf: 'center', paddingHorizontal: 16 },
  navBand: { paddingVertical: 12 },
  nav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  navRight: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandText: { fontFamily: fonts.display, fontSize: 30 },
  brandEthi: { fontFamily: fonts.ethiopic, fontSize: 18 },
  heroBand: { paddingTop: 16 },
  hero: { gap: 28, paddingBottom: 20 },
  heroCopy: { gap: 18 },
  h1: { fontFamily: fonts.display },
  lede: { fontFamily: fonts.body, fontSize: 20, lineHeight: 30, maxWidth: 560 },
  ctaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  ytButton: { flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 18, paddingVertical: 14, paddingHorizontal: 20, borderBottomWidth: 6 },
  ytText: { fontFamily: fonts.displayBold, fontSize: 19 },
  stage: { position: 'relative', minHeight: 300 },
  stageArt: { width: '100%', aspectRatio: 4 / 3, borderRadius: 32, overflow: 'hidden' },
  glyphs: { position: 'absolute', left: '50%', bottom: '30%' },
  glyph: { position: 'absolute', fontSize: 34 },
  stageBee: { position: 'absolute', top: -10, left: '40%' },
  section: { gap: 12, marginTop: 56 },
  h2: { fontFamily: fonts.display, fontSize: 42, lineHeight: 46 },
  h3: { fontFamily: fonts.display, fontSize: 30, lineHeight: 34 },
  sub: { fontFamily: fonts.body, fontSize: 18, lineHeight: 27, maxWidth: 640 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GAP, marginTop: 10 },
  video: { borderRadius: 24, overflow: 'hidden' },
  videoFrame: { width: '100%', aspectRatio: 16 / 9, backgroundColor: '#000', overflow: 'hidden' },
  videoTitle: { fontFamily: fonts.bodyBold, fontSize: 17, padding: 14 },
  playBadge: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    marginTop: -32,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(232,81,59,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  soonBadge: { position: 'absolute', left: 12, bottom: 12, backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 4 },
  soonText: { color: '#fff', fontFamily: fonts.bodyBold, fontSize: 14 },
  socialCard: { marginTop: 40, borderRadius: 28, padding: 24, flexDirection: 'row', flexWrap: 'wrap', gap: 20, alignItems: 'center' },
  socialRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  socialChip: { flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 2, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 },
  socialText: { fontFamily: fonts.bodyBold, fontSize: 15 },
  book: { borderRadius: 22, overflow: 'hidden', borderLeftWidth: 10, borderLeftColor: 'rgba(0,0,0,0.18)' },
  bookArt: { width: '100%', aspectRatio: 4 / 3 },
  bookTitle: { color: '#fff', fontFamily: fonts.displayBold, fontSize: 19, paddingHorizontal: 14, paddingTop: 12 },
  bookAm: { color: 'rgba(255,255,255,0.85)', fontFamily: fonts.ethiopic, fontSize: 15, paddingHorizontal: 14, paddingBottom: 14, paddingTop: 2 },
  promise: { borderRadius: 22, padding: 20, gap: 8 },
  dot: { width: 14, height: 14, borderRadius: 7 },
  promiseTitle: { fontFamily: fonts.displayBold, fontSize: 19 },
  promiseText: { fontFamily: fonts.body, fontSize: 16, lineHeight: 23 },
  appCard: { marginTop: 56, borderRadius: 28, padding: 28, flexDirection: 'row', flexWrap: 'wrap', gap: 20, alignItems: 'center' },
  storeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 6 },
  store: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#111', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 8 },
  storeSmall: { color: '#fff', fontFamily: fonts.body, fontSize: 11 },
  storeBig: { color: '#fff', fontFamily: fonts.bodyBold, fontSize: 18 },
  footer: { paddingVertical: 48, paddingHorizontal: 16, alignItems: 'center' },
  footerText: { fontFamily: fonts.body, fontSize: 15, textAlign: 'center', maxWidth: 560 },
});
