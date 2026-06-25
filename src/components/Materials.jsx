import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Materials() {
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  const materials = [
    {
      name: "Natural Timber",
      tagline: "Sustainably Sourced Oak & Teak",
      spec: "Hand-finished, marine-grade sealing, thermal-treated stability",
      bgClass: "material-wood"
    },
    {
      name: "Architectural Concrete",
      tagline: "Exposed Structural Formwork",
      spec: "Self-consolidating mixes, matte slate colors, zero-fissure curing",
      bgClass: "material-concrete"
    },
    {
      name: "Premium Stone",
      tagline: "Book-matched Marble & Granite",
      spec: "Vein-aligned layouts, honing treatments, natural tactile feel",
      bgClass: "material-stone"
    },
    {
      name: "Structural Steel",
      tagline: "Cantilevered Framing Systems",
      spec: "High-yield alloy, oxidized carbon styling, hidden weld joints",
      bgClass: "material-steel"
    },
    {
      name: "High-Performance Glass",
      tagline: "Acoustic & Low-E Glazing",
      spec: "Double-cavity argon insulated, solar heat control, ultra-clear profile",
      bgClass: "material-glass"
    },
    {
      name: "Luxury Lighting Systems",
      tagline: "Hidden Architectural Illumination",
      spec: "Warm filament levels, smart home automation, zero-glare fixture lines",
      bgClass: "material-lighting"
    },
    {
      name: "Sustainable Materials",
      tagline: "Eco-Conscious Construction",
      spec: "Recycled composites, low-VOC finishes, certified green building products",
      bgClass: "material-sustainable"
    },
    {
      name: "Smart Home Integration",
      tagline: "Intelligent Living Systems",
      spec: "Automated climate, security, lighting, and AV systems seamlessly embedded",
      bgClass: "material-smart"
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
          stagger: 0.1,
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
      id="materials" 
      ref={containerRef} 
      className="section section-darker"
    >
      <div className="container">
        <span className="section-tag">Premium Finishes</span>
        <h2 className="section-title">
          Built with Premium <span>Materials</span>
        </h2>
        <p className="section-description">
          We carefully select every material to ensure durability, aesthetics, and long-term performance. Every home is built using industry-leading products and modern construction standards.
        </p>

        <div 
          ref={gridRef}
          className="grid-3"
          style={{ gap: '24px' }}
        >
          {materials.map((mat, idx) => (
            <div 
              key={idx}
              className="glass-panel material-card"
              style={{
                position: 'relative',
                padding: '45px 35px',
                height: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              <div className="card-glow" />

              <div>
                <span 
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '8px'
                  }}
                >
                  0{idx + 1}
                </span>
                <h3 
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 500,
                    color: '#ffffff',
                    letterSpacing: '-0.01em',
                    marginBottom: '10px'
                  }}
                >
                  {mat.name}
                </h3>
                <p 
                  style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.45)',
                    fontWeight: 400
                  }}
                >
                  {mat.tagline}
                </p>
              </div>

              <div 
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  paddingTop: '18px'
                }}
              >
                <p 
                  style={{
                    fontSize: '0.82rem',
                    lineHeight: '1.5',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {mat.spec}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .material-card {
          position: relative;
        }
        .material-card .card-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(212, 175, 55, 0.06), transparent 40%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 1;
        }
        .material-card:hover .card-glow {
          opacity: 1;
        }
        .material-card:hover {
          transform: translateY(-5px);
          border-color: rgba(212, 175, 55, 0.3) !important;
        }
      `}</style>
    </section>
  );
}