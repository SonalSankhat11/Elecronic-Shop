import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Ticket, Percent } from 'lucide-react';

export const Cart = () => {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    cartTotal, 
    cartCount 
  } = useContext(AppContext);
  
  const navigate = useNavigate();

  // Coupon State
  const [promoCode, setPromoCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoError, setPromoError] = useState('');

  // Apply Coupon Code
  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'WELCOME10') {
      setDiscountPercentage(10);
      setAppliedPromo('WELCOME10');
      setPromoError('');
      setPromoCode('');
    } else if (promoCode.trim().toUpperCase() === 'ELECTROPULSE') {
      setDiscountPercentage(15);
      setAppliedPromo('ELECTROPULSE');
      setPromoError('');
      setPromoCode('');
    } else {
      setPromoError('Invalid coupon code. Try WELCOME10');
    }
  };

  // Calculations
  const shippingThreshold = 35000;
  const shippingCost = cartTotal >= shippingThreshold || cartTotal === 0 ? 0 : 500;
  const discountAmount = (cartTotal * discountPercentage) / 100;
  const taxRate = 0.08; // 8% mock tax
  const taxAmount = (cartTotal - discountAmount) * taxRate;
  const grandTotal = cartTotal - discountAmount + shippingCost + taxAmount;

  if (cart.length === 0) {
    return (
      <div className="container cart-empty-page animate-scale-in">
        <div className="empty-cart-card card-panel">
          <ShoppingBag size={64} className="empty-cart-icon" />
          <h2>Your Cart is Empty</h2>
          <p>Explore our premium electronics catalog and add items to your cart to get started.</p>
          <Link to="/catalog" className="btn btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container animate-fade-in">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
        <p>You have {cartCount} items in your bag</p>
      </div>

      <div className="cart-layout-grid">
        {/* Items Column */}
        <div className="cart-items-column">
          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.product.id} className="cart-item-row card-panel animate-scale-in">
                {/* Product Thumbnail */}
                <div className="cart-item-image-wrapper">
                  <img src={item.product.image} alt={item.product.name} />
                </div>

                {/* Details */}
                <div className="cart-item-details">
                  <span className="badge badge-primary item-cat">{item.product.category}</span>
                  <h3>
                    <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                  </h3>
                  <span className="item-unit-price">₹{item.product.price.toLocaleString('en-IN')} each</span>
                </div>

                {/* Quantity Controls */}
                <div className="cart-item-quantity">
                  <div className="quantity-picker">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="qty-btn"
                    >-</button>
                    <span className="qty-val">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="qty-btn"
                    >+</button>
                  </div>
                </div>

                {/* Price Subtotal */}
                <div className="cart-item-subtotal">
                  <span>Subtotal</span>
                  <strong>₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</strong>
                </div>

                {/* Delete Button */}
                <button 
                  onClick={() => removeFromCart(item.product.id)}
                  className="cart-item-delete-btn"
                  title="Remove from Cart"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-items-actions">
            <Link to="/catalog" className="btn btn-secondary">
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Checkout Summary Column */}
        <div className="cart-summary-column">
          <div className="summary-card card-panel">
            <h3>Order Summary</h3>
            
            <div className="summary-calc-rows">
              <div className="calc-row">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              
              {appliedPromo && (
                <div className="calc-row discount-row">
                  <span className="discount-label">
                    <Percent size={14} /> Discount ({discountPercentage}%)
                  </span>
                  <span>-₹{Math.round(discountAmount).toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="calc-row">
                <span>Shipping</span>
                {shippingCost === 0 ? (
                  <span className="free-shipping-tag">FREE</span>
                ) : (
                  <span>₹{shippingCost.toLocaleString('en-IN')}</span>
                )}
              </div>

              {shippingCost > 0 && (
                <p className="shipping-hint-text">
                  Add <strong>₹{(shippingThreshold - cartTotal).toLocaleString('en-IN')}</strong> more to get FREE shipping!
                </p>
              )}

              <div className="calc-row">
                <span>Est. Tax (8%)</span>
                <span>₹{Math.round(taxAmount).toLocaleString('en-IN')}</span>
              </div>

              <hr />

              <div className="calc-row grand-total-row">
                <span>Grand Total</span>
                <span>₹{Math.round(grandTotal).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="promo-form">
              <div className="promo-input-wrapper">
                <Ticket className="coupon-icon" size={16} />
                <input 
                  type="text" 
                  placeholder="Promo code (e.g. WELCOME10)" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="form-control"
                />
                <button type="submit" className="btn btn-secondary">Apply</button>
              </div>
              {promoError && <p className="promo-error">{promoError}</p>}
              {appliedPromo && (
                <p className="promo-success">
                  Promo code <strong>{appliedPromo}</strong> applied successfully!
                </p>
              )}
            </form>

            {/* Checkout Button */}
            <button 
              onClick={() => navigate('/checkout', { state: { discountPercentage } })}
              className="btn btn-primary checkout-btn"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            {/* Secures badge */}
            <div className="summary-trust-badge">
              <ShieldCheck size={16} />
              <span>Full SSL transit encryption guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
