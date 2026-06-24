export default function Header() {
  return (
    <header className="sticky top-4 z-10 flex items-center justify-between rounded-full bg-surface px-5 py-3 shadow-[inset_0_0_0_1px_rgba(186,117,23,0.25)] sm:px-6">
      <a href="#top" className="block leading-tight">
        <p className="font-serif text-lg">Sabeel Dhar</p>
        <p className="text-xs text-muted">Lead product designer</p>
      </a>

      <nav className="flex items-center gap-5 text-sm sm:gap-6">
        <a href="#work" className="text-charcoal/80 transition-colors hover:text-charcoal">
          Work
        </a>
        <a href="#about" className="text-charcoal/80 transition-colors hover:text-charcoal">
          About
        </a>
        <span className="rounded-full bg-amber/15 px-3 py-1 text-xs text-amber">
          Heads down · 2026
        </span>
      </nav>
    </header>
  );
}
