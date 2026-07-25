import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Auth } from './pages/Auth';
import { Profile } from './pages/Profile';
import { AlertCircle } from 'lucide-react';
import './App.css';

// Sleek 404 Fallback Component
const NotFound = () => (
  <div className="container text-center not-found-page animate-scale-in" style={{ padding: '80px 20px' }}>
    <div className="card-panel" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <AlertCircle size={64} className="icon-pink" style={{ marginBottom: '20px' }} />
      <h2>404 - Page Not Found</h2>
      <p style={{ margin: '16px 0 24px', color: 'var(--text-secondary)' }}>
        The electric signal you followed doesn't lead anywhere. Check the URL or return home.
      </p>
      <Link to="/" className="btn btn-primary">Return Home</Link>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        {/* Navigation Bar */}
        <Navbar />
        
        {/* Main Routed Area */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            {/* Catch-all 404 fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
