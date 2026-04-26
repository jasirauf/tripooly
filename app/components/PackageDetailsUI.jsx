'use client';
import React, { useState } from 'react';
import { 
  Train, Car, Ticket, Utensils, Home, Subtitles, Map, User, 
  MessageCircle, Star, Send, ShieldCheck, Phone
} from 'lucide-react';
import '../(main)/package/[id]/page.css';

const PackageDetailsUI = ({ trip, isPreview = false }) => {
  const [comment, setComment] = useState("");

  if (!trip) return <div>Trip not found</div>;

  const defaultComments = trip.comments || [
    { id: 1, user: "Traveler", text: "Amazing experience! The stay was fantastic.", rating: 5 }
  ];

  return (
    <div className={`details-page ${isPreview ? 'preview-mode' : ''}`} style={{ backgroundColor: '#fff', height: isPreview ? '100%' : 'auto', overflowY: isPreview ? 'auto' : 'visible' }}>
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url(${trip.image || 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80'})` }}>
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
          
          {/* Dates Selection Section */}
          <section className="section-card dates-section">
            <h2 className="section-title">Select Travel Dates</h2>
            <div className="months-grid">
              {trip.details?.months?.map((month, idx) => (
                <div key={idx} className="month-column">
                  <div className="month-name">{month.name}</div>
                  <div className="dates-list">
                    {month.dates?.map((date, dIdx) => (
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
              {trip.details?.inclusions?.map((inc, i) => (
                <div key={i} className="inclusion-item"><Star size={18} /> <span>{inc}</span></div>
              ))}
            </div>
          </section>

          {/* Community & Comments Section */}
          <section className="section-card community-section">
            <h2 className="section-title">Trip Community</h2>
            <div className="comments-list">
              {defaultComments.map((c, i) => (
                <div key={i} className="comment-card">
                  <div className="comment-header">
                    <span className="comment-user">{c.user}</span>
                    <div className="comment-rating">
                      {[...Array(c.rating || 5)].map((_, i) => <Star key={i} size={12} fill="black" />)}
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
              <div className="sidebar-rating"><Star size={14} fill="black" /> {trip.rating || 5.0}</div>
            </div>
            
            <div className="booking-checks">
              <div className="check-item"><ShieldCheck size={16} /> Instant Confirmation</div>
              <div className="check-item"><ShieldCheck size={16} /> Free Cancellation (24h)</div>
            </div>

            <div className="booking-contact-section">
              <p className="for-booking-text">For Booking</p>
              <div className="contact-yellow-box">
                <a href={`https://wa.me/917012062910?text=${encodeURIComponent(`Hi, I'm interested in the ${trip.title} package. Please provide more details.`)}`} target="_blank" rel="noreferrer" className="contact-item">
                  <MessageCircle size={20} fill="black" />
                  +91 701 206 2910
                </a>
                <a href="tel:+917012062910" className="contact-item">
                  <Phone size={20} fill="black" />
                  +91 701 206 2910
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PackageDetailsUI;
