import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Showcase() {
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  const projects = [
    {
      name: "Contemporary Villa",
      location: "Trivandrum, Kerala",
      type: "Luxury Residence",
      img: "/images/villa_showcase.png",
      area: "8,500 sq ft",
      year: "2025"
    },
    {
      name: "Modern Courtyard House",
      location: "Kochi, Kerala",
      type: "Custom Residence",
      img: "/images/courtyard_showcase.png",
      area: "5,200 sq ft",
      year: "2024"
    },
    {
      name: "Minimalist Luxury Home",
      location: "Calicut, Kerala",
      type: "Premium Villa",
      img: "/images/minimalist_showcase.png",
      area: "6,400 sq ft",
      year: "2025"
    }
  ];

  useEffect(() => {
    if (!gridRef.current) return;

    const children = gridRef.current.children;
    if (children && children.length > 0) {
      gsap.fromTo(children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.25,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  return (
    <section 
      id="projects" 
      ref={containerRef} 
      className="section"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="container">
        <span className="section-tag">Flagship Works</span>
        <h2 className="section-title">
          Featured Residential <span>Projects</span>
        </h2>
        <p className="section-description">
          Explore a collection of thoughtfully designed residences showcasing modern architecture, elegant interiors, and superior craftsmanship.
        </p>

        <div 
          ref={gridRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            marginTop: '2rem'
          }}
        >
          {projects.map((proj, idx) => (
            <div 
              key={idx}
              className="showcase-card"
              style={{
                position: 'relative',
                width: '100%',
                height: '500px',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid var(--border-color)'
              }}
            >
              <div 
                className="showcase-img-wrap"
                style={{
                  width: '100%',
                  height: '100%',
                  transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <img 
                  src={proj.img} 
                  alt={proj.name} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              <div 
                className="showcase-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(180deg, rgba(5,5,5,0.1) 0%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.9) 100%)',
                  transition: 'background 0.8s ease'
                }}
              />

              <div 
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  padding: '40px 50px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  zIndex: 2
                }}
              >
                <div>
                  <span 
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.8rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--accent)',
                      display: 'block',
                      marginBottom: '8px'
                    }}
                  >
                    {proj.location}
                  </span>

                  <h3 
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      fontWeight: 600,
                      color: '#ffffff',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {proj.name}
                  </h3>
                </div>

                <div 
                  className="showcase-details"
                  style={{
                    textAlign: 'right',
                    opacity: 0.7,
                    transform: 'translateY(10px)',
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <div 
                    style={{
                      fontSize: '0.85rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#ffffff',
                      marginBottom: '4px'
                    }}
                  >
                    {proj.type}
                  </div>
                  <div 
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {proj.area} • Completed {proj.year}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .showcase-card:hover .showcase-img-wrap {
          transform: scale(1.05);
        }
        .showcase-card:hover .showcase-overlay {
          background: linear-gradient(180deg, rgba(5,5,5,0.02) 0%, rgba(5,5,5,0.2) 50%, rgba(5,5,5,0.95) 100%);
        }
        .showcase-card:hover .showcase-details {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}