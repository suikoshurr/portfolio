// Homepage content. Swap placeholder copy for real copy as you write it —
// nothing here needs touching code structure, just these values.

export const workEntries = [
  {
    company: "Progress ShareFile",
    role: "Lead product designer",
    dates: "2023 — now",
    description:
      "Client-collaboration ecosystem for a B2B file-sharing platform",
    scope: "Strategy · cross-platform UX/UI · design system · mentorship",
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
      "Identity, access and compliance across a healthcare data platform",
    scope: "Platform UX · access control · compliance workflows",
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
      "E-commerce, eduerp and logistics across a small studio's roster",
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
      "Independent - built a trading app from scratch through pre-seed pitch",
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
  "I'm a Lead Product Designer with 7.5 years in the field. I don't start with screens — I start by getting the room to agree on what problem we're actually solving. Most of what I do is unglamorous: untangling ambiguity, aligning teams across time zones, and making sure a project has a clear shape before anyone opens Figma.",
  "Once that's settled, the craft follows a pattern I trust — design, test with real users, check it holds up for everyone, then refine. Usability and accessibility aren't a pass at the end; they're part of how I decide if something's actually done.",
];

// Placeholder — replace with real peer quotes. `photo` is optional (path under
// `public/`); omit it to fall back to an initials badge. `accent` rotates
// through the site's amber/olive/terracotta trio.
export const testimonials = [
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Working alongside them on a multi-quarter platform redesign, I saw someone who consistently pushed past the obvious first answer — asking the questions that reframed scope before a single screen got drawn. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "Name Surname",
    role: "Role",
    company: "Company",
    accent: "amber",
  },
  {
    quote:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. What stood out across the projects we shipped together was the discipline to test with real users early and often, then actually act on what came back — even when it meant reworking something we'd already signed off on. Duis aute irure dolor in reprehenderit in voluptate.",
    name: "Name Surname",
    role: "Role",
    company: "Company",
    accent: "olive",
  },
  {
    quote:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. They have a rare ability to keep cross-functional teams aligned across time zones without losing the thread on craft or accessibility — every handoff felt considered rather than rushed. Sed ut perspiciatis unde omnis iste natus error.",
    name: "Name Surname",
    role: "Role",
    company: "Company",
    accent: "terracotta",
  },
];

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

export const tools = [
  { name: "Figma", commentary: "I use it to design and prototype, end to end." },
  { name: "Claude", commentary: "I use it to think out loud and move faster." },
  { name: "Miro", commentary: "I use it to map flows and run workshops." },
  { name: "Maze", commentary: "I use it to test prototypes with real users." },
  { name: "UserZoom", commentary: "I use it to run and analyze usability studies." },
  { name: "GitHub", commentary: "I use it to track design-to-dev handoff." },
  { name: "Jira", commentary: "I use it to plan and ship in sprints." },
  { name: "Notion", commentary: "I use it to document process and decisions." },
];
