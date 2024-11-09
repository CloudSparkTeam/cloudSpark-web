// Components/CoordinatesDisplay.tsx
import React from 'react';

interface CoordinatesDisplayProps {
    norte: number | null;
    sul: number | null;
    leste: number | null;
    oeste: number | null;
}

const CoordinatesDisplay: React.FC<CoordinatesDisplayProps> = ({ norte, sul, leste, oeste }) => (
    <div style={styles.coordContainer}>
        {norte !== null && sul !== null && leste !== null && oeste !== null && (
            <>
                <p>Norte: {norte.toFixed(6)}</p>
                <p>Sul: {sul.toFixed(6)}</p>
                <p>Leste: {leste.toFixed(6)}</p>
                <p>Oeste: {oeste.toFixed(6)}</p>
            </>
        )}
    </div>
);

const styles = {
    coordContainer: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        borderRadius: 10,
    } as React.CSSProperties,
};

export default CoordinatesDisplay;
