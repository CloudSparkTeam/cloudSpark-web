import React from 'react';
import './style.css'; // Importando o CSS global
import { useState } from 'react';

const App = () => {

  return (
    <div className='HomeContainer'>
      <div className='CarroselContainer'>
        <div className='Carrosel'></div>
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
        <div className='FeatureExItem'>
          <div className='FeatureExItemR1'></div>
          <div className='FeatureExItemR2'></div>
          <div className='FeatureExItemR3'></div>
        </div>

      </div>

      <div className='Location'></div>
      <div className='Search-filter'>
        <div className='FilterControl'>
          <div className='FilterControlTitle'></div>
          <div className='FilterControlDesc'></div>
          <div className='FilterControlButtons'></div>
        </div>
        <div className='FilterSelect'>
          <div className='FilterSelectItem'>
            <div className='FilterSelectItemR1'></div>
            <div className='FilterSelectItemR2'></div>
            <div className='FilterSelectItemR3'></div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default App;
