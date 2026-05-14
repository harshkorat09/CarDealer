import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Sparkles, ShieldCheck, Globe, Star, TrendingUp } from 'lucide-react'
import axios from 'axios'
import ContactForm from '../components/ContactForm'
import carsData from '../data/cars'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const features = [
  { title: 'Verified Inventory', description: 'Hand-picked premium cars with clean history.' },
  { title: 'Flexible Financing', description: 'Easy EMI plans for every budget.' },
  { title: 'Trusted Dealer', description: 'Transparent pricing and verified sellers.' },
]

const aiUseCases = ['Family', 'Sports', 'Electric']
const budgetOptions = ['500000', '1000000', '1500000', '2000000']

const Home = () => {
  const [cars, setCars] = useState(carsData)
  const [search, setSearch] = useState('')
  const [brand, setBrand] = useState('')
  const [fuelType, setFuelType] = useState('')
  const [transmission, setTransmission] = useState('')
  const [budget, setBudget] = useState('80000')
  const [purpose, setPurpose] = useState('Family')

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/cars`)
        setCars(response.data)
      } catch (error) {
        console.warn('Unable to load cars from API, using fallback data.')
      }
    }
    fetchCars()
  }, [])

  const filteredCars = useMemo(() => {
    return cars
      .filter((car) => {
        if (search && !car.name.toLowerCase().includes(search.toLowerCase()) && !car.brand.toLowerCase().includes(search.toLowerCase())) {
          return false
        }
        if (brand && car.brand !== brand) return false
        if (fuelType && car.fuelType !== fuelType) return false
        if (transmission && car.transmission !== transmission) return false
        return true
      })
      .slice(0, 8)
  }, [cars, search, brand, fuelType, transmission])

  const recommendations = useMemo(() => {
    return cars
      .filter((car) => {
        const matchesBudget = car.price <= Number(budget)
        const matchesPurpose =
          purpose === 'Family'
            ? car.seats >= 5
            : purpose === 'Sports'
            ? car.bodyType.toLowerCase().includes('coupe') || car.brand.toLowerCase().includes('bmw')
            : car.fuelType.toLowerCase().includes('electric')
        return matchesBudget && matchesPurpose
      })
      .slice(0, 4)
  }, [cars, budget, purpose])

  const brands = Array.from(new Set(cars.map((car) => car.brand)))
  const fuelTypes = Array.from(new Set(cars.map((car) => car.fuelType)))
  const transmissions = Array.from(new Set(cars.map((car) => car.transmission)))

  return (
    <main className="mx-auto max-w-7xl px-6 pb-20 pt-8 md:px-8">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-sm text-sky-200">
            <Sparkles size={16} /> Premium used cars for premium buyers
          </div>
          <div className="space-y-6">
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Find Your Perfect Second-Hand Car with AutoVault
            </h1>
            <p className="max-w-2xl text-slate-300 sm:text-lg">
              Browse premium verified cars, get smart recommendations, and contact our team directly from a polished marketplace.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="#inventory" className="btn-primary">
              Browse Cars
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Sales
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card-glass p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Trusted network</p>
              <p className="mt-3 text-xl font-semibold text-white">Verified cars with full transparency</p>
            </div>
            <div className="card-glass p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Fast support</p>
              <p className="mt-3 text-xl font-semibold text-white">Personalized buying guidance</p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-800/70 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/40">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-sky-500/10 to-transparent" />
          <img
            src="https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1400&q=80"
            alt="Luxury car"
            className="h-[420px] w-full rounded-[2rem] object-cover shadow-2xl shadow-slate-950/40"
          />
          <div className="mt-6 rounded-3xl bg-slate-950/90 p-6 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Featured launch</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">AutoVault Select</h2>
            <p className="mt-2 text-slate-300">A curated collection of high-demand premium vehicles with transparent history and premium service.</p>
          </div>
        </div>
      </section>

      <section id="inventory" className="mt-16 space-y-8">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-slate-800/60 bg-slate-950/70 p-6 shadow-xl shadow-slate-950/20 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-sky-300">Featured Cars</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Browse verified premium cars</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              type="search"
              placeholder="Search car name"
              className="rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none focus:border-sky-400"
            />
            <select
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              className="rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none focus:border-sky-400"
            >
              <option value="">All brands</option>
              {brands.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <select
              value={fuelType}
              onChange={(event) => setFuelType(event.target.value)}
              className="rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none focus:border-sky-400"
            >
              <option value="">Fuel type</option>
              {fuelTypes.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <select
              value={transmission}
              onChange={(event) => setTransmission(event.target.value)}
              className="rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none focus:border-sky-400"
            >
              <option value="">Transmission</option>
              {transmissions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredCars.map((car) => (
            <motion.article
              key={car._id || car.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-glass overflow-hidden"
            >
              <img src={car.images?.[0]} alt={car.name} className="h-72 w-full object-cover" />
              <div className="space-y-4 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-sky-300">{car.brand}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{car.name}</h3>
                  </div>
                  <p className="text-lg font-semibold text-slate-100">₹{car.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <span className="rounded-2xl bg-slate-900/90 px-3 py-2 text-xs text-slate-300">{car.year}</span>
                  <span className="rounded-2xl bg-slate-900/90 px-3 py-2 text-xs text-slate-300">{car.fuelType}</span>
                  <span className="rounded-2xl bg-slate-900/90 px-3 py-2 text-xs text-slate-300">{car.transmission}</span>
                </div>
                <Link
                  to={`/cars/${car._id || car.id}`}
                  className="btn-secondary w-full text-center"
                >
                  View Details
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="why" className="mt-20 space-y-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="card-glass p-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-800 text-sky-300">
                <ShieldCheck size={22} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="ai" className="mt-20 grid gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-start">
        <div className="card-glass p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-sky-300">AI Recommendation Engine</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Select your budget and use case</h2>
          <p className="mt-4 text-slate-300">AutoVault smartly suggests the best cars for your needs using adaptive filtering logic.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-slate-300">Budget</span>
              <select
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none focus:border-sky-400"
              >
                {budgetOptions.map((value) => (
                  <option key={value} value={value}>Up to ₹{Number(value).toLocaleString('en-IN')}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm text-slate-300">Use case</span>
              <select
                value={purpose}
                onChange={(event) => setPurpose(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none focus:border-sky-400"
              >
                {aiUseCases.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {recommendations.map((car) => (
              <div key={car._id || car.id} className="rounded-3xl border border-slate-700 bg-slate-950/90 p-5">
                <p className="text-sm text-slate-300">{car.brand}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{car.name}</h3>
                <p className="mt-3 text-slate-400">₹{car.price.toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card-glass p-8">
          <div className="flex items-center gap-3 text-sky-300">
            <Globe size={20} />
            <span className="text-sm uppercase tracking-[0.24em]">Premium metrics</span>
          </div>
          <div className="mt-8 grid gap-4">
            <div className="rounded-3xl border border-slate-700 bg-slate-950/90 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Customer Satisfaction</p>
              <p className="mt-3 text-3xl font-semibold text-white">98%</p>
            </div>
            <div className="rounded-3xl border border-slate-700 bg-slate-950/90 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Cars listed</p>
              <p className="mt-3 text-3xl font-semibold text-white">{cars.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mt-20">
        <ContactForm />
      </section>
    </main>
  )
}

export default Home
