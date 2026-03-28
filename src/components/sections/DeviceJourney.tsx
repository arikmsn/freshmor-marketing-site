"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import PhoneFrame from "@/components/common/PhoneFrame";

const STEPS = [
  {
    id: 1,
    label: "מחסן",
    sublabel: "הציוד ממתין לפריסה",
    screenshot: "/stuff/Main.png",
    screenshotAlt: "מסך הבית של פרשמור, מלאי ונכסים",
  },
  {
    id: 2,
    label: "פריסה",
    sublabel: "מותקן אצל הלקוח",
    screenshot: "/stuff/WorkOrder.png",
    screenshotAlt: "כרטיס עבודה פרשמור, פרטי פריסה",
  },
  {
    id: 3,
    label: "ביקור",
    sublabel: "ביקור ביניים ותיעוד",
    screenshot: "/stuff/Jobs.png",
    screenshotAlt: "רשימת משימות פרשמור, כרטיסי עבודה",
  },
  {
    id: 4,
    label: "החזרה",
    sublabel: "נאסף ומוחזר למחסן",
    screenshot: "/stuff/Map.png",
    screenshotAlt: "מפת נכסים פרשמור, תכנון איסוף",
  },
];

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

export default function DeviceJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.15 });
  const [activeStep, setActiveStep]               = useState<number | null>(null);
  const [played, setPlayed]                       = useState(false);
  const [mobileDisplayStep, setMobileDisplayStep] = useState(0);

  useEffect(() => {
    if (activeStep !== null) setMobileDisplayStep(activeStep - 1);
  }, [activeStep]);

  function playJourney() {
    setActiveStep(null);
    setPlayed(false);
    setMobileDisplayStep(0);
    setTimeout(() => {
      setPlayed(true);
      STEPS.forEach((step, i) => {
        setTimeout(() => setActiveStep(step.id), i * 950);
      });
    }, 80);
  }

  function goMobileStep(i: number) {
    setMobileDisplayStep(Math.max(0, Math.min(STEPS.length - 1, i)));
  }

  return (
    <section ref={sectionRef} className="bg-brand-surface py-16 lg:py-24 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ─────────────────────────────────────────────────────── */}
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
          {/* Play button — brand-cyan bg, white text */}
          <button
            onClick={playJourney}
            className="mt-6 inline-flex items-center gap-2 bg-brand-cyan hover:bg-brand-cyan-dark text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            {played ? "הצג מחדש" : "הפעל מסע המכשיר"}
          </button>
        </motion.div>

        {/* ── Desktop: 4 white cards in a row ────────────────────────────── */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 relative z-10">
          {STEPS.map((step, index) => {
            const isActive  = activeStep !== null && step.id <= activeStep;
            const isCurrent = step.id === activeStep;

            return (
              <motion.div
                key={step.id}
                className="bg-white rounded-2xl p-6 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? {
                  opacity: 1,
                  y: 0,
                  scale: isCurrent ? 1.03 : 1,
                  borderColor: isCurrent
                    ? "#16B7E8"
                    : isActive
                    ? "rgba(22,183,232,0.35)"
                    : "#F0F8FF",
                  boxShadow: isCurrent
                    ? "0 0 0 2px rgba(22,183,232,0.4), 0 12px 32px rgba(0,0,0,0.10)"
                    : "0 4px 12px rgba(0,0,0,0.07)",
                } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                style={{ border: "2px solid #F0F8FF" }}
              >
                {/* Step number circle */}
                <motion.div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold mb-3 relative"
                  animate={{
                    backgroundColor: isActive ? "#16B7E8" : "#e2e8f0",
                    color:           isActive ? "#0D2B4E" : "#94a3b8",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {index + 1}
                  <AnimatePresence>
                    {isCurrent && (
                      <motion.div
                        className="absolute -top-2 -right-2"
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

                {/* Step title */}
                <motion.h3
                  className="font-bold text-sm mb-4"
                  animate={{ color: isActive ? "#0D2B4E" : "#64748b" }}
                  transition={{ duration: 0.4 }}
                >
                  {step.label}
                </motion.h3>

                {/* Phone — 85% of card width, no background behind it */}
                <motion.div
                  className="w-[85%]"
                  animate={{
                    filter: isCurrent
                      ? "drop-shadow(0 0 16px rgba(22,183,232,0.45))"
                      : isActive
                      ? "drop-shadow(0 4px 12px rgba(0,0,0,0.15))"
                      : "drop-shadow(0 2px 6px rgba(0,0,0,0.10))",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <PhoneFrame
                    src={step.screenshot}
                    alt={step.screenshotAlt}
                    className="w-full"
                  />
                </motion.div>

                {/* Description */}
                <p className="text-xs text-slate-500 mt-4 leading-relaxed">{step.sublabel}</p>
              </motion.div>
            );
          })}
        </div>

        {/* ── Mobile: single-phone swiper ─────────────────────────────────── */}
        <div className="lg:hidden">

          {/* Step pills */}
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

          {/* Card with phone */}
          <div className="flex justify-center mb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileDisplayStep}
                className="relative w-full max-w-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {activeStep === STEPS[mobileDisplayStep].id && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <DeviceDot />
                  </div>
                )}
                {/* White card surface */}
                <div className="bg-white border-2 border-brand-surface shadow-md rounded-2xl p-4 flex flex-col items-center">
                  {/* Step number + title row */}
                  <div className="flex items-center gap-2 mb-3 self-center">
                    <motion.div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                      animate={{
                        backgroundColor:
                          activeStep !== null && STEPS[mobileDisplayStep].id <= activeStep
                            ? "#16B7E8"
                            : "#e2e8f0",
                        color:
                          activeStep !== null && STEPS[mobileDisplayStep].id <= activeStep
                            ? "#0D2B4E"
                            : "#94a3b8",
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {mobileDisplayStep + 1}
                    </motion.div>
                    <h3 className="font-bold text-brand-primary text-base">
                      {STEPS[mobileDisplayStep].label}
                    </h3>
                  </div>
                  {/* Phone — 80% of card width, main visual */}
                  <motion.div
                    className="w-4/5"
                    animate={{
                      filter:
                        activeStep === STEPS[mobileDisplayStep].id
                          ? "drop-shadow(0 0 16px rgba(22,183,232,0.45))"
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
                  {/* Description — tight below phone */}
                  <p className="text-center text-xs text-slate-500 mt-3">
                    {STEPS[mobileDisplayStep].sublabel}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Label crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`label-${mobileDisplayStep}`}
              className="text-center mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-[10px] font-bold text-brand-cyan/70 uppercase tracking-widest">
                שלב {mobileDisplayStep + 1} מתוך {STEPS.length}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next — 44px touch targets */}
          <div className="flex justify-center items-center gap-4 mt-4">
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

      </div>
    </section>
  );
}
