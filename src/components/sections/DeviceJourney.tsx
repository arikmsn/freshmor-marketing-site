"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

/* ─── step data ────────────────────────────────────────────────────────────── */
interface Step {
  id: number;
  label: string;
  sublabel: string;
  image: string;
  imageAlt: string;
  spotlightX: string;
  spotlightY: string;
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
    spotlightY: "30%",
    callout: "כל הנכסים ממתינים מסודרים. פרשמור יודעת מה יוצא, מתי ולאן.",
  },
  {
    id: 2,
    label: "פריסה",
    sublabel: "מותקן אצל הלקוח",
    image: "/stuff/WorkOrder.png",
    imageAlt: "כרטיס עבודה פרשמור, פרטי פריסה",
    spotlightX: "50%",
    spotlightY: "40%",
    callout: "כרטיס עבודה מפורט לכל פריסה. הטכנאי יודע בדיוק מה לעשות.",
  },
  {
    id: 3,
    label: "ביקור",
    sublabel: "ביקור ביניים ותיעוד",
    image: "/stuff/Jobs.png",
    imageAlt: "רשימת משימות פרשמור, כרטיסי עבודה",
    spotlightX: "50%",
    spotlightY: "50%",
    callout: "רשימת המשימות מתעדכנת אוטומטית. אף ביקור לא נשכח.",
  },
  {
    id: 4,
    label: "החזרה",
    sublabel: "נאסף ומוחזר למחסן",
    image: "/stuff/Map.png",
    imageAlt: "מפת נכסים פרשמור, תכנון איסוף",
    spotlightX: "40%",
    spotlightY: "45%",
    callout: "המפה מראה בדיוק מה צריך לאסוף ואיפה. כל נסיעה שווה את הזמן.",
  },
];

/* ─── spotlight circle radius (px) ────────────────────────────────────────── */
const RING_PX     = 180; // desktop
const RING_PX_MOB = 140; // mobile

export default function DeviceJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.15 });

  const [activeIdx, setActiveIdx]     = useState(0);
  const [paused,    setPaused]        = useState(false);
  const [imageKey,  setImageKey]      = useState(0); // triggers fade-in

  const step = STEPS[activeIdx];

  const goTo = useCallback((i: number) => {
    setPaused(true);
    setActiveIdx(i);
    setImageKey((k) => k + 1);
  }, []);

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
          {/* Tab bar */}
          <div className="flex overflow-x-auto gap-2 pb-3 mb-5 scrollbar-none justify-center">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                aria-pressed={i === activeIdx}
                className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  i === activeIdx
                    ? "bg-brand-primary text-white shadow-sm"
                    : "bg-white text-slate-500 border border-slate-200 hover:border-brand-cyan/40"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Spotlight panel — mobile */}
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden" style={{ minHeight: "280px" }}>
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
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Spotlight circle — box-shadow vignette, mobile size */}
            <div
              className="absolute z-10 rounded-full"
              style={{
                width:  RING_PX_MOB,
                height: RING_PX_MOB,
                left:   `calc(${step.spotlightX} - ${RING_PX_MOB / 2}px)`,
                top:    `calc(${step.spotlightY} - ${RING_PX_MOB / 2}px)`,
                boxShadow: "0 0 0 2000px rgba(0,0,0,0.45)",
                border: "4px solid rgba(255,255,255,0.8)",
                transition: "left 400ms ease, top 400ms ease",
              }}
            />

            {/* Callout */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`callout-mob-${activeIdx}`}
                className="absolute bottom-0 start-0 end-0 z-20 p-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-brand-cyan/10 border-r-4 border-brand-cyan rounded-xl p-3 backdrop-blur-sm">
                  <p className="text-sm font-medium text-brand-primary leading-snug">{step.callout}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ══ DESKTOP: step list (right) + spotlight (left) ═════════════ */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-10 items-start">

          {/* Step list — first in DOM = right in RTL */}
          <motion.div
            className="flex flex-col gap-2 pt-2"
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
                  className={`w-full text-right rounded-xl px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? "bg-brand-primary text-white shadow-sm"
                      : "text-slate-500 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <div className={`font-bold text-sm ${isActive ? "text-white" : "text-brand-primary"}`}>
                        {s.label}
                      </div>
                      <div className={`text-xs mt-0.5 ${isActive ? "text-blue-200" : "text-slate-400"}`}>
                        {s.sublabel}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Progress indicator */}
            <div className="flex gap-1.5 px-4 pt-3">
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
            <div
              className="relative bg-white rounded-3xl shadow-xl overflow-hidden"
              style={{ minHeight: "400px" }}
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
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    sizes="(max-width: 1280px) 50vw, 640px"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Spotlight circle — box-shadow creates the dark vignette outside it */}
              <div
                className="absolute z-10 rounded-full"
                style={{
                  width:  RING_PX,
                  height: RING_PX,
                  left:   `calc(${step.spotlightX} - ${RING_PX / 2}px)`,
                  top:    `calc(${step.spotlightY} - ${RING_PX / 2}px)`,
                  boxShadow: "0 0 0 2000px rgba(0,0,0,0.45), 0 0 40px rgba(0,0,0,0.3)",
                  border: "4px solid rgba(255,255,255,0.8)",
                  transition: "left 400ms ease, top 400ms ease",
                }}
              />

              {/* Callout box */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`callout-${activeIdx}`}
                  className="absolute bottom-0 start-0 end-0 z-20 p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-brand-cyan/10 border-r-4 border-brand-cyan rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-sm font-medium text-brand-primary leading-relaxed">
                      {step.callout}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
