import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loader({ progress, isLoaded, onFadeComplete }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const barRef = useRef(null);
  const logoRef = useRef(null);
  const fadeCompleteRef = useRef(false);

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(logoRef.current, 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.2 }
      );
    }
    if (textRef.current) {
      gsap.fromTo(textRef.current, 
        { opacity: 0 },
        { opacity: 0.6, duration: 1, ease: 'power2.out', delay: 0.5 }
      );
    }
  }, []);

  useEffect(() => {
    // Only trigger fade out once when fully loaded and not already fading
    if (isLoaded && progress >= 100 && !fadeCompleteRef.current) {
      fadeCompleteRef.current = true;

      const tl = gsap.timeline({
        onComplete: () => {
          if (onFadeComplete) onFadeComplete();
        }
      });

      const elements = [logoRef.current, textRef.current, barRef.current].filter(el => el !== null);
      if (elements.length > 0) {
        tl.to(elements, {
          opacity: 0,
          y: -20,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.inOut'
        });
      }

      if (containerRef.current) {
        tl.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut'
        }, '-=0.4');
      }
    }
  }, [isLoaded, progress, onFadeComplete]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#050505',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontFamily: 'var(--font-display)'
      }}
    >
      <div style={{ width: '80%', maxWidth: '400px', textAlign: 'center' }}>
        <h2 
          ref={logoRef}
          style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            color: '#ffffff'
          }}
        >
          G5 HOMES
        </h2>

        <p 
          ref={textRef}
          style={{
            fontSize: '0.8rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            marginBottom: '1.5rem',
            fontWeight: 400
          }}
        >
          Preparing Architectural Experience
        </p>

        <div 
          ref={barRef}
          style={{
            width: '100%',
            position: 'relative'
          }}
        >
          <div 
            style={{
              width: '100%',
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '0.75rem'
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${Math.min(progress, 100)}%`,
                backgroundColor: 'var(--accent)',
                transition: 'width 0.15s ease-out',
                boxShadow: '0 0 8px var(--accent)'
              }}
            />
          </div>

          <div 
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              color: 'var(--accent)',
              fontFamily: 'var(--font-sans)',
              fontWeight: 500
            }}
          >
            LOADING {Math.round(Math.min(progress, 100))}%
          </div>
        </div>
      </div>
    </div>
  );
}