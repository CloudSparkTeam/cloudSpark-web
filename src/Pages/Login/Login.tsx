export default function Login() {
    return(
        <>
            <div className="container">
                <div className="lado-esquerdo">
                    {/* imagem */}
                    <h4 className="texto-logo"></h4>
                    <h2 className="texto-bemvindo"></h2>
                    <h3 className="texto-acessar-conta"></h3>
                    <button className="botao-entrar"></button>
                    {/* imagem */}
                </div>
                <div className="lado-direito">
                    <h2 className="texto-criar-conta"></h2>
                    <input className="input-cadastro"></input>
                    <input className="input-cadastro"></input>
                    <input className="input-cadastro"></input>
                    <button className="botao-cadastrar"></button>
                </div>
            </div>
        </>
    )
}