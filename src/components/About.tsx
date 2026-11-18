import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, Download, ExternalLink, Github, Linkedin, Loader2, Mail, Send } from 'lucide-react';
import { siteContent } from '@/content/site';
import { SectionHeading, Reveal, Sticker, PixelObject } from '@/components/ui';
import { CharacterSheet } from '@/components/CharacterSheet';
import { HEART, BULB, STAR } from '@/pixel/sprites';
import { PixelSprite } from '@/pixel';
import { useSound } from '@/lib/sound';

export function About() {
  return <section id="about" className="relative border-y-[3px] border-ink-900 bg-electricviolet py-20 md:py-28"><div className="mx-auto max-w-6xl px-4 md:px-8"><SectionHeading index="06" title="The Person Behind the Pixels" note="nice to meet you" color="#D8EF40" onDark /><div className="grid items-start gap-10 md:grid-cols-[0.85fr_1.15fr]"><Reveal><div className="relative mx-auto max-w-sm rotate-[-2deg] border-[3px] border-ink-900 bg-warmcream-50 p-6 shadow-chunk-lg"><div className="tape" /><div className="flex justify-center py-2"><CharacterSheet variant="idle" scale={1.35} /></div><p className="text-center font-hand text-2xl text-ink-600">Jasmitha K. — explorer class</p><div className="mt-5 flex justify-center gap-4"><PixelObject note="curiosity engine"><PixelSprite sprite={HEART} scale={3} /></PixelObject><PixelObject note="always on"><PixelSprite sprite={BULB} scale={3} /></PixelObject><PixelObject note="shiny finds"><PixelSprite sprite={STAR} scale={3} /></PixelObject></div></div></Reveal><div className="space-y-4">{siteContent.about.map((paragraph, index) => <Reveal key={paragraph} delay={index * 0.06}><p className="border-l-4 border-acidlime pl-4 font-sans text-base leading-relaxed text-warmcream-50 md:text-lg">{paragraph}</p></Reveal>)}<Reveal delay={0.25}><div className="mt-7 grid gap-4 sm:grid-cols-2">{siteContent.education.map((item) => <div key={item.school} className="border-[3px] border-ink-900 bg-warmcream-50 p-5 shadow-chunk"><p className="font-pixel text-[9px]" style={{ color: item.color }}>EDUCATION</p><h3 className="mt-2 font-display text-xl font-black text-ink-900">{item.school}</h3><p className="mt-2 font-sans text-sm font-semibold leading-relaxed text-ink-700">{item.qualification}</p><p className="mt-2 font-hand text-xl text-ink-500">{item.detail}</p></div>)}</div></Reveal></div></div></div></section>;
}

type FormState = 'idle' | 'sending' | 'done' | 'error';

export function OpenDoor() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState<FormState>('idle');
  const { fanfare } = useSound();
  const { owner, opportunityTypes } = siteContent;
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    try {
      const { supabase } = await import('@/lib/supabase');
      const { error } = await supabase.from('contact_messages').insert({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() });
      if (error) throw error;
      setState('done');
      setForm({ name: '', email: '', message: '' });
      fanfare();
    } catch {
      setState('error');
    }
  };
  const inputCls = 'w-full border-[3px] border-ink-900 bg-warmcream-50 px-4 py-3 font-sans text-[15px] text-ink-900 placeholder:text-ink-400 shadow-chunk-sm focus:outline-none focus:-translate-y-0.5 focus:shadow-chunk transition-all';
  return <section id="contact" className="relative mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28"><SectionHeading index="07" title="Open Door" note="seriously, it's open" color="#FF4C35" /><div className="grid items-start gap-10 md:grid-cols-[0.9fr_1.1fr]"><Reveal><div><p className="font-display text-3xl font-black leading-snug text-ink-900 md:text-5xl">Something interesting in mind?</p><p className="mt-5 max-w-md font-sans text-base leading-relaxed text-ink-500 md:text-lg">I'm actively open to opportunities where I can learn, contribute and work on meaningful problems.</p><div className="mt-7 flex flex-wrap gap-2">{opportunityTypes.map((type, index) => <Sticker key={type} color={index % 2 === 0 ? '#7049C6' : '#FF4C35'} rotate={index % 2 === 0 ? -2 : 2}>{type}</Sticker>)}</div><div className="mt-8 flex items-end gap-3"><CharacterSheet variant="greet" scale={0.62} /><span className="border-2 border-ink-900 bg-acidlime px-3 py-2 font-hand text-xl text-ink-900 shadow-chunk-sm">Got something interesting? Let's talk!</span></div><div className="mt-7 flex flex-wrap gap-2">{[
  { label: 'LinkedIn', href: owner.linkedin, Icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/jas127', Icon: Github },
  { label: 'Email', href: owner.email ? `mailto:${owner.email}` : '', Icon: Mail },
  { label: 'Download Resume', href: owner.resume, Icon: Download },
].map(({ label, href, Icon }) => href ? <a key={label} href={href} target={label === 'Email' ? undefined : '_blank'} rel="noreferrer" className="inline-flex items-center gap-2 border-2 border-ink-900 bg-warmcream-50 px-3 py-2 font-pixel text-[9px] text-ink-900 shadow-chunk-sm hover:-translate-y-1"><Icon size={14} />{label}<ExternalLink size={12} /></a> : <span key={label} className="inline-flex items-center gap-2 border-2 border-dashed border-ink-400 bg-cream-200 px-3 py-2 font-pixel text-[9px] text-ink-400"><Icon size={14} />{label} — link not added yet</span>)}</div></div></Reveal><Reveal delay={0.1}><div className="border-[3px] border-ink-900 bg-electricviolet p-5 shadow-chunk-lg md:p-8"><div className="mb-6 flex items-center justify-between gap-4"><div><p className="font-pixel text-[9px] text-acidlime">TRANSMISSION TERMINAL</p><h3 className="mt-2 font-display text-2xl font-black text-warmcream-50">Send a message</h3></div><Mail className="text-acidlime" size={28} /></div><AnimatePresence mode="wait">{state === 'done' ? <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center bg-warmcream-50 px-5 py-12 text-center"><CheckCircle2 size={48} className="text-electricviolet" /><h3 className="mt-4 font-display text-2xl font-bold text-ink-900">Message received!</h3><p className="mt-2 font-hand text-2xl text-ink-500">new quest unlocked: reply to you</p><button type="button" onClick={() => setState('idle')} className="mt-6 border-[3px] border-ink-900 bg-acidlime px-5 py-2.5 font-pixel text-[10px] text-ink-900 shadow-chunk-sm hover:-translate-y-0.5">SEND ANOTHER</button></motion.div> : <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4"><div className="grid gap-4 sm:grid-cols-2"><label className="sr-only" htmlFor="name">Your name</label><input id="name" required placeholder="Your name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className={inputCls} /><label className="sr-only" htmlFor="email">Your email</label><input id="email" required type="email" placeholder="Your email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className={inputCls} /></div><label className="sr-only" htmlFor="message">Your message</label><textarea id="message" required rows={6} placeholder="What's on your mind?" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className={`${inputCls} resize-none`} />{state === 'error' && <p className="flex items-center gap-2 border-2 border-tomato-500 bg-tomato-400/10 px-3 py-2 font-sans text-sm text-tomato-600"><AlertCircle size={16} /> Something went wrong — please try again.</p>}<button type="submit" disabled={state === 'sending'} className="inline-flex w-full items-center justify-center gap-2 border-[3px] border-ink-900 bg-acidlime px-6 py-3.5 font-pixel text-[11px] text-ink-900 shadow-chunk transition-all hover:-translate-y-1 hover:shadow-chunk-lg disabled:opacity-60">{state === 'sending' ? <><Loader2 size={16} className="animate-spin" /> SENDING...</> : <><Send size={16} /> SEND MESSAGE</>}</button></motion.form>}</AnimatePresence></div></Reveal></div></section>;
}
