import React, { useContext, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { ShieldCheck, CreditCard, ChevronRight, ShoppingBag, Truck, CheckCircle } from 'lucide-react';

export const Checkout = () => {
  const { 
    user, 
    cart, 
    cartTotal, 
    createOrder 
  } = useContext(AppContext);
  
  const location = useLocation();

  // Retrieve discount passed from Cart state
  const discountPercentage = location.state?.discountPercentage || 0;

  // Checkout Form States
  const [fullName, setFullName] = useState(user?.name || '');
  const [address, setAddress] = useState(user?.address || '');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Order Success Modal State
  const [placedOrderId, setPlacedOrderId] = useState(null);

  // Auth Guard
  if (!user) {
    return (
      <div className="container checkout-auth-guard animate-scale-in">
        <div className="auth-guard-card card-panel">
          <ShieldCheck size={64} className="guard-icon" />
          <h2>Authentication Required</h2>
          <p>Please log in or register an account to configure your secure delivery options and complete checkout.</p>
          <Link to="/login?redirect=checkout" className="btn btn-primary">
            Log In to Checkout
          </Link>
        </div>
      </div>
    );
  }

  // Cart Guard
  if (cart.length === 0 && !placedOrderId) {
    return (
      <div className="container checkout-empty-guard animate-scale-in">
        <div className="auth-guard-card card-panel">
          <ShoppingBag size={64} className="guard-icon" />
          <h2>Your Cart is Empty</h2>
          <p>You cannot check out with an empty basket. Please add items to your cart first.</p>
          <Link to="/catalog" className="btn btn-primary">Browse Catalog</Link>
        </div>
      </div>
    );
  }

  // Calculations
  const shippingThreshold = 35000;
  const shippingCost = cartTotal >= shippingThreshold ? 0 : 500;
  const discountAmount = (cartTotal * discountPercentage) / 100;
  const taxRate = 0.08;
  const taxAmount = (cartTotal - discountAmount) * taxRate;
  const grandTotal = cartTotal - discountAmount + shippingCost + taxAmount;

  // Form Submit Handler
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    
    // Create the order in global state
    const orderId = createOrder();
    if (orderId) {
      setPlacedOrderId(orderId);
    }
  };

  if (placedOrderId) {
    return (
      <div className="container checkout-success-page animate-scale-in">
        <div className="success-card card-panel text-center">
          <CheckCircle size={72} className="success-icon" />
          <h2>Order Placed Successfully!</h2>
          <p className="order-number">Order ID: <strong>{placedOrderId}</strong></p>
          <p className="success-desc">
            Thank you for shopping with ElectroPulse! We have received your order. 
            You can monitor processing, customs documentation, and courier hand-off inside your profile portal.
          </p>
          <div className="success-actions">
            <Link to="/profile" className="btn btn-primary">
              View Order History
            </Link>
            <Link to="/catalog" className="btn btn-secondary">
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page container animate-fade-in">
      <div className="checkout-header">
        <h1>Secure Checkout</h1>
        <p>Complete your delivery and payment credentials</p>
      </div>

      <form onSubmit={handleSubmitOrder} className="checkout-layout-grid">
        {/* Form Inputs Column */}
        <div className="checkout-form-column">
          {/* Shipping Form */}
          <div className="checkout-form-section card-panel">
            <div className="section-title">
              <Truck size={20} className="icon-blue" />
              <h3>1. Shipping Information</h3>
            </div>
            
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="Jane Doe" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Delivery Address</label>
              <input 
                type="text" 
                placeholder="123 tech parkway, suite 4" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="form-control"
              />
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label>City</label>
                <input 
                  type="text" 
                  placeholder="New York" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>ZIP / Postal Code</label>
                <input 
                  type="text" 
                  placeholder="10001" 
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="checkout-form-section card-panel">
            <div className="section-title">
              <CreditCard size={20} className="icon-pink" />
              <h3>2. Payment Credentials</h3>
            </div>

            <div className="form-group">
              <label>Card Number</label>
              <input 
                type="text" 
                placeholder="4111 2222 3333 4444" 
                maxLength="19"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                className="form-control"
              />
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label>Expiration Date</label>
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  maxLength="5"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>CVV / CVC Code</label>
                <input 
                  type="password" 
                  placeholder="***" 
                  maxLength="3"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order review Column */}
        <div className="checkout-summary-column">
          <div className="checkout-summary-card card-panel">
            <h3>Review Your Order</h3>
            
            {/* Items scroll */}
            <div className="checkout-items-preview">
              {cart.map((item) => (
                <div key={item.product.id} className="preview-item">
                  <span className="preview-qty">{item.quantity}x</span>
                  <span className="preview-name">{item.product.name}</span>
                  <span className="preview-price">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <hr />

            {/* Calculations recap */}
            <div className="summary-calc-rows">
              <div className="calc-row">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              
              {discountPercentage > 0 && (
                <div className="calc-row discount-row">
                  <span>Discount ({discountPercentage}%)</span>
                  <span>-₹{Math.round(discountAmount).toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="calc-row">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost.toLocaleString('en-IN')}`}</span>
              </div>

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

            {/* Submit CTA */}
            <button type="submit" className="btn btn-primary place-order-btn">
              <span>Place Order (₹{Math.round(grandTotal).toLocaleString('en-IN')})</span>
              <ChevronRight size={18} />
            </button>

            <p className="payment-disclaimer">
              By clicking place order you authorize charging your payment credentials for the order total above.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
