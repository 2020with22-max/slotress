import { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import { HowItWorks, FAQ, GetStarted, Contact, Footer } from './components/Sections.jsx'
import Product from './components/Product.jsx'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Cursor() {
  const dot = useRef(null), ring = useRef(null)
  useEffect(() => {
    let rx = 0, ry = 0, raf
    const move = e => {
      const x = e.clientX, y = e.clientY
      if (dot.current) { dot.current.style.left = x + 'px'; dot.current.style.top = y + 'px' }
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        rx += (x - rx) * .13; ry += (y - ry) * .13
        if (ring.current) { ring.current.style.left = rx + 'px'; ring.current.style.top = ry + 'px' }
      })
    }
    const on  = () => { dot.current?.classList.add('hov'); ring.current?.classList.add('hov') }
    const off = () => { dot.current?.classList.remove('hov'); ring.current?.classList.remove('hov') }
    window.addEventListener('mousemove', move)
    document.querySelectorAll('a,button,.srv-card,.faq-item').forEach(el => {
      el.addEventListener('mouseenter', on); el.addEventListener('mouseleave', off)
    })
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])
  return <><div ref={dot} className="cursor" /><div ref={ring} className="cursor-ring" /></>
}

const Home = () => (
  <>
    <Hero />
    <div className="divider" />
    <Services />
    <div className="divider" />
    <HowItWorks />
    <div className="divider" />
    <FAQ />
    <div className="divider" />
    <GetStarted />
    <div className="divider" />
    <Contact />
  </>
)

function ScrollTopBtn() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <button 
      className={`scroll-btn ${show ? 'visible' : ''}`} 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Cursor />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
          </Routes>
        </main>
        <Footer />
        <ScrollTopBtn />
      </Router>
    </ThemeProvider>
  )
}
