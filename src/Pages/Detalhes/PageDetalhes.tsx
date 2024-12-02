import { useNavigate } from "react-router-dom"
import CompDetalhesTexto from "../../Componets/DetalhesTexto/CompDetalhesTexto"
import CompImagemDetalhes from "../../Componets/ImagemDetalhes/CompImagemDetalhes"
import "./pageDetalhes.css"


export default function PageDetalhes() {

    const navigate = useNavigate()

    function handleVoltar() {
        navigate("/")
    }
    return(
        <div className="background-page-details">
            <div className="container-primordial">
                <div className="botao-voltar-la">
                    <button onClick={handleVoltar} className="botao-voltar-la-detalhes">X</button>
                </div>
                <div className="texto-titulo-pagina">
                    <h1 className="texto-titulo-letras">Detalhes das Imagens</h1>
                </div>
                <div className="container-cada-lado">
                    <div className="container-e-imagem">
                        <CompImagemDetalhes />
                    </div >
                    <div className="container-d-texto" >
                        <CompDetalhesTexto />
                    </div>
                </div>
            </div>
        </div>
    )
}