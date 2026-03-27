"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

type Urgency = "red" | "yellow" | "green";
type TimeWindow = "היום" | "מחר" | "שבוע הבא";

interface Site {
  id: number;
  name: string;
  type: string;     // equipment type (for tooltip)
  x: number;        // % from visual left
  y: number;        // % from visual top
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
  },
  {
    title: "גמישות תפעולית מקסימלית",
    text: "הלקוח ביקש להשאיר את המכשיר לעוד יומיים? פשוט מעדכנים את תאריך הביקור הבא בתוך הכרטיס, והמפה ויומן העבודה של כל הצוות מתעדכנים אוטומטית.",
  },
  {
    title: "מבט על מרכז הפיקוד",
    text: "לראות את העסק ממעוף הציפור. המפה מאפשרת לזהות צבירי עבודה, איפה יש לכם הרבה ציוד באותו אזור, כדי לתכנן מסלול איסוף אחד שחוסך זמן ודלק.",
  },
];

function countByUrgency(window: TimeWindow): Record<Urgency, number> {
  const counts: Record<Urgency, number> = { red: 0, yellow: 0, green: 0 };
  Object.values(URGENCY_MAP[window]).forEach((u) => counts[u]++);
  return counts;
}

function PlayIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

export default function AssetMapSimulation() {
  const [activeWindow, setActiveWindow] = useState<TimeWindow>("היום");
  const [activeSite, setActiveSite]     = useState<number | null>(null);
  const [isPlaying, setIsPlaying]       = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.25 });

  const urgency = URGENCY_MAP[activeWindow];
  const counts  = countByUrgency(activeWindow);

  // ── Auto-playback ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying) return;
    const idx     = TIME_WINDOWS.indexOf(activeWindow);
    const nextIdx = (idx + 1) % TIME_WINDOWS.length;
    const id = setTimeout(() => setActiveWindow(TIME_WINDOWS[nextIdx]), 1600);
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
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ──────────────────────────────────────────────── */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
            לתכנן את השבוע בחמש דקות, לא בחמש שעות
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            יומן העבודה של פרשמור הוא המוח הלוגיסטי שלכם. הוא יודע מתי הציוד צריך לחזור, ומאפשר לכם לנהל את הלו&quot;ז בצורה פשוטה.
          </p>
          <p className="text-sm text-slate-500 mt-3 leading-relaxed">
            מפת הנכסים של פרשמור היא לא רק תמונה, היא כלי עבודה. המערכת מנתחת את זמני השהייה של הציוד בשטח וצובעת לכם את סדרי העדיפויות.
          </p>
        </motion.div>

        {/* ── Product card — wraps the entire interactive area ────────────── */}
        <motion.div
          className="rounded-3xl border border-brand-cyan/20 overflow-hidden"
          style={{ background: "linear-gradient(145deg, #F0F8FF 0%, #e8f4fc 100%)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Card inner padding */}
          <div className="p-5 sm:p-8 lg:p-10">

            {/* ── Card header: eyebrow label + time controls in one unified row ── */}
            {/* On mobile: stacks to two rows (label above, controls below).        */}
            {/* On desktop: single row with label on the right, controls on the left. */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7">
              {/* Eyebrow label (RTL: appears on the right) */}
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-brand-cyan shrink-0" />
                <span className="text-sm font-semibold text-brand-primary/70 tracking-wide">
                  מפת הנכסים בפעולה
                </span>
                {isPlaying && (
                  <span className="flex items-center gap-1 text-xs text-brand-cyan font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                    מצגת פעילה
                  </span>
                )}
              </div>
              {/* Time-window buttons + play/pause */}
              <div className="flex items-center gap-3">
                <div className="inline-flex rounded-xl border border-brand-cyan/25 bg-white/80 p-1 gap-1 shadow-sm">
                  {TIME_WINDOWS.map((w) => (
                    <button
                      key={w}
                      onClick={() => handleWindowClick(w)}
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
                {/* Play / Pause */}
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "השהה" : "הפעל חיזרה אוטומטית"}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border shadow-sm ${
                    isPlaying
                      ? "bg-brand-primary text-white border-brand-primary"
                      : "bg-white text-brand-primary border-brand-cyan/25 hover:border-brand-cyan/50"
                  }`}
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
              </div>
            </div>

            {/*
              Two-column grid on desktop.
              DOM order drives mobile: map first, then legend, then text blocks.
              lg:order-* swaps them visually on desktop (map = left / text = right in RTL).
            */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-center">

              {/* ── Interactive module (DOM first → mobile top / desktop left) ── */}
              <div className="lg:order-last flex flex-col gap-4">

                {/* 2. Map card */}
                <div
                  className="relative w-full h-[260px] sm:h-[320px] lg:h-auto lg:aspect-[4/3] rounded-2xl overflow-hidden border border-brand-cyan/25 bg-white shadow-sm"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #C8E6F5 1px, transparent 1px), linear-gradient(to bottom, #C8E6F5 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                >
                  {/* Subtle tint */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-white/60" />

                  {/* Region label */}
                  <div className="absolute top-3 start-3 bg-white/90 backdrop-blur-sm text-brand-primary text-xs font-medium px-3 py-1.5 rounded-lg border border-brand-cyan/20 z-10">
                    אזור גוש דן
                  </div>

                  {/* Site dots */}
                  {SITES.map((site, idx) => {
                    const u        = urgency[site.id];
                    const isActive = activeSite === site.id;

                    return (
                      <motion.div
                        key={site.id}
                        className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        style={{ left: `${site.x}%`, top: `${site.y}%` }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.3 + idx * 0.07, duration: 0.45, type: "spring", stiffness: 300 }}
                        onMouseEnter={() => setActiveSite(site.id)}
                        onMouseLeave={() => setActiveSite(null)}
                        onClick={() => setActiveSite(isActive ? null : site.id)}
                      >
                        <motion.div
                          className="w-5 h-5 rounded-full flex items-center justify-center"
                          animate={{
                            backgroundColor: DOT_RING[u],
                            scale: isActive ? 1.5 : 1,
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          <motion.div
                            className="w-3 h-3 rounded-full"
                            animate={{ backgroundColor: DOT_BG[u] }}
                            transition={{ duration: 0.4 }}
                          />
                        </motion.div>

                        {/* Tooltip */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              className="absolute bottom-7 left-1/2 -translate-x-1/2 w-44 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-20"
                              initial={{ opacity: 0, y: 6, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6, scale: 0.95 }}
                              transition={{ duration: 0.15 }}
                            >
                              <p className="font-bold text-brand-primary text-xs leading-tight">{site.name}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">{site.type}</p>
                              <span
                                className={`mt-2 inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full ${TOOLTIP_BADGE[u]}`}
                              >
                                {URGENCY_LABELS[u]}
                              </span>
                              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-slate-200 rotate-45" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>

                {/* 3. Legend / summary — white bg to stand out from the card's light-blue */}
                <motion.div
                  className="bg-white border border-brand-cyan/25 rounded-2xl px-5 py-4 shadow-sm"
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7, duration: 0.5 }}
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
                        <span className={`w-3 h-3 rounded-full shrink-0 ${LEGEND_DOT[u]}`} />
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
              {/* ── end interactive module ────────────────────────────────── */}

              {/* ── Text blocks (DOM second → desktop right in RTL) ──────────── */}
              <div className="lg:order-first space-y-6">
                {TEXT_BLOCKS.map((block, i) => (
                  <motion.div
                    key={block.title}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="shrink-0 w-1.5 rounded-full bg-brand-cyan mt-1" />
                    <div>
                      <h3 className="font-bold text-brand-primary mb-1">{block.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{block.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* ── end text blocks ─────────────────────────────────────────── */}

            </div>
          </div>
        </motion.div>
        {/* ── end product card ───────────────────────────────────────────────── */}

      </div>
    </section>
  );
}
