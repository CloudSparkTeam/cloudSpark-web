import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Polygon, Marker } from '@react-google-maps/api';

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
    const [regiao, setRegiao] = useState<MapSelectorInterface | null>(null);
    const [polygonCoords, setPolygonCoords] = useState<google.maps.LatLngLiteral[]>([]);
    const [norte, setNorte] = useState<number | null>(null);
    const [sul, setSul] = useState<number | null>(null);
    const [leste, setLeste] = useState<number | null>(null);
    const [oeste, setOeste] = useState<number | null>(null);

    // Defina a posição padrão para o centro do mapa
    const defaultCenter = { lat: -23.5505, lng: -46.6333 }; // São Paulo, por exemplo

    const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>(defaultCenter);
    const [isPolygonVisible, setIsPolygonVisible] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const center = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            };

            setRegiao(center);
            setMapCenter({ lat: center.latitude, lng: center.longitude });
        },
            () => { console.log("Erro ao obter localização"); });
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

    const handleMapClick = (e: google.maps.MapMouseEvent) => {
        const latLng = e.latLng?.toJSON();
        if (latLng && polygonCoords.length < 4) {
            setPolygonCoords([...polygonCoords, latLng]);
        } else if (polygonCoords.length === 4) {
            console.log('Você já selecionou 4 pontos.');
        }
    };

    const handlePolygonClick = (event: google.maps.MapMouseEvent) => {
        const latLng = event.latLng?.toJSON();
        if (latLng) {
            const newCoords = [...polygonCoords, latLng];
            setPolygonCoords(newCoords);
        }
    };

    const togglePolygonVisibility = () => {
        setIsPolygonVisible((prev) => !prev);
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

        console.log(`Norte: ${norte}, Sul: ${sul}, Leste: ${leste}, Oeste: ${oeste}`);
    };

    const handleMarkerDragEnd = (index: number, e: google.maps.MapMouseEvent) => {
        const newCoordinate = e.latLng?.toJSON();
        if (newCoordinate) {
            const updatedCoords = [...polygonCoords];
            updatedCoords[index] = newCoordinate;
            setPolygonCoords(updatedCoords);

            calcularExtremos(updatedCoords);
            console.log(`Marcador ${index + 1} atualizado para:`, newCoordinate);
        }
    };

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_TOKEN || ''}>
            <div style={styles.container}>
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

                {norte && sul && leste && oeste && (
                    <div style={styles.coordContainer}>
                        <p>Norte: {norte.toFixed(6)}</p>
                        <p>Sul: {sul.toFixed(6)}</p>
                        <p>Leste: {leste.toFixed(6)}</p>
                        <p>Oeste: {oeste.toFixed(6)}</p>
                    </div>
                )}
            </div>

            <div className='MapSelectorControls'>
                <button onClick={togglePolygonVisibility}>
                    {isPolygonVisible ? "Hide Polygon" : "Mostrar Polígono"}
                </button>
                <button onClick={handleClearPolygon}>Limpar Polígono</button>
            </div>
        </LoadScript>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    coordContainer: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        borderRadius: 10,
    }
};

export default MapSelector;
