// FRED API 数据获取模块
// 文档: https://fred.stlouisfed.org/docs/api/fred/

const FRED_BASE_URL = 'https://api.stlouisfed.org/fred'

interface FREDSeries {
  id: string
  title: string
  observation_start: string
  observation_end: string
  frequency: string
  units: string
  last_updated: string
}

interface FREDObservation {
  date: string
  value: string
}

// 关键经济指标对应的 FRED Series ID
export const FRED_SERIES = {
  // Tier 1 - 核心指标
  CORE_PCE: 'PCEPILFE',           // 核心 PCE 物价指数
  CPI: 'CPIAUCSL',                // CPI
  UNEMPLOYMENT: 'UNRATE',         // 失业率
  NONFARM_PAYROLLS: 'PAYEMS',     // 非农就业
  AVG_HOURLY_EARNINGS: 'CES0500000003', // 平均时薪
  
  // Tier 2 - 重要指标
  ISM_MANUFACTURING: 'NAPM',      // ISM 制造业指数
  RETAIL_SALES: 'RSXFS',          // 零售销售
  GDP: 'GDPC1',                   // GDP
  
  // Tier 3 - 辅助指标
  INITIAL_CLAIMS: 'ICSA',         // 初请失业金
  HOUSING_STARTS: 'HOUST',        // 新屋开工
  
  // 美债收益率
  TREASURY_2Y: 'DGS2',            // 2年期国债
  TREASURY_10Y: 'DGS10',          // 10年期国债
}

// 获取最新数据值
export async function getLatestValue(seriesId: string, apiKey: string): Promise<FREDObservation | null> {
  try {
    const url = `${FRED_BASE_URL}/series/observations?series_id=${seriesId}&api_key=${apiKey}&file_type=json&sort_order=desc&limit=1`
    
    const response = await fetch(url)
    if (!response.ok) {
      console.error(`FRED API error: ${response.status}`)
      return null
    }
    
    const data = await response.json()
    
    if (data.observations && data.observations.length > 0) {
      return data.observations[0]
    }
    
    return null
  } catch (error) {
    console.error(`Failed to fetch FRED data for ${seriesId}:`, error)
    return null
  }
}

// 获取历史数据
export async function getHistoricalData(
  seriesId: string, 
  apiKey: string, 
  startDate?: string,
  endDate?: string
): Promise<FREDObservation[]> {
  try {
    let url = `${FRED_BASE_URL}/series/observations?series_id=${seriesId}&api_key=${apiKey}&file_type=json&sort_order=asc`
    
    if (startDate) url += `&observation_start=${startDate}`
    if (endDate) url += `&observation_end=${endDate}`
    
    const response = await fetch(url)
    if (!response.ok) {
      console.error(`FRED API error: ${response.status}`)
      return []
    }
    
    const data = await response.json()
    
    return data.observations || []
  } catch (error) {
    console.error(`Failed to fetch historical data for ${seriesId}:`, error)
    return []
  }
}

// 获取系列信息
export async function getSeriesInfo(seriesId: string, apiKey: string): Promise<FREDSeries | null> {
  try {
    const url = `${FRED_BASE_URL}/series?series_id=${seriesId}&api_key=${apiKey}&file_type=json`
    
    const response = await fetch(url)
    if (!response.ok) {
      console.error(`FRED API error: ${response.status}`)
      return null
    }
    
    const data = await response.json()
    
    if (data.seriess && data.seriess.length > 0) {
      return data.seriess[0]
    }
    
    return null
  } catch (error) {
    console.error(`Failed to fetch series info for ${seriesId}:`, error)
    return null
  }
}

// 批量获取所有关键指标
export async function getAllKeyIndicators(apiKey: string) {
  const results: Record<string, { value: string; date: string; title: string } | null> = {}
  
  for (const [key, seriesId] of Object.entries(FRED_SERIES)) {
    const observation = await getLatestValue(seriesId, apiKey)
    const info = await getSeriesInfo(seriesId, apiKey)
    
    if (observation && info) {
      results[key] = {
        value: observation.value,
        date: observation.date,
        title: info.title,
      }
    } else {
      results[key] = null
    }
  }
  
  return results
}
