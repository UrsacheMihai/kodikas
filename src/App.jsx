/**
 * Root Application Component
 * Orchestrates the keynote presentation layout, theme provider, background visualizer, navigation HUD, active acts stage, and navigation dock.
 * 
 * Optional:
 * - Mount global overlays, sound effect controllers, or analytics listeners.
 * - Add global keyboard shortcuts or telemetry indicators.
 */

import { ThemeProvider } from './hooks/useTheme.js'
import { useKeynoteController } from './hooks/useKeynoteController.js'
import { CHAPTERS } from './data/chapters.js'
import KeynoteBackground from './components/canvas/KeynoteBackground.jsx'
import { FrostedHUD } from './components/hud/FrostedHUD.jsx'
import { KeynoteStage, StageDock } from './components/stage/index.js'
import {
  Act01Awakening,
  Act02Manifesto,
  Act03Pillars,
  Act04Horizons,
  Act05Matches,
  Act06RobotViewer,
  Act07Gallery,
  Act08MiniGame,
  Act09Socials,
  Act10Contact,
} from './components/acts/index.js'

export default function App() {
  const controller = useKeynoteController(CHAPTERS.length)

  return (
    <ThemeProvider>
      <div className="relative w-screen min-h-dvh overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] select-none font-sans transition-colors duration-300">
        <KeynoteBackground activeAct={controller.activeAct} />
        <FrostedHUD
          activeAct={controller.activeAct}
          chapters={CHAPTERS}
          onSelectAct={controller.goToAct}
          isTransitioning={controller.isTransitioning}
        />
        <KeynoteStage
          activeAct={controller.activeAct}
          totalActs={CHAPTERS.length}
          direction={controller.direction}
          isTransitioning={controller.isTransitioning}
        >
          <Act01Awakening onNext={controller.nextAct} onGoToAct={controller.goToAct} />
          <Act02Manifesto onNext={controller.nextAct} onGoToAct={controller.goToAct} />
          <Act03Pillars onNext={controller.nextAct} onGoToAct={controller.goToAct} />
          <Act04Horizons onNext={controller.nextAct} onGoToAct={controller.goToAct} />
          <Act05Matches onNext={controller.nextAct} onGoToAct={controller.goToAct} />
          <Act06RobotViewer onNext={controller.nextAct} onGoToAct={controller.goToAct} />
          <Act07Gallery onNext={controller.nextAct} onGoToAct={controller.goToAct} />
          <Act08MiniGame onNext={controller.nextAct} onGoToAct={controller.goToAct} />
          <Act09Socials onNext={controller.nextAct} onGoToAct={controller.goToAct} />
          <Act10Contact onGoToAct={controller.goToAct} />
        </KeynoteStage>
        <StageDock
          activeAct={controller.activeAct}
          totalActs={CHAPTERS.length}
          onPrev={controller.prevAct}
          onNext={controller.nextAct}
          isTransitioning={controller.isTransitioning}
          goToAct={controller.goToAct}
          chapters={CHAPTERS}
        />
      </div>
    </ThemeProvider>
  )
}
