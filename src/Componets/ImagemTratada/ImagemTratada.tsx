import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Função simulada de quando o usuário finaliza a seleção de uma área no mapa
  const handleAreaSelection = () => {
    // Esta função seria chamada automaticamente após a seleção no mapa
    fetchImage();
  };

  // Função para buscar a imagem tratada do backend
  const fetchImage = async () => {
    setLoading(true);
    setError(null);

    try {
      // Chamada ao backend para buscar a imagem tratada
      const response = await axios.get('https://api.exemplo.com/imagem-tratada', {
        responseType: 'blob', // Espera um arquivo de imagem do backend
      });

      const imageBlob = URL.createObjectURL(response.data);
      setImageUrl(imageBlob);
    } catch (err) {
      setError('Erro ao buscar a imagem!');
    } finally {
      setLoading(false);
    }
  };

  // useEffect para simular a chamada da função de seleção de área no mapa
  useEffect(() => {
    // Simulando a seleção de área e chamando a função para buscar a imagem
    handleAreaSelection();
  }, []); // Este useEffect simula o comportamento após a seleção de área

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6">Análise de Imagem IA</h1>

      {loading ? (
        <p className="text-gray-600">Carregando imagem...</p>
      ) : (
        imageUrl ? (
          <img src={imageUrl} alt="Imagem Tratada" className="w-full max-w-md" />
        ) : (
          <p className="text-gray-600">Nenhuma imagem carregada</p>
        )
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default App;
