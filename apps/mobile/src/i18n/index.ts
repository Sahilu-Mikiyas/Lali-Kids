import { uiLangOf, useAppState, type Lang } from '@/lib/store';
import { langFonts } from '@/lib/theme';
import { dict, type Dict } from './dict';

export { dict, type Dict } from './dict';

/** The app language: the parent's choice when signed in, otherwise the phone's. */
export function useLang(): Lang {
  return useAppState(uiLangOf);
}

/** The interface words in the app language. */
export function useT(): Dict {
  return dict[useLang()];
}

/** Interface fonts for the app language (the Ethiopic face for Amharic). */
export function useUiFonts() {
  return langFonts(useLang());
}

/** "5 November 2026" in Addis Ababa time, in English or Amharic. */
export function formatDay(iso: string, lang: Lang): string {
  const d = new Date(iso);
  try {
    return d.toLocaleDateString(lang === 'am' ? 'am-ET' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Addis_Ababa' });
  } catch {
    return d.toISOString().slice(0, 10);
  }
}

export function formatBirr(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
