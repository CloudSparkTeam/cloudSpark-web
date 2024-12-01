import axios from "axios";
import { useState, useEffect } from "react";

export default function ImageDetails(){
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

    
    return(
        <div style={styles.carouselContainer}>
      <div style={styles.carouselWrapper}>
        {images.map((image, index) => (
          <button
            key={index}
            style={styles.imageWrapper as React.CSSProperties}
          >
            <img
              src={image.url}
              alt={`Carousel item ${index}`}
              style={styles.image as React.CSSProperties}
            />
          </button>
        ))}
      </div>
    </div>
    )


    
}

const styles = {
    carouselContainer: {
      overflow: "hidden",
      width: "100%",
    },
    carouselWrapper: {
      display: "flex",
      flexDirection: "row" as const,
      scrollSnapType: "x mandatory",
      overflowX: "scroll" as const,
      scrollBehavior: "smooth" as const,
      whiteSpace: "nowrap" as const,
    },
    imageWrapper: {
      flexShrink: 0,
      width: "100%",
      display: "inline-block",
      scrollSnapAlign: "center",
      border: "none",
      background: "none",
      padding: 0,
      margin: 0,
    },
    image: {
      width: "100%",
      height: "auto",
      objectFit: "contain" as const,
    },
  };