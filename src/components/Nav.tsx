import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { useSound } from '@/lib/sound';

const LINKS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'Quests', href: '#main-quests', id: 'main-quests' },
  { label: 'Side Quests', href: '#side-quests', id: 'side-quests' },
  { label: 'Toolbox', href: '#toolbox', id: 'toolbox' },
  { label: 'Field Notes', href: '#field-notes', id: 'field-notes' },
  { label: 'Curious', href: '#curious', id: 'curious' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [soundHover, setSoundHover] = useState(false);
  const [justUnmuted, setJustUnmuted] = useState(false);
  const { on, toggle, blip } = useSound();

  const handleSoundToggle = () => {
    const willUnmute = !on;
    toggle();
    if (willUnmute) {
      setJustUnmuted(true);
      window.setTimeout(() => setJustUnmuted(false), 2600);
    } else {
      setJustUnmuted(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 24);

      // Scroll progress
      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalDocHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / totalDocHeight) * 100)));
      }

      // Active section detection
      const scrollCenter = scrollY + 120;
      for (let i = LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(LINKS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollCenter >= top) {
            setActiveSection(LINKS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-warmcream-50/95 backdrop-blur-sm border-b-[3px] border-ink-900 shadow-chunk-sm' : 'bg-transparent'
      }`}
    >
      {/* Scroll progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-ink-200">
        <div
          className="h-full bg-tomato-500 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand mark */}
          <a
            href="#home"
            onClick={() => blip(620)}
            className="flex h-10 w-10 items-center justify-center border-[3px] border-ink-900 bg-grass-500 shadow-chunk-sm font-display font-black text-xl text-warmcream-50 transition-transform hover:-translate-y-0.5 hover:rotate-3 focus:outline-none focus-visible:ring-4 focus-visible:ring-tomato-500"
          >
            J.
          </a>

          {/* Desktop links */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main Navigation">
            {LINKS.map((l) => {
              const isActive = activeSection === l.id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => blip(480)}
                  className={`group relative px-2.5 py-1.5 font-sans text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-tomato-500 ${
                    isActive ? 'text-ink-900' : 'text-ink-600 hover:text-ink-900'
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-x-2 -bottom-1 h-[3px] bg-tomato-500"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            {/* Status chip */}
            <a
              href="#contact"
              onClick={() => blip(560)}
              className="relative hidden items-center gap-2 border-[3px] border-ink-900 bg-acidlime px-3 py-1.5 shadow-chunk-sm sm:inline-flex transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-tomato-500"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping bg-tomato-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 bg-tomato-500" />
              </span>
              <span className="font-pixel text-[8px] tracking-wider text-ink-900">OPEN TO OPPORTUNITIES</span>
            </a>

            {/* Sound & background music toggle with gamified arcade tooltip */}
            <div
              className="relative"
              onMouseEnter={() => setSoundHover(true)}
              onMouseLeave={() => {
                setSoundHover(false);
                setJustUnmuted(false);
              }}
            >
              <button
                onClick={handleSoundToggle}
                aria-label={on ? "Don't mute, it's a great song" : 'Good job! enjoy the song'}
                className={`flex h-10 w-10 items-center justify-center border-[3px] border-ink-900 shadow-chunk-sm transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-tomato-500 ${
                  on ? 'bg-acidlime' : 'bg-warmcream-50'
                }`}
              >
                {on ? (
                  <Volume2 size={18} className="text-ink-900" strokeWidth={2.5} />
                ) : (
                  <VolumeX size={18} className="text-ink-500" strokeWidth={2.5} />
                )}
              </button>

              <AnimatePresence>
                {(soundHover || justUnmuted) && (
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className={`pointer-events-none absolute right-0 top-12 z-50 whitespace-nowrap border-[3px] border-ink-900 px-3 py-1.5 font-pixel text-[8px] tracking-wider text-ink-900 shadow-chunk-sm ${
                      justUnmuted || !on ? 'bg-acidlime' : 'bg-bubblegum'
                    }`}
                  >
                    {justUnmuted || !on
                      ? 'Good job! enjoy the song'
                      : "Don't mute, it's a great song"}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => {
                setOpen((o) => !o);
                blip(540);
              }}
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center border-[3px] border-ink-900 bg-electricviolet shadow-chunk-sm lg:hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-tomato-500"
            >
              {open ? (
                <X size={20} className="text-warmcream-50" strokeWidth={2.5} />
              ) : (
                <Menu size={20} className="text-warmcream-50" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-b-[3px] border-ink-900 bg-warmcream-50 lg:hidden shadow-chunk"
            aria-label="Mobile Navigation"
          >
            <div className="space-y-1.5 px-4 pb-6 pt-3">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mb-3 flex items-center justify-between border-2 border-ink-900 bg-acidlime px-3 py-2 font-pixel text-[9px] text-ink-900 shadow-chunk-sm"
              >
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse bg-tomato-500" />
                  OPEN TO OPPORTUNITIES
                </span>
                <span>→</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                {LINKS.map((l) => {
                  const isActive = activeSection === l.id;
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => {
                        setOpen(false);
                        blip(480);
                      }}
                      className={`block border-2 border-ink-900 px-3 py-2.5 font-sans text-sm font-bold shadow-chunk-sm transition-transform active:scale-95 ${
                        isActive ? 'bg-electricviolet text-warmcream-50' : 'bg-warmcream-50 text-ink-800'
                      }`}
                    >
                      {l.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
