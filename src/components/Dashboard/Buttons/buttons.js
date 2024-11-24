import { useState } from "react";
import "../Buttons/buttons.css";

function Buttons() {
  const [modalOpen, setModalOpen] = useState(null);
  const [formData, setFormData] = useState({
    hospital: "Hospital das Clínicas",
    medico: "Dr. João Silva",
    data: "2024-11-25",
    hora: "14:30:00",
    recorrencia: 1,
    especialidade: "oftalmo",
    descricao: "Consulta de rotina para check-up.",
    diagnostico: "Pressão arterial elevada detectada.",
    usuario: 2,
  });

  const handleOpenModal = (modal) => {
    setModalOpen(modal);
  };

  const handleCloseModal = () => {
    setModalOpen(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enviar os dados para a API via POST
    try {
      const response = await fetch("http://localhost:8081/consulta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Converte o objeto formData em JSON
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar os dados.");
      }

      alert("Lembrete adicionado com sucesso!");
      handleCloseModal(); // Fecha o modal após sucesso
    } catch (error) {
      alert("Erro ao adicionar o lembrete: " + error.message);
    }
  };

  return (
    <div className="buttons">
      <div className="button" onClick={() => handleOpenModal("update")}>
        <h3>Atualizar dados do idoso</h3>
      </div>
      <div className="button" onClick={() => handleOpenModal("reminder")}>
        <h3>Adicionar nova consulta</h3>
      </div>
      <div className="button" onClick={() => handleOpenModal("reports")}>
        <h3>Relatórios</h3>
      </div>
      <div className="button" onClick={() => handleOpenModal("events")}>
        <h3>Registrar eventos diários</h3>
      </div>

      {/* Modais */}
      {modalOpen === "update" && (
        <Modal onClose={handleCloseModal}>
          <h2>Atualizar Dados do Idoso</h2>
          <form>
            <label>
              Nome: <input type="text" name="name" />
            </label>
            <label>
              Idade: <input type="number" name="age" />
            </label>
            <label>
              Tipo Sanguíneo: <input type="text" name="bloodType" />
            </label>
            <label>
              Estado Civil:{" "}
              <select name="maritalStatus">
                <option>Solteiro</option>
                <option>Casado</option>
                <option>Viúvo</option>
                <option>Divorciado</option>
              </select>
            </label>
            <label>
              Sexo:{" "}
              <select name="gender">
                <option>Masculino</option>
                <option>Feminino</option>
                <option>Outro</option>
              </select>
            </label>
            <label>
              Peso: <input type="number" step="0.1" name="weight" /> kg
            </label>
            <label>
              Altura: <input type="number" step="0.01" name="height" /> m
            </label>
            <label>
              Alergias: <textarea name="allergies"></textarea>
            </label>
            <label>
              Doenças Crônicas: <textarea name="chronicDiseases"></textarea>
            </label>
            <label>
              Contato de Emergência:{" "}
              <input type="text" name="emergencyContact" />
            </label>
            <label>
              Médico Responsável: <input type="text" name="doctor" />
            </label>
            <label>
              Medicamentos: <textarea name="medications"></textarea>
            </label>
            <label>
              Endereço Completo: <input type="text" name="address" />
            </label>
            <label>
              Preferências Alimentares:{" "}
              <textarea name="foodPreferences"></textarea>
            </label>
            <label>
              Hobbies: <textarea name="hobbies"></textarea>
            </label>
            <label>
              Mobilidade:{" "}
              <select name="mobility">
                <option>Independente</option>
                <option>Com auxílio (bengala, andador)</option>
                <option>Cadeira de Rodas</option>
              </select>
            </label>
            <button type="submit">Salvar</button>
          </form>
        </Modal>
      )}

      {modalOpen === "reminder" && (
        <Modal onClose={handleCloseModal}>
          <h2>Adicionar Novo Lembrete</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Hospital: 
              <input
                type="text"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Médico: 
              <input
                type="text"
                name="medico"
                value={formData.medico}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Data: 
              <input
                type="date"
                name="data"
                value={formData.data}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Hora: 
              <input
                type="time"
                name="hora"
                value={formData.hora}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Recorrência: 
              <input
                type="number"
                name="recorrencia"
                value={formData.recorrencia}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Especialidade: 
              <input
                type="text"
                name="especialidade"
                value={formData.especialidade}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Descrição: 
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Diagnóstico: 
              <textarea
                name="diagnostico"
                value={formData.diagnostico}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Usuário ID: 
              <input
                type="number"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
              />
            </label>
            <br />
            <button type="submit">Salvar</button>
          </form>
        </Modal>
      )}

      {modalOpen === "reports" && (
        <Modal onClose={handleCloseModal}>
          <h2>Relatórios</h2>
          <p>Visualize e exporte relatórios aqui.</p>
        </Modal>
      )}

      {modalOpen === "events" && (
        <Modal onClose={handleCloseModal}>
          <h2>Registrar Eventos Diários</h2>
          <form>
            <label>
              Evento: <input type="text" name="event" />
            </label>
            <button type="submit">Salvar</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

// Componente Modal
function Modal({ children, onClose }) {
  const handleBackdropClick = (event) => {
    if (event.target.className === "modal-backdrop") {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Buttons;
