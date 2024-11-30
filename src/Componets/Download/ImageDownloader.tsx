import React from 'react';

interface ImageDownloaderProps {
    urls: string[];
}

const ImageDownloader: React.FC<ImageDownloaderProps> = ({ urls }) => {
    const handleDownload = () => {
        urls.forEach((url, index) => {
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = `image-${index + 1}`; // Nome do arquivo
            anchor.click();
        });
    };

    return (
        <button
            onClick={handleDownload}
            style={{
                padding: '10px 20px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
            }}
        >
            Baixar Imagens
        </button>
    );
};

export default ImageDownloader;
