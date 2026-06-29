import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const containerRef = useRef(null);
  const pathLineRef = useRef(null);
  const stepsRef = useRef(null);

  const steps = [
    {
      title: "Consultation",
      subtitle: "Phase 01 — Understanding Your Vision",
      desc: "We begin with a detailed consultation to understand your lifestyle, preferences, and aspirations. Our team conducts site evaluations, discusses budgets, and outlines a clear project roadmap."
    },
    {
      title: "Planning",
      subtitle: "Phase 02 — Site Analysis & Budgeting",
      desc: "We perform comprehensive site surveys, municipal zoning analyses, structural feasibility assessments, and draft a granular construction cost model tailored to your requirements."
    },
    {
      title: "Architectural Design",
      subtitle: "Phase 03 — Concepts & Visualization",
      desc: "Our architects model volume schemes, interior orientations, and lighting behaviors, translating your vision into photorealistic visualizations and detailed design blueprints."
    },
    {
      title: "Engineering",
      subtitle: "Phase 04 — Structural & MEP Blueprints",
      desc: "We engineer structural frames enabling wide spans and cantilevers, specify high-performance mechanical systems, and compile complete structural drawings for approval."
    },
    {
      title: "Construction",
      subtitle: "Phase 05 — Precision Building",
      desc: "Our master craftspeople manage excavation, structural framing, wall installations, glazing fit-outs, and custom masonry work under strict quality control checkpoints."
    },
    {
      title: "Quality Inspection",
      subtitle: "Phase 06 — Zero-Defect Audit",
      desc: "Every system, finish, and structural element undergoes rigorous inspection protocols ensuring the highest standards of build quality before we proceed to finishing."
    },
    {
      title: "Interior Finishing",
      subtitle: "Phase 07 — Final Fit-Out",
      desc: "Bespoke joinery, premium flooring, lighting integrations, and smart home systems are installed and calibrated, bringing the residence to its full designed potential."
    },
    {
      title: "Project Handover",
      subtitle: "Phase 08 — Keys & Documentation",
      desc: "Following final cleaning and thorough commissioning, we present you with your keys, structural documentation, and warranties — your dream home, ready to move in."
    }
  ];

  useEffect(() => {
    if (pathLineRef.current) {
      gsap.fromTo(pathLineRef.current,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 40%',
            end: 'bottom 60%',
            scrub: true
          }
        }
      );
    }

    if (stepsRef.current) {
      const stepItems = stepsRef.current.children;
      Array.from(stepItems).forEach((step) => {
        const bullet = step.querySelector('.timeline-bullet');
        const content = step.querySelector('.timeline-content');

        if (bullet) {
          gsap.fromTo(bullet,
            { scale: 0.8, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.15)' },
            {
              scale: 1.2,
              backgroundColor: 'var(--accent)',
              borderColor: 'var(--accent)',
              scrollTrigger: {
                trigger: step,
                start: 'top 50%',
                end: 'top 49%',
                toggleActions: 'play reverse play reverse'
              }
            }
          );
        }

        if (content) {
          gsap.fromTo(content,
            { opacity: 1, x: 20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: step,
                start: 'top 55%',
                end: 'top 45%',
                toggleActions: 'play reverse play reverse'
              }
            }
          );
        }
      });
    }
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      className="section section-darker"
    >
      <div className="container grid-2" style={{ alignItems: 'flex-start' }}>
        <div style={{ position: 'sticky', top: '150px' }}>
          <span className="section-tag">How We Build</span>
          <h2 className="section-title">
            Why Choose <span>G5 Homes</span>
          </h2>
          <p className="section-description" style={{ marginBottom: 0 }}>
            Our integrated methodology guides your project from initial consultation to final handover, guaranteeing quality, precision, and complete alignment at every step.
          </p>
        </div>

        <div
          ref={stepsRef}
          style={{
            position: 'relative',
            paddingLeft: '45px',
            display: 'flex',
            flexDirection: 'column',
            gap: '80px',
            minHeight: '600px'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '5px',
              left: '10px',
              width: '2px',
              height: 'calc(100% - 10px)',
              backgroundColor: 'rgba(255,255,255,0.06)'
            }}
          />

          <div
            ref={pathLineRef}
            style={{
              position: 'absolute',
              top: '5px',
              left: '10px',
              width: '2px',
              backgroundColor: 'var(--accent)',
              boxShadow: '0 0 10px var(--accent)',
              zIndex: 1
            }}
          />

          {steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                className="timeline-bullet"
                style={{
                  position: 'absolute',
                  left: '-45px',
                  top: '4px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: '#050505',
                  zIndex: 2,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />

              <div
                className="timeline-content"
                style={{
                  transition: 'opacity 0.6s ease, transform 0.6s ease',
                  maxWidth: '620px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.8rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    display: 'block',
                    marginBottom: '10px',
                    fontWeight: 600,
                    opacity: 0.95
                  }}
                >
                  {step.subtitle}
                </span>

                <h3
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    color: '#fff',
                    marginBottom: '14px',
                    lineHeight: 1.25,
                    letterSpacing: '-0.02em',
                    fontFamily: 'var(--font-display)',
                    textShadow: '0 2px 12px rgba(0,0,0,0.35)'
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: '1.9',
                    color: 'rgba(255,255,255,0.82)',
                    fontWeight: 400,
                    letterSpacing: '0.01em',
                    maxWidth: '560px'
                  }}
                >
                  {step.desc}
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}