import { useState, useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';
import { PixelSprite } from '@/pixel';
import { PixelCharacter } from '@/components/PixelCharacter';
import { TREE, BUSH, CLOUD, STAR, FLAG, COIN_A, COIN_B } from '@/pixel/sprites';
import { useSound } from '@/lib/sound';

type BlockStation = {
  id: number;
  xPct: number;
};

const STATIONS: BlockStation[] = [
  { id: 0, xPct: 26 },
  { id: 1, xPct: 50 },
  { id: 2, xPct: 74 },
];

type Popup = {
  id: number;
  xPct: number;
  text: string;
};

export function HeroArcadeGame() {
  const { blip, fanfare } = useSound();
  const reduceMotion = useReducedMotion();

  const [score, setScore] = useState(300);
  const [coins, setCoins] = useState(3);
  const [runnerX, setRunnerX] = useState(14); // percentage across track (6..88)
  const [jumpY, setJumpY] = useState(0); // pixels above ground (0..68)
  const [jumpPhase, setJumpPhase] = useState<'ground' | 'rise' | 'peak' | 'fall'>('ground');
  const [hitBlockId, setHitBlockId] = useState<number | null>(null);
  const [coinFrame, setCoinFrame] = useState(false);
  const [popups, setPopups] = useState<Popup[]>([]);

  // Physics refs for smooth 60fps loop
  const xRef = useRef(14);
  const jumpProgressRef = useRef<number | null>(null); // 0..1 during jump
  const autoJumpedBlocksRef = useRef<Set<number>>(new Set());
  const hitDuringJumpRef = useRef(false);

  const awardCoin = useCallback(
    (blockId: number | null, atXPct: number, playAudio: boolean) => {
      setScore((s) => s + 100);
      setCoins((c) => c + 1);
      if (blockId !== null) {
        setHitBlockId(blockId);
        window.setTimeout(() => {
          setHitBlockId((curr) => (curr === blockId ? null : curr));
        }, 260);
      }
      if (playAudio) {
        fanfare();
      }
      const popupId = Date.now() + Math.random();
      setPopups((prev) => [...prev.slice(-3), { id: popupId, xPct: atXPct, text: '+100' }]);
      window.setTimeout(() => {
        setPopups((prev) => prev.filter((p) => p.id !== popupId));
      }, 750);
    },
    [fanfare]
  );

  // Trigger a player-initiated jump (with sound) or auto-jump (quiet so it never spams sound)
  const triggerJump = useCallback(
    (isManual: boolean) => {
      if (reduceMotion) {
        // In reduced-motion mode, immediately score a coin on click
        const nearest = STATIONS.reduce((best, st) =>
          Math.abs(st.xPct - xRef.current) < Math.abs(best.xPct - xRef.current) ? st : best
        );
        awardCoin(nearest.id, nearest.xPct, isManual);
        return;
      }
      if (jumpProgressRef.current !== null) return;
      jumpProgressRef.current = 0;
      hitDuringJumpRef.current = false;
      if (isManual) {
        blip(780);
      }
    },
    [awardCoin, blip, reduceMotion]
  );

  // Coin spin ticker
  useEffect(() => {
    const id = window.setInterval(() => setCoinFrame((f) => !f), 320);
    return () => window.clearInterval(id);
  }, []);

  // 60fps side-scrolling runner & jump arc loop
  useEffect(() => {
    if (reduceMotion) return;
    let rafId: number;
    let lastTime = performance.now();
    const RUN_SPEED_PCT_PER_SEC = 13.5; // crosses the level in ~6 seconds
    const JUMP_DURATION_SEC = 0.56;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      // Advance horizontal position
      let nextX = xRef.current + RUN_SPEED_PCT_PER_SEC * dt;
      if (nextX > 90) {
        nextX = 6;
        autoJumpedBlocksRef.current.clear();
      }
      xRef.current = nextX;

      // Auto-jump when approaching a mystery block station
      if (jumpProgressRef.current === null) {
        for (const st of STATIONS) {
          if (
            !autoJumpedBlocksRef.current.has(st.id) &&
            nextX >= st.xPct - 3.6 &&
            nextX <= st.xPct - 1.2
          ) {
            autoJumpedBlocksRef.current.add(st.id);
            jumpProgressRef.current = 0;
            hitDuringJumpRef.current = false;
            break;
          }
        }
      }

      // Advance jump parabola if jumping
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
          // Parabolic arc: 4 * p * (1 - p) peaks at 1.0 when p = 0.5
          nextY = Math.round(64 * 4 * p * (1 - p));
          phase = p < 0.32 ? 'rise' : p < 0.68 ? 'peak' : 'fall';

          // Hit check right at the peak (p >= 0.45)
          if (p >= 0.45 && !hitDuringJumpRef.current) {
            hitDuringJumpRef.current = true;
            // Check if near any station block, otherwise score an air coin at current X
            const nearStation = STATIONS.find((st) => Math.abs(st.xPct - nextX) < 7.5);
            if (nearStation) {
              awardCoin(nearStation.id, nearStation.xPct, false);
            } else {
              awardCoin(null, nextX, false);
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
  }, [awardCoin, reduceMotion]);

  // Keyboard support: Spacebar to jump when hero is in view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.code === 'Space' &&
        (e.target as HTMLElement)?.tagName !== 'INPUT' &&
        (e.target as HTMLElement)?.tagName !== 'TEXTAREA' &&
        (e.target as HTMLElement)?.tagName !== 'BUTTON'
      ) {
        const el = document.getElementById('home');
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight && rect.bottom >= 120) {
            e.preventDefault();
            triggerJump(true);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerJump]);

  // Pick the exact jump frame so she never squats in mid-air
  const jumpFrameIndex = jumpPhase === 'rise' ? 1 : jumpPhase === 'peak' ? 2 : 3;

  return (
    <div
      onClick={() => triggerJump(true)}
      role="region"
      aria-label="Interactive retro platformer mini-game. Click or press Space to jump and collect coins."
      className="relative h-[240px] w-full md:h-[270px] overflow-hidden select-none border-t-[3px] border-ink-900 bg-gradient-to-b from-lavender-300/45 via-bubblegum/20 to-warmcream-50 cursor-pointer"
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

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            triggerJump(true);
          }}
          className="border-[3px] border-ink-900 bg-acidlime px-3 py-1.5 font-pixel text-[9px] text-ink-900 shadow-chunk-sm transition-transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-tomato-500"
        >
          [ CLICK OR PRESS SPACE TO JUMP ]
        </button>
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
      <div className="pointer-events-none absolute bottom-[44px] left-[3%]">
        <PixelSprite sprite={TREE} scale={4} />
      </div>
      <div className="pointer-events-none absolute bottom-[44px] left-[16%] hidden sm:block">
        <PixelSprite sprite={BUSH} scale={4} />
      </div>
      <div className="pointer-events-none absolute bottom-[44px] left-[62%] hidden md:block">
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
            {/* Spinning floating gold coin above block */}
            <div
              className={`mb-1.5 transition-transform duration-200 ${
                isHit ? '-translate-y-7 scale-125' : 'anim-bob'
              }`}
            >
              <PixelSprite sprite={coinFrame ? COIN_B : COIN_A} scale={3} />
            </div>

            {/* Brick + ? + Brick Platform Trio */}
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

      {/* Running & Jumping Character on the Track */}
      <div
        className="pointer-events-none absolute bottom-[42px] z-20 -translate-x-1/2"
        style={{
          left: `${runnerX}%`,
          transform: `translate(-50%, ${-jumpY}px)`,
        }}
      >
        {jumpPhase !== 'ground' ? (
          <PixelCharacter
            animation="jump"
            frame={jumpFrameIndex}
            scale={0.52}
            label="Jasmitha jumping to score a coin"
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
