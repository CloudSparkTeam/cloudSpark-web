import axios from "axios";
import { useState, useEffect } from "react";
import "./ultimatevaidacerto.css"
import SliderDetalhes from "../../Componets/det/SliderDetalhes";
import ImageSlider from "../../Componets/Carrosel/Carrosel";


// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function DetalhesImagem() {

    type ImageUrl = {
        url: string;
        name: string;
        id: number;
        data_imagem: string;
        status: string;
        cloudPercentage: number;
        coordenada_norte: any;
    };
    

    const [images, setImages] = useState<ImageUrl[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imageIndex, setImageIndex] = useState(0);

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
        fetchImagensTratadas();   
    }, []);



  return (
    <div className="centralizacao-cont">
        
    <div className="container-principal-detalhes">
        
        <div className="container-do-slider-detalhes" >
           
            <SliderDetalhes />
        </div>
        <div className="container-do-texto">
        <h1>Slider</h1>
        {images.map((image, index) => (
                    <p>{image.name }</p>
                ))}
        </div>

        <div className="botaovoltar3">
            <button className="botaovoltar4">Voltar</button>
        </div>
    </div>
    </div>
  );


// return (
//     <Swiper
//       // install Swiper modules
//       modules={[Navigation, Pagination, Scrollbar, A11y]}
//       spaceBetween={50}
//       slidesPerView={3}
//       navigation
//       pagination={{ clickable: true }}
//       scrollbar={{ draggable: true }}
//       onSwiper={(swiper:any) => console.log(swiper)}
//       onSlideChange={() => console.log('slide change')}
//     >
//         {images.map((image, index) => (
//             <SwiperSlide>
//                 <img key={image.url}
//                         src={image.url}
                       
//                         aria-hidden={imageIndex !== index}
//                         className="img-slider-img"
//                         style={{ translate: `${-100 * imageIndex}%` }}
                
//                 />
//             </SwiperSlide>
//         )
        
//         )}
//       {/* <SwiperSlide>Slide 1</SwiperSlide>
//       <SwiperSlide>Slide 2</SwiperSlide>
//       <SwiperSlide>Slide 3</SwiperSlide>
//       <SwiperSlide>Slide 4</SwiperSlide> */}
//       ...
//     </Swiper>
//   );


};