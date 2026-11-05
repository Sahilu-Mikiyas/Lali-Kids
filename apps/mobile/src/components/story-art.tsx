import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

import { knownScene } from '@/content/stories';
import type { Avatar, ShelfStory } from '@/lib/api';
import { BeeShape, CubShape, GuguShape } from './characters';
import { Scene } from './scenes';

/** Which friend stars in a story the app has no drawing for, guessed from its title. */
function starOf(story: Pick<ShelfStory, 'title'>): Avatar {
  const title = `${story.title.en} ${story.title.am}`.toLowerCase();
  if (/gugu|ጉጉ|gelada/.test(title)) return 'gugu';
  if (/\blali\b|ላሊ|bee\b/.test(title)) return 'bee';
  return 'cub';
}

function shade(hex: string, amount: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  if (Number.isNaN(n) || hex.length < 7) return hex;
  const mix = (c: number) => Math.max(0, Math.min(255, Math.round(c + (amount > 0 ? (255 - c) * amount : c * amount))));
  const r = mix((n >> 16) & 255);
  const g = mix((n >> 8) & 255);
  const b = mix(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

/** A simple, friendly picture: the story's colour, rolling hills, flowers and one of Lali's friends. */
export function FriendlyPicture({ color, star, page = 0 }: { color: string; star: Avatar; page?: number }) {
  // Nudge the friend along the hill as the pages turn, so each page feels a little different.
  const x = 150 + ((page * 47) % 90) - 45;
  return (
    <Svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <Rect width={400} height={300} fill={color} />
      <Circle cx={330} cy={64} r={34} fill="#FFE07A" opacity={0.95} />
      <Circle cx={330} cy={64} r={48} fill="#FFE07A" opacity={0.25} />
      <G fill="#fff" opacity={0.55}>
        <Circle cx={70} cy={60} r={16} />
        <Circle cx={92} cy={52} r={20} />
        <Circle cx={116} cy={62} r={15} />
      </G>
      <Path d="M0 210 Q100 160 210 200 T400 186 L400 300 L0 300Z" fill={shade(color, 0.35)} />
      <Path d="M0 246 Q200 210 400 246 L400 300 L0 300Z" fill={shade(color, -0.25)} />
      <G>
        {[40, 92, 300, 352, 250].map((fx, i) => (
          <G key={fx} transform={`translate(${fx} ${262 - (i % 2) * 10})`}>
            <Path d="M0 0 L0 18" stroke="#2E7D32" strokeWidth={3} />
            {[0, 72, 144, 216, 288].map((a) => (
              <Circle key={a} cx={Math.cos((a * Math.PI) / 180) * 6} cy={Math.sin((a * Math.PI) / 180) * 6} r={5} fill="#FFC83D" />
            ))}
            <Circle cx={0} cy={0} r={4} fill="#E9782F" />
          </G>
        ))}
      </G>
      <G transform={`translate(${x} 128) scale(0.62)`}>{star === 'gugu' ? <GuguShape /> : star === 'bee' ? <G transform="scale(4.2) translate(2 4)"><BeeShape /></G> : <CubShape />}</G>
      {star !== 'bee' && (
        <G transform="translate(262 112) scale(1.3)">
          <BeeShape />
        </G>
      )}
    </Svg>
  );
}

/**
 * The picture for one page of any story: the uploaded picture for studio stories,
 * the app's own drawing for the launch stories it knows, and a friendly picture otherwise.
 */
export function StoryArt({ story, page, accessibilityLabel }: { story: ShelfStory; page: number; accessibilityLabel?: string }) {
  const picture = story.pictures?.[page] ?? (story.pictures?.length === 1 ? story.pictures[0] : null);
  if (picture) {
    return (
      <View style={[StyleSheet.absoluteFill, { backgroundColor: story.color }]}>
        <Image
          source={{ uri: picture }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={250}
          accessibilityLabel={accessibilityLabel}
          // Picture links only work for an hour, so they're kept in memory, not on disk.
          cachePolicy="memory"
        />
      </View>
    );
  }
  const scene = knownScene(story);
  if (scene) return <Scene kind={scene} page={page} />;
  return <FriendlyPicture color={story.color} star={starOf(story)} page={page} />;
}
