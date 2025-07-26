import { Router } from 'express'
import { handleTrendingKeywords } from '../controllers/keywordTrend.controller'

const router = Router()

router.get('/trending-keywords', handleTrendingKeywords)

export default router
