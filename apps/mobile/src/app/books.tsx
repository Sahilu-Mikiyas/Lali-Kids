import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Svg from 'react-native-svg';

import { CubShape } from '@/components/characters';
import { Placeholder, Screen } from '@/components/screen';
import { Body, Card, ChunkyButton, Note } from '@/components/ui';
import { useLang, useT, useUiFonts } from '@/i18n';
import { api, authHeaders, siteUrl, type Book } from '@/lib/api';
import { useAppState } from '@/lib/store';
import { fonts, hasEthiopic, useTheme } from '@/lib/theme';

const COVER_COLORS = ['#2F5BD3', '#0E8C80', '#D63B72', '#C9860A', '#7A4FD1', '#E8513B'];

function BookCard({ book, width, index, headers }: { book: Book; width: number; index: number; headers: Record<string, string> | null }) {
  const tr = useT();
  const lang = useLang();
  const f = useUiFonts();
  const signedIn = useAppState((s) => s.session.signedIn);
  const title = (lang === 'am' && book.title_am) || book.title;
  const color = COVER_COLORS[index % COVER_COLORS.length];
  const open = () => {
    if (book.locked) router.push('/plan');
    else if (!signedIn) router.push('/signin');
    else router.push({ pathname: '/book/[slug]', params: { slug: book.slug } });
  };
  return (
    <Animated.View entering={FadeInDown.delay(80 + Math.min(index, 8) * 80).springify()} style={{ width }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={book.locked ? `${title}, ${tr.books.locked}` : title}
        onPress={open}
        style={({ pressed }) => [styles.card, { backgroundColor: color }, pressed && { transform: [{ scale: 0.96 }] }]}
      >
        <View style={styles.cover}>
          <View style={styles.friend}>
            <Svg width={80} height={96} viewBox="0 0 200 240">
              <CubShape />
            </Svg>
          </View>
          {headers && (
            // Covers are for signed-in families; with no picture the drawn cover stays.
            <Image source={{ uri: siteUrl(book.cover), headers }} style={StyleSheet.absoluteFill} contentFit="cover" cachePolicy="memory" transition={200} />
          )}
          {book.locked && (
            <View style={styles.veil}>
              <Text style={{ fontSize: 36 }}>🔒</Text>
            </View>
          )}
        </View>
        <Text style={[styles.title, { fontFamily: hasEthiopic(title) ? fonts.ethiopicBold : fonts.displayBold }]} numberOfLines={2}>
          {title}
        </Text>
      </Pressable>
      {book.author && (
        <Text style={[styles.meta, { fontFamily: f.body }]} numberOfLines={1}>
          {tr.books.by(book.author)}
        </Text>
      )}
    </Animated.View>
  );
}

/** Partner PDF books, read page by page (pages are never stored on the phone). */
export default function Books() {
  const tr = useT();
  const t = useTheme();
  const { width } = useWindowDimensions();
  const signedIn = useAppState((s) => s.session.signedIn);
  const [books, setBooks] = useState<Book[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [headers, setHeaders] = useState<Record<string, string> | null>(null);

  const load = useCallback(
    () =>
      Promise.all([api.books(), authHeaders()])
        .then(([{ books: list }, h]) => {
          setBooks(list);
          setFailed(false);
          setHeaders(h.Authorization ? h : null);
        })
        .catch(() => setFailed(true)),
    [],
  );

  useEffect(() => {
    load();
  }, [load, signedIn]);

  const contentWidth = Math.min(width, 720) - 32;
  const columns = contentWidth > 520 ? 3 : 2;
  const cardWidth = (contentWidth - 16 * (columns - 1)) / columns;

  return (
    <Screen title={tr.books.title} onRefresh={load}>
      <Body>{tr.books.sub}</Body>
      {!signedIn && (
        <Card>
          <Text style={{ color: t.ink, fontFamily: fonts.displayBold, fontSize: 18 }}>{tr.books.signIn}</Text>
          <Body>{tr.books.signInSub}</Body>
          <ChunkyButton small label={tr.parents.signIn} onPress={() => router.push('/signin')} style={{ alignSelf: 'flex-start' }} />
        </Card>
      )}
      {failed && !books && (
        <>
          <Note tone="error">{tr.common.offline}</Note>
          <ChunkyButton small variant="plain" label={tr.common.tryAgain} onPress={load} style={{ alignSelf: 'flex-start' }} />
        </>
      )}
      {!books && !failed && (
        <View style={styles.grid}>
          {[0, 1].map((i) => (
            <View key={i} style={{ width: cardWidth }}>
              <Placeholder height={cardWidth * 1.3} />
            </View>
          ))}
        </View>
      )}
      {books && books.length === 0 && <Note>{tr.books.empty}</Note>}
      {books && books.length > 0 && (
        <View style={styles.grid}>
          {books.map((b, i) => (
            <BookCard key={b.id} book={b} width={cardWidth} index={i} headers={headers} />
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  card: { borderRadius: 16, overflow: 'hidden', borderLeftWidth: 10, borderLeftColor: 'rgba(0,0,0,0.2)' },
  cover: { width: '100%', aspectRatio: 3 / 4, alignItems: 'center', justifyContent: 'flex-end' },
  friend: { paddingBottom: 8 },
  veil: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(20,20,40,0.35)', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#fff', fontSize: 16, lineHeight: 22, padding: 10, minHeight: 64 },
  meta: { fontSize: 13, color: '#52628A', marginTop: 6 },
});
