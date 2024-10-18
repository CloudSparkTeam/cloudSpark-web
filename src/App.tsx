import Navbar from "./Componets/Navbar/App"
import Home from './Pages/Home/App';
import './App.css'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from "./Pages/Login/Login";
import LoginEntrar from "./Pages/LoginEntrar/LoginEntrar";

const App = () => {
  return (
    <div className='App'>
      <Navbar/>
      <Home />
      {/* <Login /> */}
      {/* <LoginEntrar /> */}
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