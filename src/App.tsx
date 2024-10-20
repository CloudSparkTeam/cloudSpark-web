import React, { useEffect, useState } from "react";
import Navbar from "./Componets/Navbar/App"
import NavbarL from "./Componets/NavbarLateral/App"
import Home from './Pages/Home/App';
import './App.css'


const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='App'>
      {isMobile ? (
        <NavbarL />
      ) : (
        <div>
          <Navbar />
        </div>
      )}

      <Home />
    </div>
  );
};

export default App;


















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:3002')
//       .then(response => {
//         setMessage(response.data);
//       })
//       .catch(error => {
//         console.error('Erro ao buscar dados : ', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Frontend React App</h1>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default App;