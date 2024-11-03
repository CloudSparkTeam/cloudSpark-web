import React from 'react'; // Importando useState corretamente
import './style.css'; // Importando o CSS global
import { useNavigate } from 'react-router-dom'; // Importando o useNavigate para navegação
import logo from "../../Images/logo.png";

const App = () => {
  const navigate = useNavigate(); // Definindo o hook de navegação

  const fotoLogo = { url: logo, alt: "logo" };

  return (
    <div className='NavbarRow'>
      <div className='RowLeft' onClick={() => navigate('/')}>
        <div className='Icon'>
          <img src={fotoLogo.url} alt={fotoLogo.alt} className="logo" />
        </div>
        <div className='Title'>CloudSpark</div>
      </div>

      <div className='RowRight'>
        <div className='Tabs'>
          <div className='Tab' onClick={() => navigate('/')}>Home</div>
          {/* <div className='Tab' >Informações</div> */}
          {/* <div className='Tab' >Suporte</div> */}
          <div className='Tab' onClick={() => navigate('/login')}>Login</div>
          <div className='Tab' onClick={() => navigate('/perfil')}>Perfil</div>
          <div className='Tab' onClick={() => navigate('/cadastrousuario')}>Cadastrar</div>
          <div className='Tab' onClick={() => navigate('/historico')}>Histórico</div>
        </div>

      </div>
    </div>
  );
};

export default App;
