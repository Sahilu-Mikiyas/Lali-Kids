import { Andika_400Regular, Andika_700Bold } from '@expo-google-fonts/andika';
import { Grandstander_800ExtraBold, Grandstander_900Black } from '@expo-google-fonts/grandstander';
import { NotoSansEthiopic_400Regular, NotoSansEthiopic_700Bold } from '@expo-google-fonts/noto-sans-ethiopic';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { useAppState } from '@/lib/store';
import { useTheme } from '@/lib/theme';

SplashScreen.preventAutoHideAsync();

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

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <>
      <StatusBar style={bedtime ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: t.bg }, animation: 'fade' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="story/[id]" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="parents" options={{ presentation: 'modal' }} />
      </Stack>
    </>
  );
}
