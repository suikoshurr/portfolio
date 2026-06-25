import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-4 z-10 flex items-center justify-between rounded-full bg-surface px-5 py-3 shadow-[inset_0_0_0_1px_rgba(186,117,23,0.25)] sm:px-6">
      <a href="#top" className="group flex items-center gap-2.5 leading-tight">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-base">
          <Image src="/logos/brand-mark.png" alt="Logo" width={22} height={22} />
        </span>
        {/* On hover the name/title slides away from the logo. Transform-only so
            it shifts smoothly without nudging the nav or anything else. */}
        <span className="transition-transform duration-300 ease-out group-hover:translate-x-1.5">
          <p className="font-serif text-lg">Sabeel Dhar</p>
          <p className="text-xs text-muted">Lead Product Designer</p>
        </span>
      </a>

      <nav className="flex items-center gap-5 text-sm sm:gap-6">
        <a
          href="#work"
          className="group relative text-charcoal/80 transition-colors hover:text-charcoal"
        >
          Work
          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-charcoal transition-transform duration-200 ease-out group-hover:scale-x-100" />
        </a>
        <a
          href="#about"
          className="group relative text-charcoal/80 transition-colors hover:text-charcoal"
        >
          About
          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-charcoal transition-transform duration-200 ease-out group-hover:scale-x-100" />
        </a>
        <span className="rounded-full bg-amber/15 px-3 py-1 text-xs text-amber">
          Heads down · 2026
        </span>
      </nav>
    </header>
  );
}
