import express from 'express'
import Car from '../models/Car.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { search, brand, fuelType, transmission, maxPrice } = req.query
    const filters = {}

    if (brand) filters.brand = brand
    if (fuelType) filters.fuelType = fuelType
    if (transmission) filters.transmission = transmission
    if (maxPrice) filters.price = { $lte: Number(maxPrice) }

    let query = Car.find(filters)

    if (search) {
      const regex = new RegExp(search, 'i')
      query = Car.find({ ...filters, $or: [{ name: regex }, { brand: regex }, { overview: regex }] })
    }

    const cars = await query.sort({ price: 1 })
    res.json(cars)
  } catch (error) {
    res.status(500).json({ message: 'Unable to load cars', error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    if (!car) {
      return res.status(404).json({ message: 'Car not found' })
    }
    res.json(car)
  } catch (error) {
    res.status(500).json({ message: 'Unable to load car', error: error.message })
  }
})

export default router
