import "./compDetalhesTexto.css"

export default function CompDetalhesTexto() {

    type Detalhes = {
        coordenada_norte?: string,
        coordenada_sul?: string
        coordenada_leste?: string
        coordenada_oeste?: string
        data_imagem?: string 
        status?: string
        startDate?: string
        endDate?: string
        cloudPercentage?: string
        shadowPercentage?:string
    }

    const getObjectFromLocalStorage = (key: string): Record<string, any> | null => {
        try {
          const jsonString = localStorage.getItem(key);
          return jsonString ? JSON.parse(jsonString) : null;
        } catch (error) {
          console.error("Erro ao recuperar do localStorage:", error);
          return null;
        }
      };

    const ObjetoDetalhes:Detalhes | null = getObjectFromLocalStorage("detalhesimagem")

    return (
        <div className="container-total-texto">
            <div className="container-de-textos">
                <div className="texto-informacoes">
                    <h2>Informações</h2>
                </div>

                <div className="texto-detalhes">
                    <div className="lado-texto-negrito">
                        <h3 className="texto-negrito">Coordenada Norte:</h3>
                        <h3 className="texto-negrito">Coordenada Sul:</h3>
                        <h3 className="texto-negrito">Coordenada Leste:</h3>
                        <h3 className="texto-negrito">Coordenada Oeste:</h3>
                        <h3 className="texto-negrito">Data Imagem:</h3>
                        <h3 className="texto-negrito">Data Início:</h3>
                        <h3 className="texto-negrito">Data Final:</h3>
                        <h3 className="texto-negrito">% de nuvens:</h3>
                        <h3 className="texto-negrito">% de sombras:</h3>
                    </div>
                    <div className="lado-texto-normal">              
                        <p className="texto-normal">{ObjetoDetalhes?.coordenada_norte}</p>                   
                        <p className="texto-normal">{ObjetoDetalhes?.coordenada_sul}</p>                   
                        <p className="texto-normal">{ObjetoDetalhes?.coordenada_leste}</p>
                        <p className="texto-normal">{ObjetoDetalhes?.coordenada_oeste}</p>
                        <p className="texto-normal">{ObjetoDetalhes?.data_imagem}</p>
                        <p className="texto-normal">{ObjetoDetalhes?.startDate}</p>
                        <p className="texto-normal">{ObjetoDetalhes?.endDate}</p>
                        <p className="texto-normal">{ObjetoDetalhes?.cloudPercentage}</p>
                        <p className="texto-normal">{ObjetoDetalhes?.shadowPercentage}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}