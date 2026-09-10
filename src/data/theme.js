/**
 * Theme & Color Palette Definitions
 * Houses theme tokens, dark/light mode color mappings, and accent color definitions.
 * 
 * Optional:
 * - Adjust theme palette colors to match updated team jersey or pit branding.
 * - Add custom contrast options or high-visibility competition pit display mode.
 */

export const THEME_CONFIG = {
  dark: {
    id: "dark",
    bgPrimary: "#0A0A12",
    bgSurface: "#10101C",
    bgCard: "#141424",
    bgElevated: "#161626",
    textPrimary: "#FFFFFF",
    textSecondary: "rgba(255, 255, 255, 0.70)",
    textMuted: "rgba(255, 255, 255, 0.45)",
    textHairline: "rgba(255, 255, 255, 0.08)",
    glassBackground: "rgba(16, 16, 28, 0.60)",
    glassBorder: "rgba(255, 255, 255, 0.08)",
    accent: "#B3FA3A",
    accentSecondary: "#FF70C1",
  },
  light: {
    id: "light",
    bgPrimary: "#F8F9FA",
    bgSurface: "#FFFFFF",
    bgCard: "#FFFFFF",
    bgElevated: "#F0F1F3",
    textPrimary: "#0A0A12",
    textSecondary: "rgba(10, 10, 18, 0.70)",
    textMuted: "rgba(10, 10, 18, 0.45)",
    textHairline: "rgba(10, 10, 18, 0.08)",
    glassBackground: "rgba(255, 255, 255, 0.75)",
    glassBorder: "rgba(10, 10, 18, 0.08)",
    accent: "#82255A",
    accentSecondary: "#3366FF",
  },
}
