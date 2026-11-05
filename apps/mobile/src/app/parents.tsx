import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, LinearTransition } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChildAvatar } from '@/components/family';
import { Body, Card, Choice, ChunkyButton, Heading, Label, Note } from '@/components/ui';
import { agesLabel } from '@/content/stories';
import { formatDay, useLang, useT, useUiFonts } from '@/i18n';
import { isApiError, type AgeBand, type Avatar, type Child, type Lang, type Me } from '@/lib/api';
import { WEBSITE_ACCOUNT_URL } from '@/lib/config';
import { goBackOr } from '@/lib/nav';
import { actions, currentChild, familyOf, shelfOf, storiesTonight, useAppState } from '@/lib/store';
import { fonts, hasEthiopic, useTheme } from '@/lib/theme';

const BANDS: AgeBand[] = ['3-5', '6-7', '8-9'];
const AVATARS: Avatar[] = ['cub', 'gugu', 'bee'];
const LIMITS = [2, 3, 5, 0];
const GAME_MINUTES = [10, 20, 30, 60, 0];

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
  const tr = useT();
  const [q, setQ] = useState(makeQuestion);
  const [wrong, setWrong] = useState(false);
  return (
    <Animated.View entering={FadeInDown}>
      <Card>
        <Heading>{tr.parents.gateTitle}</Heading>
        <Body>{tr.parents.gateSub}</Body>
        <Text style={[styles.sum, { color: t.ink }]}>
          {q.a} + {q.b} = ?
        </Text>
        <View style={styles.options}>
          {q.options.map((n) => (
            <ChunkyButton
              key={n}
              variant="plain"
              label={String(n)}
              fontFamily={fonts.displayBold}
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
        {wrong && <Note tone="error">{tr.parents.wrong}</Note>}
      </Card>
    </Animated.View>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  const t = useTheme();
  const f = useUiFonts();
  return (
    <View style={styles.stat}>
      <Text style={[styles.statValue, { color: t.ink }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: t.muted, fontFamily: f.body }]}>{label}</Text>
    </View>
  );
}

function ChildRow({ child, reading }: { child: Child; reading: boolean }) {
  const t = useTheme();
  const tr = useT();
  const f = useUiFonts();
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  return (
    <Animated.View layout={LinearTransition} style={[styles.childRow, { borderTopColor: t.line }]}>
      <Pressable accessibilityRole="button" accessibilityState={{ selected: reading }} onPress={() => actions.chooseChild(child.id)} style={styles.childMain}>
        <ChildAvatar avatar={child.avatar} size={48} ring={reading ? t.gold : undefined} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.childName, { color: t.ink, fontFamily: hasEthiopic(child.name) ? fonts.ethiopicBold : fonts.displayBold }]}>{child.name}</Text>
          <Text style={[styles.childMeta, { color: t.muted, fontFamily: f.body }]}>
            {tr.parents.ages(agesLabel([child.age_band]))} · {tr.parents.readsIn(child.preferred_lang === 'am' ? tr.parents.amharic : tr.parents.english)} · {tr.parents.starsN(child.stars)}
          </Text>
          {reading && <Text style={[styles.reading, { color: t.teal, fontFamily: f.bodyBold }]}>{tr.parents.readingNow}</Text>}
        </View>
      </Pressable>
      {confirm ? (
        <View style={styles.options}>
          <ChunkyButton
            small
            label={tr.parents.yesRemove}
            disabled={busy}
            onPress={async () => {
              setBusy(true);
              await actions.removeChild(child.id).catch(() => undefined);
              setBusy(false);
              setConfirm(false);
            }}
          />
          <ChunkyButton small variant="plain" label={tr.parents.keep} onPress={() => setConfirm(false)} />
        </View>
      ) : (
        <ChunkyButton small variant="plain" label={tr.parents.remove} onPress={() => setConfirm(true)} />
      )}
    </Animated.View>
  );
}

function AddChild() {
  const t = useTheme();
  const tr = useT();
  const f = useUiFonts();
  const uiLang = useLang();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [band, setBand] = useState<AgeBand>('3-5');
  const [lang, setLang] = useState<Lang>(uiLang);
  const [avatar, setAvatar] = useState<Avatar>('cub');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return <ChunkyButton small label={`+ ${tr.parents.addChild}`} onPress={() => setOpen(true)} style={{ alignSelf: 'flex-start' }} />;

  async function add() {
    if (!name.trim()) {
      setError(tr.parents.nameNeeded);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await actions.addChild({ name: name.trim(), ageBand: band, lang, avatar });
      setName('');
      setOpen(false);
    } catch (e) {
      setError(isApiError(e, 'offline') ? tr.common.offline : isApiError(e) && e.kind === 'bad' ? e.message : tr.common.error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Animated.View entering={FadeIn} style={[styles.addBox, { borderColor: t.line }]}>
      <Text style={[styles.fieldLabel, { color: t.ink, fontFamily: f.bodyBold }]}>{tr.parents.name}</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        maxLength={40}
        accessibilityLabel={tr.parents.name}
        style={[styles.input, { borderColor: t.line, color: t.ink, backgroundColor: t.bg, fontFamily: hasEthiopic(name) ? fonts.ethiopic : fonts.body }]}
      />
      <Text style={[styles.fieldLabel, { color: t.ink, fontFamily: f.bodyBold }]}>{tr.parents.ageGroup}</Text>
      <View style={styles.options}>
        {BANDS.map((b) => (
          <Choice key={b} label={tr.parents.ages(agesLabel([b]))} selected={band === b} onPress={() => setBand(b)} />
        ))}
      </View>
      <Text style={[styles.fieldLabel, { color: t.ink, fontFamily: f.bodyBold }]}>{tr.parents.language}</Text>
      <View style={styles.options}>
        <Choice label={tr.parents.english} selected={lang === 'en'} onPress={() => setLang('en')} />
        <Choice label={tr.parents.amharic} selected={lang === 'am'} onPress={() => setLang('am')} />
      </View>
      <Text style={[styles.fieldLabel, { color: t.ink, fontFamily: f.bodyBold }]}>{tr.parents.pickFriend}</Text>
      <View style={styles.options}>
        {AVATARS.map((a) => (
          <Pressable
            key={a}
            accessibilityRole="button"
            accessibilityLabel={tr.parents.avatars[a]}
            accessibilityState={{ selected: avatar === a }}
            onPress={() => setAvatar(a)}
            style={[styles.friend, { borderColor: avatar === a ? t.teal : t.line }]}
          >
            <ChildAvatar avatar={a} size={52} />
            <Text style={[styles.friendName, { color: t.ink, fontFamily: f.bodyBold }]}>{tr.parents.avatars[a]}</Text>
          </Pressable>
        ))}
      </View>
      {error && <Note tone="error">{error}</Note>}
      <View style={styles.options}>
        <ChunkyButton small label={busy ? tr.parents.adding : tr.parents.addChildBtn} disabled={busy} onPress={add} />
        <ChunkyButton small variant="plain" label={tr.parents.keep} onPress={() => setOpen(false)} />
      </View>
    </Animated.View>
  );
}

function PlanCard({ me }: { me: Me }) {
  const tr = useT();
  const lang = useLang();
  const plan = me.plan;
  const name = (id: string) => tr.plans.names[id] ?? id;
  return (
    <Card>
      <Label>{tr.parents.plan}</Label>
      {plan?.isOpen ? (
        <>
          <Body>{tr.plans.current(name(plan.planId), formatDay(plan.endsAt, lang), plan.daysLeft)}</Body>
          {plan.next && <Body>{tr.plans.thenNext(name(plan.next.planId), formatDay(plan.next.endsAt, lang))}</Body>}
        </>
      ) : (
        <Body>{plan ? tr.plans.ended(name(plan.planId)) : tr.plans.free}</Body>
      )}
      <ChunkyButton small label={plan ? tr.parents.addDays : tr.parents.seePlans} onPress={() => router.push('/plan')} style={{ alignSelf: 'flex-start' }} />
    </Card>
  );
}

function LanguageCard() {
  const tr = useT();
  const lang = useLang();
  return (
    <Card>
      <Label>{tr.parents.appLang}</Label>
      <Body>{tr.parents.appLangSub}</Body>
      <View style={styles.options}>
        <Choice label="English" selected={lang === 'en'} onPress={() => actions.setUiLang('en')} />
        <Choice label="አማርኛ (Amharic)" selected={lang === 'am'} onPress={() => actions.setUiLang('am')} />
      </View>
    </Card>
  );
}

function WebsiteCard() {
  const tr = useT();
  return (
    <Card>
      <Label>{tr.parents.website}</Label>
      <Body>{tr.parents.websiteSub}</Body>
      <ChunkyButton small variant="plain" label={`${tr.parents.openWebsite} ↗`} onPress={() => WebBrowser.openBrowserAsync(WEBSITE_ACCOUNT_URL)} style={{ alignSelf: 'flex-start' }} />
    </Card>
  );
}

/** Settings for a signed-in family: everything is saved on the server, the same on every device. */
function FamilySettings({ me }: { me: Me }) {
  const tr = useT();
  const email = useAppState((s) => s.session.email);
  const child = useAppState(currentChild);
  const [allowing, setAllowing] = useState(false);
  const { nightlyLimit, showAllAges, gamesMinutes } = me.settings;

  return (
    <Animated.View entering={FadeIn} style={{ gap: 16 }}>
      <Card>
        <Label>{tr.parents.account}</Label>
        <Body>{tr.parents.signedInAs(email ?? me.profile.email ?? '')}</Body>
        <ChunkyButton small variant="plain" label={tr.parents.signOut} onPress={() => actions.signOut()} style={{ alignSelf: 'flex-start' }} />
      </Card>

      <Card>
        <Label>{tr.parents.children}</Label>
        {me.children.map((c) => (
          <ChildRow key={c.id} child={c} reading={c.id === child?.id} />
        ))}
        <AddChild />
      </Card>

      <Card>
        <Label>{tr.parents.bedtime}</Label>
        <Body>{tr.parents.bedtimeSub}</Body>
        <View style={styles.options}>
          {LIMITS.map((n) => (
            <Choice key={n} label={n === 0 ? tr.parents.noLimit : tr.parents.nStories(n)} selected={nightlyLimit === n} onPress={() => actions.updateSettings({ nightlyLimit: n })} />
          ))}
        </View>
        {child && (
          <>
            <Body>{tr.parents.readTonight(child.name, me.tonight.read)}</Body>
            {me.tonight.read > 0 && (
              <ChunkyButton
                small
                variant="plain"
                label={tr.parents.allowMore}
                disabled={allowing}
                onPress={async () => {
                  setAllowing(true);
                  await actions.allowMoreTonight(child.id).catch(() => undefined);
                  setAllowing(false);
                }}
                style={{ alignSelf: 'flex-start' }}
              />
            )}
          </>
        )}
      </Card>

      <Card>
        <Label>{tr.parents.whichStories}</Label>
        <Body>{tr.parents.whichStoriesSub}</Body>
        <View style={styles.options}>
          <Choice label={tr.parents.ownAge} selected={!showAllAges} onPress={() => actions.updateSettings({ showAllAges: false })} />
          <Choice label={tr.parents.everyAge} selected={showAllAges} onPress={() => actions.updateSettings({ showAllAges: true })} />
        </View>
      </Card>

      <Card>
        <Label>{tr.parents.gamesDay}</Label>
        <Body>{tr.parents.gamesDaySub}</Body>
        <View style={styles.options}>
          {GAME_MINUTES.map((n) => (
            <Choice key={n} label={n === 0 ? tr.parents.gamesOff : tr.parents.min(n)} selected={gamesMinutes === n} onPress={() => actions.updateSettings({ gamesMinutes: n })} />
          ))}
        </View>
      </Card>

      <LanguageCard />
      <PlanCard me={me} />
      <WebsiteCard />
    </Animated.View>
  );
}

/** Settings for a phone that isn't signed in: kept on this phone, as before. */
function PhoneSettings() {
  const t = useTheme();
  const tr = useT();
  const f = useUiFonts();
  const lang = useLang();
  const stars = useAppState((s) => s.stars);
  const limit = useAppState((s) => s.nightlyLimit);
  const tonight = useAppState(storiesTonight);
  const finished = useAppState((s) => s.finished);
  const stories = useAppState(shelfOf);
  const total = Object.values(finished).reduce((a, b) => a + b, 0);
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <Animated.View entering={FadeIn} style={{ gap: 16 }}>
      <Card>
        <Label>{tr.parents.account}</Label>
        <Body>{tr.parents.signInWhy}</Body>
        <ChunkyButton small label={tr.parents.signIn} onPress={() => router.push('/signin')} style={{ alignSelf: 'flex-start' }} />
      </Card>

      <Card>
        <Label>{tr.parents.progress}</Label>
        <View style={styles.stats}>
          <Stat value={total} label={tr.parents.finished} />
          <Stat value={stars} label={tr.parents.stars} />
          <Stat value={tonight} label={tr.parents.tonight} />
        </View>
        {stories
          .filter((s) => !s.locked)
          .map((s) => (
            <View key={s.id} style={[styles.storyRow, { borderTopColor: t.line }]}>
              <Text style={[styles.storyName, { color: t.ink, fontFamily: lang === 'am' ? fonts.ethiopicBold : fonts.bodyBold }]}>{s.title[lang] || s.title.en}</Text>
              <Text style={[styles.storyCount, { color: finished[s.id] ? t.teal : t.muted, fontFamily: f.bodyBold }]}>
                {finished[s.id] ? tr.parents.readTimes(finished[s.id]) : tr.parents.notYet}
              </Text>
            </View>
          ))}
      </Card>

      <Card>
        <Label>{tr.parents.bedtime}</Label>
        <Body>{tr.parents.bedtimeSub}</Body>
        <View style={styles.options}>
          {LIMITS.map((n) => (
            <Choice key={n} label={n === 0 ? tr.parents.noLimit : tr.parents.nStories(n)} selected={limit === n} onPress={() => actions.setNightlyLimit(n)} />
          ))}
        </View>
        {tonight > 0 && <ChunkyButton small variant="plain" label={tr.parents.allowMore} onPress={actions.unlockTonight} style={{ alignSelf: 'flex-start' }} />}
      </Card>

      <LanguageCard />

      <Card>
        <Label>{tr.parents.plan}</Label>
        <Body>{tr.plans.signInFirst}</Body>
        <ChunkyButton small variant="plain" label={tr.parents.seePlans} onPress={() => router.push('/plan')} style={{ alignSelf: 'flex-start' }} />
      </Card>

      <WebsiteCard />

      <Card>
        <Label>{tr.parents.reset}</Label>
        {confirmReset ? (
          <>
            <Body>{tr.parents.resetSub}</Body>
            <View style={styles.options}>
              <ChunkyButton
                small
                label={tr.parents.clear}
                onPress={() => {
                  actions.resetProgress();
                  setConfirmReset(false);
                }}
              />
              <ChunkyButton small variant="plain" label={tr.parents.keep} onPress={() => setConfirmReset(false)} />
            </View>
          </>
        ) : (
          <ChunkyButton small variant="plain" label={tr.parents.clearAsk} onPress={() => setConfirmReset(true)} style={{ alignSelf: 'flex-start' }} />
        )}
      </Card>
    </Animated.View>
  );
}

export default function Parents() {
  const t = useTheme();
  const tr = useT();
  const me = useAppState(familyOf);
  const [open, setOpen] = useState(false);
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: t.bg }]}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.inner}>
          <View style={styles.topBar}>
            <Heading style={{ flex: 1 }}>{tr.parents.title}</Heading>
            <ChunkyButton small variant="plain" label={tr.common.done} onPress={() => goBackOr('/read')} />
          </View>
          {!open ? <Gate onPass={() => { setOpen(true); actions.refreshMe(); }} /> : me ? <FamilySettings me={me} /> : <PhoneSettings />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { paddingBottom: 40 },
  inner: { width: '100%', maxWidth: 640, alignSelf: 'center', padding: 16, gap: 16 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  sum: { fontFamily: fonts.display, fontSize: 44, textAlign: 'center', marginVertical: 6 },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  stats: { flexDirection: 'row', gap: 12 },
  stat: { flex: 1 },
  statValue: { fontFamily: fonts.display, fontSize: 34, fontVariant: ['tabular-nums'] },
  statLabel: { fontSize: 14 },
  storyRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, paddingTop: 10, gap: 12 },
  storyName: { fontSize: 16, flex: 1 },
  storyCount: { fontSize: 15 },
  childRow: { borderTopWidth: 1, paddingTop: 12, gap: 10 },
  childMain: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  childName: { fontSize: 20 },
  childMeta: { fontSize: 14, lineHeight: 20 },
  reading: { fontSize: 13 },
  addBox: { borderWidth: 2, borderStyle: 'dashed', borderRadius: 18, padding: 14, gap: 10 },
  fieldLabel: { fontSize: 15 },
  input: { borderWidth: 2, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, fontSize: 18 },
  friend: { alignItems: 'center', gap: 4, borderWidth: 2, borderRadius: 16, padding: 8, minWidth: 84 },
  friendName: { fontSize: 14 },
});
