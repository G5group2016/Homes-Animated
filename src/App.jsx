import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Component Imports
import Loader from './components/Loader';
import HeroCanvas from './components/HeroCanvas';
import HeroOverlay from './components/HeroOverlay';
import About from './components/About';
import Expertise from './components/Expertise';
import Materials from './components/Materials';
import Showcase from './components/Showcase';
import Timeline from './components/Timeline';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeProject, setActiveProject] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Project configuration variants
  const projects = [
    {
      name: "Contemporary Villa",
      subtitle: "Luxury Residence",
      description: "Creating exceptional homes through innovative architecture, precision engineering, premium materials, and uncompromising craftsmanship. Every residence is designed to reflect your lifestyle.",
      themeColor: "#d4af37",
      sequencePath: "sequence/homes/",
      frameCount: 240
    },
    {
      name: "Modern Courtyard House",
      subtitle: "Architectural Residence",
      description: "An elegant home centered around light, landscape, and seamless indoor-outdoor living. Built to stand the test of time with precision and pride.",
      themeColor: "#a89f91",
      sequencePath: "sequence/homes/",
      frameCount: 240
    },
    {
      name: "Minimalist Luxury Home",
      subtitle: "Premium Custom Home",
      description: "A refined residence combining modern minimalism with warm natural textures. Every detail thoughtfully crafted to create a home that truly endures.",
      themeColor: "#c3b091",
      sequencePath: "sequence/homes/",
      frameCount: 240
    }
  ];

  // Lock body scroll while loading
  useEffect(() => {
    if (!loadingFinished) {
      document.body.style.overflow = 'hidden';
    } else {
      // Snap to top and refresh ScrollTrigger positions
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      document.body.style.overflow = '';
      // Small delay so the DOM has fully painted before refreshing
      const t = setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 50);
      return () => clearTimeout(t);
    }
  }, [loadingFinished]);

  // Initialize Lenis Smooth Scroll & Sync GSAP ScrollTrigger (only after loading)
  useEffect(() => {
    if (!loadingFinished) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    lenis.on('scroll', ScrollTrigger.update);

    const rafHandler = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafHandler);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafHandler);
    };
  }, [loadingFinished]);

  const nextProject = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <>
      {/* Full Screen loading experience */}
      {!loadingFinished && (
        <Loader 
          progress={loadProgress} 
          isLoaded={isAssetsLoaded} 
          onFadeComplete={() => setLoadingFinished(true)} 
        />
      )}

      {/* Main Single Page Layout Container */}
      <div 
        style={{ 
          width: '100%', 
          backgroundColor: 'var(--bg-primary)',
          opacity: loadingFinished ? 1 : 0,
          transition: 'opacity 1s ease'
        }}
      >
        <div 
          className="hero-scroll-container"
          style={{
            height: '100vh',
            position: 'relative',
            backgroundColor: '#050505',
            zIndex: 15
          }}
        >
          <div 
            className="hero-sticky-wrapper"
            style={{
              width: '100%',
              height: '100vh',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <HeroCanvas 
              activeProject={activeProject}
              projects={projects}
              onProgress={(p) => {
                if (!loadingFinished) setLoadProgress(p);
              }}
              onLoaded={() => {
                setIsAssetsLoaded(true);
                setIsTransitioning(false);
              }}
            />

            <HeroOverlay 
              activeProject={activeProject}
              projects={projects}
              onNext={nextProject}
              onPrev={prevProject}
              isTransitioning={isTransitioning}
            />
          </div>
        </div>

        {/* Scrollable sections after the Hero Sequence */}
        <About />
        <Expertise />
        <Materials />
        <Showcase />
        <Timeline />
        <Testimonials />
        <FAQ />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}