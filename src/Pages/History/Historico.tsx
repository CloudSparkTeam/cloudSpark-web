import React, { useState, useEffect } from "react";
import "./HistoricoStyles.css"; // Estilos específicos para o histórico
import { useNavigate } from "react-router-dom";
import Navbar from "../../Componets/Navbar/App"
// import axios from "axios";

// Define o tipo de cada solicitação
interface Solicitation {
  regiao: string;
  data: string;
}

export default function Historico() {
  // Define o estado com o tipo correto
  const [solicitacoes, setSolicitacoes] = useState<Solicitation[]>([]);
  const navigate = useNavigate();

  // Dados falsos para teste
  const dadosFalsos: Solicitation[] = [
    { regiao: "Centro-Oeste", data: "2023-09-10" },
    { regiao: "Sul", data: "2023-08-15" },
    { regiao: "Norte", data: "2023-07-20" },
    { regiao: "Sudeste", data: "2023-06-05" },
    { regiao: "Nordeste", data: "2023-05-22" },
  ];

  // Simulação de carregamento de dados falsos
  const fetchHistorico = async () => {
    const token = localStorage.getItem("Token");
    if (!token) {
      navigate("/"); // Redireciona se o token não existir
      return;
    }

    try {
      // Simulando o retorno da API com dados falsos
      setSolicitacoes(dadosFalsos);
      console.log(dadosFalsos);
    } catch (error) {
      console.error("Erro ao buscar histórico: ", error);
      window.alert("Erro ao carregar o histórico");
    }
  };

  useEffect(() => {
    fetchHistorico(); // Carrega os dados falsos ao carregar o componente
  }, [navigate]);

  return (
    <>
    <Navbar />
    <div className="historico-container">
      <h2 className="historico-titulo">Histórico de Solicitações</h2>
      <table className="historico-tabela">
        <thead>
          <tr>
            <th>Região</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {solicitacoes.map((solicitation, index) => (
            <tr key={index}>
              <td>{solicitation.regiao}</td>
              <td>{new Date(solicitation.data).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
  );
}
