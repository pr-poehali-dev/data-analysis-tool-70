export const PROMO_ACTIVE = true

export default function PricingSection() {
  return (
    <section id="pricing" className="relative z-10 bg-[#050a18] py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">Купить мод</h3>
        <p className="text-gray-400 text-center mb-12">Попробуй демо бесплатно или сразу бери полную версию</p>

        {/* Акция */}
        {PROMO_ACTIVE && (
          <div className="max-w-3xl mx-auto mb-10 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-5 text-center">
            <div className="text-yellow-400 font-bold text-lg mb-1">🔥 Акция для своих</div>
            <p className="text-gray-300 text-sm">
              Покупал NHL 26 до 14 апреля 2026? Получи NHL 27 по специальной цене.<br />
              Поставь лайк и напиши комментарий в нашем сообществе ВК — и уточни условия в л/с.
            </p>
            <p className="text-yellow-400/60 text-xs mt-2">Акция действует ограниченное время</p>
          </div>
        )}

        <div className={`grid gap-6 max-w-5xl mx-auto ${PROMO_ACTIVE ? 'md:grid-cols-3' : 'md:grid-cols-2 max-w-3xl'}`}>
          {/* Демо */}
          <div className="bg-white/5 rounded-xl p-7 border border-white/10 text-center flex flex-col">
            <h4 className="text-xl font-bold mb-2">Демо-версия</h4>
            <div className="text-4xl font-bold text-[#4fc3f7] my-4">Бесплатно</div>
            <ul className="text-gray-400 space-y-2 mb-8 text-sm flex-1">
              <li>✓ Ограниченный набор команд</li>
              <li>✓ Тест производительности ПК</li>
              <li>✓ Режим тренировки</li>
              <li className="text-gray-600">✗ Полный сезон</li>
              <li className="text-gray-600">✗ Все арены</li>
            </ul>
            <a
              href="https://drive.google.com/file/d/1edw31qtVImvPzE_XKMbN_xIVQ8UPyvu0/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-white/10 border border-white/20 text-white font-semibold py-3 rounded-md hover:bg-white/20 transition text-center"
            >
              Скачать демо
            </a>
          </div>

          {/* Акционная цена */}
          {PROMO_ACTIVE && (
            <div className="bg-yellow-500/5 rounded-xl p-7 border border-yellow-500/30 text-center relative overflow-hidden flex flex-col">
              <div className="absolute top-4 right-4 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                АКЦИЯ
              </div>
              <h4 className="text-xl font-bold mb-1">Для своих</h4>
              <p className="text-gray-500 text-xs mb-2">Покупал NHL 26 до 14.04.2026</p>
              <div className="my-3">
                <div className="text-4xl font-bold text-yellow-400">790 ₽</div>
                <div className="text-gray-500 text-xs mt-1">вместо 1 290 ₽</div>
              </div>
              <ul className="text-gray-300 space-y-2 mb-8 text-sm flex-1">
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
                className="block w-full bg-yellow-500 text-black font-bold py-3 rounded-md hover:bg-yellow-400 transition text-center"
              >
                Купить за 790 ₽
              </a>
            </div>
          )}

          {/* Полная цена */}
          <div className="bg-[#4fc3f7]/10 rounded-xl p-7 border border-[#4fc3f7]/40 text-center relative overflow-hidden flex flex-col">
            <div className="absolute top-4 right-4 bg-[#4fc3f7] text-[#050a18] text-xs font-bold px-2 py-1 rounded-full">
              ХИТ
            </div>
            <h4 className="text-xl font-bold mb-1">Полная версия</h4>
            <p className="text-gray-500 text-xs mb-2">Для новых покупателей</p>
            <div className="my-3">
              <div className="text-4xl font-bold text-[#4fc3f7]">1 290 ₽</div>
              <div className="text-gray-500 text-xs mt-1">брал после 14.04.2026 — 1 190 ₽</div>
            </div>
            <ul className="text-gray-300 space-y-2 mb-8 text-sm flex-1">
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
              Купить за 1 290 ₽
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
