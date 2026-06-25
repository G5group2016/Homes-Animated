import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  const list = [
    {
      quote: "G5 Homes exceeded every expectation. Their attention to detail and commitment to quality made our dream home a reality.",
      client: "Rajesh Menon",
      role: "Homeowner",
      location: "Trivandrum"
    },
    {
      quote: "The entire construction journey was transparent, professional, and stress-free. The final result was simply outstanding.",
      client: "Priya Nair",
      role: "Villa Owner",
      location: "Kochi"
    },
    {
      quote: "Excellent craftsmanship, timely delivery, and a team that genuinely cares about every detail. Truly world-class.",
      client: "Anand Krishnan",
      role: "Residence Owner",
      location: "Calicut"
    }
  ];

  useEffect(() => {
    if (!gridRef.current) return;

    const children = gridRef.current.children;
    if (children && children.length > 0) {
      gsap.fromTo(children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  return (
    <section 
      id="testimonials" 
      ref={containerRef} 
      className="section"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="container">
        <span className="section-tag">Client Reviews</span>
        <h2 className="section-title">
          What Our Clients <span>Say</span>
        </h2>
        <p className="section-description">
          Read reviews from the homeowners and families for whom we have crafted exceptional custom residences across Kerala.
        </p>

        <div 
          ref={gridRef}
          className="grid-3"
          style={{ gap: '30px', marginTop: '2rem' }}
        >
          {list.map((item, idx) => (
            <div 
              key={idx}
              className="glass-panel"
              style={{
                padding: '50px 40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '320px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.01)',
                border: '1px solid var(--border-color)',
                transition: 'var(--transition-smooth)'
              }}
            >
              <blockquote 
                style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.7',
                  color: '#ffffff',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  marginBottom: '2.5rem'
                }}
              >
                "{item.quote}"
              </blockquote>

              <div>
                <cite 
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    color: '#ffffff',
                    display: 'block',
                    fontStyle: 'normal',
                    marginBottom: '4px'
                  }}
                >
                  {item.client}
                </cite>
                <span 
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.05em',
                    display: 'block',
                    textTransform: 'uppercase'
                  }}
                >
                  {item.role} • {item.location}
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}