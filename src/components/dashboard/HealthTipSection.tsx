import { useState, useEffect } from 'react'
import { Lightbulb } from 'lucide-react'
import { BRAND_COLORS } from '../../constants/colors'

const HEALTH_TIPS = [
  "Drink at least 8 glasses of water daily to stay hydrated.",
  "Regular hand washing prevents the spread of diseases.",
  "Get 7-8 hours of sleep every night for better health.",
  "Eat fruits and vegetables with every meal.",
  "Take a 10-minute walk after each meal to aid digestion."
]

export default function HealthTipSection() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % HEALTH_TIPS.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 border-l-4" style={{ borderLeftColor: BRAND_COLORS.secondary }}>
      <div className="flex items-center gap-3 mb-4">
        <Lightbulb className="w-5 h-5" style={{ color: BRAND_COLORS.secondary }} />
        <h2 className="font-semibold text-base" style={{ color: BRAND_COLORS.textPrimary }}>Health Tip</h2>
      </div>
      <p className="text-gray-700 mb-5 leading-relaxed">{HEALTH_TIPS[currentTipIndex]}</p>
      <div className="flex gap-1.5 justify-center">
        {HEALTH_TIPS.map((_, index) => (
          <div
            key={index}
            className="rounded-full transition-all duration-300"
            style={{
              width: index === currentTipIndex ? '20px' : '6px',
              height: '4px',
              backgroundColor: index === currentTipIndex ? BRAND_COLORS.secondary : '#E2E8F0',
            }}
          />
        ))}
      </div>
    </section>
  )
}