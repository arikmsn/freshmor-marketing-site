"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Package, MapPin, CalendarCheck, PackageCheck } from "lucide-react";

/* ─── bullets ──────────────────────────────────────────────────────────────── */
const BULLETS = [
  "מפת נכסים דינמית בזמן אמת: תצוגה ויזואלית חכמה של כל הציוד הפרוס בשטח, צבוע לפי דחיפות וסטטוס זמינות.",
  "תיעוד QR חד ערכי: סריקה מהירה בפריסה ובאיסוף שמונעת טעויות אנוש ומבטיחה שכל פריט רשום במקומו המדויק.",
  "הטכנאים מקבלים סדר יום ברור: לאן להגיע, מה לבדוק, ומה לקחת חזרה.",
  "מניעת אובדן ובלאי: מעקב היסטורי מלא אחרי כל מכשיר שמאפשר לזהות דפוסי תקלות או אובדן בנקודות קצה ספציפיות.",
  "התקנה והטמעה תוך דקות: גמישות מקסימלית להזנת המלאי ולהתחלה מהירה בשטח, בלי פרויקט תוכנה מסובך.",
];

/* ─── diagram data ─────────────────────────────────────────────────────────── */
// viewBox "0 0 440 230" — node centers at:
//   מחסן  (55,130)  פריסה (165,70)  ביקור (275,70)  איסוף (385,130)
// Node radius: 40px (w-20 = 80px)
const NODES = [
  { id: 0, label: "מחסן",  Icon: Package,       cx: 55,  cy: 130 },
  { id: 1, label: "פריסה", Icon: MapPin,         cx: 165, cy: 70  },
  { id: 2, label: "ביקור", Icon: CalendarCheck,  cx: 275, cy: 70  },
  { id: 3, label: "איסוף", Icon: PackageCheck,   cx: 385, cy: 130 },
] as const;

const VB_W = 440;
const VB_H = 230;

// Edge-to-edge curved dashed arrows (node radius 40px)
// Arrow endpoints calculated from circle edges toward each other
const ARROWS = [
  "M 90 111 C 103 100 118 92 130 89",    // מחסן → פריסה
  "M 205 70 C 215 50 225 50 235 70",     // פריסה → ביקור
  "M 310 89 C 322 92 337 101 350 111",   // ביקור → איסוף
];

const STATUS_BADGES = [
  "3 נכסים דחופים לאיסוף",
  "הבא: ביקור באזור גוש דן",
  "47 נכסים פעילים בשטח",
];

/* ─── sub-component: the lifecycle diagram ─────────────────────────────────── */
function ProcessDiagram({
  activeNode,
  badgeIdx,
  badgeVisible,
}: {
  activeNode: number;
  badgeIdx: number;
  badgeVisible: boolean;
}) {
  return (
    <div
      className="relative rounded-3xl p-6 overflow-hidden"
      style={{
        // Layered background: dot grid over gradient
        background: [
          "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
          "linear-gradient(135deg, rgba(13,43,78,0.85) 0%, rgba(6,23,43,0.92) 100%)",
        ].join(", "),
        backgroundSize: "24px 24px, 100% 100%",
      }}
    >
      {/* padding-top aspect-ratio trick: 230/440 ≈ 52.3% */}
      <div className="relative w-full" style={{ paddingTop: "52.3%" }}>
        {/* SVG — arrows only */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <style>{`
            @keyframes dashFlow {
              from { stroke-dashoffset: 20; }
              to   { stroke-dashoffset: 0;  }
            }
          `}</style>
          {ARROWS.map((d, i) => (
            <path
              key={i}
              d={d}
              stroke="rgba(22,183,232,0.6)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="6 4"
              style={{
                animation: "dashFlow 2s linear infinite",
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </svg>

        {/* Nodes — absolutely positioned over SVG */}
        {NODES.map((node, i) => {
          const leftPct = (node.cx / VB_W) * 100;
          const topPct  = (node.cy / VB_H) * 100;
          const isActive = activeNode === i;

          return (
            <motion.div
              key={node.id}
              className="absolute flex flex-col items-center gap-2"
              style={{
                left: `${leftPct}%`,
                top:  `${topPct}%`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{ scale: isActive ? [1, 1.1, 1] : [1, 1.04, 1] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.65,
                ease: "easeInOut",
              }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  transition: "all 0.35s ease",
                  background: isActive
                    ? "rgba(255,255,255,0.25)"
                    : "rgba(255,255,255,0.10)",
                  border: isActive
                    ? "2px solid rgba(22,183,232,0.9)"
                    : "2px solid rgba(22,183,232,0.50)",
                  boxShadow: isActive
                    ? "0 0 0 6px rgba(22,183,232,0.22), 0 12px 32px rgba(22,183,232,0.30)"
                    : "0 4px 16px rgba(0,0,0,0.25)",
                }}
              >
                <node.Icon
                  className="w-8 h-8"
                  strokeWidth={1.8}
                  aria-hidden
                  style={{ color: "#16B7E8" }}
                />
              </div>
              <span className="text-white/85 text-xs font-medium whitespace-nowrap">
                {node.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Status badge — absolute bottom-start of card */}
      <div className="absolute bottom-4 start-4">
        <div
          className="flex items-center gap-2 bg-brand-cyan text-white text-sm font-medium rounded-xl px-4 py-2 shadow-md"
          style={{
            transition: "opacity 0.3s ease, transform 0.3s ease",
            opacity: badgeVisible ? 1 : 0,
            transform: badgeVisible ? "translateY(0px)" : "translateY(6px)",
          }}
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shrink-0" aria-hidden="true" />
          {STATUS_BADGES[badgeIdx]}
        </div>
      </div>
    </div>
  );
}

/* ─── check icon ───────────────────────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const [activeNode,   setActiveNode]   = useState(0);
  const [badgeIdx,     setBadgeIdx]     = useState(0);
  const [badgeVisible, setBadgeVisible] = useState(true);

  // Cycle active node every 1.5s
  useEffect(() => {
    const id = setInterval(() => {
      setActiveNode((n) => (n + 1) % NODES.length);
    }, 1500);
    return () => clearInterval(id);
  }, []);

  // Cycle status badge every 2s with fade-out → swap → fade-in
  useEffect(() => {
    const id = setInterval(() => {
      setBadgeVisible(false);
      const swap = setTimeout(() => {
        setBadgeIdx((i) => (i + 1) % STATUS_BADGES.length);
        setBadgeVisible(true);
      }, 320);
      return () => clearTimeout(swap);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const diagram = (
    <ProcessDiagram
      activeNode={activeNode}
      badgeIdx={badgeIdx}
      badgeVisible={badgeVisible}
    />
  );

  return (
    <section className="bg-brand-dark text-white pt-20 pb-8 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* ── Text column ─────────────────────────────────────────────── */}
          <motion.div
            className="space-y-7"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              שולטים על הציוד שעובד בשבילכם
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed">
              הדור הבא של ניהול מערכי שטח, עם שקיפות מלאה מפריסה ועד החזרה, ניטור חכם של נכסים וחיסכון מוכח בעלויות התפעול.
            </p>

            {/* Mobile diagram — between subtitle and bullets */}
            <div className="lg:hidden flex justify-center">
              <div className="w-full max-w-[320px]">
                {diagram}
              </div>
            </div>

            <ul className="space-y-3.5">
              {BULLETS.map((bullet, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.2 + i * 0.07,
                  }}
                >
                  <CheckIcon />
                  <span className="text-slate-200 text-sm leading-relaxed">{bullet}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 pt-1"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              <motion.a
                href="#contact"
                className="bg-brand-cyan hover:bg-brand-cyan-dark text-brand-primary font-bold px-6 py-3.5 rounded-lg text-center transition-colors text-sm"
                animate={inView ? {
                  boxShadow: [
                    "0 0 0 0px rgba(22,183,232,0)",
                    "0 0 0 8px rgba(22,183,232,0.22)",
                    "0 0 0 0px rgba(22,183,232,0)",
                  ],
                } : {}}
                transition={{ duration: 1.4, delay: 1.0 }}
              >
                לתיאום דמו והצגת יכולות
              </motion.a>
              <a
                href="#asset-map-simulation"
                className="border-2 border-brand-cyan/40 hover:border-brand-cyan text-white font-semibold px-6 py-3.5 rounded-lg text-center transition-colors text-sm"
              >
                צפו בסימולציית מפת הנכסים
              </a>
            </motion.div>
          </motion.div>

          {/* ── Desktop diagram column ──────────────────────────────────── */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            >
              {diagram}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
