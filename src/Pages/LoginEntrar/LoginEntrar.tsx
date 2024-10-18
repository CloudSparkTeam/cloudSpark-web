import "./LoginEntrarStyles.css";
import logoTexto from "../../Images/CloudSpark.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginEntrar() {

    const [email,setEmail] = useState("");
    const [senha,setSenha] = useState("");

    const navigate = useNavigate();

    //função para executar login
    async function handleSubmit(){
        
        const urlLogin = "";
        const objetoUser = {}
        try{
            const response = await axios.post(urlLogin, objetoUser)
            .then((response) => {console.log(response)})

        
        }catch(error){
            window.alert("Não foi possível realizar o login")
            
        }
    }

    //funcao para mudar de pagina se a validacao foi feita
    //no momento nao faz validaçao apenas muda de pagina
    function handleNavigate() {

        //verifica se o login foi validado:
        // if(handleSubmit())
        // {
        //     navigate("/home")   
        // }else{
        //     console.log("deu erro")
        // }
        navigate("/home")
    }

    return(
        <>
            <div className="container">
                <div className="bloco-principal">
                    <h2 className="texto-login">Entre na sua conta</h2>
                    <img src={logoTexto} className="imagem"/>

                    <div className="bloco-inputs">
                        <input className="inputs-entrar" type="text" placeholder="Email..." 
                        value={email} onChange={e => setEmail(e.target.value)}></input>

                        <input className="inputs-entrar" type="password" placeholder="Senha..." 
                        value={senha} onChange={e => setSenha(e.target.value)} ></input>
                    </div>

                    <button className="botao-entrar" onClick={handleNavigate}>Entrar</button>
                </div>
            </div>
        </>
    )
}