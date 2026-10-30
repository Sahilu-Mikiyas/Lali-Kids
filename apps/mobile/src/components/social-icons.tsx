import Svg, { Circle, Path, Rect } from 'react-native-svg';

import type { SocialNetwork } from '@/content/links';

export const SOCIAL_LABEL: Record<SocialNetwork, string> = {
  youtube: 'YouTube',
  tiktok: 'TikTok',
  telegram: 'Telegram',
  instagram: 'Instagram',
  facebook: 'Facebook',
};

export function SocialIcon({ network, size = 28 }: { network: SocialNetwork; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {network === 'youtube' && (
        <>
          <Rect x={1} y={5} width={22} height={14} rx={4} fill="#FF0033" />
          <Path d="M10 9 L15.5 12 L10 15Z" fill="#fff" />
        </>
      )}
      {network === 'tiktok' && (
        <>
          <Rect x={1} y={1} width={22} height={22} rx={6} fill="#111" />
          <Path d="M13.5 5c.4 2 1.8 3.3 3.8 3.5v2.5c-1.4 0-2.7-.4-3.8-1.2V15a4.5 4.5 0 1 1-4.5-4.5h.4v2.6H9a1.9 1.9 0 1 0 1.9 1.9V5z" fill="#25F4EE" transform="translate(-0.6 -0.4)" />
          <Path d="M13.5 5c.4 2 1.8 3.3 3.8 3.5v2.5c-1.4 0-2.7-.4-3.8-1.2V15a4.5 4.5 0 1 1-4.5-4.5h.4v2.6H9a1.9 1.9 0 1 0 1.9 1.9V5z" fill="#FE2C55" transform="translate(0.6 0.4)" />
          <Path d="M13.5 5c.4 2 1.8 3.3 3.8 3.5v2.5c-1.4 0-2.7-.4-3.8-1.2V15a4.5 4.5 0 1 1-4.5-4.5h.4v2.6H9a1.9 1.9 0 1 0 1.9 1.9V5z" fill="#fff" />
        </>
      )}
      {network === 'telegram' && (
        <>
          <Circle cx={12} cy={12} r={11} fill="#29A9EB" />
          <Path d="M5.5 11.6 L17.5 7 L15.4 17.2 L11.8 14.6 L10 16.4 L10.2 13.4 L15.4 8.8 L8.9 12.8Z" fill="#fff" />
        </>
      )}
      {network === 'instagram' && (
        <>
          <Rect x={1} y={1} width={22} height={22} rx={6} fill="#E1306C" />
          <Rect x={5.5} y={5.5} width={13} height={13} rx={4} stroke="#fff" strokeWidth={2} fill="none" />
          <Circle cx={12} cy={12} r={3} stroke="#fff" strokeWidth={2} fill="none" />
          <Circle cx={16.2} cy={7.8} r={1} fill="#fff" />
        </>
      )}
      {network === 'facebook' && (
        <>
          <Circle cx={12} cy={12} r={11} fill="#1877F2" />
          <Path d="M13.2 8.4h1.9V5.8h-2.2c-2.4 0-3.1 1.5-3.1 3.2v1.4H8v2.6h1.8V20h3.1v-7h2.1l.4-2.6h-2.5V9.3c0-.6.3-.9.9-.9z" fill="#fff" />
        </>
      )}
    </Svg>
  );
}
