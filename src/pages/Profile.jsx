import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { User, ShoppingBag, Heart, LogOut, CheckCircle, Clock, Edit3, Trash2 } from 'lucide-react';

export const Profile = () => {
  const { user, logout, updateProfile, wishlist, toggleWishlist } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Read tab parameter from URL query
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') || 'orders';

  // State management
  const [activeTab, setActiveTab] = useState(initialTab);
  const [name, setName] = useState(user?.name || '');
  const [address, setAddress] = useState(user?.address || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync tab if URL param changes
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Auth Guard
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  // Handle Profile Update
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateProfile({ name, address, phone });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-page container animate-fade-in">
      <div className="profile-header card-panel">
        <div className="profile-avatar-box">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name || 'User'} className="profile-large-avatar" />
          ) : (
            <div className="profile-large-avatar profile-large-avatar-placeholder">
              {(user.name || 'U').charAt(0).toUpperCase()}
            </div>
          )}
          <div className="profile-meta">
            <h2>Welcome Back, {user.name || 'User'}</h2>
            <p className="profile-email">{user.email}</p>
            <p className="profile-joined">Member since {user.joined}</p>
          </div>
        </div>

        <button onClick={handleLogout} className="btn btn-secondary logout-btn">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>

      <div className="profile-layout-grid">
        {/* Sidebar Nav */}
        <aside className="profile-sidebar card-panel">
          <button 
            onClick={() => navigate('/profile?tab=orders')}
            className={`profile-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          >
            <ShoppingBag size={18} />
            <span>Order History</span>
            <span className="tab-badge">{user.orders?.length || 0}</span>
          </button>
          <button 
            onClick={() => navigate('/profile?tab=wishlist')}
            className={`profile-tab-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
          >
            <Heart size={18} />
            <span>Saved Wishlist</span>
            <span className="tab-badge">{wishlist.length}</span>
          </button>
          <button 
            onClick={() => navigate('/profile?tab=settings')}
            className={`profile-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          >
            <User size={18} />
            <span>Account Settings</span>
          </button>
        </aside>

        {/* Tab Content Display */}
        <main className="profile-tab-content">
          
          {/* 1. Orders Tab */}
          {activeTab === 'orders' && (
            <div className="tab-pane animate-fade-in">
              <h3>Your Orders</h3>
              {user.orders && user.orders.length > 0 ? (
                <div className="orders-list">
                  {user.orders.map((order) => (
                    <div key={order.id} className="order-item card-panel animate-scale-in">
                      <div className="order-row-header">
                        <div className="order-id-date">
                          <strong>Order ID: {order.id}</strong>
                          <span className="order-date">Placed on {order.date}</span>
                        </div>
                        <div className={`order-status-badge badge ${order.status === 'Delivered' ? 'badge-success' : 'badge-primary'}`}>
                          {order.status === 'Delivered' ? <CheckCircle size={12} /> : <Clock size={12} />}
                          <span>{order.status}</span>
                        </div>
                      </div>
                      <div className="order-row-body">
                        <p className="order-items">
                          <strong>Items:</strong> {order.items}
                        </p>
                        <p className="order-price">
                          <strong>Total Charged:</strong> ₹{order.total.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="profile-empty-state card-panel text-center">
                  <ShoppingBag size={48} className="empty-icon" />
                  <h4>No orders placed yet</h4>
                  <p>When you buy high-grade electronics from our shop, orders will show up here.</p>
                  <Link to="/catalog" className="btn btn-primary">Browse Shop</Link>
                </div>
              )}
            </div>
          )}

          {/* 2. Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="tab-pane animate-fade-in">
              <h3>Your Saved Wishlist</h3>
              {wishlist.length > 0 ? (
                <div className="wishlist-grid grid-2">
                  {wishlist.map((product) => (
                    <div key={product.id} className="wishlist-row-card card-panel animate-scale-in">
                      <img src={product.image} alt={product.name} className="wishlist-thumb" />
                      <div className="wishlist-meta">
                        <h4><Link to={`/product/${product.id}`}>{product.name}</Link></h4>
                        <span className="wishlist-price">₹{product.price.toLocaleString('en-IN')}</span>
                        <div className="wishlist-row-actions">
                          <Link to={`/product/${product.id}`} className="btn btn-primary btn-sm">
                            View Product
                          </Link>
                          <button 
                            onClick={() => toggleWishlist(product)}
                            className="btn btn-secondary btn-icon-only-small"
                            title="Remove from Wishlist"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="profile-empty-state card-panel text-center">
                  <Heart size={48} className="empty-icon" />
                  <h4>Wishlist is empty</h4>
                  <p>Tap the heart icon on any electronic card to save it to your wishlist dashboard.</p>
                  <Link to="/catalog" className="btn btn-primary">Discover Tech</Link>
                </div>
              )}
            </div>
          )}

          {/* 3. Settings Tab */}
          {activeTab === 'settings' && (
            <div className="tab-pane animate-fade-in">
              <h3>Account Credentials</h3>
              
              {saveSuccess && (
                <div className="profile-success-banner animate-slide-up">
                  Account settings updated successfully!
                </div>
              )}

              <div className="card-panel">
                <form onSubmit={handleUpdateProfile} className="profile-edit-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address (Cannot be modified)</label>
                    <input 
                      type="email" 
                      value={user.email} 
                      disabled
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. +91 98765 43210"
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label>Shipping Address</label>
                    <textarea 
                      rows="3"
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)} 
                      required
                      className="form-control"
                    ></textarea>
                  </div>

                  <div className="profile-settings-actions">
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                    <button 
                      type="button" 
                      onClick={() => { 
                        setName(user.name); 
                        setAddress(user.address); 
                        setPhone(user.phone || '');
                      }}
                      className="btn btn-secondary"
                    >
                      Reset Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
