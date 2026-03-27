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

          {/* ── Text column (visual RIGHT in RTL) ──────────────────────────── */}
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

            {/* ── Mobile phone — centered, 72% width, no box around it ──────── */}
            <div className="lg:hidden flex justify-center">
              <div className="w-3/4 max-w-[260px]">
                <PhoneFrame
                  src="/stuff/Main.png"
                  alt="מסך הבית של פרשמור, ניהול נכסי שטח"
                  className="w-full"
                  priority
                />
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

          {/* ── Desktop phone visual (LEFT in RTL) ─────────────────────────── */}
          {/* No containing box — just the phone with a blurred glow behind it */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              {/* Subtle cyan glow — decoration only, not a containing box */}
              <div
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(22,183,232,0.20) 0%, transparent 65%)",
                  filter: "blur(48px)",
                  transform: "scale(1.9)",
                }}
              />

              {/* Clean phone mockup — ~480px tall at this width */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                className="w-[308px]"
              >
                <PhoneFrame
                  src="/stuff/Main.png"
                  alt="מסך הבית של פרשמור, ניהול נכסי שטח"
                  className="w-full"
                  priority
                />
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
