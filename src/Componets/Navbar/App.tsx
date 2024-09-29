import React from 'react';
import './style.css'; // Importando o CSS global
import { useState } from 'react';
import logo from "../../Images/logo.png";

const App = () => {
  const [Search, setSearch] = useState('');
  const fotoLogo = { url: logo, alt: "logo" };

  return (
    <div className='NavbarRow'>
      <div className='RowLeft'>
        <div  className='Icon'>
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
          <input type="text" className="styled-input" required onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearch(e.target.value)} placeholder="⌕ Pesquisar" />
        </div>

      </div>

    </div>
  );
};

export default App;
