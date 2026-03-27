"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PRINCIPLES = [
  {
    title: "אמינות",
    text: "הנתונים מוגנים ומאובטחים. המערכת בנויה על תשתית ענן אמינה, מוצפנת ומגובה.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "שקיפות",
    text: "עדכוני תוכנה ופיצ'רים חדשים בממשק נקי וברור לכל אחד בצוות.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    title: "ליווי מקומי",
    text: "צוות תמיכה שמכיר את השטח, מדבר את השפה וזמין לשיחה. אתם לא לבד בהטמעה.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function TrustSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="bg-white py-20 lg:py-28">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
            בנוי על אמון ושקיפות
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            חברות מובילות בתחומן כבר מנהלות את הנכסים שלהן עם פרשמור.
          </p>
        </motion.div>

        {/* Logo placeholder row */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="h-14 w-36 rounded-xl bg-brand-surface flex items-center justify-center text-slate-400 text-xs font-medium border border-brand-cyan/15"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              whileHover={{ borderColor: "rgba(22,183,232,0.35)", scale: 1.03, transition: { duration: 0.2 } }}
            >
              לוגו לקוח
            </motion.div>
          ))}
        </div>

        {/* Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.title}
              className="flex gap-4 items-start"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.1 }}
            >
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center">
                {p.icon}
              </div>
              <div>
                <h3 className="font-bold text-brand-primary mb-1">{p.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{p.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
