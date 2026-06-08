import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Award, Users, Heart, Stethoscope } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import ReactCountUp from 'react-countup';
const CountUp = ReactCountUp.default || ReactCountUp;
import { viewportConfig, fadeLeft, fadeRight } from '../utils/animations';


const About = () => {
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const timeline = [
    { year: '2014', title: 'Clinic Founded', desc: 'Dr. Shikha Arora opened the practice at Niti Khand 2, Indirapuram with a vision for quality care.' },
    { year: '2016', title: 'Digital Technology', desc: 'Upgraded to digital X-ray and CAD/CAM for precise diagnostics.' },
    { year: '2018', title: 'Expanded Services', desc: 'Added orthodontics, implants, and cosmetic dentistry services.' },
    { year: '2020', title: 'COVID-Safe Protocols', desc: 'Strict sterilization and safety protocols implemented.' },
    { year: '2022', title: '1000+ Patients', desc: 'Reached a milestone of over 1,000 happy, satisfied patients.' },
    { year: '2024', title: '2000+ Smiles', desc: 'Continuing to grow with 2000+ transformed smiles and 4.9★ on Practo.' },
  ];

  const values = [
    { icon: Heart, title: 'Patient-First Care', desc: 'Every decision is made with the patient\'s comfort and health as the top priority.' },
    { icon: Award, title: 'Clinical Excellence', desc: 'Continuous learning and adoption of best practices in modern dentistry.' },
    { icon: Users, title: 'Family Approach', desc: 'We treat every patient like family, building long-term relationships on trust.' },
    { icon: Stethoscope, title: 'Preventive Focus', desc: 'Empowering patients with education — prevention is better than cure.' },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Dr. Shikha's Dental Care Center</title>
        <meta name="description" content="Learn about Dr. Shikha Arora — 10+ years of dental excellence in Indirapuram, Ghaziabad. Our story, mission, team, and certifications." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-tag border-white/20 text-white bg-white/10">Our Story</span>
            <h1 className="font-poppins font-bold text-4xl md:text-5xl text-white mt-4 mb-5">
              About <span className="gradient-text">Dr. Shikha's</span>
            </h1>
            <p className="font-inter text-slate-300 max-w-2xl mx-auto text-lg">
              A decade of transforming smiles with compassion, expertise, and cutting-edge dental technology in Indirapuram.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Doctor Story */}
      <section className="section-pad bg-white dark:bg-dentora-dark">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={viewportConfig}>
              <span className="section-tag">Meet the Doctor</span>
              <h2 className="font-poppins font-bold text-3xl md:text-4xl text-slate-900 dark:text-white mt-3 mb-5">
                Dr. Shikha Arora, <span className="gradient-text">BDS, MDS</span>
              </h2>
              <p className="font-inter text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Dr. Shikha Arora is the founder and lead dentist at Dr. Shikha's Dental Care Center. With 10+ years of clinical experience and specialized training in Pedodontics and Preventive Dentistry, she brings world-class dental care to patients of all ages.
              </p>
              <p className="font-inter text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Known for her gentle approach and thorough patient education, Dr. Shikha has earned a 4.9-star rating on Practo with 26 verified patient success stories.
              </p>
              <div className="grid grid-cols-1 gap-2 mb-6">
                {['BDS (Bachelor of Dental Surgery)', 'MDS – Pedodontics & Preventive Dentistry', 'Registered with Dental Council of India', 'Practo Verified & Top Rated', 'Certified LASER & Implant Specialist'].map((cert) => (
                  <div key={cert} className="flex items-center gap-2 text-sm font-inter text-slate-600 dark:text-slate-300">
                    <CheckCircle size={15} className="text-dentora-primary flex-shrink-0" />
                    {cert}
                  </div>
                ))}
              </div>
              <Link to="/appointment" className="btn-primary">Book with Dr. Shikha <ArrowRight size={16} /></Link>
            </motion.div>
            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={viewportConfig} className="relative">
              <div className="img-zoom rounded-4xl overflow-hidden shadow-float">
                <img src="/images/dr-shikha.jpg" alt="Dr. Shikha Arora" className="w-full h-96 object-cover object-top" loading="lazy" />
              </div>
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -bottom-6 -right-6 card-glass p-5 rounded-3xl shadow-float">
                <div className="text-2xl font-poppins font-bold text-dentora-primary">4.9★</div>
                <div className="text-xs font-inter text-slate-500">Practo Rating</div>
                <div className="text-xs font-inter text-slate-400 mt-1">26 Patient Reviews</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission/Vision */}
      <section className="section-pad gradient-soft dark:bg-slate-900">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: '🎯', title: 'Our Mission', text: 'To provide exceptional dental care that improves oral health using the latest technology in a safe, comfortable environment.' },
              { icon: '🔭', title: 'Our Vision', text: 'To be the most trusted dental clinic in Indirapuram — known for clinical excellence, patient satisfaction, and accessible quality care.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportConfig} transition={{ delay: i * 0.15 }} className="card-glass rounded-4xl p-8">
                <div className="text-5xl mb-5">{item.icon}</div>
                <h3 className="font-poppins font-bold text-2xl text-slate-900 dark:text-white mb-4">{item.title}</h3>
                <p className="font-inter text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-pad bg-white dark:bg-dentora-dark" ref={statsRef}>
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: 10, suffix: '+', label: 'Years Experience', decimals: 0 },
              { value: 2000, suffix: '+', label: 'Patients Treated', decimals: 0 },
              { value: 98, suffix: '%', label: 'Satisfaction Rate', decimals: 0 },
              { value: 4.9, suffix: '★', label: 'Practo Rating', decimals: 1 },
            ].map(({ value, suffix, label, decimals }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportConfig} transition={{ delay: i * 0.1 }} className="card-glass rounded-3xl p-6 text-center">
                <div className="font-poppins font-bold text-4xl gradient-text mb-1">
                  {statsInView && <CountUp start={0} end={value} decimals={decimals} duration={2} delay={i * 0.2} />}
                  {suffix}
                </div>
                <div className="text-sm font-inter text-slate-600 dark:text-slate-400">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad gradient-soft dark:bg-slate-900">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportConfig} className="text-center mb-14">
            <span className="section-tag">Our Journey</span>
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-slate-900 dark:text-white mt-3">Milestones That Matter</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-dentora-primary to-dentora-teal transform md:-translate-x-1/2" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportConfig} transition={{ delay: i * 0.1 }} className={`relative flex items-center md:justify-between ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`ml-10 md:ml-0 md:w-5/12 ${i % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                    <div className="card-glass rounded-3xl p-6">
                      <div className="text-dentora-primary font-poppins font-bold text-lg mb-2">{item.year}</div>
                      <h4 className="font-poppins font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                      <p className="font-inter text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full gradient-primary transform md:-translate-x-1/2 shadow-[0_0_12px_rgba(8,145,178,0.6)] z-10" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-white dark:bg-dentora-dark">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportConfig} className="text-center mb-14">
            <span className="section-tag">Core Values</span>
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-slate-900 dark:text-white mt-3">What Drives Us</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportConfig} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }} className="card-glass rounded-4xl p-6 text-center">
                <div className="w-14 h-14 rounded-3xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glass">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-poppins font-bold text-lg text-slate-900 dark:text-white mb-3">{title}</h3>
                <p className="font-inter text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
