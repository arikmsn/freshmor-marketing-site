import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-brand-surface shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2.5">
            <Image
              src="/stuff/NewLogo.png"
              alt="פרשמור"
              height={36}
              width={120}
              className="h-9 w-auto object-contain"
              priority
            />
            <span className="hidden sm:inline text-lg font-bold text-brand-primary tracking-tight">
              פרשמור
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#who-it-is-for" className="hover:text-brand-primary transition-colors">למי זה מיועד</a>
            <a href="#asset-map-simulation" className="hover:text-brand-primary transition-colors">סימולציית מפה</a>
            <a href="#how-it-works" className="hover:text-brand-primary transition-colors">איך זה עובד</a>
            <a href="#contact" className="hover:text-brand-primary transition-colors">צור קשר</a>
          </nav>

          <a
            href="#contact"
            className="bg-brand-cyan hover:bg-brand-cyan-dark text-brand-primary text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
          >
            לתיאום דמו
          </a>
        </div>
      </div>
    </header>
  );
}
