import express from 'express'
import 'dotenv/config'
import 'colors'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'

connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('Welcome to real chat api.')
})

app.use('/api/user', userRoutes)

app.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`.yellow.bold)
)
