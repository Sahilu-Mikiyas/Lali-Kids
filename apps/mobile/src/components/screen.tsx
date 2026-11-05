import type { Href } from 'expo-router';
import { useEffect, type ReactNode } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useT } from '@/i18n';
import { goBackOr } from '@/lib/nav';
import { useTheme } from '@/lib/theme';
import { ChunkyButton, Heading } from './ui';

/** A plain screen: a back button, a heading and scrolling content, centred like the bookshelf. */
export function Screen({
  title,
  back = '/read',
  backLabel,
  right,
  children,
  onRefresh,
  refreshing = false,
  maxWidth = 720,
}: {
  title: string;
  back?: Href;
  backLabel?: string;
  right?: ReactNode;
  children: ReactNode;
  onRefresh?: () => void;
  refreshing?: boolean;
  maxWidth?: number;
}) {
  const t = useTheme();
  const tr = useT();
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: t.bg }]} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={t.coral} /> : undefined}
      >
        <View style={[styles.inner, { maxWidth }]}>
          <View style={styles.topBar}>
            <ChunkyButton small variant="plain" label={backLabel ?? tr.common.back} onPress={() => goBackOr(back)} />
            {right}
          </View>
          <Heading>{title}</Heading>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/** Soft pulsing placeholder while something loads. */
export function Placeholder({ height = 120, radius = 20 }: { height?: number; radius?: number }) {
  const t = useTheme();
  const o = useSharedValue(0.5);
  useEffect(() => {
    o.value = withDelay(100, withRepeat(withTiming(1, { duration: 700 }), -1, true));
  }, [o]);
  const style = useAnimatedStyle(() => ({ opacity: o.value }));
  return <Animated.View style={[{ height, borderRadius: radius, backgroundColor: t.surface }, style]} />;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { paddingBottom: 40 },
  inner: { width: '100%', alignSelf: 'center', paddingHorizontal: 16, paddingTop: 8, gap: 16 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
});
