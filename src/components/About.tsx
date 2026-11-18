import { ExternalLink, Github, Linkedin, Mail, FileText, Send, Sparkles } from 'lucide-react';
import { siteContent } from '@/content/site';
import { SectionHeading, Reveal, Sticker, PixelObject } from '@/components/ui';
import { CharacterSheet } from '@/components/CharacterSheet';
import { HEART, BULB, STAR } from '@/pixel/sprites';
import { PixelSprite } from '@/pixel';

export function About() {
  return (
    <section id="about" className="relative border-y-[3px] border-ink-900 bg-electricviolet py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading index="07" title="The Person Behind the Pixels" note="nice to meet you" color="#D8EF40" onDark />
        <div className="grid items-start gap-10 md:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="relative mx-auto max-w-sm rotate-[-2deg] border-[3px] border-ink-900 bg-warmcream-50 p-6 shadow-chunk-lg">
              <div className="tape" />
              <div className="flex justify-center py-2">
                <CharacterSheet variant="idle" scale={1.35} />
              </div>
              <p className="text-center font-hand text-2xl text-ink-600">Jasmitha K. — explorer class</p>
              <div className="mt-5 flex justify-center gap-4">
                <PixelObject note="curiosity engine">
                  <PixelSprite sprite={HEART} scale={3} />
                </PixelObject>
                <PixelObject note="always asking why">
                  <PixelSprite sprite={BULB} scale={3} />
                </PixelObject>
                <PixelObject note="shiny analytical finds">
                  <PixelSprite sprite={STAR} scale={3} />
                </PixelObject>
              </div>
            </div>
          </Reveal>

          <div className="space-y-4">
            {siteContent.about.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * 0.06}>
                <p className="border-l-4 border-acidlime pl-4 font-sans text-base leading-relaxed text-warmcream-50 md:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <div className="mt-8 border-[3px] border-ink-900 bg-warmcream-50 p-6 shadow-chunk">
                <p className="font-pixel text-[9px] text-electricviolet">CORE PHILOSOPHY</p>
                <blockquote className="mt-2 font-display text-xl font-bold italic text-ink-900 md:text-2xl">
                  &ldquo;An ongoing work in curiosity.&rdquo;
                </blockquote>
                <p className="mt-2 font-hand text-xl text-ink-500">
                  Always exploring, building, and learning along the way.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function OpenDoor() {
  const { owner, opportunityTypes } = siteContent;

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
      <SectionHeading index="08" title="Open Door" note="seriously, it's open" color="#FF4C35" />
      <div className="grid items-start gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div>
            <p className="font-display text-3xl font-black leading-snug text-ink-900 md:text-5xl">
              Something interesting in mind?
            </p>
            <p className="mt-5 max-w-lg font-sans text-base leading-relaxed text-ink-600 md:text-lg">
              {owner.opportunityLine}
            </p>

            <div className="mt-6">
              <p className="font-pixel text-[10px] tracking-wide text-electricviolet mb-3">ROLES & AREAS I&apos;M EXCITED ABOUT:</p>
              <div className="flex flex-wrap gap-2">
                {opportunityTypes.map((type, index) => (
                  <Sticker
                    key={type}
                    color={index % 2 === 0 ? '#7049C6' : '#FF4C35'}
                    rotate={index % 2 === 0 ? -1.5 : 1.5}
                  >
                    {type}
                  </Sticker>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-end gap-3">
              <CharacterSheet variant="greet" scale={0.62} />
              <span className="border-2 border-ink-900 bg-acidlime px-3 py-2 font-hand text-xl text-ink-900 shadow-chunk-sm">
                Got something interesting? Let&apos;s talk!
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border-[3px] border-ink-900 bg-warmcream-50 p-6 shadow-chunk-lg md:p-8">
            <div className="mb-6 flex items-center justify-between gap-4 border-b-2 border-dashed border-ink-300 pb-4">
              <div>
                <p className="font-pixel text-[9px] text-electricviolet">DIRECT TRANSMISSION</p>
                <h3 className="mt-1 font-display text-2xl font-black text-ink-900">Let&apos;s Connect</h3>
              </div>
              <Sparkles className="text-tomato-500" size={28} />
            </div>

            <p className="font-sans text-sm leading-relaxed text-ink-600">
              Whether you have an internship opening, research collaboration, hackathon idea, or just want to chat about data and product strategy, my inbox is always open.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`mailto:${owner.email}`}
                className="group flex items-center justify-between border-[3px] border-ink-900 bg-tomato-500 px-5 py-3.5 text-warmcream-50 shadow-chunk transition-transform hover:-translate-y-1 hover:shadow-chunk-lg"
              >
                <span className="flex items-center gap-2.5 font-pixel text-[11px]">
                  <Mail size={16} /> EMAIL ME DIRECTLY
                </span>
                <Send size={16} className="transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={owner.resume}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border-[3px] border-ink-900 bg-acidlime px-5 py-3.5 text-ink-900 shadow-chunk transition-transform hover:-translate-y-1 hover:shadow-chunk-lg"
              >
                <span className="flex items-center gap-2.5 font-pixel text-[11px]">
                  <FileText size={16} /> VIEW RESUME (GOOGLE DRIVE)
                </span>
                <ExternalLink size={16} className="transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={owner.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border-[3px] border-ink-900 bg-electricviolet px-5 py-3.5 text-warmcream-50 shadow-chunk transition-transform hover:-translate-y-1 hover:shadow-chunk-lg"
              >
                <span className="flex items-center gap-2.5 font-pixel text-[11px]">
                  <Linkedin size={16} /> CONNECT ON LINKEDIN
                </span>
                <ExternalLink size={16} className="transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={owner.github}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border-[3px] border-ink-900 bg-nearblack px-5 py-3.5 text-warmcream-50 shadow-chunk transition-transform hover:-translate-y-1 hover:shadow-chunk-lg"
              >
                <span className="flex items-center gap-2.5 font-pixel text-[11px]">
                  <Github size={16} /> BROWSE GITHUB (@jas127)
                </span>
                <ExternalLink size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <p className="mt-5 text-center font-hand text-lg text-ink-500">
              Email: {owner.email}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
