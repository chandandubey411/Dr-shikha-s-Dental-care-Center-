import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

import { useTheme } from '../../context/ThemeContext';
import { CLINIC, NAV_LINKS } from '../../utils/constants';

/* ── Navbar Component ─────────────────────────────────── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useTheme();

  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location]);

  // Detect scroll for glassmorphism effect (throttled to rAF)
  useEffect(() => {
    let rafId = null;

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        setScrolled(window.scrollY > 40);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);


  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-glass py-2'
            : 'bg-transparent py-4'
        } dark:${scrolled ? 'bg-slate-900/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.div whileHover={{ scale: 1.05 }}>
              <img src="/images/logo.png" alt="Dr. Shikha's Dental Care Center Logo" className="h-14 sm:h-16 w-auto drop-shadow-sm" />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-full text-sm font-medium font-inter transition-all duration-300 ${
                    isActive
                      ? 'text-dentora-primary bg-dentora-light dark:bg-dentora-primary/20'
                      : 'text-slate-700 dark:text-slate-200 hover:text-dentora-primary hover:bg-dentora-light/60 dark:hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">


            {/* CTA Button */}
            <div className="hidden md:block">

              <Link
                to="/appointment"
                className="btn-primary flex items-center text-sm py-2.5 px-5"
              >
                <Phone size={15} />
                Book Appointment
              </Link>
            </div>

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileOpen ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[72px] z-40 glass dark:bg-slate-900/95 backdrop-blur-2xl border-b border-white/10 shadow-glass-lg lg:hidden"
          >
            <div className="container-custom py-6 flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block px-5 py-3 rounded-2xl font-medium font-poppins text-sm transition-all ${
                        isActive
                          ? 'bg-dentora-primary text-white'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-dentora-light dark:hover:bg-white/10'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-2"
              >
                <Link to="/appointment" className="btn-primary w-full justify-center text-sm">
                  <Phone size={15} />
                  Book Appointment
                </Link>
              </motion.div>

              {/* Contact quick info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42 }}
                className="mt-3 pt-3 border-t border-slate-200 dark:border-white/10"
              >
                <a
                  href={`tel:${CLINIC.phone}`}
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 px-5 py-2"
                >
                  <Phone size={14} className="text-dentora-primary" />
                  {CLINIC.phone}
                </a>

              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
