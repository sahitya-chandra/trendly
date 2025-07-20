import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import postRoutes from './routes/postRoutes'
import trendRoutes from './routes/trendRoutes'
import ingestRoutes from './routes/ingestRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use('/api/posts',postRoutes)
app.use('/api/trends', trendRoutes)
app.use('/api/admin/ingest', ingestRoutes)

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
