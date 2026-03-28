"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Wind, Droplets, Bug, Activity, HeartPulse } from "lucide-react";

const INDUSTRIES = [
  {
    title: "מערכות בישום וטיהור אוויר",
    text: "ניהול סבבי החלפת מחסניות ותקינות מכשירים, כדי שלא תפספסו אף אתר ותבטיחו ריח מעולה 24/7.",
    Icon: Wind,
  },
  {
    title: "חברות לטיהור וייבוש נזקי מים",
    text: "מעקב אחרי יבשנים ומכשירי מדידה בנקודות קצה, כי כל יום שהמכשיר נשאר באתר, הוא כסף אבוד.",
    Icon: Droplets,
  },
  {
    title: "חברות הדברה ולוכדי מזיקים",
    text: "שליטה מלאה על פריסת מלכודות ותחנות ניטור, הסוף למלכודות שנשכחו באתר הלקוח או הלכו לאיבוד בבניין.",
    Icon: Bug,
  },
  {
    title: "בדיקות סביבתיות וניטור",
    text: "ניהול דגימות בשטח ואיסוף בזמן של חיישנים, מבטיחים שהנתונים יגיעו למעבדה בזמן, ללא עיכובים תפעוליים.",
    Icon: Activity,
  },
  {
    title: "שיקום וציוד רפואי ביתי",
    text: "הגנה על נכסים יקרים בבתי מטופלים. מעקב היסטורי שמונע אובדן ציוד ומבטיח טיפול רציף ובטוח.",
    Icon: HeartPulse,
  },
];

export default function WhoItIsFor() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="who-it-is-for" className="bg-brand-surface py-20 lg:py-28">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
            הפתרון המדויק לעסקים שהשטח הוא המחסן שלהם
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            למנהלי אופרציה שחייבים לדעת בכל רגע: איפה הציוד, מתי הוא מסיים לעבוד, ואיך להחזיר אותו הביתה במינימום עלות.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-6">
          {INDUSTRIES.map((industry, i) => (
            <motion.div
              key={industry.title}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] bg-white rounded-2xl p-6 shadow-sm border border-brand-cyan/10 cursor-default"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.07 }}
              whileHover={{
                y: -4,
                boxShadow: "0 12px 32px rgba(13,43,78,0.12)",
                borderColor: "rgba(22,183,232,0.35)",
                transition: { duration: 0.22 },
              }}
              whileFocus={{
                y: -4,
                boxShadow: "0 0 0 3px rgba(22,183,232,0.3)",
                transition: { duration: 0.22 },
              }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-brand-cyan/10 text-brand-cyan">
                <industry.Icon className="w-6 h-6" strokeWidth={1.8} aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-brand-primary mb-2">{industry.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{industry.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Closing line */}
        <motion.p
          className="mt-8 text-center text-slate-700 font-medium text-base max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          אל תתנו לציוד שלכם להפוך לנטל תפעולי. פרשמור מחזירה לכם את השליטה על הנכסים בשטח והופכת כל איסוף למהיר, חכם ומשתלם יותר.
        </motion.p>

      </div>
    </section>
  );
}
