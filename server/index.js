import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import carsRouter from './routes/cars.js'
import contactsRouter from './routes/contacts.js'
import adminRouter from './routes/admin.js'
import { seedCars } from './data/cars.js'

dotenv.config()

const app = express()
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/cars', carsRouter)
app.use('/api/contacts', contactsRouter)
app.use('/api/admin', adminRouter)

app.get('/', (req, res) => {
  res.json({ status: 'CarBazzar server is running' })
})

const port = process.env.PORT || 5000

async function start() {
  try {
    const uri = process.env.MONGO_URI
    if (!uri) {
      throw new Error('MONGO_URI is required in environment variables')
    }
    try {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000, dbName: 'carbazzar' })
      console.log('Connected to MongoDB')
      await seedCars()
    } catch (dbError) {
      console.warn('⚠️  MongoDB connection failed. Running in dev mode without persistence.')
      console.warn('To enable persistence, whitelist your IP in MongoDB Atlas.')
      console.error('MongoDB connection error:', dbError.message || dbError)
    }
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

start()
