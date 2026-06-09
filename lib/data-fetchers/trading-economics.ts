// Trading Economics API 封装
// 获取经济日历数据
// 免费层限制：100 次/月

export interface CalendarEvent {
  date: string
  time: string
  name: string
  nameEn: string
  importance: 'high' | 'medium' | 'low'
  actual?: string
  forecast?: string
  previous?: string
  status: 'upcoming' | 'today' | 'past'
}

const TRADING_ECONOMICS_BASE = 'https://api.tradingeconomics.com'

// Mock 经济日历数据
export const mockCalendarEvents: CalendarEvent[] = [
  {
    date: '2026-06-10',
    time: '14:30',
    name: 'CPI (5月)',
    nameEn: 'CPI (May)',
    importance: 'high',
    forecast: '3.2%',
    previous: '3.1%',
    status: 'today'
  },
  {
    date: '2026-06-11',
    time: '14:30',
    name: '初请失业金',
    nameEn: 'Initial Jobless Claims',
    importance: 'medium',
    previous: '222K',
    status: 'upcoming'
  },
  {
    date: '2026-06-16',
    time: '02:00',
    name: 'FOMC 会议开始',
    nameEn: 'FOMC Meeting Begins',
    importance: 'high',
    status: 'upcoming'
  },
  {
    date: '2026-06-17',
    time: '02:00',
    name: 'FOMC 利率决议',
    nameEn: 'FOMC Rate Decision',
    importance: 'high',
    status: 'upcoming'
  },
  {
    date: '2026-06-17',
    time: '02:30',
    name: '鲍威尔新闻发布会',
    nameEn: 'Powell Press Conference',
    importance: 'high',
    status: 'upcoming'
  },
  {
    date: '2026-06-25',
    time: '14:30',
    name: '核心 PCE (5月)',
    nameEn: 'Core PCE (May)',
    importance: 'high',
    forecast: '2.7%',
    previous: '2.8%',
    status: 'upcoming'
  },
  {
    date: '2026-07-03',
    time: '14:30',
    name: '非农就业 (6月)',
    nameEn: 'Non-Farm Payrolls (Jun)',
    importance: 'high',
    status: 'upcoming'
  }
]

// 获取经济日历
export async function getEconomicCalendar(
  apiKey?: string,
  startDate?: string,
  endDate?: string
): Promise<CalendarEvent[]> {
  try {
    if (!apiKey) {
      console.log('⚠️ No Trading Economics API key, using mock data')
      return mockCalendarEvents
    }
    
    // TODO: 实现真实 API 调用
    // const url = `${TRADING_ECONOMICS_BASE}/calendar/country/united-states?c=${apiKey}&f=json`
    // const response = await fetch(url)
    // const data = await response.json()
    // return formatCalendarData(data)
    
    return mockCalendarEvents
  } catch (error) {
    console.error('Failed to get calendar:', error)
    return mockCalendarEvents
  }
}
