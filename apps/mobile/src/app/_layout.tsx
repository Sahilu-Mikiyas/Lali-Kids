import { Andika_400Regular, Andika_700Bold } from '@expo-google-fonts/andika';
import { Grandstander_800ExtraBold, Grandstander_900Black } from '@expo-google-fonts/grandstander';
import { NotoSansEthiopic_400Regular, NotoSansEthiopic_700Bold } from '@expo-google-fonts/noto-sans-ethiopic';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { AppState } from 'react-native';

import { actions, useAppState } from '@/lib/store';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/lib/theme';

SplashScreen.preventAutoHideAsync();

/** Keeps the store in step with Supabase's sign-in, and the family fresh from the server. */
function useFamilySync() {
  useEffect(() => {
    let alive = true;
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!alive) return;
        actions.setSession(data.session ? { email: data.session.user.email ?? null } : null);
        if (data.session) actions.refreshMe();
      })
      .catch(() => actions.setSession(null));
    actions.loadShelf();

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      actions.setSession(session ? { email: session.user.email ?? null } : null);
      // Supabase asks for no awaiting of its own calls inside this callback.
      if (event === 'SIGNED_IN') {
        setTimeout(() => {
          actions.refreshMe();
          actions.loadShelf();
        }, 0);
      }
    });
    const app = AppState.addEventListener('change', (state) => {
      if (state === 'active') actions.refreshMe();
    });
    return () => {
      alive = false;
      sub.subscription.unsubscribe();
      app.remove();
    };
  }, []);
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Andika_400Regular,
    Andika_700Bold,
    Grandstander_800ExtraBold,
    Grandstander_900Black,
    NotoSansEthiopic_400Regular,
    NotoSansEthiopic_700Bold,
  });
  const t = useTheme();
  const bedtime = useAppState((s) => s.bedtime);
  useFamilySync();

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <>
      <StatusBar style={bedtime ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: t.bg }, animation: 'fade' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="read" />
        <Stack.Screen name="story/[id]" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="books" />
        <Stack.Screen name="book/[slug]" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="games" />
        <Stack.Screen name="game/[slug]" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="plan" />
        <Stack.Screen name="signin" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="parents" options={{ presentation: 'modal' }} />
      </Stack>
    </>
  );
}
