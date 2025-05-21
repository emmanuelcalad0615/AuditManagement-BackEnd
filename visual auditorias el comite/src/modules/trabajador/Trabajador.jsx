import React, { useState, useEffect } from 'react';
import './Trabajador.css';
import {
  traerID,
  traerTodo,
  borrarID,
  guardartrabajador,
  actualizartrabajador,
  traerSectores
} from './metodos';

const Trabajador = () => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [vista, setVista] = useState('principal');
  const [trabajadorId, setTrabajadorId] = useState(null);
  const [sectores, setSectores] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    celular: '',
    correo: '',
    id_sector: ''
  });
  const [reload, setReload] = useState(false);

  useEffect(() => {
    traerSectores().then(data => setSectores(data));
  }, []);

  useEffect(() => {
    if (vista === 'principal') {
      traerTodo()
        .then(data => {
          if (Array.isArray(data)) setTrabajadores(data);
        })
        .catch(console.error);
    }
  }, [vista, reload]);

  const handleEditar = (id) => {
    setTrabajadorId(id);
    traerID(id).then(data => {
      setForm({
        nombre: data.nombre,
        celular: data.celular,
        correo: data.correo,
        id_sector: data.id_sector
      });
    });
    setVista('editar');
  };

  const handleBorrar = (id) => {
    borrarID(id).then(() => setReload(prev => !prev));
  };

  const handleGuardarEdicion = () => {
  actualizartrabajador(trabajadorId, form).then(() => {
    setVista('principal');
    setReload(prev => !prev);
  });
};

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = (formElement) => {
    formElement.reset();
    setVista('principal');
  };

  return (
    <>
      {vista === 'principal' && (
        <section className="seccion activa p-5">
          <div className="bg-white rounded-2xl p-5">
            <h3 className="text-[#1E3766] text-xl font-bold mb-4 text-center">Trabajadores</h3>
            <table className="tabla-trabajadores w-full text-center mb-4">
              <thead className="bg-[#1E3766] text-white">
                <tr>
                  <th>Nombre</th>
                  <th>Celular</th>
                  <th>Correo</th>
                  <th>Sector</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {trabajadores.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nombre}</td>
                    <td>{item.celular}</td>
                    <td>{item.correo}</td>
                    <td>{sectores.find(s => s.id === item.id_sector)?.nombre || '—'}</td>
                    <td className="table-actions">
                      <button className="btn btn-green" onClick={() => handleEditar(item.id)}>🖉 Editar</button>
                      <button className="btn btn-red" onClick={() => handleBorrar(item.id)}>🗑️ Borrar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end">
              <button className="btn" onClick={() => setVista('formulario')}>➕ Agregar Trabajador</button>
            </div>
          </div>
        </section>
      )}

      {vista === 'formulario' && (
        <section className="bg-white rounded-xl m-5 p-5">
          <h2 className="bg-[#1E3766] text-white text-xl text-center rounded-xl mb-4">Agregar</h2>
          <form
            onSubmit={async (e) => {
              await guardartrabajador(e);
              setVista('principal');
              setReload(prev => !prev);
            }}
            onReset={(e) => handleReset(e.target)}
            className="flex flex-col items-center gap-4"
          >
            <label className="w-full max-w-md">
              Nombre
              <input name="nombre" className="input" required />
            </label>
            <label className="w-full max-w-md">
              Celular
              <input name="celular" type="tel" pattern="[0-9]{9,15}" className="input" required />
            </label>
            <label className="w-full max-w-md">
              Correo
              <input name="correo" type="email" className="input" required />
            </label>
            <label className="w-full max-w-md">
              Sector
              <select name="sector" className="input" required>
                <option value="">Seleccione un sector</option>
                {sectores.map((sector, index) => (
                  <option key={index} value={sector.id}>{sector.nombre}</option>
                ))}
              </select>
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
            Editar Trabajador
          </h2>
          <div className="bg-white rounded-xl p-4 w-full max-w-md flex flex-col gap-4">
            <input
              id="editar-nombre-trabajador"
              name="nombre"
              type="text"
              value={form.nombre}
              onChange={handleInputChange}
              className="input"
            />
            <input
              id="editar-celular-trabajador"
              name="celular"
              type="tel"
              pattern="[0-9]{9,15}"
              value={form.celular}
              onChange={handleInputChange}
              className="input"
            />
            <input
              id="editar-correo-trabajador"
              name="correo"
              type="email"
              value={form.correo}
              onChange={handleInputChange}
              className="input"
            />
            <select
              id="input-editar-sector"
              name="id_sector"
              value={form.id_sector}
              onChange={handleInputChange}
              className="input"
            >
              <option value="">Seleccione un sector</option>
              {sectores.map((sector, index) => (
                <option key={index} value={sector.id}>{sector.nombre}</option>
              ))}
            </select>
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

export default Trabajador;
