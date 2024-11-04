import React from 'react';

interface ImageProps {
    url: string;
    name: string;
    onClick: () => void;
}

const Image: React.FC<ImageProps> = ({ url, name, onClick }) => (
    <img src={url} alt={name} className="img-slider-img" onClick={onClick} />
);

export default Image;
