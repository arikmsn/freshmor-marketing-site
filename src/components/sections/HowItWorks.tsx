"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    number: "01",
    title: "שיחת היכרות",
    text: "מבינים את האתגרים הספציפיים שלכם, את סוגי הציוד שאתם מנהלים ואת תהליכי העבודה הקיימים.",
  },
  {
    number: "02",
    title: "הגדרת המערכת",
    text: "מגדירים יחד את קטגוריות הציוד, אזורי הפעילות ותהליכי העבודה. ההגדרה לוקחת שעות, לא ימים.",
  },
  {
    number: "03",
    title: "פיילוט",
    text: "מתחילים עם צוות קטן או אזור גיאוגרפי אחד, מוודאים שהמערכת עובדת בדיוק כפי שצריך ומכוונים בהתאם.",
  },
  {
    number: "04",
    title: "פריסה מלאה",
    text: "מאמנים את כל הצוות, מפרסים QR על כל הציוד ועוברים לניהול מלא עם פרשמור. תמיכה מלאה לאורך כל הדרך.",
  },
];

export default function HowItWorks() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="how-it-works" className="bg-brand-surface py-20 lg:py-28">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
            ארבעה צעדים פשוטים להתחלה
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            הטמעה חלקה בלי פרויקטים מסובכים. רוב הלקוחות פעילים בשטח תוך שבוע.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-shadow hover:shadow-lg"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.1 }}
              whileHover={{
                y: -3,
                transition: { duration: 0.2 },
              }}
            >
              {/* Top gradient stripe */}
              <div className="h-1 w-full bg-gradient-to-r from-brand-cyan to-brand-primary" aria-hidden="true" />

              {/* Card body */}
              <div className="relative p-5">
                {/* Watermark step number */}
                <span
                  className="absolute top-2 end-3 font-bold text-brand-cyan select-none pointer-events-none text-8xl leading-none"
                  style={{ opacity: 0.10 }}
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-brand-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
