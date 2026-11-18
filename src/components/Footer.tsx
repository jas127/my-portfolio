import { Coin } from '@/pixel';
import { useSound } from '@/lib/sound';

export default function Footer() {
  const { blip } = useSound();
  return (
    <footer className="border-t-[3px] border-ink-700 bg-ink-900 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center md:px-8">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            blip(700);
          }}
          className="flex items-center gap-3 transition-transform hover:-translate-y-1"
          aria-label="Back to top"
        >
          <Coin scale={3} />
          <span className="font-pixel text-[10px] tracking-widest text-cream-100">
            INSERT COIN TO RETURN TO TOP
          </span>
          <Coin scale={3} />
        </button>
        <p className="font-hand text-xl text-cream-300/80">
          handcrafted with curiosity — Jasmitha Kancharlapalli
        </p>
        <p className="font-pixel text-[8px] tracking-wider text-cream-300/50">
          CURIOSITY ARCADE — ALL PIXELS ORIGINAL
        </p>
      </div>
    </footer>
  );
}
