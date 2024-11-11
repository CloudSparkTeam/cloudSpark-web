import React from 'react';
import './style.css'; // Importando o CSS global
import { useState } from 'react';
import logo from "../../Images/logo.png";
import MenuIcon from "../../Images/Icons/menu-svgrepo-com.svg";
import { useNavigate } from 'react-router-dom'; // Importando o useNavigate para navegação

const App = () => {
  const [Menu, setMenu] = useState(false);
  const fotoLogo = { url: logo, alt: "logo" };  

  const toggleMenu = () => {
    setMenu(!Menu);
  };
  
  const navigate = useNavigate(); // Definindo o hook de navegação

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
      <div className='Menu-Item'onClick={() => navigate('/')}>Home</div>
      <div className='Menu-Item'onClick={() => navigate('/login')}>Login</div>
      <div className='Menu-Item'onClick={() => navigate('/perfil')}>Perfil</div>
    </div>
  </div>
)}

    </div>
  );
};

export default App;
