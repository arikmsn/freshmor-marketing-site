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
    cx: '47%', cy: '35%', cr: 70,
    opacity: 0.6,
    callout: "כל הנכסים ממתינים מסודרים. פרשמור יודעת מה יוצא, מתי ולאן.",
  },
  {
    label: "פריסה",
    description: "מותקן אצל הלקוח",
    image: "/stuff/WorkOrder.png",
    cx: '52%', cy: '52%', cr: 65,
    opacity: 0.6,
    callout: "כרטיס עבודה מפורט לכל פריסה. הטכנאי יודע בדיוק מה לעשות.",
  },
  {
    label: "ביקור",
    description: "ביקור ביניים ותיעוד",
    image: "/stuff/Jobs.png",
    cx: '45%', cy: '30%', cr: 65,
    opacity: 0.6,
    callout: "יומן העבודה מתעדכן אוטומטית. אף ביקור לא נשכח.",
  },
  {
    label: "החזרה",
    description: "נאסף ומוחזר למחסן",
    image: "/stuff/Map.png",
    cx: '50%', cy: '55%', cr: 100,
    opacity: 0.25,
    objectPosition: 'center' as const,
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

  const s = steps[activeStep];

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
        <div className="md:hidden">
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
              src={s.image}
              alt={s.label}
              style={{
                position: 'absolute', top: 0, left: 0,
                width: '100%', height: '100%',
                objectFit: 'contain',
                objectPosition: s.objectPosition ?? 'top',
              }}
            />
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              background: `radial-gradient(circle ${Math.round(s.cr * 0.75)}px at ${s.cx} ${s.cy}, transparent ${Math.round(s.cr * 0.75)}px, rgba(0,0,0,${s.opacity}) ${Math.round(s.cr * 0.75) + 1}px)`,
            }} />
            <div style={{
              position: 'absolute',
              left: s.cx, top: s.cy,
              transform: 'translate(-50%, -50%)',
              width: Math.round(s.cr * 1.5) + 8,
              height: Math.round(s.cr * 1.5) + 8,
              borderRadius: '50%',
              border: '3px solid rgba(255,255,255,0.85)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.2), 0 4px 20px rgba(0,0,0,0.5)',
              pointerEvents: 'none',
            }} />
          </div>

          <div style={{ marginTop: '16px', padding: '16px', backgroundColor: 'rgba(22,183,232,0.08)', borderRight: '4px solid #16B7E8', borderRadius: '12px', textAlign: 'right' }}>
            <p style={{ color: '#0D2B4E', fontWeight: 500, fontSize: '14px', margin: 0 }}>
              {s.callout}
            </p>
          </div>
        </div>

        {/* ══ DESKTOP: image (left) + step list (right) ═══════════════════ */}
        {/* In RTL: first DOM child = right, second DOM child = left        */}
        {/* DOM order: steps (right col, 45fr) | image (left col, 55fr)     */}
        <div className="hidden md:grid md:grid-cols-[45fr_55fr] gap-8 items-start">

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
                  className={`w-full text-right rounded-xl px-6 py-5 transition-all duration-200 cursor-pointer group ${
                    isActive
                      ? "bg-brand-primary/8 border-l-4 border-brand-cyan"
                      : "hover:bg-gray-50 border-l-4 border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shrink-0 transition-colors ${
                        isActive
                          ? "bg-brand-cyan text-white"
                          : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <div className={`font-bold text-xl ${isActive ? "text-brand-primary" : "text-slate-600"}`}>
                        {step.label}
                      </div>
                      <div className={`text-base mt-1 ${isActive ? "text-brand-mid" : "text-slate-400"}`}>
                        {step.description}
                      </div>
                    </div>
                    <ChevronLeft
                      className={`w-5 h-5 shrink-0 transition-colors ${
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
            <div className="flex gap-1.5 px-6 pt-4">
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

          {/* Spotlight panel — second in DOM = left in RTL (55fr / wider) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div style={{ position: 'relative', width: '100%', height: '500px', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#1a1a2e' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={activeStep}
                src={s.image}
                alt={s.label}
                style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '100%', height: '100%',
                  objectFit: 'contain',
                  objectPosition: s.objectPosition ?? 'top',
                }}
              />
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: `radial-gradient(circle ${s.cr}px at ${s.cx} ${s.cy}, transparent ${s.cr}px, rgba(0,0,0,${s.opacity}) ${s.cr + 1}px)`,
              }} />
              <div style={{
                position: 'absolute',
                left: s.cx, top: s.cy,
                transform: 'translate(-50%, -50%)',
                width: s.cr * 2 + 8,
                height: s.cr * 2 + 8,
                borderRadius: '50%',
                border: '3px solid rgba(255,255,255,0.85)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.2), 0 4px 20px rgba(0,0,0,0.5)',
                pointerEvents: 'none',
              }} />
            </div>

            <div style={{ marginTop: '20px', padding: '16px', backgroundColor: 'rgba(22,183,232,0.08)', borderRight: '4px solid #16B7E8', borderRadius: '12px', textAlign: 'right' }}>
              <p style={{ color: '#0D2B4E', fontWeight: 500, fontSize: '16px', margin: 0 }}>
                {s.callout}
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
