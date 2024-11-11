import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Certifique-se de importar axios
import "./style.css";
import { useNavigate } from "react-router-dom";

type ImageUrl = {
    url: string;
    name: string;
};

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    image: ImageUrl;
    onNext: () => void;
    onPrev: () => void;
    goToImageDetails: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, image, onNext, onPrev, goToImageDetails }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onPrev} className="modal-btn">Anterior</button>
                <img src={image.url} alt={image.name} className="modal-image" />
                <button onClick={onNext} className="modal-btn">Próximo</button>
                <div className="modal-details-btn-container">
                    <button onClick={goToImageDetails} className="modal-details-btn">Ver detalhes da imagem</button>
                </div>
                <button onClick={onClose} className="modal-close">Fechar</button>
            </div>
        </div>
    );
};


export function ImageSlider() {
    const [images, setImages] = useState<ImageUrl[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imageIndex, setImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
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
    }, []);

    function resetInterval() {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setImageIndex((index) => (index === images.length - 1 ? 0 : index + 1));
        }, 3000);
    }

    useEffect(() => {
        resetInterval();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [images.length]);

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

    function openModal(index: number) {
        setImageIndex(index);
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
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
            <div style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden", borderRadius: 20 }}>
                {images.map(({ url, name }, index) => (
                    <img
                        key={url}
                        src={url}
                        alt={name}
                        aria-hidden={imageIndex !== index}
                        className="img-slider-img"
                        style={{ translate: `${-100 * imageIndex}%` }}
                        onClick={() => openModal(index)} // Abre o modal ao clicar na imagem
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
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                image={images[imageIndex]}
                onNext={() => showNextImage()}
                onPrev={() => showPrevImage()}
                goToImageDetails={goToImageDetails} // Passa a função para o modal
            />
        </section>
    );
}

export default ImageSlider;