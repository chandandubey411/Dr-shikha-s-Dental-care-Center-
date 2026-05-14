import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 – Page Not Found | Dr. Shikha's Dental Care Center</title>
      </Helmet>

      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 gradient-soft dark:bg-dentora-dark" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob absolute top-1/4 left-1/4 w-80 h-80 bg-dentora-primary/15" />
          <div className="blob absolute bottom-1/4 right-1/4 w-64 h-64 bg-dentora-teal/10" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative z-10 text-center px-4">
          {/* Animated tooth */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="text-8xl mb-6 block"
          >
            🦷
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-poppins font-bold text-8xl md:text-9xl gradient-text mb-2"
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-poppins font-bold text-2xl md:text-3xl text-slate-900 dark:text-white mb-4"
          >
            Page Not Found
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-inter text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8"
          >
            Oops! The page you're looking for has gone missing — just like a lost tooth. Let's get you back to the right place!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link to="/" className="btn-primary">
              <Home size={16} /> Back to Home
            </Link>
            <Link to="/appointment" className="btn-outline">
              <ArrowLeft size={16} /> Book Appointment
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
