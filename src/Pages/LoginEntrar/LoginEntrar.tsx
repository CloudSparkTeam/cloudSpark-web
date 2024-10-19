import React from "react";
import "./LoginEntrarStyles.css";
import logoTexto from "../../Images/CloudSpark.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginEntrar() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    // Função para executar login
    async function handleSubmit() {
        const urlLogin = "http://localhost:3002/login"; // URL da API
        const objetoUser = {
            email: email,
            senha: senha
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
            <div className="container">
                <div className="bloco-principal">
                    <h2 className="texto-login">Entre na sua conta</h2>
                    <img src={logoTexto} className="imagem" alt="Logo"/>

                    <div className="bloco-inputs">
                        
                        <input
                            className="inputs-entrar"
                            type="text"
                            placeholder="Email..."
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        
                        <input  
                            className="inputs-entrar"
                            type="password"
                            placeholder="Senha..."
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                        />
                    </div>

                    <button className="botao-entrar" onClick={handleSubmit}>Entrar</button>
                </div>
            </div>
        </>
    );
}
