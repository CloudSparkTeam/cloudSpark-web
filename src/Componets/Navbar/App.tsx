import React from 'react'; // Importando useState corretamente
import './style.css'; // Importando o CSS global
import { useNavigate } from 'react-router-dom'; // Importando o useNavigate para navegação
import logo from "../../Images/CloudSpark.png";
import logomini from "../../Images/miniLOGO.png"

const App = () => {
  const navigate = useNavigate();
  const fotoLogo = { url: logo, alt: "logo" };
  const fotoLogomini = { url: logomini, alt: "logomini" };

  return (
    <div className='NavbarRow'>
      <div className='RowLeft' onClick={() => navigate('/')}>
        {/* <img src={fotoLogomini.url} alt={fotoLogo.alt} className="logoIcon"/> */}
        <img src={fotoLogo.url} alt={fotoLogomini.alt} className="logo" />
      </div>

      <div className='RowRight'>
        <div className='Tabs'>
          <div className='Tab' onClick={() => navigate('/')}>Home</div>
          <div className='Tab' onClick={() => navigate('/login')}>Login</div>
          <div className='Tab' onClick={() => navigate('/perfil')}>Perfil</div>
        </div>

      </div>
    </div>
  );
};

export default App;


