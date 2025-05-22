import { useState, useEffect } from "react";
import { guardarplan, guardarReuniones, guardarAuditadosPlan,
    guardarItinerarios, borrarReunion, borrarItinerario, borrarAuditado, borrarProposito, traerTodoTrabajador,
    guardarPropositos
 } from "./metodos";

const PlanCreate = () => {
    

    const [propositos, setPropositos] = useState([])
    const [plan, setPlan] = useState({})
    const [auditados, setAuditados] = useState([])
    const [reuniones, setReuniones] = useState([])
    const [itinerarios, setItinerarios] = useState([])
    const [trabajadores, setTrabajadores] = useState([])
    const [liderAuditor, setLiderAuditor] = useState(1)
    const [auditorAuxiliar, setAuditorAuxiliar] = useState(1)
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    
    const actualizarIdPlan = () => {
        guardarplan().then((e)=>{
            setPlan(e);
            for(var proposito of propositos){
                proposito.id_plan = e.id;
            };
            for(var auditado of auditados){
                auditado.id_plan = e.id;
            };
            for(var itinerario of itinerarios){
                itinerario.id_plan = e.id;
            };
            for(var reunion of reuniones){
                reunion.id_plan = e.id;
            };
            guardarItinerarios(itinerarios);
            guardarReuniones(reuniones);
            guardarAuditadosPlan(auditados);
            guardarPropositos(propositos);
        })
    }

    const agregarProposito = () => {
        const nuevo = {
          
          id_plan: 0, // o usa un UUID si prefieres
          descripcion: ""
        };
        setPropositos([...propositos, nuevo]);
      };

    
    const agregarAuditado = () => {
        const nuevo = {
          
          id_plan: 0, // o usa un UUID si prefieres
          auditado: ""
        };
        setAuditados([...auditados, nuevo]);
    };


    const agregarItinerario = () => {
        const nuevo = {
          
          id_plan: 0, // o usa un UUID si prefieres
          actividad: "",
          auditado: "",
          auditor: "",
          lugar: "",
          inicio: "00:00:00",
          fin: "00:00:00"
        };
        setItinerarios([...itinerarios, nuevo]);
    };


    const agregarReunion = () => {
        const nuevo = {
          
          id_plan: 0, // o usa un UUID si prefieres
          fecha: "0000-00-00",
          hora: "00:00:00",
          lugar: "lugar",
          apertura: false
        };
        setReuniones([...reuniones, nuevo]);
    };

    useEffect(() => {
    const obtenerTrabajadores = async () => {
        try {
        const resultado = await traerTodoTrabajador();
        setTrabajadores(resultado);
        } catch (error) {
        console.error("Error al traer los trabajadores:", error);
        }
    };

    obtenerTrabajadores();
    }, []);

    return (
    <>
        <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-8">
            {/* Sección Principal */}
            <div className="mt-6 bg-white w-[90%] rounded-xl shadow-md overflow-hidden">
                <div className="flex flex-col md:flex-row border-b border-gray-200">
                    <div className="flex-1 flex flex-col md:flex-row">
                        <label className="p-3 bg-[#1E3766] text-white font-medium min-w-[120px]">Nombre</label>
                        <input
                            type="text"
                            id="input-editar-plan"
                            value={plan.nombre}
                            onChange={(e) => setPlan({ ...plan, nombre: e.target.value })}
                            className="flex-1 border border-gray-300 rounded px-4 py-2 m-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex-1 flex flex-col md:flex-row">
                        <label className="p-3 bg-[#1E3766] text-white font-medium min-w-[120px]">Estado</label>
                        <input
                            type="text"
                            id="input-estado"
                            value={plan.estado}
                            onChange={(e) => setPlan({ ...plan, estado: e.target.value })}
                            className="flex-1 border border-gray-300 rounded px-4 py-2 m-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row border-b border-gray-200">
                    <label className="p-3 bg-[#1E3766] text-white font-medium min-w-[120px]">Fecha</label>
                    <input
                        type="datetime-local"
                        id="datetime"
                        value={plan.fecha?.slice(0, 16) || ""}
                        onChange={(e) => setPlan({ ...plan, fecha: e.target.value })}
                        className="flex-1 border border-gray-300 rounded px-4 py-2 m-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col md:flex-row border-b border-gray-200">
                    <label className="p-3 bg-[#1E3766] text-white font-medium min-w-[120px]">Alcance</label>
                    <input
                        type="text"
                        id="alcance-planauditoria"
                        placeholder="Alcance"
                        value={plan.alcance}
                        onChange={(e) => {
                            const newPlan = plan;
                            newPlan.alcance = e.target.value;
                            setPlan(newPlan);
                        }}
                        className="flex-1 border border-gray-300 rounded px-4 py-2 m-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col border-b border-gray-200">
                    <div className="flex flex-col md:flex-row">
                        <label className="p-3 bg-[#1E3766] text-white font-medium min-w-[120px]">Propósito</label>
                        <div className="flex-1">
                            <table className="w-full">
                                <tbody>
                                    {propositos.map((proposito, index) => (
                                        <tr key={index} className="border-t border-gray-200">
                                            <td className="w-full">
                                                <input
                                                    type="text"
                                                    id={proposito.id}
                                                    placeholder="Propósito"
                                                    value={proposito.descripcion}
                                                    onChange={(e) => {
                                                        const newPropositos = [...propositos];
                                                        newPropositos[index].descripcion = e.target.value;
                                                        setPropositos(newPropositos);
                                                    }}
                                                    className="w-full border border-gray-300 rounded px-4 py-2 m-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td className="text-right pr-4">
                                                <button
                                                    className="bg-red-600 hover:bg-red-700 rounded-full text-white px-4 py-1 transition-colors duration-200"
                                                    style={{ marginLeft: "0.5rem", marginTop: "0" }}
                                                    onClick={() => {
                                                        setPropositos(prev => prev.filter((_, i) => i !== index));
                                                        if (proposito.id != null) { borrarProposito(proposito.id) };
                                                    }}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button
                                className="bg-green-600 hover:bg-green-700 rounded-full text-white px-4 py-2 m-2 transition-colors duration-200"
                                onClick={agregarProposito}
                            >
                                Agregar Propósito
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección de Procesos y Auditados */}
            <div className="bg-white w-[90%] rounded-xl shadow-md mt-6 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    <div className="flex-1 border-r border-gray-200 p-4">
                        <h3 className="bg-[#1E3766] text-white text-center p-2 font-medium rounded-t">Procesos</h3>
                        <input
                            type="text"
                            id="proceso-planauditoria"
                            placeholder="Proceso a auditar"
                            value={plan.proceso}
                            onChange={(e) => {
                                const newPlan = plan;
                                newPlan.proceso = e.target.value;
                                setPlan(newPlan);
                            }}
                            className="w-full border border-gray-300 rounded px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex-1 border-r border-gray-200 p-4">
                        <h3 className="bg-[#1E3766] text-white text-center p-2 font-medium rounded-t">Líder</h3>
                        <input
                            type="text"
                            id="liderProceso-planauditoria"
                            placeholder="Líder del proceso auditado"
                            value={plan.lider_proceso}
                            onChange={(e) => {
                                const newPlan = plan;
                                newPlan.lider_proceso = e.target.value;
                                setPlan(newPlan);
                            }}
                            className="w-full border border-gray-300 rounded px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex-1 border-r border-gray-200 p-4">
                        <h3 className="bg-[#1E3766] text-white text-center p-2 font-medium rounded-t">Auditados</h3>
                        <table className="w-full">
                            <tbody>
                                {auditados.map((auditado, index) => (
                                    <tr key={index} className="border-t border-gray-200">
                                        <td className="w-full">
                                            <input
                                                type="text"
                                                id={auditado.id}
                                                placeholder="Auditado"
                                                value={auditado.auditado}
                                                onChange={(e) => {
                                                    const newAuditados = [...auditados];
                                                    newAuditados[index].auditado = e.target.value;
                                                    setAuditados(newAuditados);
                                                }}
                                                className="w-full border border-gray-300 rounded px-4 py-2 m-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="text-right pr-4">
                                            <button
                                                className="bg-red-600 hover:bg-red-700 rounded-full text-white px-4 py-1 transition-colors duration-200"
                                                style={{ marginLeft: "0.5rem", marginTop: "0" }}
                                                onClick={() => {
                                                    setAuditados(prev => prev.filter((_, i) => i !== index));
                                                    if (auditado.id != null) { borrarAuditado(auditado.id) };
                                                }}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            className="bg-green-600 hover:bg-green-700 rounded-full text-white px-4 py-2 m-2 transition-colors duration-200"
                            onClick={agregarAuditado}
                        >
                            Agregar Auditado
                        </button>
                    </div>

                    <div className="flex-1 p-4">
                        <h3 className="bg-[#1E3766] text-white text-center p-2 font-medium rounded-t">Firma</h3>
                        <p className="text-center py-4 text-gray-500">Espacio para firma</p>
                    </div>
                </div>
            </div>

            {/* Sección de Reuniones y Auditores */}
            <div className="w-[90%] mt-6 flex flex-col md:flex-row gap-6">
                <div className="bg-white rounded-xl shadow-md overflow-hidden flex-1">
                    <h3 className="bg-[#1E3766] text-white text-center p-2 font-medium">Reuniones</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#1E3766] text-white">
                                <tr>
                                    <th className="p-3">Tipo de reunión</th>
                                    <th className="p-3">Fecha</th>
                                    <th className="p-3">Hora</th>
                                    <th className="p-3">Lugar</th>
                                    <th className="p-3">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reuniones && reuniones.map((reunion, index) => (
                                    <tr key={reunion.id} className="border-t border-gray-200 hover:bg-gray-50">
                                        <td className="p-3">
                                            <select
                                                id={"tipoReunion" + reunion.id}
                                                value={reunion.apertura ? "apertura" : "cierre"}
                                                onChange={(e) => {
                                                    const value = e.target.value === "apertura";
                                                    const nuevasReuniones = [...reuniones];
                                                    nuevasReuniones[index].apertura = value;
                                                    setReuniones(nuevasReuniones);
                                                }}
                                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="apertura">Apertura</option>
                                                <option value="cierre">Cierre</option>
                                            </select>
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="text"
                                                id={"fechaReunion" + reunion.id}
                                                placeholder="Fecha"
                                                value={reunion.fecha}
                                                onChange={(e) => {
                                                    const newReuniones = [...reuniones];
                                                    newReuniones[index].fecha = e.target.value;
                                                    setReuniones(newReuniones);
                                                }}
                                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="text"
                                                id={"horaReunion" + reunion.id}
                                                placeholder="Hora"
                                                value={reunion.hora}
                                                onChange={(e) => {
                                                    const newReuniones = [...reuniones];
                                                    newReuniones[index].hora = e.target.value;
                                                    setReuniones(newReuniones);
                                                }}
                                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="text"
                                                id={"lugarReunion" + reunion.id}
                                                placeholder="Lugar"
                                                value={reunion.lugar}
                                                onChange={(e) => {
                                                    const newReuniones = [...reuniones];
                                                    newReuniones[index].lugar = e.target.value;
                                                    setReuniones(newReuniones);
                                                }}
                                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="p-3 text-center">
                                            <button
                                                className="bg-red-600 hover:bg-red-700 rounded-full text-white px-4 py-1 transition-colors duration-200"
                                                onClick={() => {
                                                    setReuniones(prev => prev.filter((_, i) => i !== index));
                                                    if (reunion.id != null) { borrarReunion(reunion.id) };
                                                }}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button
                        className="bg-green-600 hover:bg-green-700 rounded-full text-white px-4 py-2 m-2 transition-colors duration-200"
                        onClick={() => agregarReunion()}
                    >
                        Agregar Reunión
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden w-full md:w-[30%] flex-shrink-0 h-[180px] flex flex-col justify-start">
                    <h3 className="bg-[#1E3766] text-white text-center p-2 font-medium">Auditores</h3>
                    <table className="w-full">
                        <tbody>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 bg-[#1E3766] text-white font-medium">Líder auditoría</td>
                                <td className="p-3">
                                    <select
                                        id="liderAuditoria"
                                        value={String(liderAuditor) || ""}
                                        onChange={(e) => setLiderAuditor(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {trabajadores.map((trabajador) => (
                                            <option key={trabajador.id} value={trabajador.id}>
                                                {trabajador.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="p-3 bg-[#1E3766] text-white font-medium">Auditor auxiliar</td>
                                <td className="p-3">
                                    <select
                                        id="auditor"
                                        value={String(auditorAuxiliar) || ""}
                                        onChange={(e) => setAuditorAuxiliar(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {trabajadores.map((trabajador) => (
                                            <option key={trabajador.id} value={trabajador.id}>
                                                {trabajador.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Sección de Itinerario */}
            <div className="mt-6 bg-white w-[90%] rounded-xl shadow-md overflow-hidden">
                <h3 className="w-full bg-[#1E3766] text-white text-center p-2 font-medium">Itinerario</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#1E3766] text-white">
                            <tr>
                                <th className="p-3">Actividades</th>
                                <th className="p-3">Auditado</th>
                                <th className="p-3">Auditor</th>
                                <th className="p-3">Fecha inicio</th>
                                <th className="p-3">Fecha fin</th>
                                <th className="p-3">Lugar</th>
                                <th className="p-3">Acciones</th>
                            </tr>
                        </thead>
                        {itinerarios && (
                            <tbody>
                                {itinerarios.map((itinerario, index) => (
                                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                                        <td className="p-3">
                                            <input
                                                type="text"
                                                id={"actividad" + itinerario.id}
                                                placeholder="Actividad"
                                                value={itinerario.actividad}
                                                onChange={(e) => {
                                                    const newItinerarios = [...itinerarios];
                                                    newItinerarios[index].actividad = e.target.value;
                                                    setItinerarios(newItinerarios);
                                                }}
                                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="text"
                                                id={"auditado" + itinerario.id}
                                                placeholder="Auditado"
                                                value={itinerario.auditado}
                                                onChange={(e) => {
                                                    const newItinerarios = [...itinerarios];
                                                    newItinerarios[index].auditado = e.target.value;
                                                    setItinerarios(newItinerarios);
                                                }}
                                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="text"
                                                id={"auditor" + itinerario.id}
                                                placeholder="Auditor"
                                                value={itinerario.auditor}
                                                onChange={(e) => {
                                                    const newItinerarios = [...itinerarios];
                                                    newItinerarios[index].auditor = e.target.value;
                                                    setItinerarios(newItinerarios);
                                                }}
                                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="text"
                                                id={"horaInicio" + itinerario.id}
                                                placeholder="Hora inicio"
                                                value={itinerario.inicio}
                                                onChange={(e) => {
                                                    const newItinerarios = [...itinerarios];
                                                    newItinerarios[index].inicio = e.target.value;
                                                    setItinerarios(newItinerarios);
                                                }}
                                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="text"
                                                id={"horaFin" + itinerario.id}
                                                placeholder="Hora fin"
                                                value={itinerario.fin}
                                                onChange={(e) => {
                                                    const newItinerarios = [...itinerarios];
                                                    newItinerarios[index].fin = e.target.value;
                                                    setItinerarios(newItinerarios);
                                                }}
                                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="text"
                                                id={"lugar" + itinerario.id}
                                                placeholder="Lugar"
                                                value={itinerario.lugar}
                                                onChange={(e) => {
                                                    const newItinerarios = [...itinerarios];
                                                    newItinerarios[index].lugar = e.target.value;
                                                    setItinerarios(newItinerarios);
                                                }}
                                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="p-3 text-center">
                                            <button
                                                className="bg-red-600 hover:bg-red-700 rounded-full text-white px-4 py-1 transition-colors duration-200"
                                                onClick={() => {
                                                    setItinerarios(prev => prev.filter((_, i) => i !== index));
                                                    if (itinerario.id != null) { borrarItinerario(itinerario.id) };
                                                }}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
                <button
                    className="bg-green-600 hover:bg-green-700 rounded-full text-white px-4 py-2 m-2 transition-colors duration-200"
                    onClick={agregarItinerario}
                >
                    Agregar Actividad
                </button>
            </div>

            {/* Botones de Acción */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                    id="btn-guardar-edicion"
                    className="btn"
                    onClick={() => {
                        actualizarIdPlan();
                        sleep(2000).then(() => window.location.reload());
                    }}
                >
                    Guardar
                </button>
                <button
                    id="btn-cancelar-edicion"
                    className="btn-gray "
                    onClick={() => window.location.reload()}
                >
                    Cancelar
                </button>
            </div>
        </div>
    </>
);
}

export default PlanCreate;