import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, Clock, ArrowRight, Calendar } from 'lucide-react';
import { blogs, blogCategories } from '../data/blogs';
import { viewportConfig } from '../utils/animations';

const Blog = () => {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = blogs.filter((b) => {
    const matchCat = category === 'All' || b.category === category;
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <Helmet>
        <title>Dental Blog | Dr. Shikha's Dental Care Center</title>
        <meta name="description" content="Expert dental health tips, treatment guides, and oral care advice from Dr. Shikha Arora at Dr. Shikha's Dental Care Center, Indirapuram." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-tag border-white/20 text-white bg-white/10">Health Blog</span>
            <h1 className="font-poppins font-bold text-4xl md:text-5xl text-white mt-4 mb-5">
              Dental <span className="gradient-text">Health Blog</span>
            </h1>
            <p className="font-inter text-slate-300 max-w-xl mx-auto">
              Expert tips, treatment guides, and oral health insights from our dental specialists.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-white dark:bg-dentora-dark">
        <div className="container-custom">
          {/* Search + Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input pl-10 w-full"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-inter font-medium transition-all ${
                    category === cat
                      ? 'gradient-primary text-white shadow-glass'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-dentora-light dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Posts */}
          {category === 'All' && search === '' && (
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {blogs.filter(b => b.featured).map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="card-glass rounded-4xl overflow-hidden"
                >
                  <div className="img-zoom h-52">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-dentora-light dark:bg-dentora-primary/20 text-dentora-primary text-xs font-semibold">{post.category}</span>
                      <span className="text-xs font-inter text-slate-500 flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                    </div>
                    <h3 className="font-poppins font-bold text-xl text-slate-900 dark:text-white mb-2 hover:text-dentora-primary transition-colors">{post.title}</h3>
                    <p className="font-inter text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={post.authorAvatar} alt={post.author} className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-sm font-inter font-medium text-slate-700 dark:text-slate-300">{post.author}</span>
                      </div>
                      <span className="flex items-center gap-1 text-dentora-primary text-sm font-semibold hover:gap-2 transition-all">Read <ArrowRight size={13} /></span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* All Posts Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-500 font-inter">
              <span className="text-4xl block mb-3">🔍</span>
              No articles found matching your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ delay: (i % 3) * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="card-glass rounded-4xl overflow-hidden"
                >
                  <div className="img-zoom h-44">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-dentora-light dark:bg-dentora-primary/20 text-dentora-primary text-xs font-semibold">{post.category}</span>
                      <span className="text-xs font-inter text-slate-500 flex items-center gap-1"><Clock size={10} />{post.readTime}</span>
                    </div>
                    <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white mb-2 hover:text-dentora-primary transition-colors line-clamp-2">{post.title}</h3>
                    <p className="font-inter text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <img src={post.authorAvatar} alt={post.author} className="w-6 h-6 rounded-full object-cover" />
                        <span className="text-xs font-inter text-slate-600 dark:text-slate-400">{post.date}</span>
                      </div>
                      <span className="flex items-center gap-1 text-dentora-primary text-xs font-semibold">Read <ArrowRight size={11} /></span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
