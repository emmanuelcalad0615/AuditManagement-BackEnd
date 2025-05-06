import React, { useState, useEffect } from 'react';
import './PlanAuditoria.css'; // Si tienes estilos aparte, opcional
import {traerTodo, traerID, traerTodoTrabajador} from './metodos'
import PlanEdit from './PlanEdit';

const PlanAuditoria = () => {

  const [planes, setPlanes] = useState([]);
  const [vista, setVista] = useState('principal')
  const [plan, setPlan] = useState(0)
  const [objeto, setObjeto] = useState({})
  const [trabajadores, setTrabajadores] = useState([])

  useEffect( ()=> {
   traerTodo().then( (e)=>setPlanes([...e]));
   traerTodoTrabajador().then((e)=>setTrabajadores(e))

  }, [vista])

  return (
    <>
    { vista === 'principal' &&
    <section id="auditoria" className="seccion">
              <div id="contenedor-tabla-trabajadores" 
        className="flex  text-center
        justify-center flex-col bg-white rounded-2xl m-5">
      <h2 className="titulo-tabla text-[#1E3766]
          text-xl">Planes de Auditoría</h2>
        <table>
          <thead className='bg-[#1E3766] text-white'>
            <tr>
              <th>Tipo</th>
              <th>Subtipo</th>
              <th>Auditoría</th>
              <th>Proceso</th>
              <th>Líder Proceso</th>
              <th>Líder Auditor</th>
              <th>Auditor</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {planes.map( (plan, index) => (
            <tr key={plan.id}
            className="hover:bg-gray-200 transition-colors duration-200 text-xl" 
            onClick={() => {setPlan(plan.id);setVista('edit'); traerID(plan.id).then((e)=>{setObjeto(e)})}} style={{ cursor: "pointer" }}>
              <td>{plan.tipo}</td>
              <td>{plan.subtipo}</td>
              <td>{plan.nombre}</td>
              <td>{plan.proceso}</td>
              <td>{plan.lider_proceso}</td>
              <td>{trabajadores.find(trabajador => trabajador.id == plan.auditor_lider).nombre}</td>
              <td>{trabajadores.find(trabajador => trabajador.id == plan.auditor).nombre}</td>
              <td>{plan.estado}</td>
              <td>{plan.fecha}</td>
            </tr>              
            ))}

          </tbody>
        </table>
        </div>
        <div className="botones">
        <button 
        className="bg-[#1E3766] rounded-full text-white text-xl ml-5 p-2" >
          Agregar
        </button>
        </div>
    </section>
    }


    {vista === 'edit' &&
      <PlanEdit id={plan}/>
    }
    </>
  );
};

export default PlanAuditoria;
