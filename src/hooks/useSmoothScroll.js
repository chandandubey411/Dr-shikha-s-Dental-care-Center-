import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/**
 * Hook: useSmoothScroll
 * Initializes Lenis smooth scrolling library
 */
const useSmoothScroll = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.12, // slightly lower = less work/jank
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      smoothTouch: false,
      touchMultiplier: 1.2,
    });


    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);


  return lenisRef;
};

export default useSmoothScroll;
