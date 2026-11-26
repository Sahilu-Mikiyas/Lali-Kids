import { Abyssinica_SIL, Menbere, Noto_Sans_Ethiopic, Noto_Serif_Ethiopic, Playpen_Sans } from "next/font/google";

/*
  Faces tried out by the text lab (dev only, see src/app/[lang]/text-lab). Andika and
  Grandstander come from the root layout already. Nothing here is loaded by the live site.
*/

/** A handwriting face made for early readers: single-storey a and g. */
export const playpen = Playpen_Sans({ variable: "--tl-playpen", subsets: ["latin"], weight: ["600", "700", "800"], preload: false });

/** The Ethiopic faces on Google Fonts, from plain to bookish. */
export const notoEthiopic = Noto_Sans_Ethiopic({ variable: "--tl-noto", subsets: ["ethiopic"], weight: ["600", "700", "800"], preload: false });
export const serifEthiopic = Noto_Serif_Ethiopic({ variable: "--tl-noto-serif", subsets: ["ethiopic"], weight: ["600", "700"], preload: false });
export const abyssinica = Abyssinica_SIL({ variable: "--tl-abyssinica", subsets: ["ethiopic"], weight: "400", preload: false });
export const menbere = Menbere({ variable: "--tl-menbere", subsets: ["ethiopic"], weight: ["600", "700"], preload: false });

export const LAB_FONT_VARS = [playpen, notoEthiopic, serifEthiopic, abyssinica, menbere].map((f) => f.variable).join(" ");
