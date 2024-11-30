import axios from "axios";
import { useState, useEffect } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./cssdocaraio.css";
import { SwiperSlide } from "swiper/react";

export default function DetalhesImagem() {
    type ImageUrl = {
        id: number;
        url: string;
        name: string;
    };
    
      const [images, setImages] = useState<ImageUrl[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

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
        // console.log("esse é o erro", typeof(images))
        // console.log(images)
    }, []);

    if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  // Configurações do carrossel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

    return(
        <div className="detalhes-container">
        {/* Carrossel de imagens */}
        <div className="carousel-container">
          <Slider {...settings}>
            <SwiperSlide>
            {images.map((image, index) => (
              <div key={index} className="image-slide">
                <img src={image.url} alt={image.name} className="carousel-image" />
              </div>
            ))}
            </SwiperSlide>
          </Slider>
        </div>
  
        {/* Texto correspondente */}
        <div className="texto-container">
          <div>
          {images.map((image, index) => (
            <p key={index} className="image-text">
              {image.name}
            </p>
          ))}
          </div>
          <div>
          {images.map((image, index) => (
            <p key={index + 1} className="image-text">
              {image.name}
            </p>
          ))}
          </div>
          <div>
          {images.map((image, index) => (
            <p key={index + 2} className="image-text">
              {image.name}
            </p>
          ))}
          </div>
        </div>
      </div>
    )
}