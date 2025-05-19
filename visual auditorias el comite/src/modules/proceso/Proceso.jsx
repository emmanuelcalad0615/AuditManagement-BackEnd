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

  useEffect(() => {
    if (vista === "principal") {
      traerTodo()
        .then((data) => {
          if (Array.isArray(data)) setProcesos(data);
        })
        .catch(console.error);
    }
  }, [vista, reload]);

  // EDITAR
  const handleEditar = (id) => {
    traerID(id).then((data) => {
      setProcesoId(data.id);
      setNombreEdit(data.nombre);
      setVista("editar");
    });
  };

  const handleGuardarEdicion = () => {
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
    if (nombreNuevo.trim() === "") return;
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
              <button className="btn" onClick={() => setVista("formulario")}>
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
                className="input"
                required
              />
            </label>
            <div className="flex gap-4 mt-4">
              <button type="submit" className="btn">
                Guardar
              </button>
              <button
                type="button"
                className="btn"
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
          <div className="flex flex-col gap-4">
            <label>
              Nombre
              <input
                type="text"
                value={nombreEdit}
                onChange={(e) => setNombreEdit(e.target.value)}
                className="input"
                required
              />
            </label>
            <div className="flex gap-4 mt-4 justify-center">
              <button className="btn" onClick={handleGuardarEdicion}>
                Guardar
              </button>
              <button
                className="btn"
                onClick={() => setVista("principal")}
              >
                Cancelar
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Proceso;
