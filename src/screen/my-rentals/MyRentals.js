import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import './MyRentals.css';

// Imagens de fallback em ordem de prioridade
const fallbackImages = [
  'https://via.placeholder.com/320x450?text=Imagem+Indisponível',
  'https://via.placeholder.com/320x450?text=Quadrinho',
  'https://via.placeholder.com/320x450?text=HQ'
];

const MyRentals = () => {
  // Recuperar os quadrinhos reservados e comprados do localStorage
  const rentedComics = JSON.parse(localStorage.getItem('rentedComics')) || [];
  const purchasedComics = JSON.parse(localStorage.getItem('purchasedComics')) || [];

  const handlePurchase = (comic) => {
    // Remover o quadrinho da lista de reservados
    const updatedRentedComics = rentedComics.filter(c => c.id !== comic.id);
    localStorage.setItem('rentedComics', JSON.stringify(updatedRentedComics));

    // Adicionar o quadrinho à lista de comprados
    const comicWithDate = { ...comic, date: new Date().toLocaleDateString() };
    const updatedPurchasedComics = [...purchasedComics, comicWithDate];
    localStorage.setItem('purchasedComics', JSON.stringify(updatedPurchasedComics));

    alert(`Quadrinho "${comic.title}" comprado com sucesso!`);
    window.location.reload(); // Recarregar a página para atualizar as listas
  };

  const ComicGrid = ({ comics, type }) => {
    const [imgSrcs, setImgSrcs] = useState({});
    const [fallbackIndex, setFallbackIndex] = useState({});
    const [retryCount, setRetryCount] = useState({});
    const maxRetries = 3;

    useEffect(() => {
      // Tentar carregar do cache local primeiro
      comics.forEach(comic => {
        const cachedSrc = localStorage.getItem(`comic_img_${comic.id}`);
        if (cachedSrc) {
          setImgSrcs(prev => ({ ...prev, [comic.id]: cachedSrc }));
        } else {
          loadImage(comic);
        }
      });
    }, [comics]);

    const loadImage = (comic) => {
      const img = new Image();
      img.src = comic.image;
      
      img.onload = () => {
        setImgSrcs(prev => ({ ...prev, [comic.id]: comic.image }));
        localStorage.setItem(`comic_img_${comic.id}`, comic.image);
      };
      
      img.onerror = () => handleImageError(comic.id, comic.image);
    };

    const handleImageError = (comicId, originalSrc) => {
      setRetryCount(prev => {
        const currentRetry = (prev[comicId] || 0) + 1;
        return { ...prev, [comicId]: currentRetry };
      });

      if (retryCount[comicId] < maxRetries) {
        // Tentar carregar a imagem novamente após um breve delay
        setTimeout(() => {
          const img = new Image();
          img.src = originalSrc + '?retry=' + retryCount[comicId];
          img.onload = () => {
            setImgSrcs(prev => ({ ...prev, [comicId]: originalSrc }));
            localStorage.setItem(`comic_img_${comicId}`, originalSrc);
          };
          img.onerror = () => handleImageError(comicId, originalSrc);
        }, 1000 * retryCount[comicId]);
      } else {
        // Após todas as tentativas, usar o sistema de fallback
        setFallbackIndex(prev => {
          const currentIndex = (prev[comicId] || 0);
          const nextIndex = currentIndex < fallbackImages.length - 1 ? currentIndex + 1 : 0;
          return { ...prev, [comicId]: nextIndex };
        });

        const fallbackSrc = fallbackImages[fallbackIndex[comicId] || 0];
        setImgSrcs(prev => ({ ...prev, [comicId]: fallbackSrc }));
        localStorage.setItem(`comic_img_${comicId}`, fallbackSrc);
      }
    };

    return (
      <div className="comics-grid">
        {comics.map((comic) => (
          <div key={comic.id} className="comic-card">
            <img 
              src={imgSrcs[comic.id] || comic.image} 
              alt={comic.title}
              onError={() => handleImageError(comic.id)}
              loading="lazy"
            />
            <div className="comic-info">
              <h3>{comic.title}</h3>
              <p>por {comic.author}</p>
              <p>Data: {comic.date}</p>
              {type === 'reserved' && (
                <button
                  className="purchase-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePurchase(comic);
                  }}
                >
                  Comprar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="my-rentals-container">
      <Navbar />
      <div className="my-rentals-content">
        <h1>Meu Carrinho</h1>
        
        <section className="comics-section">
          <h2>Quadrinhos Reservados</h2>
          {rentedComics.length === 0 ? (
            <p>Você ainda não possui quadrinhos reservados.</p>
          ) : (
            <ComicGrid comics={rentedComics} type="reserved" />
          )}
        </section>

        <section className="comics-section">
          <h2>Quadrinhos Comprados</h2>
          {purchasedComics.length === 0 ? (
            <p>Você ainda não possui quadrinhos comprados.</p>
          ) : (
            <ComicGrid comics={purchasedComics} type="purchased" />
          )}
        </section>
      </div>
    </div>
  );
};

export default MyRentals;
