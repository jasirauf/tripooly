import React from 'react';
import { Heart, Mail, ExternalLink } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-info">
          <div className="footer-logo">TRIPOOLY.</div>
          <p>Community driven travel help for the people, by the people. Join our non-profit mission.</p>
          <div className="footer-socials">
            <a href="https://www.youtube.com/@Tripooly." target="_blank" rel="noreferrer" title="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
            </a>
            <a href="https://www.instagram.com/tripooly/" target="_blank" rel="noreferrer" title="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="mailto:hello@tripooly.travel" title="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h4>Explore</h4>
            <ul>
              <li>Packages</li>
              <li>Stays</li>
              <li>Connections</li>
            </ul>
          </div>
          <div className="link-group">
            <h4>Community</h4>
            <ul>
              <li>List Your Trip</li>
              <li>Join as a Guide</li>
              <li>Support Us</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Tripooly. Built with <Heart size={14} className="heart-icon" /> by travelers.</p>
      </div>
    </footer>
  );
};

export default Footer;
