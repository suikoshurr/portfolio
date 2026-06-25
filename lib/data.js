// Homepage content. Swap placeholder copy for real copy as you write it —
// nothing here needs touching code structure, just these values.

export const workEntries = [
  {
    company: "Progress ShareFile",
    role: "Lead product designer",
    dates: "2023 — now",
    description:
      "The most trusted file-sharing and client collaboration platform for 90,000+ SMBs across accounting, construction, finance, legal, and more.",
    scope:
      "Lead Work Management vertical · Design System · Strategy · Research · Accessibility",
    status: "In production",
    projectCount: 4,
    gated: true,
    accent: "amber",
    logo: "/logos/innovaccer.png",
    logoSize: 30,
  },
  {
    company: "Innovaccer",
    role: "Product designer - II",
    dates: "2021 — 2023",
    description:
      "Helps hospitals pull scattered patient data — records, labs, claims — into one unified view, so care teams can spot problems and act faster.",
    scope: "Platform Components · IAM · Research · Accessibility",
    status: "Shipped",
    projectCount: 2,
    gated: true,
    accent: "olive",
    logo: "/logos/sharefile.png",
    logoSize: 30,
    logoOffsetX: 2,
  },
  {
    company: "Lollypop Studio",
    role: "UX designer",
    dates: "2020 — 2021",
    description:
      "India's leading design studio — a driving force behind the design-first shift across Indian software.",
    scope: "UX research · UI design · client delivery",
    status: "Shipped",
    projectCount: 2,
    gated: false,
    accent: "terracotta",
    logo: "/logos/lollypop.png",
  },
  {
    company: "SAHI",
    role: "UX designer",
    dates: "2021",
    description:
      "Built for serious traders. I joined at the pre-seed stage, laying the foundation for a trading platform built to go the distance.",
    scope: "0 to 1 product design · pitch deck · prototyping",
    status: "Pre-seed",
    projectCount: 1,
    gated: false,
    accent: "amber",
    logo: "/logos/sahi.jpeg",
  },
];

// Career timeline — chronological, mirrors the work section's dates/accents.
export const careerTimeline = [
  {
    company: "Urban Company",
    role: "Partner experience specialist",
    dates: "2018 — 2019",
    tags: "Partner ops · UX research",
    accent: "amber",
  },
  {
    company: "Lollypop Studio",
    role: "UX designer",
    dates: "2020 — 2021",
    tags: "E-commerce · logistics",
    accent: "terracotta",
  },
  {
    company: "Innovaccer",
    role: "Product designer - II",
    dates: "2021 — 2023",
    tags: "Healthcare · compliance",
    accent: "olive",
  },
  {
    company: "Progress ShareFile",
    role: "Senior → Lead product designer",
    dates: "2023 — now",
    tags: "File sharing · Client collaborations",
    accent: "amber",
    current: true,
  },
];

// Real bio — career throughline from Urban Company to ShareFile.
export const aboutParagraphs = [
  "Most of design happens before anyone opens Figma — getting a room to agree on the actual problem, untangling ambiguity, aligning teams that don't share a time zone. That's the part I'm good at.",
  "What I build after that has to earn its place: it has to hold up for the person using it, not just look right in a deck.",
];

// Real peer quotes. `photo` is optional (path under `public/`); omit it to
// fall back to an initials badge. `accent` rotates through the site's
// amber/olive/terracotta trio.
export const testimonials = [
  {
    quote:
      "Sabeel is one of the most talented designers I've worked with — a strong collaborator with an impressive blend of visual craft, intuitive interaction design, and sharp UX thinking.",
    name: "Sumedha Panwar",
    role: "Product @ Okta | ShareFile | ISB | SAP Labs",
    photo: "/photos/testimonials/sumedha-panwar.webp",
    accent: "amber",
  },
  {
    quote:
      "Sabeel has a comprehensive grasp of the design process and a rare ability to read the room and adapt. His communication is excellent, and his foresight into how design translates into real products is invaluable.",
    name: "Harshavardhan Kore",
    role: "Product Design Lead",
    photo: "/photos/testimonials/harshavardhan-kore.webp",
    accent: "olive",
  },
  {
    quote:
      "Sabeel's design knowledge is commendable — he crafts beautiful experiences, solves problems skilfully, and consistently delivers fast, research-driven outputs.",
    name: "Rose Mary Mali",
    role: "Staff Design Program Manager, ServiceNow",
    photo: "/photos/testimonials/rose-mary-mali.webp",
    accent: "terracotta",
  },
  {
    quote:
      "Sabeel's UI/UX work brought our product to life with clean aesthetic sensibility. His prioritization, collaborative problem-solving, and reliability on timelines gave us real confidence.",
    name: "Akshay Aggarwal",
    role: "CMO, ex-Amazon, BCG",
    photo: "/photos/testimonials/akshay-aggarwal.webp",
    accent: "amber",
  },
];

// Where the "See more" link at the bottom of the testimonials section points.
export const testimonialsLinkedInUrl = "https://www.linkedin.com/in/sabeeldhar/details/recommendations/?detailScreenTabIndex=0";

// A few tracks I've had on, rendered as embedded Spotify players in the
// "Off duty" section. `spotifyId` is the track's Spotify ID — the embed URL is
// built from it in components/home/OffDuty.js.
export const offDutyTracks = [
  {
    label: "Stuck in my head right now",
    track: "Heaven's EP",
    artist: "J. Cole",
    spotifyId: "19h1LNf7idduUW3jBeswB8",
  },
  {
    label: "On repeat this week",
    track: "Man in the Mirror",
    artist: "Dave East",
    spotifyId: "1owyrndH115aDLZ872YHvC",
  },
  {
    label: "Recently played",
    track: "Love Again",
    artist: "Moon Soul",
    spotifyId: "31Sr3l0OKMn5gG2A1toFpj",
  },
];

// Contact rows — label on the left, the value (a link) on the right. `href`
// drives the mailto:/tel: action; the value is what's shown.
export const contactDetails = [
  {
    label: "Email",
    value: "sabeeldhar@gmail.com",
    href: "mailto:sabeeldhar@gmail.com",
  },
  {
    label: "Phone",
    value: "+91 70069 37488",
    href: "tel:+917006937488",
  },
];
