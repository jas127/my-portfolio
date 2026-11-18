import PixelSprite from './PixelSprite';
import {
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

export { TREE, BUSH, CLOUD, FLAG, SIGN, CAT, STAR, BULB, HEART, SPLAT, TICKET, DIAMOND };
export type { SpriteData };
