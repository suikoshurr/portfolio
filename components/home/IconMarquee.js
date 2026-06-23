import { marqueeIcons } from "./icons";

export default function IconMarquee() {
  const icons = [...marqueeIcons, ...marqueeIcons]; // duplicated track for seamless loop

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
