import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { viewportConfig } from '../../utils/animations';

/* ── FAQ Data ─────────────────────────────────────────── */
const faqs = [
  {
    q: "How often should I visit the dentist?",
    a: "We recommend visiting every 6 months for a routine checkup and professional cleaning. However, patients with specific dental conditions or higher risk may need more frequent visits. Dr. Shikha will create a personalized schedule based on your oral health needs.",
  },
  {
    q: "Is teeth whitening safe?",
    a: "Yes! Professional teeth whitening performed at our clinic is completely safe. We use clinically tested, dentist-grade whitening agents that are tailored to your tooth sensitivity. Unlike home kits, our procedure is supervised by Dr. Shikha for optimal safety and results.",
  },
  {
    q: "What should I do in a dental emergency?",
    a: "Call us immediately at +91-9289570579. We prioritize emergency cases and offer same-day appointments. For a knocked-out tooth, keep it moist (in milk or your mouth) and come in within 30 minutes for the best chance of saving it.",
  },
  {
    q: "Are dental implants painful?",
    a: "The procedure is done under local anesthesia, so you won't feel pain during the surgery. Post-procedure discomfort is typically mild and manageable with over-the-counter pain relievers. Most patients are surprised by how comfortable the process is.",
  },
  {
    q: "How do I book an appointment?",
    a: "You can book online through our website, call us at +91-9289570579, or WhatsApp us at +91-9756270579. Our clinic is open Monday to Saturday, 10 AM–2 PM and 4 PM–8 PM. We also accept walk-in patients subject to availability.",
  },
  {
    q: "Do you treat children?",
    a: "Absolutely! We offer gentle, child-friendly pediatric dentistry. We create a fun, welcoming environment that helps children feel comfortable. We recommend children have their first dental visit by age 1 or when their first tooth appears.",
  },
  {
    q: "What insurance/payment options do you accept?",
    a: "We accept cash, UPI, credit/debit cards, and most health insurance plans. We also offer flexible payment plans for extensive treatments. Please contact us to verify your specific insurance coverage.",
  },
];

/* ── FAQ Section ──────────────────────────────────────── */
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section-pad bg-white dark:bg-dentora-dark" id="faq">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
          >
            <span className="section-tag">FAQ</span>
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white mt-3 mb-4 leading-tight">
              Got Questions?
              <span className="block gradient-text">We Have Answers.</span>
            </h2>
            <p className="font-inter text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Find answers to commonly asked questions about our dental services, procedures, and clinic policies.
            </p>

            {/* Contact card */}
            <div className="card-glass rounded-4xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">💬</span>
                <div>
                  <h4 className="font-poppins font-semibold text-slate-900 dark:text-white">Still have questions?</h4>
                  <p className="text-sm font-inter text-slate-500 dark:text-slate-400">We're happy to help!</p>
                </div>
              </div>
              <div className="space-y-2">
                <a
                  href="tel:+919289570579"
                  className="flex items-center gap-2 text-sm font-inter text-dentora-primary font-semibold hover:underline"
                >
                  📞 +91-9289570579
                </a>
                <a
                  href="mailto:drshikhadentalcarecenter@gmail.com"
                  className="flex items-center gap-2 text-sm font-inter text-dentora-primary font-semibold hover:underline"
                >
                  ✉️ drshikhadentalcarecenter@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            className="space-y-3"
          >
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ delay: i * 0.07 }}
                className={`card-glass rounded-3xl overflow-hidden transition-all duration-300 ${openIndex === i ? 'shadow-card-hover' : ''}`}
              >
                {/* Question */}
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-poppins font-semibold text-sm text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-7 h-7 rounded-full bg-dentora-light dark:bg-dentora-primary/20 flex items-center justify-center"
                  >
                    <ChevronDown size={14} className="text-dentora-primary" />
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 font-inter text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/10 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
