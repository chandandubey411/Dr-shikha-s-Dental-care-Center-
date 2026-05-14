import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { featuredServices } from '../../data/services';
import { staggerContainer, staggerItem, viewportConfig } from '../../utils/animations';

/* ── Services Section ─────────────────────────────────── */
const ServicesSection = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll ? featuredServices : featuredServices.slice(0, 3);

  return (
    <section className="section-pad gradient-soft dark:bg-slate-900 overflow-hidden" id="services">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-14"
        >
          <motion.span variants={staggerItem} className="section-tag">Feature Treatment</motion.span>
          <motion.h2
            variants={staggerItem}
            className="font-poppins font-bold text-3xl md:text-4xl text-slate-900 dark:text-white mt-3 mb-4 leading-tight"
          >
            Advanced Dental Care
            <span className="block gradient-text">for a Healthier Smile</span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="font-inter text-slate-600 dark:text-slate-400 max-w-xl mx-auto"
          >
            Join hundreds of patients achieving healthier, brighter smiles through expert dental care and personalized treatments.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {(showAll ? featuredServices : visibleServices).map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={!showAll && i >= 3 ? 'hidden lg:block' : 'block'}
            >
              <ServiceCard service={service} />
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
              <>Show More Services <ChevronDown size={16} /></>
            )}
          </button>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          className="text-center mt-12"
        >
          <Link to="/services" className="btn-primary">
            View All Services
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

/* ── Service Card ─────────────────────────────────────── */
const ServiceCard = ({ service }) => {
  return (
    <Link to={`/services`} className="block h-full">
      <motion.div
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className="card-glass h-full rounded-4xl p-5 sm:p-6 cursor-pointer group relative overflow-hidden"
      >
        {/* Top gradient line */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} rounded-t-4xl`} />

        {/* Image */}
        <div className="img-zoom rounded-3xl overflow-hidden mb-5 h-40 sm:h-48">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Icon + Tag */}
        <div className="flex items-center justify-between mb-3">
          <div className={`${service.bgColor} w-10 h-10 rounded-2xl flex items-center justify-center text-xl`}>
            {service.icon}
          </div>
          <span className={`text-xs font-inter font-semibold px-3 py-1 rounded-full ${service.bgColor} text-slate-700 dark:text-white`}>
            {service.duration}
          </span>
        </div>

        {/* Title & description */}
        <h3 className="font-poppins font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-dentora-primary transition-colors">
          {service.title}
        </h3>
        <p className="font-inter text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
          {service.description}
        </p>

        {/* Benefits */}
        <div className="space-y-1.5">
          {service.benefits.slice(0, 2).map((b) => (
            <div key={b} className="flex items-center gap-2 text-xs font-inter text-slate-500 dark:text-slate-400">
              <div className="w-1.5 h-1.5 rounded-full bg-dentora-primary flex-shrink-0" />
              {b}
            </div>
          ))}
        </div>

        {/* Arrow */}
        <div className="mt-4 flex items-center gap-1 text-dentora-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
          Learn More <ArrowRight size={14} />
        </div>
      </motion.div>
    </Link>
  );
};

export default ServicesSection;
