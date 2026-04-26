import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import './PackageCard.css';

const PackageCard = ({ trip }) => {
  return (
    <Link href={`/package/${trip.id}`} className="package-card">
      <div className="card-image-container">
        <img src={trip.image} alt={trip.title} className="card-image" />
        <div className="card-badge">{trip.category}</div>
      </div>
      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{trip.title}</h3>
          <div className="card-rating">
            <Star size={14} fill="currentColor" />
            <span>{trip.rating}</span>
          </div>
        </div>
        <p className="card-location">{trip.location}</p>
        <p className="card-price">
          <span className="price-value">₹{trip.price}</span>
          <span className="price-unit"> / person</span>
        </p>
      </div>
    </Link>
  );
};

export default PackageCard;
