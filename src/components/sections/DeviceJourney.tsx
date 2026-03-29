"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";

/* ─── types ─────────────────────────────────────────────────────────────────── */
type StepBase = {
  label: string;
  description: string;
  image: string;
  cx: string;
  cy: string;
  opacity: number;
  objectPosition?: 'center';
  callout: string;
};
type Step =
  | (StepBase & { shape: 'circle';  r: string })
  | (StepBase & { shape: 'ellipse'; rx: string; ry: string });

/* ─── step data ────────────────────────────────────────────────────────────── */
const steps: Step[] = [
  {
    label: "מחסן",
    description: "הציוד ממתין לפריסה",
    image: "/stuff/Main.png",
    shape: 'circle', cx: '47%', cy: '35%', r: '22%',
    opacity: 0.6,
    callout: "כל הנכסים ממתינים מסודרים. פרשמור יודעת מה יוצא, מתי ולאן.",
  },
  {
    label: "פריסה",
    description: "מותקן אצל הלקוח",
    image: "/stuff/WorkOrder.png",
    shape: 'ellipse', cx: '60%', cy: '52%', rx: '45%', ry: '8%',
    opacity: 0.6,
    callout: "כרטיס עבודה מפורט לכל פריסה. הטכנאי יודע בדיוק מה לעשות.",
  },
  {
    label: "ביקור",
    description: "ביקור ביניים ותיעוד",
    image: "/stuff/Jobs.png",
    shape: 'circle', cx: '45%', cy: '30%', r: '22%',
    opacity: 0.6,
    callout: "יומן העבודה מתעדכן אוטומטית. אף ביקור לא נשכח.",
  },
  {
    label: "החזרה",
    description: "נאסף ומוחזר למחסן",
    image: "/stuff/Map.png",
    shape: 'circle', cx: '50%', cy: '55%', r: '25%',
    opacity: 0.25,
    objectPosition: 'center',
    callout: "המפה מראה בדיוק מה צריך לאסוף ואיפה. כל נסיעה שווה את הזמן.",
  },
];

/* ─── SpotlightSVG — circle or ellipse cutout via SVG mask ──────────────────── */
function SpotlightSVG({ s }: { s: Step }) {
  const maskId = "sp";
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <mask id={maskId}>
          {/* White = show dark overlay; black = transparent cutout */}
          <rect width="100%" height="100%" fill="white" />
          {s.shape === 'ellipse' ? (
            <ellipse cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} fill="black" />
          ) : (
            <circle cx={s.cx} cy={s.cy} r={s.r} fill="black" />
          )}
        </mask>
      </defs>

      {/* Dark overlay with spotlight hole */}
      <rect
        width="100%"
        height="100%"
        fill={`rgba(0,0,0,${s.opacity})`}
        mask={`url(#${maskId})`}
      />

      {/* White outline ring */}
      {s.shape === 'ellipse' ? (
        <ellipse
          cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry}
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="3"
        />
      ) : (
        <circle
          cx={s.cx} cy={s.cy} r={s.r}
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="3"
        />
      )}
    </svg>
  );
}

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
            <SpotlightSVG s={s} />
          </div>

          <div style={{ marginTop: '16px', padding: '16px', backgroundColor: 'rgba(22,183,232,0.08)', borderRight: '4px solid #16B7E8', borderRadius: '12px', textAlign: 'right' }}>
            <p style={{ color: '#0D2B4E', fontWeight: 500, fontSize: '14px', margin: 0 }}>
              {s.callout}
            </p>
          </div>
        </div>

        {/* ══ DESKTOP: image (left 55%) + step list (right 45%) ══════════ */}
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
              <SpotlightSVG s={s} />
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
