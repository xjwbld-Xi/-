'use client'

import { useState, useEffect } from 'react'
import { mockCalendarEvents } from '@/lib/mockData'
import { AlertCircle, Clock } from 'lucide-react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(targetDate: string, targetTime: string): TimeLeft {
  const [hours, minutes] = targetTime.split(':').map(Number)
  const target = new Date(targetDate)
  target.setHours(hours, minutes, 0)
  
  const now = new Date('2026-06-10T00:00:00')
  const diff = target.getTime() - now.getTime()
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000)
  }
}

export default function CountdownBanner() {
  // 获取今天的重要事件
  const todayEvents = mockCalendarEvents.filter(e => e.status === 'today' && e.importance === 'high')
  
  if (todayEvents.length === 0) {
    // 获取下一个重要事件
    const nextEvent = mockCalendarEvents.find(e => e.status === 'upcoming' && e.importance === 'high')
    if (!nextEvent) return null
    
    return <NextEventBanner event={nextEvent} />
  }
  
  return <TodayEventBanner event={todayEvents[0]} />
}

function TodayEventBanner({ event }: { event: typeof mockCalendarEvents[0] }) {
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(event.date, event.time || '00:00')
  )
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(event.date, event.time || '00:00'))
    }, 1000)
    
    return () => clearInterval(timer)
  }, [event])
  
  return (
    <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border border-red-700 rounded-lg p-4 mb-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-red-400" />
          <div>
            <div className="text-red-400 font-bold">🔥 今日重要数据发布 / Today's Key Release</div>
            <div className="text-white text-lg font-bold">
              {event.name} ({event.nameEn})
            </div>
            <div className="text-sm text-gray-300">
              发布时间: {event.time} | 预期: {event.forecast} | 前值: {event.previous}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-2 text-red-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">距离发布</span>
          </div>
          <div className="text-2xl font-mono font-bold text-white">
            {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </div>
        </div>
      </div>
    </div>
  )
}

function NextEventBanner({ event }: { event: typeof mockCalendarEvents[0] }) {
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(event.date, event.time || '00:00')
  )
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(event.date, event.time || '00:00'))
    }, 60000)
    
    return () => clearInterval(timer)
  }, [event])
  
  return (
    <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-blue-400" />
          <div>
            <div className="text-blue-400 font-bold text-sm">⏰ 下一个重要事件 / Next Key Event</div>
            <div className="text-white font-bold">
              {event.name} ({event.nameEn})
            </div>
            <div className="text-sm text-gray-400">
              {event.date} {event.time}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-xl font-bold text-white">{timeLeft.days}</div>
              <div className="text-xs text-gray-400">天</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">{timeLeft.hours}</div>
              <div className="text-xs text-gray-400">时</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">{timeLeft.minutes}</div>
              <div className="text-xs text-gray-400">分</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
