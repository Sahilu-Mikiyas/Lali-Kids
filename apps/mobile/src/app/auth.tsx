import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

import { Bee } from '@/components/characters';
import { Screen } from '@/components/screen';
import { Body, Card, ChunkyButton, Heading, Note } from '@/components/ui';
import { useT } from '@/i18n';
import { finishSignIn } from '@/lib/auth';
import { actions, getState, uiLangOf } from '@/lib/store';
import { useTheme } from '@/lib/theme';

/**
 * `lali://auth?code=…`: the sign-in link from the email, handed over by the website.
 * Exchanges the code for a session on this phone (PKCE), then goes back to the bookshelf.
 */
export default function AuthLink() {
  const { code, error: linkError } = useLocalSearchParams<{ code?: string; error?: string }>();
  const t = useTheme();
  const tr = useT();
  const [state, setState] = useState<{ step: 'working' } | { step: 'done' } | { step: 'failed'; error: string }>(() =>
    code ? { step: 'working' } : { step: 'failed', error: tr.signin.errLink },
  );
  const started = useRef(false);

  useEffect(() => {
    if (!code || started.current) return;
    started.current = true;
    const lang = uiLangOf(getState());
    finishSignIn(String(code), lang).then(async (result) => {
      if (!result.ok) {
        setState({ step: 'failed', error: result.error });
        return;
      }
      setState({ step: 'done' });
      await actions.refreshMe();
      setTimeout(() => router.replace('/read'), 1200);
    });
  }, [code]);

  return (
    <Screen title={state.step === 'failed' ? tr.signin.title : state.step === 'done' ? tr.signin.welcome : tr.signin.signingIn} back="/read">
      <Card style={{ alignItems: 'center', gap: 16 }}>
        {state.step === 'working' && (
          <>
            <ActivityIndicator size="large" color={t.coral} />
            <Body>{tr.signin.signingIn}</Body>
          </>
        )}
        {state.step === 'done' && (
          <Animated.View entering={ZoomIn.springify()} style={{ alignItems: 'center', gap: 12 }}>
            <Bee size={72} />
            <Heading>{tr.signin.welcome}</Heading>
          </Animated.View>
        )}
        {state.step === 'failed' && (
          <View style={{ gap: 14, alignItems: 'center' }}>
            <Bee size={56} />
            <Note tone="error">{linkError && !code ? tr.signin.errLink : state.error}</Note>
            <ChunkyButton label={tr.signin.sendNew} onPress={() => router.replace({ pathname: '/signin', params: { email: actions.lastEmail() } })} />
            <ChunkyButton variant="plain" label={tr.signin.toShelf} onPress={() => router.replace('/read')} />
          </View>
        )}
      </Card>
    </Screen>
  );
}
