import { useEffect, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

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
      <Text style={[styles.btnText, small && styles.btnTextSmall, { color: primary ? t.onAccent : t.ink, fontFamily: fontFamily ?? fonts.displayBold }]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function Heading({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  const t = useTheme();
  return <Text style={[styles.heading, { color: t.ink }, style]}>{children}</Text>;
}

export function Body({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  const t = useTheme();
  return <Text style={[styles.body, { color: t.muted }, style]}>{children}</Text>;
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
});
