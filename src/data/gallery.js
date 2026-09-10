/**
 * Gallery Media Data
 * Contains photo gallery items, image URLs, categories, timestamps, and descriptive captions.
 * 
 * Optional:
 * - Replace placeholder image URLs with high-resolution team photography hosted on a CDN or cloud storage.
 * - Add new media categories (e.g. Outreach, Regionals, Build Season).
 */

export const GALLERY_IMAGES = [
  { id: "img-001", src: null, caption: "Team photo — Season 2025-2026", category: "team", date: "2025-09-01" },
  { id: "img-002", src: null, caption: "Robot MK-IV chassis assembly", category: "robot", date: "2025-10-15" },
  { id: "img-003", src: null, caption: "Competition day qualification match", category: "competition", date: "2025-11-20" },
  { id: "img-004", src: null, caption: "Pit crew in action between matches", category: "competition", date: "2025-11-20" },
  { id: "img-005", src: null, caption: "Intake subsystem CAD design session", category: "workshop", date: "2025-08-10" },
  { id: "img-006", src: null, caption: "Autonomous 60Hz AprilTag vision testing", category: "robot", date: "2025-10-25" },
  { id: "img-007", src: null, caption: "Submersible climbing mechanism stress test", category: "workshop", date: "2025-11-05" },
  { id: "img-008", src: null, caption: "Awards ceremony at Bucharest League Meet", category: "team", date: "2025-11-30" },
]

export const GALLERY_CATEGORIES = ["all", "team", "robot", "competition", "workshop"]

export const GALLERY_CDN_CONFIG = {
  baseUrl: null,
  manifestPath: "/gallery-manifest.json",
  checkIntervalMs: 3600000,
}
