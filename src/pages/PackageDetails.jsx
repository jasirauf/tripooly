import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { packages } from '../data/packages';
import { 
  Train, Car, Ticket, Utensils, Home, Subtitles, Map, User, 
  MessageCircle, Star, Send, ShieldCheck
} from 'lucide-react';
import './PackageDetails.css';

const PackageDetails = () => {
  const { id } = useParams();
  const trip = packages.find(p => p.id === parseInt(id));
  const [comment, setComment] = useState("");

  if (!trip) return <div>Trip not found</div>;

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in the ${trip.title} package. Please provide more details.`;
    window.open(`https://wa.me/917012062910?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="details-page">
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url(${trip.image})` }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="location-badge">{trip.location}</span>
            <h1 className="hero-title">{trip.title}</h1>
          </div>
        </div>
      </section>

      <div className="details-container">
        {/* Main Content Area */}
        <div className="details-main">
          
          {/* Dates Selection Section (Refactored from User Image) */}
          <section className="section-card dates-section">
            <h2 className="section-title">Select Travel Dates</h2>
            <div className="months-grid">
              {trip.details.months.map((month, idx) => (
                <div key={idx} className="month-column">
                  <div className="month-name">{month.name}</div>
                  <div className="dates-list">
                    {month.dates.map((date, dIdx) => (
                      <div key={dIdx} className="date-item">{date}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="price-tag-container">
              <div className="price-tag">
                ₹{trip.price}/-
              </div>
            </div>
          </section>

          {/* Inclusions Section */}
          <section className="section-card inclusions-section">
            <h2 className="section-title">What's Included</h2>
            <div className="inclusions-grid">
              <div className="inclusion-item"><Train /> <span>Train Tickets</span></div>
              <div className="inclusion-item"><Car /> <span>Transportation</span></div>
              <div className="inclusion-item"><Ticket /> <span>Entry Tickets</span></div>
              <div className="inclusion-item"><Utensils /> <span>Meals</span></div>
              <div className="inclusion-item"><Home /> <span>Pool Resort</span></div>
              <div className="inclusion-item"><Subtitles /> <span>Toy Train</span></div>
              <div className="inclusion-item"><Map /> <span>Sightseeing</span></div>
              <div className="inclusion-item"><User /> <span>Tour Guide</span></div>
            </div>
          </section>

          {/* Community & Comments Section */}
          <section className="section-card community-section">
            <h2 className="section-title">Trip Community</h2>
            <div className="comments-list">
              {trip.comments.map(c => (
                <div key={c.id} className="comment-card">
                  <div className="comment-header">
                    <span className="comment-user">{c.user}</span>
                    <div className="comment-rating">
                      {[...Array(c.rating)].map((_, i) => <Star key={i} size={12} fill="black" />)}
                    </div>
                  </div>
                  <p className="comment-text">{c.text}</p>
                </div>
              ))}
            </div>

            <div className="add-comment">
              <textarea 
                placeholder="Share your experience with the community..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button className="send-btn"><Send size={18} /></button>
            </div>
          </section>
        </div>

        {/* Floating Sidebar Content (Booking) */}
        <aside className="details-sidebar">
          <div className="booking-card premium-shadow">
            <div className="booking-header">
              <div className="sidebar-price">₹{trip.price} <span className="per-person">/ person</span></div>
              <div className="sidebar-rating"><Star size={14} fill="black" /> {trip.rating}</div>
            </div>
            
            <div className="booking-checks">
              <div className="check-item"><ShieldCheck size={16} /> Instant Confirmation</div>
              <div className="check-item"><ShieldCheck size={16} /> Free Cancellation (24h)</div>
            </div>

            <button className="whatsapp-btn" onClick={handleWhatsApp}>
              <MessageCircle size={20} />
              Enquire on WhatsApp
            </button>
            
            <p className="booking-note">Direct enquiry to official number</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PackageDetails;
