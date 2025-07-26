import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import postRoutes from './routes/post.route'
import trendRoutes from './routes/trend.route'
import ingestRoutes from './routes/ingest.route'
import trendOverTimeRoutes from './routes/trendOverTime.route'
import keywordTrendRoutes from './routes/keywordTrend.route'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use('/api/posts',postRoutes)
app.use('/api', trendRoutes)
app.use('/api', ingestRoutes)
app.use('/api', trendOverTimeRoutes)
app.use('/api', keywordTrendRoutes)

app.get("/", (_, res) => {
  res.send("Trendly API is running")
})

// Error handler middleware 
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
