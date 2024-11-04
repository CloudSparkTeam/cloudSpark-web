import React from 'react';

interface ImageDotProps {
    isSelected: boolean;
    onClick: () => void;
}

const ImageDot: React.FC<ImageDotProps> = ({ isSelected, onClick }) => (
    <button className={isSelected ? 'itemBtnSelected' : 'itemBtn'} onClick={onClick} />
);

export default ImageDot;
