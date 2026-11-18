import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { useSound } from '@/lib/sound';

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Main Quests', href: '#main-quests' },
  { label: 'Side Quests', href: '#side-quests' },
  { label: 'Field Notes', href: '#field-notes' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { on, toggle, blip } = useSound();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream-100/95 border-b-[3px] border-ink-700' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* mark */}
          <a
            href="#home"
            onClick={() => blip(620)}
            className="flex h-10 w-10 items-center justify-center border-[3px] border-ink-700 bg-grass-500 shadow-chunk-sm font-display font-black text-xl text-cream-50 transition-transform hover:-translate-y-0.5 hover:rotate-3"
          >
            J.
          </a>

          {/* desktop links */}
          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => blip(480)}
                className="group relative px-3 py-2 font-sans text-sm font-semibold text-ink-600 transition-colors hover:text-ink-900"
              >
                {l.label}
                <span className="absolute inset-x-3 bottom-1 h-[3px] origin-left scale-x-0 bg-tomato-500 transition-transform duration-200 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            {/* status chip */}
            <span className="relative hidden items-center gap-2 border-[3px] border-ink-700 bg-butter-400 px-3 py-1.5 shadow-chunk-sm sm:inline-flex">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping bg-tomato-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 bg-tomato-500" />
              </span>
              <span className="font-pixel text-[9px] text-ink-900">OPEN TO OPPORTUNITIES</span>
            </span>

            {/* sound toggle */}
            <button
              onClick={toggle}
              aria-label={on ? 'Turn sound off' : 'Turn sound on'}
              className={`flex h-10 w-10 items-center justify-center border-[3px] border-ink-700 shadow-chunk-sm transition-all hover:-translate-y-0.5 ${
                on ? 'bg-grass-400' : 'bg-cream-200'
              }`}
            >
              {on ? (
                <Volume2 size={17} className="text-ink-900" strokeWidth={2.5} />
              ) : (
                <VolumeX size={17} className="text-ink-500" strokeWidth={2.5} />
              )}
            </button>

            {/* mobile menu button */}
            <button
              onClick={() => {
                setOpen((o) => !o);
                blip(540);
              }}
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center border-[3px] border-ink-700 bg-cobalt-500 shadow-chunk-sm md:hidden"
            >
              {open ? (
                <X size={18} className="text-cream-50" strokeWidth={2.5} />
              ) : (
                <Menu size={18} className="text-cream-50" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-b-[3px] border-ink-700 bg-cream-100 md:hidden"
          >
            <div className="space-y-1 px-4 pb-5 pt-2">
              <span className="mb-3 inline-flex items-center gap-2 border-2 border-ink-700 bg-butter-400 px-2 py-1">
                <span className="h-2 w-2 animate-pulse bg-tomato-500" />
                <span className="font-pixel text-[8px] text-ink-900">OPEN TO OPPORTUNITIES</span>
              </span>
              {LINKS.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-2 border-ink-700 bg-cream-50 px-4 py-3 font-sans font-semibold text-ink-700 shadow-chunk-sm"
                  style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
