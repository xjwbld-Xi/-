# 🏦 Fed Monitor - 美联储利率监测看板

实时监测美联储利率决议、经济数据与市场预期。

**在线访问：** https://fed-monitor-olive.vercel.app

---

## ⚡ 快速开始（5分钟）

### 方式一：运行配置向导（推荐）

```bash
npm run setup
```

按提示输入 API Key 即可。

### 方式二：手动配置

#### 1. 获取 FRED API Key（2分钟）

这是获取真实经济数据的唯一必要条件。

1. 访问 https://fredaccount.stlouisfed.org/apikeys
2. 注册账号（用你的邮箱，免费）
3. 点击 **"Request API Key"**
4. 复制生成的 32 位字符串

#### 2. 配置环境变量

创建 `.env.local` 文件：

```env
FRED_API_KEY=你的_32位_Key
SERVER_CHAN_KEY=你的_Server酱_Key（可选）
```

#### 3. 完成！

```bash
npm run update-data  # 更新数据
npm run build        # 构建
vercel --prod        # 部署
```

---

## 📱 功能特性

- ✅ **实时倒计时** - FOMC 会议倒计时（天/时/分）
- ✅ **今日数据提醒** - 重要数据发布前倒计时
- ✅ **CME FedWatch 概率** - 利率决策概率分布
- ✅ **关键因子监测** - Tier 1/2/3 指标分级
- ✅ **经济日历** - 重要数据发布时间
- ✅ **FOMC 会议日程** - 全年会议安排
- ✅ **美债收益率曲线** - 2Y/10Y 走势 + 倒挂预警
- ✅ **中英双语** - 全部指标对照
- ✅ **移动端适配** - 微信直接打开
- ✅ **自动更新** - 每天自动获取最新数据
- ✅ **微信推送** - 重要数据提醒（可选）

---

## 🔧 技术栈

- Next.js 14 + React + TypeScript
- Tailwind CSS + shadcn/ui
- Recharts (图表)
- FRED API (经济数据)
- GitHub Actions (自动更新)
- Vercel (部署)

---

## 📂 项目结构

```
fed-monitor/
├── app/                    # Next.js 页面
├── components/             # React 组件
├── lib/
│   └── data-fetchers/      # 数据获取模块
│       ├── fred.ts         # FRED API
│       ├── cme-fedwatch.ts # CME 爬虫
│       └── trading-economics.ts # 经济日历
├── scripts/
│   ├── setup.js            # 配置向导
│   ├── update-data.ts      # 数据更新
│   └── wechat-notify.ts    # 微信推送
├── data/                   # 本地缓存
└── .github/workflows/      # 自动更新
```

---

## 🆓 成本

| 项目 | 费用 |
|------|------|
| Vercel 托管 | 免费 |
| GitHub Actions | 免费 |
| FRED API | 免费 |
| Server酱 | 免费 |
| **总计** | **$0** |

---

## ⚠️ 免责声明

本页面仅供学习参考，不构成投资建议。

---

## 📧 帮助

遇到问题？请提交 Issue 或联系开发者。
