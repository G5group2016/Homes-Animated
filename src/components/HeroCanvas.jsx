import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroCanvas({ 
  activeProject, 
  projects, 
  onProgress, 
  onLoaded 
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  const [images, setImages] = useState([]);
  const [isProjectTransitioning, setIsProjectTransitioning] = useState(false);
  
  const totalFrames = projects?.[activeProject]?.frameCount ?? 240;

  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const requestRef = useRef(null);
  const imagesCacheRef = useRef({});

  // Get project theme filters
  const getFilterStyle = (index) => {
    switch (index) {
      case 0:
        return 'saturate(1.2) contrast(1.05) sepia(10%)';
      case 1:
        return 'hue-rotate(150deg) saturate(0.65) brightness(0.9) contrast(1.1)';
      case 2:
        return 'sepia(35%) saturate(0.8) brightness(0.85) contrast(1.15)';
      default:
        return 'none';
    }
  };

  // Preload frames for the project - FIXED: Image path construction
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages = [];
    setIsProjectTransitioning(true);
    onProgress(0);

    // Fade out canvas slightly on project switch
    if (canvasRef.current) {
      gsap.to(canvasRef.current, {
        opacity: 0.2,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: loadAssets
      });
    } else {
      loadAssets();
    }

    function loadAssets() {
      const sequencePath = projects?.[activeProject]?.sequencePath ?? 'sequence/homes/';
      const normalized = sequencePath.replace(/^\/+/, '').replace(/\/+$/, '');

      // Files are named frame_000_delay-0.041s.png ... frame_239_delay-0.041s.png (0-indexed)
      for (let i = 0; i < totalFrames; i++) {
        const frameStr = String(i).padStart(3, '0');
        const src = `/${normalized}/frame_${frameStr}_delay-0.041s.png`;

        // Check cache first
        if (imagesCacheRef.current[src]) {
          loadedImages[i] = imagesCacheRef.current[src];
          loadedCount++;
          const percent = (loadedCount / totalFrames) * 100;
          onProgress(percent);
          if (loadedCount === totalFrames) finishLoading(loadedImages);
        } else {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            imagesCacheRef.current[src] = img;
            loadedImages[i] = img;
            loadedCount++;
            const percent = (loadedCount / totalFrames) * 100;
            onProgress(percent);
            if (loadedCount === totalFrames) finishLoading(loadedImages);
          };
          img.onerror = () => {
            console.warn(`Frame not found: ${src}`);
            loadedCount++;
            if (loadedCount === totalFrames) finishLoading(loadedImages);
          };
        }
      }
    }

    function finishLoading(imgs) {
      setImages(imgs);
      setIsProjectTransitioning(false);
      onLoaded();
      
      // Fade canvas back in with new filter theme
      if (canvasRef.current) {
        gsap.to(canvasRef.current, {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.inOut'
        });
      }
    }

  }, [activeProject, totalFrames, projects, onProgress, onLoaded]);

  // Handle Resize and Drawing
  const drawImageToCanvas = (img) => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;
    if (!imgWidth || !imgHeight) return;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth, drawHeight, drawX, drawY;

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      drawX = (canvas.width - drawWidth) / 2;
      drawY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      drawX = 0;
      drawY = (canvas.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  };

  // Setup GSAP ScrollTrigger to track frame target and pin
  useEffect(() => {
    if (images.length === 0) return;

    const trigger = ScrollTrigger.create({
      trigger: '.hero-scroll-container',
      start: 'top top',
      end: '+=150%',
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        targetFrameRef.current = self.progress * (totalFrames - 1);
      }
    });

    return () => {
      trigger.kill();
    };
  }, [images, totalFrames]);

  // Smooth Interpolation RAF Loop
  useEffect(() => {
    const updateLoop = () => {
      if (images.length > 0) {
        const lerpFactor = 0.08;
        const diff = targetFrameRef.current - currentFrameRef.current;
        
        if (Math.abs(diff) < 0.01) {
          currentFrameRef.current = targetFrameRef.current;
        } else {
          currentFrameRef.current += diff * lerpFactor;
        }

        const frameIndex = Math.round(currentFrameRef.current);
        const imageToDraw = images[frameIndex];
        if (imageToDraw) {
          drawImageToCanvas(imageToDraw);
        }
      }
      requestRef.current = requestAnimationFrame(updateLoop);
    };

    requestRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [images]);

  // Handle Window Resize
  useEffect(() => {
    const handleResize = () => {
      const frameIndex = Math.round(currentFrameRef.current);
      if (images[frameIndex]) {
        drawImageToCanvas(images[frameIndex]);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images]);

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden'
      }}
    >
      <canvas 
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100vh',
          objectFit: 'cover',
          filter: getFilterStyle(activeProject),
          transition: 'filter 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      />
    </div>
  );
}