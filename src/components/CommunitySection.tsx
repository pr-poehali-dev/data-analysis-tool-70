import { useState } from 'react'
import Icon from '@/components/ui/icon'

const QR_URL = 'https://cdn.poehali.dev/projects/c44fc60d-ea72-4903-9457-95dfbd1975c6/bucket/198a6f0a-49f0-4d2b-b459-45931b8712d1.jpeg'

const reviews = [
  {
    initial: 'А',
    name: 'Александр Семенов',
    stars: '★★★★★',
    text: '«Работает все отлично, затягивает с первых минут игры) Графика, качество мода отличная, рекомендую платную версию!»',
  },
  {
    initial: 'М',
    name: 'Макс',
    stars: '★★★★★',
    text: '«Все работает отлично. Давно искал. Мод бомба 💥 Графика 🔥 Спасибо тем, кто над ним работал 👍»',
  },
  {
    initial: 'R',
    name: 'Roman Tikhonovich',
    stars: '★★★★★',
    text: '«NHL 16 на базе RPCS3 с этим модом выглядит на удивление бодро. Колоссальная работа: рейтинги соответствуют реальности, переходы учтены, лёд и формы обновлены. Лучший вариант для тех, кто ищет качественный хоккей на ПК.»',
  },
]

function ReviewsSlider() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((i) => (i === 0 ? reviews.length - 1 : i - 1))
  const next = () => setCurrent((i) => (i === reviews.length - 1 ? 0 : i + 1))

  const review = reviews[current]

  return (
    <section className="relative z-10 bg-[#050a18] py-16 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">Отзывы покупателей</h3>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">Что говорят те, кто уже играл в NHL PC Mod</p>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 rounded-xl p-8 border border-white/10 min-h-[180px] flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-[#4fc3f7]/20 flex items-center justify-center text-[#4fc3f7] font-bold text-lg">
                {review.initial}
              </div>
              <div>
                <div className="font-semibold">{review.name}</div>
                <div className="text-yellow-400 text-sm">{review.stars}</div>
              </div>
            </div>
            <p className="text-gray-300 text-base leading-relaxed">{review.text}</p>
          </div>
          <div className="flex items-center justify-center gap-6 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
              <Icon name="ChevronLeft" size={20} />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition ${i === current ? 'bg-[#4fc3f7]' : 'bg-white/20'}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
          <div className="text-center mt-8">
            <a
              href="https://vk.ru/topic-201092136_55849445"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold py-3 px-8 rounded-md hover:bg-white/20 transition"
            >
              <Icon name="ExternalLink" size={16} />
              Все отзывы в сообществе ВКонтакте
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function QRModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-[#071428] border border-[#4fc3f7]/30 rounded-2xl p-6 max-w-sm w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
        >
          <Icon name="X" size={20} />
        </button>
        <p className="text-gray-300 text-sm mb-4 font-medium">Наведите камеру телефона на QR-код</p>
        <img
          src={QR_URL}
          alt="QR-код YouTube канала"
          className="w-full rounded-xl"
        />
        <p className="text-gray-500 text-xs mt-4">Откроется YouTube-канал с обзорами мода</p>
      </div>
    </div>
  )
}

export default function CommunitySection() {
  const [showQR, setShowQR] = useState(false)

  return (
    <>
      <ReviewsSlider />

      {/* VK Community */}
      <section className="relative z-10 bg-[#050a18] py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Icon name="Users" size={48} className="text-[#4fc3f7] mx-auto mb-4" />
          <h3 className="text-3xl font-bold mb-4">Сообщество ВКонтакте</h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Отзывы покупателей NHL на пк, скриншоты, новости мода, полезные статьи и анонсы — всё в нашем сообществе
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://vk.ru/nhl_pc_global"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#0077ff] hover:bg-[#005ecc] text-white font-bold py-3 px-8 rounded-md transition duration-300"
            >
              <Icon name="ExternalLink" size={18} />
              Перейти в сообщество ВК
            </a>
            <a
              href="https://youtube.com/@bobjaman9327?si=1LM0QEaCr1WaGA6o"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#ff0000] hover:bg-[#cc0000] text-white font-bold py-3 px-8 rounded-md transition duration-300"
            >
              <Icon name="Play" size={18} />
              YouTube-канал
            </a>
            <button
              onClick={() => setShowQR(true)}
              className="inline-flex items-center gap-3 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-md transition duration-300"
            >
              <Icon name="QrCode" size={18} />
              QR-код
            </button>
          </div>
        </div>
      </section>

      {showQR && <QRModal onClose={() => setShowQR(false)} />}

      {/* Footer */}
      <footer className="relative z-10 bg-[#050a18] border-t border-white/10 py-6 text-center text-gray-500 text-sm">
        <p>© 2025 NHL 27 PC Mod. Мод создан на основе NHL Legacy Edition.</p>
        <p className="mt-1 text-xs">Не является официальным продуктом EA Sports / NHL.</p>
      </footer>
    </>
  )
}