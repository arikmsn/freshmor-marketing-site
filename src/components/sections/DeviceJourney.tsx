"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import PhoneFrame from "@/components/common/PhoneFrame";

// ── Journey steps ──────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: 1,
    label: "מחסן",
    sublabel: "הציוד ממתין לפריסה",
    screenshot: "/stuff/Main.png",
    screenshotAlt: "מסך הבית של פרשמור — מלאי ונכסים",
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
    screenshotAlt: "רשימת משימות פרשמור — כרטיסי עבודה",
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
    screenshotAlt: "כרטיס עבודה פרשמור — פרטי ביקור",
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
    screenshotAlt: "מפת נכסים פרשמור — תכנון איסוף",
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
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [played, setPlayed]         = useState(false);

  function playJourney() {
    // reset then restart
    setActiveStep(null);
    setPlayed(false);
    setTimeout(() => startJourney(), 80);
  }

  function startJourney() {
    setPlayed(true);
    STEPS.forEach((step, i) => {
      setTimeout(() => setActiveStep(step.id), i * 950);
    });
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
            המסע של מכשיר מהמחסן ועד החזרה
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            פרשמור עוקבת אחרי כל נכס בכל שלב — מהפריסה הראשונה ועד לאיסוף הסופי. לא עוד ניחושות, לא עוד אובדן.
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

          {/* Rail */}
          <div className="absolute top-[52px] inset-x-16 h-px bg-brand-cyan/20 z-0" />
          {/* Animated fill on rail */}
          <motion.div
            className="absolute top-[52px] h-px bg-brand-cyan z-0"
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

          <div className="grid grid-cols-4 gap-6 relative z-10">
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
                    className="relative w-[72px] h-[72px] rounded-2xl flex items-center justify-center mb-4 border-2"
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
                  <p className="text-xs text-slate-500 mb-4">{step.sublabel}</p>

                  {/* Phone frame — replaces text card */}
                  <motion.div
                    className="w-full"
                    animate={{
                      filter: isCurrent
                        ? "drop-shadow(0 0 16px rgba(22,183,232,0.45))"
                        : isActive
                        ? "drop-shadow(0 4px 12px rgba(0,0,0,0.2))"
                        : "drop-shadow(0 2px 6px rgba(0,0,0,0.12))",
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

        {/* ── Mobile: vertical timeline ───────────────────────────────────── */}
        <div className="lg:hidden space-y-0">
          {STEPS.map((step, index) => {
            const isActive  = activeStep !== null && step.id <= activeStep;
            const isCurrent = step.id === activeStep;

            return (
              <motion.div
                key={step.id}
                className="flex gap-4"
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                {/* Vertical connector */}
                <div className="flex flex-col items-center shrink-0">
                  <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border-2"
                    animate={{
                      backgroundColor: isActive ? "#0D2B4E" : "#ffffff",
                      borderColor:     isActive ? "#16B7E8" : "#e2e8f0",
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      animate={{ color: isActive ? "#16B7E8" : "#94a3b8" }}
                      transition={{ duration: 0.4 }}
                      className="[&>svg]:w-4 [&>svg]:h-4"
                    >
                      {step.icon}
                    </motion.div>
                  </motion.div>
                  {index < STEPS.length - 1 && (
                    <motion.div
                      className="w-px flex-1 mt-1 min-h-[24px]"
                      animate={{ backgroundColor: isActive ? "#16B7E8" : "#e2e8f0" }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </div>

                {/* Content — label + phone frame side by side */}
                <div className="pb-6 flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-brand-primary text-sm">{step.label}</h3>
                    {isCurrent && <DeviceDot />}
                  </div>
                  <p className="text-xs text-slate-500 mb-3">{step.sublabel}</p>

                  {/* Phone frame — constrained width on mobile */}
                  <motion.div
                    className="w-[140px]"
                    animate={{
                      filter: isCurrent
                        ? "drop-shadow(0 0 12px rgba(22,183,232,0.4))"
                        : "drop-shadow(0 2px 6px rgba(0,0,0,0.14))",
                      scale: isCurrent ? 1.03 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <PhoneFrame
                      src={step.screenshot}
                      alt={step.screenshotAlt}
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
