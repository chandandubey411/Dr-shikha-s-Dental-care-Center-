import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle, ChevronDown, Stethoscope } from 'lucide-react';
import { CLINIC, TIME_SLOTS, TREATMENT_TYPES } from '../utils/constants';
import { viewportConfig } from '../utils/animations';

/* ── Zod Schema ───────────────────────────────────────── */
const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Enter a valid 10-digit phone number').max(13),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  treatment: z.string().min(1, 'Please select a treatment'),
  timeSlot: z.string().min(1, 'Please select a time slot'),
  message: z.string().optional(),
});

/* ── Appointment Page ─────────────────────────────────── */
const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    if (!selectedDate) {
      toast.error('Please select an appointment date!');
      return;
    }
    setLoading(true);
    // Simulate form submission (integrate EmailJS here if needed)
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
    toast.success('Appointment request sent! We\'ll confirm shortly.');
  };

  const handleReset = () => {
    setSubmitted(false);
    setSelectedDate(null);
    reset();
  };

  // Disable Sundays (clinic closed) and past dates
  const filterDate = (date) => {
    const day = date.getDay();
    return day !== 0 && date >= new Date();
  };

  return (
    <>
      <Helmet>
        <title>Book Appointment | Dr. Shikha's Dental Care Center</title>
        <meta name="description" content="Book your dental appointment at Dr. Shikha's Dental Care Center, Indirapuram, Ghaziabad. Online booking, call +91-9289570579 or WhatsApp +91-9756270579." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-tag border-white/20 text-white bg-white/10">Online Booking</span>
            <h1 className="font-poppins font-bold text-3xl sm:text-4xl md:text-5xl text-white mt-4 mb-5">
              Book an <span className="gradient-text">Appointment</span>
            </h1>
            <p className="font-inter text-slate-300 max-w-xl mx-auto">
              Schedule your visit with Dr. Shikha Arora at your convenience. We're here Mon–Sat, 10 AM–2 PM & 4–8 PM.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-white dark:bg-dentora-dark">
        <div className="container-custom">
          {submitted ? (
            /* Success State */
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="max-w-lg mx-auto card-glass rounded-4xl p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glass-lg"
              >
                <CheckCircle size={40} className="text-white" />
              </motion.div>
              <h2 className="font-poppins font-bold text-2xl text-slate-900 dark:text-white mb-3">Appointment Requested!</h2>
              <p className="font-inter text-slate-600 dark:text-slate-400 mb-3">
                Thank you! We've received your appointment request. Our team will confirm your slot within 2 hours via phone or WhatsApp.
              </p>
              <div className="bg-dentora-soft dark:bg-slate-800 rounded-2xl p-4 mb-6 text-sm text-slate-600 dark:text-slate-400 font-inter">
                <p>📞 {CLINIC.phone}</p>
                <p>💬 WhatsApp: +91-9756270579</p>
              </div>
              <button onClick={handleReset} className="btn-primary">Book Another Appointment</button>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Clinic info sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportConfig}
                className="space-y-5"
              >
                <div className="card-glass rounded-4xl p-5 sm:p-6 text-center sm:text-left">
                  <h3 className="font-poppins font-bold text-lg text-slate-900 dark:text-white mb-4">Clinic Hours</h3>
                  <div className="space-y-2 font-inter text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex justify-between sm:justify-between gap-4"><span>Mon – Sat</span><span className="font-medium text-dentora-primary">10 AM – 2 PM</span></div>
                    <div className="flex justify-between sm:justify-between gap-4"><span>Mon – Sat</span><span className="font-medium text-dentora-primary">4 PM – 8 PM</span></div>
                    <div className="flex justify-between sm:justify-between gap-4"><span>Sunday</span><span className="text-red-500 font-medium">Closed</span></div>
                  </div>
                </div>
                <div className="card-glass rounded-4xl p-5 sm:p-6 text-center sm:text-left">
                  <h3 className="font-poppins font-bold text-lg text-slate-900 dark:text-white mb-4">Quick Contact</h3>
                  <div className="space-y-3 flex flex-col items-center sm:items-start">
                    <a href={`tel:${CLINIC.phone}`} className="flex items-center gap-3 text-sm font-inter text-slate-600 dark:text-slate-400 hover:text-dentora-primary transition-colors">
                      <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                        <Phone size={14} className="text-white" />
                      </div>
                      {CLINIC.phone}
                    </a>
                    <a href={`https://wa.me/${CLINIC.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm font-inter text-slate-600 dark:text-slate-400 hover:text-green-500 transition-colors">
                      <div className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
                        <Phone size={14} className="text-white" />
                      </div>
                      WhatsApp Us
                    </a>
                    <a href={`mailto:${CLINIC.email}`} className="flex items-center gap-3 text-sm font-inter text-slate-600 dark:text-slate-400 hover:text-dentora-primary transition-colors">
                      <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                        <Mail size={14} className="text-white" />
                      </div>
                      Email Us
                    </a>
                  </div>
                </div>
                <div className="card-glass rounded-4xl p-5 sm:p-6 text-center sm:text-left">
                  <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white mb-3">Our Address</h3>
                  <p className="font-inter text-sm text-slate-600 dark:text-slate-400 leading-relaxed mx-auto sm:mx-0 max-w-[240px] sm:max-w-none">{CLINIC.address}</p>
                  <a
                    href={`https://www.google.com/maps/dir//${CLINIC.mapLat},${CLINIC.mapLng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-dentora-primary text-sm font-semibold mt-3 hover:underline"
                  >
                    Get Directions →
                  </a>
                </div>
              </motion.div>

              {/* Booking Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                className="lg:col-span-2"
              >
                <div className="card-glass rounded-4xl p-6 sm:p-8">
                  <h2 className="font-poppins font-bold text-2xl text-slate-900 dark:text-white mb-6 text-center sm:text-left">Request Your Appointment</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name & Phone */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold font-inter text-slate-700 dark:text-slate-300 mb-2 text-center sm:text-left">Full Name *</label>
                        <div className="relative">
                          <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input {...register('name')} placeholder="Your full name" className="form-input pl-11" />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs mt-1.5 font-inter">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold font-inter text-slate-700 dark:text-slate-300 mb-2 text-center sm:text-left">Phone Number *</label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input {...register('phone')} placeholder="+91 XXXXX XXXXX" className="form-input pl-11" />
                        </div>
                        {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-inter">{errors.phone.message}</p>}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold font-inter text-slate-700 dark:text-slate-300 mb-2 text-center sm:text-left">Email (Optional)</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input {...register('email')} type="email" placeholder="your@email.com" className="form-input pl-11" />
                      </div>
                    </div>

                    {/* Treatment & Time Slot */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold font-inter text-slate-700 dark:text-slate-300 mb-2 text-center sm:text-left">Treatment Type *</label>
                        <div className="relative">
                          <Stethoscope size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <select {...register('treatment')} className="form-input pl-11 pr-8 appearance-none">
                            <option value="">Select treatment</option>
                            {TREATMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                          </select>
                          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                        {errors.treatment && <p className="text-red-500 text-xs mt-1.5 font-inter">{errors.treatment.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold font-inter text-slate-700 dark:text-slate-300 mb-2 text-center sm:text-left">Preferred Time *</label>
                        <div className="relative">
                          <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <select {...register('timeSlot')} className="form-input pl-11 pr-8 appearance-none">
                            <option value="">Select time slot</option>
                            {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                        {errors.timeSlot && <p className="text-red-500 text-xs mt-1.5 font-inter">{errors.timeSlot.message}</p>}
                      </div>
                    </div>

                    {/* Date Picker */}
                    <div>
                      <label className="block text-sm font-semibold font-inter text-slate-700 dark:text-slate-300 mb-2">
                        <span className="flex items-center justify-center sm:justify-start gap-1"><Calendar size={14} /> Preferred Date *</span>
                      </label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date) => setSelectedDate(date)}
                          filterDate={filterDate}
                          placeholderText="Select appointment date"
                          minDate={new Date()}
                          dateFormat="dd MMMM yyyy"
                          className="form-input w-full pl-11"
                        />
                      </div>
                      {!selectedDate && <p className="text-slate-400 text-xs mt-1 font-inter">Clinic is open Mon–Sat only</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold font-inter text-slate-700 dark:text-slate-300 mb-2 text-center sm:text-left">Additional Notes</label>
                      <div className="relative">
                        <MessageSquare size={16} className="absolute left-3.5 top-4 text-slate-400" />
                        <textarea {...register('message')} rows={3} placeholder="Any specific concerns or questions..." className="form-input pl-11 pt-3 resize-none" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full justify-center py-4 text-base"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          Sending Request...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Calendar size={16} /> Confirm Appointment
                        </span>
                      )}
                    </button>
                    <p className="text-center text-xs font-inter text-slate-500 dark:text-slate-400">
                      We'll confirm your appointment via call/WhatsApp within 2 hours.
                    </p>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Appointment;
