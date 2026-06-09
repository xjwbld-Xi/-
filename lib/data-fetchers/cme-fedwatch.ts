// CME FedWatch 数据爬取模块
// 从 CME FedWatch Tool 获取利率概率数据

export interface FedWatchProbability {
  meetingDate: string
  rateRange: string
  probability: number
}

export interface FedWatchData {
  meetingDate: string
  probabilities: FedWatchProbability[]
  lastUpdated: string
}

// Mock 数据（当爬虫不可用时使用）
export const mockFedWatchData: FedWatchData = {
  meetingDate: '2026-06-17',
  probabilities: [
    { meetingDate: '2026-06-17', rateRange: '5.50-5.75%', probability: 5 },
    { meetingDate: '2026-06-17', rateRange: '5.25-5.50%', probability: 45 },
    { meetingDate: '2026-06-17', rateRange: '5.00-5.25%', probability: 35 },
    { meetingDate: '2026-06-17', rateRange: '4.75-5.00%', probability: 15 },
  ],
  lastUpdated: new Date().toISOString().split('T')[0]
}

// TODO: 实现真实爬虫
// 需要用到 Playwright 或 Puppeteer 来抓取 CME 官网
// export async function scrapeCMEFedWatch(): Promise<FedWatchData> {
//   const browser = await chromium.launch()
//   const page = await browser.newPage()
//   await page.goto('https://www.cmegroup.com/fedwatch.html')
//   // ... 解析页面数据
// }

// 获取数据（优先真实数据，回退到 Mock）
export async function getFedWatchData(): Promise<FedWatchData> {
  try {
    // 尝试获取真实数据
    // const realData = await scrapeCMEFedWatch()
    // return realData
    
    // 暂时返回 Mock 数据
    return mockFedWatchData
  } catch (error) {
    console.error('Failed to get FedWatch data:', error)
    return mockFedWatchData
  }
}
