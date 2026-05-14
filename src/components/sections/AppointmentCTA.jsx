import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Calendar, ArrowRight } from 'lucide-react';
import { CLINIC } from '../../utils/constants';
import { viewportConfig } from '../../utils/animations';

/* ── Appointment CTA Section ──────────────────────────── */
const AppointmentCTA = () => {
  return (
    <section className="section-pad overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob absolute top-1/4 left-1/4 w-80 h-80 bg-dentora-primary/30" />
        <div className="blob absolute bottom-1/4 right-1/4 w-64 h-64 bg-dentora-teal/20" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
          >
            <span className="section-tag border-white/20 text-white bg-white/10">
              Book Now
            </span>
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl md:text-4xl text-white mt-3 mb-4 leading-tight">
              Advanced Dental Care
              <span className="block text-dentora-secondary">Ensures Your Smile.</span>
            </h2>
            <p className="font-inter text-slate-300 leading-relaxed mb-8">
              Don't wait for dental pain to act. Schedule a consultation with Dr. Shikha Arora today and take the first step toward a healthier, brighter smile.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/appointment" className="btn-primary shadow-[0_8px_30px_rgba(8,145,178,0.5)]">
                <Calendar size={16} />
                Book Appointment
              </Link>
              <a
                href={`tel:${CLINIC.phone}`}
                className="flex items-center gap-2 px-6 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all"
              >
                <Phone size={16} />
                {CLINIC.phone}
              </a>
            </div>
          </motion.div>

          {/* Right — Floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            className="relative h-72 lg:h-auto"
          >
            {/* Main image card */}
            <div className="img-zoom rounded-4xl overflow-hidden shadow-float">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80"
                alt="Dental clinic"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
            </div>

            {/* Floating stats */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-5 left-0 sm:-left-5 glass-dark p-4 sm:p-5 rounded-3xl shadow-float z-10"
            >
              <div className="text-slate-300 text-xs mb-2 font-inter">Recommended</div>
              <div className="text-white font-poppins font-bold text-2xl mb-0.5">2 Visits</div>
              <div className="text-slate-400 text-xs font-inter">Checkups per Year</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="absolute -top-4 right-0 sm:-right-4 glass-dark p-3 sm:p-4 rounded-3xl shadow-float z-10"
            >
              <div className="text-slate-400 text-xs font-inter mb-1">Average</div>
              <div className="text-white font-poppins font-bold text-2xl">40 Min</div>
              <div className="text-slate-400 text-xs font-inter">Treatment Time</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentCTA;
