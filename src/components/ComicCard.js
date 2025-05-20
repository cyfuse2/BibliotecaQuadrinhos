import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ComicCard.css';

// Imagem de fallback para quando a imagem principal falhar
const fallbackImage = 'https://via.placeholder.com/320x450?text=Imagem+Indisponível';

const ComicCard = ({ comic }) => {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState(comic.image);
  
  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleBuy = (e) => {
    e.stopPropagation();
    const purchasedComics = JSON.parse(localStorage.getItem('purchasedComics')) || [];
    const comicWithDate = { ...comic, date: new Date().toLocaleDateString() };
    purchasedComics.push(comicWithDate);
    localStorage.setItem('purchasedComics', JSON.stringify(purchasedComics));
    alert(`Quadrinho "${comic.title}" comprado com sucesso!`);
  };

  const handleReserve = (e) => {
    e.stopPropagation();
    const rentedComics = JSON.parse(localStorage.getItem('rentedComics')) || [];
    const comicWithDate = { ...comic, date: new Date().toLocaleDateString() };
    rentedComics.push(comicWithDate);
    localStorage.setItem('rentedComics', JSON.stringify(rentedComics));
    alert(`Quadrinho "${comic.title}" reservado com sucesso!`);
  };

  const handleCardClick = () => {
    navigate(`/comics/${comic.id}`);
  };

  return (
    <div className="comic-card" onClick={handleCardClick}>
      <img 
        src={imgSrc} 
        alt={comic.title} 
        className="comic-image" 
        onError={() => setImgSrc(fallbackImage)}
        loading="lazy"
      />
      <div className="comic-info">
        <h3 className="comic-title">{comic.title}</h3>
        <p className="comic-author">{comic.author}</p>
        <p className="comic-price">{formatPrice(comic.price)}</p>
        <div className="comic-actions">
          <button className="rent-btn" onClick={handleBuy}>Comprar</button>
          <button className="reserve-btn" onClick={handleReserve}>Reservar</button>
        </div>
      </div>
    </div>
  );
};

export default ComicCard;