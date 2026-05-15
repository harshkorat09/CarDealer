import { useState } from 'react'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus(null)
    setLoading(true)

    try {
      console.log('Sending contact form to:', `${apiUrl}/api/contacts`)
      const response = await axios.post(`${apiUrl}/api/contacts`, { name, email, message })
      console.log('Contact response:', response)
      setStatus('Your message has been sent successfully.')
      setName('')
      setEmail('')
      setMessage('')
    } catch (error) {
      console.error('Contact form error:', error.message, error.response?.data)
      setStatus('Unable to send message. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card-glass p-8 shadow-slate-950/30">
      <div className="mb-6 space-y-2">
        <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Contact</p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Start your car journey today</h2>
        <p className="max-w-2xl text-slate-300">Send us your details and our sales team will help you find the ideal premium used car.</p>
      </div>

      <form className="grid gap-5" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-sm font-medium text-slate-200">Name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Your name"
            className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-200">Email</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="you@example.com"
            className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-200">Message</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows="5"
            placeholder="Tell us what you are looking for"
            className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary mt-2 w-full"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>

        {status && (
          <p className="rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-slate-200">
            {status}
          </p>
        )}
      </form>
    </div>
  )
}

export default ContactForm
