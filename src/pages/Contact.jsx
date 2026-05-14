import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Phone, Mail, MapPin, Clock, MessageSquare, User, Send } from 'lucide-react';
import { CLINIC } from '../utils/constants';
import { viewportConfig } from '../utils/animations';

// Social SVG icons
const FbIcon = () => <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const IgIcon = () => <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
const TwIcon = () => <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const YtIcon = () => <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;


const schema = z.object({
  name: z.string().min(2, 'Name required'),
  phone: z.string().min(10, 'Valid phone required'),
  email: z.string().email('Valid email required').optional().or(z.literal('')),
  subject: z.string().min(3, 'Subject required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    toast.success('Message sent! We\'ll reply within 24 hours.');
    reset();
  };

  const contactCards = [
    { icon: Phone, title: 'Call Us', info: CLINIC.phone, sub: 'Mon–Sat: 10 AM–8 PM', href: `tel:${CLINIC.phone}`, color: 'bg-blue-50 dark:bg-blue-900/20', iconColor: 'text-blue-600' },
    { icon: Mail, title: 'Email Us', info: CLINIC.email, sub: 'We reply within 24 hours', href: `mailto:${CLINIC.email}`, color: 'bg-teal-50 dark:bg-teal-900/20', iconColor: 'text-teal-600' },
    { icon: MapPin, title: 'Visit Us', info: 'Niti Khand 2, Indirapuram', sub: 'Plot 188, Ground Floor, Shop 4', href: `https://www.google.com/maps/dir//${CLINIC.mapLat},${CLINIC.mapLng}`, color: 'bg-green-50 dark:bg-green-900/20', iconColor: 'text-green-600' },
    { icon: Clock, title: 'Clinic Hours', info: 'Mon – Sat', sub: '10 AM–2 PM & 4 PM–8 PM', href: null, color: 'bg-violet-50 dark:bg-violet-900/20', iconColor: 'text-violet-600' },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | Dr. Shikha's Dental Care Center</title>
        <meta name="description" content="Contact Dr. Shikha's Dental Care Center in Indirapuram, Ghaziabad. Call +91-9289570579, WhatsApp +91-9756270579 or visit us at Plot 188, Niti Khand 2." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-tag border-white/20 text-white bg-white/10">Get In Touch</span>
            <h1 className="font-poppins font-bold text-3xl sm:text-4xl md:text-5xl text-white mt-4 mb-5">
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="font-inter text-slate-300 max-w-xl mx-auto">
              We're here to help. Reach out via phone, email, or WhatsApp — or fill out the form below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-white dark:bg-dentora-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactCards.map((card, i) => {
              const CardIcon = card.icon;
              const content = (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="card-glass rounded-4xl p-5 sm:p-6 text-center cursor-pointer group h-full"
                >
                  <div className={`${card.color} w-14 h-14 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <CardIcon size={22} className={card.iconColor} />
                  </div>
                  <h4 className="font-poppins font-bold text-slate-900 dark:text-white mb-1">{card.title}</h4>
                  <p className="font-inter text-sm text-dentora-primary font-semibold mb-1 break-all">{card.info}</p>
                  <p className="font-inter text-xs text-slate-500 dark:text-slate-400">{card.sub}</p>
                </motion.div>
              );
              return card.href ? (
                <a key={card.title} href={card.href} target={card.href.startsWith('http') ? '_blank' : '_self'} rel="noreferrer">{content}</a>
              ) : (
                <div key={card.title}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Map + Form */}
      <section className="section-pad gradient-soft dark:bg-slate-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportConfig}
              className="space-y-5"
            >
              <div className="card-glass rounded-4xl overflow-hidden shadow-float">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.42!2d77.368!3d28.647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5d3b7cd7c3b%3A0x0!2zMjjCsDM4JzQ2LjYiTiA3N8KwMjInMDYuNyJF!5e0!3m2!1sen!2sin!4v1000000001!5m2!1sen!2sin"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dr. Shikha's Dental Care Center Location"
                />
              </div>

              {/* Address detail card */}
              <div className="card-glass rounded-4xl p-6">
                <h4 className="font-poppins font-bold text-slate-900 dark:text-white mb-3">Clinic Address</h4>
                <p className="font-inter text-slate-600 dark:text-slate-400 text-sm mb-3 leading-relaxed">{CLINIC.address}</p>
                <div className="flex gap-3 mt-4">
                  {[
                    { Icon: FbIcon, href: CLINIC.facebook },
                    { Icon: IgIcon, href: CLINIC.instagram },
                    { Icon: TwIcon, href: CLINIC.twitter },
                    { Icon: YtIcon, href: CLINIC.youtube },
                  ].map(({ Icon, href }, i) => (
                    <a key={i} href={href} className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-dentora-primary hover:bg-dentora-light transition-all">
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportConfig}
            >
              <div className="card-glass rounded-4xl p-6 sm:p-8">
                <h3 className="font-poppins font-bold text-2xl text-slate-900 dark:text-white mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold font-inter text-slate-700 dark:text-slate-300 mb-2">Name *</label>
                      <div className="relative">
                        <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input {...register('name')} placeholder="Your name" className="form-input pl-10" />
                      </div>
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold font-inter text-slate-700 dark:text-slate-300 mb-2">Phone *</label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input {...register('phone')} placeholder="Phone number" className="form-input pl-10" />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold font-inter text-slate-700 dark:text-slate-300 mb-2">Email</label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input {...register('email')} type="email" placeholder="your@email.com" className="form-input pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold font-inter text-slate-700 dark:text-slate-300 mb-2">Subject *</label>
                    <input {...register('subject')} placeholder="How can we help?" className="form-input" />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold font-inter text-slate-700 dark:text-slate-300 mb-2">Message *</label>
                    <div className="relative">
                      <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-slate-400" />
                      <textarea {...register('message')} rows={4} placeholder="Write your message..." className="form-input pl-10 resize-none" />
                    </div>
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2"><Send size={15} />Send Message</span>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
