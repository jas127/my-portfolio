import PixelSprite from './PixelSprite';
import {
  CHAR_MAIN,
  CHAR_WALK,
  TREE,
  BUSH,
  CLOUD,
  FLAG,
  SIGN,
  CAT,
  COIN_A,
  COIN_B,
  STAR,
  BULB,
  HEART,
  SPLAT,
  TICKET,
  DIAMOND,
  type SpriteData,
} from './sprites';
import { useEffect, useState } from 'react';

/** Character that blinks and occasionally switches to a walking pose. */
export function Character({ scale = 5, className = '' }: { scale?: number; className?: string }) {
  const [pose, setPose] = useState<'idle' | 'walk' | 'blink'>('idle');
  useEffect(() => {
    let alive = true;
    let timer: number;
    const loop = () => {
      if (!alive) return;
      const r = Math.random();
      if (r < 0.2) {
        setPose('blink');
        window.setTimeout(() => alive && setPose('idle'), 160);
      } else if (r < 0.45) {
        setPose('walk');
        window.setTimeout(() => alive && setPose('idle'), 900);
      }
      timer = window.setTimeout(loop, 1400 + Math.random() * 2200);
    };
    timer = window.setTimeout(loop, 1600);
    return () => {
      alive = false;
      window.clearTimeout(timer);
    };
  }, []);
  const sprite = pose === 'walk' ? CHAR_WALK : CHAR_MAIN;
  return (
    <div className={className}>
      <div className={pose === 'walk' ? 'anim-walk' : 'anim-bob'}>
        <PixelSprite sprite={sprite} scale={scale} />
      </div>
    </div>
  );
}

/** Animated coin pair. */
export function Coin({ scale = 3, className = '' }: { scale?: number; className?: string }) {
  const [flip, setFlip] = useState(false);
  useEffect(() => {
    const id = window.setInterval(() => setFlip((f) => !f), 500);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className={className}>
      <PixelSprite sprite={flip ? COIN_B : COIN_A} scale={scale} />
    </div>
  );
}

/** The pixel landscape strip: sky, hills, trees, sign, flag, wandering cat. */
export function PixelScene({ className = '' }: { className?: string }) {
  const [catStep, setCatStep] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setCatStep((s) => (s + 1) % 3), 700);
    return () => window.clearInterval(id);
  }, []);
  const catOffsets = ['translateX(0)', 'translateX(6px)', 'translateX(12px)'];
  return (
    <div className={`relative ${className}`}>
      {/* floating pixel elements */}
      <div className="absolute left-[8%] top-[14%] anim-cloud">
        <PixelSprite sprite={CLOUD} scale={3} />
      </div>
      <div className="absolute right-[16%] top-[8%] anim-cloud" style={{ animationDelay: '-4s' }}>
        <PixelSprite sprite={CLOUD} scale={2} />
      </div>
      <div className="absolute left-[38%] top-[6%] anim-twinkle">
        <PixelSprite sprite={STAR} scale={2} />
      </div>
      <div className="absolute right-[8%] top-[26%] anim-twinkle" style={{ animationDelay: '-0.9s' }}>
        <PixelSprite sprite={STAR} scale={2} />
      </div>

      {/* ground props */}
      <div className="absolute bottom-[16px] left-[4%]">
        <PixelSprite sprite={TREE} scale={4} />
      </div>
      <div className="absolute bottom-[16px] left-[16%] hidden sm:block">
        <PixelSprite sprite={BUSH} scale={4} />
      </div>
      <div className="absolute bottom-[16px] right-[26%]">
        <PixelSprite sprite={SIGN} scale={4} />
      </div>
      <div className="absolute bottom-[16px] right-[6%]">
        <div className="anim-flag">
          <PixelSprite sprite={FLAG} scale={4} />
        </div>
      </div>
      <div className="absolute bottom-[16px] left-[52%]" style={{ transform: catOffsets[catStep] }}>
        <PixelSprite sprite={CAT} scale={3} />
      </div>
      <Coin className="absolute bottom-[70px] left-[58%]" scale={3} />

      {/* grass ground band */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[48px] border-t-[3px] border-ink-700"
        style={{
          backgroundColor: '#4C9A2A',
          backgroundImage:
            'linear-gradient(rgba(38,34,28,0.14) 2px, transparent 2px), linear-gradient(90deg, rgba(38,34,28,0.14) 2px, transparent 2px)',
          backgroundSize: '16px 16px',
        }}
      />
      {/* dirt underlayer */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[14px] border-t-[3px] border-ink-700"
        style={{ backgroundColor: '#6B4A2E' }}
      />
    </div>
  );
}

export { CHAR_MAIN, TREE, BUSH, CLOUD, FLAG, SIGN, CAT, STAR, BULB, HEART, SPLAT, TICKET, DIAMOND };
export type { SpriteData };
