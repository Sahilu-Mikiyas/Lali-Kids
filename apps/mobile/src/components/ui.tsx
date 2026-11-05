import { useEffect, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { useUiFonts } from '@/i18n';
import { fonts, useTheme } from '@/lib/theme';
import { Bee } from './characters';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'plain';
  small?: boolean;
  disabled?: boolean;
  fontFamily?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  icon?: ReactNode;
};

/** A chunky button that sinks when pressed, like a toy key. */
export function ChunkyButton({ label, onPress, variant = 'primary', small, disabled, fontFamily, style, accessibilityLabel, icon }: ButtonProps) {
  const t = useTheme();
  const f = useUiFonts();
  const primary = variant === 'primary';
  const face = primary ? t.coral : t.surface;
  const edge = primary ? t.coralDeep : t.line;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        small && styles.btnSmall,
        { backgroundColor: face, borderBottomColor: edge, opacity: disabled ? 0.45 : 1 },
        pressed && styles.btnPressed,
        style,
      ]}
    >
      {icon}
      <Text style={[styles.btnText, small && styles.btnTextSmall, { color: primary ? t.onAccent : t.ink, fontFamily: fontFamily ?? f.displayBold }]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function Heading({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  const t = useTheme();
  const f = useUiFonts();
  return <Text accessibilityRole="header" style={[styles.heading, { color: t.ink, fontFamily: f.display }, style]}>{children}</Text>;
}

export function Body({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  const t = useTheme();
  const f = useUiFonts();
  return <Text style={[styles.body, { color: t.muted, fontFamily: f.body }, style]}>{children}</Text>;
}

/** A rounded white panel, the building block of the grown-ups' screens. */
export function Card({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const t = useTheme();
  return <View style={[styles.card, { backgroundColor: t.surface }, style]}>{children}</View>;
}

/** A small capital label above a card's content. */
export function Label({ children }: { children: string }) {
  const t = useTheme();
  const f = useUiFonts();
  return <Text style={[styles.label, { color: t.muted, fontFamily: f.bodyBold }]}>{children}</Text>;
}

/** One option in a row of choices (bedtime limit, language…). */
export function Choice({ label, selected, onPress, disabled }: { label: string; selected: boolean; onPress: () => void; disabled?: boolean }) {
  const t = useTheme();
  const f = useUiFonts();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      onPress={onPress}
      disabled={disabled}
      style={[styles.choice, { borderColor: selected ? t.teal : t.line, backgroundColor: selected ? t.teal : 'transparent', opacity: disabled ? 0.5 : 1 }]}
    >
      <Text style={[styles.choiceText, { color: selected ? t.onAccent : t.ink, fontFamily: f.bodyBold }]}>{label}</Text>
    </Pressable>
  );
}

/** A friendly line for errors and notes. */
export function Note({ children, tone = 'muted' }: { children: ReactNode; tone?: 'muted' | 'error' | 'good' }) {
  const t = useTheme();
  const f = useUiFonts();
  const color = tone === 'error' ? t.coral : tone === 'good' ? t.teal : t.muted;
  return <Text style={[styles.note, { color, fontFamily: f.bodyBold }]}>{children}</Text>;
}

/** Lali the bee, flying a slow loop and bobbing. */
export function BuzzingBee({ size = 44, range = 60 }: { size?: number; range?: number }) {
  const x = useSharedValue(0);
  const bob = useSharedValue(0);
  useEffect(() => {
    x.value = withRepeat(withTiming(1, { duration: 3200, easing: Easing.inOut(Easing.sin) }), -1, true);
    bob.value = withRepeat(withSequence(withTiming(-5, { duration: 180 }), withTiming(0, { duration: 180 })), -1);
  }, [x, bob]);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: (x.value - 0.5) * range }, { translateY: bob.value }],
  }));
  return (
    <Animated.View style={style} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Bee size={size} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderBottomWidth: 6,
  },
  btnSmall: { paddingVertical: 9, paddingHorizontal: 14, borderRadius: 14, borderBottomWidth: 4 },
  btnPressed: { transform: [{ translateY: 4 }], borderBottomWidth: 2 },
  btnText: { fontSize: 19 },
  btnTextSmall: { fontSize: 15 },
  heading: { fontFamily: fonts.display, fontSize: 30, lineHeight: 36 },
  body: { fontFamily: fonts.body, fontSize: 17, lineHeight: 25 },
  card: { borderRadius: 24, padding: 20, gap: 12 },
  label: { fontSize: 13, letterSpacing: 1.2, textTransform: 'uppercase' },
  choice: { borderWidth: 2, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 8 },
  choiceText: { fontSize: 15 },
  note: { fontSize: 15, lineHeight: 22 },
});
