import prisma from "../config/db"
import { extractKeywordsFromPosts } from "./keywordService";

type PostInput = {
  id: number;
  title: string;
  content: string;
  url: string;
  author: string;
  createdAt: string;
};

export const processIngestedPosts = async (
    platform: string,
    posts: PostInput[]
) => {
    const savedPosts = []

    for(const post of posts) {
        const exiting = await prisma.post.findFirst({
            where: {
                id: post.id,
                platform,
            }
        })

        if(!exiting) {
            const createdPost = await prisma.post.create({
                data: {
                    ...post,
                    createdAt: new Date(post.createdAt),
                    platform
                }
            })

            savedPosts.push(createdPost)
            await extractKeywordsFromPosts(createdPost)
        }
    }

    return savedPosts
}