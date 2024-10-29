// Components/MapSelector.tsx
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import PolygonComponent from './Polygon';
import MapControls from './MapControls';
import CoordinatesDisplay from './CoordinatesDisplay';

interface MapSelectorProps {
    sendPolygonToBack: (coords: { norte: number; sul: number; leste: number; oeste: number }) => void;
}

function MapSelector({ sendPolygonToBack }: MapSelectorProps): React.JSX.Element {
    const [polygonCoords, setPolygonCoords] = useState<google.maps.LatLngLiteral[]>([]);
    const [isPolygonVisible, setIsPolygonVisible] = useState(false);
    const [norte, setNorte] = useState<number | null>(null);
    const [sul, setSul] = useState<number | null>(null);
    const [leste, setLeste] = useState<number | null>(null);
    const [oeste, setOeste] = useState<number | null>(null);

    const defaultCenter = { lat: -23.5505, lng: -46.6333 }; // São Paulo 
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
            setPolygonCoords((prevCoords) => [...prevCoords, latLng]);
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

        setNorte(Math.max(...latitudes));
        setSul(Math.min(...latitudes));
        setLeste(Math.max(...longitudes));
        setOeste(Math.min(...longitudes));
    };

    const handleMarkerDragEnd = (index: number, e: google.maps.MapMouseEvent) => {
        const newCoordinate = e.latLng?.toJSON();
        if (newCoordinate) {
            setPolygonCoords((prevCoords) => {
                const updatedCoords = [...prevCoords];
                updatedCoords[index] = newCoordinate;
                calcularExtremos(updatedCoords);
                return updatedCoords;
            });
        }
    };

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_TOKEN || ''}>
            <div style={styles.container}>
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={mapCenter}
                    zoom={10}
                    onClick={handlePolygonClick}
                >
                    <PolygonComponent
                        polygonCoords={polygonCoords}
                        isPolygonVisible={isPolygonVisible}
                        onPolygonClick={handlePolygonClick}
                        onMarkerDragEnd={handleMarkerDragEnd}
                    />
                </GoogleMap>

                <CoordinatesDisplay norte={norte} sul={sul} leste={leste} oeste={oeste} />
            </div>

            <MapControls
                isPolygonVisible={isPolygonVisible}
                onTogglePolygonVisibility={togglePolygonVisibility}
                onClearPolygon={handleClearPolygon}
            />
        </LoadScript>
    );
}

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        position: 'relative'
    } as React.CSSProperties,
};

export default MapSelector;
