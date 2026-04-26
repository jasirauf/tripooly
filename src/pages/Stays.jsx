import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { stays } from '../data/packages';
import PackageCard from '../components/PackageCard';
import './Home.css';

const Stays = () => {
  const [searchParams] = useSearchParams();
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
      <div className="page-header animate-fade-in">
        <h1>Local Stays</h1>
        <p>Premium local stays curated for the community.</p>
      </div>

      <div className="package-grid-container">
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

export default Stays;
