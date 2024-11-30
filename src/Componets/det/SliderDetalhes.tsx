import React, { useState, useEffect} from "react";
import axios from "axios"; // Certifique-se de importar axios
import "./imag.css";
import { useNavigate } from "react-router-dom";

;

type ImageUrl = {
    url: string;
    name: string;
}



export function ImageSlider() {
    const [images, setImages] = useState<ImageUrl[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imageIndex, setImageIndex] = useState(0);

    const navigate = useNavigate();

    // Função para buscar imagens tratadas
    const fetchImagensTratadas = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3002/imagemSatelite/imagens-tratadas/1');
            setImages(response.data);
        } catch {
            setError('Erro ao buscar imagens tratadas!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImagensTratadas(); // Busca as imagens quando o componente é montado
        console.log("esse é o erro", typeof(images))
        console.log(images)
    }, []);

  


    function showNextImage() {
        setImageIndex((index) => (index === images.length - 1 ? 0 : index + 1));
      
    }

    function showPrevImage() {
        setImageIndex((index) => (index === 0 ? images.length - 1 : index - 1));
       
    }

    function handleDotClick(index: number) {
        setImageIndex(index);
     
    }


    const goToImageDetails = () => {
        navigate("/detalhes-imagem", { state: { image: images[imageIndex] } });
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p className="text-red-600">{error}</p>;
    }

    if (images.length === 0) {
        return <p className="text-gray-600">Nenhuma imagem para exibir</p>;
    }

    return (
        <section
            aria-label="Image Slider"
            style={{ width: "100%", height: "100%", position: "relative" }}
        >
            <div style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden", borderRadius: 5 }}>
                {images.map(({ url, name }, index) => (
                    <img
                        key={url}
                        src={url}
                        alt={name}
                        aria-hidden={imageIndex !== index}
                        className="img-slider-img"
                        style={{ translate: `${-100 * imageIndex}%` }}
              
                    />
                ))}
            </div>
            <button onClick={showPrevImage} className="img-slider-btnLdetalhes" style={{ left: 0 }}></button>
            <button onClick={showNextImage} className="img-slider-btnRdetalhes" style={{ right: 0 }}></button>

            <div className="CarroselBtnContainer">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className="img-slider-dot-btn"
                        aria-label={`View Image ${index + 1}`}
                        onClick={() => handleDotClick(index)}
                    >
                        {index === imageIndex ? (
                            <div className="itemBtnSelected"></div>
                        ) : (
                            <div className="itemBtn"></div>
                        )}
                    </button>
                ))}
            </div>
            <div id="after-image-slider-controls" />
         
        </section>
    );
}

export default ImageSlider;