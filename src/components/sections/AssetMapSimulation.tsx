"use client";

import { useState } from "react";

type Urgency = "red" | "yellow" | "green";
type TimeWindow = "היום" | "מחר" | "שבוע הבא";

interface Site {
  id: number;
  name: string;
  x: number; // % from visual left
  y: number; // % from visual top
}

const SITES: Site[] = [
  { id: 1, name: "תל אביב - מרכז",  x: 38, y: 48 },
  { id: 2, name: "הרצליה",           x: 30, y: 20 },
  { id: 3, name: "פתח תקווה",        x: 57, y: 30 },
  { id: 4, name: "ראשון לציון",      x: 34, y: 65 },
  { id: 5, name: "חולון",            x: 28, y: 73 },
  { id: 6, name: "בני ברק",          x: 50, y: 40 },
  { id: 7, name: "רמת גן",           x: 47, y: 35 },
  { id: 8, name: "גבעתיים",          x: 44, y: 44 },
];

const URGENCY_MAP: Record<TimeWindow, Record<number, Urgency>> = {
  "היום":       { 1: "red",    2: "green",  3: "green",  4: "red",    5: "red",    6: "yellow", 7: "yellow", 8: "green"  },
  "מחר":        { 1: "yellow", 2: "green",  3: "green",  4: "yellow", 5: "red",    6: "yellow", 7: "green",  8: "green"  },
  "שבוע הבא":  { 1: "yellow", 2: "green",  3: "green",  4: "green",  5: "red",    6: "green",  7: "green",  8: "green"  },
};

const DOT_CLASSES: Record<Urgency, string> = {
  red:    "bg-red-500 ring-4 ring-red-300/50",
  yellow: "bg-amber-400 ring-4 ring-amber-300/50",
  green:  "bg-emerald-500 ring-4 ring-emerald-300/50",
};

const LABEL_CLASSES: Record<Urgency, string> = {
  red:    "bg-red-500 text-white",
  yellow: "bg-amber-400 text-slate-900",
  green:  "bg-emerald-500 text-white",
};

const URGENCY_LABELS: Record<Urgency, string> = {
  red:    "דחוף לאיסוף",
  yellow: "בקרוב",
  green:  "תקין",
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

export default function AssetMapSimulation() {
  const [activeWindow, setActiveWindow] = useState<TimeWindow>("היום");
  const [hoveredSite, setHoveredSite] = useState<number | null>(null);
  const urgency = URGENCY_MAP[activeWindow];
  const counts = countByUrgency(activeWindow);

  return (
    /* scroll-mt-16 accounts for the sticky header height so the anchor lands correctly */
    <section id="asset-map-simulation" className="bg-white py-20 lg:py-28 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
            לתכנן את השבוע בחמש דקות, לא בחמש שעות
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            יומן העבודה של פרשמור הוא המוח הלוגיסטי שלכם. הוא יודע מתי הציוד צריך לחזור, ומאפשר לכם לנהל את הלו&quot;ז בצורה פשוטה.
          </p>
          <p className="text-sm text-slate-500 mt-3 leading-relaxed">
            מפת הנכסים של פרשמור היא לא רק תמונה, היא כלי עבודה. המערכת מנתחת את זמני השהייה של הציוד בשטח וצובעת לכם את סדרי העדיפויות.
          </p>
        </div>

        {/*
          Two-column grid on desktop, single column on mobile.

          DOM order (drives mobile layout):
            1. Interactive module (buttons → map → legend)   ← always on top on mobile
            2. Text blocks                                    ← below on mobile

          On desktop (lg), lg:order-* swaps them:
            - Interactive module → lg:order-last  = visual LEFT column  (RTL end)
            - Text blocks        → lg:order-first = visual RIGHT column (RTL start)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-center">

          {/* ── Interactive module ─────────────────────────────────────── */}
          <div className="lg:order-last flex flex-col gap-4">

            {/* 1. Time-window buttons */}
            <div className="flex justify-center">
              <div className="inline-flex rounded-xl border border-brand-cyan/20 bg-brand-surface p-1 gap-1">
                {TIME_WINDOWS.map((w) => (
                  <button
                    key={w}
                    onClick={() => setActiveWindow(w)}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
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

            {/* 2. Map card */}
            <div
              className="relative w-full h-[260px] sm:h-[320px] lg:h-auto lg:aspect-[4/3] rounded-2xl overflow-hidden border border-brand-cyan/20 bg-brand-surface"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #C8E6F5 1px, transparent 1px), linear-gradient(to bottom, #C8E6F5 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            >
              {/* Subtle tint */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-brand-surface/80" />

              {/* Region label — top-start (right in RTL) */}
              <div className="absolute top-3 start-3 bg-white/90 backdrop-blur-sm text-brand-primary text-xs font-medium px-3 py-1.5 rounded-lg border border-brand-cyan/20 z-10">
                אזור גוש דן
              </div>

              {/* Site dots */}
              {SITES.map((site) => {
                const u = urgency[site.id];
                const isHovered = hoveredSite === site.id;
                return (
                  <div
                    key={site.id}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ left: `${site.x}%`, top: `${site.y}%` }}
                    onMouseEnter={() => setHoveredSite(site.id)}
                    onMouseLeave={() => setHoveredSite(null)}
                  >
                    <div
                      className={`w-4 h-4 rounded-full transition-all duration-500 ${DOT_CLASSES[u]} ${
                        isHovered ? "scale-150" : ""
                      }`}
                    />
                    {isHovered && (
                      <div
                        className={`absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold px-2 py-1 rounded-lg shadow-lg z-20 ${LABEL_CLASSES[u]}`}
                      >
                        {site.name} — {URGENCY_LABELS[u]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 3. Legend / summary */}
            <div className="bg-brand-surface border border-brand-cyan/20 rounded-2xl px-5 py-4">
              <p className="text-xs font-semibold text-brand-primary/60 uppercase tracking-wider mb-3">
                סיכום {activeWindow}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{counts.red} דחופים לאיסוף</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{counts.yellow} בקרוב</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{counts.green} תקינים</span>
                </div>
              </div>
            </div>

          </div>
          {/* ── end interactive module ──────────────────────────────────── */}

          {/* ── Text blocks ─────────────────────────────────────────────── */}
          <div className="lg:order-first space-y-6">
            {TEXT_BLOCKS.map((block) => (
              <div key={block.title} className="flex gap-4">
                <div className="shrink-0 w-1.5 rounded-full bg-brand-cyan mt-1" />
                <div>
                  <h3 className="font-bold text-brand-primary mb-1">{block.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{block.text}</p>
                </div>
              </div>
            ))}
          </div>
          {/* ── end text blocks ─────────────────────────────────────────── */}

        </div>
      </div>
    </section>
  );
}
