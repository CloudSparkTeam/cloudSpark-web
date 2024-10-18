import "./LoginEntrarStyles.css";
import logoTexto from "../../Images/CloudSpark.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginEntrar() {

    const [email,setEmail] = useState("");
    const [senha,setSenha] = useState("");

    const navigate = useNavigate();

    //função para executar login
    function handleSubmit(): boolean {


        try{

            return true
        }catch(error){
            window.alert("Não foi possível realizar o login")
            return false
        }
    }

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