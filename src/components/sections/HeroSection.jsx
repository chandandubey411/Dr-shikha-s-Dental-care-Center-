import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Phone, Star, Shield, Clock, MapPin, ChevronDown } from 'lucide-react';
import { CLINIC } from '../../utils/constants';
import { fadeUp, staggerContainer, staggerItem, floatAnimation } from '../../utils/animations';
import { getWhatsAppLink } from '../../utils/helpers';

/* ── Hero Section ─────────────────────────────────────── */
const HeroSection = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const waLink = getWhatsAppLink(CLINIC.whatsapp, "Hello! I'd like to book a dental appointment.");

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col justify-center pt-32 pb-20 lg:pt-0 overflow-hidden"
      id="hero"
    >
      {/* Background Image with parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1920&q=85"
          alt="Modern dental clinic"
          className="w-full h-full object-cover"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-800/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/30" />
      </motion.div>

      {/* Animated blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="blob absolute top-1/4 right-10 w-72 h-72 bg-dentora-primary/20" />
        <div className="blob absolute bottom-1/3 right-1/4 w-56 h-56 bg-dentora-teal/15" style={{ animationDelay: '3s' }} />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 container-custom w-full"
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs md:text-sm font-inter font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
            Accepting New Patients — Indirapuram, Ghaziabad
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={staggerContainer(0.08)}
            initial="hidden"
            animate="visible"
            className="font-poppins font-bold text-white leading-tight mb-6"
          >
            <motion.span variants={staggerItem} className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Family-Friendly
            </motion.span>
            <motion.span
              variants={staggerItem}
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              style={{
                background: 'linear-gradient(135deg, #38bdf8, #2dd4bf)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Dental Care
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-slate-300 font-inter text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-8"
          >
            Advanced dental treatments with modern technology and gentle care — ensuring healthy, confident smiles for every patient at Niti Khand, Indirapuram.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="flex flex-wrap gap-3 sm:gap-4 mb-12"
          >
            <Link
              to="/appointment"
              className="btn-primary text-sm sm:text-base px-6 py-3.5 sm:px-7 sm:py-4 shadow-[0_8px_30px_rgba(8,145,178,0.5)]"
            >
              Book Appointment
              <ArrowRight size={18} />
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 rounded-full border-2 border-white/30 text-white font-semibold text-sm sm:text-base hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
            >
              <Phone size={18} className="text-green-400" />
              WhatsApp Us
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="flex flex-wrap gap-6 sm:gap-8"
          >
            {[
              { icon: Star, value: '4.9★', label: 'Patient Rating', color: 'text-amber-400' },
              { icon: Shield, value: '2000+', label: 'Smiles Transformed', color: 'text-dentora-secondary' },
              { icon: Clock, value: '10+', label: 'Years Experience', color: 'text-dentora-teal' },
            ].map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center">
                  <Icon size={16} className={color} />
                </div>
                <div>
                  <div className={`font-poppins font-bold text-base sm:text-lg leading-tight ${color}`}>{value}</div>
                  <div className="text-slate-400 text-[10px] sm:text-xs font-inter">{label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Doctor Card */}
      <motion.div
        animate={floatAnimation}
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden xl:block"
      >
        <div className="card-glass p-5 max-w-[220px] rounded-3xl shadow-float">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/images/dr-shikha.png"
              alt="Dr. Shikha Arora"
              className="w-12 h-12 rounded-2xl object-cover"
            />
            <div>
              <div className="font-poppins font-semibold text-sm text-slate-900 dark:text-white">Dr. Shikha Arora</div>
              <div className="text-xs text-dentora-primary font-inter">Lead Dentist</div>
            </div>
          </div>
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
            ))}
            <span className="text-xs text-slate-500 ml-1">4.9 (26 reviews)</span>
          </div>
          <div className="bg-dentora-soft dark:bg-dentora-primary/10 rounded-2xl p-3">
            <div className="text-xs font-inter text-slate-600 dark:text-slate-300 mb-1">Today's Appointment</div>
            <div className="text-xl font-poppins font-bold text-dentora-primary">2 Visits</div>
            <div className="mt-1 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-3/5 gradient-primary rounded-full" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating stat card */}
      <motion.div
        animate={{ ...floatAnimation, transition: { ...floatAnimation.transition, delay: 2 } }}
        initial={{ opacity: 0, x: -40, y: 40 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute left-[55%] bottom-24 z-10 hidden lg:block"
      >
        <div className="card-glass p-4 rounded-3xl shadow-float">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-dentora-primary/10 flex items-center justify-center">
              <span className="text-lg">😁</span>
            </div>
            <div>
              <div className="font-poppins font-bold text-2xl text-dentora-primary">98%</div>
              <div className="text-xs text-slate-500 font-inter">Patient Satisfaction</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Service tags */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        className="absolute bottom-8 right-8 hidden lg:flex gap-2 flex-wrap justify-end max-w-xs"
      >
        {['Dental Checkup', 'Teeth Cleaning', 'Gum Treatment', 'Root Canal', 'Retainers'].map((tag) => (
          <span
            key={tag}
            className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-inter font-medium"
          >
            {tag}
          </span>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60"
      >
        <span className="text-xs font-inter tracking-wider">Scroll for More</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
