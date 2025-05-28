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

const validarNombre = (nombre) => {
  if (!nombre.trim()) return 'El nombre es obligatorio';
  const match = nombre.match(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/);
  if (match) return `Caracter inválido: "${match[0]}"`;
  return '';
};

const validarCelular = (celular) => {
  if (!celular.trim()) return 'El celular es obligatorio';
  if (!/^\d+$/.test(celular)) return 'Ingrese solo números';
  if (celular.length !== 10) return 'El celular debe tener 10 números';
  return '';
};

const validarCorreo = (correo) => {
  if (!correo.trim()) return 'El correo es obligatorio';
  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correo)) return 'Correo inválido';
  return '';
};

const validarSector = (id_sector) => {
  if (!id_sector) return 'Debe seleccionar un sector';
  return '';
};

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
  const [errores, setErrores] = useState({});
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
      setErrores({});
    });
    setVista('editar');
  };

  const handleBorrar = (id) => {
    borrarID(id).then(() => setReload(prev => !prev));
  };

  const validarFormulario = (formData) => {
    const nuevosErrores = {
      nombre: validarNombre(formData.nombre),
      celular: validarCelular(formData.celular),
      correo: validarCorreo(formData.correo),
      id_sector: validarSector(formData.id_sector)
    };
    setErrores(nuevosErrores);
    return !Object.values(nuevosErrores).some(Boolean);
  };

  const handleGuardarEdicion = () => {
    if (!validarFormulario(form)) return;
    actualizartrabajador(trabajadorId, form).then(() => {
      setVista('principal');
      setReload(prev => !prev);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrores({ ...errores, [name]: '' });
  };

  const handleReset = (formElement) => {
    formElement.reset();
    setForm({
      nombre: '',
      celular: '',
      correo: '',
      id_sector: ''
    });
    setErrores({});
    setVista('principal');
  };

  const handleAgregarSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      nombre: e.target.nombre.value,
      celular: e.target.celular.value,
      correo: e.target.correo.value,
      id_sector: e.target.sector.value,
      password: e.target.password.value
    };
    if (!validarFormulario(formData)) return;
    await guardartrabajador({
      ...formData,
      id_sector: formData.id_sector
    });
    setVista('principal');
    setReload(prev => !prev);
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
              <button className="btn" onClick={() => { setVista('formulario'); setErrores({}); setForm({ nombre: '', celular: '', correo: '', id_sector: '' , password: ''}); }}>➕ Agregar Trabajador</button>
            </div>
          </div>
        </section>
      )}

      {vista === 'formulario' && (
        <section className="bg-white rounded-xl m-5 p-5">
          <h2 className="bg-[#1E3766] text-white text-xl text-center rounded-xl mb-4">Agregar</h2>
          <form
            onSubmit={handleAgregarSubmit}
            onReset={(e) => handleReset(e.target)}
            className="flex flex-col items-center gap-4"
            noValidate
          >
            <label className="w-full max-w-md">
              Nombre
              <input name="nombre" className="input" required />
              {errores.nombre && <span className="text-red-500 text-sm">{errores.nombre}</span>}
            </label>
            <label className="w-full max-w-md">
              Celular
              <input name="celular" type="tel" className="input" required />
              {errores.celular && <span className="text-red-500 text-sm">{errores.celular}</span>}
            </label>
            <label className="w-full max-w-md">
              Correo
              <input name="correo" type="email" className="input" required />
              {errores.correo && <span className="text-red-500 text-sm">{errores.correo}</span>}
            </label>
            <label className="w-full max-w-md">
              Password
              <input name="password" type="password" className="input" required />
            </label>
            <label className="w-full max-w-md">
              Sector
              <select name="sector" className="input" required>
                <option value="">Seleccione un sector</option>
                {sectores.map((sector, index) => (
                  <option key={index} value={sector.id}>{sector.nombre}</option>
                ))}
              </select>
              {errores.id_sector && <span className="text-red-500 text-sm">{errores.id_sector}</span>}
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
            <label>
              <input
                id="editar-nombre-trabajador"
                name="nombre"
                type="text"
                value={form.nombre}
                onChange={handleInputChange}
                className="input"
              />
              {errores.nombre && <span className="text-red-500 text-sm">{errores.nombre}</span>}
            </label>
            <label>
              <input
                id="editar-celular-trabajador"
                name="celular"
                type="tel"
                value={form.celular}
                onChange={handleInputChange}
                className="input"
              />
              {errores.celular && <span className="text-red-500 text-sm">{errores.celular}</span>}
            </label>
            <label>
              <input
                id="editar-correo-trabajador"
                name="correo"
                type="email"
                value={form.correo}
                onChange={handleInputChange}
                className="input"
              />
              {errores.correo && <span className="text-red-500 text-sm">{errores.correo}</span>}
            </label>
            <label>
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
              {errores.id_sector && <span className="text-red-500 text-sm">{errores.id_sector}</span>}
            </label>
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
