"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

// ── Journey steps ──────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: 1,
    label: "מחסן",
    sublabel: "הציוד ממתין",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
      </svg>
    ),
    card: (
      <div className="space-y-2">
        <p className="text-[10px] text-brand-cyan/70 uppercase tracking-wider font-semibold">מלאי מחסן</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-600">יחידות זמינות</span>
          <span className="text-sm font-bold text-brand-primary">47</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-600">מוכנות לפריסה</span>
          <span className="text-sm font-bold text-emerald-600">12</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full w-1/4 rounded-full bg-brand-cyan" />
        </div>
      </div>
    ),
  },
  {
    id: 2,
    label: "פריסה",
    sublabel: "מותקן אצל הלקוח",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 4v1m0 14v1M4 12H3m18 0h-1m-2.05-6.95l-.707.707M6.757 17.243l-.707.707m12.02.02l-.707-.707M6.757 6.757l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ),
    card: (
      <div className="space-y-2">
        <p className="text-[10px] text-brand-cyan/70 uppercase tracking-wider font-semibold">כרטיס עבודה</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-600">לקוח</span>
          <span className="text-xs font-semibold text-brand-primary">ABC בע&quot;מ</span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-4 h-4 rounded bg-brand-cyan/15 flex items-center justify-center shrink-0">
            <svg className="w-2.5 h-2.5 text-brand-cyan" viewBox="0 0 10 10" fill="currentColor">
              <rect x="1" y="1" width="3" height="3" /><rect x="6" y="1" width="3" height="3" />
              <rect x="1" y="6" width="3" height="3" /><rect x="6" y="6" width="3" height="3" />
            </svg>
          </span>
          <span className="text-xs text-emerald-600 font-semibold">QR נסרק ✓</span>
        </div>
        <div className="text-[10px] text-slate-400 mt-1">פריסה: 14/03/2024</div>
      </div>
    ),
  },
  {
    id: 3,
    label: "ביקור",
    sublabel: "ביקור ביניים ותיעוד",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    card: (
      <div className="space-y-2">
        <p className="text-[10px] text-brand-cyan/70 uppercase tracking-wider font-semibold">דוח ביקור</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <span className="text-xs text-slate-700">תקין — 21/03/2024</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-600">ביקור הבא</span>
          <span className="text-xs font-semibold text-amber-600">28/03/2024</span>
        </div>
        <div className="text-[10px] text-slate-400">טכנאי: דניאל כ&apos;</div>
      </div>
    ),
  },
  {
    id: 4,
    label: "החזרה",
    sublabel: "נאסף ומוחזר למחסן",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    card: (
      <div className="space-y-2">
        <p className="text-[10px] text-brand-cyan/70 uppercase tracking-wider font-semibold">סיכום</p>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span className="text-xs font-semibold text-emerald-700">הושלם בהצלחה</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-600">זמן שהייה</span>
          <span className="text-xs font-semibold text-brand-primary">21 ימים</span>
        </div>
        <div className="text-[10px] text-slate-400">מכשיר הוחזר: 04/04/2024</div>
      </div>
    ),
  },
];

// ── Device dot ─────────────────────────────────────────────────────────────────
function DeviceDot() {
  return (
    <div className="relative flex items-center justify-center w-7 h-7">
      <motion.div
        className="absolute inset-0 rounded-full bg-brand-cyan/30"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative w-4 h-4 rounded-full bg-brand-cyan flex items-center justify-center shadow-md">
        <svg className="w-2.5 h-2.5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────
export default function DeviceJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [played, setPlayed] = useState(false);

  function playJourney() {
    if (played) {
      setActiveStep(null);
      setPlayed(false);
      setTimeout(() => startJourney(), 80);
    } else {
      startJourney();
    }
  }

  function startJourney() {
    setPlayed(true);
    STEPS.forEach((step, i) => {
      setTimeout(() => {
        setActiveStep(step.id);
      }, i * 900);
    });
  }

  return (
    <section ref={sectionRef} className="bg-brand-surface py-20 lg:py-28 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
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

          {/* Play button */}
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

        {/* Timeline — horizontal desktop, vertical mobile */}
        <div className="relative">

          {/* ── Desktop timeline ── */}
          <div className="hidden lg:block">
            {/* Connector rail */}
            <div className="absolute top-9 inset-x-16 h-px bg-brand-cyan/20 z-0" />
            {/* Animated fill */}
            <motion.div
              className="absolute top-9 h-px bg-brand-cyan z-0"
              style={{ right: "4rem" }}
              animate={{
                width:
                  activeStep === null ? "0%"
                  : activeStep === 1 ? "0%"
                  : activeStep === 2 ? "33%"
                  : activeStep === 3 ? "66%"
                  : "calc(100% - 8rem)",
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />

            <div className="grid grid-cols-4 gap-6 relative z-10">
              {STEPS.map((step, index) => {
                const isActive = activeStep !== null && step.id <= activeStep;
                const isCurrent = step.id === activeStep;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    {/* Circle */}
                    <motion.div
                      className="relative w-[72px] h-[72px] rounded-2xl flex items-center justify-center mb-4 border-2 transition-all"
                      animate={{
                        backgroundColor: isActive ? "#0D2B4E" : "#ffffff",
                        borderColor: isActive ? "#16B7E8" : "#e2e8f0",
                        boxShadow: isCurrent
                          ? "0 0 0 4px rgba(22,183,232,0.2)"
                          : "none",
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <motion.div
                        animate={{ color: isActive ? "#16B7E8" : "#94a3b8" }}
                        transition={{ duration: 0.4 }}
                      >
                        {step.icon}
                      </motion.div>
                      {/* Animated device on current step */}
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

                    {/* Step number */}
                    <span className="text-[10px] font-bold text-brand-cyan/60 uppercase tracking-widest mb-1">
                      שלב {index + 1}
                    </span>
                    <h3 className="font-bold text-brand-primary text-sm mb-0.5">{step.label}</h3>
                    <p className="text-xs text-slate-500 mb-4">{step.sublabel}</p>

                    {/* Mini UI card */}
                    <motion.div
                      className="w-full bg-white rounded-xl border p-3 text-start shadow-sm"
                      animate={{
                        borderColor: isCurrent ? "#16B7E8" : isActive ? "rgba(22,183,232,0.3)" : "#f1f5f9",
                        boxShadow: isCurrent
                          ? "0 0 0 3px rgba(22,183,232,0.15), 0 4px 16px rgba(0,0,0,0.08)"
                          : "0 1px 3px rgba(0,0,0,0.06)",
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {step.card}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Mobile timeline — vertical ── */}
          <div className="lg:hidden space-y-0">
            {STEPS.map((step, index) => {
              const isActive = activeStep !== null && step.id <= activeStep;
              const isCurrent = step.id === activeStep;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex gap-4"
                >
                  {/* Vertical connector */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border-2 shrink-0"
                      animate={{
                        backgroundColor: isActive ? "#0D2B4E" : "#ffffff",
                        borderColor: isActive ? "#16B7E8" : "#e2e8f0",
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

                  {/* Content */}
                  <div className="pb-6 flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <h3 className="font-bold text-brand-primary text-sm">{step.label}</h3>
                      {isCurrent && <DeviceDot />}
                    </div>
                    <p className="text-xs text-slate-500 mb-3">{step.sublabel}</p>
                    <motion.div
                      className="bg-white rounded-xl border p-3 shadow-sm"
                      animate={{
                        borderColor: isCurrent ? "#16B7E8" : isActive ? "rgba(22,183,232,0.3)" : "#f1f5f9",
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {step.card}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
