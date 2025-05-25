import React, { useState, useEffect } from 'react';
import './ListaVerificacion.css';
import {
  traerID,
  traerTodo,
  borrarID,
  guardarlista_verificacion,
  actualizarlista_verificacion
} from './metodos.js';

// Expresión regular: solo letras, números y espacios (puedes ajustar según tus necesidades)
const VALID_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]*$/;

const getInvalidChar = (value) => {
  // Devuelve el primer caracter inválido encontrado, o null si todo es válido
  for (let i = 0; i < value.length; i++) {
    if (!VALID_REGEX.test(value[i])) {
      return value[i];
    }
  }
  return null;
};

const ListaVerificacion = () => {
  const [listas, setListas] = useState([]);
  const [vista, setVista] = useState('principal');
  const [listaId, setListaId] = useState(null);
  const [descripcionEdit, setDescripcionEdit] = useState('');
  const [cumplimientoEdit, setCumplimientoEdit] = useState('');
  const [incumplimientoEdit, setIncumplimientoEdit] = useState('');
  const [reload, setReload] = useState(false);

  // Errores para edición
  const [editErrors, setEditErrors] = useState({
    descripcion: '',
    cumplimiento: '',
    incumplimiento: ''
  });

  // Errores para formulario de creación
  const [formErrors, setFormErrors] = useState({
    descripcion: '',
    cumplimiento: '',
    incumplimiento: ''
  });

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
      setEditErrors({ descripcion: '', cumplimiento: '', incumplimiento: '' });
    });
    setVista('editar');
  };

  const handleBorrar = (id) => {
    borrarID(id).then(() => {
      setReload(prev => !prev);
    });
  };

  const handleGuardarEdicion = () => {
    // Validar antes de guardar
    const errors = {
      descripcion: getInvalidChar(descripcionEdit)
        ? `Carácter inválido: "${getInvalidChar(descripcionEdit)}"`
        : '',
      cumplimiento: getInvalidChar(cumplimientoEdit)
        ? `Carácter inválido: "${getInvalidChar(cumplimientoEdit)}"`
        : '',
      incumplimiento: getInvalidChar(incumplimientoEdit)
        ? `Carácter inválido: "${getInvalidChar(incumplimientoEdit)}"`
        : ''
    };
    setEditErrors(errors);

    if (errors.descripcion || errors.cumplimiento || errors.incumplimiento) {
      return;
    }

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
    setFormErrors({ descripcion: '', cumplimiento: '', incumplimiento: '' });
  };

  // Hook para autoajustar altura de textarea
  const autoResize = (el) => {
    if (el) {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    if (vista === 'editar') {
      autoResize(document.getElementById('editar-descripcion'));
      autoResize(document.getElementById('editar-cumplimiento'));
      autoResize(document.getElementById('editar-incumplimiento'));
    }
  }, [vista, descripcionEdit, cumplimientoEdit, incumplimientoEdit]);

  // Handlers para validación en tiempo real en edición
  const handleEditChange = (setter, field, value) => {
    setter(value);
    const invalidChar = getInvalidChar(value);
    setEditErrors(prev => ({
      ...prev,
      [field]: invalidChar ? `Carácter inválido: "${invalidChar}"` : ''
    }));
  };

  // Handlers para validación en tiempo real en creación
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const invalidChar = getInvalidChar(value);
    setFormErrors(prev => ({
      ...prev,
      [name]: invalidChar ? `Carácter inválido: "${invalidChar}"` : ''
    }));
  };

  // Handler para submit del formulario de creación
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const descripcion = form.descripcion.value;
    const cumplimiento = form.cumplimiento.value;
    const incumplimiento = form.incumplimiento.value;

    const errors = {
      descripcion: getInvalidChar(descripcion)
        ? `Carácter inválido: "${getInvalidChar(descripcion)}"`
        : '',
      cumplimiento: getInvalidChar(cumplimiento)
        ? `Carácter inválido: "${getInvalidChar(cumplimiento)}"`
        : '',
      incumplimiento: getInvalidChar(incumplimiento)
        ? `Carácter inválido: "${getInvalidChar(incumplimiento)}"`
        : ''
    };
    setFormErrors(errors);

    if (errors.descripcion || errors.cumplimiento || errors.incumplimiento) {
      return;
    }

    await guardarlista_verificacion(e);
    setVista('principal');
    setReload(prev => !prev);
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
                  <th className="px-4 py-2">Descripción</th>
                  <th className="px-4 py-2">Cumplimiento</th>
                  <th className="px-4 py-2">Incumplimiento</th>
                  <th className="px-4 py-2 w-40">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {listas.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{item.descripcion}</td>
                    <td className="px-4 py-2">{item.cumplimiento}</td>
                    <td className="px-4 py-2">{item.incumplimiento}</td>
                    <td className="px-4 py-2 w-40">
                      <div className="flex justify-center gap-2">
                        <button className="btn btn-green" onClick={() => handleEditar(item.id)}>
                          🖉 Editar
                        </button>
                        <button className="btn btn-red" onClick={() => handleBorrar(item.id)}>
                          🗑️ Borrar
                        </button>
                      </div>
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
            onSubmit={handleFormSubmit}
            onReset={(e) => {
              handleReset(e.target);
              setVista('principal');
            }}
            className="flex flex-col items-center gap-4"
          >
            <label className="w-full max-w-md">
              Descripción
              <textarea
                name="descripcion"
                className="textarea"
                required
                onInput={e => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                  handleFormChange(e);
                }}
                rows={1}
              />
              {formErrors.descripcion && (
                <span className="text-red-500 text-sm">{formErrors.descripcion}</span>
              )}
            </label>
            <label className="w-full max-w-md">
              Cumplimiento
              <textarea
                name="cumplimiento"
                className="textarea"
                required
                onInput={e => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                  handleFormChange(e);
                }}
                rows={1}
              />
              {formErrors.cumplimiento && (
                <span className="text-red-500 text-sm">{formErrors.cumplimiento}</span>
              )}
            </label>
            <label className="w-full max-w-md">
              Incumplimiento
              <textarea
                name="incumplimiento"
                className="textarea"
                required
                onInput={e => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                  handleFormChange(e);
                }}
                rows={1}
              />
              {formErrors.incumplimiento && (
                <span className="text-red-500 text-sm">{formErrors.incumplimiento}</span>
              )}
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
            <label>
              Descripción
              <textarea
                value={descripcionEdit}
                onChange={e => handleEditChange(setDescripcionEdit, 'descripcion', e.target.value)}
                ref={el => autoResize(el)}
                className="textarea"
                id="editar-descripcion"
                rows={1}
              />
              {editErrors.descripcion && (
                <span className="text-red-500 text-sm">{editErrors.descripcion}</span>
              )}
            </label>
            <label>
              Cumplimiento
              <textarea
                value={cumplimientoEdit}
                onChange={e => handleEditChange(setCumplimientoEdit, 'cumplimiento', e.target.value)}
                ref={el => autoResize(el)}
                className="textarea"
                id="editar-cumplimiento"
                rows={1}
              />
              {editErrors.cumplimiento && (
                <span className="text-red-500 text-sm">{editErrors.cumplimiento}</span>
              )}
            </label>
            <label>
              Incumplimiento
              <textarea
                value={incumplimientoEdit}
                onChange={e => handleEditChange(setIncumplimientoEdit, 'incumplimiento', e.target.value)}
                ref={el => autoResize(el)}
                className="textarea"
                id="editar-incumplimiento"
                rows={1}
              />
              {editErrors.incumplimiento && (
                <span className="text-red-500 text-sm">{editErrors.incumplimiento}</span>
              )}
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

export default ListaVerificacion;
