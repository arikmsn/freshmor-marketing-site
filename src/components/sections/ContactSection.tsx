"use client";

import { useState, FormEvent } from "react";

interface FormState {
  company: string;
  name: string;
  phone: string;
  email: string;
  techCount: string;
  challenge: string;
}

const INITIAL_STATE: FormState = {
  company: "",
  name: "",
  phone: "",
  email: "",
  techCount: "",
  challenge: "",
};

const TECH_COUNT_OPTIONS = [
  { value: "", label: "בחרו מספר טכנאים" },
  { value: "1-3", label: "1–3 טכנאים" },
  { value: "4-10", label: "4–10 טכנאים" },
  { value: "11-25", label: "11–25 טכנאים" },
  { value: "25+", label: "יותר מ-25 טכנאים" },
];

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="bg-brand-dark py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            מוכנים לשלוט על הציוד שלכם?
          </h2>
          <p className="text-blue-200 text-lg leading-relaxed">
            שלחו פרטים ונחזור אליכם לשיחת היכרות קצרה.
          </p>
        </div>

        {submitted ? (
          /* Success state */
          <div className="bg-brand-cyan/10 border border-brand-cyan/30 rounded-2xl p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-brand-cyan/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">הפרטים התקבלו!</h3>
            <p className="text-blue-200">ניצור איתכם קשר בהקדם לשיחת היכרות.</p>
          </div>
        ) : (
          /* Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 md:p-10 space-y-5 shadow-xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* שם חברה */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-brand-primary" htmlFor="company">
                  שם חברה <span className="text-red-500">*</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  value={form.company}
                  onChange={handleChange}
                  placeholder="לדוגמה: חברת האוויר הנקי"
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition"
                />
              </div>

              {/* שם איש קשר */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-brand-primary" htmlFor="name">
                  שם איש קשר <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="שם מלא"
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition"
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
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition"
                />
              </div>

              {/* אימייל */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-brand-primary" htmlFor="email">
                  אימייל <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.co.il"
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition"
                />
              </div>
            </div>

            {/* כמה טכנאים */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-brand-primary" htmlFor="techCount">
                כמה טכנאים יש לכם? <span className="text-red-500">*</span>
              </label>
              <select
                id="techCount"
                name="techCount"
                required
                value={form.techCount}
                onChange={handleChange}
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition appearance-none"
              >
                {TECH_COUNT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* מה האתגר הכי גדול */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-brand-primary" htmlFor="challenge">
                מה האתגר הכי גדול שלכם היום בשטח?
              </label>
              <textarea
                id="challenge"
                name="challenge"
                rows={4}
                value={form.challenge}
                onChange={handleChange}
                placeholder="ספרו לנו בכמה מילים על הכאב העיקרי שאתם חווים בניהול הציוד..."
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-cyan hover:bg-brand-cyan-dark text-brand-primary font-bold py-3.5 rounded-lg transition-colors text-sm"
            >
              שלחו פרטים ונחזור אליכם לשיחת היכרות קצרה
            </button>
          </form>
        )}

      </div>
    </section>
  );
}
