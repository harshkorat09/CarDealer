import express from 'express'
import jwt from 'jsonwebtoken'
import Contact from '../models/Contact.js'
import Car from '../models/Car.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '8h' })
  res.json({ token })
})

router.get('/contacts', verifyToken, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.json(contacts)
  } catch (error) {
    res.status(500).json({ message: 'Unable to load contacts', error: error.message })
  }
})

router.get('/cars', verifyToken, async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 })
    res.json(cars)
  } catch (error) {
    res.status(500).json({ message: 'Unable to load cars', error: error.message })
  }
})

router.post('/cars', verifyToken, async (req, res) => {
  try {
    const car = await Car.create(req.body)
    res.status(201).json(car)
  } catch (error) {
    res.status(500).json({ message: 'Unable to create car', error: error.message })
  }
})

router.delete('/cars/:id', verifyToken, async (req, res) => {
  try {
    const deleted = await Car.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Car not found' })
    }
    res.json({ message: 'Car deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete car', error: error.message })
  }
})

export default router
