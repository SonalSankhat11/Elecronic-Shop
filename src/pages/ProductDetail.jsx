import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { Star, ShoppingCart, Heart, Shield, Check, RotateCcw, AlertTriangle, ArrowLeft } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

export const ProductDetail = () => {
  const { id } = useParams();
  const { products, addToCart, wishlist, toggleWishlist } = useContext(AppContext);

  // Find product
  const product = products.find((p) => p.id === id);

  // Local States
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product?.image || '');
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' or 'reviews'
  
  // Custom Local Reviews State (persisted per product reload)
  const [reviews, setReviews] = useState([
    { name: 'Alex K.', rating: 5, date: '2026-07-02', text: 'Absolutely spectacular. The display is bright and the build quality is top-tier. Speed is insane.' },
    { name: 'Sarah M.', rating: 4, date: '2026-06-25', text: 'Excellent performance and specs. The battery life could be slightly better under extreme load, but overall great.' }
  ]);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  useEffect(() => {
    // Reset state on product change
    if (product) {
      setQuantity(1);
      setActiveImage(product.image);
      setReviews([
        { name: 'Alex K.', rating: 5, date: '2026-07-02', text: 'Absolutely spectacular. The display is bright and the build quality is top-tier. Speed is insane.' },
        { name: 'Sarah M.', rating: 4, date: '2026-06-25', text: 'Excellent performance and specs. The battery life could be slightly better under extreme load, but overall great.' }
      ]);
    }
  }, [product]);

  // Fallback if product not found
  if (!product) {
    return (
      <div className="container product-not-found card-panel animate-scale-in">
        <AlertTriangle size={48} className="warning-icon" />
        <h2>Product Not Found</h2>
        <p>The electronic device you are looking for might have been retired or has a faulty link.</p>
        <Link to="/catalog" className="btn btn-primary">Back to Catalog</Link>
      </div>
    );
  }

  // Related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // Wishlist check
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  // Add review handler
  const handleAddReview = (e) => {
    e.preventDefault();
    if (newReviewName.trim() && newReviewText.trim()) {
      const newRev = {
        name: newReviewName,
        rating: newReviewRating,
        date: new Date().toISOString().split('T')[0],
        text: newReviewText
      };
      setReviews([newRev, ...reviews]);
      setNewReviewName('');
      setNewReviewText('');
      setNewReviewRating(5);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="product-detail-page container animate-fade-in">
      {/* Back to catalog link */}
      <div className="back-link-box">
        <Link to="/catalog" className="back-link">
          <ArrowLeft size={16} />
          <span>Back to Catalog</span>
        </Link>
      </div>

      <div className="product-showcase-grid">
        {/* Gallery Column */}
        <div className="product-gallery-col">
          <div className="main-image-wrapper">
            <img src={activeImage} alt={product.name} className="product-main-image" />
          </div>
          
          {/* Thumbnails (perspectives) */}
          <div className="gallery-thumbnails">
            <button 
              onClick={() => setActiveImage(product.image)}
              className={`thumb-btn ${activeImage === product.image ? 'active' : ''}`}
            >
              <img src={product.image} alt="front perspective" />
            </button>
            <button 
              onClick={() => setActiveImage('https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&auto=format&fit=crop&q=80')}
              className={`thumb-btn ${activeImage === 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&auto=format&fit=crop&q=80' ? 'active' : ''}`}
            >
              <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&auto=format&fit=crop&q=80" alt="detail perspective" />
            </button>
            <button 
              onClick={() => setActiveImage('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80')}
              className={`thumb-btn ${activeImage === 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80' ? 'active' : ''}`}
            >
              <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80" alt="context perspective" />
            </button>
          </div>
        </div>

        {/* Purchase Options Column */}
        <div className="product-buying-col card-panel">
          <div className="buying-header">
            <span className="badge badge-primary">{product.category}</span>
            <h1>{product.name}</h1>
            
            {/* Rating Stars Summary */}
            <div className="buying-rating">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className="star-icon" 
                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                  />
                ))}
              </div>
              <span className="rating-score">{product.rating}</span>
              <span className="dot">•</span>
              <span className="reviews-link" onClick={() => setActiveTab('reviews')}>{reviews.length} Customer reviews</span>
            </div>
          </div>

          <div className="buying-price-row">
            <span className="buying-price">₹{product.price?.toLocaleString('en-IN')}</span>
            {product.stock > 5 ? (
              <span className="stock-status in-stock"><Check size={14} /> In Stock ({product.stock} units)</span>
            ) : (
              <span className="stock-status low-stock"><AlertTriangle size={14} /> Only {product.stock} left in stock!</span>
            )}
          </div>

          <p className="buying-desc">{product.description}</p>

          <hr className="divider" />

          {/* Action Row: Qty & Cart buttons */}
          <div className="buying-actions-row">
            <div className="quantity-picker">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="qty-btn"
              >-</button>
              <span className="qty-val">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                className="qty-btn"
              >+</button>
            </div>

            <button 
              onClick={handleAddToCart}
              className="btn btn-primary buy-add-to-cart-btn"
            >
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </button>

            <button 
              onClick={() => toggleWishlist(product)}
              className={`wishlist-toggle-circle ${isWishlisted ? 'active' : ''}`}
              title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>

          <hr className="divider" />

          {/* Security details */}
          <div className="buying-guarantees">
            <div className="guarantee-item">
              <Shield size={16} className="guarantee-icon" />
              <div>
                <h5>Secure Transaction</h5>
                <p>All data is fully tokenized and encryted during transport.</p>
              </div>
            </div>
            <div className="guarantee-item">
              <RotateCcw size={16} className="guarantee-icon" />
              <div>
                <h5>30-Day Change of Mind</h5>
                <p>Return in original packing for a full hassle-free refund.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Specs vs Reviews */}
      <section className="product-tabs-section">
        <div className="tabs-header-bar">
          <button 
            onClick={() => setActiveTab('specs')}
            className={`tab-toggle-btn ${activeTab === 'specs' ? 'active' : ''}`}
          >
            Technical Specifications
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`tab-toggle-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          >
            Customer Reviews ({reviews.length})
          </button>
        </div>

        <div className="tab-content-container">
          {activeTab === 'specs' ? (
            <div className="specs-table-wrapper animate-fade-in">
              <table className="specs-table">
                <tbody>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key}>
                      <td className="spec-label">{key}</td>
                      <td className="spec-value">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="reviews-tab-content animate-fade-in">
              {/* Form to submit review */}
              <form onSubmit={handleAddReview} className="add-review-form card-panel">
                <h3>Write a Review</h3>
                <div className="grid-2">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input 
                      type="text" 
                      placeholder="Alex Smith" 
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      required 
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Rating (Stars)</label>
                    <select 
                      value={newReviewRating} 
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="form-control"
                    >
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Good</option>
                      <option value="3">3 - Average</option>
                      <option value="2">2 - Disappointing</option>
                      <option value="1">1 - Terrible</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Review Comment</label>
                  <textarea 
                    rows="3" 
                    placeholder="Share your experience using this product..." 
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    required
                    className="form-control"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit Review</button>
              </form>

              {/* Reviews List */}
              <div className="reviews-list">
                {reviews.map((rev, idx) => (
                  <div key={idx} className="review-card card-panel animate-scale-in">
                    <div className="review-card-header">
                      <div className="reviewer-info">
                        <strong>{rev.name}</strong>
                        <span className="review-date">{rev.date}</span>
                      </div>
                      <div className="reviewer-rating">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className="star-icon" 
                            fill={i < rev.rating ? 'currentColor' : 'none'} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="review-text">{rev.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Recommended items section */}
      {relatedProducts.length > 0 && (
        <section className="product-recommendations-section">
          <div className="section-header">
            <h2>Related Products</h2>
            <p>Customers who bought this also checked out these items.</p>
          </div>
          <div className="grid-3">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
