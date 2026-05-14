import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// Section imports
import HeroSection from '../components/sections/HeroSection';
import AboutPreview from '../components/sections/AboutPreview';
import ServicesSection from '../components/sections/ServicesSection';
import DoctorsSection from '../components/sliders/DoctorsSection';
import TestimonialsSection from '../components/testimonials/TestimonialsSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import FAQSection from '../components/sections/FAQSection';
import AppointmentCTA from '../components/sections/AppointmentCTA';

/* ── Marquee / Partners Banner ──────────────────────────*/
const PartnerMarquee = () => {
  const steps = [
    { icon: '🦷', label: 'Smile Assessment' },
    { icon: '📋', label: 'Care Planning' },
    { icon: '⚙️', label: 'Treatment Process' },
    { icon: '✅', label: 'Dental Maintenance' },
    { icon: '🏆', label: 'Expert Care' },
    { icon: '❤️', label: 'Patient Comfort' },
    { icon: '✨', label: 'Perfect Results' },
  ];
  const doubled = [...steps, ...steps];

  return (
    <div className="py-6 bg-dentora-soft dark:bg-slate-800/50 border-y border-slate-200/60 dark:border-white/5 overflow-hidden">
      <div className="marquee-track gap-10 px-4">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 flex-shrink-0 px-4"
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="font-poppins font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap text-sm">
              {item.label}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-dentora-primary/30 ml-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Before After Gallery ───────────────────────────── */
const BeforeAfterGallery = () => {
  const transformations = [
    {
      before: '/images/transformations/whitening-before.png',
      after: '/images/transformations/whitening-after.png',
      treatment: 'Teeth Whitening',
    },
    {
      before: '/images/transformations/veneers-before.png',
      after: '/images/transformations/veneers-after.png',
      treatment: 'Ceramic Veneers',
    },
    {
      before: '/images/transformations/implants-before.png',
      after: '/images/transformations/implants-after.png',
      treatment: 'Dental Implants',
    },
  ];

  return (
    <section className="section-pad bg-white dark:bg-dentora-dark">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-tag">Transformations</span>
          <h2 className="font-poppins font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white mt-3 mb-4">
            Smile <span className="gradient-text">Transformations</span>
          </h2>
          <p className="font-inter text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            See the remarkable results our patients achieve with expert dental care.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {transformations.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="card-glass rounded-4xl overflow-hidden"
            >
              <div className="grid grid-cols-2">
                <div className="relative">
                  <div className="img-zoom">
                    <img src={t.before} alt="Before treatment" className="w-full h-48 object-cover" loading="lazy" />
                  </div>
                  <span className="absolute top-3 left-3 text-xs font-bold bg-red-500/80 text-white px-2.5 py-1 rounded-full">Before</span>
                </div>
                <div className="relative">
                  <div className="img-zoom">
                    <img src={t.after} alt="After treatment" className="w-full h-48 object-cover" loading="lazy" />
                  </div>
                  <span className="absolute top-3 right-3 text-xs font-bold bg-green-500/80 text-white px-2.5 py-1 rounded-full">After</span>
                </div>
              </div>
              <div className="p-4 text-center">
                <span className="font-poppins font-semibold text-sm text-slate-900 dark:text-white">{t.treatment}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Newsletter Section ─────────────────────────────── */
const NewsletterSection = () => {
  return (
    <section className="py-16 gradient-soft dark:bg-slate-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-glass rounded-4xl p-10 text-center max-w-2xl mx-auto"
        >
          <span className="text-4xl mb-4 block">📧</span>
          <h3 className="font-poppins font-bold text-2xl text-slate-900 dark:text-white mb-3">
            Stay Updated with Dental Tips
          </h3>
          <p className="font-inter text-slate-600 dark:text-slate-400 mb-6 text-sm">
            Join our newsletter to receive the latest oral health tips, special offers and clinic updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="form-input flex-1"
            />
            <button className="btn-primary whitespace-nowrap px-8">Subscribe</button>
          </div>
          <p className="mt-4 text-xs font-inter text-slate-500 dark:text-slate-500">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/* ── HOME PAGE ──────────────────────────────────────── */
const Home = () => {
  return (
    <>
      <Helmet>
        <title>Dr. Shikha's Dental Care Center | Best Dentist in Indirapuram, Ghaziabad</title>
        <meta name="description" content="Premium dental clinic in Indirapuram, Ghaziabad. Dr. Shikha Arora provides teeth whitening, implants, root canal, veneers, braces & more. Book appointment at +91-9289570579." />
      </Helmet>

      <HeroSection />
      <PartnerMarquee />
      <AboutPreview />
      <ServicesSection />
      <BeforeAfterGallery />
      <WhyChooseUs />
      <DoctorsSection />
      <TestimonialsSection />
      <FAQSection />
      <AppointmentCTA />
      <NewsletterSection />
    </>
  );
};

export default Home;
