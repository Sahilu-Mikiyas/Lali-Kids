import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Svg from 'react-native-svg';

import { GuguShape } from '@/components/characters';
import { Placeholder, Screen } from '@/components/screen';
import { Body, ChunkyButton, Note } from '@/components/ui';
import { useLang, useT, useUiFonts } from '@/i18n';
import { api, type Game } from '@/lib/api';
import { actions, familyOf, shelfAgeBand, useAppState } from '@/lib/store';
import { fonts, hasEthiopic, useTheme } from '@/lib/theme';

function GameCard({ game, width, index }: { game: Game; width: number; index: number }) {
  const tr = useT();
  const lang = useLang();
  const f = useUiFonts();
  const title = (lang === 'am' && game.titleAm) || game.title;
  return (
    <Animated.View entering={FadeInDown.delay(80 + Math.min(index, 8) * 80).springify()} style={{ width }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={game.locked ? `${title}, ${tr.games.locked}` : tr.games.play(title)}
        onPress={() => (game.locked ? router.push('/plan') : router.push({ pathname: '/game/[slug]', params: { slug: game.slug } }))}
        style={({ pressed }) => [styles.card, { backgroundColor: game.color || '#0E8C80' }, pressed && { transform: [{ scale: 0.96 }] }]}
      >
        <View style={styles.art}>
          {game.thumbnail ? (
            <Image source={{ uri: game.thumbnail }} style={StyleSheet.absoluteFill} contentFit="cover" cachePolicy="memory" transition={200} />
          ) : (
            <View style={styles.friend}>
              <Svg width={90} height={108} viewBox="0 0 200 240">
                <GuguShape />
              </Svg>
            </View>
          )}
          {game.locked && (
            <View style={styles.veil}>
              <Text style={{ fontSize: 36 }}>🔒</Text>
            </View>
          )}
        </View>
        <Text style={[styles.title, { fontFamily: hasEthiopic(title) ? fonts.ethiopicBold : fonts.displayBold }]} numberOfLines={2}>
          {title}
        </Text>
      </Pressable>
      <Text style={[styles.badge, { fontFamily: f.bodyBold, backgroundColor: game.locked ? '#52628A' : '#0E8C80' }]}>{game.locked ? tr.games.withPlan : tr.games.free}</Text>
    </Animated.View>
  );
}

/** The games shelf, with today's game time from the server. */
export default function Games() {
  const t = useTheme();
  const tr = useT();
  const f = useUiFonts();
  const { width } = useWindowDimensions();
  const me = useAppState(familyOf);
  const band = useAppState(shelfAgeBand);
  const [games, setGames] = useState<Game[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(
    () =>
      api
        .games()
        .then(({ games: list }) => {
          setGames(list);
          setFailed(false);
        })
        .catch(() => setFailed(true)),
    [],
  );

  useEffect(() => {
    load();
    actions.refreshMe();
  }, [load]);

  const shown = useMemo(() => (games && band ? games.filter((g) => !g.ageBands?.length || g.ageBands.includes(band)) : games), [games, band]);
  const contentWidth = Math.min(width, 720) - 32;
  const columns = contentWidth > 520 ? 3 : 2;
  const cardWidth = (contentWidth - 16 * (columns - 1)) / columns;
  const off = me?.settings.gamesMinutes === 0;

  return (
    <Screen
      title={tr.games.title}
      refreshing={refreshing}
      onRefresh={async () => {
        setRefreshing(true);
        await Promise.all([load(), actions.refreshMe()]);
        setRefreshing(false);
      }}
    >
      <Body>{tr.games.sub}</Body>
      {me && (
        <View style={[styles.pill, { backgroundColor: t.surface }]}>
          <Text style={[styles.pillText, { color: t.ink, fontFamily: f.bodyBold }]}>{off ? tr.games.off : tr.games.left(Math.ceil(me.games.secondsLeft / 60))}</Text>
        </View>
      )}
      {failed && !games && (
        <>
          <Note tone="error">{tr.common.offline}</Note>
          <ChunkyButton small variant="plain" label={tr.common.tryAgain} onPress={load} style={{ alignSelf: 'flex-start' }} />
        </>
      )}
      {!games && !failed && (
        <View style={styles.grid}>
          {[0, 1, 2, 3].map((i) => (
            <View key={i} style={{ width: cardWidth }}>
              <Placeholder height={cardWidth} />
            </View>
          ))}
        </View>
      )}
      {shown && shown.length === 0 && <Note>{tr.games.empty}</Note>}
      {shown && shown.length > 0 && (
        <View style={styles.grid}>
          {shown.map((g, i) => (
            <GameCard key={g.id} game={g} width={cardWidth} index={i} />
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  pill: { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 16, paddingVertical: 8 },
  pillText: { fontSize: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  card: { borderRadius: 20, overflow: 'hidden' },
  art: { width: '100%', aspectRatio: 4 / 3, alignItems: 'center', justifyContent: 'center' },
  friend: { alignItems: 'center', justifyContent: 'flex-end', height: '100%' },
  veil: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(20,20,40,0.35)', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#fff', fontSize: 17, lineHeight: 23, padding: 12, minHeight: 66 },
  badge: { alignSelf: 'flex-start', color: '#fff', fontSize: 12, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, overflow: 'hidden', marginTop: 8 },
});
