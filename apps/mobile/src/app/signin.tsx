import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { BuzzingBee, Body, Card, ChunkyButton, Note } from '@/components/ui';
import { Screen } from '@/components/screen';
import { useLang, useT, useUiFonts } from '@/i18n';
import { sendSignInLink } from '@/lib/auth';
import { actions, useAppState } from '@/lib/store';
import { fonts, useTheme } from '@/lib/theme';

/** Grown-ups sign in with an emailed link that opens Lali on this phone. */
export default function SignIn() {
  const params = useLocalSearchParams<{ email?: string; error?: string }>();
  const t = useTheme();
  const tr = useT();
  const f = useUiFonts();
  const lang = useLang();
  const session = useAppState((s) => s.session);
  const [email, setEmail] = useState(() => params.email || actions.lastEmail());
  const [stage, setStage] = useState<'email' | 'check'>('email');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(params.error ?? null);
  const [note, setNote] = useState<string | null>(null);

  async function send(again = false) {
    setBusy(true);
    setError(null);
    setNote(null);
    const result = await sendSignInLink(email, lang);
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    actions.rememberEmail(email.trim().toLowerCase());
    setStage('check');
    if (again) setNote(tr.signin.sentAgain);
  }

  if (session.signedIn) {
    return (
      <Screen title={tr.signin.welcome}>
        <Card>
          <Body>{session.email}</Body>
          <ChunkyButton label={tr.signin.toShelf} onPress={() => router.replace('/read')} style={{ alignSelf: 'flex-start' }} />
        </Card>
      </Screen>
    );
  }

  return (
    <Screen title={stage === 'email' ? tr.signin.title : tr.signin.check} backLabel={tr.signin.notNow}>
      {stage === 'email' ? (
        <Animated.View entering={FadeInDown} style={{ gap: 16 }}>
          <Card>
            <Body>{tr.signin.sub}</Body>
            <Text style={[styles.label, { color: t.ink, fontFamily: f.bodyBold }]}>{tr.signin.email}</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor={t.muted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
              inputMode="email"
              returnKeyType="send"
              onSubmitEditing={() => send()}
              accessibilityLabel={tr.signin.email}
              style={[styles.input, { borderColor: t.line, color: t.ink, backgroundColor: t.bg }]}
            />
            {error && <Note tone="error">{error}</Note>}
            <ChunkyButton label={busy ? tr.signin.sending : tr.signin.send} onPress={() => send()} disabled={busy || !email.trim()} />
          </Card>
          <Body>{tr.signin.why}</Body>
        </Animated.View>
      ) : (
        <Animated.View entering={FadeInDown} style={{ gap: 16 }}>
          <Card style={{ alignItems: 'center' }}>
            <View style={styles.envelope}>
              <Text style={styles.envelopeIcon}>✉️</Text>
              <View style={styles.bee}>
                <BuzzingBee size={40} range={40} />
              </View>
            </View>
            <Body style={{ textAlign: 'center' }}>{tr.signin.sentTo}</Body>
            <Text style={[styles.email, { color: t.ink }]} selectable>
              {email.trim().toLowerCase()}
            </Text>
            <Body style={{ textAlign: 'center' }}>{tr.signin.openLink}</Body>
          </Card>
          <Body>{tr.signin.hint}</Body>
          {error && <Note tone="error">{error}</Note>}
          {note && <Note tone="good">{note}</Note>}
          <View style={styles.row}>
            <ChunkyButton small label={busy ? tr.signin.sending : tr.signin.again} onPress={() => send(true)} disabled={busy} />
            <ChunkyButton small variant="plain" label={tr.signin.different} onPress={() => setStage('email')} />
          </View>
        </Animated.View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 16 },
  input: { borderWidth: 2, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12, fontSize: 18, fontFamily: fonts.body },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  envelope: { width: 120, height: 90, alignItems: 'center', justifyContent: 'center' },
  envelopeIcon: { fontSize: 64 },
  bee: { position: 'absolute', top: -6, right: -10 },
  email: { fontFamily: fonts.bodyBold, fontSize: 18, textAlign: 'center' },
});
