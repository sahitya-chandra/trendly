import express from 'express'
import { getTrendingKeywords } from '../controllers/trendController'

const router = express.Router()

router.get('/trending-keywords', getTrendingKeywords)

export default router