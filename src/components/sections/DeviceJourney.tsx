"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import PhoneFrame from "@/components/common/PhoneFrame";

// ── Journey steps ──────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: 1,
    label: "מחסן",
    sublabel: "הציוד ממתין לפריסה",
    screenshot: "/stuff/Main.png",
    screenshotAlt: "מסך הבית של פרשמור, מלאי ונכסים",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
      </svg>
    ),
  },
  {
    id: 2,
    label: "פריסה",
    sublabel: "מותקן אצל הלקוח",
    screenshot: "/stuff/Jobs.png",
    screenshotAlt: "רשימת משימות פרשמור, כרטיסי עבודה",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    id: 3,
    label: "ביקור",
    sublabel: "ביקור ביניים ותיעוד",
    screenshot: "/stuff/WorkOrder.png",
    screenshotAlt: "כרטיס עבודה פרשמור, פרטי ביקור",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 4,
    label: "החזרה",
    sublabel: "נאסף ומוחזר למחסן",
    screenshot: "/stuff/Map.png",
    screenshotAlt: "מפת נכסים פרשמור, תכנון איסוף",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

// ── Pulsing device dot ─────────────────────────────────────────────────────────
function DeviceDot() {
  return (
    <div className="relative flex items-center justify-center w-7 h-7">
      <motion.div
        className="absolute inset-0 rounded-full bg-brand-cyan/30"
        animate={{ scale: [1, 1.55, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative w-4 h-4 rounded-full bg-brand-cyan shadow-md" />
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────
export default function DeviceJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.15 });
  const [activeStep, setActiveStep]         = useState<number | null>(null);
  const [played, setPlayed]                 = useState(false);
  // Mobile-specific: which step index (0-3) the large phone shows
  const [mobileDisplayStep, setMobileDisplayStep] = useState(0);

  // Sync mobile display with the play animation
  useEffect(() => {
    if (activeStep !== null) {
      setMobileDisplayStep(activeStep - 1);
    }
  }, [activeStep]);

  function playJourney() {
    setActiveStep(null);
    setPlayed(false);
    setMobileDisplayStep(0);
    setTimeout(() => startJourney(), 80);
  }

  function startJourney() {
    setPlayed(true);
    STEPS.forEach((step, i) => {
      setTimeout(() => setActiveStep(step.id), i * 950);
    });
  }

  function goMobileStep(i: number) {
    setMobileDisplayStep(Math.max(0, Math.min(STEPS.length - 1, i)));
  }

  return (
    <section ref={sectionRef} className="bg-brand-surface py-20 lg:py-28 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
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
          <button
            onClick={playJourney}
            className="mt-6 inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-mid text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            {played ? "הצג מחדש" : "הפעל מסע המכשיר"}
          </button>
        </motion.div>

        {/* ── Desktop: 4-column horizontal timeline ──────────────────────── */}
        <div className="hidden lg:block relative">

          {/* Rail — xl only (4-col layout) */}
          <div className="hidden xl:block absolute top-[52px] inset-x-16 h-px bg-brand-cyan/20 z-0" />
          {/* Animated fill on rail */}
          <motion.div
            className="hidden xl:block absolute top-[52px] h-px bg-brand-cyan z-0"
            style={{ right: "4rem" }}
            animate={{
              width:
                activeStep === null ? "0%"
                : activeStep === 1   ? "0%"
                : activeStep === 2   ? "33%"
                : activeStep === 3   ? "66%"
                : "calc(100% - 8rem)",
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-8 relative z-10 pt-2 pb-6">
            {STEPS.map((step, index) => {
              const isActive  = activeStep !== null && step.id <= activeStep;
              const isCurrent = step.id === activeStep;

              return (
                <motion.div
                  key={step.id}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Step icon circle */}
                  <motion.div
                    className="relative w-[72px] h-[72px] rounded-2xl flex items-center justify-center mb-5 border-2"
                    animate={{
                      backgroundColor: isActive ? "#0D2B4E" : "#ffffff",
                      borderColor:     isActive ? "#16B7E8" : "#e2e8f0",
                      boxShadow:       isCurrent ? "0 0 0 4px rgba(22,183,232,0.2)" : "none",
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      animate={{ color: isActive ? "#16B7E8" : "#94a3b8" }}
                      transition={{ duration: 0.4 }}
                    >
                      {step.icon}
                    </motion.div>

                    {/* Device dot on current step */}
                    <AnimatePresence>
                      {isCurrent && (
                        <motion.div
                          className="absolute -top-3 -right-3"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                          <DeviceDot />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Labels */}
                  <span className="text-[10px] font-bold text-brand-cyan/60 uppercase tracking-widest mb-1">
                    שלב {index + 1}
                  </span>
                  <h3 className="font-bold text-brand-primary text-sm mb-0.5">{step.label}</h3>
                  <p className="text-xs text-slate-500 mb-5">{step.sublabel}</p>

                  {/* Phone frame — full column width, glow on active */}
                  <motion.div
                    className="w-full"
                    animate={{
                      filter: isCurrent
                        ? "drop-shadow(0 0 18px rgba(22,183,232,0.5))"
                        : isActive
                        ? "drop-shadow(0 6px 16px rgba(0,0,0,0.18))"
                        : "drop-shadow(0 2px 8px rgba(0,0,0,0.10))",
                      scale: isCurrent ? 1.04 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <PhoneFrame
                      src={step.screenshot}
                      alt={step.screenshotAlt}
                      className="w-full"
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile: single-phone swiper ─────────────────────────────────── */}
        <div className="lg:hidden">

          {/* Step indicator pills */}
          <div className="flex justify-center gap-2 mb-5">
            {STEPS.map((step, i) => (
              <button
                key={step.id}
                onClick={() => goMobileStep(i)}
                aria-label={`שלב ${i + 1}: ${step.label}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === mobileDisplayStep
                    ? "bg-brand-cyan w-8"
                    : "bg-slate-300 w-4 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          {/* Phone card — gives the phone a visible surface + shadow */}
          <div className="flex justify-center mb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileDisplayStep}
                className="relative w-3/4 max-w-[280px]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Active step pulse badge */}
                {activeStep === STEPS[mobileDisplayStep].id && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <DeviceDot />
                  </div>
                )}
                {/* Card surface */}
                <div className="bg-brand-surface rounded-3xl shadow-md border border-brand-cyan/20 p-4">
                  <motion.div
                    animate={{
                      filter:
                        activeStep === STEPS[mobileDisplayStep].id
                          ? "drop-shadow(0 0 18px rgba(22,183,232,0.5))"
                          : "none",
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <PhoneFrame
                      src={STEPS[mobileDisplayStep].screenshot}
                      alt={STEPS[mobileDisplayStep].screenshotAlt}
                      className="w-full"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Step label */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`label-${mobileDisplayStep}`}
              className="text-center mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <span className="text-[10px] font-bold text-brand-cyan/70 uppercase tracking-widest block mb-1">
                שלב {mobileDisplayStep + 1}
              </span>
              <h3 className="font-bold text-brand-primary text-lg">
                {STEPS[mobileDisplayStep].label}
              </h3>
              <p className="text-sm text-slate-500 mt-0.5">
                {STEPS[mobileDisplayStep].sublabel}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next navigation — 44px touch targets */}
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => goMobileStep(mobileDisplayStep - 1)}
              disabled={mobileDisplayStep === 0}
              aria-label="שלב הקודם"
              className="w-11 h-11 rounded-xl border-2 border-slate-200 flex items-center justify-center text-slate-500
                         hover:border-brand-cyan hover:text-brand-primary disabled:opacity-30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <span className="text-sm text-slate-500 font-semibold tabular-nums w-12 text-center">
              {mobileDisplayStep + 1} / {STEPS.length}
            </span>
            <button
              onClick={() => goMobileStep(mobileDisplayStep + 1)}
              disabled={mobileDisplayStep === STEPS.length - 1}
              aria-label="שלב הבא"
              className="w-11 h-11 rounded-xl border-2 border-slate-200 flex items-center justify-center text-slate-500
                         hover:border-brand-cyan hover:text-brand-primary disabled:opacity-30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

        </div>
        {/* ── end mobile swiper ───────────────────────────────────────────── */}

      </div>
    </section>
  );
}
