import express from 'express'
import { getTrendingKeywords } from '../controllers/trend.controller'

const router = express.Router()

router.get('/trending-keywords', getTrendingKeywords)

export default router