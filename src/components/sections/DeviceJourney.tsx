"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, Lightbulb } from "lucide-react";

/* ─── step data ────────────────────────────────────────────────────────────── */
const steps = [
  {
    id: 1,
    label: "מחסן",
    description: "הציוד ממתין לפריסה",
    image: "/stuff/Main.png",
    spotlightX: "50%",
    spotlightY: "28%",
    spotlightRadius: 80,
    overlayOpacity: 0.4,
    callout: "כל הנכסים ממתינים מסודרים. פרשמור יודעת מה יוצא, מתי ולאן.",
  },
  {
    id: 2,
    label: "פריסה",
    description: "מותקן אצל הלקוח",
    image: "/stuff/WorkOrder.png",
    spotlightX: "25%",
    spotlightY: "45%",
    spotlightRadius: 80,
    overlayOpacity: 0.4,
    callout: "כרטיס עבודה מפורט לכל פריסה. הטכנאי יודע בדיוק מה לעשות.",
  },
  {
    id: 3,
    label: "ביקור",
    description: "ביקור ביניים ותיעוד",
    image: "/stuff/Jobs.png",
    spotlightX: "50%",
    spotlightY: "38%",
    spotlightRadius: 75,
    overlayOpacity: 0.4,
    callout: "יומן העבודה מתעדכן אוטומטית. אף ביקור לא נשכח.",
  },
  {
    id: 4,
    label: "החזרה",
    description: "נאסף ומוחזר למחסן",
    image: "/stuff/Map.png",
    spotlightX: "55%",
    spotlightY: "42%",
    spotlightRadius: 100,
    overlayOpacity: 0.25,
    callout: "המפה מראה בדיוק מה צריך לאסוף ואיפה. כל נסיעה שווה את הזמן.",
  },
];

/* ─── DeviceJourney ────────────────────────────────────────────────────────── */
export default function DeviceJourney() {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const inView        = useInView(sectionRef, { once: true, amount: 0.15 });
  const lastManualRef = useRef<number>(0);

  const [activeStep, setActiveStep] = useState(0);
  const [panelOpacity, setPanelOpacity] = useState(1);

  // Navigate to a step with a brief opacity fade
  function goTo(i: number) {
    if (i === activeStep) return;
    lastManualRef.current = Date.now();
    setPanelOpacity(0);
    setTimeout(() => {
      setActiveStep(i);
      setPanelOpacity(1);
    }, 200);
  }

  // Auto-advance every 4s, skips if user clicked within the last 8s
  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() - lastManualRef.current >= 8000) {
        setPanelOpacity(0);
        setTimeout(() => {
          setActiveStep((s) => (s + 1) % steps.length);
          setPanelOpacity(1);
        }, 200);
      }
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const s = steps[activeStep];

  /* ─── spotlight panel JSX (inline — not a nested component) ─────────────── */
  function spotlightPanel(minH: string, mobileRadius?: number) {
    const radius = mobileRadius ?? s.spotlightRadius;
    return (
      <div
        className="relative rounded-3xl shadow-xl overflow-hidden bg-slate-900"
        style={{ minHeight: minH }}
      >
        {/* Image + overlay wrapped for opacity fade */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transition: "opacity 0.2s ease",
            opacity: panelOpacity,
          }}
        >
          {/* Image */}
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              key={activeStep}
              src={s.image}
              alt={s.label}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          {/* Dark overlay with radial cutout */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(
                circle ${radius}px
                at ${s.spotlightX} ${s.spotlightY},
                transparent ${radius - 2}px,
                rgba(0,0,0,${s.overlayOpacity}) ${radius}px
              )`,
            }}
          />

          {/* White spotlight ring — centered on spotlight point */}
          <div
            style={{
              position: "absolute",
              left: s.spotlightX,
              top: s.spotlightY,
              transform: "translate(-50%, -50%)",
              width: radius * 2,
              height: radius * 2,
              borderRadius: "50%",
              border: "4px solid rgba(255,255,255,0.85)",
              boxShadow:
                "0 0 0 2px rgba(255,255,255,0.3), 0 8px 32px rgba(0,0,0,0.4)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Callout box — outside the fading wrapper so text doesn't flash */}
        <div className="absolute bottom-0 start-0 end-0 z-20 p-4">
          <div
            style={{ transition: "opacity 0.2s ease", opacity: panelOpacity }}
            className="bg-white shadow-md border-r-4 border-brand-cyan rounded-xl p-5 flex items-start gap-3"
          >
            <Lightbulb
              className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5"
              strokeWidth={2}
              aria-hidden
            />
            <p className="text-sm font-medium text-brand-primary leading-relaxed">
              {s.callout}
            </p>
          </div>
        </div>
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
          <div className="flex overflow-x-auto gap-2 pb-3 mb-5 justify-center">
            {steps.map((step, i) => (
              <button
                key={step.id}
                onClick={() => goTo(i)}
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
          {spotlightPanel("280px", 60)}
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
            {steps.map((step, i) => {
              const isActive = i === activeStep;
              return (
                <button
                  key={step.id}
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
                      <div
                        className={`font-bold text-sm ${
                          isActive ? "text-brand-primary" : "text-slate-600"
                        }`}
                      >
                        {step.label}
                      </div>
                      <div
                        className={`text-xs mt-0.5 ${
                          isActive ? "text-brand-mid" : "text-slate-400"
                        }`}
                      >
                        {step.description}
                      </div>
                    </div>
                    <ChevronLeft
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive
                          ? "text-brand-cyan"
                          : "text-slate-300 group-hover:text-slate-400"
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
            {spotlightPanel("420px")}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
