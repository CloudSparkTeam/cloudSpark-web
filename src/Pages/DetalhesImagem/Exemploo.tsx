import "./DetalhesImagem.css"

import React, { useEffect, useRef, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import axios from 'axios';

export default function DetalhesImagesm() {

  type ImageUrl = {
    url: string;
    name: string;
};

  const [images, setImages] = useState<ImageUrl[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchImagensTratadas(); // Busca as imagens quando o componente é montado
    console.log("esse é o erro", typeof(images))
    console.log(images)
}, []);

  const fetchImagensTratadas = async () => {
    setLoading(true);
    setError(null);
    try {
        const response = await axios.get('http://localhost:3002/imagemSatelite/imagens-tratadas/2');
        setImages(response.data);
    } catch {
        setError('Erro ao buscar imagens tratadas!');
    } finally {
        setLoading(false);
    }
};

  function resetInterval() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
        setImageIndex((index) => (index === images.length - 1 ? 0 : index + 1));
    }, 3000);
}

  function showNextImage() {
    setImageIndex((index) => (index === images.length - 1 ? 0 : index + 1));
    resetInterval();
}

function showPrevImage() {
    setImageIndex((index) => (index === 0 ? images.length - 1 : index - 1));
    resetInterval(); 
}


function handleDotClick(index: number) {
  setImageIndex(index);
  resetInterval(); 
}
return(
        <section className="background-detalhest">
            <div className="div-imagem-1">
                {images.map(({ url, name }, index) => (
                    <img
                        key={url}
                        src={url}
                        alt={name}
                        aria-hidden={imageIndex !== index}
                    />
                ))}
            </div>
            <div className="lado-esquerdo-detalhes"></div>
            <button onClick={showPrevImage}  style={{ left: 0 }}></button>
            <button onClick={showNextImage}  style={{ right: 0 }}></button>

            <div className="div-imagem-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        
                        aria-label={`View Image ${index + 1}`}
                        onClick={() => handleDotClick(index)}
                    >
                        {index === imageIndex ? (
                            <div ></div>
                        ) : (
                            <div ></div>
                        )}
                    </button>
                ))}
            </div>
            <div/>
        </section>
)
}