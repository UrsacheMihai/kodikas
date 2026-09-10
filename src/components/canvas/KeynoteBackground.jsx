/**
 * Generative Keynote Canvas Background
 * High-performance 2D canvas particle visualizer rendering ambient generative nodes, connections, and responsive glow effects.
 * 
 * Optional:
 * - Upgrade particle renderer to WebGL / Three.js shaders for advanced visual effects.
 * - Connect particle speeds or colors dynamically to mouse velocity or robot telemetry.
 */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { BACKGROUND_VARIANTS } from '../../data/backgrounds.js'
import { useTheme } from '../../hooks/useTheme.js'

const ACT_CONFIGS = [
  {

    camera: { x: 0, y: 0, z: 22 },
    rotation: { x: 0, y: 0, z: 0 },
    voltIntensity: 5.0,
    fuchsiaIntensity: 2.5,
    whiteIntensity: 1.0,
    particleVelocity: 0.02,
  },
  {

    camera: { x: -5, y: 2.5, z: 27 },
    rotation: { x: 0.05, y: -0.10, z: 0.02 },
    voltIntensity: 2.0,
    fuchsiaIntensity: 6.0,
    whiteIntensity: 1.5,
    particleVelocity: 0.05,
  },
  {

    camera: { x: 6, y: -2.0, z: 24 },
    rotation: { x: -0.04, y: 0.12, z: -0.02 },
    voltIntensity: 4.5,
    fuchsiaIntensity: 4.5,
    whiteIntensity: 4.5,
    particleVelocity: 0.04,
  },
  {

    camera: { x: 0, y: 3.5, z: 17 },
    rotation: { x: 0.08, y: 0, z: -0.03 },
    voltIntensity: 7.0,
    fuchsiaIntensity: 4.0,
    whiteIntensity: 3.0,
    particleVelocity: 0.09,
  },
  {

    camera: { x: -4, y: -3.0, z: 25 },
    rotation: { x: -0.06, y: -0.08, z: 0.04 },
    voltIntensity: 3.5,
    fuchsiaIntensity: 5.0,
    whiteIntensity: 3.0,
    particleVelocity: 0.035,
  },
  {

    camera: { x: 0, y: -1.0, z: 32 },
    rotation: { x: 0.02, y: 0.05, z: 0.01 },
    voltIntensity: 2.5,
    fuchsiaIntensity: 2.5,
    whiteIntensity: 2.0,
    particleVelocity: 0.015,
  },
  {

    camera: { x: 5, y: 3.0, z: 26 },
    rotation: { x: 0.06, y: 0.10, z: -0.04 },
    voltIntensity: 4.0,
    fuchsiaIntensity: 3.5,
    whiteIntensity: 4.0,
    particleVelocity: 0.03,
  },
  {

    camera: { x: -3, y: 1.5, z: 19 },
    rotation: { x: 0.07, y: -0.14, z: 0.06 },
    voltIntensity: 6.5,
    fuchsiaIntensity: 6.0,
    whiteIntensity: 2.0,
    particleVelocity: 0.08,
  },
  {

    camera: { x: 3.5, y: -2.5, z: 23 },
    rotation: { x: -0.05, y: 0.07, z: -0.05 },
    voltIntensity: 4.5,
    fuchsiaIntensity: 5.5,
    whiteIntensity: 3.5,
    particleVelocity: 0.045,
  },
  {

    camera: { x: 0, y: 2.0, z: 21 },
    rotation: { x: 0.03, y: 0, z: 0.02 },
    voltIntensity: 5.5,
    fuchsiaIntensity: 3.5,
    whiteIntensity: 5.0,
    particleVelocity: 0.025,
  },
]

function createParticleTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  const center = 32
  const radius = 30
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, radius)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.85)')
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.35)')
  gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.08)')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 64, 64)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

const DEFAULT_SHAPES = {
  ringCount: 3,
  ringGeometries: ['TorusGeometry', 'TorusKnotGeometry', 'IcosahedronGeometry'],
  ringParams: [
    { args: [8, 0.15, 16, 80], scale: 1.0 },
    { args: [6, 0.35, 96, 8], scale: 0.95 },
    { args: [11, 1], scale: 1.05 },
  ],
  particleCount: 800,
  particleDistribution: 'sphere',
  particleSpread: 30,
}

function createShapeGeometry(geoType, args = []) {
  switch (geoType) {
    case 'TorusGeometry':
      return new THREE.TorusGeometry(...args)
    case 'TorusKnotGeometry':
      return new THREE.TorusKnotGeometry(...args)
    case 'IcosahedronGeometry':
      return new THREE.IcosahedronGeometry(...args)
    case 'OctahedronGeometry':
      return new THREE.OctahedronGeometry(...args)
    case 'DodecahedronGeometry':
      return new THREE.DodecahedronGeometry(...args)
    case 'SphereGeometry':
      return new THREE.SphereGeometry(...args)
    case 'BoxGeometry':
      return new THREE.BoxGeometry(...args)
    case 'RingGeometry':
      return new THREE.RingGeometry(...args)
    default:
      return new THREE.TorusGeometry(8, 0.15, 16, 80)
  }
}

function distributeParticlePoint(distribution, spread, i, count) {
  switch (distribution) {
    case 'box':
      return {
        x: (Math.random() - 0.5) * 2 * spread,
        y: (Math.random() - 0.5) * 2 * spread,
        z: (Math.random() - 0.5) * 2 * spread,
      }
    case 'fibonacci': {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count)
      const goldenRatio = (1 + Math.sqrt(5)) / 2
      const theta = (2 * Math.PI * i) / goldenRatio
      const r = (0.4 + 0.6 * Math.cbrt(Math.random())) * spread
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
      }
    }
    case 'cylinder': {
      const angle = Math.random() * 2 * Math.PI
      const r = Math.sqrt(Math.random()) * spread
      return {
        x: r * Math.cos(angle),
        y: (Math.random() - 0.5) * 2 * spread,
        z: r * Math.sin(angle),
      }
    }
    case 'disc': {
      const angle = Math.random() * 2 * Math.PI
      const r = Math.sqrt(Math.random()) * spread
      return {
        x: r * Math.cos(angle),
        y: r * Math.sin(angle),
        z: (Math.random() - 0.5) * (spread * 0.15),
      }
    }
    case 'sphere':
    default: {
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = Math.cbrt(Math.random()) * spread
      const sinPhi = Math.sin(phi)
      return {
        x: r * sinPhi * Math.cos(theta),
        y: r * sinPhi * Math.sin(theta),
        z: r * Math.cos(phi),
      }
    }
  }
}

export default function KeynoteBackground({ activeAct = 0 }) {
  const mountRef = useRef(null)
  const targetConfig = useRef(ACT_CONFIGS[0])
  const mousePos = useRef({ x: 0, y: 0 })
  const currentVelocity = useRef(0.02)
  const currentRotation = useRef({ x: 0, y: 0, z: 0 })

  const selectedVariantRef = useRef(null)
  if (selectedVariantRef.current === null) {
    const randomIndex = Math.floor(Math.random() * BACKGROUND_VARIANTS.length)
    selectedVariantRef.current = BACKGROUND_VARIANTS[randomIndex]
  }

  const { isDark = true } = useTheme() || {}
  const variantColors = isDark
    ? selectedVariantRef.current.dark
    : selectedVariantRef.current.light

  const variantColorsRef = useRef(variantColors)
  const isDarkRef = useRef(isDark)
  const updateVariantThemeRef = useRef(null)

  useEffect(() => {
    const safeIndex = Math.max(0, Math.min(activeAct ?? 0, ACT_CONFIGS.length - 1))
    targetConfig.current = ACT_CONFIGS[safeIndex]
  }, [activeAct])

  useEffect(() => {
    variantColorsRef.current = variantColors
    isDarkRef.current = isDark
    if (updateVariantThemeRef.current) {
      updateVariantThemeRef.current(variantColors, isDark)
    }
  }, [variantColors, isDark])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const initialVariant = variantColorsRef.current
    const initialIsDark = isDarkRef.current

    const scene = new THREE.Scene()
    const initialFogColor = new THREE.Color(initialVariant.fogColor)
    scene.fog = new THREE.FogExp2(initialFogColor, initialVariant.fogDensity)
    scene.background = initialFogColor.clone()

    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      120
    )
    camera.position.set(0, 0, 22)

    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    mount.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, initialVariant.lights.ambient)
    scene.add(ambientLight)

    const voltLight = new THREE.PointLight(
      initialVariant.lights.volt.color,
      initialVariant.lights.volt.intensity,
      45
    )
    voltLight.position.set(-10, 8, 10)
    scene.add(voltLight)

    const fuchsiaLight = new THREE.PointLight(
      initialVariant.lights.fuchsia.color,
      initialVariant.lights.fuchsia.intensity,
      45
    )
    fuchsiaLight.position.set(10, -8, 5)
    scene.add(fuchsiaLight)

    const whiteLight = new THREE.PointLight(
      initialVariant.lights.fill.color,
      initialVariant.lights.fill.intensity,
      35
    )
    whiteLight.position.set(0, 12, -5)
    scene.add(whiteLight)

    const kineticSpaceGroup = new THREE.Group()
    scene.add(kineticSpaceGroup)

    const shapes = selectedVariantRef.current?.shapes || DEFAULT_SHAPES

    const particleCount = isMobile ? Math.ceil((shapes.particleCount || 800) * 0.44) : (shapes.particleCount || 800)
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const targetColors = new Float32Array(particleCount * 3)
    const particleRolls = new Float32Array(particleCount)

    const spread = shapes.particleSpread || 30
    const distribution = shapes.particleDistribution || 'sphere'

    for (let i = 0; i < particleCount; i++) {
      const pt = distributeParticlePoint(distribution, spread, i, particleCount)
      positions[i * 3] = pt.x
      positions[i * 3 + 1] = pt.y
      positions[i * 3 + 2] = pt.z
      particleRolls[i] = Math.random()
    }

    const cVolt = new THREE.Color()
    const cFuchsia = new THREE.Color()
    const cWhite = new THREE.Color()
    const cAccent = new THREE.Color()

    const computeParticleTargetColors = (palette, destArray) => {
      cVolt.setHex(palette.lights.volt.color)
      cFuchsia.setHex(palette.lights.fuchsia.color)
      cWhite.setHex(palette.rings.color3)
      cAccent.setHex(palette.particles.accentColor)

      const t1 = palette.particles.voltWeight
      const t2 = t1 + palette.particles.fuchsiaWeight
      const t3 = t2 + palette.particles.whiteWeight

      for (let i = 0; i < particleCount; i++) {
        const roll = particleRolls[i]
        let chosen = cAccent
        if (roll < t1) {
          chosen = cVolt
        } else if (roll < t2) {
          chosen = cFuchsia
        } else if (roll < t3) {
          chosen = cWhite
        }
        destArray[i * 3] = chosen.r
        destArray[i * 3 + 1] = chosen.g
        destArray[i * 3 + 2] = chosen.b
      }
    }

    computeParticleTargetColors(initialVariant, targetColors)
    for (let i = 0; i < particleCount * 3; i++) {
      colors[i] = targetColors[i]
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particleTexture = createParticleTexture()
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.55,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: initialIsDark ? 0.85 : 0.75,
      blending: initialIsDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    })

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial)
    kineticSpaceGroup.add(particleSystem)

    const ringGroup = new THREE.Group()
    kineticSpaceGroup.add(ringGroup)

    const ringMeshes = []
    const ringMaterials = []
    const ringGeometries = []

    const ringCount = shapes.ringCount || shapes.ringGeometries.length || 3

    for (let idx = 0; idx < ringCount; idx++) {
      const geoType = shapes.ringGeometries[idx] || 'TorusGeometry'
      const param = shapes.ringParams[idx] || { args: [8 + idx * 4, 0.12, 16, 80], scale: 1.0 }

      const geom = createShapeGeometry(geoType, param.args)
      ringGeometries.push(geom)

      const colorKey = `color${(idx % 3) + 1}`
      const opacityKey = `opacity${(idx % 3) + 1}`

      const mat = new THREE.MeshBasicMaterial({
        color: initialVariant.rings[colorKey] || initialVariant.rings.color1,
        wireframe: true,
        transparent: true,
        opacity: initialVariant.rings[opacityKey] || initialVariant.rings.opacity1,
      })
      ringMaterials.push(mat)

      const mesh = new THREE.Mesh(geom, mat)
      if (param.scale) {
        mesh.scale.setScalar(param.scale)
      }
      mesh.rotation.x = (idx * Math.PI) / ringCount
      mesh.rotation.y = (idx * Math.PI) / (ringCount + 1)
      ringGroup.add(mesh)
      ringMeshes.push(mesh)
    }

    let particlesNeedUpdate = false

    updateVariantThemeRef.current = (newVariant, newIsDark) => {
      computeParticleTargetColors(newVariant, targetColors)
      particlesNeedUpdate = true
      particleMaterial.blending = newIsDark ? THREE.AdditiveBlending : THREE.NormalBlending
      particleMaterial.opacity = newIsDark ? 0.85 : 0.75
      particleMaterial.needsUpdate = true
    }

    const onPointerMove = (e) => {
      if (e.pointerType !== 'mouse') return
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    }
    window.addEventListener('resize', onResize)

    const handleContextLost = (e) => {
      e.preventDefault()
    }
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false)

    const targetFogColor = new THREE.Color()
    const targetVoltColor = new THREE.Color()
    const targetFuchsiaColor = new THREE.Color()
    const targetWhiteColor = new THREE.Color()
    const targetRingColor = new THREE.Color()

    const TARGET_FRAME_MS = isMobile ? 1000 / 30 : 0
    let animationFrameId
    let lastFrameTime = 0
    const clock = new THREE.Clock()

    const animate = (timestamp) => {
      animationFrameId = requestAnimationFrame(animate)

      if (TARGET_FRAME_MS > 0) {
        if (timestamp - lastFrameTime < TARGET_FRAME_MS) return
        lastFrameTime = timestamp
      }
      const elapsedTime = clock.getElapsedTime()
      const target = targetConfig.current
      const currentVariant = variantColorsRef.current

      const targetX = target.camera.x + mousePos.current.x * 1.5
      const targetY = target.camera.y + mousePos.current.y * 1.0
      const targetZ = target.camera.z

      camera.position.x += (targetX - camera.position.x) * 0.035
      camera.position.y += (targetY - camera.position.y) * 0.035
      camera.position.z += (targetZ - camera.position.z) * 0.035
      camera.lookAt(0, 0, 0)

      const targetRot = target.rotation || { x: 0, y: 0, z: 0 }
      currentRotation.current.x += (targetRot.x - currentRotation.current.x) * 0.035
      currentRotation.current.y += (targetRot.y - currentRotation.current.y) * 0.035
      currentRotation.current.z += (targetRot.z - currentRotation.current.z) * 0.035

      kineticSpaceGroup.rotation.x = currentRotation.current.x
      kineticSpaceGroup.rotation.y = currentRotation.current.y
      kineticSpaceGroup.rotation.z = currentRotation.current.z

      targetFogColor.setHex(currentVariant.fogColor)
      scene.fog.color.lerp(targetFogColor, 0.035)
      scene.fog.density += (currentVariant.fogDensity - scene.fog.density) * 0.035
      if (scene.background) {
        scene.background.lerp(targetFogColor, 0.035)
      }

      ambientLight.intensity += (currentVariant.lights.ambient - ambientLight.intensity) * 0.035

      targetVoltColor.setHex(currentVariant.lights.volt.color)
      voltLight.color.lerp(targetVoltColor, 0.035)

      targetFuchsiaColor.setHex(currentVariant.lights.fuchsia.color)
      fuchsiaLight.color.lerp(targetFuchsiaColor, 0.035)

      targetWhiteColor.setHex(currentVariant.lights.fill.color)
      whiteLight.color.lerp(targetWhiteColor, 0.035)

      const targetVoltIntensity = currentVariant.lights.volt.intensity * (target.voltIntensity / 5.0)
      const targetFuchsiaIntensity = currentVariant.lights.fuchsia.intensity * (target.fuchsiaIntensity / 4.0)
      const targetWhiteIntensity = currentVariant.lights.fill.intensity * (target.whiteIntensity / 1.5)

      voltLight.intensity += (targetVoltIntensity - voltLight.intensity) * 0.035
      fuchsiaLight.intensity += (targetFuchsiaIntensity - fuchsiaLight.intensity) * 0.035
      whiteLight.intensity += (targetWhiteIntensity - whiteLight.intensity) * 0.035

      currentVelocity.current += (target.particleVelocity - currentVelocity.current) * 0.035
      particleSystem.rotation.y += currentVelocity.current * 0.02
      particleSystem.rotation.x += currentVelocity.current * 0.01

      if (particlesNeedUpdate) {
        let anyDiff = false
        for (let i = 0; i < particleCount * 3; i++) {
          const diff = targetColors[i] - colors[i]
          if (Math.abs(diff) > 0.002) {
            colors[i] += diff * 0.05
            anyDiff = true
          } else {
            colors[i] = targetColors[i]
          }
        }
        particleGeometry.attributes.color.needsUpdate = true
        if (!anyDiff) {
          particlesNeedUpdate = false
        }
      }

      ringMaterials.forEach((mat, idx) => {
        const colorKey = `color${(idx % 3) + 1}`
        const opacityKey = `opacity${(idx % 3) + 1}`
        const targetColor = currentVariant.rings[colorKey] || currentVariant.rings.color1
        const targetOpacity = currentVariant.rings[opacityKey] || currentVariant.rings.opacity1

        targetRingColor.setHex(targetColor)
        mat.color.lerp(targetRingColor, 0.035)
        mat.opacity += (targetOpacity - mat.opacity) * 0.035
      })

      ringMeshes.forEach((mesh, idx) => {
        const speed = 0.015 + (idx + 1) * 0.008
        const dir = idx % 2 === 0 ? 1 : -1
        mesh.rotation.z += dir * speed * 0.5
        mesh.rotation.x = Math.sin(elapsedTime * (0.15 + idx * 0.05)) * (0.2 + idx * 0.1)
        mesh.rotation.y += dir * speed * 0.3
      })

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost)

      updateVariantThemeRef.current = null

      particleGeometry.dispose()
      ringGeometries.forEach((g) => g.dispose())

      particleMaterial.dispose()
      ringMaterials.forEach((m) => m.dispose())

      if (particleTexture) {
        particleTexture.dispose()
      }

      scene.clear()
      scene.background = null
      scene.fog = null

      renderer.dispose()
      renderer.forceContextLoss()

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  )
}
