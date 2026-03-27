"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PhoneFrame from "@/components/common/PhoneFrame";

const BULLETS = [
  "מפת נכסים דינמית בזמן אמת: תצוגה ויזואלית חכמה של כל הציוד הפרוס בשטח, צבוע לפי דחיפות וסטטוס זמינות.",
  "תיעוד QR חד ערכי: סריקה מהירה בפריסה ובאיסוף שמונעת טעויות אנוש ומבטיחה שכל פריט רשום במקומו המדויק.",
  "הטכנאים מקבלים סדר יום ברור: לאן להגיע, מה לבדוק, ומה לקחת חזרה.",
  "מניעת אובדן ובלאי: מעקב היסטורי מלא אחרי כל מכשיר שמאפשר לזהות דפוסי תקלות או אובדן בנקודות קצה ספציפיות.",
  "התקנה והטמעה תוך דקות: גמישות מקסימלית להזנת המלאי ולהתחלה מהירה בשטח, בלי פרויקט תוכנה מסובך.",
];

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

export default function Hero() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="bg-brand-dark text-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* ── Text column — visual RIGHT in RTL ──────────────────────────── */}
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

            {/* ── Mobile-only phone — between headline and bullets ─────────── */}
            {/* Visible only below lg breakpoint; desktop shows the dedicated visual column */}
            <div className="lg:hidden flex justify-center">
              <div className="relative">
                {/* Ambient cyan glow on the dark hero bg */}
                <div
                  className="absolute inset-0 -z-10"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(22,183,232,0.2) 0%, transparent 70%)",
                    filter: "blur(28px)",
                    transform: "scale(1.6)",
                  }}
                />
                {/* Framed card behind the phone for intentional composition */}
                <div className="bg-brand-primary/60 backdrop-blur-sm rounded-3xl p-5 border border-brand-cyan/20 shadow-2xl">
                  <div className="w-[200px]">
                    <PhoneFrame
                      src="/stuff/Main.png"
                      alt="מסך הבית של פרשמור, ניהול נכסי שטח"
                      priority
                    />
                  </div>
                  {/* Mini chips under the phone inside the card */}
                  <div className="flex items-center justify-between mt-3 px-1">
                    <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2.5 py-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                      <span className="text-[11px] font-semibold text-white/90">3 דחופים</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-brand-cyan/20 rounded-lg px-2.5 py-1.5">
                      <span className="text-[11px] font-semibold text-brand-cyan">47 נכסים</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ── end mobile phone ─────────────────────────────────────────── */}

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
              {/* Primary CTA — one-shot pulse glow on entry */}
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

          {/* ── Desktop-only visual column — LEFT in RTL ────────────────────── */}
          {/* Hidden on mobile; the phone is injected inline in the text column above */}
          <div className="hidden lg:flex items-center justify-center">
            {/* Intentional framing card keeps the phone from floating */}
            <div
              className="relative rounded-3xl p-8 border border-brand-cyan/20"
              style={{
                background: "linear-gradient(135deg, rgba(13,43,78,0.8) 0%, rgba(6,23,43,0.95) 100%)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(22,183,232,0.1)",
              }}
            >
              {/* Ambient glow behind phone */}
              <div
                className="absolute inset-0 -z-10 rounded-3xl"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(22,183,232,0.18) 0%, transparent 70%)",
                  filter: "blur(32px)",
                  transform: "scale(1.2)",
                }}
              />

              {/* Phone — slight tilt, enters from below */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: -4 }}
                animate={inView ? { opacity: 1, y: 0, rotate: -2 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="w-[240px]"
              >
                <PhoneFrame
                  src="/stuff/Main.png"
                  alt="מסך הבית של פרשמור, ניהול נכסי שטח"
                  priority
                />
              </motion.div>

              {/* Floating chip — urgency count */}
              <motion.div
                className="absolute -bottom-3 -left-8 flex items-center gap-2 bg-white rounded-xl shadow-2xl px-3 py-2 z-20"
                initial={{ opacity: 0, x: -18, y: 8 }}
                animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 animate-pulse" />
                <span className="text-xs font-bold text-brand-primary whitespace-nowrap">3 דחופים לאיסוף</span>
              </motion.div>

              {/* Floating chip — total assets */}
              <motion.div
                className="absolute -top-3 -right-8 bg-brand-cyan rounded-xl shadow-xl px-3 py-2 z-20"
                initial={{ opacity: 0, x: 18, y: -8 }}
                animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-xs font-bold text-brand-primary whitespace-nowrap">47 נכסים בשטח</span>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
