/**
 * Engineering & Outreach Pillars Data
 * Defines the four foundational team pillars (Engineering, Autonomous, Outreach, Culture) with specs and metrics.
 * 
 * Optional:
 * - Update engineering specifications, sensor arrays, or community outreach reach figures.
 * - Add downloadable technical documentation links for each pillar.
 */

export const PILLARS = [
  {
    id: "software",
    tag: "COMPUTATIONAL INTELLIGENCE",
    title: "Autonomous Software & Vision",
    accent: "#B3FA3A",
    icon: "Code",
    quote: "Code isn't just instructions. In the arena, code is intuition.",
    description: "Dual-camera AprilTag pose localization, real-time S-curve trajectory generation, and multi-threaded sensor fusion running at 60Hz. When the autonomous buzzer sounds, human hands step aside.",
    specs: ["Pure Pursuit Motion", "AprilTag 3D Pose", "Sub-Millimeter Drift", "Custom PID Tuning"],
  },
  {
    id: "hardware",
    tag: "MECHANICAL CRAFTSMANSHIP",
    title: "Aerospace Precision Hardware",
    accent: "#FF70C1",
    icon: "Cpu",
    quote: "Every gram accounted for. Every tolerance scrutinized.",
    description: "Pocketed CNC 6061-T6 aluminum chassis plates, high-modulus carbon fiber cascade masts, and silicone compliant intakes. Designed in generative CAD, validated through finite element analysis.",
    specs: ["CNC 6061-T6 Alloys", "Carbon Fiber Rigging", "Zero-Backlash Gearboxes", "Modular Rapid Swap"],
  },
  {
    id: "strategy",
    tag: "TACTICAL EXCELLENCE",
    title: "Data-Driven Match Strategy",
    accent: "#FFFFFF",
    icon: "Crosshair",
    quote: "Precision without strategy is just noise.",
    description: "Real-time telemetry scouting, probabilistic alliance pairing models, and cockpit-grade driver assist ergonomics. We treat every 2.5-minute match as a high-velocity chess game.",
    specs: ["Real-Time Match Telemetry", "Alliance Synergy Models", "High-Stress Pit Protocols", "Autonomous Fallbacks"],
  },
]
