"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

type Urgency = "red" | "yellow" | "green";
type TimeWindow = "היום" | "מחר" | "שבוע הבא";

interface Site {
  id: number;
  name: string;
  type: string;
  x: number;
  y: number;
}

const SITES: Site[] = [
  { id: 1, name: "תל אביב מרכז",   type: "יבשן תעשייתי",  x: 38, y: 48 },
  { id: 2, name: "הרצליה",           type: "חיישן לחות",     x: 30, y: 20 },
  { id: 3, name: "פתח תקווה",        type: "מכשיר בישום",    x: 57, y: 30 },
  { id: 4, name: "ראשון לציון",      type: "לוכד מזיקים",    x: 34, y: 65 },
  { id: 5, name: "חולון",            type: "יבשן תעשייתי",  x: 28, y: 73 },
  { id: 6, name: "בני ברק",          type: "חיישן לחות",     x: 50, y: 40 },
  { id: 7, name: "רמת גן",           type: "מכשיר בישום",    x: 47, y: 35 },
  { id: 8, name: "גבעתיים",          type: "לוכד מזיקים",    x: 44, y: 44 },
];

const URGENCY_MAP: Record<TimeWindow, Record<number, Urgency>> = {
  "היום":      { 1: "red",    2: "green",  3: "green",  4: "red",    5: "red",    6: "yellow", 7: "yellow", 8: "green"  },
  "מחר":       { 1: "yellow", 2: "green",  3: "green",  4: "yellow", 5: "red",    6: "yellow", 7: "green",  8: "green"  },
  "שבוע הבא": { 1: "yellow", 2: "green",  3: "green",  4: "green",  5: "red",    6: "green",  7: "green",  8: "green"  },
};

const DOT_BG: Record<Urgency, string>   = { red: "#ef4444", yellow: "#fbbf24", green: "#10b981" };
const DOT_RING: Record<Urgency, string> = {
  red:    "rgba(239,68,68,0.3)",
  yellow: "rgba(251,191,36,0.3)",
  green:  "rgba(16,185,129,0.3)",
};

// Urgency-based dot sizes for accessibility (shape/size differentiation, not only color)
const DOT_OUTER_PX: Record<Urgency, number> = { red: 24, yellow: 20, green: 16 };
const DOT_INNER_PX: Record<Urgency, number> = { red: 14, yellow: 12, green: 10 };

const LEGEND_DOT: Record<Urgency, string> = {
  red:    "bg-red-500",
  yellow: "bg-amber-400",
  green:  "bg-emerald-500",
};

const TOOLTIP_BADGE: Record<Urgency, string> = {
  red:    "bg-red-100 text-red-700",
  yellow: "bg-amber-100 text-amber-700",
  green:  "bg-emerald-100 text-emerald-700",
};

const URGENCY_LABELS: Record<Urgency, string> = {
  red:    "חריג: דחוף לאיסוף",
  yellow: "בקרוב: לתכנן",
  green:  "בזמן: תקין",
};

const TIME_WINDOWS: TimeWindow[] = ["היום", "מחר", "שבוע הבא"];

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

function countByUrgency(window: TimeWindow): Record<Urgency, number> {
  const counts: Record<Urgency, number> = { red: 0, yellow: 0, green: 0 };
  Object.values(URGENCY_MAP[window]).forEach((u) => counts[u]++);
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

const SECTION_HEADING_ID = "asset-map-heading";

export default function AssetMapSimulation() {
  const [activeWindow, setActiveWindow] = useState<TimeWindow>("היום");
  const [activeSite, setActiveSite]     = useState<number | null>(null);
  const [isPlaying, setIsPlaying]       = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.25 });

  const urgency = URGENCY_MAP[activeWindow];
  const counts  = countByUrgency(activeWindow);

  // Auto-playback: 2-second intervals between time windows
  useEffect(() => {
    if (!isPlaying) return;
    const idx     = TIME_WINDOWS.indexOf(activeWindow);
    const nextIdx = (idx + 1) % TIME_WINDOWS.length;
    const id = setTimeout(() => setActiveWindow(TIME_WINDOWS[nextIdx]), 2000);
    return () => clearTimeout(id);
  }, [isPlaying, activeWindow]);

  function handleWindowClick(w: TimeWindow) {
    setIsPlaying(false); // manual selection stops auto-play
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

            {/* Card header: eyebrow + time selector (no play button here) */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7">
              <div className="flex items-center gap-2.5">
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
              {/* Time-window selector — manual selection stops auto-play */}
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-center">

              {/* Interactive module (DOM first → mobile top / desktop left) */}
              <div className="lg:order-last flex flex-col gap-4">

                {/* Map card */}
                <div
                  className="relative w-full h-[260px] sm:h-[320px] lg:h-auto lg:aspect-[4/3] rounded-2xl overflow-hidden border border-brand-cyan/25 bg-white shadow-sm"
                  role="img"
                  aria-label="מפת נכסים אינטראקטיבית של אזור גוש דן"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #C8E6F5 1px, transparent 1px), linear-gradient(to bottom, #C8E6F5 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-white/60" aria-hidden="true" />

                  {/* Region label */}
                  <div className="absolute top-3 start-3 bg-white/90 backdrop-blur-sm text-brand-primary text-xs font-medium px-3 py-1.5 rounded-lg border border-brand-cyan/20 z-10">
                    אזור גוש דן
                  </div>

                  {/* Site dots — urgent=large, upcoming=medium, ok=small */}
                  {SITES.map((site, idx) => {
                    const u        = urgency[site.id];
                    const isActive = activeSite === site.id;
                    const outerPx  = DOT_OUTER_PX[u];
                    const innerPx  = DOT_INNER_PX[u];

                    return (
                      <motion.button
                        key={site.id}
                        className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-full"
                        style={{ left: `${site.x}%`, top: `${site.y}%` }}
                        aria-label={`${site.name}: ${site.type}, סטטוס: ${URGENCY_LABELS[u]}`}
                        aria-expanded={isActive}
                        aria-haspopup="true"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.3 + idx * 0.07, duration: 0.45, type: "spring", stiffness: 300 }}
                        onMouseEnter={() => setActiveSite(site.id)}
                        onMouseLeave={() => setActiveSite(null)}
                        onClick={() => setActiveSite(isActive ? null : site.id)}
                      >
                        {/* Outer ring — size by urgency */}
                        <motion.div
                          className="rounded-full flex items-center justify-center"
                          animate={{
                            backgroundColor: DOT_RING[u],
                            scale: isActive ? 1.4 : 1,
                            width:  outerPx,
                            height: outerPx,
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          {/* Inner dot */}
                          <motion.div
                            className="rounded-full"
                            animate={{
                              backgroundColor: DOT_BG[u],
                              width:  innerPx,
                              height: innerPx,
                            }}
                            transition={{ duration: 0.4 }}
                          />
                        </motion.div>

                        {/* Tooltip */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              role="tooltip"
                              className="absolute bottom-7 left-1/2 -translate-x-1/2 w-44 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-20"
                              initial={{ opacity: 0, y: 6, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6, scale: 0.95 }}
                              transition={{ duration: 0.15 }}
                            >
                              <p className="font-bold text-brand-primary text-xs leading-tight">{site.name}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">{site.type}</p>
                              <span className={`mt-2 inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full ${TOOLTIP_BADGE[u]}`}>
                                {URGENCY_LABELS[u]}
                              </span>
                              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-slate-200 rotate-45" aria-hidden="true" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    );
                  })}

                  {/* ── Floating play/pause inside map — bottom-left corner ───── */}
                  <div className="absolute bottom-4 left-4 z-20 group flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      aria-label={isPlaying ? "עצור סיור אוטומטי" : "הפעל סיור אוטומטי במפה"}
                      aria-pressed={isPlaying}
                      className="w-12 h-12 rounded-full bg-brand-cyan text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none ring-2 ring-white ring-offset-2 ring-offset-transparent"
                    >
                      {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    {/* Desktop label — visible to the right of the button (RTL: left side) */}
                    <span className="hidden sm:block text-xs font-medium text-gray-500 bg-white/80 px-2 py-1 rounded-md whitespace-nowrap shadow-sm">
                      {isPlaying ? "עצור" : "הפעל סיור"}
                    </span>
                    {/* Mobile tooltip on hover */}
                    <span
                      role="tooltip"
                      className="sm:hidden absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-brand-primary text-white text-xs font-medium px-2.5 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    >
                      {isPlaying ? "עצור" : "הפעל סיור אוטומטי"}
                    </span>
                  </div>

                </div>

                {/* Legend / summary */}
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
                    {(["red", "yellow", "green"] as Urgency[]).map((u) => (
                      <div key={u} className="flex items-center gap-2">
                        <span className={`rounded-full shrink-0 ${LEGEND_DOT[u]}`}
                          style={{ width: DOT_INNER_PX[u], height: DOT_INNER_PX[u] }}
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-slate-700">
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={`${u}-${activeWindow}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              {counts[u]}
                            </motion.span>
                          </AnimatePresence>
                          {" "}{u === "red" ? "דחופים לאיסוף" : u === "yellow" ? "בקרוב" : "תקינים"}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

              </div>

              {/* Text blocks (DOM second → desktop right in RTL) */}
              <div className="lg:order-first space-y-6">
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
