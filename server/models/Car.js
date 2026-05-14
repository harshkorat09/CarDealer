import mongoose from 'mongoose'

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    year: { type: Number, required: true },
    fuelType: { type: String, required: true },
    transmission: { type: String, required: true },
    mileage: { type: String, required: true },
    seats: { type: Number, default: 5 },
    bodyType: { type: String, required: true },
    images: { type: [String], default: [] },
    overview: { type: String, required: true },
    features: { type: [String], default: [] },
    sellerName: { type: String, required: true },
    sellerLocation: { type: String, required: true },
  },
  { timestamps: true }
)

const Car = mongoose.models.Car || mongoose.model('Car', carSchema)
export default Car
