import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { Heart, ShoppingCart, Star } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist } = useContext(AppContext);

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="product-card card-panel card-panel-hoverable animate-scale-in">
      <Link to={`/product/${product.id}`} className="product-card-link">
        {/* Image Showcase */}
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
          
          {/* Wishlist Button */}
          <button 
            onClick={handleWishlistClick} 
            className={`wishlist-toggle-btn ${isWishlisted ? 'active' : ''}`}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
          </button>

          {/* Category Tag */}
          <span className="product-category-tag badge badge-primary">
            {product.category}
          </span>
        </div>

        {/* Product Details */}
        <div className="product-info">
          <div className="product-rating">
            <Star size={14} className="star-icon" fill="currentColor" />
            <span className="rating-val">{product.rating}</span>
            <span className="reviews-count">({product.reviewsCount})</span>
          </div>

          <h3 className="product-title">{product.name}</h3>
          
          <div className="product-footer">
            <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
            
            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart} 
              className="btn btn-primary product-add-btn"
              title="Add to Cart"
            >
              <ShoppingCart size={16} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};
