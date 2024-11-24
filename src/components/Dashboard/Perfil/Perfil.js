import React, { useEffect, useState } from 'react';
import './Perfil.css';
import idosoImg from '../../../assets/img/idoso.jpg'; // Mantém a imagem como padrão

import axios from 'axios';

function Perfil() {
  // Estado para os dados do idoso
  const [idoso, setIdoso] = useState({
    nome: '',
    cpf: '',
    idade: '',
    sexo: '',
    tipoSanguineo: '',
    Necessidades: '', // Caso a API não retorne essa informação
  });

  useEffect(() => {
    // Fazendo a requisição
    axios
      .get('http://localhost:8083/idoso/22222222222')
      .then((response) => {
        const data = response.data;
        setIdoso({
          nome: data.nome,
          cpf: data.cpfIdoso,
          idade: data.idade,
          sexo: data.sexo === 'f' ? 'Feminino' : 'Masculino', // Traduz para exibição
          tipoSanguineo: data.tipoSanguineo.toUpperCase(),
          estadoCivil: data.necessidades, // Atualize conforme necessário
        });
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados:', error);
      });
  }, []);

  return (
    <div className="box">
      <div className="box-img">
        <img src={idosoImg} alt="Foto do idoso" />
      </div>
      <div className="box-text">
        <h2>{idoso.nome || 'Carregando...'}</h2>
        <br />
        <h3>Idade: {idoso.idade}</h3>
        <h3>Cpf: {idoso.cpfIdoso}</h3>
        <h3>Sexo: {idoso.sexo}</h3>
        <h3>Tipo Sanguíneo: {idoso.tipoSanguineo}</h3>
        <h3>Necessidades: {idoso.estadoCivil}</h3>
      </div>
    </div>
  );
}

export default Perfil;
