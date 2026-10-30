import { useAppState } from './store';

const day = {
  bg: '#F1F8FF',
  surface: '#FFFFFF',
  ink: '#1B2A4E',
  muted: '#52628A',
  line: '#D3E4F4',
  sky: '#86D3FF',
  coral: '#E8513B',
  coralDeep: '#B83826',
  teal: '#0E8C80',
  gold: '#F5B21E',
  berry: '#D63B72',
  blue: '#2F5BD3',
  page: '#FFFDF6',
  pageInk: '#2A2414',
  onAccent: '#FFFFFF',
};

export type Palette = typeof day;

const night: Palette = {
  bg: '#0E1631',
  surface: '#18234B',
  ink: '#EEF2FF',
  muted: '#AAB5D8',
  line: '#2B3968',
  sky: '#1B2350',
  coral: '#FF7A63',
  coralDeep: '#C24A35',
  teal: '#3CC4B4',
  gold: '#FFC24A',
  berry: '#FF6FA0',
  blue: '#7EA0FF',
  page: '#F6F0DF',
  pageInk: '#2A2414',
  onAccent: '#1A0E0B',
};

export function useTheme(): Palette {
  const bedtime = useAppState((s) => s.bedtime);
  return bedtime ? night : day;
}

export const fonts = {
  display: 'Grandstander_900Black',
  displayBold: 'Grandstander_800ExtraBold',
  body: 'Andika_400Regular',
  bodyBold: 'Andika_700Bold',
  ethiopic: 'NotoSansEthiopic_400Regular',
  ethiopicBold: 'NotoSansEthiopic_700Bold',
};

/** Ge'ez script can't use the Latin faces, so Amharic text switches family. */
export function textFont(lang: 'en' | 'am', bold = false): string {
  if (lang === 'am') return bold ? fonts.ethiopicBold : fonts.ethiopic;
  return bold ? fonts.bodyBold : fonts.body;
}
