import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const children = contentRef.current.children;
    if (children && children.length > 0) {
      gsap.fromTo(children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
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
      id="contact" 
      ref={containerRef} 
      className="section"
      style={{ 
        backgroundColor: 'var(--bg-primary)',
        alignItems: 'center',
        textAlign: 'center',
        padding: '160px 8%',
        borderBottom: 'none'
      }}
    >
      <div 
        ref={contentRef} 
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '800px'
        }}
      >
        <span className="section-tag" style={{ letterSpacing: '0.3em' }}>
          Connect With G5 Homes
        </span>

        <h2 
          className="section-title" 
          style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 700, 
            lineHeight: 1,
            marginBottom: '1.5rem',
            textTransform: 'uppercase'
          }}
        >
          Let's Build Your <span>Dream Home</span>
        </h2>

        <p 
          style={{ 
            fontSize: '1.2rem',
            lineHeight: '1.7',
            color: 'var(--text-secondary)',
            marginBottom: '3rem',
            fontWeight: 300,
            maxWidth: '620px'
          }}
        >
          Whether you're planning a luxury villa, a modern family residence, or a custom architectural home, G5 Homes is ready to bring your vision to life with exceptional quality and craftsmanship.
        </p>

        <div 
          style={{ 
            display: 'flex', 
            gap: '20px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <a 
            href="mailto:info@g5homes.com" 
            className="btn btn-primary"
            style={{ 
              padding: '16px 36px',
              fontSize: '0.95rem'
            }}
          >
            Schedule Consultation
          </a>
          <a 
            href="#projects" 
            className="btn btn-secondary"
            style={{ 
              padding: '16px 36px',
              fontSize: '0.95rem'
            }}
          >
            View Portfolio
          </a>
        </div>
      </div>
    </section>
  );
}