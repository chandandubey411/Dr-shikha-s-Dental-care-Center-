import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ReactCountUp from 'react-countup';
const CountUp = ReactCountUp.default || ReactCountUp;
import { CheckCircle, ArrowRight, ChevronDown } from 'lucide-react';
import { CLINIC } from '../../utils/constants';
import { fadeUp, fadeLeft, fadeRight, viewportConfig } from '../../utils/animations';

/* ── About Preview Section ────────────────────────────── */
const AboutPreview = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [showAllStats, setShowAllStats] = useState(false);

  const stats = [
    { value: 98, suffix: '%', label: 'Satisfaction Rate', decimals: 0 },
    { value: 2, suffix: 'K+', label: 'Smiles Transformed', decimals: 0 },
    { value: 4.9, suffix: '★', label: 'Customer Rating', decimals: 1 },
    { value: 10, suffix: '+', label: 'Years Experience', decimals: 0 },
  ];

  const highlights = [
    'State-of-the-art digital X-ray technology',
    'Sterilized instruments & infection control',
    'Gentle, patient-first approach',
    'Flexible appointment timing',
    'Experienced & qualified dental team',
    'Comprehensive oral health care',
  ];

  return (
    <section className="section-pad bg-white dark:bg-dentora-dark overflow-hidden" id="about">
      <div className="container-custom">
        {/* Top: About text + image */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <span className="section-tag">About Us</span>
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-slate-900 dark:text-white mt-3 mb-5 leading-tight">
              We deliver{' '}
              <span className="gradient-text">personalized dental</span>{' '}
              treatments with modern technology
            </h2>
            <p className="font-inter text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              Dr. Shikha's Dental Care Center is a premier dental clinic in Indirapuram, Ghaziabad. Led by Dr. Shikha Arora, we combine advanced technology with a gentle, patient-first approach to deliver exceptional dental care.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm font-inter text-slate-600 dark:text-slate-300">
                  <CheckCircle size={16} className="text-dentora-primary flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/about" className="btn-primary">
              Learn Our Story
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Right — Image mosaic */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="relative"
          >
            {/* Main image */}
            <div className="img-zoom rounded-4xl overflow-hidden shadow-float">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80"
                alt="Dr. Shikha's Dental Clinic interior"
                className="w-full h-72 object-cover"
                loading="lazy"
              />
            </div>
            {/* Secondary images row */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="img-zoom rounded-3xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300&q=80"
                  alt="Dental treatment"
                  className="w-full h-36 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="img-zoom rounded-3xl overflow-hidden shadow-card">
                <img
                  src="/images/dr-shikha.jpg"
                  alt="Dr. Shikha Arora"
                  className="w-full h-36 object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Floating stats card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 left-0 sm:-left-6 card-glass p-4 sm:p-5 rounded-3xl shadow-float z-10"
            >
              <div className="text-2xl font-poppins font-bold text-dentora-primary">98%</div>
              <div className="text-xs font-inter text-slate-500 dark:text-slate-400">Patient Satisfaction</div>
              <div className="mt-2 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-1 rounded-full bg-dentora-primary opacity-80" />
                ))}
              </div>
            </motion.div>

            {/* Rating badge */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -top-5 right-0 sm:-right-5 card-glass p-3 sm:p-4 rounded-3xl shadow-float z-10"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                  <span className="text-white text-sm">★</span>
                </div>
                <div>
                  <div className="font-poppins font-bold text-slate-900 dark:text-white text-sm">4.9 Rating</div>
                  <div className="text-xs text-slate-500">on Practo</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats row */}
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            className="text-center mb-8"
          >
            <p className="text-sm font-inter text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Thousands Trust Us for Smiles
            </p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map(({ value, suffix, label, decimals }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ delay: i * 0.1 }}
                className={`card-glass p-5 sm:p-6 rounded-3xl text-center stat-card hover:shadow-card-hover ${!showAllStats && i >= 2 ? 'hidden lg:block' : 'block'}`}
              >
                <div className="font-poppins font-bold text-3xl sm:text-4xl gradient-text mb-1">
                  {inView && (
                    <CountUp
                      start={0}
                      end={value}
                      decimals={decimals}
                      duration={2.5}
                      delay={i * 0.2}
                    />
                  )}
                  {suffix}
                </div>
                <div className="text-[10px] sm:text-sm font-inter text-slate-600 dark:text-slate-400">{label}</div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Show More Button */}
          <div className="mt-8 text-center lg:hidden">
            <button
              onClick={() => setShowAllStats(!showAllStats)}
              className="text-dentora-primary font-poppins font-bold text-sm flex items-center gap-2 mx-auto hover:underline"
            >
              {showAllStats ? (
                <>Show Less <ChevronDown className="rotate-180" size={16} /></>
              ) : (
                <>Show More Stats <ChevronDown size={16} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
