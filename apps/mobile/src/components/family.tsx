import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';
import Svg from 'react-native-svg';

import { useT, useUiFonts } from '@/i18n';
import type { Avatar } from '@/lib/api';
import { actions, currentChild, familyOf, useAppState } from '@/lib/store';
import { fonts, hasEthiopic, useTheme } from '@/lib/theme';
import { Bee, BeeShape, CubShape, GuguShape } from './characters';
import { Heading } from './ui';

/** A child's friend (Anbessa, Gugu or Lali) in a round badge. */
export function ChildAvatar({ avatar, size = 44, ring }: { avatar: Avatar; size?: number; ring?: string }) {
  const bg = avatar === 'cub' ? '#FFE3B0' : avatar === 'gugu' ? '#F1D9C4' : '#FFF2C2';
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: bg, overflow: 'hidden', borderWidth: ring ? 3 : 0, borderColor: ring, alignItems: 'center', justifyContent: 'center' }}>
      {avatar === 'bee' ? (
        <Svg width={size * 0.8} height={size * 0.8} viewBox="0 0 40 40">
          <BeeShape />
        </Svg>
      ) : (
        <Svg width={size} height={size} viewBox="20 20 160 160">
          {avatar === 'gugu' ? <GuguShape /> : <CubShape />}
        </Svg>
      )}
    </View>
  );
}

/** "Who's reading?": one tap picks the child whose stars and bedtime limit count. Signed out it nudges grown-ups to sign in. */
export function ChildChooser() {
  const t = useTheme();
  const tr = useT();
  const f = useUiFonts();
  const me = useAppState(familyOf);
  const child = useAppState(currentChild);
  const signedIn = useAppState((s) => s.session.signedIn);

  if (!me) {
    if (signedIn) return null;
    return (
      <Pressable accessibilityRole="link" onPress={() => router.push('/signin')} style={[styles.nudge, { backgroundColor: t.surface }]}>
        <Text style={[styles.nudgeText, { color: t.muted, fontFamily: f.bodyBold }]}>{tr.chooser.signIn} →</Text>
      </Pressable>
    );
  }
  if (!me.children.length) {
    return (
      <Pressable accessibilityRole="link" onPress={() => router.push('/parents')} style={[styles.nudge, { backgroundColor: t.surface }]}>
        <Text style={[styles.nudgeText, { color: t.muted, fontFamily: f.bodyBold }]}>
          {tr.chooser.add} {tr.chooser.corner} →
        </Text>
      </Pressable>
    );
  }
  return (
    <View style={{ gap: 8 }}>
      <Text style={[styles.who, { color: t.ink, fontFamily: f.displayBold }]}>{tr.chooser.who}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {me.children.map((c) => {
          const on = c.id === child?.id;
          return (
            <Pressable
              key={c.id}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              accessibilityLabel={c.name}
              onPress={() => actions.chooseChild(c.id)}
              style={({ pressed }) => [styles.kid, { backgroundColor: on ? t.gold : t.surface, borderBottomColor: on ? '#C98B0A' : t.line }, pressed && { transform: [{ translateY: 3 }] }]}
            >
              <ChildAvatar avatar={c.avatar} size={40} />
              <Text style={[styles.kidName, { color: on ? '#2A1A00' : t.ink, fontFamily: hasEthiopic(c.name) ? fonts.ethiopicBold : fonts.displayBold }]} numberOfLines={1}>
                {c.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

/** Lali says goodnight when tonight's bedtime limit is reached. */
export function Goodnight({ name }: { name?: string | null }) {
  const t = useTheme();
  const tr = useT();
  const f = useUiFonts();
  const sway = useSharedValue(0);
  useEffect(() => {
    sway.value = withDelay(300, withRepeat(withTiming(1, { duration: 2400 }), -1, true));
  }, [sway]);
  const beeStyle = useAnimatedStyle(() => ({ transform: [{ translateY: sway.value * -8 }, { rotate: `${sway.value * 8 - 4}deg` }] }));
  return (
    <Animated.View entering={FadeInDown} style={[styles.goodnight, { backgroundColor: t.surface }]}>
      <Animated.View style={beeStyle}>
        <Bee size={72} />
      </Animated.View>
      <Heading style={{ textAlign: 'center' }}>{name ? tr.goodnight.titleFor(name) : tr.goodnight.title}</Heading>
      <Text style={[styles.goodnightText, { color: t.muted, fontFamily: f.body }]}>{tr.goodnight.sub}</Text>
      <Text style={[styles.goodnightText, { color: t.muted, fontFamily: fonts.ethiopic }]}>መልካም ሌሊት!</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  nudge: { borderRadius: 18, paddingHorizontal: 16, paddingVertical: 12 },
  nudgeText: { fontSize: 15 },
  who: { fontSize: 20 },
  row: { gap: 10, paddingRight: 8 },
  kid: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingLeft: 6, paddingRight: 14, paddingVertical: 6, borderRadius: 999, borderBottomWidth: 4, maxWidth: 200 },
  kidName: { fontSize: 17 },
  goodnight: { borderRadius: 28, padding: 28, alignItems: 'center', gap: 12 },
  goodnightText: { fontSize: 18, lineHeight: 26, textAlign: 'center' },
});
