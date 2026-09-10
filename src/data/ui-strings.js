/**
 * Central UI Strings & Labels
 * Stores all user-facing interface text, HUD labels, button captions, and accessibility strings.
 * 
 * Optional:
 * - Edit copy or button labels without touching component logic.
 * - Add internationalization (i18n) localization tables.
 */

export const UI_STRINGS = {

  hud: {
    navAriaLabel: "Keynote Presentation Navigation",
    chaptersAriaLabel: "Presentation Chapters",
    beaconAriaLabel: "Team Telemetry Beacon",
    brandTooltip: "Return to Awakening",
  },

  dock: {
    actPrefix: "ACT",
    actSeparator: "//",
    progressAriaLabel: "Presentation progress",
    prevActAriaLabel: "Previous Act",
    nextActAriaLabel: "Next Act",
    keyboardSpace: "[SPACE]",
    keyboardSpaceAction: "NEXT",
    keyboardArrows: "[ARROWS]",
    keyboardArrowsAction: "NAVIGATE",
  },

  theme: {
    darkLabel: "Dark mode",
    lightLabel: "Light mode",
    toggleAriaLabel: "Toggle dark/light theme",
  },

  act01: {
    ariaLabel: "Act 01: The Awakening",
    heroTitle: "KODIKAS",
    heroSubtitle: "ROBOTICS • FIRST TECH CHALLENGE",
    ctaText: "ENTER PRESENTATION",
    ctaAriaLabel: "Enter Presentation",
    seasonPrefix: "SEASON",
    seasonSeparator: "//",
  },

  act02: {
    ariaLabel: "Act 02: Engineering Manifesto",
    headerTag: "MANIFESTO // 02",
  },

  act03: {
    ariaLabel: "Act 03: The Three Disciplines",
    headerTag: "DISCIPLINES // 03",
    headerSubtag: "TRI-DISCIPLINARY ARCHITECTURE",
    sectionTitle: "ENGINEERED",
    sectionTitleAccent: "EXCELLENCE.",
    tabsAriaLabel: "Discipline Tabs",
    specsLabel: "Core Technical Specifications:",
    indexSeparator: "//",
  },

  act04: {
    ariaLabel: "Act 04: Horizons & Gateway",
    headerTag: "HORIZON // 04",
    sectionTitle: "THE EXPEDITION",
    sectionTitleAccent: "CONTINUES.",
    leadParagraph: "From our robotics laboratory in {location} to national championships and international arenas, we are engineering Romania's next vanguard of autonomous robotic systems.",
    cardFooterLabel: "CHAPTER ARCHIVE",
    cardFooterAction: "EXPLORE →",
    replayText: "REPLAY KEYNOTE FROM BEGINNING",
    replayAriaLabel: "Replay Keynote from Beginning",
  },

  act05: {
    ariaLabel: "Act 05: Match Telemetry",
    headerTag: "TELEMETRY // 05",
    subtag: "COMPETITION DATA FEED",
    sectionTitle: "MATCH",
    sectionTitleAccent: "TELEMETRY.",
    noMatches: "No match data available yet.",
    statsTitle: "SEASON STATISTICS",
    historyTitle: "RECENT MATCH HISTORY",
    matchesPlayed: "Matches Played",
    wins: "Wins",
    losses: "Losses",
    winRate: "Win Rate",
    avgScore: "Average Score",
    highScore: "Season High",
    ranking: "Current Rank",
    autoSuccessRate: "Auto Success",
    autoLabel: "AUTO",
    teleopLabel: "TELEOP",
    endgameLabel: "ENDGAME",
    totalLabel: "TOTAL",
    allianceLabel: "Alliance",
    partnerLabel: "Partner",
    opponentsLabel: "Opponents",
  },

  act06: {
    headerTag: "HARDWARE // 06",
    sectionTitle: "3D ROBOT",
    sectionTitleAccent: "VIEWFRAME.",
    instructions: "Drag to rotate • Scroll to zoom • Right-click to pan",
    placeholder: "Interactive 3D model — placeholder geometry",
    resetView: "RESET VIEW",
    autoRotate: "AUTO ROTATE",
    subsystemsTitle: "ROBOT SUBSYSTEMS",
    subsystemChassis: "4WD Mecanum Chassis & Odometry",
    subsystemLift: "Aerospace Linear Slide System",
    subsystemIntake: "Compliant Wheel Active Intake",
    statusLive: "TELEMETRY ACTIVE",
  },

  act07: {
    ariaLabel: "Act 07: Team Photo Gallery",
    headerTag: "GALLERY // 07",
    subtag: "BEHIND THE SCENES",
    sectionTitle: "BEHIND THE",
    sectionTitleAccent: "SCENES.",
    noPhotos: "Photos coming soon.",
    allCategory: "ALL",
    lightboxClose: "Close preview",
    lightboxPrev: "Previous photo",
    lightboxNext: "Next photo",
    placeholderBadge: "ARCHIVE ASSET",
    placeholderNote: "High-resolution media capture pending CDN sync.",
  },

  act08: {
    headerTag: "LAB // 08",
    sectionTitle: "SYSTEM",
    sectionTitleAccent: "RECALIBRATION.",
    statusBadge: "AUTONOMOUS RESEARCH",
    terminalTitle: "HARDWARE & SENSOR RECALIBRATION",
    terminalDescription: "Diagnostic routines, odometry recalibration, and autonomous pathfinding telemetry are operating in laboratory test mode.",
    specsTitle: "DIAGNOSTIC SUBSYSTEMS",
    specOdometry: "Dead-Wheel Odometry Tracking (Three-Pod Array)",
    specOdometryDesc: "Real-time position tracking with sub-millimeter precision.",
    specVision: "OpenCV AprilTag Optical Pipeline",
    specVisionDesc: "Dual-camera low-latency vision positioning and target acquisition.",
    specKinematics: "Mecanum Vector Kinematics Engine",
    specKinematicsDesc: "Holonomic motion profiling with dynamic voltage compensation.",
    statusLive: "DIAGNOSTICS ACTIVE",
    statusStandby: "STANDBY FOR EXPEDITION",
  },

  act09: {
    ariaLabel: "Act 09: Media & Socials Hub",
    headerTag: "CONNECT // 09",
    subtag: "OFFICIAL CHANNELS & MEDIA",
    sectionTitle: "MEDIA",
    sectionTitleAccent: "HUB.",
    followUs: "FOLLOW THE MISSION",
    leadText: "Connect with our engineering team, follow live match feeds, and inspect our open-source developments across our verified channels.",
    cardAction: "OPEN CHANNEL",
  },

  act10: {
    ariaLabel: "Act 10: Contact & Sponsors",
    headerTag: "CONTACT // 10",
    subtag: "JOIN THE MISSION",
    sectionTitle: "JOIN THE",
    sectionTitleAccent: "MISSION.",
    sponsorsTitle: "OUR SPONSORS",
    contactTitle: "GET IN TOUCH",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    formSubmit: "SEND MESSAGE",
    formSubmitting: "SENDING...",
    formSuccess: "Message sent successfully!",
    namePlaceholder: "Your full name",
    emailPlaceholder: "name@organization.com",
    messagePlaceholder: "How can we collaborate or support your mission?",
    leadText: "Partner with FTC #24032 to empower youth engineering and autonomous robotics innovation.",
  },
}
