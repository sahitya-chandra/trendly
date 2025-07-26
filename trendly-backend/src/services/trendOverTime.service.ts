import { count, timeStamp } from "console"
import prisma from "../config/db"

export const getKeywordTrendOverTime = async ( 
    word: string, 
    from: string, 
    to: string, 
    interval: 'day' | 'hour' = 'day'
) => {
    
    const keyword = await prisma.keyword.findUnique({
        where: {word},
        select: { id: true }
    })

    if(!keyword) return []

    const keywordId = keyword.id
    const intervalSQL = interval === 'hour' ? 'hour' : 'day'

    const result = await prisma.$queryRawUnsafe<
        {date: Date;  count: number}[]
    >(
        `
        SELECT
        DATE_TRUNC('${intervalSQL}', "timestamp") as date,
        COUNT(*) as count
        FROM "KeywordOccurrence"
        WHERE "keywordId" = $1
        AND "timestamp" BETWEEN $2 AND $3
        GROUP BY date
        ORDER BY date ASC
    `,
        keywordId,
        new Date(from),
        new Date(to)
    )

    return result.map( row => ({
        timeStamp: row.date.toISOString(),
        count: row.count
    }))
}