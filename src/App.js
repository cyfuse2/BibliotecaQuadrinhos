import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Register from './screen/register/register';
import Login from './screen/login/login';
import Home from './screen/home/Home';
import ComicDetail from './screen/comic-detail/ComicDetail';
import MyRentals from './screen/my-rentals/MyRentals';

// Verificar se o console está mostrando o componente Login importado
console.log('Login component:', Login);

// Componente que controla o scroll
function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  // Usando estado para controlar a autenticação
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  
  // Atualizar o estado quando o localStorage mudar e limpar o carrinho ao iniciar
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };
    
    // Verificar autenticação quando o componente montar
    checkAuth();
    
    // Limpar o carrinho ao iniciar o aplicativo
    localStorage.removeItem('rentedComics');
    localStorage.removeItem('purchasedComics');
    
    // Adicionar um event listener para detectar mudanças no localStorage
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/home" 
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/comics/:id" 
          element={isAuthenticated ? <ComicDetail /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/my-rentals" 
          element={isAuthenticated ? <MyRentals /> : <Navigate to="/login" />} 
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;