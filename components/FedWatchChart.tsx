'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { mockFedWatchData } from '@/lib/mockData'

export default function FedWatchChart() {
  const data = mockFedWatchData.probabilities

  return (
    <div className="fed-card">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">
          📊 CME FedWatch 概率分布
        </h2>
        <p className="text-sm text-gray-400">
          FOMC 会议: {mockFedWatchData.meetingDate} | 最后更新: {mockFedWatchData.lastUpdated}
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="rateRange" 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <YAxis 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              unit="%"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: number) => [`${value}%`, '概率']}
            />
            <Bar dataKey="probability" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === 1 ? '#c9a84c' : '#3b82f6'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {data.map((item, index) => (
          <div key={index} className="text-center p-3 bg-fed-dark rounded-lg">
            <div className="text-2xl font-bold text-white">{item.probability}%</div>
            <div className="text-xs text-gray-400">{item.rateRange}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
