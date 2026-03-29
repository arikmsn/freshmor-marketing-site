"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { type TimeWindow, type Status, URGENCY_MAP, demoSites } from "./mapData";

/* ─── dynamic import — no SSR ───────────────────────────────────────────────── */
const MapComponent = dynamic(() => import("./MapInner"), { ssr: false });

/* ─── constants ─────────────────────────────────────────────────────────────── */
const TIME_WINDOWS: TimeWindow[] = ["היום", "מחר", "שבוע הבא"];

const LEGEND_CONFIG: Record<Status, { color: string; dotSize: number; label: string }> = {
  urgent: { color: "#ef4444", dotSize: 14, label: "דחופים לאיסוף" },
  soon:   { color: "#f97316", dotSize: 12, label: "בקרוב"          },
  ok:     { color: "#22c55e", dotSize: 10, label: "תקינים"         },
};

const TEXT_BLOCKS = [
  {
    title: "ניהול משימות חכם",
    text: "כל פרויקט מקבל כרטיס חכם עם תאריך התקנה ויעד ביקור. המערכת מחשבת עבורכם את דחיפות האיסוף וצובעת את המשימה בהתאם, כדי שתדעו תמיד מה קודם למה.",
    id: "block-smart",
  },
  {
    title: "גמישות תפעולית מקסימלית",
    text: "הלקוח ביקש להשאיר את המכשיר לעוד יומיים? פשוט מעדכנים את תאריך הביקור הבא בתוך הכרטיס, והמפה ויומן העבודה של כל הצוות מתעדכנים אוטומטית.",
    id: "block-flex",
  },
  {
    title: "מבט על מרכז הפיקוד",
    text: "לראות את העסק ממעוף הציפור. המפה מאפשרת לזהות צבירי עבודה, איפה יש לכם הרבה ציוד באותו אזור, כדי לתכנן מסלול איסוף אחד שחוסך זמן ודלק.",
    id: "block-overview",
  },
];

const SECTION_HEADING_ID = "asset-map-heading";

/* ─── helpers ───────────────────────────────────────────────────────────────── */
function countByStatus(window: TimeWindow): Record<Status, number> {
  const counts: Record<Status, number> = { urgent: 0, soon: 0, ok: 0 };
  demoSites.forEach((site) => {
    counts[URGENCY_MAP[window][site.id]]++;
  });
  return counts;
}

function PlayIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

/* ─── component ─────────────────────────────────────────────────────────────── */
export default function AssetMapSimulation() {
  const [activeWindow, setActiveWindow] = useState<TimeWindow>("היום");
  const [isPlaying, setIsPlaying]       = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.25 });

  const counts = countByStatus(activeWindow);

  // Auto-playback: 2-second intervals between time windows
  useEffect(() => {
    if (!isPlaying) return;
    const idx     = TIME_WINDOWS.indexOf(activeWindow);
    const nextIdx = (idx + 1) % TIME_WINDOWS.length;
    const id = setTimeout(() => setActiveWindow(TIME_WINDOWS[nextIdx]), 2000);
    return () => clearTimeout(id);
  }, [isPlaying, activeWindow]);

  function handleWindowClick(w: TimeWindow) {
    setIsPlaying(false);
    setActiveWindow(w);
  }

  function togglePlay() {
    setIsPlaying((p) => !p);
  }

  return (
    <section
      id="asset-map-simulation"
      ref={sectionRef}
      className="bg-white py-20 lg:py-28 scroll-mt-16"
      role="region"
      aria-labelledby={SECTION_HEADING_ID}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 id={SECTION_HEADING_ID} className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
            לתכנן את השבוע בחמש דקות, לא בחמש שעות
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            יומן העבודה של פרשמור הוא המוח הלוגיסטי שלכם. הוא יודע מתי הציוד צריך לחזור, ומאפשר לכם לנהל את הלו&quot;ז בצורה פשוטה.
          </p>
          <p className="text-sm text-slate-500 mt-3 leading-relaxed">
            מפת הנכסים של פרשמור היא לא רק תמונה, היא כלי עבודה. המערכת מנתחת את זמני השהייה של הציוד בשטח וצובעת לכם את סדרי העדיפויות.
          </p>
        </motion.div>

        {/* Product card */}
        <motion.div
          className="rounded-3xl border border-brand-cyan/20 overflow-hidden"
          style={{ background: "linear-gradient(145deg, #F0F8FF 0%, #e8f4fc 100%)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="p-5 sm:p-8 lg:p-10">

            {/* ── Row 1: eyebrow label — right-aligned, alone ─────────────── */}
            <div className="flex items-center justify-end gap-2.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-cyan shrink-0" aria-hidden="true" />
              <span className="text-sm font-semibold text-brand-primary/70 tracking-wide">
                מפת הנכסים בפעולה
              </span>
              {isPlaying && (
                <span className="flex items-center gap-1 text-xs text-brand-cyan font-semibold" role="status" aria-live="polite">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" aria-hidden="true" />
                  סיור פעיל
                </span>
              )}
            </div>

            {/* ── Row 2: date tabs centered ────────────────────────────────── */}
            <div className="flex justify-center mb-6">
              <div
                className="inline-flex rounded-xl border border-brand-cyan/25 bg-white/80 p-1 gap-1 shadow-sm"
                role="group"
                aria-label="בחרו טווח זמן להצגה במפה"
              >
                {TIME_WINDOWS.map((w) => (
                  <button
                    key={w}
                    onClick={() => handleWindowClick(w)}
                    aria-pressed={activeWindow === w}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      activeWindow === w
                        ? "bg-brand-primary text-white shadow-sm"
                        : "text-brand-primary hover:text-brand-primary/70"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Row 3: map (left) + text blocks (right) ─────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-start">

              {/* Map column — lg:order-last = left side in RTL */}
              <div className="lg:order-last flex flex-col gap-4">

                {/* Map container */}
                <div
                  className="relative w-full rounded-2xl overflow-hidden border border-brand-cyan/25 shadow-sm"
                  style={{ height: "300px" }}
                  aria-label="מפת נכסים אינטראקטיבית של אזור גוש דן"
                >
                  <MapComponent activeWindow={activeWindow} />

                  {/* Play/pause button — absolute overlay bottom-left */}
                  <div className="absolute bottom-4 left-4 z-[1000] flex flex-col items-center gap-1">
                    <div className="relative">
                      {isPlaying && (
                        <span
                          className="absolute inset-0 rounded-full animate-ping"
                          style={{ background: "rgba(22,183,232,0.35)" }}
                          aria-hidden="true"
                        />
                      )}
                      <button
                        onClick={togglePlay}
                        aria-label={isPlaying ? "עצור סיור אוטומטי" : "הפעל סיור אוטומטי במפה"}
                        aria-pressed={isPlaying}
                        className="relative w-12 h-12 rounded-full bg-brand-cyan text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none ring-2 ring-white ring-offset-2 ring-offset-transparent"
                      >
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                      </button>
                    </div>
                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap bg-white/80 px-2 py-0.5 rounded-full">
                      סיור אוטומטי
                    </span>
                  </div>
                </div>

                {/* ── Row 4: summary legend — stays below the map ─────────── */}
                <motion.div
                  className="bg-white border border-brand-cyan/25 rounded-2xl px-5 py-4 shadow-sm"
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  aria-live="polite"
                  aria-label="סיכום מצב נכסים"
                >
                  <p className="text-xs font-semibold text-brand-primary/60 uppercase tracking-wider mb-3">
                    סיכום{" "}
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={activeWindow}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {activeWindow}
                      </motion.span>
                    </AnimatePresence>
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {(["urgent", "soon", "ok"] as Status[]).map((s) => {
                      const { color, dotSize, label } = LEGEND_CONFIG[s];
                      return (
                        <div key={s} className="flex items-center gap-2">
                          <span
                            className="rounded-full shrink-0"
                            style={{ width: dotSize, height: dotSize, backgroundColor: color }}
                            aria-hidden="true"
                          />
                          <span className="text-sm font-medium text-slate-700">
                            <AnimatePresence mode="wait">
                              <motion.span
                                key={`${s}-${activeWindow}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                              >
                                {counts[s]}
                              </motion.span>
                            </AnimatePresence>
                            {" "}{label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

              </div>

              {/* Text blocks — lg:order-first = right side in RTL, aligned to top of map */}
              <div className="lg:order-first flex flex-col justify-center gap-6">
                {TEXT_BLOCKS.map((block, i) => (
                  <motion.div
                    key={block.id}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="shrink-0 w-1.5 rounded-full bg-brand-cyan mt-1" aria-hidden="true" />
                    <div>
                      <h3 className="font-bold text-brand-primary mb-1">{block.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{block.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
