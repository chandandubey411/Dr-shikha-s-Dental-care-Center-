import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { viewportConfig } from '../../utils/animations';

/* ── Why Choose Us Section ────────────────────────────── */
const WhyChooseUs = () => {
  const [showAll, setShowAll] = useState(false);
  const features = [
    {
      icon: '🏥',
      title: 'Modern Clinic',
      desc: 'Equipped with the latest dental technology including digital X-rays, CAD/CAM, and LED whitening systems.',
      color: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: '💊',
      title: 'Pain-Free Treatment',
      desc: 'Advanced anesthesia techniques and sedation options ensure a comfortable, pain-free experience for all patients.',
      color: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      icon: '🛡️',
      title: 'Sterilized & Safe',
      desc: 'Strict infection control protocols, autoclave sterilization, and single-use disposables for your safety.',
      color: 'bg-teal-50 dark:bg-teal-900/20',
    },
    {
      icon: '⏰',
      title: 'Flexible Timings',
      desc: 'Open Mon–Sat with morning and evening slots (10 AM–2 PM & 4–8 PM) to fit your busy schedule.',
      color: 'bg-cyan-50 dark:bg-cyan-900/20',
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Family Dental Care',
      desc: 'Comprehensive dental care for all ages — from toddlers to seniors — under one trusted roof.',
      color: 'bg-violet-50 dark:bg-violet-900/20',
    },
    {
      icon: '💰',
      title: 'Transparent Pricing',
      desc: 'No hidden costs, clear treatment plans, insurance support, and flexible EMI payment options.',
      color: 'bg-amber-50 dark:bg-amber-900/20',
    },
    {
      icon: '📍',
      title: 'Convenient Location',
      desc: 'Located at Niti Khand 2, Indirapuram — easily accessible from all parts of Ghaziabad and East Delhi.',
      color: 'bg-rose-50 dark:bg-rose-900/20',
    },
    {
      icon: '⭐',
      title: '4.9★ Rated on Practo',
      desc: 'Consistently top-rated with 26+ verified patient success stories on Practo and Google Reviews.',
      color: 'bg-sky-50 dark:bg-sky-900/20',
    },
  ];

  return (
    <section className="section-pad bg-white dark:bg-dentora-dark" id="why-us">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          className="text-center mb-14"
        >
          <span className="section-tag">Why Dentora</span>
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-slate-900 dark:text-white mt-3 mb-4">
            Why Choose{' '}
            <span className="gradient-text">Dr. Shikha's?</span>
          </h2>
          <p className="font-inter text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            We combine clinical expertise, modern technology, and genuine patient care to deliver dental experiences that exceed expectations.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`card-glass rounded-4xl p-5 sm:p-6 group cursor-default ${!showAll && i >= 4 ? 'hidden lg:block' : 'block'}`}
            >
              <div className={`${feature.color} w-12 h-12 sm:w-14 sm:h-14 rounded-3xl flex items-center justify-center text-2xl sm:text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white mb-2 group-hover:text-dentora-primary transition-colors">
                {feature.title}
              </h3>
              <p className="font-inter text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile Show More Button */}
        <div className="mt-8 text-center lg:hidden">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-dentora-primary font-poppins font-bold text-sm flex items-center gap-2 mx-auto hover:underline"
          >
            {showAll ? (
              <>Show Less <ChevronDown className="rotate-180" size={16} /></>
            ) : (
              <>Show More Benefits <ChevronDown size={16} /></>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
