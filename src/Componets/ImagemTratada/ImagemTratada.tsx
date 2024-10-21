import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
    const [imagens, setImagens] = useState<{ name: string; url: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Função para buscar imagens tratadas
    const fetchImagensTratadas = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3002/imagemSatelite/imagens-tratadas');
            setImagens(response.data);
        } catch {
            setError('Erro ao buscar imagens tratadas!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImagensTratadas(); // Busca as imagens quando o componente é montado
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center ">
            <h1 className="text-3xl font-bold mb-6">Imagens Tratadas</h1>

            {loading ? (
                <p className="text-gray-600">Carregando imagens...</p>
            ) : imagens.length > 0 ? (
                <div className="flex flex-wrap justify-center">
                    {imagens.map((imagem) => (
                        <div key={imagem.name} className="m-4">
                            <img
                                src={imagem.url}
                                alt={imagem.name}
                                className="w-48 h-48 object-cover" // Altere para o tamanho desejado
                            />
                            <p className="text-center">{imagem.name}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">Nenhuma imagem para exibir</p>
            )}

            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default App;