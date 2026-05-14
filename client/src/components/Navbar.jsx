import { Link } from 'react-router-dom'
import { Sparkles, Menu } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold text-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/20">
            <Sparkles size={20} />
          </div>
          <span>AutoVault</span>
        </Link>

        <nav className="hidden items-center gap-8 text-slate-300 md:flex">
          <a href="#inventory" className="transition hover:text-white">Inventory</a>
          <a href="#why" className="transition hover:text-white">Why Us</a>
          <a href="#ai" className="transition hover:text-white">AI Picks</a>
          <a href="#contact" className="transition hover:text-white">Contact</a>
        </nav>

        <a
          href="#contact"
          className="btn-secondary hidden whitespace-nowrap md:inline-flex"
        >
          Talk to us
        </a>

        <button className="inline-flex items-center justify-center rounded-full border border-slate-700 px-3 py-2 text-slate-200 hover:bg-slate-900 md:hidden">
          <Menu size={18} />
        </button>
      </div>
    </header>
  )
}

export default Navbar
