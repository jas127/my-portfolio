import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';

type SoundApi = {
  on: boolean;
  toggle: () => void;
  blip: (freq?: number) => void;
  fanfare: () => void;
};

const SoundContext = createContext<SoundApi>({
  on: false,
  toggle: () => {},
  blip: () => {},
  fanfare: () => {},
});

export function SoundProvider({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  const ctx = () => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  };

  const tone = (freq: number, start: number, dur: number, vol = 0.06) => {
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
  };

  const blip = useCallback(
    (freq = 440) => {
      if (!on) return;
      try {
        tone(freq, 0, 0.07);
      } catch {
        /* audio unavailable */
      }
    },
    [on],
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
  }, [on]);

  const toggle = useCallback(() => {
    setOn((prev) => {
      const next = !prev;
      if (next) {
        try {
          const ac = ctx();
          if (ac.state === 'suspended') void ac.resume();
          const osc = ac.createOscillator();
          const gain = ac.createGain();
          osc.type = 'square';
          osc.frequency.value = 660;
          gain.gain.setValueAtTime(0.05, ac.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.09);
          osc.connect(gain).connect(ac.destination);
          osc.start();
          osc.stop(ac.currentTime + 0.09);
        } catch {
          /* audio unavailable */
        }
      }
      return next;
    });
  }, []);

  return (
    <SoundContext.Provider value={{ on, toggle, blip, fanfare }}>
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => useContext(SoundContext);
