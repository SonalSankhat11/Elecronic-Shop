import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { ProductCard } from '../components/ProductCard';
import { 
  Laptop, 
  Smartphone, 
  Headphones, 
  Watch, 
  Home as HomeIcon, 
  Truck, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const Home = () => {
  const { products } = useContext(AppContext);
  const navigate = useNavigate();
  
  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      title: 'Redefine Your Audio Space',
      subtitle: 'SonicANC Prime Wireless',
      desc: 'Immersive sound with hybrid active noise cancellation. Block out the noise and live in the music.',
      price: '₹29,999',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
      category: 'audio',
      id: 'aud-1'
    },
    {
      title: 'Power Meets Portability',
      subtitle: 'ZenithBlade 16" Pro',
      desc: 'Equipped with Core i9 14th Gen and NVIDIA RTX 4080. Create, game, and design with no limits.',
      price: '₹1,89,999',
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80',
      category: 'laptops',
      id: 'lap-1'
    },
    {
      title: 'Next-Gen Mobile Vision',
      subtitle: 'Aura 15 Pro',
      desc: 'Features a 108MP triple camera system and Aura A3 neural processor for high-speed computation.',
      price: '₹99,999',
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop&q=80',
      category: 'smartphones',
      id: 'ph-1'
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  // Categories definition
  const categoriesList = [
    { name: 'Laptops', id: 'laptops', icon: <Laptop size={24} /> },
    { name: 'Smartphones', id: 'smartphones', icon: <Smartphone size={24} /> },
    { name: 'Audio', id: 'audio', icon: <Headphones size={24} /> },
    { name: 'Wearables', id: 'wearables', icon: <Watch size={24} /> },
    { name: 'Smart Home', id: 'smart-home', icon: <HomeIcon size={24} /> }
  ];

  const handleCategoryClick = (id) => {
    navigate(`/catalog?category=${id}`);
  };

  // Get featured products
  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="home-page animate-fade-in">
      {/* 1. Hero Carousel */}
      <section className="hero-section">
        <div className="hero-slide-container">
          {heroSlides.map((slide, idx) => (
            <div 
              key={idx} 
              className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}
            >
              {idx === currentSlide && (
                <div className="container slide-content-grid">
                  <div className="slide-text-side animate-slide-up">
                    <span className="slide-tag badge badge-secondary">Featured Release</span>
                    <h1 className="slide-title">{slide.title}</h1>
                    <h2 className="slide-subtitle">{slide.subtitle}</h2>
                    <p className="slide-desc">{slide.desc}</p>
                    <div className="slide-actions">
                      <button 
                        onClick={() => navigate(`/product/${slide.id}`)}
                        className="btn btn-primary"
                      >
                        Buy Now • {slide.price}
                      </button>
                      <button 
                        onClick={() => navigate('/catalog')}
                        className="btn btn-secondary"
                      >
                        Explore Store
                      </button>
                    </div>
                  </div>
                  <div className="slide-image-side animate-scale-in">
                    <div className="slide-image-wrapper">
                      <img src={slide.image} alt={slide.subtitle} className="slide-image" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Carousel Nav Buttons */}
        <button onClick={prevSlide} className="carousel-nav-btn prev">
          <ChevronLeft size={20} />
        </button>
        <button onClick={nextSlide} className="carousel-nav-btn next">
          <ChevronRight size={20} />
        </button>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {heroSlides.map((_, idx) => (
            <button 
              key={idx} 
              className={`indicator-dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
            ></button>
          ))}
        </div>
      </section>

      {/* 2. Shop by Category */}
      <section className="categories-section container">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Find the best devices optimized for your workflow.</p>
        </div>
        <div className="categories-grid">
          {categoriesList.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => handleCategoryClick(cat.id)}
              className="category-bubble-card"
            >
              <div className="category-icon-wrapper">
                {cat.icon}
              </div>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Promo Banner Panel */}
      <section className="promo-banner-section container">
        <div className="promo-panel card-panel">
          <div className="promo-text">
            <span className="badge badge-success">Limited Time Offer</span>
            <h2>Get the Pulse Smart Setup</h2>
            <p>Combine any laptop purchase with audio headphones to unlock an extra ₹150 credit. Sourced directly from major designers.</p>
            <button onClick={() => navigate('/catalog')} className="btn btn-accent">
              <span>Collect Discount</span>
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="promo-visual">
            <div className="visual-circle cyan"></div>
            <div className="visual-circle magenta"></div>
          </div>
        </div>
      </section>

      {/* 4. Featured Product Grid */}
      <section className="featured-section container">
        <div className="section-header-row">
          <div className="section-header">
            <h2>Trending Devices</h2>
            <p>Our top rated gear of the week.</p>
          </div>
          <button onClick={() => navigate('/catalog')} className="btn btn-secondary view-all-btn">
            <span>View All Products</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="grid-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Trust / Features Banner */}
      <section className="trust-factors-section container">
        <div className="grid-3">
          <div className="trust-card card-panel">
            <Truck size={32} className="trust-icon" />
            <h3>Rapid Insured Delivery</h3>
            <p>Free priority shipping on all orders over ₹350. Fully insured transit protection.</p>
          </div>
          <div className="trust-card card-panel">
            <ShieldCheck size={32} className="trust-icon" />
            <h3>2-Year Hardware Warranty</h3>
            <p>Complimentary product warranty on all electrical components. Direct replacements.</p>
          </div>
          <div className="trust-card card-panel">
            <HelpCircle size={32} className="trust-icon" />
            <h3>24/7 Expert Ticket Support</h3>
            <p>Connect with a tech expert whenever you need configurations or set up questions.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
