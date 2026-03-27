"use client";

import { useState, FormEvent, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface FormState {
  name: string;
  phone: string;
  email: string;
  challenge: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  phone: "",
  email: "",
  challenge: "",
};

export default function ContactSection() {
  const [form, setForm]           = useState<FormState>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);

  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="bg-brand-dark py-24 lg:py-32">
      <div ref={ref} className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            מוכנים לשלוט על הציוד שלכם?
          </h2>
          <p className="text-blue-200 text-lg leading-relaxed">
            שלחו פרטים ונחזור אליכם לשיחת היכרות קצרה.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          {submitted ? (
            <div className="bg-brand-cyan/10 border border-brand-cyan/30 rounded-2xl py-14 px-8 text-center">
              <motion.div
                className="w-14 h-14 rounded-full bg-brand-cyan/20 flex items-center justify-center mx-auto mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <svg className="w-7 h-7 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="text-lg font-bold text-white mb-1">הפרטים נשלחו!</h3>
              <p className="text-blue-200 text-sm">נחזור אליכם לשיחת היכרות קצרה.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 space-y-4 shadow-xl"
            >
              {/* שם מלא */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-brand-primary" htmlFor="name">
                  שם מלא <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="שם פרטי ושם משפחה"
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition"
                />
              </div>

              {/* טלפון */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-brand-primary" htmlFor="phone">
                  טלפון <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="050-0000000"
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition"
                />
              </div>

              {/* אימייל */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-brand-primary" htmlFor="email">
                  אימייל
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.co.il"
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition"
                />
              </div>

              {/* מה האתגר הכי גדול */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-brand-primary" htmlFor="challenge">
                  מה האתגר הכי גדול שלכם היום בשטח?
                </label>
                <textarea
                  id="challenge"
                  name="challenge"
                  rows={3}
                  value={form.challenge}
                  onChange={handleChange}
                  placeholder="ספרו לנו בכמה מילים..."
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition resize-none"
                />
              </div>

              {/* Submit — pulse glow once on view */}
              <motion.button
                type="submit"
                className="w-full bg-brand-cyan hover:bg-brand-cyan-dark text-brand-primary font-bold py-3 rounded-lg transition-colors text-sm mt-2"
                animate={inView ? {
                  boxShadow: [
                    "0 0 0 0px rgba(22,183,232,0)",
                    "0 0 0 8px rgba(22,183,232,0.2)",
                    "0 0 0 0px rgba(22,183,232,0)",
                  ],
                } : {}}
                transition={{ duration: 1.4, delay: 0.8 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                שלחו פרטים ונחזור אליכם בהקדם.
              </motion.button>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}
