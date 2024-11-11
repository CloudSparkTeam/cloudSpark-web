import React from "react";
import "./NovoLogin.css";
import logoTexto from "../../Images/CloudSpark.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from '../../Componets/Navbar/App';

export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [dataNascimento, setDataNascimento] = useState(""); // Novo estado para data de nascimento
    const [emailEntrar, setEmailEntrar] = useState("");
    const [senhaEntrar, setSenhaEntrar] = useState("");

    const [mostrarCadastro, setMostrarCadastro] = useState(false);

    const handleToggle = () => {
        setMostrarCadastro(prev => !prev);
        console.log(mostrarCadastro)
    };

    const navigate = useNavigate();

    // Função para navegar para a página de home
    function handleNavigation() {
        navigate("/");
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
                window.alert("Cadastrado com sucesso!") 
                navigate("/login");
            } else {
                window.alert("Cadastro falhou. Verifique as informações fornecidas.");
            }
        } catch (error) {
            console.error("Erro ao realizar o cadastro: ", error);
            window.alert("Não foi possível realizar o cadastro");
        }
    }
    async function handleSubmit() {
        const urlLogin = "http://localhost:3002/login"; // URL da API
        const objetoUser = {
            email: emailEntrar,
            senha: senhaEntrar
        };

        try {
            const response = await axios.post(urlLogin, objetoUser);
            console.log(response.data);
            
            if (response.status === 200 && response.data.token) { // Verifica se login foi bem-sucedido e há um token
                const token = response.data.token;

                // Salvar token no localStorage (ou sessionStorage, se preferir)
                localStorage.setItem('Token', token);

                // Navega para a página "home"
                navigate("/");
            } else {
                window.alert("Login falhou. Verifique suas credenciais.");
            }
        } catch (error) {
            console.error("Erro ao fazer login: ", error);
            window.alert("Não foi possível realizar o login");
        }
    }

    return (
        <>
            <Navbar />

            <div className="imagem-fundo">
               
                <div className="container2">
                    <div className="lado-esquerdo">
                      
                        
                        <h2 className="texto-bemvindo">Entre na sua conta</h2>
                        <div className="posicaologo">
                        <img src={logoTexto} className="palavra-logo" id="palavra-logo-esquerdo" alt="Logo"/>
                        </div>
                        <div className="bloco-inputs-novo">
                        
                        <input
                            className="inputs-entrar-novo"
                            type="text"
                            placeholder="Email..."
                            value={emailEntrar}
                            onChange={e => setEmailEntrar(e.target.value)}
                        />
                        
                        <input  
                            className="inputs-entrar-novo"
                            type="password"
                            placeholder="Senha..."
                            value={senhaEntrar}
                            onChange={e => setSenhaEntrar(e.target.value)}
                        />
                    </div>
                    
                        <button className="botao-entrar" onClick={handleSubmit}>Entrar</button>
                 
                    </div>
                    <div className="lado-direito">
                        <h2 className="texto-criar-conta">Faça o seu cadastro</h2>
                        <img src={logoTexto} className="palavra-logo" alt="Logo"/>
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
                        <div className="posicionarbcadastrar">
                        <button className="botao-cadastrar"  onClick={handleCadastro}>Cadastrar</button>
                        </div>
                    </div>
                    <div className={`clique-esquerdo ${mostrarCadastro ? 'ativo' : ''}`} id={"clique-esquerdo"}>
                        <h2 className="titulo-cliqueesquerdo">Bem vindo de volta!</h2>
                        <div className="texto2-cliqueesquerdo">
                            <h3>Entre na sua conta para poder acessar seu histórico de imagens dentre outras
                            funcionalidades</h3>
                        </div>
                        <div className="botaoesquerdoentrar">
                        <button onClick={handleToggle}>
                            Entrar
                        </button>
                        <div className="botaoconvidado">
                        <button id="bconvidado" onClick={handleNavigation}>
                            Entrar como convidado
                        </button>
                        </div>
                        </div>
                    </div>

                    <div className={`clique-direito ${!mostrarCadastro ? 'ativo' : ''}`}>
                        <h2 className="titulo-cliquedireito">Bem vindo!</h2>
                        <div className="texto2-cliquedireito">
                            <h3>A melhor solução para tratamento de nuvens!</h3>
                            <h3>Visualize e baixe imagens captadas pelo satélite CBERS4A com o sensor WPM!</h3>
                        </div>
                        <div className="botaodireitocadastrar">
                            <button onClick={handleToggle}>
                                Cadastrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
