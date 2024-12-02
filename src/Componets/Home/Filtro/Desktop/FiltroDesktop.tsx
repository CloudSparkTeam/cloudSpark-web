import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nuvem from "../../../../Images/Icons/cloud-svgrepo-com.svg";
import NuvemS from "../../../../Images/Icons/cloudShadow-svgrepo-com.svg";

const FiltroDesktop = () => {
  const [Id, SetId] = useState("");
  const [CriteriaC, setCriteriaC] = useState(false);
  const [CriteriaS, setCriteriaS] = useState(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [cloudPercentage, setCloudPercentage] = useState<number>(0);
  const [shadowPercentage, setShadowPercentage] = useState<number>(0);

  const navigate = useNavigate();

  const fetchUsuarioLogado = async () => {
    const token = localStorage.getItem("Token");

    if (!token) {
      navigate("/");
      return;
    }
    const urlUsuarioLogado = "http://localhost:3002/usuario/usuario-logado";

    try {
      const response = await axios.get(urlUsuarioLogado, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        SetId(response.data.id);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário: ", error);
    }
  };

  useEffect(() => {
    fetchUsuarioLogado();
  }, [navigate]);


  const ChangeFeature = (botao: string) => {
    if (botao === 'Cloud') {
      setCriteriaC(!CriteriaC);
    } else if (botao === 'Shadow') {
      setCriteriaS(!CriteriaS);
    }
  };

  const handleSearch = async () => {

    // Extrair coordenadas

    let latitudes: number[] = [];
    let longitudes: number[] = [];
    let coordsArray: google.maps.LatLngLiteral[] = [];

    const storedCoords = localStorage.getItem("Coordenadas");

    if (storedCoords) {
      coordsArray = JSON.parse(storedCoords) as google.maps.LatLngLiteral[];

      latitudes = coordsArray.map(coord => coord.lat);
      longitudes = coordsArray.map(coord => coord.lng);
    }

    // Extrair coordenadas
    const coordenada_norte = Math.max(...latitudes); // Ponto mais ao norte
    const coordenada_sul = Math.min(...latitudes);   // Ponto mais ao sul
    const coordenada_leste = Math.max(...longitudes); // Ponto mais a leste
    const coordenada_oeste = Math.min(...longitudes); // Ponto mais a oeste

    // Valida se as datas foram inseridas
    if (!startDate || !endDate) {
      alert('Por favor, insira as datas de início e fim.');
      return;
    }

    // Valida se o polígono foi desenhado
    if (coordsArray.length !== 4) {
      alert('Por favor, selecione uma região no mapa desenhando um polígono com 4 pontos.');
      return;
    }


    // Exibir os dados que serão enviados
    const dataToSend = {
      coordenada_norte,
      coordenada_sul,
      coordenada_leste,
      coordenada_oeste,
      data_imagem: new Date().toISOString(), // Formato ISO 8601
      status: "ativo", // Ajuste conforme necessário
      startDate: new Date(startDate).toISOString(), // Formato ISO 8601
      endDate: new Date(endDate).toISOString(), // Formato ISO 8601
      cloudPercentage,
      shadowPercentage,
      usuario_id: Id, // Descomente e altere conforme necessário
    };

    const saveObjectToLocalStorage = (key: string, obj: Record<string, any>) => {
      try {
        const jsonString = JSON.stringify(obj);
        localStorage.setItem(key, jsonString);
        console.log("Objeto salvo com sucesso!");
      } catch (error) {
        console.error("Erro ao salvar no localStorage:", error);
      }
    };

      saveObjectToLocalStorage("detalhesimagem", dataToSend);

    console.log('Dados enviados para o backend:', dataToSend);


    try {
      const response = await axios.post('http://localhost:3002/imagemSatelite/criar', dataToSend);
      console.log('Resposta do backend:', response.data);
    } catch (error) {
      console.error('Erro ao enviar dados para o backend:', error);
    }

    navigate("/detalhesimagem")
  };
  return (

    <div>
      <div className='Search-filter'>
        <div className='FilterControl'>
          <div className='FilterControlTitle'>Filtrar Pesquisa</div>
          <div className='FilterControlDesc'>Filtra imagens com base na presença de nuvens e sombras</div>

          <div className='FilterControlDateContainer'>
            <div className='FilterControlDateRow'>
              {/* Data de início */}
              <div>
                <label htmlFor="start-date" style={{ fontSize: 25 }}>Data de Inicio:</label>
                <input
                  type="date"
                  placeholder="dd/mm/aaaa"
                  id="start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              {/* Data de fim */}
              <div>
                <label htmlFor="end-date" style={{ fontSize: 25 }}>Data Final:</label>
                <input
                  type="date"
                  id="end-date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

          </div>

          <div className='FilterControlButtonsContainer'>
            <div className='FilterControlButtonsReset'>Limpar</div>
            <div className='FilterControlButtonsSearch' onClick={handleSearch}>Pesquisar</div>
          </div>


        </div>


        <div className='FilterSelect'>

          <div className='FilterRow1'>
            <div className={CriteriaC ? 'FilterSelectedItem' : 'FilterSelectItem'} onClick={() => ChangeFeature('Cloud')}>
              <div className='FilterSelectItemR1'>
                <img src={Nuvem} alt="Nuvem" style={{ width: '85%', height: '85%' }} />
              </div>
              <div className='FilterSelectItemR2'>Nuvens</div>
              <div className='FilterSelectItemR3'>Escolha se deseja incluir nuvens ou não na sua pesquisa:</div>
            </div>

            <div className={CriteriaS ? 'FilterSelectedItem' : 'FilterSelectItem'} onClick={() => ChangeFeature('Shadow')}>
              <div className='FilterSelectItemR1'>
                <img src={NuvemS} alt="Nuvem" style={{ width: '85%', height: '85%' }} />
              </div>
              <div className='FilterSelectItemR2'>Sombras</div>
              <div className='FilterSelectItemR3'>Escolha se deseja incluir sombras ou não na sua pesquisa:</div>
            </div>
          </div>


          <div className='FilterRow2'>
            {/* Controle de porcentagem de nuvens */}
            <div>
              <label htmlFor="cloud-percentage">Porcentagem de Nuvens:</label>
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
              <label htmlFor="shadow-percentage">Porcentagem de Sombras:</label>
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
        </div>
      </div>
    </div>

  );
};

export default FiltroDesktop;