import React, { useEffect, useState } from 'react';
import './style.css'; // CSS global
import Carrosel from "../../Componets/Carrosel/Carrosel";
import MapSelector from '../../Componets/MapSelector/MapSelector';
import { useNavigate } from "react-router-dom";
import FiltroDesktop from '../../Componets/Home/Filtro/Desktop/FiltroDesktop';
import FiltroMobile from '../../Componets/Home/Filtro/Mobile/FiltroMobile';


const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Token"); // Pega o token do localStorage

    if (!token) {
      navigate("/"); // Redireciona para a página de login se o token não existir
      return;
    }
  }, [navigate]); // O useEffect será executado ao carregar o componente






  const handleRegionSelect = (coords: { norte: number; sul: number; leste: number; oeste: number }) => {

    const coordsArray: google.maps.LatLngLiteral[] = [
      { lat: coords.norte, lng: coords.leste }, // Canto superior direito
      { lat: coords.sul, lng: coords.leste },   // Canto inferior direito
      { lat: coords.sul, lng: coords.oeste },   // Canto inferior esquerdo
      { lat: coords.norte, lng: coords.oeste },  // Canto superior esquerdo
    ];
    localStorage.setItem("Coordenadas", JSON.stringify(coordsArray));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='HomeContainer'>
      <div className='CarroselContainer'>
        <div className='Carrosel'>
          <Carrosel />
        </div>
      </div>

      {/*
      <div className='FeatureContainer'>
        <div className='Feature'>
          <div className='FeatureC1'></div>
          <div className='FeatureC2'>
            <div className='FeatureC2Title'>Cloud Removal Feature</div>
            <div className='FeatureC2Desc'>
              Choose your desired cloud removal option
            </div>
            <div className='FeatureC2Button'>Select</div>
          </div>
        </div>
      </div>


      <div className='FeatureEx'>
        <div className='FeatureExContainer'>
          <div className='FeatureItem'>
            <div className='FeatureExItemR1'></div>
            <div className='FeatureExItemR2'>Remove Clouds</div>
            <div className='FeatureExItemR3'>Remove clouds from the image</div>
          </div>
          <div className='FeatureItem'>
            <div className='FeatureExItemR1'></div>
            <div className='FeatureExItemR2'>Remove Clouds</div>
            <div className='FeatureExItemR3'>Remove clouds from the image</div>
          </div>
          <div className='FeatureItem'>
            <div className='FeatureExItemR1'></div>
            <div className='FeatureExItemR2'>Remove Clouds</div>
            <div className='FeatureExItemR3'>Remove clouds from the image</div>
          </div>
        </div>
      </div>
*/}


      <MapSelector sendPolygonToBack={handleRegionSelect} />


      {isMobile ? (
        <FiltroMobile />
      ) : (
        <FiltroDesktop />
      )}


    </div>
  );
};

export default App;


