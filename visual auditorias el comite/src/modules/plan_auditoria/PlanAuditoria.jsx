import React, { useState, useEffect } from 'react';
import './PlanAuditoria.css';
import {
  traerTodo,
  traerID,
  traerTodoTrabajador,
  crearPlan,
  actualizarplan
} from './metodos';
import PlanEdit from './PlanEdit';

const PlanAuditoria = () => {
  const [planes, setPlanes] = useState([]);
  const [vista, setVista] = useState('principal');
  const [plan, setPlan] = useState(null);
  const [objeto, setObjeto] = useState(null);
  const [trabajadores, setTrabajadores] = useState([]);

  useEffect(() => {
    traerTodo().then(setPlanes);
    traerTodoTrabajador().then(setTrabajadores);
  }, [vista]);

  const obtenerNombreTrabajador = (id) => {
    if (!id) return '—';
    const persona = trabajadores.find(t => t.id === id);
    return persona ? persona.nombre : '—';
  };

  const agregarNuevoPlan = () => {
    const nuevo = {
      id: null,
      nombre: '',
      tipo: '',
      subtipo: '',
      proceso: '',
      lider_proceso: '',
      auditor_lider: null,
      auditor: null,
      estado: 'Nuevo',
      fecha: new Date().toISOString().slice(0, 16)
    };
    setObjeto(nuevo);
    setPlan(null);
    setVista('edit');
  };

  const guardarPlan = async (planData) => {
  let creado;
  if (planData.id) {
    await actualizarplan(planData);
    creado = planData;
  } else {
    creado = await crearPlan(planData); // <- Este devuelve el nuevo plan con id
  }
  setVista('principal');
  return creado; // <--- NECESARIO para que PlanEdit sepa el ID
};



  // --- Vista principal ---
  const renderPrincipal = () => (
    <section id="auditoria" className="seccion px-4 py-6">
      <div className="bg-white rounded-2xl shadow-md p-6 m-5">
        <h2 className="text-[#1E3766] text-xl font-bold mb-4 text-center">
          Planes de Auditoría
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-center table-auto border-collapse">
            <thead className="bg-[#1E3766] text-white text-sm">
              <tr>
                <th className="p-2">Tipo</th>
                <th className="p-2">Subtipo</th>
                <th className="p-2">Auditoría</th>
                <th className="p-2">Proceso</th>
                <th className="p-2">Líder Proceso</th>
                <th className="p-2">Líder Auditor</th>
                <th className="p-2">Auditor</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Fecha</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {planes.map(p => (
                <tr
                  key={p.id}
                  className="hover:bg-gray-100 transition-colors cursor-pointer border-b"
                  onClick={() => {
                    traerID(p.id).then(d => {
                      setObjeto(d);
                      setPlan(p.id);
                      setVista('edit');
                    });
                  }}
                >
                  <td className="p-2">{p.tipo}</td>
                  <td className="p-2">{p.subtipo}</td>
                  <td className="p-2">{p.nombre}</td>
                  <td className="p-2">{p.proceso}</td>
                  <td className="p-2">{p.lider_proceso}</td>
                  <td className="p-2">{obtenerNombreTrabajador(p.auditor_lider)}</td>
                  <td className="p-2">{obtenerNombreTrabajador(p.auditor)}</td>
                  <td className="p-2">{p.estado}</td>
                  <td className="p-2">{p.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <button className="btn" onClick={agregarNuevoPlan}>➕ Agregar Plan</button>
        </div>
      </div>
    </section>
  );

  // --- Vista edición/agregado ---
  const renderEdicion = () => (
    <PlanEdit
      plan={objeto}
      onGuardar={guardarPlan}
      onCancelar={() => setVista('principal')}
    />
  );

  return (
    <>
      {vista === 'principal' && renderPrincipal()}
      {vista === 'edit' && renderEdicion()}
    </>
  );
};

export default PlanAuditoria;
