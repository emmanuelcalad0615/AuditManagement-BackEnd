import React, { useState, useEffect } from 'react';
import './PlanAuditoria.css'; // Usamos el mismo CSS para mantener la coherencia visual
import { traerTodo, traerID, traerTodoTrabajador } from './metodos';
import PlanEdit from './PlanEdit';
import PlanCreate from './PlanCreate';

const PlanAuditoria = () => {
  const [planes, setPlanes] = useState([]);
  const [vista, setVista] = useState('principal');
  const [plan, setPlan] = useState(0);
  const [objeto, setObjeto] = useState({});
  const [trabajadores, setTrabajadores] = useState([]);

  useEffect(() => {
    traerTodo().then((e) => setPlanes([...e]));
    traerTodoTrabajador().then((e) => setTrabajadores(e));
  }, [vista]);

  return (
    <>
      {vista === 'principal' && (
        <section className="seccion activa p-5">
          <div className="bg-white rounded-2xl p-5">
            <h3 className="text-[#1E3766] text-xl font-bold mb-4 text-center">Planes de Auditoría</h3>
            <table className="tabla-trabajadores w-full text-center mb-4">
              <thead className="bg-[#1E3766] text-white">
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
                {trabajadores.length > 0 && planes.length > 0 ? (
                  planes.map((plan) => (
                    <tr
                      key={plan.id}
                      className="hover:bg-gray-100 cursor-pointer text-base transition-colors"
                      onClick={() => {
                        setPlan(plan.id);
                        setVista('edit');
                        traerID(plan.id).then((e) => setObjeto(e));
                      }}
                    >
                      <td>{plan.tipo}</td>
                      <td>{plan.subtipo}</td>
                      <td>{plan.nombre}</td>
                      <td>{plan.proceso}</td>
                      <td>{plan.lider_proceso}</td>
                      <td>{trabajadores.find((t) => t.id === plan.auditor_lider)?.nombre || 'Cargando...'}</td>
                      <td>{trabajadores.find((t) => t.id === plan.auditor)?.nombre || 'Cargando...'}</td>
                      <td>{plan.estado}</td>
                      <td>{plan.fecha}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      Cargando datos...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="flex justify-end">
              <button
                className="btn"
                onClick={() => setVista('create')}
              >
                ➕ Agregar Plan
              </button>
            </div>
          </div>
        </section>
      )}

      {vista === 'create' && <PlanCreate volver={() => setVista('principal')} />}
      {vista === 'edit' && <PlanEdit id={plan} volver={() => setVista('principal')} />}
    </>
  );
};

export default PlanAuditoria;
