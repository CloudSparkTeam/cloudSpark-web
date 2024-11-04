// components/Carousel.tsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Image from "./Image";
import ImageDot from "./ImageDot";
import Modal from "./Modal";
import Loader from "./Loader";
import Error from "./Error";
import styles from "../Carrosel/style.module.css"

type ImageUrl = {
    url: string;
    name: string;
};

const Carousel: React.FC = () => {
    const [images, setImages] = useState<ImageUrl[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imageIndex, setImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImagensTratadas = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('http://localhost:3002/imagemSatelite/imagens-tratadas');
                setImages(response.data);
            } catch {
                setError('Erro ao buscar imagens tratadas!');
            } finally {
                setLoading(false);
            }
        };
        fetchImagensTratadas();
    }, []);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setImageIndex((index) => (index === images.length - 1 ? 0 : index + 1));
        }, 3000);
        return () => clearInterval(intervalRef.current as NodeJS.Timeout);
    }, [images.length]);

    const resetInterval = () => {
        clearInterval(intervalRef.current as NodeJS.Timeout);
        intervalRef.current = setInterval(() => {
            setImageIndex((index) => (index === images.length - 1 ? 0 : index + 1));
        }, 3000);
    };

    const showNextImage = () => {
        setImageIndex((index) => (index === images.length - 1 ? 0 : index + 1));
        resetInterval();
    };

    const showPrevImage = () => {
        setImageIndex((index) => (index === 0 ? images.length - 1 : index - 1));
        resetInterval();
    };

    const openModal = (index: number) => {
        setImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const goToImageDetails = () => navigate("/detalhes-imagem", { state: { image: images[imageIndex] } });

    if (loading) return <Loader />;
    if (error) return <Error message={error} />;
    if (images.length === 0) return <p className="text-gray-600">Nenhuma imagem para exibir</p>;

    return (
        <section className={styles.carousel}>
            <div className={styles.slider}>
                {images.map((image, index) => (
                    <Image
                        key={image.url}
                        url={image.url}
                        name={image.name}
                        onClick={() => openModal(index)}
                    />
                ))}
            </div>
            <button onClick={showPrevImage} className={styles.btnLeft}></button>
            <button onClick={showNextImage} className={styles.btnRight}></button>
            <div className={styles.dots}>
                {images.map((_, index) => (
                    <ImageDot key={index} isSelected={index === imageIndex} onClick={() => setImageIndex(index)} />
                ))}
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                image={images[imageIndex]}
                onNext={showNextImage}
                onPrev={showPrevImage}
                goToImageDetails={goToImageDetails}
            />
        </section>
    );
};

export default Carousel;
