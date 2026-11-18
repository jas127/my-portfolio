import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PixelSprite } from '@/pixel';
import { PixelCharacter } from '@/components/PixelCharacter';
import { TREE, BUSH, CLOUD, STAR, COIN_A, COIN_B } from '@/pixel/sprites';
import { useSound } from '@/lib/sound';

export function HeroArcadeGame() {
  const { blip, fanfare } = useSound();
  const [score, setScore] = useState(0);
  const [coinsCollected, setCoinsCollected] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [showFloatingScore, setShowFloatingScore] = useState<{ id: number; text: string } | null>(null);

  // Trigger jump & coin hit
  const handleJump = () => {
    if (isJumping) return;
    setIsJumping(true);
    blip(880); // retro jump sound

    // Timing coin hit
    setTimeout(() => {
      setScore((s) => s + 100);
      setCoinsCollected((c) => c + 1);
      fanfare(); // arcade coin chime
      const id = Date.now();
      setShowFloatingScore({ id, text: '+100' });
      setTimeout(() => setShowFloatingScore(null), 900);
    }, 280);

    setTimeout(() => {
      setIsJumping(false);
    }, 700);
  };

  // Keyboard support: Space or ArrowUp to jump
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && (e.target as HTMLElement)?.tagName !== 'INPUT' && (e.target as HTMLElement)?.tagName !== 'TEXTAREA') {
        const el = document.getElementById('home');
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            e.preventDefault();
            handleJump();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isJumping]);

  return (
    <div className="relative h-[220px] w-full md:h-[260px] overflow-hidden select-none">
      {/* Sky scenery */}
      <div className="absolute left-[8%] top-[14%] anim-cloud">
        <PixelSprite sprite={CLOUD} scale={3} />
      </div>
      <div className="absolute right-[16%] top-[8%] anim-cloud" style={{ animationDelay: '-4s' }}>
        <PixelSprite sprite={CLOUD} scale={2} />
      </div>
      <div className="absolute left-[38%] top-[8%] anim-twinkle">
        <PixelSprite sprite={STAR} scale={2} />
      </div>
      <div className="absolute right-[8%] top-[24%] anim-twinkle" style={{ animationDelay: '-0.9s' }}>
        <PixelSprite sprite={STAR} scale={2} />
      </div>

      {/* Retro Arcade Game HUD */}
      <div className="absolute top-2 left-4 z-20 flex items-center gap-4 border-[3px] border-ink-900 bg-warmcream-50 px-3 py-1.5 shadow-chunk-sm">
        <div className="flex items-center gap-1.5 font-pixel text-[9px] text-ink-900">
          <span className="text-tomato-500 font-bold">SCORE:</span>
          <span>{String(score).padStart(5, '0')}</span>
        </div>
        <div className="h-3 w-[2px] bg-ink-300" />
        <div className="flex items-center gap-1.5 font-pixel text-[9px] text-ink-900">
          <span className="text-electricviolet font-bold">COINS:</span>
          <span>x{String(coinsCollected).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Ground scenery */}
      <div className="absolute bottom-[28px] left-[5%]">
        <PixelSprite sprite={TREE} scale={4} />
      </div>
      <div className="absolute bottom-[28px] left-[20%] hidden sm:block">
        <PixelSprite sprite={BUSH} scale={4} />
      </div>
      <div className="absolute bottom-[28px] right-[8%]">
        <PixelSprite sprite={TREE} scale={4} />
      </div>

      {/* Mario-style Mystery Coin Block & Floating Coin */}
      <div className="absolute bottom-[115px] left-[55%] md:left-[60%] flex flex-col items-center">
        {/* Floating animated coin */}
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotateY: [0, 180, 360],
          }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          className="mb-1"
        >
          <PixelSprite sprite={isJumping ? COIN_B : COIN_A} scale={3} />
        </motion.div>

        {/* Arcade Mystery Block */}
        <div className="flex h-10 w-10 items-center justify-center border-[3px] border-ink-900 bg-butter-400 font-pixel text-base font-bold text-ink-900 shadow-chunk-sm">
          ?
        </div>

        {/* Floating +100 text when hit */}
        <AnimatePresence>
          {showFloatingScore && (
            <motion.div
              key={showFloatingScore.id}
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -35, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute -top-7 font-pixel text-xs font-bold text-tomato-500"
            >
              {showFloatingScore.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Running & Jumping Character */}
      <div className="absolute bottom-[28px] left-[50%] md:left-[55%] flex flex-col items-center z-10">
        <motion.button
          type="button"
          onClick={handleJump}
          whileHover={{ scale: 1.05 }}
          animate={
            isJumping
              ? {
                  y: [-0, -85, 0],
                  x: [0, 35, 60, 0],
                }
              : {
                  y: 0,
                  x: 0,
                }
          }
          transition={
            isJumping
              ? {
                  duration: 0.7,
                  times: [0, 0.45, 1],
                  ease: 'easeInOut',
                }
              : undefined
          }
          className="group relative flex flex-col items-center border-0 bg-transparent p-0 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-tomato-500"
          aria-label="Click or press space to jump and hit the coin block"
        >
          {/* Action prompt pill */}
          {!isJumping && (
            <span className="absolute -top-7 font-pixel text-[8px] bg-warmcream-50 text-ink-900 border-2 border-ink-900 px-2 py-0.5 shadow-chunk-sm whitespace-nowrap animate-bounce">
              CLICK / SPACE TO JUMP! 🎮
            </span>
          )}

          {/* Crisp character sprite */}
          <PixelCharacter
            animation={isJumping ? 'jump' : 'run'}
            scale={0.55}
            label="Jasmitha jumping for coin"
          />
        </motion.button>
      </div>

      {/* Retro Pixel Grass ground band */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[38px] border-t-[3px] border-ink-900"
        style={{
          backgroundColor: '#4C9A2A',
          backgroundImage:
            'linear-gradient(rgba(38,34,28,0.14) 2px, transparent 2px), linear-gradient(90deg, rgba(38,34,28,0.14) 2px, transparent 2px)',
          backgroundSize: '16px 16px',
        }}
      />
      {/* Dirt underlayer */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[10px] border-t-[3px] border-ink-900"
        style={{ backgroundColor: '#6B4A2E' }}
      />
    </div>
  );
}
