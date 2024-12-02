import React, { useState, useEffect } from "react";
import axios from "axios";
import "./compImagemDetalhes.css";
import { useNavigate } from "react-router-dom";
import ImageDownloader from "../Download/ImageDownloader";

type ImageUrl = {
    url: string;
    name: string;
}

export function CompImagemDetalhes() {
    const [images, setImages] = useState<ImageUrl[]>([]);
    const [originalImages, setOriginalImages] = useState<ImageUrl[]>([]);
    const [shadowMaskImages, setShadowMaskImages] = useState<ImageUrl[]>([]);
    const [cloudMaskImages, setCloudMaskImages] = useState<ImageUrl[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imageIndex, setImageIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("original");

    const navigate = useNavigate();

    // Função para buscar imagens tratadas
    const fetchImagensTratadas = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3002/imagemSatelite/imagens-tratadas/1');
            const fetchedImages = response.data;

            // Filtra as imagens conforme o tipo
            const originalImages = fetchedImages.filter((img: ImageUrl) =>
                img.name.includes('_original_thumbnail.png')
            );
            const shadowMaskImages = fetchedImages.filter((img: ImageUrl) =>
                img.name.includes('_overexposed_thumbnail.png')
            );
            const cloudMaskImages = fetchedImages.filter((img: ImageUrl) =>
                img.name.includes('_segmented_thumbnail.png')
            );

            setOriginalImages(originalImages);
            setShadowMaskImages(shadowMaskImages);
            setCloudMaskImages(cloudMaskImages);

            // Inicializa o estado de imagens com as imagens do tipo selecionado
            setImages(originalImages);

        } catch {
            setError('Erro ao buscar imagens tratadas!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImagensTratadas();
    }, []);

    function showNextImage() {
        setImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));

    }

    function showPrevImage() {
        setImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }

    function handleDotClick(index: number) {
        setImageIndex(index);
    }

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        setSelectedOption(selected);

        // Filtra as imagens com base na opção selecionada
        if (selected === "original") {
            setImages(originalImages);
        } else if (selected === "shadow_mask") {
            setImages(shadowMaskImages);
        } else if (selected === "cloud_mask") {
            setImages(cloudMaskImages);
        }
    };

    const downloadCurrentImage = async () => {
        const currentImage = images[imageIndex];
        if (currentImage) {
            try {
                const response = await fetch(currentImage.url, { mode: 'cors' });
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = currentImage.name || "imagem";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error("Erro ao baixar a imagem:", error);
            }
        }
    };
    

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

            <div className="botao-para-baixar">
                <button onClick={downloadCurrentImage} className="download-current-btn">
                    Baixar Imagem Atual
                </button>
            </div>

            {/* Adicionando o componente Select */}
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <label htmlFor="image-options" style={{ marginRight: "10px" }}>Escolha a versão da imagem:</label>
                <select
                    id="image-options"
                    value={selectedOption}
                    onChange={handleOptionChange}
                    style={{ padding: "5px 10px", borderRadius: "5px", border: "1px solid #ccc" }}
                >
                    <option value="original">Original</option>
                    <option value="shadow_mask">Máscara de Sombras</option>
                    <option value="cloud_mask">Máscara de Nuvem</option>
                </select>
            </div>
        </section>
    );
}

export default CompImagemDetalhes;
