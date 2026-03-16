import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navItems = [
    { name: 'Services', path: '/#services' },
    { name: 'Product',  path: '/product' },
    { name: 'Process',  path: '/#process' },
    { name: 'FAQ',      path: '/#faq' },
  ]

  const NavLink = ({ item }) =>
    item.path.startsWith('/#') ? (
      <a href={item.path} onClick={() => setOpen(false)}>{item.name}</a>
    ) : (
      <Link to={item.path} onClick={() => setOpen(false)}>{item.name}</Link>
    )

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="logo" onClick={() => window.scrollTo(0, 0)}>
          <img src="/logo.png" alt="Slotress" className="logo-img" />
          <span className="logo-name">Slotress</span>
        </Link>

        <ul className="nav-links">
          {navItems.map(item => (
            <li key={item.name}><NavLink item={item} /></li>
          ))}
        </ul>

        <div className="nav-right">
          {/* Theme Toggle */}
          <button
            className="theme-toggle"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            <span className="icon icon-moon">🌙</span>
            <span className="icon icon-sun">☀️</span>
          </button>

          <a href="/#contact" className="nav-cta">Get Started</a>

          <button className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen(v => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mob ${open ? 'active' : ''}`}>
        <button className="mob-x" onClick={() => setOpen(false)}>✕</button>
        {navItems.map(item => <NavLink key={item.name} item={item} />)}
        <a href="/#contact" onClick={() => setOpen(false)}>Contact</a>
        <button
          className="theme-toggle"
          onClick={() => { toggle(); setOpen(false) }}
          style={{ width: 'auto', padding: '0.6rem 1.4rem', borderRadius: 10, fontSize: '1rem' }}
        >
          {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </>
  )
}
