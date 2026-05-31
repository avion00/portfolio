import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { prefersReducedMotion } from '@/lib/utils'
import type { ParallaxState } from '@/hooks/useMouseParallax'

const ACCENT = '#1f6bff'

/** Build an ellipse outline as a closed line loop. */
function useEllipsePoints(rx: number, ry: number, segments = 128) {
  return useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, rx, ry, 0, Math.PI * 2, false, 0)
    const pts = curve.getPoints(segments)
    const geo = new THREE.BufferGeometry().setFromPoints(pts)
    return geo
  }, [rx, ry, segments])
}

function Ring({
  rx,
  ry,
  rotation,
  color,
  opacity,
}: {
  rx: number
  ry: number
  rotation: [number, number, number]
  color: string
  opacity: number
}) {
  const geo = useEllipsePoints(rx, ry)
  return (
    <lineLoop geometry={geo} rotation={rotation}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineLoop>
  )
}

function Triangle({
  size,
  position,
  rotation,
  color,
  opacity,
}: {
  size: number
  position: [number, number, number]
  rotation: [number, number, number]
  color: string
  opacity: number
}) {
  const geo = useMemo(() => {
    const h = size * Math.sqrt(3)
    const pts = [
      new THREE.Vector3(0, h / 2, 0),
      new THREE.Vector3(-size, -h / 2, 0),
      new THREE.Vector3(size, -h / 2, 0),
    ]
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [size])
  return (
    <lineLoop geometry={geo} position={position} rotation={rotation}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineLoop>
  )
}

function Scene({
  parallax,
  reduce,
}: {
  parallax: React.RefObject<ParallaxState>
  reduce: boolean
}) {
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    if (reduce) {
      g.rotation.set(0.2, -0.3, 0)
    } else {
      const p = parallax.current
      g.rotation.y += delta * 0.05
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, p.y * 0.25, 0.04)
      g.position.x = THREE.MathUtils.lerp(g.position.x, p.x * 0.6, 0.04)
    }
    if (core.current && !reduce) {
      core.current.rotation.x += delta * 0.12
      core.current.rotation.y += delta * 0.16
    }
  })

  return (
    <group ref={group}>
      <Float
        speed={reduce ? 0 : 1.1}
        rotationIntensity={reduce ? 0 : 0.3}
        floatIntensity={reduce ? 0 : 0.6}
      >
        {/* Wireframe oval rings */}
        <Ring rx={3.2} ry={2.0} rotation={[0.9, 0.2, 0.3]} color="#ffffff" opacity={0.1} />
        <Ring rx={3.9} ry={2.4} rotation={[1.2, -0.4, -0.2]} color={ACCENT} opacity={0.22} />
        <Ring rx={2.5} ry={2.5} rotation={[-0.6, 0.8, 0.1]} color="#ffffff" opacity={0.08} />
        <Ring rx={4.6} ry={3.0} rotation={[0.4, 0.6, 0.9]} color="#ffffff" opacity={0.06} />

        {/* Triangle outlines */}
        <Triangle size={0.9} position={[2.4, 1.4, -1]} rotation={[0, 0, 0.4]} color={ACCENT} opacity={0.4} />
        <Triangle size={0.6} position={[-2.6, -1.2, 0.5]} rotation={[0, 0, -0.8]} color="#ffffff" opacity={0.18} />
        <Triangle size={1.3} position={[-1.8, 1.8, -2]} rotation={[0, 0, 1.2]} color="#ffffff" opacity={0.1} />

        {/* Abstract wireframe core */}
        <mesh ref={core}>
          <icosahedronGeometry args={[1.1, 0]} />
          <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.35} />
        </mesh>
        <mesh scale={0.55}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.12} />
        </mesh>
      </Float>
    </group>
  )
}

/**
 * Subtle animated 3D backdrop for the hero. Default-exported so it can be
 * lazy-loaded behind a Suspense boundary.
 */
export default function HeroCanvas() {
  const parallax = useMouseParallax(0.06)
  const reduce = prefersReducedMotion()

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 9], fov: 45 }}
    >
      <Scene parallax={parallax} reduce={reduce} />
    </Canvas>
  )
}
