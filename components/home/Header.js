export default function Header() {
  return (
    <header className="sticky top-4 z-10 flex items-center justify-between rounded-full bg-surface px-5 py-3 shadow-[inset_0_0_0_1px_rgba(186,117,23,0.25)] sm:px-6">
      <div className="leading-tight">
        <p className="font-serif text-lg">sabeel dhar</p>
        <p className="text-xs text-muted">lead product designer</p>
      </div>

      <nav className="flex items-center gap-5 text-sm sm:gap-6">
        <a href="#work" className="text-charcoal/80 transition-colors hover:text-charcoal">
          work
        </a>
        <a href="#about" className="text-charcoal/80 transition-colors hover:text-charcoal">
          about
        </a>
        <span className="rounded-full bg-amber/15 px-3 py-1 text-xs text-amber">
          heads down · 2026
        </span>
      </nav>
    </header>
  );
}
