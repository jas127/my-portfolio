import { Coin } from '@/pixel';
import { siteContent } from '@/content/site';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { useSound } from '@/lib/sound';

export default function Footer() {
  const { blip } = useSound();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    blip(750);
  };

  return (
    <footer className="border-t-[3px] border-ink-900 bg-nearblack py-16 text-warmcream-50">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center border-2 border-warmcream-50 bg-tomato-500 font-display text-xl font-black text-warmcream-50 shadow-chunk-sm">
                J.
              </span>
              <div>
                <h3 className="font-display text-2xl font-black">{siteContent.owner.fullName}</h3>
                <p className="font-hand text-xl text-acidlime">&ldquo;An ongoing work in curiosity.&rdquo;</p>
              </div>
            </div>

            <p className="mt-4 max-w-md font-sans text-sm text-ink-300">
              Personal portfolio built with retro pixel art, responsive editorial design, and verifiable analytical case studies.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 sm:items-end">
            <div className="flex items-center gap-3">
              <a
                href={siteContent.owner.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="flex h-10 w-10 items-center justify-center border-2 border-warmcream-50 bg-ink-800 text-warmcream-50 shadow-chunk-sm transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-acidlime"
              >
                <Github size={18} />
              </a>
              <a
                href={siteContent.owner.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="flex h-10 w-10 items-center justify-center border-2 border-warmcream-50 bg-electricviolet text-warmcream-50 shadow-chunk-sm transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-acidlime"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${siteContent.owner.email}`}
                aria-label="Send email"
                className="flex h-10 w-10 items-center justify-center border-2 border-warmcream-50 bg-tomato-500 text-warmcream-50 shadow-chunk-sm transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-acidlime"
              >
                <Mail size={18} />
              </a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 border-2 border-warmcream-50 bg-acidlime px-4 py-2 font-pixel text-[10px] text-ink-900 shadow-chunk-sm transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-acidlime"
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-800 pt-8 sm:flex-row">
          <div className="flex items-center gap-2 font-pixel text-[10px] text-ink-400">
            <span>GAME OVER? NO, JUST LEVELING UP.</span>
            <Coin scale={2} />
          </div>

          <p className="font-sans text-xs text-ink-300">
            if u are too lazy to shazam the song, it&apos;s &ldquo;subterranean homesick alien - radiohead&rdquo;. ur welcome !
          </p>
        </div>
      </div>
    </footer>
  );
}
