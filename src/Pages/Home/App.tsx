import React from 'react';
import './style.css'; // Importando o CSS global
import { useState } from 'react';
import Carrosel from "../../Componets/Carrosel/Carrosel"
import foto1 from "../../Images/foto1.png";
import foto2 from "../../Images/foto2.png";
import foto3 from "../../Images/foto3.png";
import ImagemTratada from '../../Componets/ImagemTratada/ImagemTratada';

const App = () => {
  const [CriteriaC, setCriteriaC] = useState(false)
  const [CriteriaS, setCriteriaS] = useState(true)
  const fotos = [{ url: foto1, alt: "f1" }, { url: foto2, alt: "2" }, { url: foto3, alt: "3" }]

  const ChangeFeature = (botao: string) => {
    console.log(botao);
    console.log(CriteriaC);
    console.log(CriteriaS);
    if (botao == 'Cloud') {
      setCriteriaC(!CriteriaC)
    } else if (botao == 'Shadow') {
      setCriteriaS(!CriteriaS)
    }
  }

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
        <div className='Location'>*Inserir API de mapa aqui*</div>
      </div>

      <div className='Search-filter'>
        <div className='FilterControl'>
          <div className='FilterControlTitle'>Search Criteria</div>
          <div className='FilterControlDesc'>Filters images based on clouds and shadows presence</div>
          <div className='FilterControlButtonsContainer'>
            <div className='FilterControlButtonsReset'>Reset</div>
            <div className='FilterControlButtonsSearch'>Search</div>
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
