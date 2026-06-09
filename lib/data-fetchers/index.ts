import fs from 'fs'
import path from 'path'
import { getFedWatchData } from './cme-fedwatch'
import { getEconomicCalendar } from './trading-economics'

// 数据缓存文件路径
const CACHE_DIR = path.join(process.cwd(), 'data')
const CACHE_FILE = path.join(CACHE_DIR, 'cache.json')

// 缓存数据结构
export interface CacheData {
  lastUpdated: string
  fedWatch: Awaited<ReturnType<typeof getFedWatchData>>
  calendar: Awaited<ReturnType<typeof getEconomicCalendar>>
  indicators: Record<string, any>
  yields: {
    date: string
    yield2Y: number
    yield10Y: number
    spread: number
  }[]
}

// 读取缓存
export function readCache(): CacheData | null {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const data = fs.readFileSync(CACHE_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Failed to read cache:', error)
  }
  return null
}

// 写入缓存
export function writeCache(data: CacheData): void {
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true })
    }
    fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Failed to write cache:', error)
  }
}

// 检查缓存是否过期（默认1小时）
export function isCacheExpired(cache: CacheData, maxAge: number = 3600000): boolean {
  const lastUpdate = new Date(cache.lastUpdated).getTime()
  const now = Date.now()
  return (now - lastUpdate) > maxAge
}

// 获取完整数据（优先缓存，回退到 API）
export async function getDashboardData(
  fredApiKey?: string,
  tradingEconKey?: string
): Promise<CacheData> {
  // 尝试读取缓存
  const cache = readCache()
  
  if (cache && !isCacheExpired(cache)) {
    console.log('📦 Using cached data')
    return cache
  }
  
  console.log('🔄 Fetching fresh data...')
  
  // 并行获取所有数据
  const [fedWatch, calendar] = await Promise.all([
    getFedWatchData(),
    getEconomicCalendar(tradingEconKey)
  ])
  
  // TODO: 获取 FRED 数据
  // const indicators = fredApiKey 
  //   ? await getAllKeyIndicators(fredApiKey)
  //   : {}
  
  const data: CacheData = {
    lastUpdated: new Date().toISOString(),
    fedWatch,
    calendar,
    indicators: {},
    yields: [
      { date: '2026-06-02', yield2Y: 4.85, yield10Y: 4.50, spread: -0.35 }
    ]
  }
  
  // 写入缓存
  writeCache(data)
  
  return data
}
