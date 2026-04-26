'use client';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, ArrowRight, Shield, Heart, Map, Users, CheckCircle } from 'lucide-react';
import PackageCard from '../components/PackageCard';
import AnimatedText from '../components/AnimatedText';
import { packages, stays, videos } from '../data/packages';
import './page.css';

const Home = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => 
      pkg.title.toLowerCase().includes(searchQuery) || 
      pkg.location.toLowerCase().includes(searchQuery) ||
      pkg.category.toLowerCase().includes(searchQuery)
    );
  }, [searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div className="hero-bg-parallax" style={{ scale }}>
          <div className="hero-overlay"></div>
        </motion.div>
        
        <div className="hero-content">
          <AnimatedText 
            text="Community Driven Travel" 
            className="hero-title"
            stagger={0.1}
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            A non-profit platform for travelers to showcase packages, find local stays, and connect offline.
          </motion.p>
          <motion.div 
            className="hero-btns"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <button className="primary-btn-bw">Explore Packages</button>
            <button className="secondary-btn-bw">List Your Trip</button>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <motion.section 
        className="stats-banner dark-glass"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "circOut" }}
      >
        <div className="stats-container">
          <div className="stat-item">
            <h3>12k+</h3>
            <p>Travelers</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <h3>450+</h3>
            <p>Communities</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <h3 className="accent-text">0%</h3>
            <p>Commission</p>
          </div>
        </div>
      </motion.section>

      {/* Category Bar */}
      <div className="category-bar">
        <Link href="/packages" className="category-item active">
          <Shield size={16} /> <span>Featured Packages</span>
        </Link>
        <Link href="/stays" className="category-item">
          <Heart size={16} /> <span>Local Stays</span>
        </Link>
        <Link href="/connections" className="category-item">
          <Users size={16} /> <span>Offline Connections</span>
        </Link>
        <div className="category-item">
          <Map size={16} /> <span>Popular Destinations</span>
        </div>
      </div>

      {/* Mission Section (Storytelling) */}
      <section className="story-section">
        <div className="story-content">
          <motion.div 
            className="story-label"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            OUR MISSION
          </motion.div>
          <AnimatedText 
            text="Travel help for the people, by the people." 
            className="story-heading"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Tripooly is built on the belief that travel should be accessible and community-focused. We don't take commissions; we just provide the platform to connect local guides and travelers directly.
          </motion.p>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="how-it-works">
        <div className="section-header center">
          <h2>How it Works</h2>
        </div>
        <div className="steps-grid">
          {[
            { icon: <Map />, title: "Discover", desc: "Browse community-listed packages and local secrets." },
            { icon: <Users />, title: "Connect", desc: "Talk directly to local guides or stay owners offline." },
            { icon: <CheckCircle />, title: "Experience", desc: "Embark on your journey with zero platform fees." }
          ].map((step, i) => (
            <motion.div 
              key={i} 
              className="step-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Package Grid */}
      <div className="package-grid-container" id="packages">
        <div className="section-header">
          {searchQuery ? <h2>Results for "{searchQuery}"</h2> : <h2>Trending Packages</h2>}
          <Link href="/packages" className="view-all">View all packages <ArrowRight size={16} /></Link>
        </div>
        
        {filteredPackages.length > 0 ? (
          <motion.div 
            className="package-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            {filteredPackages.slice(0, 3).map(trip => (
              <motion.div key={trip.id} variants={itemVariants}>
                <PackageCard trip={trip} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="no-results"><p>No packages found.</p></div>
        )}
      </div>

      {/* Local Stays Preview */}
      <section className="stays-preview-section bg-light">
        <div className="package-grid-container">
          <div className="section-header">
            <h2>Luxury Local Stays</h2>
            <Link href="/stays" className="view-all">Explore all stays <ArrowRight size={16} /></Link>
          </div>
          <motion.div 
            className="package-grid"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
          >
            {stays.slice(0, 3).map(stay => (
              <motion.div key={stay.id} variants={itemVariants}>
                <PackageCard trip={stay} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="videos-section">
        <div className="package-grid-container">
          <div className="section-header">
            <h2>Community Videos</h2>
            <a href="https://www.youtube.com/@Tripooly." target="_blank" rel="noreferrer" className="view-all">Visit YouTube Channel <Play size={14} /></a>
          </div>
          <div className="video-scroll-container">
            <div className="video-scroll-track">
              {videos.map((video, idx) => (
                <motion.div 
                  key={video.id} 
                  className="video-card premium-shadow"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="video-thumb-container">
                    <img src={video.thumbnail} alt={video.title} />
                    <div className="play-overlay">
                      <Play size={48} fill="white" />
                    </div>
                  </div>
                  <div className="video-info">
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Showcase CTA */}
      <motion.section 
        className="showcase-cta dark-glass"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Heart size={48} className="cta-icon" />
        <h2>Showcase your local secret</h2>
        <p>Join 5000+ community members and help others explore the world. Our platform is and will always be non-profit.</p>
        <div className="cta-btns">
          <button className="primary-btn-bw">Start Listing</button>
          <button className="secondary-btn-bw">Support Us</button>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
