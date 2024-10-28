// Components/PolygonComponent.tsx
import React from 'react';
import { Polygon, Marker } from '@react-google-maps/api';

interface PolygonComponentProps {
    polygonCoords: google.maps.LatLngLiteral[];
    isPolygonVisible: boolean;
    onPolygonClick: (event: google.maps.MapMouseEvent) => void;
    onMarkerDragEnd: (index: number, event: google.maps.MapMouseEvent) => void;
}

const PolygonComponent: React.FC<PolygonComponentProps> = ({ polygonCoords, isPolygonVisible, onPolygonClick, onMarkerDragEnd }) => {
    return (
        <>
            {isPolygonVisible && (
                <>
                    <Polygon
                        paths={polygonCoords}
                        options={{ fillColor: "blue", fillOpacity: 0.4, strokeColor: "blue", strokeOpacity: 1 }}
                        onClick={onPolygonClick}
                    />
                    {polygonCoords.map((coord, index) => (
                        <Marker key={index} position={coord} draggable onDragEnd={(e) => onMarkerDragEnd(index, e)} />
                    ))}
                </>
            )}
        </>
    );
};

export default PolygonComponent;
