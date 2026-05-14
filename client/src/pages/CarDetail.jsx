import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { ArrowLeft, Gauge, Droplet, Sparkles, SlidersHorizontal } from 'lucide-react'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const CarDetail = () => {
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/cars/${id}`)
        setCar(response.data)
      } catch (err) {
        setError('Unable to load car details.')
      } finally {
        setLoading(false)
      }
    }
    fetchCar()
  }, [id])

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 text-center text-slate-300 md:px-8">
        Loading car details...
      </div>
    )
  }

  if (error || !car) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 text-center text-slate-300 md:px-8">
        <p>{error || 'Car not found.'}</p>
        <Link to="/" className="btn-secondary mt-6 inline-flex">Back to marketplace</Link>
      </div>
    )
  }

  const emi = Math.ceil(car.price / 60)

  return (
    <main className="mx-auto max-w-7xl px-6 pb-20 pt-10 md:px-8">
      <Link to="/" className="btn-secondary inline-flex items-center gap-2">
        <ArrowLeft size={18} /> Back to marketplace
      </Link>

      <section className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.8fr] lg:items-start">
        <div className="space-y-8">
          <div className="rounded-[2rem] border border-slate-800/70 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
            <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-sky-300">{car.brand}</p>
                <h1 className="mt-3 text-4xl font-semibold text-white">{car.name}</h1>
                <p className="mt-4 text-slate-300">{car.overview}</p>
              </div>
              <div className="rounded-3xl bg-slate-900/90 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Price</p>
                <p className="mt-3 text-4xl font-semibold text-white">₹{car.price.toLocaleString('en-IN')}</p>
                <p className="mt-4 text-sm text-slate-400">Estimated EMI from <span className="font-semibold text-white">${emi}</span>/month</p>
                <a href="#contact" className="btn-primary mt-6 inline-flex w-full justify-center">Book Test Drive</a>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <motion.div className="card-glass p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-xl font-semibold text-white">Key Specs</h2>
              <div className="mt-6 grid gap-3">
                <div className="flex items-center justify-between rounded-3xl bg-slate-900/90 px-4 py-3">
                  <span className="flex items-center gap-2 text-slate-300"><Gauge size={18} /> Mileage</span>
                  <span className="text-white">{car.mileage}</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-slate-900/90 px-4 py-3">
                  <span className="flex items-center gap-2 text-slate-300"><Droplet size={18} /> Fuel</span>
                  <span className="text-white">{car.fuelType}</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-slate-900/90 px-4 py-3">
                  <span className="flex items-center gap-2 text-slate-300"><SlidersHorizontal size={18} /> Transmission</span>
                  <span className="text-white">{car.transmission}</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-slate-900/90 px-4 py-3">
                  <span className="flex items-center gap-2 text-slate-300"><Sparkles size={18} /> Seats</span>
                  <span className="text-white">{car.seats}</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="card-glass p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 10 }}>
              <h2 className="text-xl font-semibold text-white">Seller details</h2>
              <div className="mt-6 space-y-4 text-slate-300">
                <div className="rounded-3xl bg-slate-900/90 p-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Seller</p>
                  <p className="mt-2 text-lg text-white">{car.sellerName}</p>
                </div>
                <div className="rounded-3xl bg-slate-900/90 p-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Location</p>
                  <p className="mt-2 text-lg text-white">{car.sellerLocation}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="rounded-[2rem] border border-slate-800/70 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
            <h2 className="text-2xl font-semibold text-white">What makes this car special?</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {car.features?.map((feature) => (
                <div key={feature} className="rounded-3xl bg-slate-900/90 px-5 py-4 text-slate-300">
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {car.images?.map((image, index) => (
            <img key={index} src={image} alt={`${car.name} ${index + 1}`} className="h-64 w-full rounded-[2rem] object-cover shadow-2xl shadow-slate-950/30" />
          ))}
        </div>
      </section>
    </main>
  )
}

export default CarDetail
