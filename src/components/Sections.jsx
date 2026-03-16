import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Sections.css'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } }, { threshold: .1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return ref
}

/* HOW IT WORKS */
const STEPS = [
  { n: '01', title: 'Discovery Call', icon: '🔍', desc: 'A free consultation to understand your business, goals, and which solution fits best. No jargon — just a real conversation.' },
  { n: '02', title: 'Design & Build', icon: '⚙️', desc: 'We design and build your custom solution — AI agent, website, or mobile app — tailored precisely to your brand and workflows.' },
  { n: '03', title: 'Launch & Support', icon: '🚀', desc: 'We deploy everything, walk you through it, and provide ongoing support and optimisations as your business scales.' },
]

export function HowItWorks() {
  const hRef = useReveal()
  const refs = [useReveal(), useReveal(), useReveal()]
  return (
    <section id="process" className="section how-section">
      <div ref={hRef} className="reveal how-head">
        <div className="section-label">The Process</div>
        <h2 className="section-title">From Idea to <span className="blue-text">Live in Days</span></h2>
        <p className="section-sub">Simple, transparent, fast — we handle the complexity so you focus on your business.</p>
      </div>
      <div className="steps-grid">
        {STEPS.map((s, i) => (
          <div key={s.n} ref={refs[i]} className={`step reveal reveal-d${i + 1}`}>
            <div className="step-top">
              <span className="step-n">{s.n}</span>
              <span className="step-ico">{s.icon}</span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* FAQ */
const FAQS = [
  { q: 'What exactly is an AI Voice Agent?', a: 'An AI Voice Agent is an automated system that handles phone calls for your business — greeting customers, answering questions, and booking appointments 24/7 without any human operator.' },
  { q: 'How long does it take to build and launch?', a: 'AI agents can go live in as little as 3–5 business days. Websites take 1–2 weeks. Mobile apps typically 3–6 weeks depending on feature complexity.' },
  { q: 'Do I need any technical knowledge?', a: 'Absolutely not. We handle everything — setup, testing, training, and deployment. You just tell us what your business needs.' },
  { q: 'Can the AI be customised for my business?', a: "Yes — 100%. Every agent is tailored to your industry, tone of voice, FAQs, and workflows. It speaks your brand, not a generic script." },
  { q: 'What businesses benefit from Slotress?', a: "Any service-based business — clinics, salons, spas, restaurants, real estate, fitness studios, legal services, and more." },
  { q: 'What ongoing support do you provide?', a: 'Post-launch support includes bug fixes, updates, and performance monitoring. Optional maintenance packages are available as your business grows.' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-q" onClick={() => setOpen(v => !v)}>
        <span>{q}</span>
        <div className="faq-icon">{open ? '−' : '+'}</div>
      </button>
      <div className="faq-a" style={{ maxHeight: open ? '240px' : '0' }}>
        <p>{a}</p>
      </div>
    </div>
  )
}

export function FAQ() {
  const lRef = useReveal(), rRef = useReveal()
  return (
    <section id="faq" className="section faq-section">
      <div className="faq-layout">
        <div ref={lRef} className="reveal">
          <div className="section-label">Got Questions?</div>
          <h2 className="section-title">Everything You <span className="blue-text">Need to Know</span></h2>
          <p className="section-sub" style={{ marginTop: '1rem' }}>Can't find your answer? Reach out — we reply within 24 hours.</p>
          <a href="#contact" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>Ask Us Directly →</a>
        </div>
        <div ref={rRef} className="reveal reveal-d1 faq-list">
          {FAQS.map(f => <FaqItem key={f.q} {...f} />)}
        </div>
      </div>
    </section>
  )
}

/* GET STARTED */
export function GetStarted() {
  const ref = useReveal()
  return (
    <section className="section gs-section">
      <div ref={ref} className="gs-box reveal">
        <div className="section-label" style={{ marginBottom: '1.5rem' }}>Final Step</div>
        <h2 className="gs-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.1, marginBottom: '1.5rem' }}> Ready to <span className="blue-text">Automate</span> Your Business?</h2>
        <p className="gs-p" style={{ fontSize: '1.1rem', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>Join 500+ businesses using Slotress to scale their operations with AI. Get your custom solution live in as little as 3 days.</p>
        <div className="gs-btns" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#contact" className="btn-primary">Start Your Project →</a>
          <Link to="/product" className="btn-ghost" style={{ border: '1px solid var(--border)', background: 'var(--bg2)' }}>Explore Products</Link>
        </div>
      </div>
    </section>
  )
}

/* CONTACT */
const SVC_LIST = ['AI Automation', 'Web Service', 'E-commerce Development', 'UI/UX Design', 'Mobile App Development', "Not sure — let's discuss"]

export function Contact() {
  const lRef = useReveal(), rRef = useReveal()
  const [form, setForm] = useState({ name: '', biz: '', email: '', service: '', msg: '' })
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    if (e) e.preventDefault()
    if (!form.name || !form.email) { 
      setStatus('error-fields')
      setTimeout(() => setStatus('idle'), 4000)
      return 
    }
    
    setStatus('loading')

    try {
      // Use FormSubmit.co - No account/dashboard login needed!
      const response = await fetch('https://formsubmit.co/ajax/akhil.code.dev@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...form,
          _subject: `New Slotress Lead: ${form.name}`,
          _template: 'table' // Sends a nicely formatted email
        })
      })
      
      const data = await response.json()
      
      if (data.success === 'true' || response.ok) {
        setStatus('success')
        setForm({ name: '', biz: '', email: '', service: '', msg: '' })
        setTimeout(() => setStatus('idle'), 6000)
      } else {
        // If it fails, maybe it needs activation
        setStatus('verify-needed')
      }
    } catch (err) {
      console.error('Submission error:', err)
      setStatus('error')
    }
  }

  const sendMailto = () => {
    const subject = encodeURIComponent(`Inquiry from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nBusiness: ${form.biz}\nEmail: ${form.email}\nService: ${form.service}\n\nMessage:\n${form.msg}`)
    window.location.href = `mailto:akhil.code.dev@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="contact-grid">
        <div ref={lRef} className="reveal">
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title">Let's Build <span className="blue-text">Something Great</span></h2>
          <p className="contact-intro">Ready to automate your business? Fill out the form and we'll get back to you within 24 hours.</p>
          {[
            ['📧', 'Email', 'akhil.code.dev@gmail.com'],
            ['📞', 'Phone', 'Available on request'],
            ['⚡', 'Response Time', 'Within 24 hours']
          ].map(([icon, label, val]) => (
            <div key={label} className="cdet">
              <div className="cdet-icon">{icon}</div>
              <div><strong>{label}</strong><span>{val}</span></div>
            </div>
          ))}
        </div>
        
        <form ref={rRef} className="reveal reveal-d2 cform" onSubmit={submit}>
          <div className="form-row">
            <div className="fg"><label>Your Name</label><input name="name" placeholder="John Doe" required value={form.name} onChange={set('name')} /></div>
            <div className="fg"><label>Business Name</label><input name="business" placeholder="Acme Corp" value={form.biz} onChange={set('biz')} /></div>
          </div>
          <div className="fg"><label>Email Address</label><input name="email" type="email" placeholder="john@yourbusiness.com" required value={form.email} onChange={set('email')} /></div>
          <div className="fg">
            <label>Service Interested In</label>
            <select name="service" value={form.service} onChange={set('service')}>
              <option value="" disabled>Select a service...</option>
              {SVC_LIST.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="fg"><label>Tell us about your project</label><textarea name="message" placeholder="What does your business do? What problem are you trying to solve?" value={form.msg} onChange={set('msg')} /></div>
          
          {status === 'success' && (
            <div className="form-status success">
              ✨ Success! Your message has been sent. We'll be in touch soon.
            </div>
          )}
          
          {status === 'error' && (
            <div className="form-status error">
              ❌ Oops! Something went wrong. Please try again or email us directly.
            </div>
          )}

          {status === 'error-fields' && (
            <div className="form-status error">
              ⚠️ Please fill in at least your name and email address.
            </div>
          )}

          {status === 'verify-needed' && (
            <div className="form-status verify">
              ✉️ Formspree is waiting for activation. Check your spam or click below to send directly:
              <button type="button" onClick={sendMailto} className="btn-direct">Send via Email App →</button>
            </div>
          )}

          {status === 'error' && (
            <div className="form-status error">
              ❌ Submission failed. You can send it directly here:
              <button type="button" onClick={sendMailto} className="btn-direct">Send via Email App →</button>
            </div>
          )}

          <button type="submit" className={`fsub ${status === 'success' ? 'sent' : ''}`} disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending...' : status === 'success' ? '✓ Message Sent!' : 'Send Message →'}
          </button>
        </form>
      </div>
    </section>
  )
}

/* FOOTER */
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <Link to="/" className="f-logo" onClick={() => window.scrollTo(0,0)}>
          <img src="/logo.png" alt="Slotress" style={{ width: 28, height: 28, borderRadius: 7, objectFit: 'contain' }} />
          <span style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-.03em', color: '#fff' }}>Slotress</span>
        </Link>
        <ul className="footer-links">
          <li><a href="/#services">Services</a></li>
          <li><Link to="/product">Product</Link></li>
          <li><a href="/#process">Process</a></li>
          <li><a href="/#faq">FAQ</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
        <p className="footer-copy">© 2025 Slotress. All rights reserved.</p>
      </div>
    </footer>
  )
}
