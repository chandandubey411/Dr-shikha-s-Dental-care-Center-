import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { testimonials } from '../../data/testimonials';
import { viewportConfig } from '../../utils/animations';

/* ── Testimonials Carousel ────────────────────────────── */
const TestimonialsSection = () => {
  return (
    <section className="section-pad gradient-soft dark:bg-slate-900 overflow-hidden" id="testimonials">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          className="text-center mb-14"
        >
          <span className="section-tag">Patient Stories</span>
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-slate-900 dark:text-white mt-3 mb-4">
            What Our Patients Say
          </h2>
          <p className="font-inter text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Real experiences from real patients in Indirapuram and Ghaziabad — see why thousands trust us with their smiles.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation
            loop
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id} className="h-auto">
                <TestimonialCard testimonial={t} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

/* ── Testimonial Card ─────────────────────────────────── */
const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="card-glass h-full rounded-4xl p-5 sm:p-7 flex flex-col relative overflow-hidden"
    >
      {/* Quote icon */}
      <div className="absolute top-6 right-6 opacity-10">
        <Quote className="text-dentora-primary fill-dentora-primary w-10 h-10 sm:w-[60px] sm:h-[60px]" />
      </div>

      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 gradient-primary rounded-t-4xl" />

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
        ))}
      </div>

      {/* Treatment badge */}
      <span className="self-start px-3 py-1 rounded-full bg-dentora-light dark:bg-dentora-primary/20 text-dentora-primary text-xs font-semibold font-inter mb-4">
        {testimonial.treatment}
      </span>

      {/* Review text */}
      <p className="font-inter text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex-1 mb-6 italic">
        "{testimonial.review}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-200/60 dark:border-white/10">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-dentora-primary/20"
          loading="lazy"
        />
        <div>
          <div className="font-poppins font-semibold text-sm text-slate-900 dark:text-white">{testimonial.name}</div>
          <div className="text-xs font-inter text-slate-500 dark:text-slate-400">{testimonial.location}</div>
        </div>
        {testimonial.verified && (
          <div className="ml-auto flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-green-700 dark:text-green-400 text-xs font-inter font-medium">{testimonial.source}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TestimonialsSection;
