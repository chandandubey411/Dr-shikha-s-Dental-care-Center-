import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Star, Clock, Calendar, X, CheckCircle } from 'lucide-react';
import { doctors } from '../data/doctors';
import { viewportConfig } from '../utils/animations';

const Doctors = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <>
      <Helmet>
        <title>Our Doctors | Dr. Shikha's Dental Care Center</title>
        <meta name="description" content="Meet our expert dental team at Dr. Shikha's Dental Care Center in Indirapuram. Dr. Shikha Arora and specialists with 26+ patient reviews." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-tag border-white/20 text-white bg-white/10">Expert Team</span>
            <h1 className="font-poppins font-bold text-4xl md:text-5xl text-white mt-4 mb-5">
              Meet Our <span className="gradient-text">Specialists</span>
            </h1>
            <p className="font-inter text-slate-300 max-w-xl mx-auto">
              Our experienced, certified dental professionals are committed to your oral health and a comfortable experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="section-pad bg-white dark:bg-dentora-dark">
        <div className="container-custom">
          <div className="flex justify-center">
            {doctors.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -8 }}
                className="card-glass rounded-4xl overflow-hidden max-w-md w-full"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img src={doc.image} alt={doc.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-full">
                    <span className="text-white text-xs font-semibold">{doc.experience}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={12} className={idx < Math.floor(doc.rating) ? 'text-amber-400 fill-amber-400' : 'text-white/40'} />
                      ))}
                    </div>
                    <span className="text-white text-xs font-inter">{doc.rating} ({doc.reviews})</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-poppins font-bold text-xl text-slate-900 dark:text-white mb-0.5">{doc.name}</h3>
                  <p className="text-dentora-primary text-sm font-semibold font-inter mb-1">{doc.designation}</p>
                  <p className="text-slate-500 text-xs font-inter mb-4">{doc.qualification}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {doc.services.slice(0, 3).map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-full bg-dentora-light dark:bg-dentora-primary/15 text-dentora-primary text-xs font-inter">{s}</span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="btn-outline flex-1 justify-center text-sm py-2.5"
                    >
                      View Profile
                    </button>
                    <Link to="/appointment" className="btn-primary flex-1 justify-center text-sm py-2.5">
                      Book
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedDoc(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="card-glass rounded-4xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-float"
            >
              <div className="relative">
                <img src={selectedDoc.image} alt={selectedDoc.name} className="w-full h-56 object-cover object-top rounded-t-4xl" />
                <button onClick={() => setSelectedDoc(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                  <X size={16} />
                </button>
              </div>
              <div className="p-7">
                <h3 className="font-poppins font-bold text-2xl text-slate-900 dark:text-white mb-1">{selectedDoc.name}</h3>
                <p className="text-dentora-primary font-semibold mb-1">{selectedDoc.designation}</p>
                <p className="text-slate-500 text-sm mb-4">{selectedDoc.qualification} · {selectedDoc.specialization}</p>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                  <span className="text-sm text-slate-600 ml-1">{selectedDoc.rating} ({selectedDoc.reviews} reviews)</span>
                </div>

                <p className="font-inter text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">{selectedDoc.about}</p>

                <div className="mb-5">
                  <h4 className="font-poppins font-semibold text-slate-900 dark:text-white mb-2 text-sm">Availability</h4>
                  {selectedDoc.availability.map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-inter text-slate-600 dark:text-slate-400 mb-1">
                      <Clock size={12} className="text-dentora-primary" /> {t}
                    </div>
                  ))}
                </div>

                <div className="mb-5">
                  <h4 className="font-poppins font-semibold text-slate-900 dark:text-white mb-2 text-sm">Achievements</h4>
                  {selectedDoc.achievements.map((a) => (
                    <div key={a} className="flex items-center gap-2 text-sm font-inter text-slate-600 dark:text-slate-400 mb-1">
                      <CheckCircle size={12} className="text-dentora-primary" /> {a}
                    </div>
                  ))}
                </div>

                <Link to="/appointment" className="btn-primary w-full justify-center" onClick={() => setSelectedDoc(null)}>
                  <Calendar size={15} /> Book Appointment
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Doctors;
