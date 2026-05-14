import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/* ── Luxury Loader Component ──────────────────────────── */
const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 3;
      });
    }, 25);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0f172a] flex items-center justify-center flex-col">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-600/20 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Tooth Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(8,145,178,0.4)]"
              style={{ background: 'linear-gradient(135deg, #0891b2, #14b8a6)' }}>
              <span className="text-4xl">🦷</span>
            </div>
          </div>
        </motion.div>

        {/* Brand */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-poppins font-bold text-white text-2xl mb-1"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Dr. Shikha's
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-10"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Dental Care Center
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative h-1.5 rounded-full overflow-hidden"
          style={{ width: '14rem', background: 'rgba(255,255,255,0.1)' }}
        >
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #0891b2, #14b8a6)',
              boxShadow: '0 0 12px rgba(8,145,178,0.6)',
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-3 text-cyan-500 text-sm font-semibold"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {progress}%
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-2 text-slate-500 text-xs tracking-wider"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Your Smile, Our Science
        </motion.p>
      </div>
    </div>
  );
};

export default Loader;
