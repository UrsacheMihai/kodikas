/**
 * Act 06: Interactive 3D Robot Viewer
 * Real-time 3D CAD/wireframe robot showcase rendered with Three.js featuring interactive rotation and subsystem highlights.
 * 
 * Optional:
 * - Replace procedural geometry with an exported GLTF/GLB CAD model from Onshape or Fusion 360.
 * - Add subsystem clickable markers (intake, elevator, shooter, drivetrain) for detailed component inspection.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RotateCcw, Play, Pause, Cpu } from 'lucide-react'
import { UI_STRINGS } from '../../data/ui-strings.js'
import { useTheme } from '../../hooks/useTheme.js'

export function Act06RobotViewer({
  isActive = true,
  isEntering = false,
  direction = 1,
  onNext,
  onGoToAct,
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const { isDark } = useTheme()

  const [autoRotate, setAutoRotate] = useState(true)
  const autoRotateRef = useRef(autoRotate)
  autoRotateRef.current = autoRotate

  const isDarkRef = useRef(isDark)
  isDarkRef.current = isDark

  const isActiveRef = useRef(isActive)
  isActiveRef.current = isActive

  const [activeSubsystem, setActiveSubsystem] = useState(null)

  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const controlsRef = useRef(null)
  const robotGroupRef = useRef(null)
  const animFrameRef = useRef(null)
  const userInteractingRef = useRef(false)
  const autoRotateTimeoutRef = useRef(null)

  const materialsRef = useRef({
    wireframe: null,
    bodyFill: null,
    accent: null,
    accentSecondary: null,
    gridHelper: null,
  })

  const kinematicsRef = useRef({
    intakeRoller: null,
    liftCarriage: null,
  })

  const handleResetView = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current) return
    const camera = cameraRef.current
    const controls = controlsRef.current

    camera.position.set(4.2, 3.2, 5.0)
    controls.target.set(0, 1.1, 0)
    controls.update()
  }, [])

  const handleSelectSubsystem = (subsystemKey) => {
    setActiveSubsystem((prev) => (prev === subsystemKey ? null : subsystemKey))
    if (!cameraRef.current || !controlsRef.current) return

    const controls = controlsRef.current
    if (subsystemKey === 'chassis') {
      controls.target.set(0, 0.4, 0)
    } else if (subsystemKey === 'lift') {
      controls.target.set(0, 1.8, 0)
    } else if (subsystemKey === 'intake') {
      controls.target.set(0, 0.5, 1.4)
    } else {
      controls.target.set(0, 1.1, 0)
    }
    controls.update()
  }

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const width = container.clientWidth || 800
    const height = container.clientHeight || 600

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(4.2, 3.2, 5.0)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    rendererRef.current = renderer

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 2.0
    controls.maxDistance = 14.0
    controls.maxPolarAngle = Math.PI / 2 + 0.04
    controls.target.set(0, 1.1, 0)
    controlsRef.current = controls

    controls.addEventListener('start', () => {
      userInteractingRef.current = true
      if (autoRotateTimeoutRef.current) {
        clearTimeout(autoRotateTimeoutRef.current)
      }
    })

    controls.addEventListener('end', () => {
      autoRotateTimeoutRef.current = setTimeout(() => {
        userInteractingRef.current = false
      }, 1500)
    })

    const initialDark = isDarkRef.current
    const ambientLight = new THREE.AmbientLight(0xffffff, initialDark ? 0.7 : 1.0)
    scene.add(ambientLight)

    const mainKeyLight = new THREE.DirectionalLight(
      initialDark ? 0xb3fa3a : 0x82255a,
      initialDark ? 2.2 : 1.8
    )
    mainKeyLight.position.set(6, 9, 6)
    scene.add(mainKeyLight)

    const fillLight = new THREE.DirectionalLight(0xffffff, initialDark ? 1.0 : 1.4)
    fillLight.position.set(-6, 5, -5)
    scene.add(fillLight)

    const cyanRimLight = new THREE.PointLight(
      initialDark ? 0x00f2ea : 0x3366ff,
      initialDark ? 3.0 : 1.5,
      12
    )
    cyanRimLight.position.set(0, 4, -3)
    scene.add(cyanRimLight)

    const gridColorCenter = initialDark ? 0xb3fa3a : 0x82255a
    const gridColorLines = initialDark ? 0x1f293d : 0xc7d2fe
    const grid = new THREE.GridHelper(12, 24, gridColorCenter, gridColorLines)
    grid.position.y = -0.01
    scene.add(grid)
    materialsRef.current.gridHelper = grid

    const wireColor = initialDark ? 0xb3fa3a : 0x82255a
    const accentSecColor = initialDark ? 0xff70c1 : 0x3366ff
    const bodyColor = initialDark ? 0x0a101d : 0xe2e8f0

    const wireframeMat = new THREE.LineBasicMaterial({
      color: wireColor,
      transparent: true,
      opacity: 0.9,
    })

    const bodyFillMat = new THREE.MeshStandardMaterial({
      color: bodyColor,
      roughness: 0.35,
      metalness: 0.7,
      transparent: true,
      opacity: initialDark ? 0.45 : 0.65,
    })

    const accentMat = new THREE.LineBasicMaterial({
      color: wireColor,
      transparent: true,
      opacity: 1.0,
    })

    const accentSecMat = new THREE.LineBasicMaterial({
      color: accentSecColor,
      transparent: true,
      opacity: 0.95,
    })

    materialsRef.current = {
      wireframe: wireframeMat,
      bodyFill: bodyFillMat,
      accent: accentMat,
      accentSecondary: accentSecMat,
      gridHelper: grid,
      mainLight: mainKeyLight,
      ambientLight: ambientLight,
    }

    const createPart = (geometry, fillMat, lineMat) => {
      const group = new THREE.Group()
      const mesh = new THREE.Mesh(geometry, fillMat)
      const edges = new THREE.EdgesGeometry(geometry)
      const line = new THREE.LineSegments(edges, lineMat)
      group.add(mesh)
      group.add(line)
      return group
    }

    const robotGroup = new THREE.Group()
    robotGroupRef.current = robotGroup

    const chassisGroup = new THREE.Group()
    chassisGroup.name = 'subsystem_chassis'

    const chassisPlateGeo = new THREE.BoxGeometry(2.4, 0.25, 2.5)
    const chassisPlate = createPart(chassisPlateGeo, bodyFillMat, wireframeMat)
    chassisPlate.position.set(0, 0.4, 0)
    chassisGroup.add(chassisPlate)

    const crossBarGeo = new THREE.BoxGeometry(2.2, 0.12, 0.15)
    const crossBar1 = createPart(crossBarGeo, bodyFillMat, wireframeMat)
    crossBar1.position.set(0, 0.45, 0.5)
    chassisGroup.add(crossBar1)

    const crossBar2 = createPart(crossBarGeo, bodyFillMat, wireframeMat)
    crossBar2.position.set(0, 0.45, -0.5)
    chassisGroup.add(crossBar2)

    const wheelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.28, 18)
    wheelGeo.rotateZ(Math.PI / 2)

    const wheelPositions = [
      { x: -1.3, y: 0.38, z: 0.95 },
      { x: 1.3, y: 0.38, z: 0.95 },
      { x: -1.3, y: 0.38, z: -0.95 },
      { x: 1.3, y: 0.38, z: -0.95 },
    ]

    wheelPositions.forEach((pos) => {
      const wheel = createPart(wheelGeo, bodyFillMat, accentMat)
      wheel.position.set(pos.x, pos.y, pos.z)
      chassisGroup.add(wheel)

      const hubGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.34, 10)
      hubGeo.rotateZ(Math.PI / 2)
      const hub = createPart(hubGeo, bodyFillMat, accentSecMat)
      hub.position.set(pos.x, pos.y, pos.z)
      chassisGroup.add(hub)
    })

    const odoGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 12)
    odoGeo.rotateZ(Math.PI / 2)

    const odoLeft = createPart(odoGeo, bodyFillMat, accentSecMat)
    odoLeft.position.set(-0.8, 0.15, 0)
    chassisGroup.add(odoLeft)

    const odoRight = createPart(odoGeo, bodyFillMat, accentSecMat)
    odoRight.position.set(0.8, 0.15, 0)
    chassisGroup.add(odoRight)

    const odoBackGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 12)
    odoBackGeo.rotateX(Math.PI / 2)
    const odoBack = createPart(odoBackGeo, bodyFillMat, accentSecMat)
    odoBack.position.set(0, 0.15, -0.8)
    chassisGroup.add(odoBack)

    robotGroup.add(chassisGroup)

    const liftGroup = new THREE.Group()
    liftGroup.name = 'subsystem_lift'

    const extrusionGeo = new THREE.BoxGeometry(0.16, 2.3, 0.16)

    const leftStage = createPart(extrusionGeo, bodyFillMat, wireframeMat)
    leftStage.position.set(-0.65, 1.6, -0.2)
    liftGroup.add(leftStage)

    const rightStage = createPart(extrusionGeo, bodyFillMat, wireframeMat)
    rightStage.position.set(0.65, 1.6, -0.2)
    liftGroup.add(rightStage)

    const topBarGeo = new THREE.BoxGeometry(1.5, 0.12, 0.16)
    const topBar = createPart(topBarGeo, bodyFillMat, wireframeMat)
    topBar.position.set(0, 2.75, -0.2)
    liftGroup.add(topBar)

    const carriageGroup = new THREE.Group()
    const carriagePlateGeo = new THREE.BoxGeometry(1.2, 0.45, 0.3)
    const carriagePlate = createPart(carriagePlateGeo, bodyFillMat, accentMat)
    carriageGroup.add(carriagePlate)

    const bucketGeo = new THREE.BoxGeometry(0.85, 0.5, 0.7)
    const bucket = createPart(bucketGeo, bodyFillMat, accentSecMat)
    bucket.position.set(0, 0.25, 0.4)
    carriageGroup.add(bucket)

    carriageGroup.position.set(0, 1.4, -0.15)
    liftGroup.add(carriageGroup)
    kinematicsRef.current.liftCarriage = carriageGroup

    robotGroup.add(liftGroup)

    const intakeGroup = new THREE.Group()
    intakeGroup.name = 'subsystem_intake'

    const armGeo = new THREE.BoxGeometry(0.1, 0.12, 0.9)
    const armL = createPart(armGeo, bodyFillMat, wireframeMat)
    armL.position.set(-0.95, 0.5, 1.4)
    intakeGroup.add(armL)

    const armR = createPart(armGeo, bodyFillMat, wireframeMat)
    armR.position.set(0.95, 0.5, 1.4)
    intakeGroup.add(armR)

    const rollerGroup = new THREE.Group()
    const rollerShaftGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.85, 12)
    rollerShaftGeo.rotateZ(Math.PI / 2)
    const rollerShaft = createPart(rollerShaftGeo, bodyFillMat, wireframeMat)
    rollerGroup.add(rollerShaft)

    const compliantWheelGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.14, 16)
    compliantWheelGeo.rotateZ(Math.PI / 2)
    ;[-0.7, -0.35, 0, 0.35, 0.7].forEach((xPos) => {
      const cWheel = createPart(compliantWheelGeo, bodyFillMat, accentMat)
      cWheel.position.x = xPos
      rollerGroup.add(cWheel)
    })

    rollerGroup.position.set(0, 0.5, 1.8)
    intakeGroup.add(rollerGroup)
    kinematicsRef.current.intakeRoller = rollerGroup

    robotGroup.add(intakeGroup)

    const electronicsGroup = new THREE.Group()

    const hubBoxGeo = new THREE.BoxGeometry(0.7, 0.2, 0.55)
    const controlHub = createPart(hubBoxGeo, bodyFillMat, accentSecMat)
    controlHub.position.set(-0.45, 0.6, -0.7)
    electronicsGroup.add(controlHub)

    const batteryGeo = new THREE.BoxGeometry(0.5, 0.35, 0.8)
    const battery = createPart(batteryGeo, bodyFillMat, wireframeMat)
    battery.position.set(0.5, 0.65, -0.7)
    electronicsGroup.add(battery)

    const mastPoleGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.1, 10)
    const mastPole = createPart(mastPoleGeo, bodyFillMat, wireframeMat)
    mastPole.position.set(0, 1.1, -0.8)
    electronicsGroup.add(mastPole)

    const cameraGeo = new THREE.BoxGeometry(0.35, 0.16, 0.18)
    const cameraHead = createPart(cameraGeo, bodyFillMat, accentMat)
    cameraHead.position.set(0, 1.65, -0.78)
    electronicsGroup.add(cameraHead)

    const lensGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.08, 12)
    lensGeo.rotateX(Math.PI / 2)
    const lensL = createPart(lensGeo, bodyFillMat, accentSecMat)
    lensL.position.set(-0.1, 1.65, -0.68)
    electronicsGroup.add(lensL)

    const lensR = createPart(lensGeo, bodyFillMat, accentSecMat)
    lensR.position.set(0.1, 1.65, -0.68)
    electronicsGroup.add(lensR)

    robotGroup.add(electronicsGroup)

    scene.add(robotGroup)

    const handleResize = () => {
      if (!container || !camera || !renderer) return
      const w = container.clientWidth
      const h = container.clientHeight
      if (w === 0 || h === 0) return

      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    const resizeObserver = new ResizeObserver(() => {
      handleResize()
    })
    resizeObserver.observe(container)

    let clock = new THREE.Clock()
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate)

      if (!isActiveRef.current) return

      const delta = clock.getDelta()
      const elapsedTime = clock.getElapsedTime()

      controls.update()

      if (autoRotateRef.current && !userInteractingRef.current && robotGroup) {
        robotGroup.rotation.y += delta * 0.32
      }

      if (kinematicsRef.current.intakeRoller) {
        kinematicsRef.current.intakeRoller.rotation.x += delta * 3.5
      }

      if (kinematicsRef.current.liftCarriage) {

        kinematicsRef.current.liftCarriage.position.y =
          1.45 + Math.sin(elapsedTime * 1.8) * 0.25
      }

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
      if (autoRotateTimeoutRef.current) {
        clearTimeout(autoRotateTimeoutRef.current)
      }
      resizeObserver.disconnect()
      controls.dispose()

      scene.traverse((obj) => {
        if (obj.geometry) {
          obj.geometry.dispose()
        }
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat) => mat.dispose())
          } else {
            obj.material.dispose()
          }
        }
      })

      renderer.dispose()
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [])

  useEffect(() => {
    const mats = materialsRef.current
    if (!mats.wireframe) return

    const wireColor = isDark ? 0xb3fa3a : 0x82255a
    const accentSecColor = isDark ? 0xff70c1 : 0x3366ff
    const bodyColor = isDark ? 0x0a101d : 0xe2e8f0

    mats.wireframe.color.setHex(wireColor)
    mats.accent.color.setHex(wireColor)
    mats.accentSecondary.color.setHex(accentSecColor)
    mats.bodyFill.color.setHex(bodyColor)
    mats.bodyFill.opacity = isDark ? 0.45 : 0.65

    if (mats.gridHelper) {

      const gridColorCenter = isDark ? 0xb3fa3a : 0x82255a
      const gridColorLines = isDark ? 0x1f293d : 0xc7d2fe
      mats.gridHelper.geometry.dispose()
      mats.gridHelper.material.dispose()
      if (sceneRef.current) {
        sceneRef.current.remove(mats.gridHelper)
        const newGrid = new THREE.GridHelper(12, 24, gridColorCenter, gridColorLines)
        newGrid.position.y = -0.01
        sceneRef.current.add(newGrid)
        mats.gridHelper = newGrid
      }
    }

    if (mats.mainLight) {
      mats.mainLight.color.setHex(isDark ? 0xb3fa3a : 0x82255a)
      mats.mainLight.intensity = isDark ? 2.2 : 1.8
    }

    if (mats.ambientLight) {
      mats.ambientLight.intensity = isDark ? 0.7 : 1.0
    }
  }, [isDark])

  return (
    <section
      className="act-stage-06 relative w-full min-h-dvh flex flex-col justify-between px-4 sm:px-6 md:px-12 py-16 md:py-20 select-none overflow-hidden"
      aria-label="Act 06: 3D Robot Viewframe"
      data-active={isActive}
    >
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] md:w-[750px] h-[350px] sm:h-[600px] pointer-events-none -z-10 blur-3xl transition-opacity duration-1000 ${
          isDark ? 'ambient-glow-volt opacity-50' : 'bg-berry-primary/15 opacity-40'
        }`}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full pill-badge glass-panel border border-white/10 text-xs font-mono tracking-wider uppercase transition-colors">
          <Cpu className={`w-3.5 h-3.5 ${isDark ? 'text-volt' : 'text-berry-primary'}`} />
          <span className={isDark ? 'text-volt' : 'text-berry-primary'}>
            {UI_STRINGS.act06.headerTag}
          </span>
          <span className="opacity-30">•</span>
          <span className="opacity-75">{UI_STRINGS.act06.statusLive}</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase">
          {UI_STRINGS.act06.sectionTitle}{' '}
          <span
            className={
              isDark
                ? 'text-gradient-volt'
                : 'text-berry-primary'
            }
          >
            {UI_STRINGS.act06.sectionTitleAccent}
          </span>
        </h2>

        <p className="font-sans text-xs sm:text-sm text-studio-silver max-w-md mx-auto opacity-75">
          {UI_STRINGS.act06.instructions}
        </p>
      </div>

      <div
        ref={containerRef}
        className="interactive-zone touch-none relative z-10 w-full flex-1 min-h-[340px] sm:min-h-[460px] md:min-h-[520px] my-3 rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        <canvas ref={canvasRef} className="touch-none w-full h-full block" />

        <div className="absolute top-4 right-4 flex items-center gap-2 z-20 pointer-events-auto">
          <button
            type="button"
            onClick={() => setAutoRotate((prev) => !prev)}
            className={`pointer-events-auto px-3 py-1.5 rounded-lg glass-panel border text-xs font-mono tracking-wide flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105 active:scale-95 ${
              autoRotate
                ? isDark
                  ? 'text-volt border-volt/40 bg-volt/10'
                  : 'text-berry-primary border-berry-primary/40 bg-berry-primary/10'
                : isDark
                  ? 'text-white/70 hover:text-white border-white/15'
                  : 'text-obsidian/70 hover:text-obsidian border-black/15'
            }`}
            title={UI_STRINGS.act06.autoRotate}
          >
            {autoRotate ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">{UI_STRINGS.act06.autoRotate}</span>
          </button>

          <button
            type="button"
            onClick={handleResetView}
            className={`px-3 py-1.5 rounded-lg glass-panel border text-xs font-mono tracking-wide flex items-center gap-1.5 shadow-lg transition-all hover:scale-105 active:scale-95 ${
              isDark
                ? 'border-white/15 text-white/80 hover:text-white'
                : 'border-black/15 text-obsidian/80 hover:text-obsidian'
            }`}
            title={UI_STRINGS.act06.resetView}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{UI_STRINGS.act06.resetView}</span>
          </button>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 pointer-events-auto">
        <button
          type="button"
          onClick={() => handleSelectSubsystem('chassis')}
          className={`pointer-events-auto px-3.5 py-1.5 rounded-xl glass-panel border text-xs font-mono tracking-wide transition-colors ${
            activeSubsystem === 'chassis'
              ? isDark
                ? 'border-volt text-volt bg-volt/15'
                : 'border-berry-primary text-berry-primary bg-berry-primary/15'
              : isDark
                ? 'border-white/10 text-white/70 hover:text-white hover:border-white/20'
                : 'border-black/10 text-obsidian/70 hover:text-obsidian hover:border-black/20'
          }`}
        >
          <span className="opacity-50 mr-1.5">{'// 01'}</span>
          {UI_STRINGS.act06.subsystemChassis}
        </button>

        <button
          type="button"
          onClick={() => handleSelectSubsystem('lift')}
          className={`pointer-events-auto px-3.5 py-1.5 rounded-xl glass-panel border text-xs font-mono tracking-wide transition-colors ${
            activeSubsystem === 'lift'
              ? isDark
                ? 'border-volt text-volt bg-volt/15'
                : 'border-berry-primary text-berry-primary bg-berry-primary/15'
              : isDark
                ? 'border-white/10 text-white/70 hover:text-white hover:border-white/20'
                : 'border-black/10 text-obsidian/70 hover:text-obsidian hover:border-black/20'
          }`}
        >
          <span className="opacity-50 mr-1.5">{'// 02'}</span>
          {UI_STRINGS.act06.subsystemLift}
        </button>

        <button
          type="button"
          onClick={() => handleSelectSubsystem('intake')}
          className={`pointer-events-auto px-3.5 py-1.5 rounded-xl glass-panel border text-xs font-mono tracking-wide transition-colors ${
            activeSubsystem === 'intake'
              ? isDark
                ? 'border-volt text-volt bg-volt/15'
                : 'border-berry-primary text-berry-primary bg-berry-primary/15'
              : isDark
                ? 'border-white/10 text-white/70 hover:text-white hover:border-white/20'
                : 'border-black/10 text-obsidian/70 hover:text-obsidian hover:border-black/20'
          }`}
        >
          <span className="opacity-50 mr-1.5">{'// 03'}</span>
          {UI_STRINGS.act06.subsystemIntake}
        </button>
      </div>
    </section>
  )
}

export default Act06RobotViewer
