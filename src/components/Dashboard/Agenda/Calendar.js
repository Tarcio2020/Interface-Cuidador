import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';  // Importe o CSS personalizado

const FullCalendar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(null); // Limpa a data de saída se a entrada for alterada
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div className="calendarios">
      <div>
        <Calendar
          className="custom-calendar"  // Aplique a classe CSS personalizada
          onChange={handleStartDateChange}
          value={startDate}
          minDate={new Date()} // Impede seleção de datas anteriores à atual
        />
      </div>
    </div>
  );
};

export default FullCalendar;