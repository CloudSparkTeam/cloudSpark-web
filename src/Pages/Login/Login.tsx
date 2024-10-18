import "./loginStyle.css";
import logoTexto from "../../Images/CloudSpark.png";
import logoMini from "../../Images/miniLOGO.png"
import mapaBack from "../../Images/rascunhoGrandeMap2.png"
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    // funcao para pula para rota de entrar
    function handleNavigation(){
        navigate("/entrar")
    }

    return(
        <>
        <div className="imagem-background">
            {/* <img src={mapaBack}  /> */}
            </div>
            <div className="container">
                <div className="lado-esquerdo">
                    <img src={logoTexto}/>
                    <h4 className="texto-logo">A melhor solução para tratamento de nuvens</h4>
                    <h2 className="texto-bemvindo">Bem vindo de volta!</h2>
                    <h3 className="texto-acessar-conta">Acesse a sua conta:</h3>
                    <button className="botao-entrar" onClick={handleNavigation}>Entrar</button>
                    <img src={logoMini} />
                </div>
                <div className="lado-direito">
                    <h2 className="texto-criar-conta">Crie a sua conta</h2>
                    <input className="input-cadastro" type="text" placeholder="Nome..."></input>
                    <input className="input-cadastro" type="text" placeholder="Email..."></input>
                    <input className="input-cadastro" type="text" placeholder="Senha..."></input>
                    <button className="botao-cadastrar">Cadastrar</button>
                </div>
            </div>
        </>
    )
}