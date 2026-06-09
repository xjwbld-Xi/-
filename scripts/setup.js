const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim())
    })
  })
}

async function setup() {
  console.log('🚀 Fed Monitor 配置向导')
  console.log('========================\n')
  
  console.log('📋 你需要准备以下信息：')
  console.log('1. FRED API Key (从 https://fredaccount.stlouisfed.org/apikeys 获取)')
  console.log('2. Server酱 SendKey (从 https://sct.ftqq.com 获取，可选)')
  console.log('3. GitHub Token (从 https://github.com/settings/tokens 获取，可选)')
  console.log('')
  
  // 获取 FRED API Key
  const fredKey = await askQuestion('请输入 FRED API Key (或按回车跳过): ')
  
  // 获取 Server酱 Key
  const serverChanKey = await askQuestion('请输入 Server酱 SendKey (或按回车跳过): ')
  
  // 创建 .env.local 文件
  const envContent = `# Fed Monitor 配置文件
# 生成时间: ${new Date().toISOString()}

# FRED API Key - 用于获取经济数据
# 获取地址: https://fredaccount.stlouisfed.org/apikeys
FRED_API_KEY=${fredKey}

# Server酱 SendKey - 用于微信推送
# 获取地址: https://sct.ftqq.com
SERVER_CHAN_KEY=${serverChanKey}

# Trading Economics API Key (可选)
# 获取地址: https://tradingeconomics.com/api/
TRADING_ECONOMICS_KEY=

# Vercel 配置 (通常由 CLI 自动管理)
# VERCEL_TOKEN=
# VERCEL_ORG_ID=
# VERCEL_PROJECT_ID=
`

  fs.writeFileSync(path.join(process.cwd(), '.env.local'), envContent)
  console.log('\n✅ .env.local 文件已创建')
  
  // 如果提供了 GitHub Token，尝试配置 Secrets
  if (fredKey || serverChanKey) {
    const configureGithub = await askQuestion('\n是否配置 GitHub Secrets? (需要 GitHub Token) [y/N]: ')
    
    if (configureGithub.toLowerCase() === 'y') {
      const githubToken = await askQuestion('请输入 GitHub Token: ')
      
      if (githubToken) {
        console.log('\n🔄 正在配置 GitHub Secrets...')
        
        // 这里可以添加调用 GitHub API 的代码
        // 但由于需要复杂处理，暂时跳过
        console.log('⚠️ 请手动访问以下地址配置 Secrets:')
        console.log('https://github.com/xjwbld-Xi/-/settings/secrets/actions')
        console.log('')
        console.log('需要添加以下 Secrets:')
        if (fredKey) console.log('- FRED_API_KEY')
        if (serverChanKey) console.log('- SERVER_CHAN_KEY')
      }
    }
  }
  
  console.log('\n✨ 配置完成！')
  console.log('')
  console.log('📖 下一步:')
  console.log('1. 运行 npm run dev 本地预览')
  console.log('2. 运行 npm run update-data 测试数据更新')
  console.log('3. 运行 vercel --prod 部署到线上')
  console.log('')
  
  if (!fredKey) {
    console.log('⚠️ 提示: 尚未配置 FRED_API_KEY，系统将使用演示数据')
    console.log('   请访问 https://fredaccount.stlouisfed.org/apikeys 获取')
  }
  
  rl.close()
}

setup().catch(console.error)
