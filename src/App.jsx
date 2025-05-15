import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import './App.css';

const PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 59.99, stock: 2, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80', description: 'High quality wireless headphones with noise cancellation.' },
  { id: 2, name: 'Gaming Mouse', category: 'Computers', price: 29.99, stock: 10, image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80', description: 'Ergonomic gaming mouse with customizable buttons.' },
  { id: 3, name: 'Smart Watch', category: 'Wearables', price: 99.99, stock: 0, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80', description: 'Track your fitness and notifications on the go.' },
];

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name}/>
        <h3>{product.name}</h3>
      </Link>
      <p className="category">{product.category}</p>
      <p className="price">${product.price.toFixed(2)}</p>
      {product.stock === 0 ? (
        <span className="out-stock">Out of Stock</span>
      ) : product.stock < 5 ? (
        <span className="low-stock">Low Stock</span>
      ) : (
        <span className="in-stock">In Stock</span>
      )}
      <button className="add-cart-btn" disabled={product.stock === 0}>Add to Cart</button>
    </div>
  );
}

function Home() {
  return (
    <section className="hero">
      <h2>Welcome to D&D Interiors.</h2>
      <p>Discover the latest electronics, gadgets, and more!</p>
      <Link to="/products">
        <button className="glow-btn">Shop Now</button>
      </Link>
      <img
        className="hero-img"
        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Shopping"
      />
    </section>
  );
}

function Products() {
  const [search, setSearch] = useState('');
  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <section className="products">
      <div className="products-header">
        <h2>All Products</h2>
        <input
          className="search-bar"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="product-list">
        {filtered.length ? filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        )) : <p>No products found.</p>}
      </div>
    </section>
  );
}

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === Number(id));
  if (!product) return <p>Product not found.</p>;
  return (
    <section className="product-details">
      <button className="back-btn" onClick={() => navigate('/products')}>← Back</button>
      <div className="details-grid">
        <img src={product.image} alt={product.name} className="details-img"/>
        <div className="details-info">
          <h2>{product.name}</h2>
          <p className="category">{product.category}</p>
          <p>{product.description}</p>
          <p className="price">${product.price.toFixed(2)}</p>
          {product.stock === 0 ? (
            <span className="out-stock">Out of Stock</span>
          ) : product.stock < 5 ? (
            <span className="low-stock">Low Stock</span>
          ) : (
            <span className="in-stock">In Stock</span>
          )}
          <button className="add-cart-btn" disabled={product.stock === 0}>Add to Cart</button>
        </div>
      </div>
    </section>
  );
}

function Login() {
  const [error, setError] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    setError('Invalid email or password.');
  };
  return (
    <section className="auth">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required/>
        <input type="password" placeholder="Password" required/>
        <button type="submit">Login</button>
      </form>
      {error && <div className="error">{error}</div>}
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </section>
  );
}

function Register() {
  const [error, setError] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    setError('Email already in use.');
  };
  return (
    <section className="auth">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" required/>
        <input type="text" placeholder="Last Name" required/>
        <input type="email" placeholder="Email" required/>
        <input type="password" placeholder="Password" required/>
        <button type="submit">Register</button>
      </form>
      {error && <div className="error">{error}</div>}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </section>
  );
}

export default function App() {
  return (
    <Router>
      <header className="navbar">
        <h1><Link to="/" className="logo-link">D&D Interiors.</Link></h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <span className="cart-icon" title="Cart">
            <svg width="28" height="28" fill="#61dafb" viewBox="0 0 24 24"><path d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-12.293-2.707l1.414 1.414c.195.195.451.293.707.293h12c.256 0 .512-.098.707-.293l1.414-1.414c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0l-1.293 1.293h-10.586l-1.293-1.293c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414z"/></svg>
          </span>
        </nav>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:id" element={<ProductDetails/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </div>
      <footer className="footer">
        <p>&copy; 2025 D&D Interiors. All rights reserved.</p>
      </footer>
    </Router>
  );
}
