import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Rect, Stop, Text as SvgText } from 'react-native-svg';

import type { SceneKind } from '@/content/stories';
import { fonts } from '@/lib/theme';
import { BeeShape, CubShape, GuguShape } from './characters';

const STAR = 'M12 1.8l3 6.5 7 .8-5.2 4.8 1.4 7-6.2-3.6-6.2 3.6 1.4-7L2 9.1l7-.8z';

function place(x: number, y: number, s: number) {
  return `translate(${x} ${y}) scale(${s})`;
}

function Label({ x, y, children, color = '#FFD54A' }: { x: number; y: number; children: string; color?: string }) {
  return (
    <SvgText x={x} y={y} fontSize={24} fontFamily={fonts.display} fill={color} stroke="#1B2A4E" strokeWidth={1} textAnchor="middle">
      {children}
    </SvgText>
  );
}

function MoonScene({ page }: { page: number }) {
  const moon = page >= 3 ? { x: -24, y: -34 } : { x: 10, y: 10 };
  const cub = [[40, 174], [104, 174], [166, 76], [166, 76]][page] ?? [166, 76];
  const gugu = [null, [196, 176], [228, 80], [228, 80]][page];
  const counting = page === 2;
  return (
    <>
      <Defs>
        <LinearGradient id="night" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#141B45" />
          <Stop offset="1" stopColor="#3A3C8A" />
        </LinearGradient>
      </Defs>
      <Rect width={400} height={300} fill="url(#night)" />
      <G fill="#fff" opacity={0.7}>
        {[[30, 30], [120, 22], [200, 80], [270, 20], [40, 110], [140, 110], [380, 140], [360, 24], [100, 150]].map(([x, y]) => (
          <Circle key={`${x}-${y}`} cx={x} cy={y} r={1.4} />
        ))}
      </G>
      {[[82, 56, '1'], [158, 42, '2'], [244, 66, '3']].map(([x, y, n]) => {
        const s = counting ? 1.6 : 0.8;
        return (
          <G key={n as string}>
            <Path d={STAR} fill={counting ? '#FFD54A' : '#C9CCF2'} transform={place((x as number) - 12 * s, (y as number) - 12 * s, s)} />
            {counting && <Label x={x as number} y={(y as number) + 40}>{n as string}</Label>}
          </G>
        );
      })}
      <G transform={`translate(${moon.x} ${moon.y})`}>
        <Circle cx={320} cy={70} r={28} fill="#F6EDC6" />
        <Circle cx={311} cy={66} r={2.6} fill="#5B4A2A" />
        <Circle cx={329} cy={66} r={2.6} fill="#5B4A2A" />
        <Path d="M310 77 Q320 85 330 77" stroke="#5B4A2A" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      </G>
      <G fill="#8E93D6">
        <Circle cx={300} cy={92} r={26} />
        <Circle cx={330} cy={78} r={34} />
        <Circle cx={364} cy={94} r={24} />
        <Ellipse cx={332} cy={106} rx={62} ry={14} />
      </G>
      <Path d="M0 300 L0 230 L90 170 L160 210 L230 135 L310 200 L400 160 L400 300Z" fill="#26306E" />
      <Path d="M0 300 L0 262 Q100 238 200 256 T400 250 L400 300Z" fill="#2E7F6A" />
      {page === 0 && <Label x={76} y={166}>?</Label>}
      <G transform={place(cub[0], cub[1], 0.35)}>
        <CubShape />
      </G>
      {gugu && (
        <G transform={place(gugu[0], gugu[1], 0.33)}>
          <GuguShape />
        </G>
      )}
    </>
  );
}

function Sheep({ x, y }: { x: number; y: number }) {
  return (
    <G transform={`translate(${x} ${y})`}>
      <Rect x={4} y={8} width={5} height={14} rx={2} fill="#3A2E2A" />
      <Rect x={22} y={8} width={5} height={14} rx={2} fill="#3A2E2A" />
      <G fill="#FFFFFF">
        <Circle cx={0} cy={0} r={13} />
        <Circle cx={14} cy={-5} r={14} />
        <Circle cx={28} cy={0} r={13} />
        <Circle cx={14} cy={7} r={13} />
      </G>
      <Ellipse cx={40} cy={-3} rx={9} ry={10} fill="#3A2E2A" />
      <Circle cx={43} cy={-5} r={1.8} fill="#fff" />
    </G>
  );
}

function CountScene({ page }: { page: number }) {
  const flock: [number, number][] = [[90, 236], [150, 244], [205, 232]];
  const fourth: [number, number] | null = page === 2 ? [318, 236] : page === 3 ? [255, 246] : null;
  const gugu = page === 2 ? [236, 150] : [8, 162];
  const showNumbers = page >= 1;
  return (
    <>
      <Defs>
        <LinearGradient id="day" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#8ED8FF" />
          <Stop offset="1" stopColor="#E4F6FF" />
        </LinearGradient>
      </Defs>
      <Rect width={400} height={300} fill="url(#day)" />
      <Circle cx={340} cy={50} r={26} fill="#FFC83D" />
      <Circle cx={340} cy={50} r={38} fill="#FFC83D" opacity={0.25} />
      <Path d="M0 190 Q120 130 240 180 T400 170 L400 300 L0 300Z" fill="#86D696" />
      <Path d="M0 236 Q200 212 400 236 L400 300 L0 300Z" fill="#4DBA74" />
      {page === 2 && fourth && <Sheep x={fourth[0]} y={fourth[1]} />}
      <Path d="M262 254 Q268 198 310 194 Q352 198 358 254Z" fill="#8C8A96" />
      <Path d="M282 214 Q296 204 312 206" stroke="#B5B3BF" strokeWidth={5} fill="none" strokeLinecap="round" />
      {flock.map(([x, y], i) => (
        <G key={i}>
          <Sheep x={x} y={y} />
          {showNumbers && <Label x={x + 18} y={y - 26} color="#E8513B">{String(i + 1)}</Label>}
        </G>
      ))}
      {page === 3 && fourth && (
        <>
          <Sheep x={fourth[0]} y={fourth[1]} />
          <Label x={fourth[0] + 18} y={fourth[1] - 26} color="#E8513B">4</Label>
        </>
      )}
      {page === 1 && <Label x={310} y={180} color="#E8513B">?</Label>}
      {page === 2 && fourth && <Label x={fourth[0] + 30} y={fourth[1] - 30} color="#E8513B">4</Label>}
      <G transform={place(gugu[0], gugu[1], 0.34)}>
        <GuguShape />
      </G>
    </>
  );
}

function Flower({ x, y, h, color }: { x: number; y: number; h: number; color: string }) {
  const petals = [0, 72, 144, 216, 288].map((a) => [Math.cos((a * Math.PI) / 180) * 12, Math.sin((a * Math.PI) / 180) * 12]);
  return (
    <G>
      <Path d={`M${x} ${y + h} Q${x - 6} ${y + h / 2} ${x} ${y}`} stroke="#2E9A5B" strokeWidth={4} fill="none" />
      {petals.map(([dx, dy], i) => (
        <Circle key={i} cx={x + dx} cy={y + dy} r={10} fill={color} />
      ))}
      <Circle cx={x} cy={y} r={8} fill="#FFC83D" />
    </G>
  );
}

function Heart({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <Path
      d="M0 8 C-10 0 -8 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C8 -10 10 0 0 8Z"
      fill="#E2463F"
      transform={place(x, y, s)}
    />
  );
}

function ShareScene({ page }: { page: number }) {
  const bee = [[96, 108], [210, 96], [176, 146], [214, 104]][page] ?? [214, 104];
  return (
    <>
      <Defs>
        <LinearGradient id="meadow" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#BDE8FF" />
          <Stop offset="1" stopColor="#F2FBFF" />
        </LinearGradient>
      </Defs>
      <Rect width={400} height={300} fill="url(#meadow)" />
      <Path d="M0 210 Q100 180 220 205 T400 195 L400 300 L0 300Z" fill="#7FD08E" />
      <Path d="M0 250 Q200 232 400 252 L400 300 L0 300Z" fill="#4DBA74" />
      <Flower x={90} y={168} h={80} color="#FF8FB1" />
      <Flower x={36} y={210} h={44} color="#B98CFF" />
      <Flower x={150} y={214} h={36} color="#FF7A63" />
      <Flower x={370} y={206} h={46} color="#FF8FB1" />
      {page >= 2 && (
        <G>
          <Ellipse cx={196} cy={238} rx={28} ry={24} fill="#D9902A" />
          <Rect x={174} y={208} width={44} height={10} rx={5} fill="#B36F17" />
          <Path d="M184 218 Q186 232 190 226 Q194 238 198 222" fill="#FFC83D" />
        </G>
      )}
      {page >= 1 && (
        <G transform={place(250, 168, 0.38)}>
          <CubShape sad={page === 1} />
        </G>
      )}
      {page === 3 && (
        <>
          <Heart x={196} y={70} s={1.4} />
          <Heart x={330} y={84} s={1.1} />
          <Heart x={150} y={100} s={0.9} />
        </>
      )}
      <G transform={place(bee[0], bee[1], 1.5)}>
        <BeeShape />
      </G>
    </>
  );
}

/** The picture for one page of a story, in a 4:3 box that fills its parent's width. */
export function Scene({ kind, page }: { kind: SceneKind; page: number }) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      {kind === 'moon' && <MoonScene page={page} />}
      {kind === 'count' && <CountScene page={page} />}
      {kind === 'share' && <ShareScene page={page} />}
    </Svg>
  );
}
