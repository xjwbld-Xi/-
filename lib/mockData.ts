export interface FedWatchData {
  meetingDate: string
  probabilities: {
    rateRange: string
    probability: number
  }[]
  lastUpdated: string
}

export interface EconomicIndicator {
  name: string
  nameEn: string
  value: string
  previous: string
  change: string
  changeDirection: 'up' | 'down' | 'neutral'
  tier: 1 | 2 | 3
  impact: 'hawkish' | 'dovish' | 'neutral'
  lastUpdated: string
}

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

export interface FOMCMeeting {
  date: string
  type: 'regular' | 'quarterly'
  hasDotPlot: boolean
  hasPressConference: boolean
  daysRemaining: number
  status: 'upcoming' | 'past'
}

export interface YieldData {
  date: string
  yield2Y: number
  yield10Y: number
  spread: number
}

// Mock FedWatch 数据
export const mockFedWatchData: FedWatchData = {
  meetingDate: '2026-06-17',
  probabilities: [
    { rateRange: '5.50-5.75%', probability: 5 },
    { rateRange: '5.25-5.50%', probability: 45 },
    { rateRange: '5.00-5.25%', probability: 35 },
    { rateRange: '4.75-5.00%', probability: 15 },
  ],
  lastUpdated: '2026-06-09'
}

// Mock 经济指标数据
export const mockIndicators: EconomicIndicator[] = [
  {
    name: '核心 PCE',
    nameEn: 'Core PCE',
    value: '2.8%',
    previous: '2.9%',
    change: '-0.1%',
    changeDirection: 'down',
    tier: 1,
    impact: 'dovish',
    lastUpdated: '2026-05-30'
  },
  {
    name: '非农就业',
    nameEn: 'Non-Farm Payrolls',
    value: '175K',
    previous: '190K',
    change: '-15K',
    changeDirection: 'down',
    tier: 1,
    impact: 'dovish',
    lastUpdated: '2026-06-05'
  },
  {
    name: '失业率',
    nameEn: 'Unemployment Rate',
    value: '4.3%',
    previous: '4.2%',
    change: '+0.1%',
    changeDirection: 'up',
    tier: 1,
    impact: 'dovish',
    lastUpdated: '2026-06-05'
  },
  {
    name: 'CPI 同比',
    nameEn: 'CPI YoY',
    value: '3.2%',
    previous: '3.1%',
    change: '+0.1%',
    changeDirection: 'up',
    tier: 1,
    impact: 'hawkish',
    lastUpdated: '2026-05-10'
  },
  {
    name: '平均时薪',
    nameEn: 'Average Hourly Earnings',
    value: '3.4%',
    previous: '3.5%',
    change: '-0.1%',
    changeDirection: 'down',
    tier: 1,
    impact: 'dovish',
    lastUpdated: '2026-06-05'
  },
  {
    name: 'ISM 制造业',
    nameEn: 'ISM Manufacturing',
    value: '48.7',
    previous: '49.2',
    change: '-0.5',
    changeDirection: 'down',
    tier: 2,
    impact: 'dovish',
    lastUpdated: '2026-06-02'
  },
  {
    name: '零售销售',
    nameEn: 'Retail Sales',
    value: '0.2%',
    previous: '0.5%',
    change: '-0.3%',
    changeDirection: 'down',
    tier: 2,
    impact: 'dovish',
    lastUpdated: '2026-05-15'
  },
  {
    name: 'GDP 增长率',
    nameEn: 'GDP Growth',
    value: '1.8%',
    previous: '2.1%',
    change: '-0.3%',
    changeDirection: 'down',
    tier: 2,
    impact: 'dovish',
    lastUpdated: '2026-04-25'
  },
  {
    name: '初请失业金',
    nameEn: 'Initial Jobless Claims',
    value: '238K',
    previous: '222K',
    change: '+16K',
    changeDirection: 'up',
    tier: 3,
    impact: 'dovish',
    lastUpdated: '2026-06-05'
  },
  {
    name: '新屋开工',
    nameEn: 'Housing Starts',
    value: '1.36M',
    previous: '1.42M',
    change: '-0.06M',
    changeDirection: 'down',
    tier: 3,
    impact: 'dovish',
    lastUpdated: '2026-05-16'
  }
]

// Mock 经济日历
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

// Mock FOMC 会议日程
export const mockFOMCMeetings: FOMCMeeting[] = [
  { date: '2026-01-28', type: 'regular', hasDotPlot: false, hasPressConference: false, daysRemaining: -133, status: 'past' },
  { date: '2026-03-18', type: 'quarterly', hasDotPlot: true, hasPressConference: true, daysRemaining: -83, status: 'past' },
  { date: '2026-05-06', type: 'regular', hasDotPlot: false, hasPressConference: false, daysRemaining: -34, status: 'past' },
  { date: '2026-06-17', type: 'quarterly', hasDotPlot: true, hasPressConference: true, daysRemaining: 7, status: 'upcoming' },
  { date: '2026-07-29', type: 'regular', hasDotPlot: false, hasPressConference: false, daysRemaining: 49, status: 'upcoming' },
  { date: '2026-09-16', type: 'quarterly', hasDotPlot: true, hasPressConference: true, daysRemaining: 98, status: 'upcoming' },
  { date: '2026-10-28', type: 'regular', hasDotPlot: false, hasPressConference: false, daysRemaining: 140, status: 'upcoming' },
  { date: '2026-12-16', type: 'quarterly', hasDotPlot: true, hasPressConference: true, daysRemaining: 189, status: 'upcoming' }
]

// Mock 美债收益率数据
export const mockYieldData: YieldData[] = [
  { date: '2026-01-02', yield2Y: 4.25, yield10Y: 4.55, spread: 0.30 },
  { date: '2026-02-02', yield2Y: 4.35, yield10Y: 4.50, spread: 0.15 },
  { date: '2026-03-02', yield2Y: 4.45, yield10Y: 4.45, spread: 0.00 },
  { date: '2026-04-02', yield2Y: 4.55, yield10Y: 4.40, spread: -0.15 },
  { date: '2026-05-02', yield2Y: 4.65, yield10Y: 4.42, spread: -0.23 },
  { date: '2026-06-02', yield2Y: 4.85, yield10Y: 4.50, spread: -0.35 },
]

export const currentFedRate = {
  lower: 5.25,
  upper: 5.50,
  lastChanged: '2023-07-26'
}
