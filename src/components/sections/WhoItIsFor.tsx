const INDUSTRIES = [
  {
    title: "מערכות בישום וטיהור אוויר",
    text: "ניהול סבבי החלפת מחסניות ותקינות מכשירים, כדי שלא תפספסו אף אתר ותבטיחו ריח מעולה 24/7.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    title: "חברות לטיהור וייבוש נזקי מים",
    text: "מעקב אחרי יבשנים ומכשירי מדידה בנקודות קצה, כי כל יום שהמכשיר נשאר באתר, הוא כסף אבוד.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1M4.22 4.22l.707.707M18.364 18.364l.707.707M1 12h1m20 0h1M4.22 19.778l.707-.707M18.364 5.636l.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
      </svg>
    ),
  },
  {
    title: "חברות הדברה ולוכדי מזיקים",
    text: "שליטה מלאה על פריסת מלכודות ותחנות ניטור, הסוף למלכודות שנשכחו באתר הלקוח או הלכו לאיבוד בבניין.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "בדיקות סביבתיות וניטור",
    text: "ניהול דגימות בשטח ואיסוף בזמן של חיישנים, מבטיחים שהנתונים יגיועו למעבדה בזמן, ללא עיכובים תפעוליים.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "שיקום וציוד רפואי ביתי",
    text: "הגנה על נכסים יקרים בבתי מטופלים. מעקב היסטורי שמונע אובדן ציוד ומבטיח טיפול רציף ובטוח.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

export default function WhoItIsFor() {
  return (
    <section id="who-it-is-for" className="bg-brand-surface py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
            הפתרון המדויק לעסקים שהשטח הוא המחסן שלהם
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            למנהלי אופרציה שחייבים לדעת בכל רגע: איפה הציוד, מתי הוא מסיים לעבוד, ואיך להחזיר אותו הביתה במינימום עלות.
          </p>
        </div>

        {/* Cards — flex-wrap with justify-center so the last row (2 cards) is always centered */}
        <div className="flex flex-wrap justify-center gap-6">
          {INDUSTRIES.map((industry) => (
            <div
              key={industry.title}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] bg-white rounded-2xl p-6 shadow-sm border border-brand-cyan/10 hover:shadow-md hover:border-brand-cyan/30 transition-all"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-brand-cyan/10 text-brand-cyan">
                {industry.icon}
              </div>
              <h3 className="text-base font-bold text-brand-primary mb-2">{industry.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{industry.text}</p>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <p className="mt-12 text-center text-slate-700 font-medium text-base max-w-3xl mx-auto leading-relaxed">
          אל תתנו לציוד שלכם להפוך לנטל תפעולי. פרשמור מחזירה לכם את השליטה על הנכסים בשטח והופכת כל איסוף למהיר, חכם ומשתלם יותר.
        </p>

      </div>
    </section>
  );
}
