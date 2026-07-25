import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { 
  ShoppingCart, 
  User, 
  Sun, 
  Moon, 
  Search, 
  Heart, 
  Menu, 
  X, 
  Power 
} from 'lucide-react';

export const Navbar = () => {
  const { 
    theme, 
    toggleTheme, 
    cartCount, 
    user, 
    wishlist, 
    searchQuery, 
    setSearchQuery 
  } = useContext(AppContext);
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState(searchQuery);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchText);
    navigate(`/catalog?search=${encodeURIComponent(searchText)}`);
    setMobileMenuOpen(false);
  };

  const handleCategoryClick = (cat) => {
    navigate(`/catalog?category=${cat}`);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-container">
      <div className="container nav-content">
        {/* Brand Logo */}
        <Link to="/" className="nav-logo" onClick={() => setSearchQuery('')}>
          <Power className="logo-icon" size={28} />
          <span>Electro<span>Pulse</span></span>
        </Link>

        {/* Desktop Search Bar */}
        <form onSubmit={handleSearchSubmit} className="nav-search-form">
          <input 
            type="text" 
            placeholder="Search premium electronics..." 
            value={searchText} 
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <Search size={18} />
          </button>
        </form>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <div className="nav-dropdown">
            <span className="dropdown-trigger">Categories</span>
            <div className="dropdown-menu">
              <button onClick={() => handleCategoryClick('laptops')}>Laptops</button>
              <button onClick={() => handleCategoryClick('smartphones')}>Smartphones</button>
              <button onClick={() => handleCategoryClick('audio')}>Audio & Sound</button>
              <button onClick={() => handleCategoryClick('wearables')}>Wearables</button>
              <button onClick={() => handleCategoryClick('smart-home')}>Smart Home</button>
              <hr />
              <Link to="/catalog">All Products</Link>
            </div>
          </div>
          
          <Link to="/catalog" className="nav-link">Shop</Link>
        </nav>

        {/* Action Buttons */}
        <div className="nav-actions">
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="action-icon-btn" title="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Wishlist */}
          <Link to="/profile?tab=wishlist" className="action-icon-btn badge-container" title="Wishlist">
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="badge-dot">{wishlist.length}</span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="action-icon-btn badge-container" title="Cart">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="badge-count animate-scale-in">{cartCount}</span>
            )}
          </Link>

          {/* Profile/Auth */}
          {user ? (
            <Link to="/profile" className="profile-link-active" title="My Profile">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name || 'User'} className="nav-avatar" />
              ) : (
                <div className="nav-avatar nav-avatar-placeholder">
                  {(user.name || 'U').charAt(0).toUpperCase()}
                </div>
              )}
              <span className="nav-username">{user.name || 'User'}</span>
            </Link>
          ) : (
            <Link to="/login" className="btn btn-secondary nav-login-btn">
              <User size={16} />
              <span>Login</span>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="mobile-search-form">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchText} 
              onChange={(e) => setSearchText(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <Search size={18} />
            </button>
          </form>

          <div className="mobile-links">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/catalog" onClick={() => setMobileMenuOpen(false)}>All Products</Link>
            
            <div className="mobile-categories-section">
              <p>Categories</p>
              <div className="mobile-cat-grid">
                <button onClick={() => handleCategoryClick('laptops')}>Laptops</button>
                <button onClick={() => handleCategoryClick('smartphones')}>Smartphones</button>
                <button onClick={() => handleCategoryClick('audio')}>Audio</button>
                <button onClick={() => handleCategoryClick('wearables')}>Wearables</button>
                <button onClick={() => handleCategoryClick('smart-home')}>Smart Home</button>
              </div>
            </div>

            <hr />

            {user ? (
              <>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>My Profile ({user.name})</Link>
                <Link to="/profile?tab=wishlist" onClick={() => setMobileMenuOpen(false)}>My Wishlist ({wishlist.length})</Link>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>Login / Sign Up</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
