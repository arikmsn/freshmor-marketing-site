"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";

/* ─── step data ────────────────────────────────────────────────────────────── */
const steps = [
  {
    label: "מחסן",
    description: "הציוד ממתין לפריסה",
    image: "/stuff/Main.png",
    cx: 38, cy: 52, cr: 70,
    opacity: 0.6,
    callout: "כל הנכסים ממתינים מסודרים. פרשמור יודעת מה יוצא, מתי ולאן.",
  },
  {
    label: "פריסה",
    description: "מותקן אצל הלקוח",
    image: "/stuff/WorkOrder.png",
    cx: 85, cy: 20, cr: 65,
    opacity: 0.6,
    callout: "כרטיס עבודה מפורט לכל פריסה. הטכנאי יודע בדיוק מה לעשות.",
  },
  {
    label: "ביקור",
    description: "ביקור ביניים ותיעוד",
    image: "/stuff/Jobs.png",
    cx: 28, cy: 38, cr: 65,
    opacity: 0.6,
    callout: "יומן העבודה מתעדכן אוטומטית. אף ביקור לא נשכח.",
  },
  {
    label: "החזרה",
    description: "נאסף ומוחזר למחסן",
    image: "/stuff/Map.png",
    cx: 55, cy: 62, cr: 100,
    opacity: 0.25,
    callout: "המפה מראה בדיוק מה צריך לאסוף ואיפה. כל נסיעה שווה את הזמן.",
  },
];

/* ─── DeviceJourney ────────────────────────────────────────────────────────── */
export default function DeviceJourney() {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const inView        = useInView(sectionRef, { once: true, amount: 0.15 });
  const lastManualRef = useRef<number>(0);

  const [activeStep, setActiveStep] = useState(0);

  function handleClick(i: number) {
    lastManualRef.current = Date.now();
    setActiveStep(i);
  }

  // Auto-advance every 4s; pauses for 8s after any manual click
  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() - lastManualRef.current >= 8000) {
        setActiveStep((s) => (s + 1) % steps.length);
      }
    }, 4000);
    return () => clearInterval(id);
  }, []);

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

        {/* ══ MOBILE: tabs + spotlight ════════════════════════════════════ */}
        <div className="lg:hidden">
          {/* Tab bar */}
          <div className="flex gap-2 pb-3 mb-5 justify-center flex-wrap">
            {steps.map((step, i) => (
              <button
                key={step.label}
                onClick={() => handleClick(i)}
                aria-pressed={i === activeStep}
                className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  i === activeStep
                    ? "bg-brand-primary text-white shadow-sm"
                    : "bg-white text-slate-500 border border-slate-200 hover:border-brand-cyan/40"
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>

          {/* Spotlight panel — mobile */}
          <div style={{ position: 'relative', width: '100%', height: '280px', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#1a1a2e' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={activeStep}
              src={steps[activeStep].image}
              alt={steps[activeStep].label}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top',
              }}
            />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `radial-gradient(circle ${Math.round(steps[activeStep].cr * 0.75)}px at ${steps[activeStep].cx}% ${steps[activeStep].cy}%, transparent ${Math.round(steps[activeStep].cr * 0.75)}px, rgba(0,0,0,${steps[activeStep].opacity}) ${Math.round(steps[activeStep].cr * 0.75) + 1}px)`,
            }} />
            <div style={{
              position: 'absolute',
              left: `${steps[activeStep].cx}%`,
              top: `${steps[activeStep].cy}%`,
              transform: 'translate(-50%, -50%)',
              width: Math.round(steps[activeStep].cr * 1.5) + 8,
              height: Math.round(steps[activeStep].cr * 1.5) + 8,
              borderRadius: '50%',
              border: '3px solid rgba(255,255,255,0.85)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.2), 0 4px 20px rgba(0,0,0,0.5)',
              pointerEvents: 'none',
            }} />
          </div>

          <div style={{ marginTop: '16px', padding: '16px', backgroundColor: 'rgba(22,183,232,0.08)', borderRight: '4px solid #16B7E8', borderRadius: '12px', textAlign: 'right' }}>
            <p style={{ color: '#0D2B4E', fontWeight: 500, fontSize: '14px', margin: 0 }}>
              {steps[activeStep].callout}
            </p>
          </div>
        </div>

        {/* ══ DESKTOP: step list (right) + spotlight (left) ══════════════ */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-10 items-start">

          {/* Step list — first in DOM = right in RTL */}
          <motion.div
            className="flex flex-col gap-1 pt-2"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {steps.map((step, i) => {
              const isActive = i === activeStep;
              return (
                <button
                  key={step.label}
                  onClick={() => handleClick(i)}
                  aria-pressed={isActive}
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
                        {step.label}
                      </div>
                      <div className={`text-xs mt-0.5 ${isActive ? "text-brand-mid" : "text-slate-400"}`}>
                        {step.description}
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
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeStep ? "bg-brand-cyan w-8" : "bg-slate-300 w-4"
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
            <div style={{ position: 'relative', width: '100%', height: '420px', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#1a1a2e' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={activeStep}
                src={steps[activeStep].image}
                alt={steps[activeStep].label}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
              />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `radial-gradient(circle ${steps[activeStep].cr}px at ${steps[activeStep].cx}% ${steps[activeStep].cy}%, transparent ${steps[activeStep].cr}px, rgba(0,0,0,${steps[activeStep].opacity}) ${steps[activeStep].cr + 1}px)`,
              }} />
              <div style={{
                position: 'absolute',
                left: `${steps[activeStep].cx}%`,
                top: `${steps[activeStep].cy}%`,
                transform: 'translate(-50%, -50%)',
                width: steps[activeStep].cr * 2 + 8,
                height: steps[activeStep].cr * 2 + 8,
                borderRadius: '50%',
                border: '3px solid rgba(255,255,255,0.85)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.2), 0 4px 20px rgba(0,0,0,0.5)',
                pointerEvents: 'none',
              }} />
            </div>

            <div style={{ marginTop: '16px', padding: '16px', backgroundColor: 'rgba(22,183,232,0.08)', borderRight: '4px solid #16B7E8', borderRadius: '12px', textAlign: 'right' }}>
              <p style={{ color: '#0D2B4E', fontWeight: 500, fontSize: '14px', margin: 0 }}>
                {steps[activeStep].callout}
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
