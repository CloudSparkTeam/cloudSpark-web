import React, { useState } from 'react';
import axios from 'axios';
import './style.css'; // CSS global
import Carrosel from "../../Componets/Carrosel/Carrosel";
import foto1 from "../../Images/foto1.png";
import foto2 from "../../Images/foto2.png";
import foto3 from "../../Images/foto3.png";
import ImagemTratada from '../../Componets/ImagemTratada/ImagemTratada';
import MapSelector from '../../Componets/MapSelector/MapSelector';
import { response } from 'express';

const App = () => {
  const [CriteriaC, setCriteriaC] = useState(false);
  const [CriteriaS, setCriteriaS] = useState(true);
  const fotos = [{ url: foto1, alt: "f1" }, { url: foto2, alt: "2" }, { url: foto3, alt: "3" }];

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [cloudPercentage, setCloudPercentage] = useState<number>(0);
  const [shadowPercentage, setShadowPercentage] = useState<number>(0);
  const [polygonCoords, setPolygonCoords] = useState<google.maps.LatLngLiteral[]>([]);

  const ChangeFeature = (botao: string) => {
    if (botao === 'Cloud') {
      setCriteriaC(!CriteriaC);
    } else if (botao === 'Shadow') {
      setCriteriaS(!CriteriaS);
    }
  };

  // Função para enviar os dados para o backend
  const handleSearch = async () => {
    // Valida se as datas foram inseridas
    if (!startDate || !endDate) {
      alert('Por favor, insira as datas de início e fim.');
      return;
    }

    // // Valida se o polígono foi desenhado
    // if (polygonCoords.length !== 4) {
    //   alert('Por favor, selecione uma região no mapa desenhando um polígono com 4 pontos.');
    //   return;
    // }

    try {
      const response = await axios.post('url_do_back', { // Coloque a URL correta aqui
        coordinates: polygonCoords,
        startDate,
        endDate,
        cloudPercentage,
        shadowPercentage,
      });

      console.log('Resposta do backend:', response.data);
    } catch (error) {
      console.error('Erro ao enviar dados para o backend:', error);
    }
  };

  // Função que será passada para o MapSelector e que define as coordenadas do polígono
  const handleRegionSelect = (coords: google.maps.LatLngLiteral[]) => {
    setPolygonCoords(coords);
  };

  return (
    <div className='HomeContainer'>
      <div className='CarroselContainer'>
        <div className='Carrosel'>
          <Carrosel images={fotos} />
        </div>
      </div>

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

      <div className='LocationContainer'>
        <div className={'Location'}>
          <MapSelector sendPolygonToBack={handleRegionSelect} />
        </div>
      </div>

      <br /><br />

      <div className='Search-filter'>
        <div className='FilterControl'>
          <div className='FilterControlTitle'>Search Criteria</div>
          <div className='FilterControlDesc'>Filters images based on clouds and shadows presence</div>
          <div className='FilterControlButtonsContainer'>
            <div className='FilterControlButtonsReset'>Reset</div>
            <div className='FilterControlButtonsSearch' onClick={handleSearch}>Search</div>
          </div>

          {/* Data de início */}
          <div>
            <label htmlFor="start-date">Start Date:</label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          {/* Data de fim */}
          <div>
            <label htmlFor="end-date">End Date:</label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          {/* Controle de porcentagem de nuvens */}
          <div>
            <label htmlFor="cloud-percentage">Cloud Percentage:</label>
            <input
              type="range"
              id="cloud-percentage"
              min="0"
              max="100"
              value={cloudPercentage}
              onChange={(e) => setCloudPercentage(Number(e.target.value))}
            />
            <span>{cloudPercentage}%</span>
          </div>

          {/* Controle de porcentagem de sombras */}
          <div>
            <label htmlFor="shadow-percentage">Shadow Percentage:</label>
            <input
              type="range"
              id="shadow-percentage"
              min="0"
              max="100"
              value={shadowPercentage}
              onChange={(e) => setShadowPercentage(Number(e.target.value))}
            />
            <span>{shadowPercentage}%</span>
          </div>
        </div>

        <div className='FilterSelect'>
          <div className={CriteriaC ? 'FilterSelectItem' : 'FilterSelectedItem'} onClick={() => ChangeFeature('Cloud')}>
            <div className='FilterSelectItemR1'></div>
            <div className='FilterSelectItemR2'>Clouds</div>
            <div className='FilterSelectItemR3'>Choose to include clouds or not in search</div>
          </div>

          <div className={CriteriaS ? 'FilterSelectItem' : 'FilterSelectedItem'} onClick={() => ChangeFeature('Shadow')}>
            <div className='FilterSelectItemR1'></div>
            <div className='FilterSelectItemR2'>Shadows</div>
            <div className='FilterSelectItemR3'>Choose to include cloud's Shadow or not in search</div>
          </div>

        </div>
      </div>
      <ImagemTratada />
    </div>
  );
};

export default App;
