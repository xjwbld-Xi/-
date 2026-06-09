# 🚀 快速配置指南（只需3步）

## 你的美联储监测看板已部署成功！

**访问地址：** https://fed-monitor-fkqm8jla4-xjwbld-4495s-projects.vercel.app

---

## ⚡ 仅需完成的3件事

### 第1步：获取 FRED API Key（5分钟）

这是获取真实经济数据的关键。

1. **访问** https://fredaccount.stlouisfed.org/apikeys
2. **注册账号**（用你的邮箱）
3. 点击 **"Request API Key"**
4. 复制生成的 **32位字符串**

### 第2步：获取 Server酱 SendKey（3分钟）

这是接收微信推送的关键。

1. **访问** https://sct.ftqq.com
2. **微信扫码**关注公众号
3. 登录后复制 **SendKey**

### 第3步：配置 GitHub Secrets（2分钟）

让系统自动更新数据和推送。

1. **访问** https://github.com/xjwbld-Xi/-/settings/secrets/actions
2. 点击 **"New repository secret"**
3. 添加以下3个 secrets：
   - `FRED_API_KEY` = 你的 FRED API Key
   - `SERVER_CHAN_KEY` = 你的 Server酱 SendKey
   - `VERCEL_TOKEN` = 你的 Vercel Token（获取方式见下方）

---

## 🔑 获取 Vercel Token（1分钟）

1. 访问 https://vercel.com/account/tokens
2. 点击 **"Create Token"**
3. 名称填 `GitHub Actions`
4. 复制 Token

---

## ✅ 配置完成后

系统会自动：
- ✅ 每天自动更新经济数据
- ✅ 重要数据日发布前微信提醒
- ✅ 每日推送数据摘要

---

## 📱 当前状态

| 功能 | 状态 |
|------|------|
| ✅ 网页部署 | 已完成 |
| ✅ 基础看板 | 已上线（使用演示数据）|
| ⏳ 真实数据 | 等待 FRED API Key |
| ⏳ 微信推送 | 等待 Server酱 Key |
| ⏳ 自动更新 | 等待配置 GitHub Secrets |

---

## ❓ 需要帮助？

如果你在任何步骤遇到困难，直接告诉我，我立即帮你解决！

**现在请完成第1步（获取 FRED API Key），然后把 Key 发给我！**
