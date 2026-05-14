# Dentora (Dr. Shikha) Scroll + Responsive Performance Fixes

- [x] Update Lenis smooth scroll hook to support `prefers-reduced-motion` and pause on reduced motion.
- [x] Remove/avoid conflicting `html { scroll-behavior: smooth; }` when Lenis is active (handled via CSS/JS).
- [x] Update GSAP ScrollTrigger hook to use ScrollTrigger.batch and reduce trigger overhead; disable on reduced motion.
- [x] Throttle scroll state updates in Navbar and FloatingButtons to reduce re-renders during scroll.
- [x] Add CSS reduced-motion overrides (disable infinite animations, reduce blur/backdrop-filter on mobile).
- [x] Run build/dev checks for runtime errors and basic layout responsiveness.

