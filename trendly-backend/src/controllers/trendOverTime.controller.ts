import { Request, Response } from "express";
import { getKeywordTrendOverTime } from "../services/trendOverTime.service";

export const trendOverTimeController = async (req: Request, res: Response) => {
    try {
        const { word, from, to, interval = 'day' } = req.query

         if (!word || !from || !to) {
            return res.status(400).json({ error: 'word, from, and to are required' })
        }

        const trend = await getKeywordTrendOverTime(
            word as string,
            from as string,
            to as string, 
            interval as 'day' | 'hour'
        )

        return res.json({keyword: word, trend})
         
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Failed to fetch trend' });
    }
}