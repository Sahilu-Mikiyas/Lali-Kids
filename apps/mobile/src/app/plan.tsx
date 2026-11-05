import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';

import { Bee } from '@/components/characters';
import { Confetti } from '@/components/confetti';
import { Screen } from '@/components/screen';
import { Body, Card, ChunkyButton, Heading, Label, Note } from '@/components/ui';
import { formatBirr, formatDay, useLang, useT, useUiFonts } from '@/i18n';
import { api, isApiError, type FamilyPlan, type PlanId } from '@/lib/api';
import { PLAN_RETURN_URL } from '@/lib/config';
import { actions, familyOf, getState, useAppState } from '@/lib/store';
import { useTheme } from '@/lib/theme';

const PLAN_IDS: PlanId[] = ['reader', 'learner', 'vip'];
const DEFAULT_PRICES: Record<PlanId, number> = { reader: 400, learner: 1200, vip: 5000 };
const PLAN_COLOR: Record<PlanId, string> = { reader: '#0E8C80', learner: '#2F5BD3', vip: '#D63B72' };

const planKey = (p: FamilyPlan | null | undefined) => (p ? `${p.planId}|${p.endsAt}|${p.next?.planId ?? ''}|${p.next?.days ?? ''}` : '');

/**
 * A payment in progress: the plan before paying. Kept outside the screen because `lali://plan`
 * can open a fresh copy of this screen when Chapa's page sends the parent back.
 */
let pending: { before: string } | null = null;
const setPending = (p: { before: string } | null) => {
  pending = p;
};

type After = { kind: 'idle' } | { kind: 'checking' } | { kind: 'thanks' } | { kind: 'nochange' };

/** The three plans, the family's current plan, and paying through Chapa in the browser. */
export default function Plans() {
  const t = useTheme();
  const tr = useT();
  const f = useUiFonts();
  const lang = useLang();
  const me = useAppState(familyOf);
  const signedIn = useAppState((s) => s.session.signedIn);
  const [busy, setBusy] = useState<PlanId | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [after, setAfter] = useState<After>(() => (pending ? { kind: 'checking' } : { kind: 'idle' }));

  /** After paying: has the plan changed? */
  const checkPayment = useCallback(() => {
    const was = pending;
    if (!was) return Promise.resolve();
    return actions.refreshMe().then((fresh) => {
      const changed = planKey(fresh?.plan) !== was.before;
      if (changed) {
        setPending(null);
        actions.loadShelf();
      }
      setAfter({ kind: changed ? 'thanks' : 'nochange' });
    });
  }, []);

  useEffect(() => {
    if (pending) checkPayment();
    else actions.refreshMe();
  }, [checkPayment]);

  async function pay(plan: PlanId) {
    setBusy(plan);
    setError(null);
    try {
      const { url } = await api.checkout(plan);
      setPending({ before: planKey(getState().me?.plan) });
      if (Platform.OS === 'web') await WebBrowser.openBrowserAsync(url);
      else await WebBrowser.openAuthSessionAsync(url, PLAN_RETURN_URL);
      setAfter({ kind: 'checking' });
      await checkPayment();
    } catch (e) {
      setError(isApiError(e) && e.kind !== 'server' && e.kind !== 'offline' ? e.message : isApiError(e, 'offline') ? tr.common.offline : tr.common.error);
    } finally {
      setBusy(null);
    }
  }

  const plan = me?.plan ?? null;
  const prices = Object.fromEntries((me?.plans ?? []).map((p) => [p.id, p.priceEtb])) as Partial<Record<PlanId, number>>;
  const name = (id: string) => tr.plans.names[id] ?? id;

  return (
    <Screen title={tr.plans.title} onRefresh={() => actions.refreshMe()}>
      {after.kind === 'thanks' && plan && (
        <Animated.View entering={ZoomIn.springify()}>
          <Card style={{ alignItems: 'center', overflow: 'hidden' }}>
            <Confetti />
            <Bee size={64} />
            <Heading>{tr.plans.thanks}</Heading>
            <Body style={{ textAlign: 'center' }}>{tr.plans.openUntil(name(plan.planId), formatDay(plan.endsAt, lang))}</Body>
            <ChunkyButton label={tr.reader.backToShelf} onPress={() => router.replace('/read')} />
          </Card>
        </Animated.View>
      )}
      {after.kind === 'checking' && <Note>{tr.plans.checking}</Note>}
      {after.kind === 'nochange' && (
        <Card>
          <Note>{tr.plans.noChange}</Note>
          <ChunkyButton
            small
            variant="plain"
            label={tr.plans.checkAgain}
            onPress={() => {
              setAfter({ kind: 'checking' });
              checkPayment();
            }} style={{ alignSelf: 'flex-start' }} />
        </Card>
      )}

      <Card>
        <Label>{tr.plans.yourPlan}</Label>
        {plan?.isOpen ? (
          <>
            <Body style={{ color: t.ink }}>{tr.plans.current(name(plan.planId), formatDay(plan.endsAt, lang), plan.daysLeft)}</Body>
            {plan.next && <Body>{tr.plans.thenNext(name(plan.next.planId), formatDay(plan.next.endsAt, lang))}</Body>}
          </>
        ) : plan ? (
          <Body>{tr.plans.ended(name(plan.planId))}</Body>
        ) : (
          <Body>{signedIn ? tr.plans.free : tr.plans.sub}</Body>
        )}
        <Note>{tr.plans.rules}</Note>
      </Card>

      {!signedIn && (
        <Card>
          <Body>{tr.plans.signInFirst}</Body>
          <ChunkyButton label={tr.parents.signIn} onPress={() => router.push('/signin')} style={{ alignSelf: 'flex-start' }} />
        </Card>
      )}

      {PLAN_IDS.map((id, i) => {
        const price = prices[id] ?? DEFAULT_PRICES[id];
        const isCurrent = plan?.isOpen && plan.planId === id;
        return (
          <Animated.View key={id} entering={FadeInDown.delay(80 * i).springify()}>
            <Card style={{ borderTopWidth: 8, borderTopColor: PLAN_COLOR[id] }}>
              <View style={styles.planHead}>
                <Text style={[styles.planName, { color: PLAN_COLOR[id], fontFamily: f.display }]}>{name(id)}</Text>
                <Text style={[styles.price, { color: t.ink, fontFamily: f.displayBold }]}>
                  {formatBirr(price)} {tr.common.birr} <Text style={{ color: t.muted, fontSize: 15 }}>{tr.plans.per30}</Text>
                </Text>
              </View>
              {isCurrent && <Note tone="good">✓ {tr.plans.yourPlan}</Note>}
              <Body>{tr.plans.for[id]}</Body>
              {tr.plans.items[id].map((item) => (
                <Text key={item} style={[styles.item, { color: t.ink, fontFamily: f.body }]}>
                  ✓ {item}
                </Text>
              ))}
              {signedIn && (
                <ChunkyButton
                  label={busy === id ? tr.plans.opening : tr.plans.pay(formatBirr(price))}
                  onPress={() => pay(id)}
                  disabled={busy !== null}
                  variant={isCurrent ? 'plain' : 'primary'}
                />
              )}
            </Card>
          </Animated.View>
        );
      })}
      {error && <Note tone="error">{error}</Note>}
      <Note>{tr.plans.methods}</Note>
      <Note>{tr.plans.noRenew}</Note>
    </Screen>
  );
}

const styles = StyleSheet.create({
  planHead: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 },
  planName: { fontSize: 28 },
  price: { fontSize: 20 },
  item: { fontSize: 16, lineHeight: 23 },
});
