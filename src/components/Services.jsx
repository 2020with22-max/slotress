import { useEffect, useRef } from 'react'
import './Services.css'

const SERVICES = [
  { icon: '🤖', title: 'AI Automation', desc: 'Transform your business with intelligent automation. We build custom AI solutions that streamline workflows and boost productivity.', tag: 'Intelligence' },
  { icon: '🌐', title: 'Web Service', desc: 'Modern, high-performance web solutions tailored to your needs. From corporate sites to complex web applications.', tag: 'Full Stack' },
  { icon: '🛍️', title: 'E-commerce Development', desc: 'Scale your sales with powerful online stores. Optimized for conversion, security, and seamless user experience.', tag: 'Commerce' },
  { icon: '🎨', title: 'UI/UX Design', desc: 'Crafting stunning, user-centric interfaces. We design digital experiences that are beautiful, intuitive, and effective.', tag: 'Creative' },
  { icon: '📱', title: 'Mobile App Development', desc: 'High-quality native and cross-platform mobile apps. Bringing your vision to your customers\' fingertips.', tag: 'App Store' },
]

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } }, { threshold: .1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return ref
}

function Card({ icon, title, desc, tag, hot, delay }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`srv-card reveal reveal-d${delay} ${hot ? 'hot' : ''}`}>
      <div className="srv-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="srv-foot">
        <span className="srv-tag">{tag}</span>
        {hot && <span className="srv-popular">★ Popular</span>}
      </div>
    </div>
  )
}

export default function Services() {
  const hRef = useReveal()
  return (
    <section id="services" className="section srv-section">
      <div ref={hRef} className="reveal srv-head">
        <div className="section-label">What We Offer</div>
        <h2 className="section-title">Services Built to <span className="blue-text">Scale Your Business</span></h2>
        <p className="section-sub">From AI automation to fully custom digital products — everything your business needs to grow.</p>
      </div>
      <div className="srv-grid">
        {SERVICES.map((s, i) => <Card key={s.title} {...s} delay={(i % 3) + 1} />)}
      </div>
    </section>
  )
}
