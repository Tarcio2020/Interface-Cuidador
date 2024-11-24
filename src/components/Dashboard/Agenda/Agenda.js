import React, { useState, useEffect } from 'react';
import './Agenda.css';
import FullCalendar from './Calendar';

function Agenda() {
    const [dados, setDados] = useState([]); 
    
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch('http://localhost:8081/consulta/2'); 
          const data = await response.json();
          setDados(data); 
        };
    
        fetchData(); 
    }, []); 

    const dataAtual = new Date().toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const handleCheckboxChange = (idConsulta) => {
        setDados(dados.map(dado => 
            dado.idConsulta === idConsulta ? { ...dado, concluida: !dado.concluida } : dado
        ));
        
        // Quando a checkbox for marcada, aguarda 10 segundos antes de excluir o evento
        setTimeout(async () => {
            try {
                // Exclui o evento no banco de dados
                const response = await fetch(`http://localhost:8081/consulta/${idConsulta}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Remove o evento da tela (do estado)
                    setDados((prevDados) => prevDados.filter((dado) => dado.idConsulta !== idConsulta));
                } else {
                    console.error('Erro ao excluir evento no banco de dados');
                }
            } catch (error) {
                console.error('Erro de conexão com o servidor:', error);
            }
        }, 10000); // 10 segundos
    };

    return (
        <div className="box">
            <div className="reminder">
                <h3>Próximos Eventos</h3>
                <p>Data: {dataAtual}</p>  
                <br />
                <ul>
                    {dados.map(dado => (
                        <li key={dado.idConsulta}>
                            <input 
                                type="checkbox" 
                                checked={dado.concluida} 
                                onChange={() => handleCheckboxChange(dado.idConsulta)}
                            />
                            <label style={{ textDecoration: dado.concluida ? 'line-through' : 'none' }}>
                                {dado.especialidade}
                                <span style={{ margin: '0 8px' }}></span> {/* Espaço entre os dados */}
                                {new Date(dado.data).toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                })}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="calendar">
                <FullCalendar />
            </div>
        </div>
    );
}

export default Agenda;
