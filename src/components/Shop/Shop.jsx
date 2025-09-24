import { useContext, useState, useEffect } from 'react';
import { QuestionContext } from '../../Context';
import './Shop.css';

function Shop() {
  const {
    message1, // USD
    setMessage1,
    message2, // EUR
    setMessage2,
    message3, // XAF
    setMessage3,
    message4, // CNY
    setMessage4,
  } = useContext(QuestionContext);

  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const currencyData = {
    USD: { balance: message1, setter: setMessage1, symbol: '$', flag: '🇺🇸' },
    EUR: { balance: message2, setter: setMessage2, symbol: '€', flag: '🇪🇺' },
    XAF: { balance: message3, setter: setMessage3, symbol: 'F', flag: '🇨🇲' },
    CNY: { balance: message4, setter: setMessage4, symbol: '¥', flag: '🇨🇳' },
  };

  const products = [
    {
      id: 1,
      name: 'Premium Headphones',
      description:
        'Wireless noise-canceling headphones with premium sound quality',
      price: { USD: 299.99, EUR: 279.99, XAF: 180000, CNY: 2039.99 },
      category: 'electronics',
      image: '🎧',
      rating: 4.8,
      inStock: true,
    },
    {
      id: 2,
      name: 'Smart Watch',
      description: 'Advanced fitness tracker with heart rate monitoring',
      price: { USD: 249.99, EUR: 229.99, XAF: 150000, CNY: 1699.99 },
      category: 'electronics',
      image: '⌚',
      rating: 4.6,
      inStock: true,
    },
    {
      id: 3,
      name: 'Designer Backpack',
      description: 'Stylish and durable backpack for work or travel',
      price: { USD: 89.99, EUR: 79.99, XAF: 54000, CNY: 611.99 },
      category: 'fashion',
      image: '🎒',
      rating: 4.5,
      inStock: true,
    },
    {
      id: 4,
      name: 'Coffee Machine',
      description: 'Professional espresso machine for perfect coffee',
      price: { USD: 599.99, EUR: 549.99, XAF: 360000, CNY: 4079.99 },
      category: 'home',
      image: '☕',
      rating: 4.9,
      inStock: true,
    },
    {
      id: 5,
      name: 'Fitness Tracker',
      description: 'Lightweight fitness band with sleep tracking',
      price: { USD: 79.99, EUR: 69.99, XAF: 48000, CNY: 543.99 },
      category: 'electronics',
      image: '⌚',
      rating: 4.3,
      inStock: true,
    },
    {
      id: 6,
      name: 'Luxury Wallet',
      description: 'Genuine leather wallet with RFID protection',
      price: { USD: 149.99, EUR: 139.99, XAF: 90000, CNY: 1019.99 },
      category: 'fashion',
      image: '👛',
      rating: 4.7,
      inStock: true,
    },
    {
      id: 7,
      name: 'Smart Home Speaker',
      description: 'Voice-controlled speaker with smart home integration',
      price: { USD: 129.99, EUR: 119.99, XAF: 78000, CNY: 883.99 },
      category: 'home',
      image: '🔊',
      rating: 4.4,
      inStock: true,
    },
    {
      id: 8,
      name: 'Gaming Mouse',
      description: 'High-precision gaming mouse with RGB lighting',
      price: { USD: 69.99, EUR: 59.99, XAF: 42000, CNY: 475.99 },
      category: 'electronics',
      image: '🖱️',
      rating: 4.6,
      inStock: true,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'fashion', name: 'Fashion', icon: '👔' },
    { id: 'home', name: 'Home & Kitchen', icon: '🏠' },
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    showNotification(`Added ${product.name} to cart`, 'success');
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
    showNotification('Removed from cart', 'success');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = (currency) => {
    return cart.reduce(
      (total, item) => total + item.price[currency] * item.quantity,
      0
    );
  };

  const purchaseWithCurrency = (currency) => {
    setIsProcessing(true);
    const totalPrice = getTotalPrice(currency);
    const currencyInfo = currencyData[currency];

    if (currencyInfo.balance < totalPrice) {
      showNotification(`Insufficient ${currency} balance`, 'error');
      setIsProcessing(false);
      return;
    }

    setTimeout(() => {
      currencyInfo.setter(currencyInfo.balance - totalPrice);
      showNotification(
        `Purchase successful! Paid ${currencyInfo.symbol}${totalPrice.toFixed(
          2
        )} ${currency}`,
        'success'
      );
      setCart([]);
      setIsProcessing(false);
    }, 1500);
  };

  const totalBalance = message1 + message2 + message3 + message4;
  const cartTotal = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="shop">
      {notification && (
        <div className={`notification ${notification.type}`}>
          <span>{notification.message}</span>
          <button type="button" onClick={() => setNotification(null)}>
            ×
          </button>
        </div>
      )}

      <div className={`shop-container ${isVisible ? 'visible' : ''}`}>
        {/* Header */}
        <div className="shop-header">
          <h1>🛍️ Digital Shop</h1>
          <p>Shop with your digital wallet balance</p>
          <div className="balance-summary">
            <span>Total Balance: ${totalBalance.toFixed(2)}</span>
          </div>
        </div>

        {/* Categories */}
        <div className="categories-section">
          <h2>Categories</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                className={`category-btn ${
                  selectedCategory === category.id ? 'active' : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="products-section">
          <div className="section-header">
            <h2>
              {selectedCategory === 'all'
                ? 'All Products'
                : categories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <span className="product-count">
              {filteredProducts.length} products
            </span>
          </div>

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <span>{product.image}</span>
                  <div className="product-rating">
                    <span>⭐</span>
                    <span>{product.rating}</span>
                  </div>
                </div>

                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>

                  <div className="product-prices">
                    {Object.entries(currencyData).map(([currency, data]) => (
                      <div key={currency} className="price-option">
                        <span className="currency-flag">{data.flag}</span>
                        <span className="price">
                          {data.symbol}
                          {product.price[currency].toFixed(2)} {currency}
                        </span>
                        <span
                          className={`balance ${
                            data.balance >= product.price[currency]
                              ? 'sufficient'
                              : 'insufficient'
                          }`}
                        >
                          (Balance: {data.symbol}
                          {data.balance.toFixed(2)})
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary add-to-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    <span>🛒</span>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Cart */}
        {cart.length > 0 && (
          <div className="cart-section">
            <div className="cart-header">
              <h2>🛒 Shopping Cart ({cartTotal} items)</h2>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setCart([])}
              >
                Clear Cart
              </button>
            </div>

            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <span className="cart-item-image">{item.image}</span>
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <div className="quantity-controls">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="checkout-section">
              <h3>Choose Payment Currency</h3>
              <div className="payment-options">
                {Object.entries(currencyData).map(([currency, data]) => {
                  const total = getTotalPrice(currency);
                  const canAfford = data.balance >= total;

                  return (
                    <div
                      key={currency}
                      className={`payment-option ${
                        !canAfford ? 'insufficient' : ''
                      }`}
                    >
                      <div className="payment-info">
                        <span className="currency-flag">{data.flag}</span>
                        <div className="payment-details">
                          <span className="currency-name">{currency}</span>
                          <span className="total-price">
                            Total: {data.symbol}
                            {total.toFixed(2)}
                          </span>
                          <span className="balance-info">
                            Balance: {data.symbol}
                            {data.balance.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className={`btn ${
                          canAfford ? 'btn-success' : 'btn-disabled'
                        }`}
                        onClick={() => purchaseWithCurrency(currency)}
                        disabled={!canAfford || isProcessing}
                      >
                        {isProcessing ? <div className="loading" /> : '💳'}
                        {isProcessing
                          ? 'Processing...'
                          : canAfford
                          ? 'Buy Now'
                          : 'Insufficient Funds'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
