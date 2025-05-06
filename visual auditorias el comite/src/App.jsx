import { useState } from 'react'
import Proceso from './modules/proceso/Proceso'
import './App.css'
import Trabajador from './modules/trabajador/Trabajador';
import PlanAuditoria from './modules/plan_auditoria/PlanAuditoria';
import ListaVerificacion from './modules/lista_verificacion/ListaVerificacion';

function App() {

  const [moduloActual, setModuloActual] = useState("procesos");

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

  return (
    <div className="flex flex-row">
      <div className="h-screen w-[20%] bg-[#1E3766] flex text-center flex-col">
        <h2 className='text-white text-6xl m-5 mt-20 h-[20%]'>El Comité</h2>
        <button
          className="text-white text-xl m-3"
          onClick={() => setModuloActual("planAuditoria")}
        >
          Planes Auditoría
        </button>
    
        <button
          className="text-white text-xl m-3"
          onClick={() => setModuloActual("trabajadores")}
        >
          Trabajadores
        </button>
    
        <button
          className="text-white text-xl m-3"
          onClick={() => setModuloActual("procesos")}
        >
          Procesos
        </button>
  
        <button
          className="text-white text-xl m-3"
          onClick={() => setModuloActual("lista")}
        >
          Lista de Verificación
        </button>
      </div>

      <div className="h-screen w-[80%] bg-gray-200">
        <header className="header">
          <h1>Panel de Control</h1>
        </header>

        <div className="contenido">{renderModulo()}</div>
      </div>
    </div>
  )
}

export default App
