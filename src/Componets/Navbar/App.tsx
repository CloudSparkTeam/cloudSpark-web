import React from 'react';
import './style.css'; // Importando o CSS global
import { useState } from 'react';

const App = () => {
  const [Search, setSearch] = useState('');

  return (
    <div className='NavbarRow'>
      <div className='RowLeft'>
        <div className='Icon'></div>
        <div className='Title'>CloudSpark</div>
      </div>

      <div className='RowRight'>
        <div className='Tabs'>
          <div className='Tab'>Home</div>
          <div className='Tab'>Feature</div>
          <div className='Tab'>Support</div>
        </div>


        <div className="InputContainer">
          <input type="text" className="styled-input" required onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearch(e.target.value)} placeholder="⌕ Search" />
        </div>

      </div>

    </div>
  );
};

export default App;
