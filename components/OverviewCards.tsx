import { currentFedRate, mockFedWatchData } from '@/lib/mockData'
import { TrendingDown, Calendar, Activity } from 'lucide-react'

export default function OverviewCards() {
  const nextMeeting = new Date('2026-06-17')
  const today = new Date('2026-06-09')
  const daysRemaining = Math.ceil((nextMeeting.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  
  const currentRate = `${currentFedRate.lower}% - ${currentFedRate.upper}%`
  const mostProbable = mockFedWatchData.probabilities.reduce((prev, current) => 
    prev.probability > current.probability ? prev : current
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Current Rate Card */}
      <div className="fed-card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">当前利率 / Current Rate</span>
          <Activity className="w-5 h-5 text-fed-gold" />
        </div>
        <div className="text-3xl font-bold text-white">{currentRate}</div>
        <div className="text-sm text-gray-400 mt-1">
          自 {currentFedRate.lastChanged} 维持不变
        </div>
      </div>

      {/* Countdown Card */}
      <div className="fed-card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">下次FOMC / Next FOMC</span>
          <Calendar className="w-5 h-5 text-fed-gold" />
        </div>
        <div className="text-3xl font-bold text-white">{daysRemaining} 天</div>
        <div className="text-sm text-gray-400 mt-1">
          2026-06-17 (季度会议 · 有点阵图)
        </div>
      </div>

      {/* Market Expectation Card */}
      <div className="fed-card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">市场预期 / Market Expectation</span>
          <TrendingDown className="w-5 h-5 text-green-400" />
        </div>
        <div className="text-3xl font-bold text-white">{mostProbable.probability}%</div>
        <div className="text-sm text-gray-400 mt-1">
          维持 {mostProbable.rateRange}
        </div>
      </div>
    </div>
  )
}
