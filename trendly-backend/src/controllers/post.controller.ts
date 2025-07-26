import { Request, Response } from "express"

export const getPosts = async (req: Request, res: Response) => {
    res.json({msg: "get all posts"})
}