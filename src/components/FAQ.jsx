import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: "How long does a custom home take to build?",
      a: "Most residential projects are completed within 14 to 22 months depending on size, design complexity, and local approvals. This typically includes 4–6 months of design, engineering, and permitting, followed by 10–16 months of construction and interior finishing."
    },
    {
      q: "Do you provide architectural design services?",
      a: "Yes. G5 Homes offers complete architectural planning and custom home design solutions. We coordinate architecture, structural engineering, interior fit-outs, and construction under one unified workflow to prevent budget slippage and ensure the design is built exactly as envisioned."
    },
    {
      q: "Can I customize every aspect of my home?",
      a: "Absolutely. Every G5 Homes residence is tailored entirely to your preferences and lifestyle. From spatial layouts and material selections to lighting systems and smart home integrations, every detail is personalized to reflect your vision."
    },
    {
      q: "Do you provide turnkey construction?",
      a: "Yes. We manage the complete project from concept through final handover. This includes site analysis, architectural design, structural engineering, construction, interior fit-out, quality inspection, and key handover — all under a single point of accountability."
    },
    {
      q: "Which locations do you serve?",
      a: "G5 Homes undertakes premium residential construction projects across Kerala, including Trivandrum, Kochi, Calicut, Wayanad, and surrounding regions. We also accept select projects throughout India for the right residential builds."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (!listRef.current) return;

    const children = listRef.current.children;
    if (children && children.length > 0) {
      gsap.fromTo(children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
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
      id="faq" 
      ref={containerRef} 
      className="section section-darker"
    >
      <div className="container grid-2" style={{ alignItems: 'flex-start' }}>
        <div style={{ position: 'sticky', top: '150px' }}>
          <span className="section-tag">Common Queries</span>
          <h2 className="section-title">
            Frequently Asked <span>Questions</span>
          </h2>
          <p className="section-description" style={{ marginBottom: 0 }}>
            Learn more about our design-build workflow, material standards, construction timelines, and client collaboration process.
          </p>
        </div>

        <div 
          ref={listRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}
        >
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={index}
                style={{
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '20px',
                  transition: 'border-color 0.4s ease'
                }}
              >
                <button
                  id={`faq-btn-${index}`}
                  onClick={() => toggleFAQ(index)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    color: '#ffffff',
                    padding: '15px 0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isOpen) e.currentTarget.style.color = 'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isOpen) e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  <span style={{ color: isOpen ? 'var(--accent)' : '#ffffff', transition: 'color 0.3s ease' }}>
                    {faq.q}
                  </span>
                  
                  <div style={{ color: isOpen ? 'var(--accent)' : 'var(--text-secondary)', marginLeft: '20px' }}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>

                <div
                  style={{
                    maxHeight: isOpen ? '250px' : '0px',
                    overflow: 'hidden',
                    opacity: isOpen ? 1 : 0,
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    paddingRight: '30px'
                  }}
                >
                  <p 
                    style={{
                      fontSize: '0.98rem',
                      lineHeight: '1.7',
                      color: 'var(--text-secondary)',
                      padding: '10px 0 15px 0'
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}