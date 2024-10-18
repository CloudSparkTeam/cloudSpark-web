import "./loginStyle.css";
import logoTexto from "../../Images/CloudSpark.png";
import logoMini from "../../Images/miniLOGO.png"
import mapaBack from "../../Images/rascunhoGrandeMap2.png"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {

    const [email,setEmail] = useState("");
    const [senha,setSenha] = useState("");
    const [nome, setNome] = useState("");

    const navigate = useNavigate();

    // funcao para pula para rota de entrar
    function handleNavigation(){
        navigate("/entrar")
    }


    async function handleCadastro() {

        const urlLoginCadastro = "";
        const objetoUserParaCadastrar = {}

        try{
            const response = await axios.post(urlLoginCadastro, objetoUserParaCadastrar)
            .then((response) => {console.log(response)})

        }catch(error){
            window.alert("não foi possível realizar o cadastro")
        }
    }

    return(
        <>
        <div className="imagem-fundo">
            {/* <img src={mapaBack} className="imagemfundo"/> */}
            <div className="container2">
                <div className="lado-esquerdo">
                    <img src={logoTexto} className="palavra-logo"/>
                    <h4 className="texto-logo">A melhor solução para tratamento de nuvens</h4>
                    <h2 className="texto-bemvindo">Bem vindo de volta!</h2>
                    <h3 className="texto-acessar-conta">Acesse a sua conta:</h3>
                    <button className="botao-entrar" onClick={handleNavigation}>Entrar</button>
                    <img src={logoMini} className="mini-logo"/>
                </div>
                <div className="lado-direito">
                    <h2 className="texto-criar-conta">Crie a sua conta!</h2>
                    <input className="input-cadastro" type="text" placeholder="Nome..."
                    value={nome} onChange={e => setNome(e.target.value)}></input>

                    <input className="input-cadastro" type="text" placeholder="Email..."
                    value={email} onChange={e => setEmail(e.target.value)}></input>

                    <input className="input-cadastro" type="password" placeholder="Senha..."
                    value={senha} onChange={e => setSenha(e.target.value)}></input>

                    <button className="botao-cadastrar" onClick={handleCadastro}>Cadastrar</button>
                </div>
            </div>
            </div>
        </>
    )
}