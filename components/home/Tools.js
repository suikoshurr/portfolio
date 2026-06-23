import { tools } from "@/lib/data";

// Hover/tap-to-reveal commentary added in a later step — this is structure only.
export default function Tools() {
  return (
    <section className="mt-12">
      <h2 className="text-sm text-muted">— tools</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="flex items-center justify-center rounded-xl bg-surface py-6 text-sm text-muted"
          >
            {tool.name}
          </div>
        ))}
      </div>
    </section>
  );
}
