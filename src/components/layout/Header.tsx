export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <span className="text-2xl font-bold text-indigo-700 tracking-tight">פרשמור</span>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#who-it-is-for" className="hover:text-indigo-700 transition-colors">למי זה מיועד</a>
            <a href="#asset-map-simulation" className="hover:text-indigo-700 transition-colors">סימולציית מפה</a>
            <a href="#how-it-works" className="hover:text-indigo-700 transition-colors">איך זה עובד</a>
            <a href="#contact" className="hover:text-indigo-700 transition-colors">צור קשר</a>
          </nav>

          <a
            href="#contact"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            לתיאום דמו
          </a>
        </div>
      </div>
    </header>
  );
}
