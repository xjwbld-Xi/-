'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { mockYieldData } from '@/lib/mockData'
import { AlertTriangle } from 'lucide-react'

export default function YieldCurve() {
  const latestData = mockYieldData[mockYieldData.length - 1]
  const isInverted = latestData.spread < 0

  return (
    <div className="fed-card">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">📈 美债收益率曲线 / Yield Curve</h2>
            <p className="text-sm text-gray-400">2年期 vs 10年期国债收益率 / 2Y vs 10Y Treasury</p>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-2">
              {isInverted && <AlertTriangle className="w-5 h-5 text-red-400" />}
              <span className="text-2xl font-bold text-white">{latestData.spread > 0 ? '+' : ''}{latestData.spread.toFixed(2)}%</span>
            </div>
            <div className="text-sm text-gray-400">利差 / Spread</div>
          </div>
        </div>

        {isInverted && (
          <div className="mt-2 p-2 bg-red-900/30 border border-red-700 rounded-lg flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm">
              ⚠️ 收益率曲线倒挂 - 经济衰退预警 / Inverted Yield Curve - Recession Warning
            </span>
          </div>
        )}
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockYieldData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickFormatter={(value) => value.substring(5)}
            />
            <YAxis 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              unit="%"
              domain={['dataMin - 0.2', 'dataMax + 0.2']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="3 3" />
            
            <Line 
              type="monotone" 
              dataKey="yield2Y" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              name="2年期 / 2Y"
            />
            
            <Line 
              type="monotone" 
              dataKey="yield10Y" 
              stroke="#c9a84c" 
              strokeWidth={2}
              dot={{ fill: '#c9a84c', r: 4 }}
              name="10年期 / 10Y"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-fed-dark rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-400">{latestData.yield2Y}%</div>
          <div className="text-sm text-gray-400">2年期收益率 / 2Y Yield</div>
        </div>
        <div className="p-3 bg-fed-dark rounded-lg text-center">
          <div className="text-2xl font-bold text-fed-gold">{latestData.yield10Y}%</div>
          <div className="text-sm text-gray-400">10年期收益率 / 10Y Yield</div>
        </div>
      </div>
    </div>
  )
}
