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
  return (
    <section id="how-it-works" className="bg-slate-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            מפה לשם, ב-4 צעדים פשוטים
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            הטמעה חלקה בלי פרויקטים מסובכים. רוב הלקוחות פעילים בשטח תוך שבוע.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative">
              {/* Connector line (hidden on last item and mobile) */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-6 start-full w-full h-px bg-slate-200 -translate-y-px z-0" style={{ width: 'calc(100% - 3rem)', insetInlineStart: '3rem' }} />
              )}

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mb-5">
                  {step.number}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
