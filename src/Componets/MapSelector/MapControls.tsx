// Components/MapControls.tsx
import React from 'react';

interface MapControlsProps {
    isPolygonVisible: boolean;
    onTogglePolygonVisibility: () => void;
    onClearPolygon: () => void;
}

const MapControls: React.FC<MapControlsProps> = ({ isPolygonVisible, onTogglePolygonVisibility, onClearPolygon }) => (
    <div className="MapSelectorControls">
        <button onClick={onTogglePolygonVisibility}>
            {isPolygonVisible ? "Esconder Polígono" : "Mostrar Polígono"}
        </button>
        <button onClick={onClearPolygon}>Limpar Polígono</button>
    </div>
);

export default MapControls;
