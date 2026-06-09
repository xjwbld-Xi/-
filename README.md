# 美联储利率监测看板 / Fed Rate Monitor

实时监测美联储利率决议、经济数据与市场预期。

## 功能特性

- 📊 **CME FedWatch 概率分布** - 实时显示加息/降息概率
- 🔑 **关键因子监测** - Tier 1/2/3 指标分类，带利率影响判断
- 📅 **经济日历** - 重要数据发布时间提醒
- 🏛️ **FOMC 会议日程** - 全年会议安排，标记季度会议
- 📈 **美债收益率曲线** - 2Y/10Y 走势，利差倒挂预警
- 🌐 **中英双语** - 一键切换语言
- 📱 **移动端适配** - 微信直接打开

## 技术栈

- Next.js 14 + React + TypeScript
- Tailwind CSS
- Recharts (图表)
- FRED API (经济数据)
- CME FedWatch 爬虫 (利率概率)

## 本地开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build
```

## 环境变量

创建 `.env.local` 文件：

```env
FRED_API_KEY=your_fred_api_key
SERVER_CHAN_KEY=your_server_chan_key
```

## 数据来源

- FRED (St. Louis Fed) - 经济数据
- CME FedWatch - 利率概率
- Trading Economics - 经济日历

## 免责声明

⚠️ 本页面仅供学习参考，不构成投资建议。

## License

MIT
