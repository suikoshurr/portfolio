export default function Header() {
  return (
    <header className="flex items-center justify-between rounded-full border border-amber/30 bg-surface px-6 py-3">
      <div>
        <p className="font-serif text-lg leading-none">sabeel dhar</p>
        <p className="text-xs text-muted">lead product designer</p>
      </div>

      <nav className="flex items-center gap-6 text-sm">
        <a href="#work">work</a>
        <a href="#about">about</a>
        <span className="rounded-full bg-amber/15 px-3 py-1 text-xs text-amber">
          heads down · 2026
        </span>
      </nav>
    </header>
  );
}
