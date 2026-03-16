import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

/* Particle canvas - subtle white dots */
function Particles() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d')
    let raf, mouse = { x: -999, y: -999 }
    let dots = []

    const resize = () => {
      c.width = window.innerWidth; c.height = window.innerHeight
      dots = Array.from({ length: 110 }, () => ({
        x: Math.random() * c.width, y: Math.random() * c.height,
        ox: 0, oy: 0, vx: 0, vy: 0,
        r: Math.random() * 1.2 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.003 + 0.001
      }))
      dots.forEach(d => { d.ox = d.x; d.oy = d.y })
    }

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height); t++
      for (const d of dots) {
        const dx = mouse.x - d.x, dy = mouse.y - d.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 140) { const f = (1 - dist / 140) * 5; d.vx -= (dx / dist) * f; d.vy -= (dy / dist) * f }
        d.vx += (d.ox - d.x) * 0.1; d.vy += (d.oy - d.y) * 0.1
        d.vx *= 0.75; d.vy *= 0.75
        d.x += d.vx; d.y += d.vy
        const a = 0.08 + 0.45 * Math.abs(Math.sin(t * d.speed + d.phase)) + Math.min(Math.abs(d.vx) + Math.abs(d.vy), 1) * 0.3
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${a})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    const onMouse = e => { mouse.x = e.clientX; mouse.y = e.clientY }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouse)
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMouse) }
  }, [])
  return <canvas ref={ref} className="particle-canvas" />
}

/* Typewriter */
const WORDS = ['Automate.', 'Elevate.', 'Dominate.', 'Innovate.']
function Typewriter() {
  const [idx, setIdx] = useState(0)
  const [txt, setTxt] = useState('')
  const [del, setDel] = useState(false)
  useEffect(() => {
    const word = WORDS[idx]
    if (!del && txt === word) { const t = setTimeout(() => setDel(true), 2000); return () => clearTimeout(t) }
    if (del && txt === '') { setDel(false); setIdx(i => (i + 1) % WORDS.length); return }
    const t = setTimeout(() => setTxt(del ? txt.slice(0, -1) : word.slice(0, txt.length + 1)), del ? 55 : 90)
    return () => clearTimeout(t)
  }, [txt, del, idx])
  return <span className="tw">{txt}<span className="caret">|</span></span>
}

/* Counter */
function Counter({ val, suf }) {
  const [n, setN] = useState(0); const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; obs.disconnect()
      const num = parseInt(val); if (isNaN(num)) { setN(val); return }
      let cur = 0; const s = () => { cur += Math.ceil((num - cur) / 8); setN(cur); if (cur < num) requestAnimationFrame(s) }
      requestAnimationFrame(s)
    }, { threshold: 0.5 })
    obs.observe(ref.current); return () => obs.disconnect()
  }, [val])
  return <span ref={ref}>{n}{suf}</span>
}

const STATS = [
  { val: '5', suf: '+', label: 'Services' },
  { val: '24', suf: '/7', label: 'AI Uptime' },
  { val: '100', suf: '%', label: 'Custom Built' },
  { val: '5', suf: ' days', label: 'Avg. Delivery' },
]

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <Particles />
      {/* Single subtle blue glow behind logo area */}
      <div className="hero-glow" />
      <div className="hero-grid" />

      <div className="hero-inner">
        {/* Logo mark large in hero */}
        <div className="hero-logo-wrap">
          <img src="/logo.png" alt="Slotress" className="hero-logo" />
        </div>

        <div className="hero-badge">
          <span className="bdot" />
          AI-Powered Business Solutions
        </div>

        <h1 className="hero-title">
          Your Business Can<br />
          <Typewriter />
        </h1>

        <p className="hero-sub">
          Slotress delivers high-end AI automation, web services, e-commerce development, 
          UI/UX design, and mobile apps — tailored to scale your vision and business.
        </p>

        <div className="hero-btns">
          <a href="#contact" className="btn-primary">Start Your Project →</a>
          <Link to="/product" className="btn-ghost">View Product</Link>
        </div>

        <div className="hero-stats">
          {STATS.map(s => (
            <div key={s.label} className="stat">
              <div className="stat-n"><Counter val={s.val} suf={s.suf} /></div>
              <div className="stat-l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
