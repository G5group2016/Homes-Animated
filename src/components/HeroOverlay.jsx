import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUp, ArrowDown, ChevronRight } from 'lucide-react';

export default function HeroOverlay({
  activeProject,
  projects,
  onNext,
  onPrev,
  isTransitioning
}) {
  const currentProject = projects[activeProject];
  const [localProject, setLocalProject] = useState(currentProject);

  const subtitleRef  = useRef(null);
  const titleRef     = useRef(null);
  const descRef      = useRef(null);
  const ctaRef       = useRef(null);
  const navRef       = useRef(null);
  const topBarRef    = useRef(null);
  const bottomBarRef = useRef(null);

  // Entry animation
  useEffect(() => {
    const timer = setTimeout(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if (topBarRef.current)
        tl.fromTo(topBarRef.current,    { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.9 }, 0);
      if (subtitleRef.current)
        tl.fromTo(subtitleRef.current,  { opacity: 0, y: 24  }, { opacity: 1, y: 0, duration: 0.8 }, 0.25);
      if (titleRef.current)
        tl.fromTo(titleRef.current,     { opacity: 0, y: 36  }, { opacity: 1, y: 0, duration: 1.1, ease: 'power4.out' }, 0.35);
      if (descRef.current)
        tl.fromTo(descRef.current,      { opacity: 0, y: 20  }, { opacity: 1, y: 0, duration: 0.8 }, 0.6);
      if (ctaRef.current)
        tl.fromTo(ctaRef.current,       { opacity: 0, y: 16  }, { opacity: 1, y: 0, duration: 0.8 }, 0.75);
      if (navRef.current)
        tl.fromTo(navRef.current,       { opacity: 0, x: 20  }, { opacity: 1, x: 0, duration: 0.9 }, 0.5);
      if (bottomBarRef.current)
        tl.fromTo(bottomBarRef.current, { opacity: 0, y: 20  }, { opacity: 1, y: 0, duration: 0.8 }, 0.85);
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  // Text swap on project change
  useEffect(() => {
    if (currentProject.name === localProject.name) return;
    if (!subtitleRef.current || !titleRef.current || !descRef.current) return;

    gsap.timeline({
      onComplete: () => {
        setLocalProject(currentProject);
        gsap.timeline({ defaults: { ease: 'power3.out' } })
          .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
          .fromTo(titleRef.current,    { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' }, '-=0.4')
          .fromTo(descRef.current,     { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5');
      }
    }).to([subtitleRef.current, titleRef.current, descRef.current], {
      opacity: 0, y: -18, duration: 0.35, stagger: 0.04, ease: 'power3.in'
    });
  }, [activeProject, currentProject, localProject]);

  const accentColor = localProject.themeColor || 'var(--accent)';

  /* ─────── Shared text-shadow for legibility without overlays ─────── */
  const heavyShadow = '0 2px 20px rgba(0,0,0,0.85), 0 1px 4px rgba(0,0,0,0.95)';
  const lightShadow = '0 1px 12px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.9)';

  return (
    <>
      {/*
        ── VERY LIGHT corner/edge vignettes only ──
        Background image stays ~90 % visible.
        Only narrow edges get a gentle darkening.
      */}

      {/* Top edge — just enough for logo/nav text */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '15%',
        zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.28) 0%, transparent 100%)'
      }} />

      {/* Bottom edge — just enough for scroll hint */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '18%',
        zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(0deg, rgba(0,0,0,0.22) 0%, transparent 100%)'
      }} />

      {/* ── TOP BAR ── */}
      <div
        ref={topBarRef}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          zIndex: 10, padding: '26px 8%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          opacity: 0
        }}
      >
        {/* Wordmark */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.2rem', fontWeight: 800,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#fff', textShadow: heavyShadow
        }}>
          G5 HOMES
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: '2.5rem', pointerEvents: 'auto' }}>
          {['Projects', 'About', 'Materials', 'Contact'].map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.8rem', letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.8)',
                transition: 'color 0.3s ease',
                textShadow: lightShadow
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
            >
              {link}
            </a>
          ))}
        </nav>
      </div>

      {/* ── MAIN CONTENT + RIGHT NAV ── */}
      <div style={{
        position: 'absolute', inset: 0,
        zIndex: 5, pointerEvents: 'none',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 8%'
      }}>

        {/* ── LEFT TEXT BLOCK ── */}
        {/*
          The text block itself gets a very faint frosted backdrop
          so letters pop without killing the background.
          backdrop-filter does the heavy lifting instead of overlays.
        */}
        <div style={{
          maxWidth: '520px',
          pointerEvents: 'auto',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
          paddingTop: '5vh',
          /* Very subtle glass — lets image show through, lifts contrast behind text */
          background: 'rgba(0,0,0,0.12)',
          backdropFilter: 'blur(0px)',          /* No blur — we want background crisp */
          borderRadius: '0',
          padding: '3vh 3vw 3vh 0',
        }}>

          {/* Subtitle pill */}
          <div ref={subtitleRef} style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            marginBottom: '1.1rem', opacity: 0
          }}>
            <span style={{
              width: '26px', height: '2px',
              background: accentColor,
              boxShadow: `0 0 10px ${accentColor}cc`,
              borderRadius: '2px', display: 'inline-block'
            }} />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.75rem', fontWeight: 600,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: accentColor,
              textShadow: `${lightShadow}, 0 0 18px ${accentColor}90`
            }}>
              {localProject.subtitle}
            </span>
          </div>

          {/* Title */}
          <h1 ref={titleRef} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.6rem, 5vw, 4.5rem)',
            fontWeight: 700, lineHeight: 1.02,
            textTransform: 'uppercase', letterSpacing: '-0.025em',
            marginBottom: '1.3rem',
            color: '#ffffff', opacity: 0,
            textShadow: heavyShadow
          }}>
            {localProject.name.split(' ').map((word, i, arr) => (
              <React.Fragment key={i}>
                {word}
                {i < arr.length - 1 ? (i === 0 ? <br /> : ' ') : null}
              </React.Fragment>
            ))}
          </h1>

          {/* Description */}
          <p ref={descRef} style={{
            fontSize: '0.95rem', lineHeight: 1.7,
            color: 'rgba(255,255,255,0.85)',
            marginBottom: '2.2rem', fontWeight: 300,
            maxWidth: '440px', opacity: 0,
            textShadow: heavyShadow
          }}>
            {localProject.description}
          </p>

          {/* CTAs */}
          <div ref={ctaRef} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', opacity: 0 }}>
            {/* Ghost / outline button */}
            <a href="#projects" style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              padding: '11px 22px',
              fontFamily: 'var(--font-display)',
              fontSize: '0.82rem', fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: '#fff',
              border: '1.5px solid rgba(255,255,255,0.55)',
              borderRadius: '40px',
              backdropFilter: 'blur(8px)',
              background: 'rgba(255,255,255,0.06)',
              transition: 'all 0.3s ease', cursor: 'pointer',
              textShadow: lightShadow
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.85)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)';
              }}
            >
              Explore Projects <ChevronRight size={14} strokeWidth={2.5} />
            </a>

            {/* Accent solid button */}
            <a href="#contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              padding: '11px 22px',
              fontFamily: 'var(--font-display)',
              fontSize: '0.82rem', fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: '#050505',
              background: accentColor,
              border: `1.5px solid ${accentColor}`,
              borderRadius: '40px',
              boxShadow: `0 0 24px ${accentColor}60, 0 4px 14px rgba(0,0,0,0.5)`,
              transition: 'all 0.3s ease', cursor: 'pointer'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.filter = 'brightness(1.1)';
                e.currentTarget.style.boxShadow = `0 0 40px ${accentColor}90, 0 6px 20px rgba(0,0,0,0.5)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.filter = 'none';
                e.currentTarget.style.boxShadow = `0 0 24px ${accentColor}60, 0 4px 14px rgba(0,0,0,0.5)`;
              }}
            >
              Start Your Home
            </a>
          </div>
        </div>

        {/* ── RIGHT NAV ── */}
        <div ref={navRef} style={{
          pointerEvents: 'auto',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '10px', opacity: 0
        }}>
          {/* Big index number */}
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '4rem', fontWeight: 200, lineHeight: 1,
            color: '#fff', opacity: 0.3, letterSpacing: '0.05em',
            textShadow: heavyShadow
          }}>
            0{activeProject + 1}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            {/* Prev */}
            <button
              onClick={onPrev} disabled={isTransitioning} title="Previous"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '50%', width: '38px', height: '38px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', cursor: isTransitioning ? 'default' : 'pointer',
                opacity: isTransitioning ? 0.3 : 1, transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => { if (!isTransitioning) { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; }}}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
            >
              <ArrowUp size={15} strokeWidth={2.5} />
            </button>

            <div style={{ width: '1px', height: '44px', background: 'rgba(255,255,255,0.25)', boxShadow: '0 0 6px rgba(0,0,0,0.5)' }} />

            {isTransitioning && (
              <div style={{
                position: 'absolute',
                width: '26px', height: '26px',
                border: '2px solid rgba(255,255,255,0.1)',
                borderTop: `2px solid ${accentColor}`,
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }} />
            )}

            {/* Next */}
            <button
              onClick={onNext} disabled={isTransitioning} title="Next"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '50%', width: '38px', height: '38px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', cursor: isTransitioning ? 'default' : 'pointer',
                opacity: isTransitioning ? 0.3 : 1, transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => { if (!isTransitioning) { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; }}}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
            >
              <ArrowDown size={15} strokeWidth={2.5} />
            </button>
          </div>

          {/* Dot indicators */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '6px' }}>
            {projects.map((_, i) => (
              <div key={i} style={{
                width: '2px',
                height: i === activeProject ? '22px' : '8px',
                borderRadius: '2px',
                background: i === activeProject ? accentColor : 'rgba(255,255,255,0.3)',
                boxShadow: i === activeProject ? `0 0 8px ${accentColor}` : 'none',
                transition: 'all 0.4s ease'
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div ref={bottomBarRef} style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        zIndex: 10, padding: '0 8% 28px',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        opacity: 0, pointerEvents: 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '1px', height: '36px',
            background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.45))'
          }} />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.7rem', letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
            textShadow: lightShadow
          }}>
            Scroll to Explore
          </span>
        </div>

        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.72rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
          textShadow: lightShadow
        }}>
          {activeProject + 1} / {projects.length}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}