import { Link } from 'react-router-dom'
import { Menu, Car } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/80 px-3 shadow-lg shadow-slate-950/30">
            <Car className="h-8 w-8 text-sky-300" />
          </div>
          <div className="hidden flex-col text-left sm:flex">
            <span className="text-sm font-semibold uppercase tracking-[0.24em]">CarBazzar</span>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Premium Cars</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-slate-300 md:flex">
          <a href="#inventory" className="transition hover:text-white">Inventory</a>
          <a href="#why" className="transition hover:text-white">Why Us</a>
          <a href="#ai" className="transition hover:text-white">AI Picks</a>
          <a href="#contact" className="btn-secondary hidden whitespace-nowrap md:inline-flex">Contact Sales</a>
        </nav>

        <button className="inline-flex items-center justify-center rounded-full border border-slate-700 px-3 py-2 text-slate-200 hover:bg-slate-900 md:hidden">
          <Menu size={18} />
        </button>
      </div>
    </header>
  )
}

export default Navbar
