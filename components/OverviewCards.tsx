'use client'

import { useState, useEffect } from 'react'
import { currentFedRate, mockFedWatchData, getCountdown } from '@/lib/mockData'
import { TrendingDown, Calendar, Activity, Clock } from 'lucide-react'

export default function OverviewCards() {
  const [countdown, setCountdown] = useState(getCountdown('2026-06-17'))
  const [currentTime, setCurrentTime] = useState(new Date())
  
  const currentRate = `${currentFedRate.lower}% - ${currentFedRate.upper}%`
  const mostProbable = mockFedWatchData.probabilities.reduce((prev, current) => 
    prev.probability > current.probability ? prev : current
  )

  // 实时更新倒计时
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown('2026-06-17'))
      setCurrentTime(new Date())
    }, 60000) // 每分钟更新

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-4">
      {/* 时间栏 */}
      <div className="flex items-center justify-between text-sm text-gray-400 px-1">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{formatTime(currentTime)} UTC</span>
        </div>
        <span>最后更新: 2026-06-10 03:00</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Current Rate Card */}
        <div className="fed-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-fed-gold/10 rounded-full -mr-10 -mt-10" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">当前利率 / Current Rate</span>
            <Activity className="w-5 h-5 text-fed-gold" />
          </div>
          <div className="text-3xl font-bold text-white">{currentRate}</div>
          <div className="text-sm text-gray-400 mt-1">
            自 {currentFedRate.lastChanged} 维持不变
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded">
              历史高位
            </span>
            <span className="text-xs text-gray-500">已维持 684 天</span>
          </div>
        </div>

        {/* Countdown Card */}
        <div className="fed-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -mr-10 -mt-10" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">下次FOMC / Next FOMC</span>
            <Calendar className="w-5 h-5 text-fed-gold" />
          </div>
          
          {/* 倒计时显示 */}
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{countdown.days}</div>
              <div className="text-xs text-gray-400">天</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{countdown.hours}</div>
              <div className="text-xs text-gray-400">时</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{countdown.minutes}</div>
              <div className="text-xs text-gray-400">分</div>
            </div>
          </div>
          
          <div className="text-sm text-gray-400">
            2026-06-17 (季度会议 · 有点阵图)
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded">
              SEP
            </span>
            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">
              新闻发布会
            </span>
          </div>
        </div>

        {/* Market Expectation Card */}
        <div className="fed-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -mr-10 -mt-10" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">市场预期 / Market Expectation</span>
            <TrendingDown className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white">{mostProbable.probability}%</div>
          <div className="text-sm text-gray-400 mt-1">
            维持 {mostProbable.rateRange}
          </div>
          <div className="mt-3 space-y-1">
            {mockFedWatchData.probabilities.slice(0, 3).map((p, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-gray-400">{p.rateRange}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-fed-gold rounded-full" 
                      style={{ width: `${p.probability}%` }}
                    />
                  </div>
                  <span className="text-white w-8 text-right">{p.probability}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
