import React from 'react';

interface ModalContentProps {
    image: { url: string; name: string };
    onNext: () => void;
    onPrev: () => void;
    goToImageDetails: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({ image, onNext, onPrev, goToImageDetails }) => (
    <>
        <button onClick={onPrev} className="modal-btn">Anterior</button>
        <img src={image.url} alt={image.name} className="modal-image" />
        <button onClick={onNext} className="modal-btn">Próximo</button>
        <div className="modal-details-btn-container">
            <button onClick={goToImageDetails} className="modal-details-btn">Ver detalhes da imagem</button>
        </div>
    </>
);

export default ModalContent;
