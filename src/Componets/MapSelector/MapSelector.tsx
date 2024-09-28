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
    sendPolygonToBack: (coords: google.maps.LatLngLiteral[]) => void;
}

function MapSelector({ sendPolygonToBack }: MapSelectorProps): React.JSX.Element {
    const [regiao, setRegiao] = useState<MapSelectorInterface | null>(null);
    const [polygonCoords, setPolygonCoords] = useState<google.maps.LatLngLiteral[]>([]);
    const [norte, setNorte] = useState<number | null>(null);
    const [sul, setSul] = useState<number | null>(null);
    const [leste, setLeste] = useState<number | null>(null);
    const [oeste, setOeste] = useState<number | null>(null);

    const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral | null>(null);
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
            setMapCenter({ lat: center.latitude, lng: center.longitude })
        },
            () => { console.log("Erro ao obter localização"); });
    }, []);

    useEffect(() => {
        if (polygonCoords.length === 4) {
            calcularExtremos(polygonCoords);
            setIsPolygonVisible(true);
        }
    }, [polygonCoords]);

    const handleMapClick = (e: google.maps.MapMouseEvent) => {
        const latLng = e.latLng?.toJSON();
        if (latLng && polygonCoords.length < 4) {
            setPolygonCoords([...polygonCoords, latLng]);
        } else if (polygonCoords.length === 4) {
            console.log('Você já selecionou 4 pontos.');
        }
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
                    onClick={handleMapClick}
                >
                    {polygonCoords.length >= 4 && (
                        <Polygon
                            paths={polygonCoords}
                            options={{
                                strokeColor: "#0000FF",
                                strokeOpacity: isPolygonVisible ? 0.8 : 0,
                                strokeWeight: 2,
                                fillColor: "rgba(0,0,255,0.3)",
                                fillOpacity: isPolygonVisible ? 0.35 : 0,

                            }

                            }
                        />
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