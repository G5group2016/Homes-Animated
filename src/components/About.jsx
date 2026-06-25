import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    if (!imageRef.current || !containerRef.current) return;

    gsap.fromTo(imageRef.current,
      { yPercent: -15 },
      {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    if (textRef.current) {
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });

      const children = textRef.current.children;
      if (children && children.length > 0) {
        textTl.fromTo(children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
        );
      }
    }

    if (statsRef.current) {
      const statsTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });

      const children = statsRef.current.children;
      if (children && children.length > 0) {
        statsTl.fromTo(children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
        );
      }
    }
  }, []);

  return (
    <section 
      id="about" 
      ref={containerRef} 
      className="section section-darker"
      style={{ overflow: 'hidden' }}
    >
      <div className="container grid-2">
        {/* Left Side: Parallax Image Container */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            height: '600px',
            overflow: 'hidden',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
          }}
        >
          <img 
            ref={imageRef}
            src="/images/about_architecture.png" 
            alt="G5 Homes Luxury Architecture" 
            style={{
              width: '100%',
              height: '130%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(180deg, rgba(5,5,5,0) 60%, rgba(5,5,5,0.7) 100%)',
              pointerEvents: 'none'
            }}
          />
        </div>

        {/* Right Side: Copy & Stats */}
        <div style={{ paddingLeft: '5%' }}>
          <div ref={textRef}>
            <span className="section-tag">About G5 Homes</span>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
              Crafting Homes That Last <span>Generations</span>
            </h2>
            <p className="section-description" style={{ fontSize: '1.15rem', lineHeight: '1.7', marginBottom: '3rem' }}>
              At G5 Homes, we believe every home should be a perfect balance of architecture, functionality, and enduring quality. Our experienced team transforms ideas into thoughtfully designed residences through meticulous planning, premium construction techniques, and attention to every detail.
            </p>
          </div>

          {/* Statistics Grid */}
          <div 
            ref={statsRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '2.5rem'
            }}
          >
            <div>
              <div 
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '5px'
                }}
              >
                15+
              </div>
              <div 
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)'
                }}
              >
                Years Experience
              </div>
            </div>

            <div>
              <div 
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  marginBottom: '5px'
                }}
              >
                250+
              </div>
              <div 
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)'
                }}
              >
                Luxury Homes Delivered
              </div>
            </div>

            <div>
              <div 
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '5px'
                }}
              >
                98%
              </div>
              <div 
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)'
                }}
              >
                Client Satisfaction
              </div>
            </div>

            <div>
              <div 
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  marginBottom: '5px'
                }}
              >
                100%
              </div>
              <div 
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)'
                }}
              >
                Quality Commitment
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}