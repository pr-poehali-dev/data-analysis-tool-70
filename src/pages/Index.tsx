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
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]
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
    [-9, 0.5, -9],
    [-3, 0.5, -3],
    [0, 0.5, 0],
    [3, 0.5, 3],
    [9, 0.5, 9],
    [-6, 0.5, 6],
    [6, 0.5, -6],
    [-12, 0.5, 0],
    [12, 0.5, 0],
    [0, 0.5, 12],
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

const Index = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#050a18] text-white overflow-x-hidden font-inter">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-4">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-16 h-16">
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

      {/* Hero */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 px-4 w-full">
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

      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [30, 30, 30], fov: 50 }} className="absolute inset-0 h-screen" style={{ height: '100vh' }}>
        <Scene />
      </Canvas>

      {/* Features Section */}
      <section id="features" className="relative z-10 mt-[100vh] bg-[#050a18] pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">Что внутри мода?</h3>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">Реальный НХЛ-опыт на вашем ПК — обновлённые данные сезона 2025</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#4fc3f7]/40 transition">
              <div className="text-[#4fc3f7] mb-4">
                <Icon name="Trophy" size={32} />
              </div>
              <h4 className="text-xl font-semibold mb-3">Актуальные составы</h4>
              <p className="text-gray-400">Все 32 команды НХЛ с реальными игроками, рейтингами и формой сезона 2024/25.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#4fc3f7]/40 transition">
              <div className="text-[#4fc3f7] mb-4">
                <Icon name="Gamepad2" size={32} />
              </div>
              <h4 className="text-xl font-semibold mb-3">Улучшенный геймплей</h4>
              <p className="text-gray-400">Доработанная физика, анимации и искусственный интеллект для более реалистичных матчей.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#4fc3f7]/40 transition">
              <div className="text-[#4fc3f7] mb-4">
                <Icon name="Download" size={32} />
              </div>
              <h4 className="text-xl font-semibold mb-3">Простая установка</h4>
              <p className="text-gray-400">Пошаговая инструкция и поддержка — запустите мод за 15 минут без лишних сложностей.</p>
            </div>
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section id="requirements" className="relative z-10 bg-[#050a18] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">Системные требования</h3>
          <p className="text-gray-400 text-center mb-12">Рекомендуемые характеристики для комфортной игры</p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="text-lg font-semibold mb-4 text-gray-300 uppercase tracking-wider">Минимальные</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-3"><Icon name="Cpu" size={16} className="text-gray-500" /> Intel Core i5 / AMD Ryzen 5</li>
                <li className="flex items-center gap-3"><Icon name="MemoryStick" size={16} className="text-gray-500" /> 8 ГБ ОЗУ</li>
                <li className="flex items-center gap-3"><Icon name="Monitor" size={16} className="text-gray-500" /> NVIDIA GTX 1060 / AMD RX 580</li>
                <li className="flex items-center gap-3"><Icon name="HardDrive" size={16} className="text-gray-500" /> 30 ГБ свободного места</li>
                <li className="flex items-center gap-3"><Icon name="Layers" size={16} className="text-gray-500" /> Windows 10 (64-bit)</li>
              </ul>
            </div>
            <div className="bg-[#4fc3f7]/5 rounded-xl p-6 border border-[#4fc3f7]/30">
              <h4 className="text-lg font-semibold mb-4 text-[#4fc3f7] uppercase tracking-wider">Рекомендуемые</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3"><Icon name="Cpu" size={16} className="text-[#4fc3f7]" /> Intel Core i7 / AMD Ryzen 7</li>
                <li className="flex items-center gap-3"><Icon name="MemoryStick" size={16} className="text-[#4fc3f7]" /> 16 ГБ ОЗУ</li>
                <li className="flex items-center gap-3"><Icon name="Monitor" size={16} className="text-[#4fc3f7]" /> NVIDIA RTX 3070 / AMD RX 6700</li>
                <li className="flex items-center gap-3"><Icon name="HardDrive" size={16} className="text-[#4fc3f7]" /> SSD, 30 ГБ свободного места</li>
                <li className="flex items-center gap-3"><Icon name="Layers" size={16} className="text-[#4fc3f7]" /> Windows 10/11 (64-bit)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 bg-[#050a18] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">Купить мод</h3>
          <p className="text-gray-400 text-center mb-12">Попробуй демо бесплатно или сразу бери полную версию</p>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white/5 rounded-xl p-8 border border-white/10 text-center">
              <h4 className="text-xl font-bold mb-2">Демо-версия</h4>
              <div className="text-4xl font-bold text-[#4fc3f7] my-4">Бесплатно</div>
              <ul className="text-gray-400 space-y-2 mb-8 text-sm">
                <li>✓ Ограниченный набор команд</li>
                <li>✓ Тест производительности ПК</li>
                <li>✓ Режим тренировки</li>
                <li className="text-gray-600">✗ Полный сезон</li>
                <li className="text-gray-600">✗ Все арены</li>
              </ul>
              <button className="w-full bg-white/10 border border-white/20 text-white font-semibold py-3 rounded-md hover:bg-white/20 transition">
                Скачать демо
              </button>
            </div>
            <div className="bg-[#4fc3f7]/10 rounded-xl p-8 border border-[#4fc3f7]/40 text-center relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#4fc3f7] text-[#050a18] text-xs font-bold px-2 py-1 rounded-full">
                ХИТ
              </div>
              <h4 className="text-xl font-bold mb-2">Полная версия</h4>
              <div className="text-4xl font-bold text-[#4fc3f7] my-4">NHL 27</div>
              <ul className="text-gray-300 space-y-2 mb-8 text-sm">
                <li>✓ Все 32 команды НХЛ</li>
                <li>✓ Полный сезон 2024/25</li>
                <li>✓ Все арены и форма</li>
                <li>✓ Поддержка и обновления</li>
                <li>✓ Инструкция по установке</li>
              </ul>
              <a
                href="https://yoomoney.ru/to/4100118962547616"
                target="_blank"
                rel="noopener noreferrer"
                title="После оплаты пришли скриншот перевода в л/с сообщества ВКонтакте"
                className="block w-full bg-[#4fc3f7] text-[#050a18] font-bold py-3 rounded-md hover:bg-[#81d4fa] transition text-center"
              >
                Купить мод
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* VK Community */}
      <section className="relative z-10 bg-[#050a18] py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Icon name="Users" size={48} className="text-[#4fc3f7] mx-auto mb-4" />
          <h3 className="text-3xl font-bold mb-4">Сообщество ВКонтакте</h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Отзывы покупателей NHL 26, скриншоты, новости мода, полезные статьи и анонсы — всё в нашем сообществе
          </p>
          <a
            href="https://vk.ru/nhl_pc_global"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#0077ff] hover:bg-[#005ecc] text-white font-bold py-3 px-8 rounded-md transition duration-300"
          >
            <Icon name="ExternalLink" size={18} />
            Перейти в сообщество ВК
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-[#050a18] border-t border-white/10 py-6 text-center text-gray-500 text-sm">
        <p>© 2025 NHL 27 PC Mod. Мод создан на основе NHL Legacy Edition.</p>
        <p className="mt-1 text-xs">Не является официальным продуктом EA Sports / NHL.</p>
      </footer>
    </div>
  )
}

export default Index