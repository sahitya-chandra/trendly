import { subDays } from 'date-fns'
import prisma from '../config/db'

export const getTrendingKeywords = async () => {
    const now = new Date()
    const recentStart = subDays(now, 7)
    const pastStart = subDays(now, 14)

    // fetch keyword counts in past 7 days and 7–14 days ago
    const recent = await prisma.keywordOccurrence.groupBy({
        by: ['keywordId'],
        where: {
            timestamp: {
                gte: recentStart,
                lte: now
            }
        },
        _count: true,
    })

    const past = await prisma.keywordOccurrence.groupBy({
        by: ['keywordId'],
        where: {
        timestamp: {
            gte: pastStart,
            lt: recentStart,
        },
        },
        _count: true,
    })

    const pastMap = new Map(past.map(p => [p.keywordId, p._count]))

    const trending = await Promise.all(
        recent.map(async r => {
            const recentCount = r._count
            const pastCount = pastMap.get(r.keywordId) || 0
            const growthRate = (recentCount - pastCount) / (pastCount + 1)

            const keyword = await prisma.keyword.findUnique({
                where: { id: r.keywordId }
            })

            return {
                word: keyword?.word || '',
                recentCount,
                pastCount,
                growthRate
            }
        })
    )

    return trending.sort((a, b) => b.growthRate - a.growthRate).slice(0, 25)
}