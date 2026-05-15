import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { ArrowLeft, Gauge, Droplet, Armchair, Settings, Sparkles, Phone, Mail, CalendarDays, MapPin, ShieldCheck, Star, Bolt } from 'lucide-react'
import carsData from '../data/cars'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const interestRateAnnual = 0.09
const loanTerms = [12, 24, 36, 60]

const formatCurrency = (value) => value.toLocaleString('en-IN')

const calculateEmi = (principal, months) => {
  const monthlyRate = interestRateAnnual / 12
  const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, months)
  const denominator = Math.pow(1 + monthlyRate, months) - 1
  return Math.ceil(numerator / denominator)
}

const CarDetail = () => {
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [formStatus, setFormStatus] = useState('')
  const contactRef = useRef(null)

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleContactSubmit = async (event) => {
    event.preventDefault()
    setFormStatus('')

    try {
      await axios.post(`${apiUrl}/api/contacts`, {
        name: contactName,
        email: contactEmail,
        message: contactMessage,
      })
      setFormStatus('Request sent successfully. We will contact you soon.')
      setContactName('')
      setContactEmail('')
      setContactMessage('')
    } catch (submitError) {
      setFormStatus('Unable to send request. Please try again later.')
    }
  }

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/cars/${id}`)
        const apiCar = response.data
        // Prefer local images if available for this car
        const local = carsData.find((c) => c.id === apiCar.id || c.name === apiCar.name)
        if (local && local.images && local.images.length) {
          setCar({ ...apiCar, images: local.images })
        } else {
          setCar(apiCar)
        }
      } catch (err) {
        const fallbackCar = carsData.find((item) => item._id === id || item.id === id)
        if (fallbackCar) {
          setCar(fallbackCar)
          setError(null)
        } else {
          setError('Unable to load car details.')
        }
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

  const emiOptions = loanTerms.map((term) => {
    const monthly = calculateEmi(car.price, term)
    const totalPayment = monthly * term
    const interestPaid = totalPayment - car.price
    return {
      term,
      monthly,
      totalPayment,
      interestPaid,
    }
  })

  const carAge = new Date().getFullYear() - car.year
  const highlights = [
    'Verified inspection report',
    'Free history check',
    'Flexible EMI plans',
    'Priority test drive slot',
  ]

  return (
    <main className="mx-auto max-w-7xl px-6 pb-20 pt-10 md:px-8">
      <Link to="/" className="btn-secondary inline-flex items-center gap-2">
        <ArrowLeft size={18} /> Back to marketplace
      </Link>

      <section className="mt-10 grid gap-10 xl:grid-cols-[1.4fr_0.6fr] xl:items-start">
        <div className="space-y-8">
          <div className="rounded-[2rem] border border-slate-800/70 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
            <div className="grid gap-8 xl:grid-cols-[1.6fr_1fr]">
              <div className="space-y-6">
                <div className="overflow-hidden rounded-[2rem] border border-slate-800/90 bg-slate-900">
                  <img
                    src={car.images?.[selectedImage]}
                    alt={`${car.name} view`}
                    className="h-[420px] w-full object-cover"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-4">
                  {car.images?.map((image, index) => (
                    <button
                      key={`${car.id || car._id}-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(index)}
                      className={`overflow-hidden rounded-3xl border ${index === selectedImage ? 'border-sky-400' : 'border-slate-800/70'} bg-slate-900/95 transition-all duration-200 hover:border-slate-500`}
                    >
                      <img src={image} alt={`${car.name} ${index + 1}`} className="h-24 w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[2rem] border border-slate-800/70 bg-slate-900/90 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-sky-300">{car.brand}</p>
                      <h1 className="mt-3 text-4xl font-semibold text-white">{car.name}</h1>
                    </div>
                    <div className="rounded-3xl bg-slate-950/90 px-4 py-2 text-xs uppercase tracking-[0.28em] text-sky-300">
                      {car.bodyType}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 rounded-[1.75rem] bg-slate-950/80 p-5">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="font-medium text-slate-400">Color</span>
                      <span className="text-white">{car.color || 'Graphite Black'}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="font-medium text-slate-400">Year</span>
                      <span className="text-white">{car.year}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="font-medium text-slate-400">Age</span>
                      <span className="text-white">{carAge} years</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="font-medium text-slate-400">Mileage</span>
                      <span className="text-white">{car.mileage}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4 text-slate-300">
                    <p>{car.overview}</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {highlights.map((item) => (
                        <div key={item} className="flex items-center gap-3 rounded-3xl bg-slate-950/90 px-4 py-3 text-slate-200">
                          <ShieldCheck size={18} className="text-sky-300" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-slate-800/70 bg-slate-950/80 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Price</p>
                      <p className="mt-2 text-4xl font-semibold text-white">₹{formatCurrency(car.price)}</p>
                    </div>
                    <div className="rounded-3xl bg-sky-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
                      Used / Verified
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3">
                    {emiOptions.slice(0, 3).map((option) => (
                      <div key={option.term} className="rounded-3xl bg-slate-900/90 px-4 py-3 text-slate-200">
                        <div className="flex items-center justify-between gap-4 text-sm text-slate-400">
                          <span>{option.term} months</span>
                          <span className="font-semibold text-white">₹{formatCurrency(option.monthly)}/month</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between gap-4 text-xs text-slate-500">
                          <span>Total: ₹{formatCurrency(option.totalPayment)}</span>
                          <span>Interest: ₹{formatCurrency(option.interestPaid)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button type="button" onClick={scrollToContact} className="btn-primary mt-6 inline-flex w-full justify-center">Book test drive</button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
            <div className="rounded-[2rem] border border-slate-800/70 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
              <h2 className="text-2xl font-semibold text-white">Vehicle Details</h2>
              <div className="mt-6 grid gap-3">
                <div className="flex items-center justify-between rounded-3xl bg-slate-900/90 px-4 py-3 text-slate-300">
                  <span className="font-medium">Condition</span>
                  <span className="text-white">Used</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-slate-900/90 px-4 py-3 text-slate-300">
                  <span className="font-medium">Transmission</span>
                  <span className="text-white">{car.transmission}</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-slate-900/90 px-4 py-3 text-slate-300">
                  <span className="font-medium">Fuel Type</span>
                  <span className="text-white">{car.fuelType}</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-slate-900/90 px-4 py-3 text-slate-300">
                  <span className="font-medium">Seats</span>
                  <span className="text-white">{car.seats}</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-slate-900/90 px-4 py-3 text-slate-300">
                  <span className="font-medium">Body Type</span>
                  <span className="text-white">{car.bodyType}</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-slate-900/90 px-4 py-3 text-slate-300">
                  <span className="font-medium">Color</span>
                  <span className="text-white">{car.color || 'Graphite Black'}</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-slate-900/90 px-4 py-3 text-slate-300">
                  <span className="font-medium">Previous owners</span>
                  <span className="text-white">{car.owners ?? 1}</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-slate-900/90 px-4 py-3 text-slate-300">
                  <span className="font-medium">Insurance</span>
                  <span className="text-white">{car.insurance || 'Verified'}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800/70 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
              <h2 className="text-2xl font-semibold text-white">Description</h2>
              <p className="mt-5 text-slate-300 leading-7">{car.overview}</p>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 text-slate-200">
                  <span className="mt-1 text-sky-300">•</span>
                  <p>Premium quality vehicle with excellent condition and verified history</p>
                </div>
                <div className="flex items-start gap-3 text-slate-200">
                  <span className="mt-1 text-sky-300">•</span>
                  <p>Comprehensive documentation and all service records available</p>
                </div>
                <div className="flex items-start gap-3 text-slate-200">
                  <span className="mt-1 text-sky-300">•</span>
                  <p>Flexible financing options with competitive interest rates</p>
                </div>
                <div className="flex items-start gap-3 text-slate-200">
                  <span className="mt-1 text-sky-300">•</span>
                  <p>Free test drive and detailed vehicle inspection included</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800/70 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
            <h2 className="text-2xl font-semibold text-white">Key Features</h2>
            <div className="mt-6 space-y-3">
              {car.features?.map((feature) => (
                <div key={feature} className="flex items-start gap-3 text-slate-200">
                  <span className="mt-1 text-sky-300">•</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside ref={contactRef} className="space-y-6">
          <div className="rounded-[2rem] border border-slate-800/70 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Dealership</p>
            <div className="mt-4 space-y-4 text-slate-300">
              <div className="rounded-3xl bg-slate-900/90 p-4">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Location</p>
                <p className="mt-2 text-white">{car.sellerLocation}</p>
              </div>
              <div className="rounded-3xl bg-slate-900/90 p-4">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Trusted seller</p>
                <p className="mt-2 text-white">{car.sellerName}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800/70 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Need help?</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Book a test drive</h2>
            <p className="mt-4 text-slate-300">Use this form and our CarBazzar advisor will contact you with a slot.</p>

            {formStatus && <p className="rounded-3xl border border-slate-700/80 bg-slate-900/80 p-4 text-sm text-slate-200">{formStatus}</p>}

            <form onSubmit={handleContactSubmit} className="space-y-4 mt-6">
              <label className="block text-sm font-medium text-slate-300">
                Name
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-800/80 bg-slate-900/90 px-4 py-3 text-white outline-none focus:border-sky-400"
                  placeholder="Your name"
                  required
                />
              </label>
              <label className="block text-sm font-medium text-slate-300">
                Email
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-800/80 bg-slate-900/90 px-4 py-3 text-white outline-none focus:border-sky-400"
                  placeholder="Your email"
                  required
                />
              </label>
              <label className="block text-sm font-medium text-slate-300">
                Message
                <textarea
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-800/80 bg-slate-900/90 px-4 py-3 text-white outline-none focus:border-sky-400"
                  rows={5}
                  placeholder="I want to book a test drive for this car"
                  required
                />
              </label>
              <button type="submit" className="btn-primary mt-2 inline-flex w-full justify-center">Submit request</button>
            </form>

            <div className="mt-6 space-y-4 text-slate-300">
              <div className="flex items-center gap-3 rounded-3xl bg-slate-900/90 px-4 py-4">
                <Phone size={18} className="text-sky-300" />
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Call now</p>
                  <a href="tel:+919876543210" className="text-white hover:text-sky-300 transition-colors">+91 98765 43210</a>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-3xl bg-slate-900/90 px-4 py-4">
                <Mail size={18} className="text-sky-300" />
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Email</p>
                  <a href="mailto:info@carbazzar.com" className="text-white hover:text-sky-300 transition-colors">info@carbazzar.com</a>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>

    </main>
  )
}

export default CarDetail
