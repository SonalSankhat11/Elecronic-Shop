import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { Lock, Mail, User, ShieldCheck } from 'lucide-react';

export const Auth = () => {
  const { login, signup, user } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Read redirect query parameter
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '/';

  // Toggle state
  const [isLogin, setIsLogin] = useState(true);

  // Input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // If already logged in, redirect immediately
  if (user) {
    navigate(redirectPath);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Quick validations
    if (!email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (isLogin) {
      // Run mock login
      const success = login(email, password);
      if (success) {
        navigate(redirectPath);
      } else {
        setErrorMsg('Mock authentication failed. Try any email & password.');
      }
    } else {
      // Run mock signup
      if (!name.trim()) {
        setErrorMsg('Please specify a username.');
        return;
      }
      const success = signup(name, email, password);
      if (success) {
        navigate(redirectPath);
      } else {
        setErrorMsg('Registration failed. Try again.');
      }
    }
  };

  return (
    <div className="auth-page container animate-fade-in">
      <div className="auth-card card-panel animate-scale-in">
        
        {/* Toggle headers */}
        <div className="auth-header">
          <div className="auth-tabs">
            <button 
              onClick={() => { setIsLogin(true); setErrorMsg(''); }}
              className={`auth-tab-btn ${isLogin ? 'active' : ''}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => { setIsLogin(false); setErrorMsg(''); }}
              className={`auth-tab-btn ${!isLogin ? 'active' : ''}`}
            >
              Register
            </button>
          </div>
          <p className="auth-subtitle">
            {isLogin ? 'Sign in to access your wishlist, track orders and configure setup.' : 'Create an account to join ElectroPulse.'}
          </p>
        </div>

        {errorMsg && (
          <div className="auth-error-banner animate-slide-up">
            {errorMsg}
          </div>
        )}

        {/* Auth form */}
        <form onSubmit={handleSubmit} className="auth-form-fields">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name-input">Full Name</label>
              <div className="input-with-icon">
                <User className="input-field-icon" size={18} />
                <input 
                  id="name-input"
                  type="text" 
                  placeholder="Jane Smith" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email-input">Email Address</label>
            <div className="input-with-icon">
              <Mail className="input-field-icon" size={18} />
              <input 
                id="email-input"
                type="email" 
                placeholder="jane@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password-input">Password</label>
            <div className="input-with-icon">
              <Lock className="input-field-icon" size={18} />
              <input 
                id="password-input"
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary submit-auth-btn">
            {isLogin ? 'Sign In' : 'Register Account'}
          </button>
        </form>

        <div className="auth-mock-info">
          <ShieldCheck size={14} />
          <span>Note: Use any password and email format to mock test authentication.</span>
        </div>
      </div>
    </div>
  );
};
