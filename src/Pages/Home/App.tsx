
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css"; // CSS global
import Carrosel from "../../Componets/Carrosel/Carrosel";
import Nuvem from "../../Images/Icons/cloud-svgrepo-com.svg";
import NuvemS from "../../Images/Icons/cloudShadow-svgrepo-com.svg";
import PolyShow from "../../Images/Icons/polygonShow.svg";
import PolyHide from "../../Images/Icons/polygonHide.svg";
import PolyErase from "../../Images/Icons/polygonEraser.svg";

import MapSelector from "../../Componets/MapSelector/MapSelector";

import { useNavigate } from "react-router-dom";
import FiltroDesktop from '../../Componets/Home/Filtro/Desktop/FiltroDesktop';
import FiltroMobile from '../../Componets/Home/Filtro/Mobile/FiltroMobile';


const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);


  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [cloudPercentage, setCloudPercentage] = useState<number>(0);
  const [shadowPercentage, setShadowPercentage] = useState<number>(0);
  const [polygonCoords, setPolygonCoords] = useState<
    google.maps.LatLngLiteral[]
  >([]);


  const [id, setId] = useState(0);

  const navigate = useNavigate();


  const ChangeFeature = (botao: string) => {
    if (botao === "Cloud") {
      setCriteriaC(!CriteriaC);
    } else if (botao === "Shadow") {
      setCriteriaS(!CriteriaS);
    }
  };

  const handleSearch = async () => {
    // Valida se as datas foram inseridas
    if (!startDate || !endDate) {
      alert("Por favor, insira as datas de início e fim.");
      return;
    }

    // Valida se o polígono foi desenhado
    if (polygonCoords.length !== 4) {
      alert(
        "Por favor, selecione uma região no mapa desenhando um polígono com 4 pontos."
      );
      return;
    }

    // Extrair coordenadas
    const latitudes = polygonCoords.map((coord) => coord.lat);
    const longitudes = polygonCoords.map((coord) => coord.lng);

    // Extrair coordenadas
    const coordenada_norte = Math.max(...latitudes); // Ponto mais ao norte
    const coordenada_sul = Math.min(...latitudes); // Ponto mais ao sul
    const coordenada_leste = Math.max(...longitudes); // Ponto mais a leste
    const coordenada_oeste = Math.min(...longitudes); // Ponto mais a oeste

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
      usuario_id: id, // Descomente e altere conforme necessário
    };

    console.log("Dados enviados para o backend:", dataToSend);

    try {
      const response = await axios.post(
        "http://localhost:3002/imagemSatelite/criar",
        dataToSend
      );
      console.log("Resposta do backend:", response.data);
    } catch (error) {
      console.error("Erro ao enviar dados para o backend:", error);
    }
  };

  const PolySwitch = () => {
    setShowPoly(!ShowPoly);
  };

  // Função que será passada para o MapSelector e que define as coordenadas do polígono
  const handleRegionSelect = (coords: {
    norte: number;
    sul: number;
    leste: number;
    oeste: number;
  }) => {
    // Converta as coordenadas do polígono para um array para o uso interno

    const coordsArray: google.maps.LatLngLiteral[] = [
      { lat: coords.norte, lng: coords.leste }, // Canto superior direito
      { lat: coords.sul, lng: coords.leste }, // Canto inferior direito
      { lat: coords.sul, lng: coords.oeste }, // Canto inferior esquerdo
      { lat: coords.norte, lng: coords.oeste }, // Canto superior esquerdo
    ];
    localStorage.setItem("Coordenadas", JSON.stringify(coordsArray));
  };

  const logado = async () => {
    const token = localStorage.getItem("Token");

    if (token) {
      const urlUsuarioLogado = "http://localhost:3002/usuario/usuario-logado";

      const response = await axios.get(urlUsuarioLogado, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const { id } = response.data;
        setId(id);
      }
    }
  }

  // UseEffect para buscar os dados do usuário ao carregar o componente
  useEffect(() => {
    logado();
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (

    <div className="HomeContainer">
      <div className="CarroselContainer">
        <div className="Carrosel">
          <Carrosel />
        </div>
      </div>
      <div className="LocationContainer">
        <div className={"Location"}>
          <MapSelector sendPolygonToBack={handleRegionSelect} />
        </div>
      </div>

      <div className="PolyControlRow">
        <div className="PolyControlButton">
          <img src={PolyErase} alt="Nuvem" />
        </div>

        <div className="PolyControlButton" onClick={PolySwitch}>
          {ShowPoly ? (
            <img src={PolyShow} alt="Nuvem" />
          ) : (
            <img src={PolyHide} alt="Nuvem" />
          )}
        </div>
      </div>

      {isMobile ? (
        <div className="Search-filter">
          <div className="Align-Center">
            <div className="FilterControl">
              <div className="FilterControlTitle">Filtrar Pesquisa</div>
              <div className="FilterControlDesc">
                Filtra imagens com base na presença de nuvens e sombras
              </div>

              <div className="FilterControlDateRow">
                <div className="FilterDate">
                  <div className="DateTitle">
                    <p>Data de Inicio:</p>
                  </div>
                  <div className="DateInput">
                    <input
                      type="date"
                      id="start-date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="FilterDate">
                  <div className="DateTitle">
                    <p>Data Final:</p>
                  </div>
                  <div className="DateInput">
                    <input
                      type="date"
                      id="end-date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="FilterSelect">
              <div className="FilterRow1">
                <div
                  className={
                    CriteriaC ? "FilterSelectedItem" : "FilterSelectItem"
                  }
                  onClick={() => ChangeFeature("Cloud")}
                >
                  <div className="FilterSelectItemR1">
                    <img
                      src={Nuvem}
                      alt="Nuvem"
                      style={{ width: "85%", height: "85%" }}
                    />
                  </div>
                  <div className="FilterSelectItemR2">Nuvens</div>
                  <div className="FilterSelectItemR3">
                    Escolha se deseja incluir nuvens ou não na sua pesquisa:
                  </div>
                </div>

                <div
                  className={
                    CriteriaS ? "FilterSelectedItem" : "FilterSelectItem"
                  }
                  onClick={() => ChangeFeature("Shadow")}
                >
                  <div className="FilterSelectItemR1">
                    <img
                      src={NuvemS}
                      alt="Sombra de Nuvem"
                      style={{ width: "85%", height: "85%" }}
                    />
                  </div>
                  <div className="FilterSelectItemR2">Sombras</div>
                  <div className="FilterSelectItemR3">
                    Escolha se deseja incluir sombras ou não na sua pesquisa:
                  </div>
                </div>
              </div>

              <div className="FilterRow2">
                <div>
                  <label htmlFor="cloud-percentage">
                    Porcentagem de Nuvens:
                  </label>
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

                <div>
                  <label htmlFor="shadow-percentage">
                    Porcentagem de Sombras:
                  </label>
                  <input
                    type="range"
                    id="shadow-percentage"
                    min="0"
                    max="100"
                    value={shadowPercentage}
                    onChange={(e) =>
                      setShadowPercentage(Number(e.target.value))
                    }
                  />
                  <span>{shadowPercentage}%</span>
                </div>
              </div>
              <div className="FilterControlButtonsContainer">
                <div className="FilterControlButtonsReset">Limpar</div>
                <div
                  className="FilterControlButtonsSearch"
                  onClick={handleSearch}
                >
                  Pesquisar
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="Search-filter">
            <div className="FilterControl">
              <div className="FilterControlTitle">Filtrar Pesquisa</div>
              <div className="FilterControlDesc">
                Filtra imagens com base na presença de nuvens e sombras
              </div>

              <div className="FilterControlDateContainer">
                <div className="FilterControlDateRow">
                  {/* Data de início */}
                  <div>
                    <label htmlFor="start-date" style={{ fontSize: 25 }}>
                      Data de Inicio:
                    </label>
                    <input
                      type="date"
                      id="start-date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>

                  {/* Data de fim */}
                  <div>
                    <label htmlFor="end-date" style={{ fontSize: 25 }}>
                      Data Final:
                    </label>
                    <input
                      type="date"
                      id="end-date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="FilterControlButtonsContainer">
                <div className="FilterControlButtonsReset">Limpar</div>
                <div
                  className="FilterControlButtonsSearch"
                  onClick={handleSearch}
                >
                  Pesquisar
                </div>
              </div>
            </div>

            <div className="FilterSelect">
              <div className="FilterRow1">
                <div
                  className={
                    CriteriaC ? "FilterSelectedItem" : "FilterSelectItem"
                  }
                  onClick={() => ChangeFeature("Cloud")}
                >
                  <div className="FilterSelectItemR1">
                    <img
                      src={Nuvem}
                      alt="Nuvem"
                      style={{ width: "85%", height: "85%" }}
                    />
                  </div>
                  <div className="FilterSelectItemR2">Nuvens</div>
                  <div className="FilterSelectItemR3">
                    Escolha se deseja incluir nuvens ou não na sua pesquisa:
                  </div>
                </div>

                <div
                  className={
                    CriteriaS ? "FilterSelectedItem" : "FilterSelectItem"
                  }
                  onClick={() => ChangeFeature("Shadow")}
                >
                  <div className="FilterSelectItemR1">
                    <img
                      src={NuvemS}
                      alt="Nuvem"
                      style={{ width: "85%", height: "85%" }}
                    />
                  </div>
                  <div className="FilterSelectItemR2">Sombras</div>
                  <div className="FilterSelectItemR3">
                    Escolha se deseja incluir sombras ou não na sua pesquisa:
                  </div>
                </div>
              </div>

              <div className="FilterRow2">
                {/* Controle de porcentagem de nuvens */}
                <div>
                  <label htmlFor="cloud-percentage">
                    Porcentagem de Nuvens:
                  </label>
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
                  <label htmlFor="shadow-percentage">
                    Porcentagem de Sombras:
                  </label>
                  <input
                    type="range"
                    id="shadow-percentage"
                    min="0"
                    max="100"
                    value={shadowPercentage}
                    onChange={(e) =>
                      setShadowPercentage(Number(e.target.value))
                    }
                  />
                  <span>{shadowPercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <ImagemTratada /> */}

    </div>
  );
};

export default App;
