// Placeholder shapes — final custom icon set (7 marks) comes in a later session.
const placeholderShapes = ["◆", "+", "◈", "✶", "⬡", "◇", "✦", "◎"];

export default function IconMarquee() {
  return (
    <div className="mt-8 flex items-center gap-6 overflow-hidden rounded-xl bg-surface px-6 py-5 text-muted">
      {placeholderShapes.map((shape, i) => (
        <span key={i} className="text-lg">
          {shape}
        </span>
      ))}
    </div>
  );
}
