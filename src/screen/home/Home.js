import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import ComicCard from '../../components/ComicCard';
import ScrollWrapper from '../../components/ScrollWrapper';
import './Home.css';

// Dados de exemplo para simular a resposta da API 
const mockComics = [
    {
        id: 1,
        title: "Batman: O Cavaleiro das Trevas",
        author: "Frank Miller",
        price: 50.00,
        image: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_l55ma6s55129raptum4usjoi1b/-S897-FWEBP" 
      },
      {
        id: 2,
        title: "Watchmen",
        author: "Alan Moore",
        price: 18.50,
        image: "https://www.panini.de/media/catalog/product/cache/2d16730310b7945c46ddd1ca513e3c42/w/a/watchmen-deluxe-cover896duul02bijn_jict4ogzeuvhu5g0.jpg"
      },
      {
        id: 3,
        title: "Sandman",
        author: "Neil Gaiman",
        price: 22.90,
        image: "https://m.media-amazon.com/images/I/61YNpOiCpbL._SY466_.jpg"
      },
      {
        id: 4,
        title: "Turma da Mônica Jovem",
        author: "Mauricio de Sousa",
        price: 12.50,
        image: "https://m.media-amazon.com/images/I/81AhLJUoniL._SY425_.jpg"
      },
      {
        id: 5,
        title: "One Piece Vol. 1",
        author: "Eiichiro Oda",
        price: 19.90,
        image: "https://m.media-amazon.com/images/I/716EGgqzyOL._SY466_.jpg"
      },
      {
        id: 6,
        title: "Naruto Vol. 1",
        author: "Masashi Kishimoto",
        price: 17.90,
        image: "https://m.media-amazon.com/images/I/91xUwI2UEVL._AC_SY741_.jpg"
      },
      {
        id: 7,
        title: "Homem-Aranha: De Volta ao Lar",
        author: "Marvel Comics",
        price: 16.50,
        image: "https://imgv2-1-f.scribdassets.com/img/document/698726093/original/0cf5a384eb/1?v=1"
      },
      {
        id: 8,
        title: "Saga Vol. 1",
        author: "Brian K. Vaughan",
        price: 24.90,
        image: "https://m.media-amazon.com/images/I/51oGjs9VJOL._SY445_SX342_.jpg"
      },
      {
        id: 9,
        title: "Berserk Vol. 1",
        author: "Kentaro Miura",
        price: 29.90,
        image: "https://a-static.mlcdn.com.br/800x560/livro-berserk-vol-1/apaginadistribuidoradelivros/9788542617092/24403e16fb77d11e3044533f056ac721.jpg" 
      },
      {
        id: 10,
        title: "Akira Vol. 1",
        author: "Katsuhiro Otomo",
        price: 32.50,
        image: "https://m.media-amazon.com/images/I/61ud5BuLRML._SL1000_.jpg"
      },
      {
        id: 11,
        title: "Vingadores: Guerra Infinita",
        author: "Marvel Comics",
        price: 21.90,
        image: "https://m.media-amazon.com/images/I/A1Sq8q77OfL._SY466_.jpg" 
      },
      {
        id: 12,
        title: "Turma da Mônica: Laços",
        author: "Mauricio de Sousa", 
        price: 14.90,
        image: "https://m.media-amazon.com/images/I/71VzStzoicL._SL1263_.jpg"
      },
      {
        id: 13,
        title: "Death Note Vol. 1",
        author: "Tsugumi Ohba e Takeshi Obata",
        price: 18.90,
        image: "https://m.media-amazon.com/images/I/612x+rQ0yJL._SL1000_.jpg"
      },
      {
        id: 14,
        title: "V de Vingança",
        author: "Alan Moore e David Lloyd",
        price: 26.90,
        image: "https://m.media-amazon.com/images/I/71RccWOPFKL._SL1024_.jpg"
      },
      {
        id: 15,
        title: "Persépolis",
        author: "Marjane Satrapi",
        price: 27.50,
        image: "https://m.media-amazon.com/images/I/71Hda5IPs3L._SL1500_.jpg"
      },
      {
        id: 16,
        title: "Maus",
        author: "Art Spiegelman",
        price: 29.90,
        image: "https://m.media-amazon.com/images/I/71nXxfnNEcL._SL1375_.jpg"
      },
      {
        id: 17,
        title: "Fullmetal Alchemist Vol. 1",
        author: "Hiromu Arakawa",
        price: 24.90,
        image: "https://m.media-amazon.com/images/I/51t+BkN5sCL._SY445_SX342_PQ84_.jpg"
      },
      {
        id: 18,
        title: "Dragon Ball Vol. 1",
        author: "Akira Toriyama",
        price: 19.90,
        image: "https://cdn.kobo.com/book-images/422e2255-0fc6-4973-812c-ad7df9003584/353/569/90/False/dragon-ball-super-vol-1.jpg"
      },
      {
        id: 19,
        title: "Y: O Último Homem",
        author: "Brian K. Vaughan",
        price: 34.90,
        image: "https://panini.com.br/media/catalog/product/A/L/ALIBB001R.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=897&width=960&canvas=960:897"
      },
      {
        id: 20,
        title: "Demon Slayer Vol. 1",
        author: "Koyoharu Gotouge",
        price: 21.90,
        image: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_kf32gsogi53qj8o3vjbju9s861/-S897-FWEBP"
      },
      {
        id: 21,
        title: "The Walking Dead Vol. 1",
        author: "Robert Kirkman",
        price: 28.90,
        image: "https://m.media-amazon.com/images/I/91+pwoC9LaS._SY466_.jpg"
      },
      {
        id: 22,
        title: "Chainsaw Man Vol. 1",
        author: "Tatsuki Fujimoto",
        price: 23.90,
        image: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_ajkdcp6hsh22d0otj30glh7p60/-S897-FWEBP"
      },
      {
        id: 23,
        title: "Preacher Vol. 1",
        author: "Garth Ennis",
        price: 31.90,
        image: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_la6g5f5cs53ona8q4dj0p9mm68/-S897-FWEBP"
      },
      {
        id: 24,
        title: "Jujutsu Kaisen Vol. 1",
        author: "Gege Akutami",
        price: 22.90,
        image: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_bmmm1r8arp25507lhj76h4b30e/-S897-FWEBP"
      },
      {
        id: 25,
        title: "Hellboy Vol. 1",
        author: "Mike Mignola",
        price: 27.90,
        image: "https://m.media-amazon.com/images/I/71HONLIqVcL._SY385_.jpg"
      },
      {
        id: 26,
        title: "Attack on Titan Vol. 1",
        author: "Hajime Isayama",
        price: 25.90,
        image: "https://m.media-amazon.com/images/I/91M9VaZWxOL._SY466_.jpg"
      },
      {
        id: 27,
        title: "Sin City",
        author: "Frank Miller",
        price: 33.90,
        image: "https://m.media-amazon.com/images/I/51VL750X58L._SY445_SX342_PQ84_.jpg"
      },
      {
        id: 28,
        title: "Asilo Arkham",
        author: "Grant Morrison",
        price: 35.90,
        image: "https://rika.vtexassets.com/arquivos/ids/240361-800-auto?v=635316706968470000&width=800&height=auto&aspect=true"
      },
      {
        id: 29,
        title: "My Hero Academia Vol. 1",
        author: "Kohei Horikoshi",
        price: 19.90,
        image: "https://m.media-amazon.com/images/I/71bELfIWTDL._SY425_.jpg"
      },
      {
        id: 30,
        title: "Cavaleiros do Zodíaco Vol. 1",
        author: "Masami Kurumada",
        price: 23.90,
        image: "https://m.media-amazon.com/images/I/616IVLdrhtL._SY445_SX342_.jpg"
      },
      {
        id: 31,
        title: "Bleach Vol. 1",
        author: "Tite Kubo",
        price: 21.90,
        image: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_noplm1mskh41145o8m7aos191j/-S897-FWEBP"
      },
      {
        id: 32,
        title: "Hunter x Hunter Vol. 1",
        author: "Yoshihiro Togashi",
        price: 24.90,
        image: "https://m.media-amazon.com/images/I/61NPpt5HC6L._SY466_.jpg"
      },
      {
        id: 33,
        title: "Black Clover Vol. 1",
        author: "Yūki Tabata",
        price: 20.90,
        image: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_e75l43kril3sf2f26uf9vga32s/-S897-FWEBP"
      },
      {
        id: 34,
        title: "Spawn: Origins Vol. 1",
        author: "Todd McFarlane",
        price: 32.90,
        image: "https://m.media-amazon.com/images/I/81Ng3JgvINL._SY466_.jpg"
      },
      {
        id: 35,
        title: "Deadpool: Mata o Universo Marvel",
        author: "Cullen Bunn",
        price: 28.90,
        image: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_hm34ejhje12fhacqqn2hq5e22u/-S897-FWEBP"
      },
      {
        id: 36,
        title: "Homem de Ferro: Extremis",
        author: "Warren Ellis",
        price: 26.90,
        image: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_j2r9le6kj53jj9r8ujb9pvhl2e/-S897-FWEBP"
      }
    ];

const Home = () => {
  const [comics, setComics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOption, setSortOption] = useState('');
  const homeRef = React.useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    // Salvando a página atual no localStorage sempre que ela mudar
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  useEffect(() => {
    // Simulando uma chamada de API
    fetchComics();
  }, []);

  const fetchComics = () => {
    // Em um cenário real, você faria uma chamada fetch para a API
    setTimeout(() => {
      setComics(mockComics);
    }, 500);
  };

  useEffect(() => {
    if (searchTerm) {
      const filteredComics = mockComics.filter(comic => 
        comic.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        comic.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setComics(filteredComics);
      setCurrentPage(1); // Resetar para a primeira página quando pesquisar
    } else {
      setComics(mockComics);
    }
  }, [searchTerm]);

  useEffect(() => {
    // Força o scroll para o topo quando o componente montar
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, []); // Executar apenas uma vez quando o componente montar

  const handleSearch = (e) => {
    e.preventDefault(); // Previne o recarregamento da página
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    setCurrentPage(1); // Resetar para a primeira página quando mudar o gênero
    // Em um cenário real, você filtraria com base no gênero
    // Por enquanto, apenas recarregamos os quadrinhos
    fetchComics();
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    let sortedComics = [...comics];
    
    switch(e.target.value) {
      case 'preco-asc':
        sortedComics.sort((a, b) => a.price - b.price);
        break;
      case 'preco-desc':
        sortedComics.sort((a, b) => b.price - a.price);
        break;
      default:
        // Sem ordenação específica
        break;
    }
    
    setComics(sortedComics);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  // Lógica de paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = comics.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(comics.length / itemsPerPage);

  const scrollToTop = () => {
    const homeContainer = document.querySelector('.home-container');
    if (homeContainer) {
      homeContainer.scrollIntoView({ behavior: "auto", block: "start" });
    }
  };



  const handlePageChange = async (pageNumber) => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
    
    // Pequeno delay para garantir que o scroll aconteça antes da mudança de página
    await new Promise(resolve => setTimeout(resolve, 50));
    
    setCurrentPage(pageNumber);
    localStorage.setItem('currentPage', pageNumber);
  };

  return (
    <ScrollWrapper>
      <div className="home-container" ref={homeRef}>
        <Navbar onLogout={handleLogout} />
        
        <section className="hero">
          <h2>Bem-vindo à Estante de Heróis</h2>
          <p>Explore nossa coleção ampliada com mais de {mockComics.length} quadrinhos e HQs para alugar!</p>
        </section>

        <section className="filters">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Buscar quadrinhos..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-options">
            <select value={selectedGenre} onChange={handleGenreChange}>
              <option value="">Todos os gêneros</option>
              <option value="acao">Ação</option>
              <option value="aventura">Aventura</option>
              <option value="comedia">Comédia</option>
              <option value="drama">Drama</option>
              <option value="ficcao">Ficção Científica</option>
              <option value="manga">Mangá</option>
              <option value="herois">Super-Heróis</option>
              <option value="biografia">Biografia</option>
              <option value="nacional">Nacional</option>
              <option value="seinen">Seinen</option>
              <option value="shonen">Shonen</option>
              <option value="classico">Clássicos</option>
            </select>
            <select value={sortOption} onChange={handleSortChange}>
              <option value="">Ordenar por</option>
              <option value="recentes">Mais recentes</option>
              <option value="populares">Mais populares</option>
              <option value="preco-asc">Preço: menor para maior</option>
              <option value="preco-desc">Preço: maior para menor</option>
            </select>
          </div>
        </section>

        <section className="comics-grid">
          {currentItems.length > 0 ? (
            currentItems.map(comic => (
              <ComicCard 
                key={comic.id} 
                comic={comic} 
              />
            ))
          ) : (
            <p className="no-results">Nenhum quadrinho encontrado.</p>
          )}
        </section>

        {comics.length > itemsPerPage && (
          <div className="pagination">
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Anterior
            </button>
            
            <div className="page-numbers">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </ScrollWrapper>
  );
};

export default Home;