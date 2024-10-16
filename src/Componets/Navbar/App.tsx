import React, { useEffect } from 'react';
import './style.css'; // Importando o CSS global
import { useState } from 'react';
import logo from "../../Images/logo.png";

const App = () => {
  const [Search, setSearch] = useState('');
  const fotoLogo = { url: logo, alt: "logo" };
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1400);

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o valor do input

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleInputChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1400);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='NavbarRow'>
      <div className='RowLeft'>
        <div className='Icon'>
          <img src={fotoLogo.url} alt={fotoLogo.alt} className="logo" />
        </div>
        <div className='Title'>CloudSpark</div>
      </div>

      <div className='RowRight'>
        <div className='Tabs'>
          <div className='Tab'>Home</div>
          <div className='Tab'>Informações</div>
          <div className='Tab'>Suporte</div>
        </div>


        <div className="InputContainer">
          {isMobile ? (        <div className={`search-boxNav ${searchVisible ? 'active' : ''}`}>
         
        </div>) : (<input type="text" className="styled-input" required onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearch(e.target.value)} placeholder="⌕ Pesquisar" />)}
        </div>

      </div>

    </div>
  );
};

export default App;
