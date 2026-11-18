import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import bgMusicUrl from '@/audio/subterranean_homesick_alien.mp3';

type SoundApi = {
  on: boolean;
  toggle: () => void;
  blip: (freq?: number) => void;
  fanfare: () => void;
};

const SoundContext = createContext<SoundApi>({
  on: true,
  toggle: () => {},
  blip: () => {},
  fanfare: () => {},
});

export function SoundProvider({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(true);
  const onRef = useRef(true);
  const ctxRef = useRef<AudioContext | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const ctx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const el = new Audio(bgMusicUrl);
      el.loop = true;
      el.volume = 0.35;
      el.preload = 'auto';
      audioRef.current = el;
    }
    return audioRef.current;
  }, []);

  // Attempt to play on mount; if browser blocks autoplay until interaction, start on first click/key/touch while `on` is true
  useEffect(() => {
    const el = getAudio();

    const tryPlay = () => {
      if (!onRef.current) return;
      el.muted = false;
      void el.play().catch(() => {
        /* browser waiting for user gesture */
      });
    };

    tryPlay();

    const unlockOnGesture = () => {
      if (onRef.current && el.paused) {
        el.muted = false;
        void el.play().catch(() => {});
      }
    };

    window.addEventListener('pointerdown', unlockOnGesture, { passive: true });
    window.addEventListener('keydown', unlockOnGesture, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', unlockOnGesture);
      window.removeEventListener('keydown', unlockOnGesture);
      el.pause();
    };
  }, [getAudio]);

  const tone = useCallback(
    (freq: number, start: number, dur: number, vol = 0.06) => {
      const ac = ctx();
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = 'square';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol, ac.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + start + dur);
      osc.connect(gain).connect(ac.destination);
      osc.start(ac.currentTime + start);
      osc.stop(ac.currentTime + start + dur);
    },
    [ctx],
  );

  const blip = useCallback(
    (freq = 440) => {
      if (!on) return;
      try {
        tone(freq, 0, 0.07);
      } catch {
        /* audio unavailable */
      }
    },
    [on, tone],
  );

  const fanfare = useCallback(() => {
    if (!on) return;
    try {
      tone(523, 0, 0.09);
      tone(659, 0.1, 0.09);
      tone(784, 0.2, 0.14);
    } catch {
      /* audio unavailable */
    }
  }, [on, tone]);

  const toggle = useCallback(() => {
    setOn((prev) => {
      const next = !prev;
      onRef.current = next;
      const el = getAudio();
      if (next) {
        el.muted = false;
        void el.play().catch(() => {});
        try {
          const ac = ctx();
          if (ac.state === 'suspended') void ac.resume();
          tone(660, 0, 0.08, 0.04);
        } catch {
          /* audio unavailable */
        }
      } else {
        el.muted = true;
        el.pause();
      }
      return next;
    });
  }, [ctx, getAudio, tone]);

  return (
    <SoundContext.Provider value={{ on, toggle, blip, fanfare }}>
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => useContext(SoundContext);
