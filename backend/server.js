import express from 'express'
import 'dotenv/config'
import 'colors'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome to real chat api.')
})

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`.yellow.bold)
)
