import React from 'react';
import ModalContent from './ModalContent';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    image: { url: string; name: string };
    onNext: () => void;
    onPrev: () => void;
    goToImageDetails: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, image, onNext, onPrev, goToImageDetails }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <ModalContent image={image} onNext={onNext} onPrev={onPrev} goToImageDetails={goToImageDetails} />
                <button onClick={onClose} className="modal-close">Fechar</button>
            </div>
        </div>
    );
};

export default Modal;
