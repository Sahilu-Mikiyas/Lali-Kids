import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Body, ChunkyButton, Heading } from '@/components/ui';
import { STORIES } from '@/content/stories';
import { actions, storiesTonight, useAppState } from '@/lib/store';
import { fonts, useTheme } from '@/lib/theme';

function makeQuestion() {
  const a = 6 + Math.floor(Math.random() * 7);
  const b = 4 + Math.floor(Math.random() * 6);
  const answer = a + b;
  const options = [answer, answer + 2, answer - 3].sort(() => Math.random() - 0.5);
  return { a, b, answer, options };
}

/** A sum a 4-year-old can't do yet keeps settings away from little fingers. */
function Gate({ onPass }: { onPass: () => void }) {
  const t = useTheme();
  const [q, setQ] = useState(makeQuestion);
  const [wrong, setWrong] = useState(false);
  return (
    <Animated.View entering={FadeInDown} style={[styles.card, { backgroundColor: t.surface }]}>
      <Heading>Grown-ups only</Heading>
      <Body>To open the settings, answer this question.</Body>
      <Text style={[styles.sum, { color: t.ink }]}>
        {q.a} + {q.b} = ?
      </Text>
      <View style={styles.options}>
        {q.options.map((n) => (
          <ChunkyButton
            key={n}
            variant="plain"
            label={String(n)}
            onPress={() => {
              if (n === q.answer) onPass();
              else {
                setWrong(true);
                setQ(makeQuestion());
              }
            }}
            style={{ minWidth: 80 }}
          />
        ))}
      </View>
      {wrong && <Body style={{ color: t.coral }}>That’s not right. Here’s a new one.</Body>}
    </Animated.View>
  );
}

function Choice({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  const t = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.choice, { borderColor: selected ? t.teal : t.line, backgroundColor: selected ? t.teal : 'transparent' }]}
    >
      <Text style={[styles.choiceText, { color: selected ? t.onAccent : t.ink }]}>{label}</Text>
    </Pressable>
  );
}

function Settings() {
  const t = useTheme();
  const stars = useAppState((s) => s.stars);
  const limit = useAppState((s) => s.nightlyLimit);
  const tonight = useAppState(storiesTonight);
  const lang = useAppState((s) => s.lang);
  const finishedJson = useAppState((s) => JSON.stringify(s.finished));
  const finished = useMemo(() => JSON.parse(finishedJson) as Record<string, number>, [finishedJson]);
  const total = Object.values(finished).reduce((a, b) => a + b, 0);
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <Animated.View entering={FadeIn} style={{ gap: 16 }}>
      <View style={[styles.card, { backgroundColor: t.surface }]}>
        <Text style={[styles.label, { color: t.muted }]}>PROGRESS</Text>
        <View style={styles.stats}>
          <Stat value={total} label="stories finished" />
          <Stat value={stars} label="stars earned" />
          <Stat value={tonight} label="read tonight" />
        </View>
        {STORIES.map((s) => (
          <View key={s.id} style={[styles.storyRow, { borderTopColor: t.line }]}>
            <Text style={[styles.storyName, { color: t.ink }]}>{s.title.en}</Text>
            <Text style={[styles.storyCount, { color: finished[s.id] ? t.teal : t.muted }]}>
              {finished[s.id] ? `Read ${finished[s.id]}×` : 'Not yet'}
            </Text>
          </View>
        ))}
      </View>

      <View style={[styles.card, { backgroundColor: t.surface }]}>
        <Text style={[styles.label, { color: t.muted }]}>BEDTIME LIMIT</Text>
        <Body>After this many stories, Lali says goodnight and the bookshelf closes until tomorrow.</Body>
        <View style={styles.options}>
          {[2, 3, 5, 0].map((n) => (
            <Choice key={n} label={n === 0 ? 'No limit' : `${n} stories`} selected={limit === n} onPress={() => actions.setNightlyLimit(n)} />
          ))}
        </View>
        {tonight > 0 && <ChunkyButton small variant="plain" label="Allow more stories tonight" onPress={actions.unlockTonight} style={{ alignSelf: 'flex-start' }} />}
      </View>

      <View style={[styles.card, { backgroundColor: t.surface }]}>
        <Text style={[styles.label, { color: t.muted }]}>STORY LANGUAGE</Text>
        <View style={styles.options}>
          <Choice label="English" selected={lang === 'en'} onPress={() => actions.setLang('en')} />
          <Choice label="አማርኛ (Amharic)" selected={lang === 'am'} onPress={() => actions.setLang('am')} />
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: t.surface }]}>
        <Text style={[styles.label, { color: t.muted }]}>RESET</Text>
        {confirmReset ? (
          <>
            <Body>This clears stars and reading history on this phone. Settings stay the same.</Body>
            <View style={styles.options}>
              <ChunkyButton small label="Clear progress" onPress={() => { actions.resetProgress(); setConfirmReset(false); }} />
              <ChunkyButton small variant="plain" label="Keep it" onPress={() => setConfirmReset(false)} />
            </View>
          </>
        ) : (
          <ChunkyButton small variant="plain" label="Clear progress…" onPress={() => setConfirmReset(true)} style={{ alignSelf: 'flex-start' }} />
        )}
      </View>
    </Animated.View>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  const t = useTheme();
  return (
    <View style={styles.stat}>
      <Text style={[styles.statValue, { color: t.ink }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: t.muted }]}>{label}</Text>
    </View>
  );
}

export default function Parents() {
  const t = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: t.bg }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.inner}>
          <View style={styles.topBar}>
            <Heading>Grown-ups’ corner</Heading>
            <ChunkyButton small variant="plain" label="Done" onPress={() => router.back()} />
          </View>
          {open ? <Settings /> : <Gate onPass={() => setOpen(true)} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { paddingBottom: 40 },
  inner: { width: '100%', maxWidth: 640, alignSelf: 'center', padding: 16, gap: 16 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  card: { borderRadius: 24, padding: 20, gap: 12 },
  sum: { fontFamily: fonts.display, fontSize: 44, textAlign: 'center', marginVertical: 6 },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  label: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 1.2 },
  stats: { flexDirection: 'row', gap: 12 },
  stat: { flex: 1 },
  statValue: { fontFamily: fonts.display, fontSize: 34, fontVariant: ['tabular-nums'] },
  statLabel: { fontFamily: fonts.body, fontSize: 14 },
  storyRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, paddingTop: 10, gap: 12 },
  storyName: { fontFamily: fonts.bodyBold, fontSize: 16, flex: 1 },
  storyCount: { fontFamily: fonts.bodyBold, fontSize: 15 },
  choice: { borderWidth: 2, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 8 },
  choiceText: { fontFamily: fonts.bodyBold, fontSize: 15 },
});
