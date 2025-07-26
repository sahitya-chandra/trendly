import { Request, Response } from "express";
import { processIngestedPosts } from "../services/post.service";

export const ingestPosts = async (req: Request, res: Response) => {
    try {
        const { platform, posts} = req.body

        if(!platform || !posts) {
            return res.status(400).json({ error: 'Missing platform or posts' })
        }

        const savedPosts = await processIngestedPosts(platform, posts)
        res.status(201).json({ message: 'Posts ingested', savedPosts });
    } catch (err) {
        console.error('Ingestion error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}