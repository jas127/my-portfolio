import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Compass,
  Database,
  ExternalLink,
  Github,
  Layers,
  MapPin,
  Server,
  ShieldCheck,
  Sliders,
  Sparkles,
  X,
} from 'lucide-react';
import { intelisContent, type ScoringStrategy } from '@/content/intelis';
import { Reveal, Sticker } from '@/components/ui';
import { CharacterSheet } from '@/components/CharacterSheet';
import { useSound } from '@/lib/sound';
import { readableText } from '@/lib/color';

/** Subtle hexagonal SVG grid texture evoking H3 spatial indexing. */
function HexGridBackdrop() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.09]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="intelis-hex" width="56" height="48.5" patternUnits="userSpaceOnUse">
          <path
            d="M14 0 L42 0 L56 24.25 L42 48.5 L14 48.5 L0 24.25 Z"
            fill="none"
            stroke="#FFF7E8"
            strokeWidth="1.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#intelis-hex)" />
    </svg>
  );
}

/** Interactive Deterministic Scoring Framework Explorer reused on both card and modal. */
function ScoringExplorer({ compact = false }: { compact?: boolean }) {
  const [strategyId, setStrategyId] = useState<ScoringStrategy['id']>('balanced');
  const { blip } = useSound();
  const active =
    intelisContent.scoring.strategies.find((s) => s.id === strategyId) ??
    intelisContent.scoring.strategies[1];

  return (
    <div className="border-[3px] border-ink-900 bg-warmcream-50 p-4 shadow-chunk-sm md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-dashed border-ink-300 pb-3">
        <div>
          <p className="flex items-center gap-1.5 font-pixel text-[9px] text-electricviolet">
            <Sliders size={13} /> DETERMINISTIC WEIGHTED SCORING FRAMEWORK
          </p>
          <p className="mt-1 font-sans text-xs text-ink-600">
            Configurable analytical index — <strong>not a machine-learning model</strong> and not a profitability predictor.
          </p>
        </div>
        <span className="border-2 border-ink-900 bg-acidlime px-2 py-0.5 font-pixel text-[8px] text-ink-900">
          3 STRATEGIES
        </span>
      </div>

      {/* Strategy Switcher Buttons */}
      <div className="mt-4 grid gap-2 sm:grid-cols-3" role="tablist" aria-label="Intelis scoring strategies">
        {intelisContent.scoring.strategies.map((s) => {
          const isSelected = s.id === strategyId;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => {
                setStrategyId(s.id);
                blip(540);
              }}
              className={`border-2 border-ink-900 px-3 py-2 text-left transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-tomato-500 ${
                isSelected
                  ? 'bg-nearblack text-warmcream-50 shadow-chunk-sm'
                  : 'bg-cream-100 text-ink-900 hover:bg-cream-200'
              }`}
            >
              <span className="block font-pixel text-[9px] tracking-wide">{s.name.toUpperCase()}</span>
              <span className={`mt-1 block font-sans text-[11px] leading-snug ${isSelected ? 'text-acidlime' : 'text-ink-600'}`}>
                {s.weights.whitespace}% / {s.weights.foodContext}% / {s.weights.reliability}%
              </span>
            </button>
          );
        })}
      </div>

      {/* Animated Stacked Bar */}
      <div className="mt-4">
        <div className="flex h-9 w-full overflow-hidden border-[3px] border-ink-900 font-pixel text-[9px]">
          <motion.div
            animate={{ width: `${active.weights.whitespace}%` }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="flex items-center justify-center bg-tomato-500 text-warmcream-50"
            title={`Competition Whitespace: ${active.weights.whitespace}%`}
          >
            {active.weights.whitespace}%
          </motion.div>
          <motion.div
            animate={{ width: `${active.weights.foodContext}%` }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="flex items-center justify-center border-x-2 border-ink-900 bg-electricviolet text-warmcream-50"
            title={`Food Business Context: ${active.weights.foodContext}%`}
          >
            {active.weights.foodContext}%
          </motion.div>
          <motion.div
            animate={{ width: `${active.weights.reliability}%` }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="flex items-center justify-center bg-acidlime text-ink-900"
            title={`Data Reliability: ${active.weights.reliability}%`}
          >
            {active.weights.reliability}%
          </motion.div>
        </div>

        {/* Dimension Legend & Formulas */}
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {intelisContent.scoring.dimensions.map((dim) => {
            const pct = active.weights[dim.key];
            return (
              <div key={dim.key} className="border-2 border-ink-900 bg-cream-100 p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 font-pixel text-[8px] text-ink-900">
                    <span
                      className="inline-block h-2.5 w-2.5 shrink-0 border border-ink-900"
                      style={{ backgroundColor: dim.color }}
                    />
                    {dim.name}
                  </span>
                  <span className="font-pixel text-[9px] font-bold text-ink-900">{pct}%</span>
                </div>
                {!compact && (
                  <p className="mt-1.5 font-sans text-[11px] leading-snug text-ink-600">{dim.formula}</p>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-3 border-l-4 border-electricviolet bg-cream-200 px-3 py-2 font-sans text-xs leading-relaxed text-ink-800">
          <strong>{active.name} Strategy:</strong> {active.useCase}
        </p>
      </div>

      {/* Key Ranking Stability & Tie-Aware Callouts */}
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="border-2 border-ink-900 bg-bubblegum/45 px-3 py-2">
          <p className="font-pixel text-[8px] text-ink-900">TIE-AWARE AVERAGE-RANK</p>
          <p className="mt-1 font-sans text-xs text-ink-800">
            All <strong>439 zero-café</strong> eligible cells share the exact <strong>72.45</strong> whitespace percentile.
          </p>
        </div>
        <div className="border-2 border-ink-900 bg-acidlime/70 px-3 py-2">
          <p className="font-pixel text-[8px] text-ink-900">WEIGHT SENSITIVITY CHECK</p>
          <p className="mt-1 font-sans text-xs text-ink-800">
            <strong>90%</strong> of top-10 candidate rankings stayed stable between default &amp; equal-weight runs.
          </p>
        </div>
      </div>
    </div>
  );
}

/** Dedicated Expanded Case Study Modal for Intelis. */
function IntelisModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-nearblack/85 p-0 md:items-center md:p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.article
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        exit={{ y: 40 }}
        aria-labelledby="intelis-modal-title"
        className="relative max-h-[94vh] w-full max-w-5xl overflow-y-auto border-[3px] border-ink-900 bg-warmcream-50 shadow-[10px_10px_0_0_#D8EF40]"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b-[3px] border-ink-900 bg-electricviolet px-5 py-4 text-warmcream-50 md:px-8">
          <div>
            <p className="font-pixel text-[9px] tracking-wider text-acidlime">
              {intelisContent.badge} // TECHNICAL CASE STUDY
            </p>
            <h2 id="intelis-modal-title" className="mt-1 font-display text-2xl font-black md:text-4xl">
              {intelisContent.name} — Hyderabad Location Intelligence
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Intelis case study"
            className="flex h-10 w-10 shrink-0 items-center justify-center border-[3px] border-ink-900 bg-warmcream-50 text-ink-900 shadow-chunk-sm transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-acidlime"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-9 p-5 md:p-9">
          {/* Action Links + Transparency Banner */}
          <div className="flex flex-col gap-4 border-[3px] border-ink-900 bg-cream-100 p-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="font-pixel text-[9px] text-electricviolet">{intelisContent.category}</p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-800">{intelisContent.summary}</p>
            </div>
            <div className="flex flex-wrap gap-2.5 shrink-0">
              <a
                href={intelisContent.links.liveApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-[3px] border-ink-900 bg-acidlime px-4 py-2.5 font-pixel text-[10px] text-ink-900 shadow-chunk-sm transition-transform hover:-translate-y-0.5"
              >
                VIEW LIVE APPLICATION <ExternalLink size={14} />
              </a>
              <a
                href={intelisContent.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-[3px] border-ink-900 bg-nearblack px-4 py-2.5 font-pixel text-[10px] text-warmcream-50 shadow-chunk-sm transition-transform hover:-translate-y-0.5"
              >
                <Github size={14} /> EXPLORE SOURCE CODE <ExternalLink size={13} />
              </a>
              <a
                href={intelisContent.links.api}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-ink-900 bg-warmcream-50 px-3 py-2 font-pixel text-[9px] text-ink-900 shadow-chunk-sm transition-transform hover:-translate-y-0.5"
              >
                <Server size={13} /> BACKEND API <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* 1. The Problem */}
          <section>
            <h3 className="font-pixel text-[10px] tracking-wider text-electricviolet">01 // THE BUSINESS PROBLEM</h3>
            <p className="mt-2 font-sans text-[15px] leading-relaxed text-ink-800">{intelisContent.problem.intro}</p>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {intelisContent.problem.factors.map((factor) => (
                <div key={factor} className="flex items-start gap-2 border-2 border-ink-900 bg-cream-100 p-3">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-tomato-500" />
                  <span className="font-sans text-sm font-medium text-ink-800">{factor}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 2. Dataset & Geographical Scope */}
          <section>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-pixel text-[10px] tracking-wider text-electricviolet">
                02 // DATASET &amp; GEOGRAPHICAL SCOPE
              </h3>
              <span className="border-2 border-ink-900 bg-bubblegum px-2.5 py-0.5 font-pixel text-[8px] text-ink-900">
                {intelisContent.dataset.source.toUpperCase()} · RELEASE {intelisContent.dataset.release}
              </span>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="border-[3px] border-ink-900 bg-cream-100 p-5 shadow-chunk-sm">
                <p className="flex items-center gap-2 font-pixel text-[9px] text-ink-900">
                  <Database size={14} className="text-tomato-500" /> RAW REGIONAL DATASET
                </p>
                <dl className="mt-4 space-y-2.5">
                  {intelisContent.dataset.raw.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-3 border-b border-dashed border-ink-300 pb-1.5"
                    >
                      <dt className="font-sans text-sm text-ink-700">{row.label}</dt>
                      <dd className="font-pixel text-xs font-bold text-ink-900">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="border-[3px] border-ink-900 bg-warmcream-50 p-5 shadow-chunk-sm">
                <p className="flex items-center gap-2 font-pixel text-[9px] text-electricviolet">
                  <Compass size={14} /> HISTORICAL GHMC STUDY BOUNDARY
                </p>
                <dl className="mt-4 space-y-2.5">
                  {intelisContent.dataset.ghmc.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-3 border-b border-dashed border-ink-300 pb-1.5"
                    >
                      <dt className="font-sans text-sm text-ink-700">{row.label}</dt>
                      <dd className="font-pixel text-xs font-bold text-electricviolet">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          {/* 3. Geospatial Analysis & Verified Grid Statistics */}
          <section>
            <h3 className="font-pixel text-[10px] tracking-wider text-electricviolet">
              03 // GEOSPATIAL ANALYSIS &amp; H3 RES-8 GRID STATISTICS
            </h3>
            <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
              <ul className="space-y-2.5">
                {intelisContent.geospatial.methods.map((method) => (
                  <li key={method} className="flex gap-2.5 font-sans text-sm leading-relaxed text-ink-700">
                    <span className="mt-1.5 h-2 w-2 shrink-0 bg-tomato-500" />
                    <span>{method}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2">
                {intelisContent.geospatial.gridStats.map((stat) => (
                  <div key={stat.label} className="border-2 border-ink-900 bg-cream-100 p-3">
                    <p className="font-pixel text-sm font-bold text-ink-900">{stat.value}</p>
                    <p className="mt-1 font-sans text-xs text-ink-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 border-[3px] border-ink-900 bg-bubblegum p-4">
              <p className="font-pixel text-[8px] text-ink-900">ANALYTICAL INTERPRETATION NOTE</p>
              <p className="mt-1.5 font-sans text-sm leading-relaxed text-ink-900">
                {intelisContent.geospatial.caveat}
              </p>
            </div>
          </section>

          {/* 4. Location Scoring Framework */}
          <section>
            <h3 className="mb-4 font-pixel text-[10px] tracking-wider text-electricviolet">
              04 // LOCATION SCORING FRAMEWORK (DETERMINISTIC — NOT ML)
            </h3>
            <ScoringExplorer />

            {/* Strategy Comparison Table */}
            <div className="mt-5 overflow-x-auto border-[3px] border-ink-900 bg-warmcream-50">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-[3px] border-ink-900 bg-nearblack text-warmcream-50 font-pixel text-[9px]">
                    <th className="px-4 py-3">STRATEGY</th>
                    <th className="px-4 py-3">COMPETITION WHITESPACE</th>
                    <th className="px-4 py-3">FOOD BUSINESS CONTEXT</th>
                    <th className="px-4 py-3">DATA RELIABILITY</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-ink-200 font-sans text-sm">
                  {intelisContent.scoring.strategies.map((s) => (
                    <tr key={s.id} className="hover:bg-cream-100">
                      <td className="px-4 py-3 font-bold text-ink-900">{s.name}</td>
                      <td className="px-4 py-3 font-pixel text-xs text-tomato-600">{s.weights.whitespace}%</td>
                      <td className="px-4 py-3 font-pixel text-xs text-electricviolet">{s.weights.foodContext}%</td>
                      <td className="px-4 py-3 font-pixel text-xs text-ink-900">{s.weights.reliability}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="mt-4 space-y-2">
              {intelisContent.scoring.findings.map((f) => (
                <li key={f} className="flex gap-2.5 font-sans text-sm text-ink-700">
                  <span className="mt-1.5 h-2 w-2 shrink-0 bg-electricviolet" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 5. Data Engineering & Quality Assurance */}
          <section>
            <h3 className="font-pixel text-[10px] tracking-wider text-electricviolet">
              05 // DATA ENGINEERING &amp; QUALITY ASSURANCE
            </h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-ink-700">
              {intelisContent.dataQuality.whyItMatters}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {intelisContent.dataQuality.pipeline.map((step) => (
                <span
                  key={step}
                  className="border-2 border-ink-900 bg-cream-200 px-3 py-1.5 font-sans text-xs font-semibold text-ink-900"
                >
                  {step}
                </span>
              ))}
            </div>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
              {intelisContent.dataQuality.metrics.map((m) => (
                <div
                  key={m.label}
                  className={`border-2 border-ink-900 p-3 ${
                    m.tone === 'good'
                      ? 'bg-acidlime/75'
                      : m.tone === 'warn'
                        ? 'bg-bubblegum/55'
                        : 'bg-cream-100'
                  }`}
                >
                  <p className="font-pixel text-base font-bold text-ink-900">{m.value}</p>
                  <p className="mt-1 font-sans text-xs leading-snug text-ink-800">{m.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Product Features */}
          <section>
            <h3 className="font-pixel text-[10px] tracking-wider text-electricviolet">
              06 // LIVE APPLICATION CAPABILITIES
            </h3>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {intelisContent.features.map((feat) => (
                <div key={feat} className="flex items-start gap-2.5 border-2 border-ink-900 bg-cream-100 p-3">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-electricviolet" />
                  <span className="font-sans text-sm text-ink-800">{feat}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 7. Testing, Validation & Transparency */}
          <section className="grid gap-4 md:grid-cols-2">
            <div className="border-[3px] border-ink-900 bg-acidlime p-5 shadow-chunk-sm">
              <p className="flex items-center gap-2 font-pixel text-[9px] text-ink-900">
                <ShieldCheck size={15} /> AUDITED TESTING &amp; VALIDATION
              </p>
              <div className="mt-3 flex items-baseline gap-4">
                <span className="font-display text-4xl font-black text-ink-900">
                  {intelisContent.testing.total}
                </span>
                <span className="font-pixel text-[9px] text-ink-800">
                  PASSING TESTS ({intelisContent.testing.apiTests} API · {intelisContent.testing.pipelineTests} PIPELINE)
                </span>
              </div>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-800">
                {intelisContent.testing.summary}
              </p>
            </div>

            <div className="border-[3px] border-ink-900 bg-nearblack p-5 text-warmcream-50 shadow-chunk-sm">
              <p className="flex items-center gap-2 font-pixel text-[9px] text-acidlime">
                <Sparkles size={15} /> TRANSPARENCY &amp; SCOPE
              </p>
              <p className="mt-3 font-sans text-sm leading-relaxed text-warmcream-50/90">
                {intelisContent.disclosure}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {intelisContent.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border border-warmcream-50/50 bg-warmcream-50/10 px-2 py-0.5 font-pixel text-[8px] text-warmcream-50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </motion.article>
    </motion.div>
  );
}

/**
 * Prominent Flagship Project Showcase rendered at the top of Main Quests.
 * Designed so a recruiter grasps Intelis in <10 seconds while technical readers
 * can inspect the scoring framework inline or open the full case study modal.
 */
export function IntelisFlagship() {
  const [modalOpen, setModalOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { blip } = useSound();

  return (
    <Reveal className="mb-14">
      <article className="relative overflow-hidden border-[3px] border-ink-900 bg-warmcream-50 shadow-[10px_10px_0_0_#7049C6]">
        {/* Top Flagship Banner with subtle H3 Hex Pattern */}
        <div className="relative overflow-hidden border-b-[3px] border-ink-900 bg-electricviolet px-5 py-6 text-warmcream-50 md:px-9 md:py-8">
          <HexGridBackdrop />
          <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 border-2 border-ink-900 bg-acidlime px-3 py-1 font-pixel text-[9px] tracking-wider text-ink-900 shadow-chunk-sm">
                  <Sparkles size={12} /> {intelisContent.badge}
                </span>
                <span className="border-2 border-warmcream-50/50 bg-nearblack/40 px-2.5 py-1 font-pixel text-[8px] tracking-wider text-warmcream-50">
                  HYDERABAD · GHMC 609.48 KM² · H3 RES-8
                </span>
              </div>

              <h3 className="mt-4 font-display text-4xl font-black tracking-tight text-warmcream-50 md:text-6xl">
                {intelisContent.name}
              </h3>

              <p className="mt-2 font-pixel text-[9px] tracking-wide text-acidlime md:text-[10px]">
                {intelisContent.category}
              </p>

              <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-warmcream-50/95 md:text-lg">
                {intelisContent.headline}
              </p>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={intelisContent.links.liveApp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => blip(660)}
                className="inline-flex items-center gap-2 border-[3px] border-ink-900 bg-acidlime px-5 py-3 font-pixel text-[10px] text-ink-900 shadow-chunk transition-transform hover:-translate-y-1 hover:shadow-chunk-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-warmcream-50"
              >
                VIEW LIVE APPLICATION <ExternalLink size={15} />
              </a>

              <a
                href={intelisContent.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => blip(560)}
                className="inline-flex items-center gap-2 border-[3px] border-ink-900 bg-nearblack px-5 py-3 font-pixel text-[10px] text-warmcream-50 shadow-chunk transition-transform hover:-translate-y-1 hover:shadow-chunk-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-acidlime"
              >
                <Github size={15} /> EXPLORE SOURCE CODE <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Main Flagship Body */}
        <div className="p-5 md:p-9">
          {/* 4 Large Verified Metric Callouts */}
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {intelisContent.heroStats.map((stat, i) => {
              const accents = ['#FF4C35', '#7049C6', '#D8EF40', '#F4A8D0'];
              const bg = accents[i % accents.length];
              return (
                <div
                  key={stat.label}
                  className="border-[3px] border-ink-900 bg-cream-100 p-4 shadow-chunk-sm"
                  style={{ borderTopWidth: '7px', borderTopColor: bg }}
                >
                  <p className="font-display text-3xl font-black text-ink-900 md:text-4xl">{stat.value}</p>
                  <p className="mt-1 font-pixel text-[8px] tracking-wide text-ink-900">
                    {stat.label.toUpperCase()}
                  </p>
                  <p className="mt-1 font-sans text-xs text-ink-600">{stat.sub}</p>
                </div>
              );
            })}
          </div>

          {/* Two-Column Overview + Interactive Scoring Explorer */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            {/* Left: Positioning, Problem & Stack */}
            <div className="flex flex-col justify-between space-y-5">
              <div>
                <p className="font-pixel text-[9px] tracking-wider text-electricviolet">
                  WHAT IT IS — AND WHAT IT IS NOT
                </p>
                <p className="mt-2.5 font-sans text-[15px] leading-relaxed text-ink-800">
                  {intelisContent.summary}
                </p>

                <div className="mt-4 border-l-4 border-tomato-500 bg-cream-100 px-4 py-3">
                  <p className="font-pixel text-[8px] text-tomato-600">LOCATION SCREENING SCOPE</p>
                  <p className="mt-1 font-sans text-xs leading-relaxed text-ink-700">
                    Built on <strong>Overture Maps Places ({intelisContent.dataset.release})</strong> using Shapely{' '}
                    <code className="bg-cream-200 px-1 font-mono text-[11px]">covers</code>, H3 resolution-8 hexagons,
                    projected <code className="bg-cream-200 px-1 font-mono text-[11px]">EPSG:32644</code> nearest-café
                    distances (<strong>151.4 m</strong> median), MapLibre, and ECharts.
                  </p>
                </div>

                {/* Stack Stickers */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {intelisContent.stack.map((tech, idx) => {
                    const colors = ['#7049C6', '#FF4C35', '#D8EF40', '#F4A8D0'];
                    const c = colors[idx % colors.length];
                    return (
                      <Sticker key={tech} color={c} rotate={idx % 2 === 0 ? -1.5 : 1.5}>
                        <span style={{ color: readableText(c) }}>{tech}</span>
                      </Sticker>
                    );
                  })}
                </div>
              </div>

              {/* Action Row: Open Full Case Study + Quick Technical Toggle */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(true);
                    blip(680);
                  }}
                  className="inline-flex items-center gap-2 border-[3px] border-ink-900 bg-tomato-500 px-5 py-3 font-pixel text-[10px] text-warmcream-50 shadow-chunk transition-transform hover:-translate-y-1 hover:shadow-chunk-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-electricviolet"
                >
                  READ FULL CASE STUDY <ArrowUpRight size={16} />
                </button>

                <button
                  type="button"
                  aria-expanded={detailsOpen}
                  onClick={() => {
                    setDetailsOpen((v) => !v);
                    blip(520);
                  }}
                  className="inline-flex items-center gap-1.5 border-[3px] border-ink-900 bg-warmcream-50 px-4 py-3 font-pixel text-[9px] text-ink-900 shadow-chunk-sm transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-electricviolet"
                >
                  {detailsOpen ? (
                    <>
                      HIDE DATA &amp; QA AUDIT <ChevronUp size={15} />
                    </>
                  ) : (
                    <>
                      QUICK DATA &amp; QA AUDIT <ChevronDown size={15} />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right: Interactive Deterministic Scoring Explorer */}
            <div>
              <ScoringExplorer compact />
            </div>
          </div>

          {/* Collapsible Quick Technical & Data Quality Audit Drawer */}
          <AnimatePresence>
            {detailsOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-8 grid gap-5 border-t-[3px] border-dashed border-ink-300 pt-7 md:grid-cols-3">
                  {/* Geospatial Snapshot */}
                  <div className="border-2 border-ink-900 bg-cream-100 p-4">
                    <p className="flex items-center gap-1.5 font-pixel text-[9px] text-electricviolet">
                      <Layers size={13} /> H3 RES-8 SPATIAL SNAPSHOT
                    </p>
                    <ul className="mt-3 space-y-1.5 font-sans text-xs text-ink-700">
                      <li>• <strong>975</strong> total H3 cells · <strong>878</strong> reliable-area · <strong>796</strong> score-eligible</li>
                      <li>• <strong>439</strong> eligible cells with 0 cafés · <strong>359</strong> with ≥1 café</li>
                      <li>• <strong>685</strong> eligible cells with ≥1 food business · <strong>103</strong> postcodes</li>
                      <li>• Max café density: <strong>25.23/km²</strong> · Max food density: <strong>294.90/km²</strong></li>
                    </ul>
                  </div>

                  {/* Data Quality Snapshot */}
                  <div className="border-2 border-ink-900 bg-cream-100 p-4">
                    <p className="flex items-center gap-1.5 font-pixel text-[9px] text-tomato-600">
                      <ShieldCheck size={13} /> DATA ENGINEERING &amp; QA
                    </p>
                    <ul className="mt-3 space-y-1.5 font-sans text-xs text-ink-700">
                      <li>• <strong>25,000</strong>-record GeoJSON chunks stored in <strong>Parquet</strong></li>
                      <li>• <strong>0</strong> invalid coordinates · <strong>0</strong> duplicate Overture IDs</li>
                      <li>• <strong>55</strong> taxonomy disagreements · <strong>155</strong> suspected duplicate groups</li>
                      <li>• Missing fields surfaced: <strong>5,482</strong> taxonomy · <strong>11,071</strong> address · <strong>11,758</strong> postcode</li>
                    </ul>
                  </div>

                  {/* Live Product Features Snapshot */}
                  <div className="border-2 border-ink-900 bg-cream-100 p-4">
                    <p className="flex items-center gap-1.5 font-pixel text-[9px] text-ink-900">
                      <Compass size={13} className="text-electricviolet" /> PRODUCT CAPABILITIES
                    </p>
                    <ul className="mt-3 space-y-1.5 font-sans text-xs text-ink-700">
                      <li>• MapLibre interactive map + ECharts density visualisations</li>
                      <li>• Top-10 discovery, weight sliders &amp; 3-cell side-by-side compare</li>
                      <li>• Postcode disambiguation + localStorage due-diligence checklist</li>
                      <li>• <strong>18</strong> audited passing tests (<strong>14</strong> API + <strong>4</strong> geospatial pipeline)</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Transparency Bar + Pixel Guide */}
          <div className="mt-7 flex flex-col items-start justify-between gap-4 border-t-2 border-dashed border-ink-300 pt-5 sm:flex-row sm:items-center">
            <p className="max-w-3xl font-sans text-xs leading-relaxed text-ink-600">
              <strong className="font-pixel text-[9px] text-ink-900">TRANSPARENCY:</strong> {intelisContent.disclosure}
            </p>
            <div className="hidden items-center gap-2 shrink-0 md:flex">
              <CharacterSheet variant="interact" scale={0.4} />
              <span className="border-2 border-ink-900 bg-acidlime px-2.5 py-1 font-hand text-lg text-ink-900 shadow-chunk-sm">
                609.48 km² mapped!
              </span>
            </div>
          </div>
        </div>
      </article>

      <AnimatePresence>
        {modalOpen && <IntelisModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </Reveal>
  );
}
