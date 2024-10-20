import React from "react";
import "./loginStyle.css";
import logoTexto from "../../Images/CloudSpark.png";
import logoMini from "../../Images/miniLOGO.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from '../../Componets/Navbar/App';

export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [dataNascimento, setDataNascimento] = useState(""); // Novo estado para data de nascimento

    const navigate = useNavigate();

    // Função para navegar para a página de login
    function handleNavigation() {
        navigate("/entrar");
    }

    // Função para cadastro
    async function handleCadastro() {
        const urlLoginCadastro = "http://localhost:3002/usuario/criar"; // URL da API de cadastro
        const objetoUserParaCadastrar = {
            nome: nome,
            email: email,
            senha: senha,
            data_nascimento: dataNascimento // Incluindo data de nascimento no envio
        };
        
        try {
            console.log(objetoUserParaCadastrar)
            const response = await axios.post(urlLoginCadastro, objetoUserParaCadastrar);

            if (response.status === 201) { // Verifica se há um token   
                navigate("/entrar");
            } else {
                window.alert("Cadastro falhou. Verifique as informações fornecidas.");
            }
        } catch (error) {
            console.error("Erro ao realizar o cadastro: ", error);
            window.alert("Não foi possível realizar o cadastro");
        }
    }

    return (
        <>
            <Navbar />

            <div className="imagem-fundo">
                {/* <img src={mapaBack} className="imagemfundo"/> */}
                <div className="container2">
                    <div className="lado-esquerdo">
                        <img src={logoTexto} className="palavra-logo" alt="Logo"/>
                        <h4 className="texto-logo">A melhor solução para tratamento de nuvens</h4>
                        <h2 className="texto-bemvindo">Bem vindo de volta!</h2>
                        <h3 className="texto-acessar-conta">Acesse a sua conta:</h3>
                        <button className="botao-entrar" onClick={handleNavigation}>Entrar</button>
                        <img src={logoMini} className="mini-logo" alt="Mini logo"/>
                    </div>
                    <div className="lado-direito">
                        <h2 className="texto-criar-conta">Crie a sua conta!</h2>
                        <input 
                            className="input-cadastro" 
                            type="text" 
                            placeholder="Nome..." 
                            value={nome} 
                            onChange={e => setNome(e.target.value)}
                        />

                        <input 
                            className="input-cadastro" 
                            type="text" 
                            placeholder="Email..." 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                        />

                        <input 
                            className="input-cadastro" 
                            type="password" 
                            placeholder="Senha..." 
                            value={senha} 
                            onChange={e => setSenha(e.target.value)}
                        />

                        {/* Campo de Data de Nascimento */}
                        <input 
                            className="input-cadastro" 
                            type="text" 
                            placeholder="Data de Nascimento..." 
                            value={dataNascimento} 
                            onChange={e => setDataNascimento(e.target.value)}
                        />

                        <button className="botao-cadastrar" onClick={handleCadastro}>Cadastrar</button>
                    </div>
                </div>
            </div>
        </>
    );
}
