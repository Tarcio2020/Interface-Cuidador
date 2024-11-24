import Perfil from './Perfil/Perfil';
import Agenda from './Agenda/Agenda';

function Dashboard() {
  return (
    <div className="container">
      <Perfil />
      <Agenda />
    </div>
  );
}

export default Dashboard;
