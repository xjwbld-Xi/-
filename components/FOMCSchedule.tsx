import { mockFOMCMeetings } from '@/lib/mockData'
import { Calendar, Mic, BarChart3 } from 'lucide-react'

export default function FOMCSchedule() {
  const upcomingMeetings = mockFOMCMeetings.filter(m => m.status === 'upcoming')

  return (
    <div className="fed-card">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">🏛️ FOMC 会议日程 / FOMC Schedule</h2>
        <p className="text-sm text-gray-400">2026年会议安排 / 2026 Meeting Schedule</p>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {upcomingMeetings.map((meeting, index) => (
          <div 
            key={index}
            className={`p-3 rounded-lg border ${
              meeting.daysRemaining <= 7 
                ? 'bg-red-900/30 border-red-700' 
                : 'bg-fed-dark border-gray-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-fed-gold" />
                <span className="text-white font-bold">{meeting.date}</span>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                meeting.daysRemaining <= 7 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-700 text-gray-300'
              }`}>
                {meeting.daysRemaining <= 0 
                  ? '已结束' 
                  : `还有 ${meeting.daysRemaining} 天`
                }
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="px-2 py-0.5 rounded bg-gray-700">
                {meeting.type === 'quarterly' ? '季度会议' : '常规会议'}
              </span>
              
              {meeting.hasDotPlot && (
                <span className="flex items-center gap-1 text-fed-gold">
                  <BarChart3 className="w-3 h-3" /> 点阵图
                </span>
              )}
              
              {meeting.hasPressConference && (
                <span className="flex items-center gap-1 text-blue-400">
                  <Mic className="w-3 h-3" /> 发布会
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-fed-dark rounded-lg">
        <p className="text-sm text-gray-400">💡 季度会议包含：</p>
        <ul className="text-sm text-gray-500 mt-1 space-y-1">
          <li>• 经济预测摘要 (SEP)</li>
          <li>• 利率点阵图 (Dot Plot)</li>
          <li>• 美联储主席新闻发布会</li>
        </ul>
      </div>
    </div>
  )
}
