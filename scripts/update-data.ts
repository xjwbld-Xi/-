// 数据更新主脚本
// 由 GitHub Actions 定时调用

import { getDashboardData } from '../lib/data-fetchers'

async function main() {
  console.log('🚀 Starting data update...')
  console.log(`⏰ ${new Date().toISOString()}`)
  
  const fredApiKey = process.env.FRED_API_KEY
  const tradingEconKey = process.env.TRADING_ECONOMICS_KEY
  
  try {
    const data = await getDashboardData(fredApiKey, tradingEconKey)
    
    console.log('✅ Data update completed')
    console.log(`📊 Last updated: ${data.lastUpdated}`)
    console.log(`📈 FedWatch meeting: ${data.fedWatch.meetingDate}`)
    console.log(`📅 Calendar events: ${data.calendar.length}`)
    
    // TODO: 发送微信推送（如果需要）
    // if (process.env.SERVER_CHAN_KEY) {
    //   await sendDailySummary()
    // }
    
  } catch (error) {
    console.error('❌ Data update failed:', error)
    process.exit(1)
  }
}

main()
