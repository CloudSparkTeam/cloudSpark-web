import React from 'react';
import './style.css'; // Importando o CSS global
import { useState } from 'react';
import logo from "../../Images/logo.png";
import MenuIcon from "../../Images/Icons/menu-svgrepo-com.svg";

const App = () => {
  const [Search, setSearch] = useState('');
  const [Menu, setMenu] = useState(false);
  const fotoLogo = { url: logo, alt: "logo" };

  const [searchVisible, setSearchVisible] = useState(false); // Estado para controlar a visibilidade do input
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o valor do input
  

  // Função que alterna a visibilidade do input
  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  // Função para atualizar o valor do input
  const handleInputChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSearchTerm(e.target.value);
  };

  // Função para abrir/fechar o menu
  const toggleMenu = () => {
    setMenu(!Menu);
  };
  
  return (
    <div className='NavbarRowMini'>
      <div className='RowLeftMini'>
        {Menu? (<div/>):<img src={MenuIcon} alt={fotoLogo.alt} className="IconMenu" onClick={toggleMenu} />}
      </div>

      <div className='RowRightMini'>
        <div className='IconMini'>
          <img src={fotoLogo.url} alt={fotoLogo.alt} className="logoMini" />
        </div>
      </div>

      {Menu && (
  <div className={`Overlay ${Menu ? 'active' : ''}`}>
    <div className="MenuContent">
    <img src={MenuIcon} alt={fotoLogo.alt} className="IconMenu" onClick={toggleMenu} />
      <div className='Menu-Item'>Home</div>
      <div className='Menu-Item'>Feature</div>
      <div className='Menu-Item'>Support</div>
      <div className="search-container">
        <div className={`search-box ${searchVisible ? 'active' : ''}`}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Pesquisa"
            className="search-input"
            onBlur={() => setTimeout(() => setSearchVisible(false), 200)}
            autoFocus={searchVisible}
          />
          <button className="search-button" onClick={toggleSearch}>
            🔍
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default App;
