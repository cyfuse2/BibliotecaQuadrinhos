import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './ComicDetail.css';


// Usando os mesmos dados do Home.js
const mockComics = [
    {
        id: 1,
        title: "Batman: O Cavaleiro das Trevas",
        author: "Frank Miller",
        price: 50.00,
        publisher: "DC Comics",
        image: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_l55ma6s55129raptum4usjoi1b/-S897-FWEBP" 
    },
    {
        id: 2,
        title: "Watchmen",
        author: "Alan Moore",
        price: 18.50,
        publisher: "DC Comics",
        image: "https://www.panini.de/media/catalog/product/cache/2d16730310b7945c46ddd1ca513e3c42/w/a/watchmen-deluxe-cover896duul02bijn_jict4ogzeuvhu5g0.jpg"
    },
    {
        id: 3,
        title: "Sandman",
        author: "Neil Gaiman",
        publisher: "DC Comics",
        price: 22.90,
        image: "https://m.media-amazon.com/images/I/61YNpOiCpbL._SY466_.jpg"
    },
    {
        id: 4,
        title: "Turma da Mônica Jovem",
        author: "Mauricio de Sousa",
        publisher: "Mauricio de Sousa Produções",
        price: 12.50,
        image: "https://m.media-amazon.com/images/I/81AhLJUoniL._SY425_.jpg"
    },
    {
        id: 5,
        title: "One Piece Vol. 1",
        author: "Eiichiro Oda",
        publisher: "Manga",
        price: 19.90,
        image: "https://m.media-amazon.com/images/I/716EGgqzyOL._SY466_.jpg"
    },
    {
        id: 6,
        title: "Naruto Vol. 1",
        author: "Masashi Kishimoto",
        publisher: "Manga",
        price: 17.90,
        image: "https://m.media-amazon.com/images/I/91xUwI2UEVL._AC_SY741_.jpg"
    },
    {
        id: 7,
        title: "Homem-Aranha: De Volta ao Lar",
        author: "Marvel Comics",
        publisher: "Marvel",
        price: 16.50,
        image: "https://imgv2-1-f.scribdassets.com/img/document/698726093/original/0cf5a384eb/1?v=1"
    },
    {
        id: 8,
        title: "Saga Vol. 1",
        author: "Brian K. Vaughan",
        publisher: "Image Comics",
        price: 24.90,
        image: "https://m.media-amazon.com/images/I/51oGjs9VJOL._SY445_SX342_.jpg"
    },
    {
        id: 9,
        title: "Berserk Vol. 1",
        author: "Kentaro Miura",
        publisher: "Manga",
        price: 29.90,
        image: "https://a-static.mlcdn.com.br/800x560/livro-berserk-vol-1/apaginadistribuidoradelivros/9788542617092/24403e16fb77d11e3044533f056ac721.jpg" 
    },
    {
        id: 10,
        title: "Akira Vol. 1",
        author: "Katsuhiro Otomo",
        publisher: "Manga",
        price: 32.50,
        image: "https://m.media-amazon.com/images/I/61ud5BuLRML._SL1000_.jpg"
    },
    {
        id: 11,
        title: "Vingadores: Guerra Infinita",
        author: "Marvel Comics",
        publisher: "Marvel",
        price: 21.90,
        image: "https://m.media-amazon.com/images/I/A1Sq8q77OfL._SY466_.jpg" 
    },
    {
        id: 12,
        title: "Turma da Mônica: Laços",
        author: "Mauricio de Sousa",
        publisher: "Mauricio de Sousa Produções",
        price: 14.90,
        image: "https://m.media-amazon.com/images/I/71VzStzoicL._SL1263_.jpg"
    },
    {
        id: 13,
        title: "Death Note Vol. 1",
        author: "Tsugumi Ohba e Takeshi Obata",
        publisher: "Manga",
        price: 18.90,
        image: "https://m.media-amazon.com/images/I/612x+rQ0yJL._SL1000_.jpg"
    },
    {
        id: 14,
        title: "V de Vingança",
        author: "Alan Moore e David Lloyd",
        publisher: "DC Comics",
        price: 26.90,
        image: "https://m.media-amazon.com/images/I/71RccWOPFKL._SL1024_.jpg"
    },
    {
        id: 15,
        title: "Persépolis",
        author: "Marjane Satrapi",
        publisher: "Quadrinhos Independentes",
        price: 27.50,
        image: "https://m.media-amazon.com/images/I/71Hda5IPs3L._SL1500_.jpg"
    },
    {
        id: 16,
        title: "Maus",
        author: "Art Spiegelman",
        publisher: "Quadrinhos Independentes",
        price: 29.90,
        image: "https://m.media-amazon.com/images/I/71nXxfnNEcL._SL1375_.jpg"
    },
    {
        id: 17,
        title: "Fullmetal Alchemist Vol. 1",
        author: "Hiromu Arakawa",
        publisher: "Manga",
        price: 24.90,
        image: "https://m.media-amazon.com/images/I/51t+BkN5sCL._SY445_SX342_PQ84_.jpg"
    },
    {
        id: 18,
        title: "Dragon Ball Vol. 1",
        author: "Akira Toriyama",
        publisher: "Manga",
        price: 19.90,
        image: "https://cdn.kobo.com/book-images/422e2255-0fc6-4973-812c-ad7df9003584/353/569/90/False/dragon-ball-super-vol-1.jpg"
    },
    {
        id: 19,
        title: "Y: O Último Homem",
        author: "Brian K. Vaughan",
        publisher: "DC Comics",
        price: 34.90,
        image: "https://panini.com.br/media/catalog/product/A/L/ALIBB001R.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=897&width=960&canvas=960:897"
    },
    {
        id: 20,
        title: "Demon Slayer Vol. 1",
        author: "Koyoharu Gotouge",
        publisher: "Manga",
        price: 21.90,
        image: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_kf32gsogi53qj8o3vjbju9s861/-S897-FWEBP"
    },
    {
        id: 21,
        title: "The Walking Dead Vol. 1",
        author: "Robert Kirkman",
        publisher: "Image Comics",
        price: 28.90,
        image: "https://m.media-amazon.com/images/I/91+pwoC9LaS._SY466_.jpg"
    },
    {
        id: 22,
        title: "Chainsaw Man Vol. 1",
        author: "Tatsuki Fujimoto",
        publisher: "Manga",
        price: 23.90,
        image: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_ajkdcp6hsh22d0otj30glh7p60/-S897-FWEBP"
    },
    {
        id: 23,
        title: "Preacher Vol. 1",
        author: "Garth Ennis",
        publisher: "DC Comics",
        price: 31.90,
        image: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_la6g5f5cs53ona8q4dj0p9mm68/-S897-FWEBP"
    },
    {
        id: 24,
        title: "Jujutsu Kaisen Vol. 1",
        author: "Gege Akutami",
        publisher: "Manga",
        price: 22.90,
        image: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_bmmm1r8arp25507lhj76h4b30e/-S897-FWEBP"
    },
    {
        id: 25,
        title: "Hellboy Vol. 1",
        author: "Mike Mignola",
        publisher: "Dark Horse",
        price: 27.90,
        image: "https://m.media-amazon.com/images/I/71HONLIqVcL._SY385_.jpg"
    },
    {
        id: 26,
        title: "Attack on Titan Vol. 1",
        author: "Hajime Isayama",
        publisher: "Manga",
        price: 25.90,
        image: "https://m.media-amazon.com/images/I/91M9VaZWxOL._SY466_.jpg"
    },
    {
        id: 27,
        title: "Sin City",
        author: "Frank Miller",
        publisher: "Dark Horse",
        price: 33.90,
        image: "https://m.media-amazon.com/images/I/51VL750X58L._SY445_SX342_PQ84_.jpg"
    },
    {
        id: 28,
        title: "Asilo Arkham",
        author: "Grant Morrison",
        publisher: "DC Comics",
        price: 35.90,
        image: "https://rika.vtexassets.com/arquivos/ids/240361-800-auto?v=635316706968470000&width=800&height=auto&aspect=true"
    },
    {
        id: 29,
        title: "My Hero Academia Vol. 1",
        author: "Kohei Horikoshi",
        publisher: "Manga",
        price: 19.90,
        image: "https://m.media-amazon.com/images/I/71bELfIWTDL._SY425_.jpg"
    },
    {
        id: 30,
        title: "Cavaleiros do Zodíaco Vol. 1",
        author: "Masami Kurumada",
        publisher: "Manga",
        price: 23.90,
        image: "https://m.media-amazon.com/images/I/616IVLdrhtL._SY445_SX342_.jpg"
    },
    {
        id: 31,
        title: "Bleach Vol. 1",
        author: "Tite Kubo",
        publisher: "Manga",
        price: 21.90,
        image: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_noplm1mskh41145o8m7aos191j/-S897-FWEBP"
    },
    {
        id: 32,
        title: "Hunter x Hunter Vol. 1",
        author: "Yoshihiro Togashi",
        publisher: "Manga",
        price: 24.90,
        image: "https://m.media-amazon.com/images/I/61NPpt5HC6L._SY466_.jpg"
    },
    {
        id: 33,
        title: "Black Clover Vol. 1",
        author: "Yūki Tabata",
        publisher: "Manga",
        price: 20.90,
        image: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_e75l43kril3sf2f26uf9vga32s/-S897-FWEBP"
    },
    {
        id: 34,
        title: "Spawn: Origins Vol. 1",
        author: "Todd McFarlane",
        publisher: "Image Comics",
        price: 32.90,
        image: "https://m.media-amazon.com/images/I/81Ng3JgvINL._SY466_.jpg"
    },
    {
        id: 35,
        title: "Deadpool: Mata o Universo Marvel",
        author: "Cullen Bunn",
        publisher: "Marvel",
        price: 28.90,
        image: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_hm34ejhje12fhacqqn2hq5e22u/-S897-FWEBP"
    },
    {
        id: 36,
        title: "Homem de Ferro: Extremis",
        author: "Warren Ellis",
        publisher: "Marvel",
        price: 26.90,
        image: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_j2r9le6kj53jj9r8ujb9pvhl2e/-S897-FWEBP"
    }
];

const ComicDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comic, setComic] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComic = () => {
      setLoading(true);
      try {
        const foundComic = mockComics.find(comic => comic.id === parseInt(id));
        if (foundComic) {
          setComic(foundComic);
          // Buscar recomendações baseadas na editora
          const similarComics = mockComics
            .filter(c => c.publisher === foundComic.publisher && c.id !== foundComic.id)
            .sort(() => Math.random() - 0.5) // Randomiza as recomendações
            .slice(0, 3); // Pega até 3 recomendações aleatórias
          setRecommendations(similarComics);
          setError(null);
          window.scrollTo(0, 0); // Rola para o topo quando mudar de quadrinho
        } else {
          setError('Quadrinho não encontrado');
        }
      } catch (err) {
        setError('Erro ao carregar o quadrinho');
      } finally {
        setLoading(false);
      }
    };

    fetchComic();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleBuy = () => {
    // Recupera os quadrinhos já comprados ou cria um array vazio
    const purchasedComics = JSON.parse(localStorage.getItem('purchasedComics')) || [];
    
    // Verifica se o quadrinho já está comprado
    const isAlreadyPurchased = purchasedComics.some(purchasedComic => purchasedComic.id === comic.id);
    
    if (isAlreadyPurchased) {
      alert('Este quadrinho já foi comprado por você!');
      return;
    }

    // Adiciona o quadrinho atual com a data de compra
    const comicWithPurchaseDate = {
      ...comic,
      date: new Date().toLocaleDateString('pt-BR')
    };
    
    // Adiciona o novo quadrinho à lista e salva no localStorage
    purchasedComics.push(comicWithPurchaseDate);
    localStorage.setItem('purchasedComics', JSON.stringify(purchasedComics));
    
    alert(`Quadrinho "${comic.title}" comprado com sucesso!`);
  };

  const handleReserve = () => {
    // Recupera os quadrinhos já reservados ou cria um array vazio
    const rentedComics = JSON.parse(localStorage.getItem('rentedComics')) || [];
    
    // Verifica se o quadrinho já está reservado
    const isAlreadyRented = rentedComics.some(rentedComic => rentedComic.id === comic.id);
    
    if (isAlreadyRented) {
      alert('Este quadrinho já está reservado por você!');
      return;
    }

    // Adiciona o quadrinho atual com a data de reserva
    const comicWithRentDate = {
      ...comic,
      rentDate: new Date().toLocaleDateString('pt-BR')
    };
    
    // Adiciona o novo quadrinho à lista e salva no localStorage
    rentedComics.push(comicWithRentDate);
    localStorage.setItem('rentedComics', JSON.stringify(rentedComics));
    
    alert(`Quadrinho "${comic.title}" reservado com sucesso!`);
  };

  const handleRecommendationClick = (recommendedId) => {
    navigate(`/comics/${recommendedId}`);
  };

  if (loading) {
    return (
      <div className="comic-detail-container">
        <Navbar />
        <div className="comic-detail-content">
          <h2>Carregando...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="comic-detail-container">
        <Navbar />
        <div className="comic-detail-content">
          <h2>{error}</h2>
          <button className="back-btn" onClick={handleBack}>Voltar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="comic-detail-container">
      <Navbar />
      <div className="comic-detail-content">
        <div className="comic-detail-grid">
          <div className="comic-detail-image">
            <img src={comic.image} alt={comic.title} />
          </div>
          <div className="comic-detail-info">
            <h1>{comic.title}</h1>
            <p className="author">por {comic.author}</p>
            <p className="publisher">Editora: {comic.publisher}</p>
            <p className="price">
              {comic.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </p>
            <div className="comic-detail-actions">
              <button className="rent-btn" onClick={handleBuy}>Comprar</button>
              <button className="reserve-btn" onClick={handleReserve}>Reservar</button>
              <button className="back-btn" onClick={handleBack}>Voltar</button>
            </div>
          </div>
        </div>

        {recommendations.length > 0 && (
          <div className="recommendations-section">
            <h2>Recomendações da mesma editora</h2>
            <div className="recommendations-grid">
              {recommendations.map(rec => (
                <div 
                  key={rec.id} 
                  className="recommendation-card"
                  onClick={() => handleRecommendationClick(rec.id)}
                >
                  <img src={rec.image} alt={rec.title} />
                  <h3>{rec.title}</h3>
                  <p>{rec.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComicDetail;