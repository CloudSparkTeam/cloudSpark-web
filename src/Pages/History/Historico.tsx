import React, { useState, useEffect } from "react";
import "./HistoricoStyles.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Componets/Navbar/App";
import axios from "axios";

interface Solicitation {
  id: number;
  nome: string;
  data: string;
  coordenada_norte: number;
  coordenada_sul: number;
  coordenada_leste: number;
  coordenada_oeste: number;
  data_imagem: string;
  status: string;
  startDate: string;
  endDate: string;
  shadowPercentage: number;
  cloudPercentage: number;
}

export default function Historico() {
  const navigate = useNavigate();
  const [solicitacoes, setSolicitacoes] = useState<Solicitation[]>([]);

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
        const { id } = response.data;
        const urlHistorico = `http://localhost:3002/imagemSatelite/listarUsuario/${id}`;

        const historico = await axios.get(urlHistorico, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (historico.status === 200) {
          setSolicitacoes(historico.data);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário: ", error);
    }
  };

  useEffect(() => {
    fetchUsuarioLogado();
  }, [navigate]);

  function formatDate(date?: string | Date): string {
    if (!date) {
      return "Data Indisponível";
    }
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    if (isNaN(parsedDate.getTime())) {
      return "Data Inválida";
    }
    return parsedDate.toLocaleDateString();
  }

  function getSubstringAfterFourthUnderscore(nome: string): string {
    const underscorePositions = [];
    // Encontrar as posições de cada "_"
    for (let i = 0; i < nome.length; i++) {
      if (nome[i] === "_") {
        underscorePositions.push(i);
      }
      // Parar ao encontrar o 4º sublinhado
      if (underscorePositions.length === 4) {
        break;
      }
    }

    // Verificar se há pelo menos 4 sublinhados na string
    if (underscorePositions.length < 4) {
      return "Menos de 4 sublinhados na string";
    }

    // Retornar a substring a partir do índice do 4º sublinhado + 1
    return nome.slice(underscorePositions[3] + 1);
  }

  const handleGerarNovamente = async (id: number) => {
    try {
      console.log(id)
      const response = await axios.post(
        `http://localhost:3002/imagemSatelite/gerarNovamente/${id}`
      );
      console.log(response);
    } catch (error) {
      console.error("Erro ao gerar novamente: ", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="historico-container">
        <h2 className="historico-titulo">Histórico de Solicitações</h2>
        <table className="historico-tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data da Imagem</th>
              <th>Norte</th>
              <th>Sul</th>
              <th>Leste</th>
              <th>Oeste</th>
              <th>Status</th>
              <th>Data de Início</th>
              <th>Data de Fim</th>
              <th>Porcentagem de Sombra</th>
              <th>Porcentagem de Nuvem</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {solicitacoes.map((solicitation, index) => (
              <tr key={index}>
                <td>{getSubstringAfterFourthUnderscore(solicitation.nome)}</td>
                <td>{formatDate(solicitation.data_imagem)}</td>
                <td>{solicitation.coordenada_norte.toFixed(4)}</td>
                <td>{solicitation.coordenada_sul.toFixed(4)}</td>
                <td>{solicitation.coordenada_leste.toFixed(4)}</td>
                <td>{solicitation.coordenada_oeste.toFixed(4)}</td>
                <td>{solicitation.status}</td>
                <td>{formatDate(solicitation.startDate)}</td>
                <td>{formatDate(solicitation.endDate)}</td>
                <td>{solicitation.shadowPercentage}%</td>
                <td>{solicitation.cloudPercentage}%</td>
                <td>
                  <button onClick={() => handleGerarNovamente(solicitation.id)}>
                    Gerar Novamente
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
