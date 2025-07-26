import prisma from "../config/db"
import { extractKeywordsFromPosts } from "./keyword.service";

export type PostInput = {
  id: string;
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
        const postId = `${platform}_${post.id}`;
        const exiting = await prisma.post.findFirst({
            where: {
                id: postId,
                platform,
            }
        })

        if(!exiting) {
            const createdPost = await prisma.post.create({
                data: {
                    ...post,
                    id: postId,
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