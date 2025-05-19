import { useState, useEffect } from "react";
import {
  traerID,
  traerPropositos,
  traerAuditadosPlan,
  traerTodoTrabajador,
  traerReunionPlan,
  traerItinerarioPlan,
  guardarReuniones,
  guardarAuditadosPlan,
  guardarItinerarios,
  borrarReunion,
  borrarItinerario,
  borrarAuditado,
  borrarProposito,
  guardarPropositos
} from "./metodos";

const PlanEdit = ({ plan: planId, onGuardar, onCancelar }) => {
  // Estados
  const [plan, setPlan] = useState({});
  const [propositos, setPropositos] = useState([]);
  const [auditados, setAuditados] = useState([]);
  const [reuniones, setReuniones] = useState([]);
  const [itinerarios, setItinerarios] = useState([]);
  const [trabajadores, setTrabajadores] = useState([]);

  // Cargar datos al montar el componente o cuando cambie planId
  useEffect(() => {
    if (!planId) {
      // Si no hay planId (nuevo plan), inicializamos vacíos
      setPlan({});
      setPropositos([]);
      setAuditados([]);
      setReuniones([]);
      setItinerarios([]);
      setTrabajadores([]);
      return;
    }

    // Traer datos del plan y listas relacionadas
    traerID(planId).then(setPlan);
    traerPropositos(planId).then(setPropositos);
    traerAuditadosPlan(planId).then(setAuditados);
    traerReunionPlan(planId).then(setReuniones);
    traerItinerarioPlan(planId).then(setItinerarios);
    traerTodoTrabajador().then(setTrabajadores);
  }, [planId]);

  // Agregar elemento a una lista (propositos, auditados, etc)
  const agregarElemento = (lista, setLista, nuevoElemento) => {
    setLista([...lista, nuevoElemento]);
  };

  // Eliminar elemento de lista y borrar en backend si tiene id
  const eliminarElemento = (lista, setLista, index, id, borrarFn) => {
    setLista(lista.filter((_, i) => i !== index));
    if (id != null && borrarFn) {
      borrarFn(id);
    }
  };

  // Guardar todos los datos relacionados
  const guardarPlanActividad = async () => {
  try {
    // Primero guarda o actualiza el plan
    const nuevoPlan = await onGuardar(plan); // espera que retorne el objeto creado/actualizado con su ID

    const id_plan = nuevoPlan?.id || plan.id;

    // Luego guarda los elementos relacionados con ese plan
    const propositosConId = propositos.map(p => ({ ...p, id_plan }));
    const auditadosConId = auditados.map(a => ({ ...a, id_plan }));
    const reunionesConId = reuniones.map(r => ({ ...r, id_plan }));
    const itinerariosConId = itinerarios.map(i => ({ ...i, id_plan }));

    await guardarPropositos(propositosConId);
    await guardarAuditadosPlan(auditadosConId);
    await guardarReuniones(reunionesConId);
    await guardarItinerarios(itinerariosConId);
  } catch (error) {
    console.error("Error guardando plan y datos relacionados:", error);
  }
};


  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* Datos Generales */}
      <div className="mt-10 bg-white w-[90%] rounded-xl p-4">
        <h2 className="text-xl font-bold mb-4 text-[#1E3766]">Datos del Plan</h2>
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-4">
            <span className="w-32 text-white bg-[#1E3766] p-2 rounded">Fecha</span>
            <input
              type="datetime-local"
              value={plan.fecha?.slice(0, 16) || ""}
              onChange={(e) => setPlan({ ...plan, fecha: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </label>

          <label className="flex items-center gap-4">
            <span className="w-32 text-white bg-[#1E3766] p-2 rounded">Alcance</span>
            <input
              type="text"
              placeholder="Alcance"
              value={plan.alcance || ""}
              onChange={(e) => setPlan({ ...plan, alcance: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </label>

          {/* Propósitos */}
          <div>
            <span className="text-white bg-[#1E3766] p-2 rounded inline-block mb-2">Propósitos</span>
            <table className="w-full">
              <tbody>
                {propositos.map((p, i) => (
                  <tr key={i} className="mb-2">
                    <td className="w-full">
                      <input
                        type="text"
                        placeholder="Propósito"
                        value={p.descripcion || ""}
                        onChange={(e) => {
                          const nuevos = [...propositos];
                          nuevos[i].descripcion = e.target.value;
                          setPropositos(nuevos);
                        }}
                        className="w-full border rounded px-2 py-1"
                      />
                    </td>
                    <td>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded ml-2"
                        onClick={() => eliminarElemento(propositos, setPropositos, i, p.id, borrarProposito)}
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="mt-2 bg-[#1E3766] text-white px-3 py-1 rounded"
              onClick={() => agregarElemento(propositos, setPropositos, { id_plan: planId, descripcion: "" })}
            >
              Agregar propósito
            </button>
          </div>
        </div>
      </div>

      {/* Información de Auditoría */}
      <div className="bg-white w-[90%] mt-10 rounded-xl p-4">
        <h2 className="text-xl font-bold mb-4 text-[#1E3766]">Información de Auditoría</h2>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <h3 className="bg-[#1E3766] text-white text-center p-1">Proceso</h3>
            <input
              type="text"
              placeholder="Proceso"
              value={plan.proceso || ""}
              onChange={(e) => setPlan({ ...plan, proceso: e.target.value })}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <h3 className="bg-[#1E3766] text-white text-center p-1">Líder</h3>
            <input
              type="text"
              placeholder="Líder del proceso"
              value={plan.lider_proceso || ""}
              onChange={(e) => setPlan({ ...plan, lider_proceso: e.target.value })}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <h3 className="bg-[#1E3766] text-white text-center p-1">Auditados</h3>
            <table className="w-full">
              <tbody>
                {auditados.map((a, i) => (
                  <tr key={i}>
                    <td>
                      <input
                        type="text"
                        placeholder="Auditado"
                        value={a.auditado || ""}
                        onChange={(e) => {
                          const nuevos = [...auditados];
                          nuevos[i].auditado = e.target.value;
                          setAuditados(nuevos);
                        }}
                        className="w-full border rounded px-2 py-1"
                      />
                    </td>
                    <td>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded ml-2"
                        onClick={() => eliminarElemento(auditados, setAuditados, i, a.id, borrarAuditado)}
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="mt-2 bg-[#1E3766] text-white px-3 py-1 rounded"
              onClick={() => agregarElemento(auditados, setAuditados, { id_plan: planId, auditado: "" })}
            >
              Agregar auditado
            </button>
          </div>
          <div>
            <h3 className="bg-[#1E3766] text-white text-center p-1">Firma</h3>
            <p className="text-center">(espacio reservado)</p>
          </div>
        </div>
      </div>

      {/* Botones Guardar y Cancelar */}
      <div className="flex gap-4 mt-6">
        <button
          className="bg-green-600 text-white px-6 py-2 rounded-full text-lg"
          onClick={guardarPlanActividad}
        >
          Guardar Cambios del Plan
        </button>
        {onCancelar && (
          <button
            className="bg-gray-500 text-white px-6 py-2 rounded-full text-lg"
            onClick={onCancelar}
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
};

export default PlanEdit;
