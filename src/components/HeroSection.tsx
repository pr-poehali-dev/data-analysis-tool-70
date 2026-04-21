import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import Icon from '@/components/ui/icon'

function SpinningPuck() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.8
      groupRef.current.rotation.x += delta * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.25, 32]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.8, 0.05, 8, 32]} />
        <meshStandardMaterial color="#4fc3f7" emissive="#4fc3f7" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.3, 0.15, 0.2]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#4fc3f7" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.3, -0.15, -0.2]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

function AnimatedBox({ initialPosition }: { initialPosition: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(...initialPosition))
  const currentPosition = useRef(new THREE.Vector3(...initialPosition))

  const getAdjacentIntersection = (current: THREE.Vector3) => {
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    const randomDirection = directions[Math.floor(Math.random() * directions.length)]
    return new THREE.Vector3(
      current.x + randomDirection[0] * 3,
      0.5,
      current.z + randomDirection[1] * 3
    )
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newPosition = getAdjacentIntersection(currentPosition.current)
      newPosition.x = Math.max(-15, Math.min(15, newPosition.x))
      newPosition.z = Math.max(-15, Math.min(15, newPosition.z))
      setTargetPosition(newPosition)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useFrame(() => {
    if (meshRef.current) {
      currentPosition.current.lerp(targetPosition, 0.1)
      meshRef.current.position.copy(currentPosition.current)
    }
  })

  return (
    <mesh ref={meshRef} position={initialPosition}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4fc3f7" opacity={0.6} transparent metalness={0.7} roughness={0.3} />
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(1, 1, 1)]} />
        <lineBasicMaterial attach="material" color="#4fc3f7" linewidth={2} />
      </lineSegments>
    </mesh>
  )
}

function Scene() {
  const initialPositions: [number, number, number][] = [
    [-9, 0.5, -9], [-3, 0.5, -3], [0, 0.5, 0], [3, 0.5, 3], [9, 0.5, 9],
    [-6, 0.5, 6], [6, 0.5, -6], [-12, 0.5, 0], [12, 0.5, 0], [0, 0.5, 12],
  ]

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} color="#4fc3f7" intensity={1.5} />
      <pointLight position={[-10, 10, -10]} color="#ffffff" intensity={0.5} />
      <Grid
        renderOrder={-1}
        position={[0, 0, 0]}
        infiniteGrid
        cellSize={1}
        cellThickness={0.5}
        sectionSize={3}
        sectionThickness={1}
        sectionColor={[0.3, 0.76, 0.98]}
        fadeDistance={50}
      />
      {initialPositions.map((position, index) => (
        <AnimatedBox key={index} initialPosition={position} />
      ))}
    </>
  )
}

export default function HeroSection() {
  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-10 p-4">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-16 h-16 hidden md:block">
              <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} color="#4fc3f7" />
                <SpinningPuck />
              </Canvas>
            </div>
            <div>
              <span className="text-2xl font-bold text-white tracking-tight">NHL 27</span>
              <span className="text-xs text-[#4fc3f7] block -mt-1 tracking-widest uppercase">PC Mod</span>
            </div>
          </div>
          <ul className="hidden md:flex space-x-6 text-sm">
            <li><a href="#features" className="hover:text-[#4fc3f7] transition">О моде</a></li>
            <li><a href="#requirements" className="hover:text-[#4fc3f7] transition">Требования</a></li>
            <li><a href="#pricing" className="hover:text-[#4fc3f7] transition">Купить</a></li>
            <li>
              <a
                href="https://vk.ru/nhl_pc_global"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#4fc3f7] transition flex items-center gap-1"
              >
                <Icon name="Users" size={14} />
                Сообщество
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Desktop (3D) */}
      <div className="hidden md:block">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 px-4 w-full">
          <div className="inline-block bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 rounded-full px-4 py-1 text-[#4fc3f7] text-sm mb-6">
            🏒 Сезон 2025 — Уже доступен
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 max-w-4xl mx-auto leading-tight">
            NHL 27<br />
            <span className="text-[#4fc3f7]">для ПК</span>
          </h1>
          <h2 className="text-lg md:text-xl mb-10 text-gray-300 max-w-xl mx-auto">
            Полноценный хоккейный симулятор на ПК — реальные составы, арены и геймплей сезона 2025
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://yoomoney.ru/to/4100118962547616"
              target="_blank"
              rel="noopener noreferrer"
              title="После оплаты пришли скриншот перевода в л/с сообщества ВКонтакте"
              className="bg-[#4fc3f7] text-[#050a18] font-bold py-3 px-8 rounded-md hover:bg-[#81d4fa] transition duration-300 text-lg"
            >
              Купить мод
            </a>
            <a
              href="https://drive.google.com/file/d/1edw31qtVImvPzE_XKMbN_xIVQ8UPyvu0/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 border border-white/20 text-white font-semibold py-3 px-8 rounded-md hover:bg-white/20 transition duration-300 text-lg backdrop-blur-sm"
            >
              Скачать демо
            </a>
          </div>
        </div>
        <Canvas shadows camera={{ position: [30, 30, 30], fov: 50 }} className="absolute inset-0" style={{ height: '100vh' }}>
          <Scene />
        </Canvas>
      </div>

      {/* Hero Mobile (без 3D) */}
      <div className="md:hidden relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center bg-gradient-to-b from-[#050a18] via-[#071428] to-[#050a18]">
        <div className="w-24 h-24 mb-6">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} color="#4fc3f7" />
            <SpinningPuck />
          </Canvas>
        </div>
        <div className="inline-block bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 rounded-full px-4 py-1 text-[#4fc3f7] text-sm mb-5">
          🏒 Сезон 2025 — Уже доступен
        </div>
        <h1 className="text-4xl font-bold mb-3 leading-tight">
          NHL 27<br />
          <span className="text-[#4fc3f7]">для ПК</span>
        </h1>
        <p className="text-gray-300 text-base mb-8 max-w-sm">
          Полноценный хоккейный симулятор — реальные составы, арены и геймплей сезона 2025
        </p>
        <div className="flex flex-col w-full max-w-xs gap-3">
          <a
            href="https://yoomoney.ru/to/4100118962547616"
            target="_blank"
            rel="noopener noreferrer"
            title="После оплаты пришли скриншот перевода в л/с сообщества ВКонтакте"
            className="bg-[#4fc3f7] text-[#050a18] font-bold py-4 px-8 rounded-md hover:bg-[#81d4fa] transition text-lg text-center"
          >
            Купить мод
          </a>
          <a
            href="https://drive.google.com/file/d/1edw31qtVImvPzE_XKMbN_xIVQ8UPyvu0/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 border border-white/20 text-white font-semibold py-4 px-8 rounded-md hover:bg-white/20 transition text-lg text-center"
          >
            Скачать демо
          </a>
        </div>
        <div className="mt-8">
          <Icon name="ChevronDown" size={28} className="text-[#4fc3f7] animate-bounce" />
        </div>
      </div>
    </>
  )
}
