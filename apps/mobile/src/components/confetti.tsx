import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';

const COLORS = ['#F5B21E', '#E8513B', '#0E8C80', '#D63B72', '#2F5BD3'];

/** Stars that tumble down over whatever is behind them. */
export function Confetti({ count = 14 }: { count?: number }) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {Array.from({ length: count }, (_, i) => (
        <FallingStar key={i} index={i} />
      ))}
    </View>
  );
}

function FallingStar({ index }: { index: number }) {
  const y = useSharedValue(-40);
  const rot = useSharedValue(0);
  useEffect(() => {
    y.value = withDelay(index * 90, withTiming(520, { duration: 2200 + (index % 4) * 300 }));
    rot.value = withRepeat(withTiming(360, { duration: 1400 }), -1);
  }, [index, y, rot]);
  const style = useAnimatedStyle(() => ({ transform: [{ translateY: y.value }, { rotate: `${rot.value}deg` }] }));
  return <Animated.Text style={[styles.star, { left: `${(index * 37) % 100}%`, color: COLORS[index % COLORS.length] }, style]}>★</Animated.Text>;
}

const styles = StyleSheet.create({
  star: { position: 'absolute', top: 0, fontSize: 26 },
});
