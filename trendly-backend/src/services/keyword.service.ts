import { Post } from "@prisma/client";
import { tokenizeText } from "../utils/tokenizer";
import prisma from "../config/db";

export const extractKeywordsFromPosts = async (post: Post) => {
    const tokens = tokenizeText(post.title + ' ' + post.content)

    for(const word of tokens) {
        const keyword = await prisma.keyword.upsert({
            where: { word },
            update: {},
            create: { word }
        })

        await prisma.keywordOccurrence.upsert({
            where: {
                postId_keywordId: {
                    postId: post.id,
                    keywordId: keyword.id
                }
            },
            update: {},
            create: {
                postId: post.id,
                keywordId: keyword.id,
                platform: post.platform,
                timestamp: post.createdAt
            }
        })
    }
}