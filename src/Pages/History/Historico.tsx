import React, { useState, useEffect } from "react";
import "./HistoricoStyles.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Componets/Navbar/App";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

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
  const [loadingGerarNovamente, setLoadingGerarNovamente] =
    useState<boolean>(false);
  const [Id, SetId] = useState("");
  const [openModal, setOpenModal] = useState(false); // Controla o modal
  const [imagemUrl, setImagemUrl] = useState<string | null>(null); // URL da imagem


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
        SetId(response.data);
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
    if (!nome) {
      return "Nome inválido ou não fornecido";
    }

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

  const handleGerarNovamente = async (item: Solicitation) => {
    setLoadingGerarNovamente(true);
    try {
      const response = await fetch(
        `http://localhost:3002/imagemSatelite/gerarNovamente/${item.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coordenada_norte: item.coordenada_norte,
            coordenada_sul: item.coordenada_sul,
            coordenada_leste: item.coordenada_leste,
            coordenada_oeste: item.coordenada_oeste,
            data_imagem: new Date().toISOString(),
            status: item.status,
            startDate: item.startDate,
            endDate: item.endDate,
            shadowPercentage: item.shadowPercentage,
            cloudPercentage: item.cloudPercentage,
            usuario_id: Id,
          }),
        }
      );
      console.log(response)
      if (response.ok) {
        const result = await response.json();
        setImagemUrl(result.imagemUrl); // Assume que o backend retorna uma URL da imagem
        setOpenModal(true); // Abre o modal
      } else {
        alert("Erro ao gerar novamente a imagem.");
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
      alert("Ocorreu um erro ao tentar gerar novamente.");
    } finally {
      setLoadingGerarNovamente(false);
    }
    setTimeout(function() {
      navigate("/detalhesimagem")
    }, 5000)
  };

  return (
    <>
      <Navbar />
      <div className="historico-container">
        <h2 className="historico-titulo">Histórico de Solicitações</h2>
        <TableContainer component={Paper}>
          <Table className="historico-tabela">
            <TableHead>
              <TableRow>
                <TableCell>Data da Imagem</TableCell>
                <TableCell>Norte</TableCell>
                <TableCell>Sul</TableCell>
                <TableCell>Leste</TableCell>
                <TableCell>Oeste</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Data de Início</TableCell>
                <TableCell>Data de Fim</TableCell>
                <TableCell>Porcentagem de Sombra</TableCell>
                <TableCell>Porcentagem de Nuvem</TableCell>
                <TableCell>Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {solicitacoes.map((solicitation, index) => (
                <TableRow key={index}>
                  <TableCell>{formatDate(solicitation.data_imagem)}</TableCell>
                  <TableCell>
                    {solicitation.coordenada_norte.toFixed(4)}
                  </TableCell>
                  <TableCell>
                    {solicitation.coordenada_sul.toFixed(4)}
                  </TableCell>
                  <TableCell>
                    {solicitation.coordenada_leste.toFixed(4)}
                  </TableCell>
                  <TableCell>
                    {solicitation.coordenada_oeste.toFixed(4)}
                  </TableCell>
                  <TableCell>{solicitation.status}</TableCell>
                  <TableCell>{formatDate(solicitation.startDate)}</TableCell>
                  <TableCell>{formatDate(solicitation.endDate)}</TableCell>
                  <TableCell>{solicitation.shadowPercentage}%</TableCell>
                  <TableCell>{solicitation.cloudPercentage}%</TableCell>
                  <TableCell>
                    {loadingGerarNovamente ? (
                      <span>Carregando...</span>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleGerarNovamente(solicitation)}
                      >
                        Gerar Novamente
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogContent>
          {imagemUrl ? (
            <img src={imagemUrl} alt="Imagem Satélite" style={{ width: "100%" }} />
          ) : (
            <p>Carregando imagem...</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
