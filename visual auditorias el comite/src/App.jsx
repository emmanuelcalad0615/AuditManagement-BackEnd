import { useEffect, useState } from 'react';
import { FaClipboardList, FaUserTie, FaProjectDiagram, FaTasks } from 'react-icons/fa';
import Proceso from './modules/proceso/Proceso';
import Trabajador from './modules/trabajador/Trabajador';
import PlanAuditoria from './modules/plan_auditoria/PlanAuditoria';
import ListaVerificacion from './modules/lista_verificacion/ListaVerificacion';
import LoginForm from './modules/login/LoginForm';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn')  === 'true' || false;
  });
  const [moduloActual, setModuloActual] = useState("planAuditoria");



  const renderModulo = () => {
    switch (moduloActual) {
      case "planAuditoria":
        return <PlanAuditoria />;
      case "trabajadores":
        return <Trabajador />;
      case "procesos":
        return <Proceso />;
      case "lista":
        return <ListaVerificacion />;
      default:
        return <h2>Bienvenido</h2>;
    }
  };


  useEffect(() => {
  
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]
);


  if (!isLoggedIn) {
    return <LoginForm setIsLoggedIn={setIsLoggedIn}  />;
  }

 

  return (
    <div className="flex flex-row h-screen">
      <div className="sidebar">
        <h2>El Comité</h2>
        <button
          className={`sidebar-button ${moduloActual === 'planAuditoria' ? 'active' : ''}`}
          onClick={() => setModuloActual("planAuditoria")}
        >
          <FaClipboardList /> Planes Auditoría
        </button>
        <button
          className={`sidebar-button ${moduloActual === 'trabajadores' ? 'active' : ''}`}
          onClick={() => setModuloActual("trabajadores")}
        >
          <FaUserTie /> Trabajadores
        </button>
        <button
          className={`sidebar-button ${moduloActual === 'procesos' ? 'active' : ''}`}
          onClick={() => setModuloActual("procesos")}
        >
          <FaProjectDiagram /> Procesos
        </button>
        <button
          className={`sidebar-button ${moduloActual === 'lista' ? 'active' : ''}`}
          onClick={() => setModuloActual("lista")}
        >
          <FaTasks /> Lista de Verificación
        </button>
      </div>

      <div className="w-[82%] bg-gray-100 overflow-auto">
        <header className="p-4 shadow bg-white flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Panel de Control</h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        </header>

        <div className="p-6">
          {renderModulo()}
        </div>
      </div>
    </div>
  );
}

export default App;
