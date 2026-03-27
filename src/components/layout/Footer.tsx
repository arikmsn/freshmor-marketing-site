export default function Footer() {
  return (
    <footer className="bg-brand-dark text-slate-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">

          {/* Right column (RTL start): Brand */}
          <div className="space-y-3">
            <p className="text-xl font-bold text-white">פרשמור</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              ניהול מערכי שטח חכם. שקיפות מלאה מהפריסה ועד החזרה.
            </p>
          </div>

          {/* Middle column: Quick nav */}
          <div className="space-y-4">
            <p className="text-xs font-semibold text-white uppercase tracking-widest">ניווט מהיר</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#who-it-is-for" className="hover:text-brand-cyan transition-colors">
                  למי זה מיועד
                </a>
              </li>
              <li>
                <a href="#asset-map-simulation" className="hover:text-brand-cyan transition-colors">
                  סימולציית מפת נכסים
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-brand-cyan transition-colors">
                  איך זה עובד
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-brand-cyan transition-colors">
                  צור קשר
                </a>
              </li>
            </ul>
          </div>

          {/* Left column (RTL end): Contact */}
          <div className="space-y-4">
            <p className="text-xs font-semibold text-white uppercase tracking-widest">יצירת קשר</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="mailto:info@freshmor.co.il" className="hover:text-brand-cyan transition-colors">
                  info@freshmor.co.il
                </a>
              </li>
              <li className="text-slate-400">ישראל</li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-slate-500">
          © 2026 פרשמור. כל הזכויות שמורות.
        </div>
      </div>
    </footer>
  );
}
