import { Request, Response } from "express";
import { fetchTrendingKeywords } from "../services/trending.service";

export const getTrendingKeywords = async (req: Request, res: Response) => {
    try {
        const {since, platform, limit } = req.query

        console.log(since)

        if(!since || typeof since !== 'string') {
           return res.status(400).json({ error: "'since' is required (ISO date string)"})
        }

        const trendingKeywords = await fetchTrendingKeywords({
            since: new Date(since),
            platform: typeof platform === 'string' ? platform: undefined,
            limit: limit ? parseInt(limit as string, 10) : 10,
        })

        return res.status(200).json({data: trendingKeywords})
    } catch (error) {
        console.error('Trending error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
  }
}