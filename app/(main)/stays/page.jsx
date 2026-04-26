'use client';
import React, { useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { stays } from '../../data/packages';
import PackageCard from '../../components/PackageCard';
import '../page.css';

const StaysContent = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';

  const filteredStays = useMemo(() => {
    return stays.filter(stay => 
      stay.title.toLowerCase().includes(searchQuery) || 
      stay.location.toLowerCase().includes(searchQuery) ||
      stay.category.toLowerCase().includes(searchQuery)
    );
  }, [searchQuery]);

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
          <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '10px', letterSpacing: '-1px' }}>Local Stays</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Premium local stays curated for the community.</p>
        </div>
        {searchQuery && (
          <div className="section-header">
            <h2>Results for "{searchQuery}"</h2>
          </div>
        )}
        
        {filteredStays.length > 0 ? (
          <motion.div 
            className="package-grid"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {filteredStays.map(stay => (
              <motion.div key={stay.id} variants={itemVariants}>
                <PackageCard trip={stay} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="no-results">
            <p>No stays found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Stays = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <StaysContent />
  </Suspense>
);

export default Stays;
