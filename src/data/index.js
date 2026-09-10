/**
 * Central Data Barrel Export
 * Re-exports all data modules, copy, chapter registries, team metrics, and UI strings for decoupled consumption.
 * 
 * Optional:
 * - Export new data sets or external API service clients from this index.
 */

export { TEAM_TELEMETRY } from './telemetry.js'
export { CHAPTERS } from './chapters.js'
export { PREVIEW_CARDS } from './horizons.js'
export { MANIFESTO } from './manifesto.js'
export { METRICS } from './metrics.js'
export { PILLARS } from './pillars.js'
export { UI_STRINGS } from './ui-strings.js'
export { MATCHES, SEASON_STATS } from './matches.js'
export { SOCIALS } from './socials.js'
export { SPONSORS } from './sponsors.js'
export { GALLERY_IMAGES, GALLERY_CATEGORIES, GALLERY_CDN_CONFIG } from './gallery.js'
export { BACKGROUND_VARIANTS } from './backgrounds.js'
export { THEME_CONFIG } from './theme.js'

import { CHAPTERS } from './chapters.js'
import { MANIFESTO } from './manifesto.js'
import { PILLARS } from './pillars.js'
import { METRICS } from './metrics.js'
import { TEAM_TELEMETRY } from './telemetry.js'
import { PREVIEW_CARDS } from './horizons.js'
import { UI_STRINGS } from './ui-strings.js'
import { MATCHES, SEASON_STATS } from './matches.js'
import { SOCIALS } from './socials.js'
import { SPONSORS } from './sponsors.js'
import { GALLERY_IMAGES, GALLERY_CATEGORIES, GALLERY_CDN_CONFIG } from './gallery.js'
import { BACKGROUND_VARIANTS } from './backgrounds.js'
import { THEME_CONFIG } from './theme.js'

export const TEAM_INFO = {
  ...TEAM_TELEMETRY,
  chapters: CHAPTERS,
  manifesto: MANIFESTO,
  pillars: PILLARS,
  metrics: METRICS,
  previewCards: PREVIEW_CARDS,
  uiStrings: UI_STRINGS,
  matches: MATCHES,
  seasonStats: SEASON_STATS,
  socials: SOCIALS,
  sponsors: SPONSORS,
  galleryImages: GALLERY_IMAGES,
  galleryCategories: GALLERY_CATEGORIES,
  galleryCdnConfig: GALLERY_CDN_CONFIG,
  backgroundVariants: BACKGROUND_VARIANTS,
  themeConfig: THEME_CONFIG,
}
