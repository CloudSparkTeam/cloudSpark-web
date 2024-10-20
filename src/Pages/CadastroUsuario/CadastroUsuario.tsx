import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import './style.css'; // Importando o arquivo CSS
import Navbar from '../../Componets/Navbar/App';

const CadastroUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  const handleCadastro = async () => {
    if (!nome || !senha || !email || !dataNascimento) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      console.log('Enviando estes dados:', { nome, email, dataNascimento, senha });

      const response = await fetch('http://localhost:3002/usuario/criar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, senha, email, data_nascimento: dataNascimento })
      });

      const data = await response.json();
      console.log('Dados recebidos do backend:', data);

      if (response.ok) {
        alert('Cadastro concluído com sucesso');
        navigate('/login'); // Navega para a página de login após o cadastro
      } else {
        alert('Erro ao fazer cadastro');
      }
    } catch (error) {
      alert('Erro ao conectar ao servidor');
      console.error('Erro:', error);
    }
  };

  return (

    <><Navbar /><div className='HomeContainer'>
      <div className='card'>
        <h2 className='title'>Cadastre a sua conta</h2>

        <input
          className='input'
          type='text'
          placeholder='Nome...'
          value={nome}
          onChange={(e) => setNome(e.target.value)} />
        <input
          className='input'
          type='email'
          placeholder='Email...'
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <input
          className='input'
          type='password'
          placeholder='Senha...'
          value={senha}
          onChange={(e) => setSenha(e.target.value)} />
        <input
          className='input'
          type='date'
          placeholder='Data de Nascimento'
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)} />

        <button className='linkText' onClick={() => navigate('/login')}>
          Já tenho uma conta!
        </button>

        <button className='button' onClick={handleCadastro}>
          Cadastrar
        </button>

        <button className='semcadastro' onClick={() => navigate('/')}>
          Continuar sem cadastrar conta
        </button>
      </div>
    </div></>
  );
}

export default CadastroUsuario;