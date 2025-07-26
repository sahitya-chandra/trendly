import prisma from "../config/db";

interface TrendingQuery {
  since: Date;
  platform?: string;
  limit?: number;
}

export const fetchTrendingKeywords = async ({
    since,
    platform,
    limit = 10,
}: TrendingQuery) => {
    const grouped = await prisma.keywordOccurrence.groupBy({
        by: ['keywordId'],
        where: {
            timestamp: { gte: since },
            ...(platform ? { platform }: {})
        },
        _count: { keywordId: true },
        orderBy: { _count: { keywordId: 'desc'}},
        take: Math.min(limit, 50),
    })

    // grouped = [{ keywordId: 'kw1_id', _count: { keywordId: 5 }}]

    const keywordIds = grouped.map(g => g.keywordId)

    // keywords = [{ id: 'kw1_id', word: 'AI' }]
    const keywords = await prisma.keyword.findMany({
        where: { id: { in: keywordIds }},
    })

    const idToWord = new Map(keywords.map(k => [k.id, k.word]))

    //  return [{ "word": "AI", "frequency": 1 }]
    return grouped.map(group => ({
        word: idToWord.get(group.keywordId) || 'unknown',
        frequency: group._count.keywordId,
    }))
}