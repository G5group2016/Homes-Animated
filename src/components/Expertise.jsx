import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, Compass, Activity, PenTool, LayoutGrid, Award, Hammer, RefreshCw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Expertise() {
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  const services = [
    {
      icon: <Home size={28} />,
      title: "Custom Home Construction",
      desc: "Engineering and constructing bespoke residential estates. Every structural joint and material interface is aligned with architectural intent."
    },
    {
      icon: <Award size={28} />,
      title: "Luxury Villa Construction",
      desc: "Delivering world-class luxury villas with meticulous attention to detail, premium finishes, and architectural excellence that stands the test of time."
    },
    {
      icon: <Compass size={28} />,
      title: "Architectural Design",
      desc: "Creating structural plans that optimize natural lighting, geometry, and spaces, blending modern design lines with functional living."
    },
    {
      icon: <Activity size={28} />,
      title: "Structural Engineering",
      desc: "Delivering advanced structural systems with minimal support lines, enabling expansive glazing panels and floating floor layouts."
    },
    {
      icon: <PenTool size={28} />,
      title: "Interior Fit-Out",
      desc: "Bespoke internal finishes, detailed joinery, custom stone layouts, and hidden lighting integrations for high-end residential interiors."
    },
    {
      icon: <RefreshCw size={28} />,
      title: "Renovation & Remodeling",
      desc: "Transforming existing residences with thoughtful redesign, premium material upgrades, and structural improvements that elevate every space."
    },
    {
      icon: <LayoutGrid size={28} />,
      title: "Project Management",
      desc: "Orchestrating every stage of the builds under rigid quality checkpoints, ensuring timeline execution and architectural compliance."
    },
    {
      icon: <Hammer size={28} />,
      title: "Turnkey Residential Solutions",
      desc: "From initial zoning analysis and site surveying up to structural handover, we deliver a completely finished residence ready for living."
    }
  ];

  useEffect(() => {
    if (!gridRef.current) return;

    const children = gridRef.current.children;
    if (children && children.length > 0) {
      gsap.fromTo(children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
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
      id="services" 
      ref={containerRef} 
      className="section"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="container">
        <span className="section-tag">Our Capabilities</span>
        <h2 className="section-title">
          Premium Residential Construction <span>Services</span>
        </h2>
        <p className="section-description">
          From concept to completion, G5 Homes offers comprehensive residential construction solutions tailored to modern lifestyles and architectural excellence.
        </p>

        <div 
          ref={gridRef}
          className="grid-3"
          style={{ marginTop: '2rem' }}
        >
          {services.map((service, index) => (
            <div 
              key={index} 
              className="glass-panel"
              style={{
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                cursor: 'pointer'
              }}
            >
              <div 
                style={{
                  color: 'var(--accent)',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50px',
                  height: '50px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(212, 175, 55, 0.05)',
                  border: '1px solid rgba(212, 175, 55, 0.1)'
                }}
              >
                {service.icon}
              </div>

              <h3 
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 500,
                  marginBottom: '12px',
                  color: '#ffffff',
                  letterSpacing: '-0.01em'
                }}
              >
                {service.title}
              </h3>

              <p 
                style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  color: 'var(--text-secondary)'
                }}
              >
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}