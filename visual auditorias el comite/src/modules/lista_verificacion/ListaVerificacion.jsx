import React, { useState, useEffect } from 'react';
import './ListaVerificacion.css';
import {
  traerID,
  traerTodo,
  borrarID,
  guardarlista_verificacion,
  actualizarlista_verificacion
} from './metodos.js';

const ListaVerificacion = () => {
  const [listas, setListas] = useState([]);
  const [vista, setVista] = useState('principal');
  const [listaId, setListaId] = useState(null);
  const [descripcionEdit, setDescripcionEdit] = useState('');
  const [cumplimientoEdit, setCumplimientoEdit] = useState('');
  const [incumplimientoEdit, setIncumplimientoEdit] = useState('');
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (vista === 'principal') {
      traerTodo()
        .then(data => {
          if (Array.isArray(data)) setListas(data);
        })
        .catch(console.error);
    }
  }, [vista, reload]);

  const handleEditar = (id) => {
    setListaId(id);
    traerID(id).then(data => {
      setDescripcionEdit(data.descripcion);
      setCumplimientoEdit(data.cumplimiento);
      setIncumplimientoEdit(data.incumplimiento);
    });
    setVista('editar');
  };

  const handleBorrar = (id) => {
    borrarID(id).then(() => {
      setReload(prev => !prev);
    });
  };

  const handleGuardarEdicion = () => {
    const datosActualizados = {
      descripcion: descripcionEdit,
      cumplimiento: cumplimientoEdit,
      incumplimiento: incumplimientoEdit
    };

    actualizarlista_verificacion(listaId, datosActualizados).then(() => {
      setVista('principal');
      setReload(prev => !prev);
    });
  };

  const handleReset = (form) => {
    form.reset(); // limpia campos del form
  };

  return (
    <>
      {vista === 'principal' && (
        <section className="seccion activa p-5">
          <div className="bg-white rounded-2xl p-5">
            <h3 className="text-[#1E3766] text-xl font-bold mb-4 text-center">Lista de Verificación</h3>
            <table className="tabla-trabajadores w-full text-center mb-4">
              <thead className="bg-[#1E3766] text-white">
                <tr>
                  <th>Descripción</th>
                  <th>Cumplimiento</th>
                  <th>Incumplimiento</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {listas.map((item, index) => (
                  <tr key={index}>
                    <td>{item.descripcion}</td>
                    <td>{item.cumplimiento}</td>
                    <td>{item.incumplimiento}</td>
                    <td className="table-actions">
                      <button className="btn btn-green" onClick={() => handleEditar(item.id)}>
                        🖉 Editar
                      </button>
                      <button className="btn btn-red" onClick={() => handleBorrar(item.id)}>
                        🗑️ Borrar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end">
              <button className="btn " onClick={() => setVista('formulario')}>➕ Agregar Lista</button>
            </div>
          </div>
        </section>
      )}

      {vista === 'formulario' && (
        <section className="bg-white rounded-xl m-5 p-5">
          <h2 className="bg-[#1E3766] text-white text-xl text-center rounded-xl mb-4">Agregar</h2>
          <form
            onSubmit={async (e) => {
              await guardarlista_verificacion(e);
              setVista('principal');
              setReload(prev => !prev);
            }}
            onReset={(e) => {
              handleReset(e.target);
              setVista('principal');
            }}
            className="flex flex-col items-center gap-4"
          >
            <label className="w-full max-w-md">
              Descripción
              <textarea name="descripcion" className="textarea" required />
            </label>
            <label className="w-full max-w-md">
              Cumplimiento
              <textarea name="cumplimiento" className="textarea" required />
            </label>
            <label className="w-full max-w-md">
              Incumplimiento
              <textarea name="incumplimiento" className="textarea" required />
            </label>
            <div className="flex gap-4 mt-4">
              <button type="submit" className="btn">Guardar</button>
              <button type="reset" className="btn-gray">Cancelar</button>
            </div>
          </form>
        </section>
      )}

      {vista === 'editar' && (
        <section className="flex flex-col items-center w-full p-5">
          <h2 className="bg-[#1E3766] text-white text-xl w-full text-center rounded-xl mb-4">
            Editar ítem
          </h2>
          <div className="bg-white rounded-xl p-4 w-full max-w-md flex flex-col gap-4">
            <input
              type="text"
              value={descripcionEdit}
              onChange={(e) => setDescripcionEdit(e.target.value)}
              className="input"
            />
            <input
              type="text"
              value={cumplimientoEdit}
              onChange={(e) => setCumplimientoEdit(e.target.value)}
              className="input"
            />
            <input
              type="text"
              value={incumplimientoEdit}
              onChange={(e) => setIncumplimientoEdit(e.target.value)}
              className="input"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button className="btn" onClick={handleGuardarEdicion}>Guardar</button>
            <button className="btn-gray" onClick={() => setVista('principal')}>Cancelar</button>
          </div>
        </section>
      )}
    </>
  );
};

export default ListaVerificacion;
