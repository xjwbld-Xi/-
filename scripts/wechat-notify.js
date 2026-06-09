// Server酱 微信推送脚本
// 文档: https://sct.ftqq.com

async function sendWechatNotification(title, content) {
  const serverChanKey = process.env.SERVER_CHAN_KEY
  
  if (!serverChanKey) {
    console.log('⚠️ 未配置 Server酱 Key，跳过推送')
    return
  }
  
  try {
    const response = await fetch(`https://sctapi.ftqq.com/${serverChanKey}.send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        desp: content
      })
    })
    
    const data = await response.json()
    
    if (data.code === 0) {
      console.log('✅ 微信推送成功')
    } else {
      console.error('❌ 微信推送失败:', data.message)
    }
  } catch (error) {
    console.error('❌ 推送错误:', error)
  }
}

// 示例：发送每日摘要
async function sendDailySummary() {
  const today = new Date().toLocaleDateString('zh-CN')
  const title = `📊 美联储监测日报 - ${today}`
  const content = `
## 今日重要数据
- CPI (5月): 预期 3.2%, 前值 3.1%

## 当前利率
- 联邦基金利率: 5.25% - 5.50%

## 市场预期 (6月17日 FOMC)
- 维持不变: 45%
- 降息 25bp: 35%
- 降息 50bp: 20%

## 关键指标
- 核心 PCE: 2.8% ↓ (鸽派)
- 非农就业: 175K ↓ (鸽派)
- 失业率: 4.3% ↑ (鸽派)

[点击查看完整看板](https://fed-monitor.vercel.app)
  `
  
  await sendWechatNotification(title, content)
}

// 如果直接运行此脚本
if (require.main === module) {
  sendDailySummary()
}

module.exports = { sendWechatNotification, sendDailySummary }
