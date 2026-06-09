import { mockCalendarEvents } from '@/lib/mockData'
import { Clock, Flame, AlertCircle } from 'lucide-react'

export default function EconomicCalendar() {
  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'high': return <Flame className="w-4 h-4 text-red-400" />
      case 'medium': return <AlertCircle className="w-4 h-4 text-yellow-400" />
      default: return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getImportanceLabel = (importance: string) => {
    switch (importance) {
      case 'high': return '高'
      case 'medium': return '中'
      default: return '低'
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'today': return 'bg-red-900/30 border-red-700'
      case 'upcoming': return 'bg-fed-dark border-gray-700'
      default: return 'bg-gray-800/50 border-gray-700'
    }
  }

  return (
    <div className="fed-card">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">📅 经济日历 / Economic Calendar</h2>
        <p className="text-sm text-gray-400">近期重要数据发布 / Upcoming Data Releases</p>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {mockCalendarEvents.map((event, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg border ${getStatusStyle(event.status)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {getImportanceIcon(event.importance)}
                  <span className="text-white font-medium">{event.name}</span>
                  <span className="text-xs text-gray-500">{event.nameEn}</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{event.date} {event.time}</span>
                  <span className="px-2 py-0.5 rounded bg-gray-700 text-xs">
                    重要性: {getImportanceLabel(event.importance)}
                  </span>
                </div>

                {(event.forecast || event.previous) && (
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    {event.forecast && (
                      <span className="text-blue-400">预期: {event.forecast}</span>
                    )}
                    {event.previous && (
                      <span className="text-gray-400">前值: {event.previous}</span>
                    )}
                    {event.actual && (
                      <span className="text-green-400 font-bold">实际: {event.actual}</span>
                    )}
                  </div>
                )}
              </div>

              {event.status === 'today' && (
                <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">
                  今日
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
