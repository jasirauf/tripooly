'use client';
import React, { useMemo, useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { packages } from '../../data/packages';
import PackageCard from '../../components/PackageCard';
import '../page.css';

const PackagesContent = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';

  const filteredPackages = useMemo(() => {
    const allPackages = [];
    for(let i=0; i<10; i++) {
      allPackages.push(...packages.map(p => ({...p, id: p.id + i * 100})));
    }
    
    return allPackages.filter(pkg => 
      pkg.title.toLowerCase().includes(searchQuery) || 
      pkg.location.toLowerCase().includes(searchQuery) ||
      pkg.category.toLowerCase().includes(searchQuery)
    );
  }, [searchQuery]);

  const [visibleCount, setVisibleCount] = useState(10);
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setVisibleCount(prev => prev + 10);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  const visiblePackages = filteredPackages.slice(0, visibleCount);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="home-page categories-page">
      <div className="package-grid-container">
        <div className="page-header animate-fade-in" style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '10px', letterSpacing: '-1px' }}>Featured Packages</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Explore community-driven travel packages.</p>
        </div>
        {searchQuery && (
          <div className="section-header">
            <h2>Results for "{searchQuery}"</h2>
          </div>
        )}
        
        {filteredPackages.length > 0 ? (
          <motion.div 
            className="package-grid"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {visiblePackages.map(pkg => (
              <motion.div key={pkg.id} variants={itemVariants}>
                <PackageCard trip={pkg} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="no-results">
            <p>No packages found matching your search.</p>
          </div>
        )}

        {visibleCount < filteredPackages.length && (
          <div ref={observerTarget} style={{ padding: '40px', textAlign: 'center', marginTop: '20px' }}>
            <div className="loader" style={{ display: 'inline-block', width: '30px', height: '30px', border: '3px solid #f3f3f3', borderTop: '3px solid #000', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <style>{`
              @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
};

const Packages = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PackagesContent />
  </Suspense>
);

export default Packages;
