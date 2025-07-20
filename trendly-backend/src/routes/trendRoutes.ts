import express from 'express'
import { getTrendingKeywords } from '../controllers/trendController'

const router = express.Router()

router.get('/', getTrendingKeywords)

export default router