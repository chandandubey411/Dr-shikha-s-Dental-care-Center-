import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { services } from '../data/services';
import { viewportConfig } from '../utils/animations';

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Dental Services | Dr. Shikha's Dental Care Center</title>
        <meta name="description" content="Complete dental services at Dr. Shikha's Dental Care Center — teeth whitening, implants, root canal, veneers, braces, gum treatment & more in Indirapuram, Ghaziabad." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-tag border-white/20 text-white bg-white/10">What We Offer</span>
            <h1 className="font-poppins font-bold text-4xl md:text-5xl text-white mt-4 mb-5">
              Our <span className="gradient-text">Dental Services</span>
            </h1>
            <p className="font-inter text-slate-300 max-w-2xl mx-auto">
              From routine checkups to complex restorations — we offer comprehensive dental care for every patient at every life stage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-pad bg-white dark:bg-dentora-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ delay: (i % 3) * 0.1 }}
                whileHover={{ y: -8 }}
                className="card-glass rounded-4xl overflow-hidden group"
              >
                {/* Image */}
                <div className="img-zoom h-48 relative">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color}`} />
                  {service.popular && (
                    <span className="absolute top-3 right-3 bg-dentora-primary text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-glass">Popular</span>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`${service.bgColor} w-10 h-10 rounded-2xl flex items-center justify-center text-xl`}>{service.icon}</div>
                    <div className="flex items-center gap-1 text-xs font-inter text-slate-500 dark:text-slate-400">
                      <Clock size={12} />
                      {service.duration}
                    </div>
                  </div>
                  <h3 className="font-poppins font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-dentora-primary transition-colors">{service.title}</h3>
                  <p className="font-inter text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">{service.description}</p>

                  <div className="space-y-1.5 mb-5">
                    {service.benefits.slice(0, 3).map((b) => (
                      <div key={b} className="flex items-center gap-2 text-xs font-inter text-slate-500 dark:text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-dentora-primary" />
                        {b}
                      </div>
                    ))}
                  </div>

                  <Link to="/appointment" className="btn-primary w-full justify-center text-sm py-2.5">
                    Book This Service <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-16 gradient-soft dark:bg-slate-900">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportConfig} className="card-glass rounded-4xl p-10 max-w-2xl mx-auto">
            <span className="text-4xl mb-4 block">🚨</span>
            <h3 className="font-poppins font-bold text-2xl text-slate-900 dark:text-white mb-3">Dental Emergency?</h3>
            <p className="font-inter text-slate-600 dark:text-slate-400 mb-6">We offer same-day emergency appointments. Don't suffer in pain — call us now!</p>
            <a href="tel:+919289570579" className="btn-primary mx-auto">Call Now: +91-9289570579</a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
