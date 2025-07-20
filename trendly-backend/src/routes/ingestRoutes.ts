import express from 'express'
import { ingestPostData } from '../controllers/ingestController'

const router = express.Router()

router.post('/', ingestPostData)

export default router