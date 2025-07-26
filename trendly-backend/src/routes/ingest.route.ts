import express from 'express'
import { ingestPosts } from '../controllers/ingest.controller'

const router = express.Router()

router.post('/admin/ingest', ingestPosts)

export default router