export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center p-16">
      <div className="rounded-xl bg-surface p-12 text-center">
        <h1 className="font-serif text-4xl text-charcoal">sabeel dhar</h1>
        <p className="mt-2 font-sans text-sm text-muted">
          design tokens are wired up — fonts, colors, radius.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <span className="rounded-full bg-amber px-3 py-1 text-xs text-white">amber</span>
          <span className="rounded-full bg-olive px-3 py-1 text-xs text-white">olive</span>
          <span className="rounded-full bg-terracotta px-3 py-1 text-xs text-white">terracotta</span>
        </div>
      </div>
    </main>
  );
}
