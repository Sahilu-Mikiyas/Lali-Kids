"use client";

import { createContext, useContext } from "react";

import { dict, type Dict } from "./dict";
import type { UiLang } from "./langs";

const LangContext = createContext<UiLang>("en");

export function LangProvider({ lang, children }: { lang: UiLang; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

/** The website language in client components. */
export function useLang(): UiLang {
  return useContext(LangContext);
}

/** The words for the current language in client components. */
export function useT(): Dict {
  return dict[useContext(LangContext)];
}
