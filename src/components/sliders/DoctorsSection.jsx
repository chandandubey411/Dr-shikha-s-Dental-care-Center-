import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar, Star } from 'lucide-react';
import 'lucide-react';
import { doctors } from '../../data/doctors';
import { viewportConfig } from '../../utils/animations';

/* ── Doctors Section ──────────────────────────────────── */
const DoctorsSection = () => {
  return (
    <section className="section-pad bg-white dark:bg-dentora-dark overflow-hidden" id="doctors">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          className="text-center mb-14"
        >
          <span className="section-tag">Expert Team</span>
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-slate-900 dark:text-white mt-3 mb-4">
            Meet Our <span className="gradient-text">Dental Specialists</span>
          </h2>
          <p className="font-inter text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Our experienced team of dental professionals is dedicated to providing you with the highest quality care in a comfortable environment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          className="max-w-md mx-auto"
        >
          <DoctorCard doctor={doctors[0]} />
        </motion.div>


      </div>
    </section>
  );
};

/* ── Doctor Card ──────────────────────────────────────── */
const DoctorCard = ({ doctor }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="card-glass rounded-4xl overflow-hidden h-full"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {/* Experience badge */}
        <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-full">
          <span className="text-white text-xs font-semibold font-inter">{doctor.experience}</span>
        </div>
        {/* Rating overlay */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className={`${i < Math.floor(doctor.rating) ? 'text-amber-400 fill-amber-400' : 'text-white/40'}`} />
            ))}
          </div>
          <span className="text-white text-xs font-inter font-medium">{doctor.rating} ({doctor.reviews})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <h3 className="font-poppins font-bold text-xl text-slate-900 dark:text-white mb-0.5">{doctor.name}</h3>
        <p className="text-dentora-primary text-sm font-semibold font-inter mb-1">{doctor.designation}</p>
        <p className="text-slate-500 dark:text-slate-400 text-xs font-inter mb-4">{doctor.qualification} · {doctor.specialization}</p>

        {/* Availability */}
        <div className="space-y-2 mb-5">
          {doctor.availability.slice(0, 2).map((time, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-inter text-slate-600 dark:text-slate-400">
              <Clock size={12} className="text-dentora-primary" />
              {time}
            </div>
          ))}
        </div>

        {/* Services tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {doctor.services.slice(0, 3).map((s) => (
            <span key={s} className="px-2.5 py-1 rounded-full bg-dentora-light dark:bg-dentora-primary/15 text-dentora-primary text-xs font-inter font-medium">
              {s}
            </span>
          ))}
        </div>

        {/* Book button */}
        <Link
          to="/appointment"
          className="btn-primary w-full justify-center text-sm py-3"
        >
          <Calendar size={14} />
          Book Appointment
        </Link>
      </div>
    </motion.div>
  );
};

export default DoctorsSection;
