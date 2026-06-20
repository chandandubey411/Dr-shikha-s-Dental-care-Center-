import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

/* ── Gallery Images ─────────────────────────────────────── */
// thumb → compressed WebP (fast load in grid)
// full  → original JPG (used only when lightbox opens)
const galleryImages = [
  { id: 1,  thumb: '/images/personal_pics_compressed/DSC03976.webp', full: '/images/personal_pics/DSC03976.JPG', alt: 'Dr. Shikha Dental Clinic', category: 'Clinic' },
  { id: 2,  thumb: '/images/personal_pics_compressed/DSC03979.webp', full: '/images/personal_pics/DSC03979.JPG', alt: 'Dental Treatment',          category: 'Treatment' },
  { id: 3,  thumb: '/images/personal_pics_compressed/DSC03980.webp', full: '/images/personal_pics/DSC03980.JPG', alt: 'Clinic Interior',            category: 'Clinic' },
  { id: 4,  thumb: '/images/personal_pics_compressed/DSC03981.webp', full: '/images/personal_pics/DSC03981.JPG', alt: 'Dental Care',                category: 'Treatment' },
  { id: 5,  thumb: '/images/personal_pics_compressed/DSC03982.webp', full: '/images/personal_pics/DSC03982.JPG', alt: 'Patient Care',               category: 'Patient' },
  { id: 6,  thumb: '/images/personal_pics_compressed/DSC03985.webp', full: '/images/personal_pics/DSC03985.JPG', alt: 'Clinic Setup',               category: 'Clinic' },
  { id: 7,  thumb: '/images/personal_pics_compressed/DSC03989.webp', full: '/images/personal_pics/DSC03989.JPG', alt: 'Dental Equipment',           category: 'Equipment' },
  { id: 8,  thumb: '/images/personal_pics_compressed/DSC03991.webp', full: '/images/personal_pics/DSC03991.JPG', alt: 'Treatment Session',          category: 'Treatment' },
  { id: 9,  thumb: '/images/personal_pics_compressed/DSC04006.webp', full: '/images/personal_pics/DSC04006.JPG', alt: 'Dental Consultation',        category: 'Patient' },
  { id: 10, thumb: '/images/personal_pics_compressed/DSC04007.webp', full: '/images/personal_pics/DSC04007.JPG', alt: 'Modern Dental Chair',        category: 'Equipment' },
  { id: 11, thumb: '/images/personal_pics_compressed/DSC04013.webp', full: '/images/personal_pics/DSC04013.JPG', alt: 'Patient Smile',              category: 'Patient' },
  { id: 12, thumb: '/images/personal_pics_compressed/DSC04014.webp', full: '/images/personal_pics/DSC04014.JPG', alt: 'Clinic Environment',         category: 'Clinic' },
  { id: 13, thumb: '/images/personal_pics_compressed/DSC04016.webp', full: '/images/personal_pics/DSC04016.JPG', alt: 'Dental Tools',               category: 'Equipment' },
  { id: 14, thumb: '/images/personal_pics_compressed/DSC04017.webp', full: '/images/personal_pics/DSC04017.JPG', alt: 'Patient Consultation',       category: 'Patient' },
  { id: 15, thumb: '/images/personal_pics_compressed/DSC04019.webp', full: '/images/personal_pics/DSC04019.JPG', alt: 'Dental Care Center',         category: 'Clinic' },
  { id: 16, thumb: '/images/personal_pics_compressed/DSC04020.webp', full: '/images/personal_pics/DSC04020.JPG', alt: 'Treatment Room',             category: 'Treatment' },
  { id: 17, thumb: '/images/personal_pics_compressed/DSC04021.webp', full: '/images/personal_pics/DSC04021.JPG', alt: 'Dental Checkup',             category: 'Treatment' },
  { id: 18, thumb: '/images/personal_pics_compressed/DSC04022.webp', full: '/images/personal_pics/DSC04022.JPG', alt: 'Clinic Facility',            category: 'Clinic' },
  { id: 19, thumb: '/images/personal_pics_compressed/DSC04023.webp', full: '/images/personal_pics/DSC04023.JPG', alt: 'Dr. Shikha Clinic Gallery',  category: 'Clinic' },
];



/* ── Lightbox ───────────────────────────────────────────── */
const Lightbox = ({ images, index, onClose, onPrev, onNext }) => {
  const img = images[index];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-lg px-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20"
        aria-label="Close lightbox"
      >
        <X size={20} />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20"
        aria-label="Previous image"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Image — full quality original for lightbox */}
      <motion.div
        key={index}
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-5xl w-full max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Show thumb instantly, then swap to full when loaded */}
        <img
          src={img.full}
          alt={img.alt}
          className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
        />
        <div className="mt-3 text-center">
          <span className="text-white/70 text-sm font-inter">
            {img.alt} &nbsp;·&nbsp; <span className="text-dentora-primary">{img.category}</span>
            &nbsp;·&nbsp; {index + 1} / {images.length}
          </span>
        </div>
      </motion.div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20"
        aria-label="Next image"
      >
        <ChevronRight size={22} />
      </button>
    </motion.div>
  );
};

/* ── Gallery Page ───────────────────────────────────────── */
const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = galleryImages;

  const openLightbox = useCallback((idx) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() =>
    setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length), [filtered.length]);
  const goNext = useCallback(() =>
    setLightboxIndex((i) => (i + 1) % filtered.length), [filtered.length]);

  return (
    <>
      <Helmet>
        <title>Gallery | Dr. Shikha's Dental Care Center – Indirapuram, Ghaziabad</title>
        <meta name="description" content="Explore our clinic gallery featuring our modern dental facility, treatment rooms, equipment, and patient care at Dr. Shikha's Dental Care Center, Indirapuram." />
      </Helmet>

      {/* ── Hero Banner ── */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-dentora-soft via-white to-dentora-light dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 overflow-hidden">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-dentora-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-dentora-secondary/10 blur-3xl" />

        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-tag">Our Gallery</span>
            <h1 className="font-poppins font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white mt-4 mb-5">
              A Glimpse Into{' '}
              <span className="gradient-text">Our Clinic</span>
            </h1>
            <p className="font-inter text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
              Step inside Dr. Shikha's Dental Care Center — a modern, comfortable, and 
              patient-friendly dental clinic designed around your smile.
            </p>

            {/* Stats strip */}
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {[
                { value: '19', label: 'Photos' },
                { value: '4', label: 'Categories' },
                { value: '10+', label: 'Years of Excellence' },
              ].map((s) => (
                <div key={s.label} className="card-glass rounded-2xl px-6 py-3 text-center min-w-[100px]">
                  <p className="font-poppins font-bold text-2xl gradient-text">{s.value}</p>
                  <p className="font-inter text-xs text-slate-600 dark:text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Masonry Grid ── */}
      <section className="section-pad bg-dentora-soft dark:bg-slate-900 min-h-[60vh]">
        <div className="container-custom">
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((img, idx) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: idx * 0.03 }}
                  className="break-inside-avoid mb-4 group relative cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                  onClick={() => openLightbox(idx)}
                >
                  <div className="img-zoom">
                    {/* Compressed WebP thumbnail — loads fast in grid */}
                    <img
                      src={img.thumb}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto block object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
