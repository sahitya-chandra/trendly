import { Request, Response } from 'express'
import { getTrendingKeywords } from '../services/keywordTrend.service'

export const handleTrendingKeywords = async (_req: Request, res: Response) => {
  try {
    const trending = await getTrendingKeywords()
    res.json(trending)
  } catch (error) {
    console.error('Error in trending keyword API:', error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}
