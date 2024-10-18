import "./LoginEntrarStyles.css";
import logoTexto from "../../Images/CloudSpark.png";

export default function LoginEntrar() {
    return(
        <>
            <div className="container">
                <div className="bloco-principal">
                    <h2 className="texto-login">Entre na sua conta</h2>
                    <img src={logoTexto} className="imagem"/>

                    <div className="bloco-inputs">
                        <input className="inputs-entrar" type="text" placeholder="Email..."></input>
                        <input className="inputs-entrar" type="password" placeholder="Senha..."></input>
                    </div>

                    <button className="botao-entrar">Entrar</button>
                </div>
            </div>
        </>
    )
}