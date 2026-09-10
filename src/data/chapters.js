/**
 * Presentation Chapters Registry
 * Defines the sequential acts, chapter titles, route numbers, tags, status badges, and descriptive subtitles.
 * 
 * Optional:
 * - Add, remove, or reorder chapters in the keynote sequence.
 * - Update act tags and status indicators to reflect competition season phases.
 */

export const CHAPTERS = [
  {
    id: 0,
    label: "01 // IDENTITY",
    title: "THE AWAKENING",
    subtitle: "AUTONOMOUS EXCELLENCE",
    bgPreset: "awakening",
    ariaLabel: "Act 01: The Awakening — Team Identity",
  },
  {
    id: 1,
    label: "02 // ETHOS",
    title: "ENGINEERING MANIFESTO",
    subtitle: "RIGOR & DISCIPLINE",
    bgPreset: "manifesto",
    ariaLabel: "Act 02: Engineering Manifesto",
  },
  {
    id: 2,
    label: "03 // DISCIPLINES",
    title: "THE THREE PILLARS",
    subtitle: "TRI-DISCIPLINARY ARCHITECTURE",
    bgPreset: "pillars",
    ariaLabel: "Act 03: The Three Disciplines",
  },
  {
    id: 3,
    label: "04 // HORIZON",
    title: "CULTURE & HORIZONS",
    subtitle: "THE EXPEDITION CONTINUES",
    bgPreset: "horizons",
    ariaLabel: "Act 04: Horizons & Gateway",
  },
  {
    id: 4,
    label: "05 // MATCHES",
    title: "MATCH TELEMETRY",
    subtitle: "COMPETITION DATA FEED",
    bgPreset: "matches",
    ariaLabel: "Act 05: Matches & Telemetry",
  },
  {
    id: 5,
    label: "06 // ROBOT",
    title: "3D ROBOT VIEWFRAME",
    subtitle: "INTERACTIVE CAD EXPLORER",
    bgPreset: "robot",
    ariaLabel: "Act 06: 3D Robot Viewframe",
  },
  {
    id: 6,
    label: "07 // GALLERY",
    title: "TEAM GALLERY",
    subtitle: "BEHIND THE SCENES",
    bgPreset: "gallery",
    ariaLabel: "Act 07: Team Photo Gallery",
  },
  {
    id: 7,
    label: "08 // LAB",
    title: "SYSTEM RECALIBRATION",
    subtitle: "AUTONOMOUS RESEARCH",
    bgPreset: "arcade",
    ariaLabel: "Act 08: System Recalibration",
  },
  {
    id: 8,
    label: "09 // SOCIALS",
    title: "MEDIA HUB",
    subtitle: "CONNECTED CHANNELS",
    bgPreset: "socials",
    ariaLabel: "Act 09: Media & Socials Hub",
  },
  {
    id: 9,
    label: "10 // CONTACT",
    title: "CONTACT & SPONSORS",
    subtitle: "JOIN THE MISSION",
    bgPreset: "contact",
    ariaLabel: "Act 10: Contact & Sponsors",
  },
]

export { PREVIEW_CARDS } from './horizons.js'
