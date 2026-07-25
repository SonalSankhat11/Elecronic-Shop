import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Power, Send, Twitter, Instagram, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      {/* Newsletter Banner */}
      <div className="footer-newsletter">
        <div className="container newsletter-content">
          <div className="newsletter-text">
            <h3>Subscribe to ElectroNews</h3>
            <p>Get 10% off your first purchase and stay updated on secret flash sales.</p>
          </div>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            {subscribed ? (
              <span className="newsletter-success animate-scale-in">
                <ShieldCheck size={18} /> Subscribed successfully! Check your inbox.
              </span>
            ) : (
              <>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="form-control"
                />
                <button type="submit" className="btn btn-primary">
                  <Send size={16} />
                  <span>Subscribe</span>
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-links-section">
        <div className="container footer-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <Power className="logo-icon" size={24} />
              <span>Electro<span>Pulse</span></span>
            </Link>
            <p className="brand-description">
              Next-generation retail experience for electronic enthusiasts. We source premium devices from global innovators.
            </p>
            <div className="social-links">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-btn"><Twitter size={18} /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn"><Instagram size={18} /></a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="footer-col">
            <h4>Shop Electronics</h4>
            <ul>
              <li><Link to="/catalog?category=laptops">Laptops & Creators</Link></li>
              <li><Link to="/catalog?category=smartphones">Smartphones & Aura</Link></li>
              <li><Link to="/catalog?category=audio">Audio & True Wireless</Link></li>
              <li><Link to="/catalog?category=wearables">SmartWear & Watches</Link></li>
              <li><Link to="/catalog?category=smart-home">IoT & Smart Home</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="footer-col">
            <h4>Customer Service</h4>
            <ul>
              <li><Link to="/profile">Track My Order</Link></li>
              <li><a href="#shipping">Shipping & Customs</a></li>
              <li><a href="#returns">Warranty & Returns</a></li>
              <li><a href="#support">Secure Checkout Guide</a></li>
              <li><a href="#help">Help Desk Ticket</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="footer-col">
            <h4>Our Company</h4>
            <ul>
              <li><a href="#about">About ElectroPulse</a></li>
              <li><a href="#careers">Careers (We're hiring!)</a></li>
              <li><a href="#sustainability">Eco-Tech Recycling</a></li>
              <li><a href="#press">Press Kit Releases</a></li>
              <li><a href="#terms">Terms & Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="footer-bottom-bar">
        <div className="container bottom-content">
          <p>&copy; {new Date().getFullYear()} ElectroPulse Inc. All rights reserved.</p>
          <div className="payment-icons">
            <span className="payment-badge">Visa</span>
            <span className="payment-badge">Mastercard</span>
            <span className="payment-badge">Apple Pay</span>
            <span className="payment-badge">Crypto</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
