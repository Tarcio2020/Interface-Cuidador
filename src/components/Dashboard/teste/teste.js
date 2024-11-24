import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './teste.css';

function Teste() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [novoMedicamento, setNovoMedicamento] = useState({
    nome: '',
    dosagem: '',
    frequencia: '',
    receita: '',
  });

  // Função para buscar medicamentos
  useEffect(() => {
    axios
      .get('http://localhost:8082/medicamentos')
      .then((response) => {
        setMedicamentos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar medicamentos:', error);
      });
  }, []);

  // Função para cadastrar medicamento
  const cadastrarMedicamento = () => {
    if (!novoMedicamento.nome) {
      alert('O nome do medicamento é obrigatório.');
      return;
    }

    axios
      .post('http://localhost:8082/medicamentos', novoMedicamento)
      .then((response) => {
        setMedicamentos((prev) => [...prev, response.data]);
        setNovoMedicamento({ nome: '', dosagem: '', frequencia: '', receita: '' });
      })
      .catch((error) => {
        console.error('Erro ao cadastrar medicamento:', error);
      });
  };

  // Função para deletar medicamento
  const deletarMedicamento = (id) => {
    axios
      .delete(`http://localhost:8082/medicamentos/${id}`)
      .then(() => {
        setMedicamentos((prev) => prev.filter((med) => med.id !== id));
      })
      .catch((error) => {
        console.error('Erro ao deletar medicamento:', error);
      });
  };

  return (
    <div className="container">
      {/* Painel esquerdo: Lista de medicamentos */}
      <div className="left-panel">
        <h2>Medicamentos</h2>
        {medicamentos.map((med) => (
          <div key={med.id} className="medicamento-item">
            <h3>{med.nome}</h3>
            <p>Dosagem: {med.dosagem || 'Não especificado'}</p>
            <p>Frequência: {med.frequencia || 'Não especificado'}</p>
            <p>
              Receita:{' '}
              {med.receita ? (
                <a href={med.receita} target="_blank" rel="noopener noreferrer">
                  Ver receita
                </a>
              ) : (
                'Não especificado'
              )}
            </p>
            <button onClick={() => deletarMedicamento(med.id)} className="delete-btn">
              Deletar
            </button>
          </div>
        ))}
      </div>

      {/* Painel direito: Formulário de cadastro */}
      <div className="right-panel">
        <h2>Cadastrar Medicamento</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            cadastrarMedicamento();
          }}
        >
          <label>
            Nome:
            <input
              type="text"
              value={novoMedicamento.nome}
              onChange={(e) =>
                setNovoMedicamento({ ...novoMedicamento, nome: e.target.value })
              }
            />
          </label>
          <label>
            Dosagem:
            <input
              type="text"
              value={novoMedicamento.dosagem}
              onChange={(e) =>
                setNovoMedicamento({ ...novoMedicamento, dosagem: e.target.value })
              }
            />
          </label>
          <label>
            Frequência:
            <input
              type="text"
              value={novoMedicamento.frequencia}
              onChange={(e) =>
                setNovoMedicamento({ ...novoMedicamento, frequencia: e.target.value })
              }
            />
          </label>
          <label>
            Receita (URL):
            <input
              type="text"
              value={novoMedicamento.receita}
              onChange={(e) =>
                setNovoMedicamento({ ...novoMedicamento, receita: e.target.value })
              }
            />
          </label>
          <button type="submit" className="submit-btn">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Teste;
