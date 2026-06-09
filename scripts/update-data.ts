// 数据更新主脚本
// 由 GitHub Actions 定时调用

import { getDashboardData } from '../lib/data-fetchers'

async function main() {
  console.log('🚀 Starting data update...')
  console.log(`⏰ ${new Date().toISOString()}`)
  
  try {
    const data = await getDashboardData()
    
    console.log('✅ Data update completed')
    console.log(`📊 Last updated: ${data.lastUpdated}`)
    console.log(`📈 FedWatch meeting: ${data.fedWatch.meetingDate}`)
    console.log(`📅 Calendar events: ${data.calendar.length}`)
    
    // 发送微信推送（如果配置了 Server酱）
    if (process.env.SERVER_CHAN_KEY) {
      try {
        const { sendDailySummary } = await import('./wechat-notify')
        await sendDailySummary()
        console.log('📱 WeChat notification sent')
      } catch (error) {
        console.error('❌ Failed to send WeChat notification:', error)
      }
    }
    
  } catch (error) {
    console.error('❌ Data update failed:', error)
    process.exit(1)
  }
}

main()
