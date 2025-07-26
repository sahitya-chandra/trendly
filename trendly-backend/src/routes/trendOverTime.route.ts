import express from 'express'
import { trendOverTimeController } from '../controllers/trendOverTime.controller'


const router = express.Router()

router.get('/keyword-trend', trendOverTimeController)

export default router