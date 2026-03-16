import { useEffect, useRef } from 'react'
import './Product.css'

const FEATURES = [
  {
    icon: '💬',
    title: 'AI Smart Chat',
    desc: 'Intelligent chatbot that understands context, answers FAQs, and qualifies leads in real-time. Works across web and WhatsApp.',
  },
  {
    icon: '📅',
    title: 'Instant Slot Booking',
    desc: 'Automated scheduling system. Let users book meetings, services, or slots without any manual intervention.',
  },
  {
    icon: '📊',
    title: 'Admin Dashboard',
    desc: 'Comprehensive analytics and management tool. Track conversations, bookings, and user behavior from one place.',
  },
  {
    icon: '⚡',
    title: 'Rapid Integration',
    desc: 'Connect your existing tools and APIs effortlessly. Sync bookings directly to your calendar or CRM.',
  }
]

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } }, { threshold: 0.05 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return ref
}

function FeatureCard({ feature, delay }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`p-feat-card reveal reveal-d${delay}`}>
      <div className="p-feat-icon">{feature.icon}</div>
      <h3>{feature.title}</h3>
      <p>{feature.desc}</p>
    </div>
  )
}

export default function Product() {
  const hRef = useReveal()
  const fRef = useReveal()

  return (
    <div className="product-page">
      {/* Product Hero */}
      <section className="p-hero section">
        <div ref={hRef} className="reveal p-hero-content">
          <div className="section-label">Our Flagship Product</div>
          <h1 className="section-title">AI Chatbot <span className="blue-text">+ Slot Booking</span></h1>
          <p className="section-sub">
            The all-in-one solution for automated customer interaction and scheduling. 
            Scale your business operations while providing a premium experience to your clients.
          </p>
          <div className="p-hero-btns">
            <button className="btn-primary">Get Started Now</button>
            <button className="btn-ghost">Watch Demo</button>
          </div>
        </div>
        <div className="p-hero-visual">
          <div className="p-card mock-chat">
            <div className="p-card-head">
              <div className="dot red" /><div className="dot yellow" /><div className="dot green" />
              <span>AI Assistant</span>
            </div>
            <div className="p-card-body">
              <div className="msg bot">Hello! How can I help you today?</div>
              <div className="msg user">I'd like to book a demo.</div>
              <div className="msg bot">Sure! I can help with that. What date works for you?</div>
              <div className="p-book-ui">
                <div className="slot">10:00 AM</div>
                <div className="slot active">02:00 PM</div>
                <div className="slot">04:30 PM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Features */}
      <section className="p-features section">
        <div ref={fRef} className="reveal p-feat-head text-center">
          <div className="section-label">Capabilities</div>
          <h2 className="section-title">Built for <span className="blue-text">Performance</span></h2>
        </div>
        <div className="p-feat-grid">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} delay={(i % 3) + 1} />
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* Demo Section */}
      <section className="p-demo section bg-alt">
        <div className="demo-container">
          <div className="demo-info">
            <h2 className="section-title">Experience the <span className="blue-text">Future</span></h2>
            <p>Our product combines the power of GPT-4 with a seamless reservation system. It's not just a chatbot; it's your tireless 24/7 business manager.</p>
            <ul className="p-list">
              <li>✓ 99.9% Context Accuracy</li>
              <li>✓ Infinite Concurrent Bookings</li>
              <li>✓ Real-time Sync with Google/Outlook</li>
              <li>✓ Custom Branding & Logic</li>
            </ul>
          </div>
          <div className="demo-action">
            <div className="p-cta-box">
              <h3>Ready to automate?</h3>
              <p>Join 500+ businesses using Slotress AI.</p>
              <button className="btn-primary w-full">Claim Your Free Trial</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
