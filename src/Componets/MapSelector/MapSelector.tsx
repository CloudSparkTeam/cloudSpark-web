import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Polygon, Marker } from '@react-google-maps/api';
import './style.css';
import PolyShow from "../../Images/Icons/polygonShow.svg";
import PolyHide from "../../Images/Icons/polygonHide.svg";
import PolyErase from "../../Images/Icons/polygonEraser.svg";

// Defina a interface para a região do mapa
interface MapSelectorInterface {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

interface MapSelectorProps {
    sendPolygonToBack: (coords: { norte: number; sul: number; leste: number; oeste: number }) => void;

}


function MapSelector({ sendPolygonToBack }: MapSelectorProps): React.JSX.Element {
    const [regiao] = useState<MapSelectorInterface | null>(null);
    const [polygonCoords, setPolygonCoords] = useState<google.maps.LatLngLiteral[]>([]);
    const [isPolygonVisible, setIsPolygonVisible] = useState(false);
    const [norte, setNorte] = useState<number | null>(null);
    const [sul, setSul] = useState<number | null>(null);
    const [leste, setLeste] = useState<number | null>(null);
    const [oeste, setOeste] = useState<number | null>(null);
    const [ShowPoly, setShowPoly] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);



    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_MAP_TOKEN || '',
    });
    
    // Crie uma referência para o contêiner
    const containerRef = useRef<HTMLDivElement>(null);

    // Defina a posição padrão para o centro do mapa
    const defaultCenter = { lat: -23.5505, lng: -46.6333 }; // São Paulo, por exemplo
    const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>(defaultCenter);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => setMapCenter({ lat: position.coords.latitude, lng: position.coords.longitude }),
            () => console.log("Erro ao obter localização")
        );
    }, []);

    useEffect(() => {
        if (polygonCoords.length === 4) {
            calcularExtremos(polygonCoords);
            setIsPolygonVisible(true);
        }
    }, [polygonCoords]);

    useEffect(() => {
        if (norte !== null && sul !== null && leste !== null && oeste !== null) {
            sendPolygonToBack({ norte, sul, leste, oeste });
        }
    }, [norte, sul, leste, oeste]);

    const handlePolygonClick = (event: google.maps.MapMouseEvent) => {
        const latLng = event.latLng?.toJSON();
        if (latLng) {
            const newCoords = [...polygonCoords, latLng];
            setPolygonCoords(newCoords);
            if (!isExpanded) {
                setIsExpanded(true);
                // Role suavemente para o contêiner expandido
                containerRef.current?.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        const container = document.querySelector('.LocationContainer') || document.querySelector('.LocationContainerExpanded');
        if (container && !container.contains(event.target as Node)) {
            setIsExpanded(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const togglePolygonVisibility = () => {
        setIsPolygonVisible((prev) => !prev);
        PolySwitch();
    };

    const handleClearPolygon = () => {
        setPolygonCoords([]);
    };

    const calcularExtremos = (coords: google.maps.LatLngLiteral[]) => {
        const latitudes = coords.map(coord => coord.lat);
        const longitudes = coords.map(coord => coord.lng);

        const norte = Math.max(...latitudes);
        const sul = Math.min(...latitudes);
        const leste = Math.max(...longitudes);
        const oeste = Math.min(...longitudes);

        setNorte(norte);
        setSul(sul);
        setLeste(leste);
        setOeste(oeste);
    };

    const handleMarkerDragEnd = (index: number, e: google.maps.MapMouseEvent) => {
        const newCoordinate = e.latLng?.toJSON();
        if (newCoordinate) {
            const updatedCoords = [...polygonCoords];
            updatedCoords[index] = newCoordinate;
            setPolygonCoords(updatedCoords);
            calcularExtremos(updatedCoords);
        }
    };

    const PolySwitch = () => {
        setShowPoly(!ShowPoly);
    };

    if (loadError) {
        return <div>Erro ao carregar o mapa.</div>;
    }

    if (!isLoaded) {
        return <div>Carregando mapa...</div>;
    }


    return (
        <div className='MainMapContainer'>
            <div className={'LocationContainer'} ref={containerRef}>
                <div className={isExpanded ? 'LocationExpanded' : 'Location'}>
                    <div className='MapWrapper'>
                        <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '100%' }}
                            center={mapCenter ?? undefined}
                            zoom={regiao ? 10 : 2}
                            onClick={handlePolygonClick}
                        >
                            {isPolygonVisible && (
                                <>
                                    <Polygon
                                        paths={polygonCoords}
                                        options={{ fillColor: "blue", fillOpacity: 0.4, strokeColor: "blue", strokeOpacity: 1 }}
                                    />
                                    {polygonCoords.map((coord, index) => (
                                        <Marker key={index} position={coord} />
                                    ))}
                                </>
                            )}
                            {polygonCoords.map((coord, index) => (
                                <Marker
                                    key={index}
                                    position={coord}
                                    draggable
                                    onDragEnd={(e) => handleMarkerDragEnd(index, e)}
                                />
                            ))}
                        </GoogleMap>
                    </div>
                    {norte && sul && leste && oeste && (
                        <div style={styles.coordContainer}>
                            <p>Norte: {norte.toFixed(6)}</p>
                            <p>Sul: {sul.toFixed(6)}</p>
                            <p>Leste: {leste.toFixed(6)}</p>
                            <p>Oeste: {oeste.toFixed(6)}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className='PolyControlRow'>
                <div className='PolyControlButton' onClick={handleClearPolygon}>
                    <img src={PolyErase} alt="Limpar poligono" />
                </div>
                <div className='PolyControlButton' onClick={togglePolygonVisibility}>
                    {ShowPoly ? (<img src={PolyShow} alt="Motrar poligono" />) : (<img src={PolyHide} alt="Apagar poligono" />)}
                </div>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    coordContainer: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        borderRadius: 10,
    }
};

export default MapSelector;
