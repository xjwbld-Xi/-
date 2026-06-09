import { mockIndicators } from '@/lib/mockData'
import { ArrowUp, ArrowDown, Minus, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'

export default function FactorPanel() {
  const tier1 = mockIndicators.filter(i => i.tier === 1)
  const tier2 = mockIndicators.filter(i => i.tier === 2)
  const tier3 = mockIndicators.filter(i => i.tier === 3)

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'hawkish': return <TrendingUp className="w-4 h-4 text-red-400" />
      case 'dovish': return <TrendingDown className="w-4 h-4 text-green-400" />
      default: return <Minus className="w-4 h-4 text-gray-400" />
    }
  }

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case 'hawkish': return '鹰派'
      case 'dovish': return '鸽派'
      default: return '中性'
    }
  }

  const getChangeIcon = (direction: string) => {
    switch (direction) {
      case 'up': return <ArrowUp className="w-4 h-4 text-red-400" />
      case 'down': return <ArrowDown className="w-4 h-4 text-green-400" />
      default: return <Minus className="w-4 h-4 text-gray-400" />
    }
  }

  const renderTier = (title: string, titleEn: string, indicators: typeof mockIndicators, level: number) => (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className="w-5 h-5 text-fed-gold" />
        <h3 className="text-lg font-bold text-white">{title} / {titleEn}</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-2 px-3 text-gray-400 text-sm">指标 / Indicator</th>
              <th className="text-right py-2 px-3 text-gray-400 text-sm">最新值</th>
              <th className="text-right py-2 px-3 text-gray-400 text-sm">前值</th>
              <th className="text-right py-2 px-3 text-gray-400 text-sm">环比</th>
              <th className="text-center py-2 px-3 text-gray-400 text-sm">利率影响</th>
            </tr>
          </thead>
          <tbody>
            {indicators.map((indicator, index) => (
              <tr key={index} className="border-b border-gray-800 hover:bg-fed-dark transition-colors">
                <td className="py-3 px-3">
                  <div className="text-white font-medium">{indicator.name}</div>
                  <div className="text-xs text-gray-500">{indicator.nameEn}</div>
                </td>
                <td className="py-3 px-3 text-right text-white font-bold">{indicator.value}</td>
                <td className="py-3 px-3 text-right text-gray-400">{indicator.previous}</td>
                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {getChangeIcon(indicator.changeDirection)}
                    <span className="text-sm">{indicator.change}</span>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center justify-center gap-1">
                    {getImpactIcon(indicator.impact)}
                    <span className="text-sm">{getImpactLabel(indicator.impact)}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="fed-card">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">🔑 关键因子监测 / Key Factors</h2>
        <p className="text-sm text-gray-400">
          Tier 1: 决定性因子 | Tier 2: 重要确认因子 | Tier 3: 辅助因子
        </p>
      </div>

      {renderTier('第一梯队', 'Tier 1 - Decisive', tier1, 1)}
      {renderTier('第二梯队', 'Tier 2 - Important', tier2, 2)}
      {renderTier('第三梯队', 'Tier 3 - Auxiliary', tier3, 3)}
    </div>
  )
}
