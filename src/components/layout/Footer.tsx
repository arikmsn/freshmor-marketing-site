export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <p className="text-2xl font-bold text-white">פרשמור</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              ניהול מערכי שטח חכם. שקיפות מלאה מפריסה ועד החזרה.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-white uppercase tracking-wider">ניווט מהיר</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#who-it-is-for" className="hover:text-white transition-colors">למי זה מיועד</a></li>
              <li><a href="#asset-map-simulation" className="hover:text-white transition-colors">סימולציית מפת הנכסים</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">איך זה עובד</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">צור קשר</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-white uppercase tracking-wider">יצירת קשר</p>
            <ul className="space-y-2 text-sm">
              <li>info@freshmor.co.il</li>
              <li>ישראל</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © 2025 פרשמור. כל הזכויות שמורות.
        </div>
      </div>
    </footer>
  );
}
