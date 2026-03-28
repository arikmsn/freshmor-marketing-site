"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, Lightbulb } from "lucide-react";

/* ─── step data ────────────────────────────────────────────────────────────── */
interface Step {
  id: number;
  label: string;
  sublabel: string;
  image: string;
  imageAlt: string;
  spotlightX: string;
  spotlightY: string;
  ringPx: number;
  overlayOpacity: number;
  callout: string;
}

const STEPS: Step[] = [
  {
    id: 1,
    label: "מחסן",
    sublabel: "הציוד ממתין לפריסה",
    image: "/stuff/Main.png",
    imageAlt: "מסך הבית של פרשמור, מלאי ונכסים",
    spotlightX: "50%",
    spotlightY: "28%",
    ringPx: 160,
    overlayOpacity: 0.48,
    callout: "כל הנכסים ממתינים מסודרים. פרשמור יודעת מה יוצא, מתי ולאן.",
  },
  {
    id: 2,
    label: "פריסה",
    sublabel: "מותקן אצל הלקוח",
    image: "/stuff/WorkOrder.png",
    imageAlt: "כרטיס עבודה פרשמור, פרטי פריסה",
    spotlightX: "25%",
    spotlightY: "45%",
    ringPx: 160,
    overlayOpacity: 0.48,
    callout: "כרטיס עבודה מפורט לכל פריסה. הטכנאי יודע בדיוק מה לעשות.",
  },
  {
    id: 3,
    label: "ביקור",
    sublabel: "ביקור ביניים ותיעוד",
    image: "/stuff/Jobs.png",
    imageAlt: "רשימת משימות פרשמור, כרטיסי עבודה",
    spotlightX: "50%",
    spotlightY: "38%",
    ringPx: 150,
    overlayOpacity: 0.48,
    callout: "רשימת המשימות מתעדכנת אוטומטית. אף ביקור לא נשכח.",
  },
  {
    id: 4,
    label: "החזרה",
    sublabel: "נאסף ומוחזר למחסן",
    image: "/stuff/Map.png",
    imageAlt: "מפת נכסים פרשמור, תכנון איסוף",
    spotlightX: "55%",
    spotlightY: "42%",
    ringPx: 200,
    overlayOpacity: 0.25,
    callout: "המפה מראה בדיוק מה צריך לאסוף ואיפה. כל נסיעה שווה את הזמן.",
  },
];

/* ─── spotlight sizes ──────────────────────────────────────────────────────── */
const RING_PX_MOB  = 140; // mobile — fixed size
const OUTER_PX_MOB = 158; // mobile outer ring

export default function DeviceJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.15 });

  const [activeIdx, setActiveIdx] = useState(0);
  const [paused,    setPaused]    = useState(false);
  const [imageKey,  setImageKey]  = useState(0);

  const step = STEPS[activeIdx];

  const goTo = useCallback((i: number) => {
    if (i === activeIdx) return;
    setPaused(true);
    setActiveIdx(i);
    setImageKey((k) => k + 1);
  }, [activeIdx]);

  // Auto-advance every 4s
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => {
      const next = (activeIdx + 1) % STEPS.length;
      setActiveIdx(next);
      setImageKey((k) => k + 1);
    }, 4000);
    return () => clearTimeout(id);
  }, [activeIdx, paused]);

  /* ─── spotlight panel (shared between mobile + desktop) ─────────────────── */
  function SpotlightPanel({
    ringPx,
    overlayOpacity,
    minH,
  }: {
    ringPx: number;
    overlayOpacity: number;
    minH: string;
  }) {
    const radius   = ringPx / 2;
    const outerPx  = ringPx + 20;
    const halfOuter = outerPx / 2;

    return (
      <div
        className="relative bg-white rounded-3xl shadow-xl overflow-hidden"
        style={{ minHeight: minH }}
      >
        {/* Image — fades on step change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={imageKey}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              key={`img-${activeIdx}`}
              src={step.image}
              alt={step.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority={activeIdx === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Radial-gradient overlay — hole at spotlight position */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle ${radius}px at ${step.spotlightX} ${step.spotlightY}, transparent ${radius}px, rgba(0,0,0,${overlayOpacity}) calc(${radius}px + 2px))`,
          }}
        />

        {/* Outer decorative ring */}
        <div
          className="absolute z-20 rounded-full pointer-events-none"
          style={{
            width:  outerPx,
            height: outerPx,
            left:   `calc(${step.spotlightX} - ${halfOuter}px)`,
            top:    `calc(${step.spotlightY} - ${halfOuter}px)`,
            border: "2px solid rgba(255,255,255,0.35)",
            transition: "left 400ms ease, top 400ms ease",
          }}
        />

        {/* White spotlight ring */}
        <div
          className="absolute z-20 rounded-full pointer-events-none shadow-2xl"
          style={{
            width:  ringPx,
            height: ringPx,
            left:   `calc(${step.spotlightX} - ${radius}px)`,
            top:    `calc(${step.spotlightY} - ${radius}px)`,
            border: "4px solid white",
            transition: "left 400ms ease, top 400ms ease",
          }}
        />

        {/* Step name label — bottom interior of spotlight circle */}
        <div
          className="absolute z-30 pointer-events-none"
          style={{
            left:      step.spotlightX,
            top:       `calc(${step.spotlightY} + ${radius - 24}px)`,
            transform: "translateX(-50%)",
            transition: "left 400ms ease, top 400ms ease",
          }}
        >
          <span className="bg-black/60 text-white text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap">
            {step.label}
          </span>
        </div>

        {/* Callout box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`callout-${activeIdx}`}
            className="absolute bottom-0 start-0 end-0 z-30 p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white shadow-md border-r-4 border-brand-cyan rounded-xl p-5 flex items-start gap-3">
              <Lightbulb className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" strokeWidth={2} aria-hidden />
              <p className="text-sm font-medium text-brand-primary leading-relaxed">{step.callout}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <section ref={sectionRef} className="bg-brand-surface py-16 lg:py-24 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
            מהמחסן ועד החזרה. המסלול המלא של הציוד שלכם
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            פרשמור עוקבת אחרי כל נכס בכל שלב. מהפריסה הראשונה ועד האיסוף הסופי, בלי אובדן ובלי הפתעות.
          </p>
        </motion.div>

        {/* ══ MOBILE: horizontal tab bar + spotlight below ═══════════════ */}
        <div className="lg:hidden">
          <div className="flex overflow-x-auto gap-2 pb-3 mb-5 scrollbar-none justify-center">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                aria-pressed={i === activeIdx}
                className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  i === activeIdx
                    ? "bg-brand-primary text-white shadow-sm"
                    : "bg-white text-slate-500 border border-slate-200 hover:border-brand-cyan/40"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <SpotlightPanel ringPx={RING_PX_MOB} overlayOpacity={0.48} minH="280px" />
        </div>

        {/* ══ DESKTOP: step list (right) + spotlight (left) ═════════════ */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-10 items-start">

          {/* Step list — first in DOM = right in RTL */}
          <motion.div
            className="flex flex-col gap-1 pt-2"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {STEPS.map((s, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  className={`w-full text-right rounded-xl px-4 py-3 transition-all duration-200 cursor-pointer group ${
                    isActive
                      ? "bg-brand-primary/5 border-r-4 border-brand-cyan"
                      : "hover:bg-gray-50 border-r-4 border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isActive
                          ? "bg-brand-cyan text-white"
                          : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <div className={`font-bold text-sm ${isActive ? "text-brand-primary" : "text-slate-600"}`}>
                        {s.label}
                      </div>
                      <div className={`text-xs mt-0.5 ${isActive ? "text-brand-mid" : "text-slate-400"}`}>
                        {s.sublabel}
                      </div>
                    </div>
                    <ChevronLeft
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? "text-brand-cyan" : "text-slate-300 group-hover:text-slate-400"
                      }`}
                      strokeWidth={2}
                      aria-hidden
                    />
                  </div>
                </button>
              );
            })}

            {/* Progress dots */}
            <div className="flex gap-1.5 px-4 pt-4">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeIdx ? "bg-brand-cyan w-8" : "bg-slate-300 w-4"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Spotlight panel — second in DOM = left in RTL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <SpotlightPanel ringPx={step.ringPx} overlayOpacity={step.overlayOpacity} minH="420px" />
          </motion.div>

        </div>

      </div>
    </section>
  );
}
