import React, { useState, useEffect } from "react";
import "./PerfilStyles.css"; // O arquivo CSS para os estilos
import { useNavigate } from "react-router-dom";
import Navbar from "../../Componets/Navbar/App";
import axios from "axios";

export default function Perfil() {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nascimento, setNascimento] = useState("");

  const navigate = useNavigate();

  // Função para buscar os dados do usuário logado
  const fetchUsuarioLogado = async () => {
    const token = localStorage.getItem("Token"); // Pega o token do localStorage

    if (!token) {
      navigate("/"); // Redireciona para a página de login se o token não existir
      return;
    }

    const urlUsuarioLogado = "http://localhost:3002/usuario/usuario-logado"; // URL da API

    try {
      // Faz a requisição para obter os dados do usuário logado, enviando o token
      const response = await axios.get(urlUsuarioLogado, {
        headers: {
          Authorization: `Bearer ${token}`, // Insere o token no header da requisição
        },
      });

      if (response.status === 200) {
        const { id, nome, email, data_nascimento } = response.data;
        setId(id);
        setNome(nome);
        setEmail(email);
        setNascimento(data_nascimento); // Atualiza o estado com os dados do usuário
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário: ", error);
      window.alert("Erro ao carregar os dados do usuário");
    }
  };

  // UseEffect para buscar os dados do usuário ao carregar o componente
  useEffect(() => {
    fetchUsuarioLogado();
  }, [navigate]); // O useEffect será executado ao carregar o componente

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem("Token"); // Remove o token de autenticação
    navigate("/"); // Redireciona para a página de login
  };

  // Função de atualização
  const handleAtualizar = async () => {
    const token = localStorage.getItem("Token"); // Pega o token do localStorage
    const urlAtualizarUsuario = "http://localhost:3002/usuario/atualizar/" + id; // URL da API de atualização

    // Dados que serão enviados para a API
    const dadosAtualizados = {
      nome,
      email,
      ...(senha && { senha }), // Envia a senha somente se o usuário preencher
    };

    try {
      // Faz a requisição PUT para atualizar os dados do usuário
      const response = await axios.put(urlAtualizarUsuario, dadosAtualizados, {
        headers: {
          Authorization: `Bearer ${token}`, // Insere o token no header da requisição
        },
      });

      if (response.status === 200 && response.data.token) {
        // Verifica se login foi bem-sucedido e há um token
        const token = response.data.token;

        // Salvar token no localStorage (ou sessionStorage, se preferir)
        localStorage.setItem("Token", token);

        // Navega para a página "home"
        navigate("/");
      } else {
        window.alert("Login falhou. Verifique suas credenciais.");
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário: ", error);
      window.alert("Não foi possível atualizar os dados do usuário");
    }
  };

  return (
    <>
      <Navbar />
      <div className="perfil-container">
        <h2 className="perfil-titulo">Meu Perfil</h2>

        <label className="perfil-label">Nome:</label>
        <input
          className="perfil-input"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <label className="perfil-label">E-mail:</label>
        <input
          className="perfil-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="perfil-label">Senha:</label>
        <input
          className="perfil-input"
          type="password"
          placeholder="Digite sua nova senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <label className="perfil-label">Data de Nascimento:</label>
        <input
          className="perfil-input"
          type="text"
          value={nascimento}
          placeholder="DD-MM-AAAA"
          disabled
        />

        <button className="perfil-botao-atualizar" onClick={handleAtualizar}>
          Atualizar
        </button>
        <button className="perfil-botao-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}
