import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;


gsap.registerPlugin(ScrollTrigger);

/**
 * Hook: useScrollAnimation
 * Creates GSAP scroll-triggered animations on elements with data-gsap attribute
 */
const useScrollAnimation = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {

      // Use batching to reduce ScrollTrigger overhead.
      const reduceTriggers = (selector, fromVars, toVars, triggerStart = 'top 85%') => {
        const elements = gsap.utils.toArray(selector);
        if (!elements.length) return;

        ScrollTrigger.batch(elements, {
          start: triggerStart,
          onEnter: (batch) => {
            gsap.fromTo(batch, fromVars, {
              ...toVars,
              overwrite: 'auto',
              scrollTrigger: false,
            });
          },
        });
      };

      // Fade-up (batch)
      reduceTriggers(
        '[data-gsap="fade-up"]',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        'top 85%'
      );

      // Stagger groups (batch per container)
      gsap.utils.toArray('[data-gsap="stagger"]').forEach((container) => {
        const children = container.children;
        if (!children || !children.length) return;

        gsap.fromTo(children, { y: 40, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      });

      // Horizontal slides (batch)
      reduceTriggers(
        '[data-gsap="slide-left"]',
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        'top 85%'
      );

      reduceTriggers(
        '[data-gsap="slide-right"]',
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        'top 85%'
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
};

export default useScrollAnimation;
