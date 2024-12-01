import React from 'react';

type ImageUrl = {
    url: string;
    name: string;
}

interface ImageDownloaderProps {
    images: ImageUrl[];
}

const ImageDownloader: React.FC<ImageDownloaderProps> = ({ images }) => {
    
    const handleDownload = () => {
        console.log("chegou na func de baixar imagem")
        images.forEach((image) => {
            const anchor = document.createElement('a');
            anchor.href = image.url;
            anchor.download = image.name; // Use o nome da imagem
            const imagem = anchor.download
            console.log("Imagem baixada" + imagem)
            anchor.click();
        });
        console.log("terminou a func de baixar imagem")
    };

    return (
        <button
            onClick={handleDownload}
            style={{
                padding: '10px 20px',
                backgroundColor: '#72A4DF',
                color: 'black',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                width:"150px"
            }}
        >
            Baixar Imagens
        </button>
    );
};

export default ImageDownloader;
