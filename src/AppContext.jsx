import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

// High-quality mock electronics products catalog
const initialProducts = [
  {
    id: 'lap-1',
    name: 'ZenithBlade 16" Pro',
    category: 'laptops',
    price: 189999,
    rating: 4.8,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80',
    description: 'The ultimate creator and gaming powerhouse. Equipped with the latest generation processor, 32GB RAM, and a stunning 120Hz Mini-LED display.',
    stock: 12,
    featured: true,
    specs: {
      Display: '16-inch Mini-LED (3200 x 2000), 120Hz',
      Processor: 'Intel Core i9 14th Gen',
      RAM: '32GB DDR5',
      Storage: '1TB NVMe PCIe 4.0 SSD',
      Graphics: 'NVIDIA RTX 4080 (12GB GDDR6)'
    }
  },
  {
    id: 'lap-2',
    name: 'AeroBook Carbon 14',
    category: 'laptops',
    price: 124999,
    rating: 4.6,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1496181130204-755241544e35?w=600&auto=format&fit=crop&q=80',
    description: 'Feather-light design with heavyweight endurance. Constructed from aerospace-grade carbon fiber, offering up to 18 hours of battery life.',
    stock: 18,
    featured: false,
    specs: {
      Display: '14-inch IPS (2560 x 1600), 60Hz',
      Processor: 'AMD Ryzen 7 7840U',
      RAM: '16GB LPDDR5X',
      Storage: '512GB NVMe SSD',
      Battery: '75Wh (up to 18 hrs)'
    }
  },
  {
    id: 'ph-1',
    name: 'Aura 15 Pro',
    category: 'smartphones',
    price: 99999,
    rating: 4.9,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
    description: 'Experience mobile photography re-engineered. Features a 108MP triple camera system, liquid crystal screen, and lightning-fast neural processor.',
    stock: 25,
    featured: true,
    specs: {
      Display: '6.7-inch OLED, 120Hz, HDR10+',
      Processor: 'Aura A3 Bionic',
      Camera: '108MP Main + 48MP Telephoto + 12MP Ultra-wide',
      Battery: '5000mAh with 65W charging',
      OS: 'AuraOS 17'
    }
  },
  {
    id: 'ph-2',
    name: 'Nexus Flip X',
    category: 'smartphones',
    price: 119999,
    rating: 4.5,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    description: 'Foldable technology that fits perfectly in your palm. Features a zero-gap hinge mechanism and a versatile cover display for quick interactions.',
    stock: 8,
    featured: false,
    specs: {
      'Main Display': '6.9-inch Foldable AMOLED, 120Hz',
      'Cover Display': '1.9-inch AMOLED',
      Processor: 'Snapdragon 8 Gen 3',
      RAM: '12GB',
      Storage: '256GB UFS 4.0'
    }
  },
  {
    id: 'aud-1',
    name: 'SonicANC Prime Wireless',
    category: 'audio',
    price: 29999,
    rating: 4.7,
    reviewsCount: 512,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    description: 'Immersive sound, absolute quiet. Hybrid Active Noise Cancelling headphones with high-res audio drivers, premium memory foam, and 45h play time.',
    stock: 30,
    featured: true,
    specs: {
      Type: 'Over-ear, Closed-back',
      Drivers: '40mm Titanium Dome',
      Connectivity: 'Bluetooth 5.3 & LDAC Codec',
      'Battery Life': 'Up to 45 Hours (ANC On)',
      Weight: '250g'
    }
  },
  {
    id: 'aud-2',
    name: 'EchoBuds Pro 2',
    category: 'audio',
    price: 14999,
    rating: 4.4,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
    description: 'True wireless earbuds optimized for active lifestyles. Ergonomic secure-fit design, water resistant, and crystal clear spatial audio.',
    stock: 45,
    featured: false,
    specs: {
      Type: 'In-ear, True Wireless',
      Waterproof: 'IPX7 Rated',
      'Battery Life': '8 hours (32 hours total with case)',
      Charging: 'USB-C & Qi Wireless Charging',
      Features: 'Spatial Audio, Touch Control'
    }
  },
  {
    id: 'wear-1',
    name: 'Chronos SmartWatch 4',
    category: 'wearables',
    price: 34999,
    rating: 4.6,
    reviewsCount: 176,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    description: 'Track your health, elevate your style. Premium circular stainless steel design with active cellular connectivity, ECG tracking, and fitness coaching.',
    stock: 15,
    featured: true,
    specs: {
      Display: '1.43-inch Always-On AMOLED',
      Material: 'Stainless Steel Case, Sapphire Glass',
      Sensors: 'ECG, SpO2, Heart Rate, Accelerometer',
      Connectivity: 'LTE, GPS, Wi-Fi, NFC',
      Battery: 'Up to 3 Days'
    }
  },
  {
    id: 'wear-2',
    name: 'Pulse Band Active',
    category: 'wearables',
    price: 7999,
    rating: 4.3,
    reviewsCount: 92,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&auto=format&fit=crop&q=80',
    description: 'The lightweight fitness tracker built for daily progress. Continuously tracks active minutes, sleep stages, stress levels, and heart rate.',
    stock: 60,
    featured: false,
    specs: {
      Display: '1.1-inch Color OLED Touch',
      Weight: '22g',
      'Battery Life': 'Up to 10 Days',
      Waterproof: '50m Water Resistant',
      Compatibility: 'iOS & Android'
    }
  },
  {
    id: 'home-1',
    name: 'Lumina Voice Hub',
    category: 'smart-home',
    price: 12999,
    rating: 4.5,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=600&auto=format&fit=crop&q=80',
    description: 'The smart speaker that coordinates your life. High-fidelity 360-degree acoustic sound meets state-of-the-art voice AI control.',
    stock: 22,
    featured: false,
    specs: {
      Audio: '3.0-inch Woofer & Dual Tweeters',
      Microphones: '5 Far-Field Array',
      Connectivity: 'Wi-Fi 6, Bluetooth 5.0, Matter Protocol',
      Dimensions: '150mm x 150mm x 165mm',
      AI: 'Voice assistant pre-integrated'
    }
  },
  {
    id: 'home-2',
    name: 'Sentinel GuardCam Pro',
    category: 'smart-home',
    price: 19999,
    rating: 4.8,
    reviewsCount: 115,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80',
    description: 'Keep watch in ultra-crisp 4K resolution. Advanced AI motion sorting, smart color night vision, and continuous rechargeable battery hookup.',
    stock: 14,
    featured: true,
    specs: {
      Resolution: '4K Ultra HD (8MP)',
      'Field of View': '160 Degrees Diagonal',
      Power: 'Rechargeable Battery & Solar Panel Support',
      Storage: 'Local MicroSD (up to 256GB) & Cloud Options',
      Weatherproof: 'IP66 Rated'
    }
  }
];

export const AppProvider = ({ children }) => {
  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'; // Premium dark mode by default
  });

  // User Auth State
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      if (parsed.avatar === 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80') {
        parsed.avatar = '';
        localStorage.setItem('user', JSON.stringify(parsed));
      }
      return parsed;
    }
    return null;
  });

  // Cart State
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    const savedWish = localStorage.getItem('wishlist');
    return savedWish ? JSON.parse(savedWish) : [];
  });

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Apply Theme class
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync Cart, Wishlist, User
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Theme Action
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Auth Actions
  const login = (email, password) => {
    // Simple mock authentication success
    const mockUser = {
      name: email.split('@')[0].toUpperCase(),
      email: email,
      avatar: '',
      address: '128 Innovation Way, Cyber City, NY 10001',
      gender: 'Male',
      phone: '+91 98765 43210',
      dob: '1998-05-15',
      joined: 'July 2026',
      orders: [
        { id: 'ORD-8942', date: '2026-06-15', total: 34999, status: 'Delivered', items: 'Chronos SmartWatch 4' },
        { id: 'ORD-7621', date: '2026-05-10', total: 14999, status: 'Delivered', items: 'EchoBuds Pro 2' }
      ]
    };
    setUser(mockUser);
    return true;
  };

  const signup = (name, email, password) => {
    const newUser = {
      name: name,
      email: email,
      avatar: '',
      address: 'Enter shipping address',
      gender: 'Prefer not to say',
      phone: '',
      dob: '',
      joined: 'July 2026',
      orders: []
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updatedData) => {
    setUser((prev) => ({
      ...prev,
      ...updatedData
    }));
  };

  // Cart Actions
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = () => {
    if (!user || cart.length === 0) return null;
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      total: cartTotal,
      status: 'Processing',
      items: cart.map(item => `${item.product.name} (x${item.quantity})`).join(', ')
    };
    
    // Update user orders
    setUser(prev => ({
      ...prev,
      orders: [newOrder, ...prev.orders]
    }));
    
    clearCart();
    return orderId;
  };

  // Wishlist Actions
  const toggleWishlist = (product) => {
    setWishlist((prevWish) => {
      const isAlreadyWish = prevWish.some((item) => item.id === product.id);
      if (isAlreadyWish) {
        return prevWish.filter((item) => item.id !== product.id);
      }
      return [...prevWish, product];
    });
  };

  // Calculate cart counts & totals
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        products: initialProducts,
        theme,
        toggleTheme,
        user,
        login,
        signup,
        logout,
        updateProfile,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        createOrder,
        wishlist,
        toggleWishlist,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
