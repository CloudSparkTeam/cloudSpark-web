import "./DetalhesImagem.css"
import Navbar from '../../Componets/Navbar/App';
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Navigation from "swiper";
import Pagination from "swiper";
import axios from 'axios';

export default function DetalhesImagemm() {

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
<section
            aria-label="Image Slider"
            style={{ width: "100%", height: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center"}}
        >
            <div style={{ width: "500px", height: "500px", display: "flex", overflow: "hidden", borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
                {images.map(({ url, name }, index) => (
                    <img
                        key={url}
                        src={url}
                        alt={name}
                        aria-hidden={imageIndex !== index}
                        className="img-slider-img"
                        style={{ translate: `${-100 * imageIndex}%` }}
                        // onClick={() => openModal(index)} // Abre o modal ao clicar na imagem
                    />
                ))}
            </div>
            <button onClick={showPrevImage} className="img-slider-btnL" style={{ left: 0 }}></button>
            <button onClick={showNextImage} className="img-slider-btnR" style={{ right: 0 }}></button>

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
            
            {/* Modal para exibir a imagem em tamanho maior */}
            {/* <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                image={images[imageIndex]}
                onNext={() => showNextImage()}
                onPrev={() => showPrevImage()}
                goToImageDetails={goToImageDetails} // Passa a função para o modal
            /> */}
        </section>
)
}











//     type ImageUrl = {
//         url: string;
//         name: string;
//     };


//     const [currentGroup, setCurrentGroup] = useState<number>(0);
//     const [images, setImages] = useState<ImageUrl[]>([]);

//     const handleGroupChange = (direction: "prev" | "next") => {
//         if (direction === "prev" && currentGroup > 0) {
//           setCurrentGroup((prev) => prev - 1);
//         } else if (direction === "next" && currentGroup < images.length - 1) {
//           setCurrentGroup((prev) => prev + 1);
//         }
//       };

//     return(
//         <div className="background-detalhes-imagem">
//             <Navbar />
//             <div className="container-detalhes-imagem">
//                 <button className="b-esquerdo-detalhes-imagem" >1</button>
//                 <div className='imagens-detalhes-imagem'>

//                 </div>
//                 <div className='detalhes-detalhes imagem'>

//                 </div>
//                 <button className="b-direito-detalhes-imagem" >2</button>
//             </div>
//         </div>
//     )