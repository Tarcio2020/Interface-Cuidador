import { useEffect, useState } from 'react';
import './Top.css';
import { IoIosHome } from "react-icons/io";
import { CiPill } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import { SlNotebook } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";

function Top() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hideBar, setHideBar] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > scrollPosition) {
        setHideBar(true); 
      } else {
        setHideBar(false); 
      }
      setScrollPosition(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  return (
    <div className={`bar ${hideBar ? 'hide' : ''}`}>
      <h3 className="logo">Senior+</h3>
      <div className="nav-links">
        <a href="#home">Página Inicial <IoIosHome /></a>
        <a href="#agenda">Agenda <FaRegCalendarAlt /></a>
        <a href="#medicamentos">Medicamentos <CiPill /></a>
        <a href="#relatorios">Relatórios <SlNotebook /></a>
        <a onClick={toggleSidebar} href="#perfil">Perfil <FaRegUser /></a>
      </div>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <h2>Dados da Conta</h2>
        <ul>
          <li>Nome: Lucas</li>
          <li>Email: lucas@example.com</li>
          <li>Plano: Premium</li>
        </ul>

        <h3>Opções</h3>
        <ul>
          <li><a href="#">Editar Perfil</a></li>
          <li><a href="#">Configurações</a></li>
          <li><a href="#">Alterar Senha</a></li>
          <li><a href="#">Sair</a></li>
        </ul>
      </div>
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </div>
    
  );
}

export default Top;
