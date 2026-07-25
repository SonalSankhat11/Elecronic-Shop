import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { ProductCard } from '../components/ProductCard';
import { Filter, RotateCcw, Search, SlidersHorizontal } from 'lucide-react';

export const Catalog = () => {
  const { products, setSearchQuery } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Parse URL Search Query Params
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category') || 'all';
  const searchParam = queryParams.get('search') || '';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popularity');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Sync local state if search query updates elsewhere
  useEffect(() => {
    // Search is handled directly
  }, [searchParam]);

  // Categories definition
  const categories = [
    { name: 'All Categories', value: 'all' },
    { name: 'Laptops', value: 'laptops' },
    { name: 'Smartphones', value: 'smartphones' },
    { name: 'Audio', value: 'audio' },
    { name: 'Wearables', value: 'wearables' },
    { name: 'Smart Home', value: 'smart-home' }
  ];

  // Filtering Logic
  const filteredProducts = products.filter((product) => {
    // 1. Category Filter
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    // 2. Search Filter
    const matchesSearch = !searchParam || 
      product.name.toLowerCase().includes(searchParam.toLowerCase()) ||
      product.description.toLowerCase().includes(searchParam.toLowerCase()) ||
      product.category.toLowerCase().includes(searchParam.toLowerCase());
      
    // 3. Price Filter
    const matchesPrice = product.price <= maxPrice;
    
    // 4. Rating Filter
    const matchesRating = product.rating >= minRating;

    return matchesCategory && matchesSearch && matchesPrice && matchesRating;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    }
    if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    // Default: Popularity (reviewsCount * rating)
    return (b.reviewsCount * b.rating) - (a.reviewsCount * a.rating);
  });

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setMaxPrice(200000);
    setMinRating(0);
    setSortBy('popularity');
    setSearchQuery('');
    navigate('/catalog');
  };

  const handleCategoryFilterClick = (catVal) => {
    setSelectedCategory(catVal);
    // update URL query
    if (catVal === 'all') {
      navigate('/catalog');
    } else {
      navigate(`/catalog?category=${catVal}${searchParam ? `&search=${searchParam}` : ''}`);
    }
  };

  return (
    <div className="catalog-page container animate-fade-in">
      {/* Title / Breadcrumbs */}
      <div className="catalog-header">
        <div className="catalog-title-box">
          <h1>
            {selectedCategory !== 'all' ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : 'Catalog'}
            {searchParam && ` • Search results for "${searchParam}"`}
          </h1>
          <p>Displaying {sortedProducts.length} premium tech items</p>
        </div>

        {/* Sort controls */}
        <div className="catalog-sort-box">
          <label htmlFor="sort-select">Sort By</label>
          <select 
            id="sort-select" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="form-control sort-select"
          >
            <option value="popularity">Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>

          {/* Mobile Filter Toggle */}
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)} 
            className="btn btn-secondary mobile-filter-btn"
          >
            <SlidersHorizontal size={18} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="catalog-layout">
        {/* Sidebar Filters */}
        <aside className={`catalog-sidebar ${showMobileFilters ? 'mobile-visible' : ''}`}>
          <div className="sidebar-header">
            <h3><Filter size={18} /> Filters</h3>
            <button onClick={handleResetFilters} className="btn-reset-filters" title="Reset Filters">
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>

          <div className="filter-group-block">
            <h4>Categories</h4>
            <div className="category-filter-list">
              {categories.map((cat) => (
                <button 
                  key={cat.value}
                  onClick={() => handleCategoryFilterClick(cat.value)}
                  className={`category-filter-btn ${selectedCategory === cat.value ? 'active' : ''}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group-block">
            <h4>Max Price: <span>₹{maxPrice.toLocaleString('en-IN')}</span></h4>
            <input 
              type="range" 
              min="5000" 
              max="200000" 
              step="5000"
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-range-slider"
            />
            <div className="price-range-labels">
              <span>₹5,000</span>
              <span>₹2,00,000</span>
            </div>
          </div>
          <div className="filter-group-block">
            <h4>Minimum Rating</h4>
            <div className="rating-filter-options">
              {[0, 4.3, 4.5, 4.7].map((stars) => (
                <button 
                  key={stars}
                  onClick={() => setMinRating(stars)}
                  className={`rating-filter-btn ${minRating === stars ? 'active' : ''}`}
                >
                  {stars === 0 ? 'Any Rating' : `${stars}+ Stars`}
                </button>
              ))}
            </div>
          </div>
          
          {showMobileFilters && (
            <button 
              onClick={() => setShowMobileFilters(false)}
              className="btn btn-primary close-mobile-filters"
            >
              Apply Filters
            </button>
          )}
        </aside>

        {/* Catalog Grid */}
        <main className="catalog-products-main">
          {sortedProducts.length > 0 ? (
            <div className="grid-3">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="catalog-empty-state card-panel animate-scale-in">
              <Search size={48} className="empty-icon" />
              <h3>No matching products found</h3>
              <p>Try broadening your price range, choosing another category, or clearing your search keywords.</p>
              <button onClick={handleResetFilters} className="btn btn-primary">
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
