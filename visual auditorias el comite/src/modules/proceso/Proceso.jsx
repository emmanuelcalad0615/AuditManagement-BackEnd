import React, { useState, useEffect } from "react";
import {
  traerID,
  traerTodo,
  borrarID,
  guardarSector,
  actualizarSector
} from "./metodos"; // asegúrate que estos métodos estén adaptados para proceso
import "./Proceso.css"; // el mismo CSS para que se vea igual

const Proceso = () => {
  const [procesos, setProcesos] = useState([]);
  const [vista, setVista] = useState("principal"); // 'principal', 'formulario', 'editar'
  const [procesoId, setProcesoId] = useState(null);
  const [nombreEdit, setNombreEdit] = useState("");
  const [nombreNuevo, setNombreNuevo] = useState("");
  const [reload, setReload] = useState(false);

  const [errorNuevo, setErrorNuevo] = useState("");
  const [errorEdit, setErrorEdit] = useState("");

  useEffect(() => {
    if (vista === "principal") {
      traerTodo()
        .then((data) => {
          if (Array.isArray(data)) setProcesos(data);
        })
        .catch(console.error);
    }
  }, [vista, reload]);

  // Validación del nombre
  const validarNombre = (nombre) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]{3,50}$/; // letras, números y espacios, mínimo 3 caracteres, sin símbolos ni comillas
    return regex.test(nombre.trim());
  };

  // EDITAR
  const handleEditar = (id) => {
    traerID(id).then((data) => {
      setProcesoId(data.id);
      setNombreEdit(data.nombre);
      setErrorEdit(""); // Limpiar error al abrir el formulario de edición
      setVista("editar");
    });
  };

  const handleGuardarEdicion = (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    if (!validarNombre(nombreEdit)) {
      setErrorEdit("El nombre debe tener entre 3 y 50 caracteres y no debe contener caracteres especiales.");
      return;
    }
    setErrorEdit(""); // Resetea el error si la validación es correcta
    actualizarSector(procesoId, nombreEdit).then(() => {
      setVista("principal");
      setReload((prev) => !prev);
    });
  };

  // BORRAR
  const handleBorrar = (id) => {
    borrarID(id).then(() => {
      setReload((prev) => !prev);
    });
  };

  // GUARDAR NUEVO
  const handleGuardarNuevo = (e) => {
    e.preventDefault();
    if (!validarNombre(nombreNuevo)) {
      setErrorNuevo("El nombre debe tener entre 3 y 50 caracteres y no debe contener caracteres especiales.");
      return;
    }
    setErrorNuevo(""); // Resetea el error si la validación es correcta
    guardarSector(nombreNuevo).then(() => {
      setNombreNuevo("");
      setVista("principal");
      setReload((prev) => !prev);
    });
  };

  return (
    <>
      {vista === "principal" && (
        <section className="seccion activa p-5">
          <div className="bg-white rounded-2xl p-5">
            <h3 className="text-[#1E3766] text-xl font-bold mb-4 text-center">
              Procesos
            </h3>
            <table className="tabla-trabajadores w-full text-center mb-4">
              <thead className="bg-[#1E3766] text-white">
                <tr>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {procesos.map((proceso, i) => (
                  <tr key={proceso.id ?? i}>
                    <td>{proceso.nombre}</td>
                    <td className="table-actions">
                      <button
                        className="btn btn-green"
                        onClick={() => handleEditar(proceso.id)}
                      >
                        🖉 Editar
                      </button>
                      <button
                        className="btn btn-red"
                        onClick={() => handleBorrar(proceso.id)}
                      >
                        🗑️ Borrar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end">
              <button className="btn" onClick={() => {
                setErrorNuevo(""); // Limpiar error al abrir el formulario de nuevo proceso
                setVista("formulario");
              }}>
                ➕ Agregar Proceso
              </button>
            </div>
          </div>
        </section>
      )}

      {vista === "formulario" && (
        <section className="bg-white rounded-xl m-5 p-5 max-w-md mx-auto">
          <h2 className="bg-[#1E3766] text-white text-xl text-center rounded-xl mb-4">
            Agregar Proceso
          </h2>
          <form onSubmit={handleGuardarNuevo} className="flex flex-col gap-4">
            <label>
              Nombre
              <input
                type="text"
                value={nombreNuevo}
                onChange={(e) => setNombreNuevo(e.target.value)}
                className={`input ${errorNuevo ? "input-error" : ""}`}
                required
              />
            </label>
            {errorNuevo && <p className="text-red-600 text-sm">{errorNuevo}</p>}
            <div className="flex gap-4 mt-4">
              <button type="submit" className="btn">
                Guardar
              </button>
              <button
                type="button"
                className="btn-gray"
                onClick={() => setVista("principal")}
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      )}

      {vista === "editar" && (
        <section className="bg-white rounded-xl m-5 p-5 max-w-md mx-auto">
          <h2 className="bg-[#1E3766] text-white text-xl text-center rounded-xl mb-4">
            Editar Proceso
          </h2>
          <form onSubmit={handleGuardarEdicion} className="flex flex-col gap-4">
            <label>
              Nombre
              <input
                type="text"
                value={nombreEdit}
                onChange={(e) => setNombreEdit(e.target.value)}
                className={`input ${errorEdit ? "input-error" : ""}`}
                required
              />
            </label>
            {errorEdit && <p className="text-red-600 text-sm">{errorEdit}</p>}
            <div className="flex gap-4 mt-4 justify-center">
              <button type="submit" className="btn">
                Guardar
              </button>
              <button
                type="button"
                className="btn-gray"
                onClick={() => setVista("principal")}
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>

      )}
    </>
  );
};

export default Proceso;
