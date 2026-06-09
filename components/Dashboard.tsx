import OverviewCards from './OverviewCards'
import FedWatchChart from './FedWatchChart'
import FactorPanel from './FactorPanel'
import EconomicCalendar from './EconomicCalendar'
import FOMCSchedule from './FOMCSchedule'
import YieldCurve from './YieldCurve'

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          🇺🇸 Fed Monitor
        </h1>
        <p className="text-gray-400">
          美联储利率监测看板 / Federal Reserve Rate Monitor
        </p>
        <p className="text-sm text-gray-500 mt-1">
          最后更新: 2026-06-09 03:00 UTC
        </p>
      </div>

      {/* Overview Cards */}
      <OverviewCards />

      {/* FedWatch Chart */}
      <FedWatchChart />

      {/* Key Factors */}
      <FactorPanel />

      {/* Calendar & FOMC */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EconomicCalendar />
        <FOMCSchedule />
      </div>

      {/* Yield Curve */}
      <YieldCurve />

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-4">
        <p>数据来源: FRED, CME FedWatch, Trading Economics</p>
        <p className="mt-1">⚠️ 本页面仅供学习参考，不构成投资建议</p>
      </footer>
    </div>
  )
}
