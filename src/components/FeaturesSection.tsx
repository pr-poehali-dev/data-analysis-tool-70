import Icon from '@/components/ui/icon'

export default function FeaturesSection() {
  return (
    <>
      {/* Features */}
      <section id="features" className="relative z-10 mt-[100vh] bg-[#050a18] pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">Что внутри мода?</h3>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">Реальный НХЛ-опыт на вашем ПК — обновлённые данные сезона 2026</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#4fc3f7]/40 transition">
              <div className="text-[#4fc3f7] mb-4">
                <Icon name="Trophy" size={32} />
              </div>
              <h4 className="text-xl font-semibold mb-3">Актуальные составы</h4>
              <p className="text-gray-400">30 команд НХЛ + Вегас и Сиэтл через замену — реальные игроки, рейтинги и форма сезона 2026/27.</p>
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
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#4fc3f7]/5 rounded-xl p-8 border border-[#4fc3f7]/30 mb-6">
              <h4 className="text-lg font-semibold mb-6 text-[#4fc3f7] uppercase tracking-wider">Рекомендуемые</h4>
              <ul className="space-y-4 text-gray-300">
                <li className="flex gap-3">
                  <Icon name="Layers" size={16} className="text-[#4fc3f7] mt-0.5 shrink-0" />
                  <span><span className="text-white font-medium">ОС:</span> Windows 10 64-bit, Linux 64-bit, macOS 11 (Big Sur) или новее</span>
                </li>
                <li className="flex gap-3">
                  <Icon name="Cpu" size={16} className="text-[#4fc3f7] mt-0.5 shrink-0" />
                  <span>
                    <span className="text-white font-medium">Процессор Intel:</span> Core i5-10400 или лучше (AVX2, Coffee Lake+). Рекомендуется Core i7/i9.<br />
                    <span className="text-white font-medium">Процессор AMD:</span> Ryzen 5 3600 или лучше (AVX2, Zen 2+). Рекомендуется Ryzen 7/9.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Icon name="MemoryStick" size={16} className="text-[#4fc3f7] mt-0.5 shrink-0" />
                  <span><span className="text-white font-medium">ОЗУ:</span> 16 ГБ RAM</span>
                </li>
                <li className="flex gap-3">
                  <Icon name="Monitor" size={16} className="text-[#4fc3f7] mt-0.5 shrink-0" />
                  <span>
                    <span className="text-white font-medium">Видеокарта Nvidia:</span> GeForce GTX 1060 6GB или новее.<br />
                    <span className="text-white font-medium">Видеокарта AMD:</span> Radeon RX 580 8GB или новее.<br />
                    <span className="text-white font-medium">DirectX:</span> 12
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-green-500/5 rounded-xl p-5 border border-green-500/20 text-gray-300 text-sm">
              <span className="text-green-400 font-semibold">✅ На менее мощных ПК тоже работает и довольно хорошо!</span><br />
              Обладатели Xeon E5-1650 v2, разогнанного до 4.2 ГГц — вы тоже будете играть без лагов 👌
            </div>
          </div>
        </div>
      </section>
    </>
  )
}