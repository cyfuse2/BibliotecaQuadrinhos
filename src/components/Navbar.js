import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiFillHome, AiOutlineShoppingCart } from 'react-icons/ai';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const rentedComics = JSON.parse(localStorage.getItem('rentedComics')) || [];
      setCartCount(rentedComics.length);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <h1 onClick={() => window.location.href = '/home'} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AiFillHome size={24} color="white" />
          QuadrinhoTeca
        </h1>
      </div>
      <div className="nav-links">
        <Link to="/my-rentals" className={location.pathname === '/my-rentals' ? 'active' : ''}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <AiOutlineShoppingCart size={20} style={{ marginRight: '5px' }} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#e74c3c',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '12px',
                minWidth: '20px',
                textAlign: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </div>
          Meu Carrinho
        </Link>
        <button onClick={onLogout} className="logout-btn">
          Sair
        </button>
      </div>
    </nav>
  );
};

export default Navbar;