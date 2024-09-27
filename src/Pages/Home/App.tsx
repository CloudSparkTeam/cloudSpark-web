import React, { useState } from 'react';
import axios from 'axios';
import './style.css'; // CSS global
import Carrosel from "../../Componets/Carrosel/Carrosel"
import foto1 from "../../Images/foto1.png";
import foto2 from "../../Images/foto2.png";
import foto3 from "../../Images/foto3.png";
import MapSelector from '../../Componets/MapSelector/MapSelector';

const App = () => {
  const [CriteriaC, setCriteriaC] = useState(false)
  const [CriteriaS, setCriteriaS] = useState(true)
  const fotos = [{ url: foto1, alt: "f1" }, { url: foto2, alt: "2" }, { url: foto3, alt: "3" }];
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [polygonCoords, setPolygonCoords] = useState<{ latitude: number; longitude: number }[]>([]);

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [cloudPercentage, setCloudPercentage] = useState<number>(0);
  const [shadowPercentage, setShadowPercentage] = useState<number>(0);

  const ChangeFeature = (botao: string) => {
    if (botao === 'Cloud') {
      setCriteriaC(!CriteriaC)
    } else if (botao === 'Shadow') {
      setCriteriaS(!CriteriaS)
    }
  }

  // Função para enviar os dados para o backend
  const sendPolygonToBack = async (coords: { longitude: number; latitude: number }[]) => {
    try {
      const response = await axios.post('url', {        // url backend
        coordinates: coords,
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

  const handleRegionSelect = (coords: { latitude: number, longitude: number }[]) => {
    setPolygonCoords(coords); // Armazena o polígono selecionado
  };

  const toggleMapSize = () => {
    setIsMapExpanded(!isMapExpanded);
  }

  const handleSearch = () => {
    if (polygonCoords.length) {
      sendPolygonToBack(polygonCoords); // Envia para o backend ao clicar no botão "Buscar Imagens"
    } else {
      console.error('Nenhum polígono foi desenhado.');
    }
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
        <div className={`Location ${isMapExpanded ? 'expanded' : ''}`} onClick={toggleMapSize}>
          < MapSelector setPolygonCoords={handleRegionSelect} />
        </div>
      </div> <br /><br />

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

    </div>
  );
};

export default App;
