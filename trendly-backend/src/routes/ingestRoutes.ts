import express from 'express'
import { ingestPosts } from '../controllers/ingestController'

const router = express.Router()

router.post('/admin/ingest', ingestPosts)

export default router