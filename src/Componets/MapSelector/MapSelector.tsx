import React, { useState, useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN!;

interface Coords {
    latitude: number;
    longitude: number;
}

interface MapSelectorProps {
    setPolygonCoords: (coords: Coords[]) => void;
}

type Viewport = {
    latitude: number;
    longitude: number;
    zoom: number;
    bearing?: number;
    pitch?: number;
}

const MapSelector: React.FC<MapSelectorProps> = ({ setPolygonCoords }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const draw = useRef<MapboxDraw | null>(null);

    const [viewport, setViewport] = useState<Viewport>({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 10,
    });

    const updatePolygon = useCallback((e: any) => {
        const polygon = e.features[0]; // A forma desenhada
        if (polygon && polygon.geometry.type === 'Polygon') {
            const coords = polygon.geometry.coordinates[0].map((coord: [number, number]) => ({
                longitude: coord[0],
                latitude: coord[1],
            }));
            setPolygonCoords(coords); // Envia as coordenadas para o componente pai
        }
    }, [setPolygonCoords]);

    // Função para inicializar o Mapbox Draw
    useEffect(() => {
        if (map.current || !mapContainerRef.current) return; // Inicializa o mapa apenas uma vez

        map.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [viewport.longitude, viewport.latitude],
            zoom: viewport.zoom,
        });

        draw.current = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true,
            },
        });

        map.current.addControl(draw.current);

        // Adiciona eventos de criação e atualização de polígono
        (map.current as any).on('draw.create', updatePolygon);
        (map.current as any).on('draw.update', updatePolygon);

        // Limpa os eventos e o controle de desenho ao desmontar
        return () => {
            if (map.current) {
                (map.current as any).off('draw.create', updatePolygon);
                (map.current as any).off('draw.update', updatePolygon);
                map.current.removeControl(draw.current as MapboxDraw);
            }
        };
    }, [updatePolygon, viewport]);

    return (
        <div className='map-container'>
            <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default MapSelector;
