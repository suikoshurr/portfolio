import { marqueeIcons } from "./icons";

// Repeat the icon set enough times that one lap comfortably exceeds the
// widest container before duplicating — otherwise the track runs out and
// shows a gap before the loop restarts on wide viewports.
const LOOP_REPEATS = 4;

export default function IconMarquee() {
  const lap = Array.from({ length: LOOP_REPEATS }, () => marqueeIcons).flat();
  const icons = [...lap, ...lap]; // duplicated track for seamless loop

  return (
    <div className="marquee-pause-on-hover mt-8 overflow-hidden rounded-xl bg-surface py-5 opacity-70">
      <div className="marquee-track">
        {icons.map((Icon, i) => (
          <span key={i} className="mx-6 flex items-center">
            <Icon />
          </span>
        ))}
      </div>
    </div>
  );
}
