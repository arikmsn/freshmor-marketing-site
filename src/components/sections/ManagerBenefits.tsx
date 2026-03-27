const BENEFITS = [
  {
    title: "פחות בלגן תפעולי",
    text: "הסוף לגיליונות אקסל, קבצי WhatsApp ובלבול. כל הציוד במקום אחד, עם היסטוריה מלאה ותיעוד אוטומטי.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "נראות מלאה על הנכסים",
    text: "יודעים בכל רגע איפה כל פריט, מי אחראי עליו, ומתי צריך לאסוף אותו. אין עוד שאלות, יש תשובות.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    title: "פחות נסיעות לחינם",
    text: "תכנון חכם של מסלולי איסוף חוסך זמן, דלק ועלויות שעות נסיעה. כל יציאה לשטח מתוכננת ומשתלמת.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    title: "שירות לקוחות טוב יותר",
    text: "כשאתם בשליטה על הציוד, הלקוחות מקבלים שירות מדויק ואמין יותר. פחות עיכובים, יותר אמון.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
];

export default function ManagerBenefits() {
  return (
    <section className="bg-indigo-950 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            מה מנהל האופרציה מרוויח?
          </h2>
          <p className="text-indigo-300 text-lg leading-relaxed">
            פרשמור לא עוד כלי עבודה, היא מרכז הפיקוד של הצוות שלכם בשטח.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-indigo-900/50 border border-indigo-800 rounded-2xl p-6 hover:bg-indigo-900/70 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-800 text-indigo-200 mb-5">
                {benefit.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-sm text-indigo-300 leading-relaxed">{benefit.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
