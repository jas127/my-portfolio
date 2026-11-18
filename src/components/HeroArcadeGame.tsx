import { useState, useEffect, useRef, useCallback } from 'react';
import { PixelSprite } from '@/pixel';
import { PixelCharacter } from '@/components/PixelCharacter';
import { TREE, BUSH, CLOUD, STAR, FLAG, COIN_A, COIN_B } from '@/pixel/sprites';
import { useSound } from '@/lib/sound';

type BlockStation = {
  id: number;
  xPct: number;
};

const STATIONS: BlockStation[] = [
  { id: 0, xPct: 30 },
  { id: 1, xPct: 54 },
  { id: 2, xPct: 76 },
];

const START_X = 8;
const END_X = 90;

type Popup = {
  id: number;
  xPct: number;
  text: string;
};

export function HeroArcadeGame() {
  const { blip, fanfare } = useSound();

  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [runnerX, setRunnerX] = useState(START_X);
  const [jumpY, setJumpY] = useState(0);
  const [jumpPhase, setJumpPhase] = useState<'ground' | 'rise' | 'peak' | 'fall'>('ground');
  const [hitBlockId, setHitBlockId] = useState<number | null>(null);
  const [coinFrame, setCoinFrame] = useState(false);
  const [popups, setPopups] = useState<Popup[]>([]);

  const xRef = useRef(START_X);
  const isPlayingRef = useRef(false);
  const jumpProgressRef = useRef<number | null>(null);
  const hitDuringJumpRef = useRef(false);

  const awardBlockHit = useCallback(
    (blockId: number, atXPct: number) => {
      setScore((s) => s + 100);
      setCoins((c) => c + 1);
      setHitBlockId(blockId);
      window.setTimeout(() => {
        setHitBlockId((curr) => (curr === blockId ? null : curr));
      }, 260);
      fanfare();
      const popupId = Date.now() + Math.random();
      setPopups((prev) => [...prev.slice(-3), { id: popupId, xPct: atXPct, text: '+100' }]);
      window.setTimeout(() => {
        setPopups((prev) => prev.filter((p) => p.id !== popupId));
      }, 750);
    },
    [fanfare]
  );

  // Clicking in the game area:
  // - If not playing yet, starts the round from START_X
  // - If already running, makes the character jump!
  const handleGameAreaClick = useCallback(() => {
    if (!isPlayingRef.current) {
      xRef.current = START_X;
      setRunnerX(START_X);
      jumpProgressRef.current = null;
      hitDuringJumpRef.current = false;
      isPlayingRef.current = true;
      setIsPlaying(true);
      blip(660);
      return;
    }

    // Already running -> user click triggers jump
    if (jumpProgressRef.current === null) {
      jumpProgressRef.current = 0;
      hitDuringJumpRef.current = false;
      blip(780);
    }
  }, [blip]);

  const handleResetScore = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setScore(0);
      setCoins(0);
      isPlayingRef.current = false;
      setIsPlaying(false);
      jumpProgressRef.current = null;
      hitDuringJumpRef.current = false;
      xRef.current = START_X;
      setRunnerX(START_X);
      setJumpY(0);
      setJumpPhase('ground');
      blip(440);
    },
    [blip]
  );

  useEffect(() => {
    const id = window.setInterval(() => setCoinFrame((f) => !f), 320);
    return () => window.clearInterval(id);
  }, []);

  // Game loop runs ONLY when isPlaying is true
  useEffect(() => {
    if (!isPlaying) return;
    let rafId: number;
    let lastTime = performance.now();
    const RUN_SPEED_PCT_PER_SEC = 16; // crosses track in ~5s
    const JUMP_DURATION_SEC = 0.56;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const nextX = xRef.current + RUN_SPEED_PCT_PER_SEC * dt;

      // End of round: return to starting position and wait for next click while preserving score!
      if (nextX >= END_X) {
        isPlayingRef.current = false;
        jumpProgressRef.current = null;
        hitDuringJumpRef.current = false;
        xRef.current = START_X;
        setIsPlaying(false);
        setRunnerX(START_X);
        setJumpY(0);
        setJumpPhase('ground');
        return;
      }

      xRef.current = nextX;

      let nextY = 0;
      let phase: 'ground' | 'rise' | 'peak' | 'fall' = 'ground';

      if (jumpProgressRef.current !== null) {
        const p = jumpProgressRef.current + dt / JUMP_DURATION_SEC;
        if (p >= 1) {
          jumpProgressRef.current = null;
          nextY = 0;
          phase = 'ground';
        } else {
          jumpProgressRef.current = p;
          nextY = Math.round(64 * 4 * p * (1 - p));
          phase = p < 0.32 ? 'rise' : p < 0.68 ? 'peak' : 'fall';

          // Score ONLY if the character is near the peak of her jump AND horizontally aligned with a '?' block
          if (p >= 0.34 && p <= 0.66 && !hitDuringJumpRef.current) {
            const hitStation = STATIONS.find((st) => Math.abs(st.xPct - nextX) <= 4.8);
            if (hitStation) {
              hitDuringJumpRef.current = true;
              awardBlockHit(hitStation.id, hitStation.xPct);
            }
          }
        }
      }

      setRunnerX(nextX);
      setJumpY(nextY);
      setJumpPhase(phase);

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [awardBlockHit, isPlaying]);

  const jumpFrameIndex = jumpPhase === 'rise' ? 1 : jumpPhase === 'peak' ? 2 : 3;

  return (
    <div
      id="arcade-game"
      onClick={handleGameAreaClick}
      role="region"
      aria-label="Interactive retro platformer mini-game. Click inside to start and click to jump and hit blocks."
      className="relative h-[240px] w-full md:h-[270px] overflow-hidden select-none border-t-[3px] border-ink-900 bg-gradient-to-b from-lavender-300/45 via-bubblegum/20 to-warmcream-50 cursor-pointer scroll-mt-20"
    >
      {/* Subtle pixel grid sky backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-dotgrid bg-[size:16px_16px] opacity-60"
      />

      {/* Retro Arcade HUD Bar */}
      <div className="relative z-20 mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 pt-3 md:px-8">
        <div className="flex items-center gap-3 border-[3px] border-ink-900 bg-warmcream-50 px-3 py-1.5 shadow-chunk-sm">
          <span className="border-r-2 border-ink-300 pr-2.5 font-pixel text-[9px] text-electricviolet">
            WORLD 1-1
          </span>
          <span className="font-pixel text-[9px] text-ink-900">
            <span className="text-tomato-500">SCORE</span> {String(score).padStart(5, '0')}
          </span>
          <span className="border-l-2 border-ink-300 pl-2.5 font-pixel text-[9px] text-ink-900">
            <span className="text-electricviolet">COINS</span> x{String(coins).padStart(2, '0')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="border-[3px] border-ink-900 bg-acidlime px-3 py-1.5 font-pixel text-[9px] text-ink-900 shadow-chunk-sm">
            {isPlaying ? 'CLICK AREA TO JUMP & HIT BLOCKS!' : 'CLICK HERE TO START ROUND'}
          </span>

          <button
            type="button"
            onClick={handleResetScore}
            className="border-[3px] border-ink-900 bg-tomato-500 px-3 py-1.5 font-pixel text-[9px] text-warmcream-50 shadow-chunk-sm transition-transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-ink-900"
          >
            RESET SCORE
          </button>
        </div>
      </div>

      {/* Drifting pixel clouds & twinkling stars */}
      <div className="pointer-events-none absolute left-[6%] top-[22%] anim-cloud">
        <PixelSprite sprite={CLOUD} scale={3} />
      </div>
      <div
        className="pointer-events-none absolute left-[44%] top-[18%] anim-cloud"
        style={{ animationDelay: '-3.5s' }}
      >
        <PixelSprite sprite={CLOUD} scale={2} />
      </div>
      <div
        className="pointer-events-none absolute right-[12%] top-[20%] anim-cloud"
        style={{ animationDelay: '-6s' }}
      >
        <PixelSprite sprite={CLOUD} scale={3} />
      </div>
      <div className="pointer-events-none absolute left-[22%] top-[16%] anim-twinkle">
        <PixelSprite sprite={STAR} scale={2} />
      </div>
      <div
        className="pointer-events-none absolute right-[28%] top-[15%] anim-twinkle"
        style={{ animationDelay: '-0.9s' }}
      >
        <PixelSprite sprite={STAR} scale={2} />
      </div>

      {/* Layered Retro Stepped Hills on the Horizon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[44px] left-[8%] h-14 w-36 border-t-[3px] border-x-[3px] border-ink-900 bg-lavender-300/70 hidden sm:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[44px] left-[36%] h-20 w-52 border-t-[3px] border-x-[3px] border-ink-900 bg-bubblegum/55 hidden md:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[44px] right-[14%] h-16 w-44 border-t-[3px] border-x-[3px] border-ink-900 bg-grass-300/75 hidden sm:block"
      />

      {/* Scenery: Pixel Trees, Bushes & Goal Flag */}
      <div className="pointer-events-none absolute bottom-[44px] left-[2%]">
        <PixelSprite sprite={TREE} scale={4} />
      </div>
      <div className="pointer-events-none absolute bottom-[44px] left-[18%] hidden sm:block">
        <PixelSprite sprite={BUSH} scale={4} />
      </div>
      <div className="pointer-events-none absolute bottom-[44px] left-[64%] hidden md:block">
        <PixelSprite sprite={BUSH} scale={4} />
      </div>
      <div className="pointer-events-none absolute bottom-[44px] right-[4%]">
        <div className="anim-flag">
          <PixelSprite sprite={FLAG} scale={4} />
        </div>
      </div>

      {/* Three Mario-style Brick + '?' Mystery Block Stations */}
      {STATIONS.map((st) => {
        const isHit = hitBlockId === st.id;
        return (
          <div
            key={st.id}
            className="pointer-events-none absolute bottom-[132px] -translate-x-1/2 flex flex-col items-center"
            style={{ left: `${st.xPct}%` }}
          >
            <div
              className={`mb-1.5 transition-transform duration-200 ${
                isHit ? '-translate-y-7 scale-125' : 'anim-bob'
              }`}
            >
              <PixelSprite sprite={coinFrame ? COIN_B : COIN_A} scale={3} />
            </div>

            <div className="flex items-center">
              <div className="hidden sm:flex h-8 w-8 items-center justify-center border-[3px] border-r-0 border-ink-900 bg-tomato-500 shadow-chunk-sm">
                <span className="h-1.5 w-4 border-b-2 border-ink-900/40" />
              </div>
              <div
                className={`flex h-9 w-9 items-center justify-center border-[3px] border-ink-900 font-pixel text-sm font-bold text-ink-900 shadow-chunk-sm transition-transform duration-150 ${
                  isHit ? '-translate-y-3 bg-acidlime' : 'bg-butter-400'
                }`}
              >
                ?
              </div>
              <div className="hidden sm:flex h-8 w-8 items-center justify-center border-[3px] border-l-0 border-ink-900 bg-tomato-500 shadow-chunk-sm">
                <span className="h-1.5 w-4 border-b-2 border-ink-900/40" />
              </div>
            </div>
          </div>
        );
      })}

      {/* Floating '+100' Score Popups */}
      {popups.map((p) => (
        <div
          key={p.id}
          className="pointer-events-none absolute bottom-[185px] -translate-x-1/2 z-30 border-2 border-ink-900 bg-acidlime px-2 py-0.5 font-pixel text-[10px] font-bold text-ink-900 shadow-chunk-sm animate-bounce"
          style={{ left: `${p.xPct}%` }}
        >
          {p.text}
        </div>
      ))}

      {/* Character on the Track: waits at start until clicked, runs during round, jumps only on click */}
      <div
        className="pointer-events-none absolute bottom-[42px] z-20 -translate-x-1/2"
        style={{
          left: `${runnerX}%`,
          transform: `translate(-50%, ${-jumpY}px)`,
        }}
      >
        {!isPlaying ? (
          <div className="relative flex flex-col items-center">
            <span className="mb-1 whitespace-nowrap border-2 border-ink-900 bg-warmcream-50 px-2 py-0.5 font-pixel text-[8px] text-ink-900 shadow-chunk-sm">
              CLICK TO RUN
            </span>
            <PixelCharacter
              animation="idle"
              scale={0.44}
              label="Jasmitha ready at the starting line"
            />
          </div>
        ) : jumpPhase !== 'ground' ? (
          <PixelCharacter
            animation="jump"
            frame={jumpFrameIndex}
            scale={0.52}
            label="Jasmitha jumping to hit a block"
          />
        ) : (
          <PixelCharacter
            animation="run"
            scale={0.52}
            label="Jasmitha running along the arcade track"
          />
        )}
      </div>

      {/* Retro Pixel Grass Ground Band */}
      <div
        className="absolute bottom-[12px] left-0 right-0 h-[32px] border-t-[3px] border-ink-900"
        style={{
          backgroundColor: '#4C9A2A',
          backgroundImage:
            'linear-gradient(rgba(38,34,28,0.16) 2px, transparent 2px), linear-gradient(90deg, rgba(38,34,28,0.16) 2px, transparent 2px)',
          backgroundSize: '16px 16px',
        }}
      />
      {/* Dirt Underlayer */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[12px] border-t-[3px] border-ink-900"
        style={{
          backgroundColor: '#6B4A2E',
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(25,25,25,0.2) 0 8px, transparent 8px 16px)',
        }}
      />
    </div>
  );
}
