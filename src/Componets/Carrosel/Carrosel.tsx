import React, { useState, useEffect, useRef } from "react";
import "./style.css";

type imageUrls = {
    images: {
        url: string;
        alt: string;
    }[];
};

export function ImageSlider({ images }: imageUrls) {
    const [imageIndex, setImageIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);


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

    return (
        <section
            aria-label="Image Slider"
            style={{ width: "100%", height: "100%", position: "relative" }}
        >
            <div style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden", borderRadius: 20 }}>
                {images.map(({ url, alt }, index) => (
                    <img
                        key={url}
                        src={url}
                        alt={alt}
                        aria-hidden={imageIndex !== index}
                        className="img-slider-img"
                        style={{ translate: `${-100 * imageIndex}%` }}
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
        </section>
    );
}

export default ImageSlider;
