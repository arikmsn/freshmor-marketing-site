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
    <section id="asset-map-simulation" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            לתכנן את השבוע בחמש דקות, לא בחמש שעות
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            יומן העבודה של פרשמור הוא המוח הלוגיסטי שלכם. הוא יודע מתי הציוד צריך לחזור, ומאפשר לכם לנהל את הלו&quot;ז בצורה פשוטה.
          </p>
        </div>

        {/* Intro text */}
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-10 text-sm leading-relaxed">
          מפת הנכסים של פרשמור היא לא רק תמונה, היא כלי עבודה. המערכת מנתחת את זמני השהייה של הציוד בשטח וצובעת לכם את סדרי העדיפויות, כדי ששום מכשיר לא יישכח ושום נסיעה לא תתבצע לחינם.
        </p>

        {/* Time window selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1 gap-1">
            {TIME_WINDOWS.map((w) => (
              <button
                key={w}
                onClick={() => setActiveWindow(w)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeWindow === w
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        {/* Main content: map + text blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Text blocks — right side in RTL */}
          <div className="space-y-6">
            {TEXT_BLOCKS.map((block) => (
              <div key={block.title} className="flex gap-4">
                <div className="shrink-0 w-1.5 rounded-full bg-indigo-200 mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{block.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{block.text}</p>
                </div>
              </div>
            ))}

            {/* Summary legend */}
            <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                סיכום {activeWindow}
              </p>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                  <span className="text-sm font-medium text-slate-700">{counts.red} דחופים לאיסוף</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                  <span className="text-sm font-medium text-slate-700">{counts.yellow} בקרוב</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="text-sm font-medium text-slate-700">{counts.green} תקינים</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map — left side in RTL */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100"
            style={{
              backgroundImage:
                "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          >
            {/* Subtle map tint */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 to-slate-100/60" />

            {/* Map label */}
            <div className="absolute top-3 start-3 bg-white/80 backdrop-blur-sm text-slate-600 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 z-10">
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
                  {/* Tooltip */}
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

        </div>
      </div>
    </section>
  );
}
