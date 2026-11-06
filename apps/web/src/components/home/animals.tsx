import type { CSSProperties } from "react";

/*
  Animals and plants of the Ethiopian highlands for the home page's pop-up book, drawn in
  code like the rest of the cast. Each one is its own little SVG so it repaints alone.

  Idle movement is CSS from globals.css (home-*): blinks, ear twitches, tail swishes, a
  gelada grooming, the ibex hopping. Transforms only; the reduced-motion rule stops it all.
  `--d` offsets an animation so neighbours don't move in step.
*/

const v = (o: Record<string, string | number>) => o as CSSProperties;
const INK = "#24140C";

function Eye({ x, y, r = 3, d = 0, white = true }: { x: number; y: number; r?: number; d?: number; white?: boolean }) {
  return (
    <g className="home-blink" style={v({ "--d": `${d}s` })}>
      <circle cx={x} cy={y} r={r} fill={INK} />
      {white && <circle cx={x + r * 0.35} cy={y - r * 0.4} r={r * 0.38} fill="#fff" />}
    </g>
  );
}

/** Black-and-white colobus (guereza) on a branch, its long white tail swaying. */
export function Colobus({ d = 0 }: { d?: number }) {
  return (
    <svg viewBox="0 0 120 150" className="block w-full overflow-visible" aria-hidden>
      <g className="home-tail" style={v({ "--d": `${d}s`, "--dur": "3.6s", transformOrigin: "40% 0%" })}>
        <path d="M76 78 C84 100 74 118 82 146 C70 132 64 112 70 80Z" fill="#F4F1EA" />
        <path d="M76 84 C80 104 74 120 80 140" stroke="#D9D3C6" strokeWidth={3} fill="none" />
      </g>
      <g className="home-breathe-s">
        <ellipse cx={58} cy={72} rx={22} ry={20} fill="#17151C" />
        {/* the white mantle hanging along its sides */}
        <path d="M38 64 C30 80 34 96 44 100 C42 88 44 78 48 70Z" fill="#F4F1EA" />
        <path d="M78 64 C86 80 82 96 72 100 C74 88 72 78 68 70Z" fill="#F4F1EA" />
        <path d="M40 90 C44 98 50 100 54 98 M76 90 C72 98 66 100 62 98" stroke="#E2DCCF" strokeWidth={2} fill="none" />
        <ellipse cx={48} cy={92} rx={6} ry={4} fill="#17151C" />
        <ellipse cx={68} cy={92} rx={6} ry={4} fill="#17151C" />
      </g>
      <g className="home-headtilt" style={v({ "--d": `${d - 1}s` })}>
        <circle cx={58} cy={44} r={17} fill="#17151C" />
        {/* white ring round the face */}
        <circle cx={58} cy={46} r={13} fill="#F4F1EA" />
        <ellipse cx={58} cy={48} rx={9} ry={10} fill="#3A3540" />
        <ellipse cx={58} cy={54} rx={6} ry={4.5} fill="#5A5160" />
        <Eye x={54.5} y={45} r={2.2} d={d} />
        <Eye x={61.5} y={45} r={2.2} d={d} />
        <path d="M55.5 56 Q58 58 60.5 56" stroke="#F4F1EA" strokeWidth={1.2} fill="none" strokeLinecap="round" />
        <path d="M46 34 Q58 24 70 34" stroke="#3A3540" strokeWidth={2} fill="none" opacity={0.6} />
      </g>
    </svg>
  );
}

/** A round little owl, blinking and twitching its ear tufts. */
export function Owl({ d = 0, tone = "day" }: { d?: number; tone?: "day" | "night" }) {
  const body = tone === "night" ? "#8C6A55" : "#A67C52";
  const dark = tone === "night" ? "#5E4536" : "#7A5636";
  return (
    <svg viewBox="0 0 60 72" className="block w-full overflow-visible" aria-hidden>
      <g className="home-breathe-s">
        <ellipse cx={30} cy={44} rx={20} ry={24} fill={body} />
        <ellipse cx={30} cy={50} rx={13} ry={16} fill="#EAD7B7" />
        <path d="M23 46 l2 2 l2 -2 M31 50 l2 2 l2 -2 M25 56 l2 2 l2 -2 M33 58 l2 2 l2 -2" stroke={dark} strokeWidth={1.3} fill="none" />
        <path d="M11 40 C6 52 10 62 18 66 C16 56 16 46 18 38Z" fill={dark} />
        <path d="M49 40 C54 52 50 62 42 66 C44 56 44 46 42 38Z" fill={dark} />
        <path d="M22 68 l-2 4 M26 68 v4 M34 68 v4 M38 68 l2 4" stroke="#E0A030" strokeWidth={2} strokeLinecap="round" />
      </g>
      <g className="home-ear" style={v({ "--d": `${d}s`, transformOrigin: "50% 100%" })}>
        <path d="M12 18 L16 4 L22 16Z" fill={dark} />
      </g>
      <g className="home-ear" style={v({ "--d": `${d - 0.3}s`, transformOrigin: "50% 100%" })}>
        <path d="M48 18 L44 4 L38 16Z" fill={dark} />
      </g>
      <ellipse cx={30} cy={24} rx={20} ry={15} fill={body} />
      <circle cx={21} cy={24} r={9} fill="#F6E9C9" />
      <circle cx={39} cy={24} r={9} fill="#F6E9C9" />
      <g className="home-blink" style={v({ "--d": `${d}s`, "--dur": "4.4s" })}>
        <circle cx={21} cy={24} r={6} fill="#F5B21E" />
        <circle cx={39} cy={24} r={6} fill="#F5B21E" />
        <circle cx={21.6} cy={24.4} r={3.4} fill={INK} />
        <circle cx={39.6} cy={24.4} r={3.4} fill={INK} />
        <circle cx={23} cy={22.6} r={1.3} fill="#fff" />
        <circle cx={41} cy={22.6} r={1.3} fill="#fff" />
      </g>
      <path d="M27 30 L30 36 L33 30Z" fill="#E0A030" />
    </svg>
  );
}

/** A walia ibex: found only in the Simien mountains, with great curved, ridged horns. */
export function WaliaIbex({ d = 0 }: { d?: number }) {
  return (
    <svg viewBox="0 0 130 124" className="block w-full overflow-visible" aria-hidden>
      <ellipse cx={64} cy={120} rx={40} ry={4} fill="#000" opacity={0.15} />
      <g className="home-ibex-hop" style={v({ "--d": `${d}s` })}>
        {/* far legs */}
        <path d="M44 84 L42 116 M88 84 L92 116" stroke="#6B4529" strokeWidth={6} strokeLinecap="round" />
        <g className="home-tail" style={v({ "--d": `${d}s`, "--dur": "1.8s", transformOrigin: "80% 90%" })}>
          <path d="M30 70 Q22 64 24 56" stroke="#3B2618" strokeWidth={5} strokeLinecap="round" fill="none" />
        </g>
        <path d="M30 72 C30 56 50 52 70 54 C92 54 102 58 102 74 C102 90 88 94 66 94 C44 94 30 90 30 72Z" fill="#8A5A34" />
        <path d="M36 86 C50 94 82 96 98 84 C96 92 84 96 66 96 C50 96 40 94 36 86Z" fill="#F1E3CB" />
        <path d="M40 62 C56 56 80 56 96 62" stroke="#A8744A" strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.7} />
        {/* near legs with the dark stripe and pale socks */}
        <path d="M52 88 L50 116 M80 88 L82 116" stroke="#8A5A34" strokeWidth={7} strokeLinecap="round" />
        <path d="M51 96 L50 108 M81 96 L82 108" stroke="#2E1E14" strokeWidth={3} strokeLinecap="round" />
        <path d="M50 112 L50 117 M82 112 L82 117" stroke="#F1E3CB" strokeWidth={6} strokeLinecap="round" />
        {/* head and neck */}
        <g className="home-headtilt" style={v({ "--d": `${d - 0.7}s`, transformOrigin: "58% 97%" })}>
          <path d="M92 66 C94 52 98 40 104 34 L114 38 C112 48 104 60 100 72Z" fill="#8A5A34" />
          {/* horns: big, backswept and ridged */}
          <path d="M104 30 C92 6 70 0 58 14 C74 8 88 16 98 34Z" fill="#6E5A44" />
          <path d="M66 10 l3 5 M72 7 l2 6 M78 6 l1 6 M84 8 l0 6 M90 12 l-1 6 M95 18 l-2 5" stroke="#4A3C2E" strokeWidth={1.6} strokeLinecap="round" />
          <path d="M106 30 C98 12 82 6 74 14" stroke="#8C765E" strokeWidth={3} fill="none" strokeLinecap="round" />
          <path d="M100 30 C104 24 112 24 118 30 L124 44 C122 50 116 50 112 46 L104 40Z" fill="#9A6A40" />
          <path d="M118 46 C116 54 112 58 108 58 C110 52 110 48 112 46Z" fill="#3B2618" />
          <ellipse cx={122} cy={44} rx={3} ry={2.2} fill="#3B2618" />
          <g className="home-ear" style={v({ "--d": `${d}s`, transformOrigin: "100% 40%" })}>
            <path d="M102 32 C94 30 90 34 92 36 C96 38 100 36 102 34Z" fill="#7A4E2E" />
          </g>
          <Eye x={111} y={35} r={2.2} d={d} />
        </g>
      </g>
    </svg>
  );
}

/** An Ethiopian wolf: slim and fox-red, with a white throat and a black-tipped tail. */
export function EthiopianWolf({ d = 0, howl = false }: { d?: number; howl?: boolean }) {
  return (
    <svg viewBox="0 0 150 110" className="block w-full overflow-visible" aria-hidden>
      <ellipse cx={74} cy={106} rx={48} ry={4} fill="#000" opacity={0.15} />
      <path d="M100 74 L104 104 M50 74 L44 104" stroke="#B5531F" strokeWidth={6} strokeLinecap="round" />
      <g className="home-tail" style={v({ "--d": `${d}s`, "--dur": "2.6s", transformOrigin: "5% 10%" })}>
        <path d="M118 62 C134 64 144 78 140 96 C132 88 124 78 112 72Z" fill="#C8642A" />
        <path d="M140 96 C136 90 134 86 134 82 C140 84 143 90 140 96Z" fill="#1E1410" />
      </g>
      <g className="home-breathe-s">
        <path d="M40 60 C44 48 70 46 96 50 C116 52 122 60 120 70 C118 80 104 82 84 82 C60 82 44 78 40 60Z" fill="#D06A2C" />
        <path d="M44 68 C52 80 72 84 94 82 C78 86 54 84 44 68Z" fill="#F7EDE0" />
        <path d="M58 52 C72 48 90 48 106 54" stroke="#E58A4A" strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.8} />
      </g>
      <path d="M90 78 L92 104 M58 78 L56 104" stroke="#D06A2C" strokeWidth={6.5} strokeLinecap="round" />
      <path d="M92 98 V105 M56 98 V105" stroke="#F7EDE0" strokeWidth={6} strokeLinecap="round" />
      <g className={howl ? "home-howl" : "home-headtilt"} style={v({ "--d": `${d - 1.1}s`, transformOrigin: "90% 92%" })}>
        <path d="M48 64 C40 56 34 44 34 36 L46 34 C50 42 54 52 58 58Z" fill="#D06A2C" />
        <path d="M42 62 C40 54 38 48 38 42 C44 48 48 54 52 60Z" fill="#F7EDE0" />
        <path d="M30 38 C22 36 10 40 4 42 C6 46 14 48 22 48 C30 48 38 46 42 40Z" fill="#D06A2C" />
        <path d="M6 44 C12 47 22 48 30 46 C24 50 12 50 6 44Z" fill="#F7EDE0" />
        <circle cx={5} cy={42} r={2.4} fill="#1E1410" />
        <path d="M24 34 C30 30 40 30 46 36 C42 42 32 44 26 42Z" fill="#D06A2C" />
        <g className="home-ear" style={v({ "--d": `${d}s`, transformOrigin: "50% 100%" })}>
          <path d="M34 32 L36 14 L44 30Z" fill="#C8642A" />
          <path d="M36 28 L37 19 L41 28Z" fill="#F2C9A4" />
        </g>
        <g className="home-ear" style={v({ "--d": `${d - 0.4}s`, transformOrigin: "50% 100%" })}>
          <path d="M42 32 L48 16 L50 32Z" fill="#B5531F" />
        </g>
        <Eye x={28} y={38} r={1.9} d={d} />
      </g>
    </svg>
  );
}

/** Geladas: one combs through the other's golden cape while a baby watches. */
export function Geladas({ d = 0 }: { d?: number }) {
  const cape = "#D9A46A";
  const capeDark = "#B9824E";
  const body = "#A8744A";
  const face = "#4A2E24";
  return (
    <svg viewBox="0 0 170 120" className="block w-full overflow-visible" aria-hidden>
      <ellipse cx={86} cy={116} rx={70} ry={5} fill="#000" opacity={0.15} />
      {/* the one being groomed, back half turned, eyes closed and content */}
      <g className="home-breathe-s">
        <path d="M26 114 C18 82 30 56 58 54 C84 56 92 84 86 114Z" fill={body} />
        <path d="M30 70 C36 58 50 52 62 54 C76 58 84 68 86 80 C74 74 60 74 46 80 C38 82 32 78 30 70Z" fill={cape} />
        <path d="M34 76 l4 10 M44 74 l3 12 M56 74 l2 12 M68 74 l0 12 M78 78 l-2 10" stroke={capeDark} strokeWidth={2} strokeLinecap="round" />
        <circle cx={46} cy={44} r={15} fill={cape} />
        <ellipse cx={42} cy={48} rx={8.5} ry={10} fill={face} />
        <path d="M37 45 q2.5 2 5 0 M43 45 q2.5 2 5 0" stroke="#E8D6C4" strokeWidth={1.6} fill="none" strokeLinecap="round" />
        <ellipse cx={42} cy={54} rx={4} ry={2.6} fill="#2E1C16" />
        <path d="M50 96 C54 92 60 92 62 96 C60 100 54 104 50 96Z" fill="#E0414A" />
      </g>
      {/* the groomer, looking down at its work */}
      <g className="home-breathe-s" style={v({ "--d": "-1s" })}>
        <path d="M96 114 C88 80 100 58 124 56 C150 58 158 82 152 114Z" fill={body} />
        <path d="M100 76 C106 62 118 56 128 56 C142 58 152 68 152 82 C140 76 126 76 112 82 C104 84 100 82 100 76Z" fill={cape} />
        <path d="M112 92 C116 88 124 88 126 92 C124 98 116 100 112 92Z" fill="#E0414A" />
        <g className="home-nod" style={v({ "--d": `${d}s`, transformOrigin: "50% 100%" })}>
          <circle cx={122} cy={44} r={15} fill={cape} />
          <ellipse cx={116} cy={48} rx={8.5} ry={10} fill={face} />
          <g className="home-blink" style={v({ "--d": `${d}s` })}>
            <ellipse cx={112.5} cy={45} rx={2.2} ry={1.8} fill="#F2E3D0" />
            <ellipse cx={119.5} cy={45} rx={2.2} ry={1.8} fill="#F2E3D0" />
            <circle cx={112.2} cy={46} r={1.3} fill={INK} />
            <circle cx={119.2} cy={46} r={1.3} fill={INK} />
          </g>
          <ellipse cx={116} cy={54} rx={4} ry={2.6} fill="#2E1C16" />
        </g>
        {/* the grooming hand, combing through the fur */}
        <g className="home-groom" style={v({ "--d": `${d}s`, transformOrigin: "92% 75%" })}>
          <path d="M108 74 C98 74 88 70 80 66" stroke={body} strokeWidth={8} strokeLinecap="round" fill="none" />
          <circle cx={78} cy={65} r={5.5} fill="#5A3A2A" />
        </g>
      </g>
      {/* the baby */}
      <g className="home-bob" style={v({ "--d": `${d - 0.5}s` })}>
        <path d="M74 116 C70 102 76 94 86 94 C96 94 100 104 96 116Z" fill={body} />
        <circle cx={86} cy={86} r={10} fill="#C08A58" />
        <ellipse cx={86} cy={89} rx={5.5} ry={6.5} fill="#5A3A2E" />
        <Eye x={84} y={87} r={1.5} d={d - 2} />
        <Eye x={88.5} y={87} r={1.5} d={d - 2} />
      </g>
    </svg>
  );
}

/** A lammergeier (bearded vulture) gliding on long, narrow wings. */
export function Lammergeier() {
  return (
    <svg viewBox="0 0 120 50" className="block w-full overflow-visible" aria-hidden>
      <g className="home-glide">
        <path d="M60 24 C44 10 22 6 2 10 C18 14 34 20 50 30Z" fill="#3B3340" />
        <path d="M60 24 C76 10 98 6 118 10 C102 14 86 20 70 30Z" fill="#3B3340" />
      </g>
      <path d="M50 26 C54 20 66 20 70 26 C68 34 62 38 60 44 C58 38 52 34 50 26Z" fill="#E59A4E" />
      <path d="M56 40 L60 50 L64 40Z" fill="#3B3340" />
      <circle cx={60} cy={20} r={5} fill="#F2E3C8" />
      <path d="M58 24 l-1 4" stroke="#1E1410" strokeWidth={1.4} />
    </svg>
  );
}

const FISH = [
  ["#FF8A3D", "#FFC07A", "#C8531A"],
  ["#4FB3FF", "#A6DBFF", "#1F6FB8"],
  ["#FFD23F", "#FFF0A0", "#C99A0A"],
  ["#FF6FA8", "#FFC2DA", "#B83A6E"],
];

/** A little tilapia from Lake Tana, its tail swishing. */
export function Fish({ c = 0, d = 0 }: { c?: number; d?: number }) {
  const [main, belly, fin] = FISH[c % FISH.length];
  return (
    <svg viewBox="0 0 64 36" className="block w-full overflow-visible" aria-hidden>
      <g className="home-fin" style={v({ "--d": `${d}s`, transformOrigin: "0% 50%" })}>
        <path d="M48 18 L64 6 C60 14 60 22 64 30Z" fill={fin} />
      </g>
      <path d="M4 18 C10 4 34 2 50 18 C34 34 10 32 4 18Z" fill={main} />
      <path d="M8 22 C18 30 36 30 46 21 C36 26 18 26 8 22Z" fill={belly} />
      <path d="M22 6 C28 0 38 2 42 10 C36 8 28 8 22 6Z" fill={fin} />
      <path d="M20 8 L22 28 M28 7 L30 29 M36 9 L37 27" stroke={fin} strokeWidth={1.4} opacity={0.45} />
      <Eye x={11} y={15} r={2.4} d={d} />
      <path d="M4 19 Q6 21 8 20" stroke={fin} strokeWidth={1.2} fill="none" />
      <path d="M14 9 Q22 5 30 7" stroke="#fff" strokeWidth={1.6} opacity={0.5} fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** A hippo peeking out of the water: only the top of its head shows. */
export function Hippo({ d = 0 }: { d?: number }) {
  return (
    <svg viewBox="0 0 120 64" className="block w-full overflow-visible" aria-hidden>
      <g className="home-bob" style={v({ "--d": `${d}s`, "--dur": "3.4s" })}>
        <path d="M10 60 C8 34 24 22 46 22 C60 22 64 30 74 30 C90 30 108 34 110 50 L112 64 L10 64Z" fill="#8A7FA0" />
        <path d="M74 30 C90 30 108 34 110 50 C100 44 88 42 74 42Z" fill="#9D93B3" />
        <ellipse cx={100} cy={40} rx={3} ry={2} fill="#4E4560" />
        <ellipse cx={90} cy={39} rx={3} ry={2} fill="#4E4560" />
        <g className="home-ear" style={v({ "--d": `${d}s`, transformOrigin: "50% 100%" })}>
          <ellipse cx={30} cy={22} rx={5} ry={7} fill="#7A6F90" />
          <ellipse cx={30} cy={23} rx={2.5} ry={4} fill="#E7A8B8" />
        </g>
        <g className="home-ear" style={v({ "--d": `${d - 0.5}s`, transformOrigin: "50% 100%" })}>
          <ellipse cx={46} cy={18} rx={5} ry={7} fill="#7A6F90" />
          <ellipse cx={46} cy={19} rx={2.5} ry={4} fill="#E7A8B8" />
        </g>
        <circle cx={44} cy={32} r={7} fill="#9D93B3" />
        <circle cx={60} cy={32} r={7} fill="#9D93B3" />
        <Eye x={45} y={32} r={3} d={d} />
        <Eye x={61} y={32} r={3} d={d} />
        <ellipse cx={80} cy={50} rx={10} ry={4} fill="#F2A8BA" opacity={0.6} />
      </g>
      {/* the water line across its face */}
      <path d="M0 50 q10 -4 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 V64 H0Z" fill="#3E8FC6" opacity={0.85} />
      <path d="M0 50 q10 -4 20 0 t20 0 t20 0 t20 0 t20 0 t20 0" stroke="#BDE8FF" strokeWidth={1.6} fill="none" />
    </svg>
  );
}

export function Mushrooms() {
  return (
    <svg viewBox="0 0 80 64" className="block w-full overflow-visible" aria-hidden>
      <ellipse cx={40} cy={62} rx={34} ry={3} fill="#000" opacity={0.15} />
      <path d="M22 60 C20 48 22 38 24 34 L34 34 C34 40 34 50 34 60Z" fill="#F6EEDC" />
      <path d="M6 36 C6 16 50 12 52 36 C40 40 18 40 6 36Z" fill="#E8513B" />
      <path d="M10 30 C14 20 28 16 38 18" stroke="#FF8A70" strokeWidth={3} fill="none" strokeLinecap="round" />
      <circle cx={18} cy={26} r={3.6} fill="#FFF6E6" />
      <circle cx={32} cy={22} r={3} fill="#FFF6E6" />
      <circle cx={42} cy={30} r={2.6} fill="#FFF6E6" />
      <circle cx={26} cy={33} r={2} fill="#FFF6E6" />
      <path d="M56 60 C55 54 56 48 58 46 L64 46 C64 50 64 56 64 60Z" fill="#F6EEDC" />
      <path d="M48 48 C48 36 74 34 76 48 C68 50 56 50 48 48Z" fill="#F5B21E" />
      <circle cx={58} cy={42} r={2} fill="#FFF6E6" />
      <circle cx={67} cy={44} r={1.6} fill="#FFF6E6" />
    </svg>
  );
}

/** Adey abeba, the yellow Meskel daisy that covers the highlands after the rains. */
export function AdeyAbeba({ x, y, s = 1, open = true }: { x: number; y: number; s?: number; open?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 Q-1 -8 0 -16" stroke="#3E8E4A" strokeWidth={1.6} fill="none" />
      <g transform="translate(0 -17)">
        {open ? (
          Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx={0} cy={-4.6} rx={1.9} ry={4} fill="#FFD23F" transform={`rotate(${i * 45})`} />)
        ) : (
          <path d="M-3 0 Q0 -8 3 0Z" fill="#E8B92F" />
        )}
        <circle r={open ? 2.4 : 1.6} fill="#C8731A" />
      </g>
    </g>
  );
}

/** A tall giant lobelia of the Simien slopes. */
export function Lobelia({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-2 0 V-20 M2 0 V-20" stroke="#6B5A3A" strokeWidth={3} />
      <path d="M-14 -16 Q-6 -26 0 -20 Q6 -26 14 -16 Q6 -14 0 -18 Q-6 -14 -14 -16Z" fill="#4F8A4F" />
      <path d="M-6 -20 C-8 -50 -4 -76 0 -84 C4 -76 8 -50 6 -20Z" fill="#7FAF6A" />
      {Array.from({ length: 7 }, (_, i) => (
        <path key={i} d={`M-6 ${-26 - i * 8} l6 4 l6 -4`} stroke="#5E8F55" strokeWidth={1.4} fill="none" />
      ))}
      <path d="M-2 -76 C-2 -60 -3 -44 -3 -26" stroke="#B5D69A" strokeWidth={1.6} opacity={0.6} />
    </g>
  );
}

export function Papyrus({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g>
        <path d="M0 0 C1 -30 -1 -60 2 -90" stroke="#4E8A3E" strokeWidth={2.4} fill="none" />
        <g transform="translate(2 -90)">
          {Array.from({ length: 9 }, (_, i) => (
            <path key={i} d={`M0 0 Q${(i - 4) * 4} -8 ${(i - 4) * 6} -${10 + (4 - Math.abs(i - 4)) * 2}`} stroke="#79B65A" strokeWidth={1.4} fill="none" />
          ))}
        </g>
      </g>
    </g>
  );
}

/** A tankwa, the papyrus boat of Lake Tana. */
export function Tankwa() {
  return (
    <svg viewBox="0 0 130 34" className="block w-full overflow-visible" aria-hidden>
      <path d="M4 10 C30 30 100 30 126 8 C112 26 24 28 4 10Z" fill="#B88A3E" />
      <path d="M4 10 C30 26 100 26 126 8 L122 14 C100 30 30 30 8 15Z" fill="#D9AE5E" />
      <path d="M24 16 l3 8 M40 19 l2 8 M56 20 l1 8 M72 20 l0 8 M88 19 l-1 8 M104 16 l-2 8" stroke="#8A6526" strokeWidth={1.6} />
      <path d="M64 18 L58 -2" stroke="#7A5236" strokeWidth={2.4} strokeLinecap="round" />
      <path d="M58 -2 L56 -4" stroke="#7A5236" strokeWidth={4} strokeLinecap="round" />
    </svg>
  );
}

/** A fern frond, made of little leaflets. */
export function Fern({ x, y, s = 1, flip = false, color = "#3E9B5A" }: { x: number; y: number; s?: number; flip?: boolean; color?: string }) {
  const leaves = Array.from({ length: 9 }, (_, i) => {
    const t = i / 9;
    const px = t * 50;
    const py = -t * 46 + t * t * 18;
    const L = 12 * (1 - t * 0.7);
    return `M${px.toFixed(1)} ${py.toFixed(1)} q${(L * 0.3).toFixed(1)} ${(-L).toFixed(1)} ${(L * 0.8).toFixed(1)} ${(-L * 0.6).toFixed(1)} M${px.toFixed(1)} ${py.toFixed(1)} q${(L * 0.9).toFixed(1)} ${(L * 0.1).toFixed(1)} ${(L * 0.8).toFixed(1)} ${(L * 0.6).toFixed(1)}`;
  }).join(" ");
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <g>
        <path d="M0 0 C16 -30 34 -40 52 -30" stroke={color} strokeWidth={2.2} fill="none" />
        <path d={leaves} stroke={color} strokeWidth={4} strokeLinecap="round" fill="none" />
      </g>
    </g>
  );
}
