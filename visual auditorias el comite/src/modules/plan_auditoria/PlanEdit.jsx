import { useState, useEffect } from "react";
import { traerID, traerPropositos, traerAuditadosPlan, traerTodoTrabajador,
    traerReunionPlan, traerItinerarioPlan, guardarReuniones, guardarAuditadosPlan,
    guardarItinerarios, borrarReunion, borrarItinerario, borrarAuditado, borrarProposito,
    traerListasV, traerAspectos,traerAuditoria, guardarPropositos, guardarAspectos, traerListaxAuditoria,
    borrarAspecto, guardarListaxAuditoria, actualizarplan,
    traerOportunidades, guardarOportunidades, borrarOportunidades,
    traerDebilidades, guardarDebilidades, borrarDebilidades,
    traerFortalezas, guardarFortalezas, borrarFortalezas, borrarPlan,
    traerCompromisos, guardarCompromisos, borrarCompromisos,
    guardarplan,
 } from "./metodos";

const PlanEdit = (prop) => {
    
    const [fortalezas, setFortalezas] = useState([])
    const [debilidades, setDebilidades] = useState([])
    const [oportunidades, setOportunidades] = useState([])
    const [compromisos, setCompromisos] = useState([])
    const [listaAuditada, setListaAuditada] = useState([])
    const [auditoria, setAuditoria] = useState({})
    const [aspectos, setAspectos] = useState([])
    const [listas, setListas] = useState([]);
    const [propositos, setPropositos] = useState([])
    const [plan, setPlan] = useState({})
    const [auditados, setAuditados] = useState([])
    const [reuniones, setReuniones] = useState([])
    const [itinerarios, setItinerarios] = useState([])
    const [trabajadores, setTrabajadores] = useState([])
    const [visual, setVisual] = useState('a')
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const agregarFortalezas = () => {
        const nuevo = {
          
          id_auditoria: auditoria.id, 
          virtud: ""
        };
        setFortalezas([...fortalezas, nuevo]);
        console.log(fortalezas)
    };

    const agregarDebilidades = () => {
        const nuevo = {
          id_auditoria: auditoria.id, 
          falta: ""
        };
        setDebilidades([...debilidades, nuevo]);
    };

    const agregarOportunidades = () => {
        const nuevo = {
          
          id_auditoria: auditoria.id, 
          oportunidad: ""
        };
        setOportunidades([...oportunidades, nuevo]);
    };

    const agregarCompromisos = () => {
        const nuevo = {
          
          id_auditoria: auditoria.id, 
          compromiso: "",
          responsable: "",
          fechalimite: ""
        };
        setCompromisos([...compromisos, nuevo]);
    };

    const agregarAspectoAuditado = () => {
        const nuevo = {
          
          id_auditoria: auditoria.id, // o usa un UUID si prefieres
          aspecto: ""
        };
        setAspectos([...aspectos, nuevo]);
    };

    const agregarListaAuditada = (e,c,a)=>
    {
        const nuevo = {
          
          id_auditoria: auditoria.id, // o usa un UUID si prefieres
          id_listaverificacion: e,
          cumple: c,
          aplica: a
        };
        setListaAuditada([...listaAuditada, nuevo]);
    }

    const agregarProposito = () => {
        const nuevo = {
          
          id_plan: prop.id, // o usa un UUID si prefieres
          descripcion: ""
        };
        setPropositos([...propositos, nuevo]);
      };

    
    const agregarAuditado = () => {
        const nuevo = {
          
          id_plan: prop.id, // o usa un UUID si prefieres
          auditado: ""
        };
        setAuditados([...auditados, nuevo]);
    };


    const agregarItinerario = () => {
        const nuevo = {
          
          id_plan: prop.id, // o usa un UUID si prefieres
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
          
          id_plan: prop.id, // o usa un UUID si prefieres
          fecha: "0000-00-00",
          hora: "00:00:00",
          lugar: "lugar",
          apertura: false
        };
        setReuniones([...reuniones, nuevo]);
    };


    const guardarPlanActividad = () => {
        guardarItinerarios(itinerarios);
        guardarReuniones(reuniones);
        guardarAuditadosPlan(auditados);
        guardarPropositos(propositos);
        actualizarplan(plan);
    }

    const guardarAuditoria = () => {
        guardarAspectos(aspectos);
        guardarCompromisos(compromisos);
        guardarFortalezas(fortalezas);
        guardarDebilidades(debilidades);
        guardarOportunidades(oportunidades);
        guardarListaxAuditoria(listaAuditada);
        
    };

    useEffect(() => {
        
        traerTodoTrabajador().then((e)=>setTrabajadores(e));
        traerPropositos(prop.id).then((e) => setPropositos(e));
        traerID(prop.id).then((e) => {
   
            setPlan(e);});
        traerAuditadosPlan(prop.id).then((e)=>setAuditados(e));
        traerItinerarioPlan(prop.id).then((e)=>setItinerarios(e));
        traerReunionPlan(prop.id).then((e)=>setReuniones(e));
        traerListasV().then((e) => setListas(e));

        traerAuditoria(prop.id).then((e)=>{
            console.log(e)
            setAuditoria(e);
            traerAspectos(e.id).then((e)=>setAspectos(e));
            traerListaxAuditoria(e.id).then((e)=>setListaAuditada(e));
            traerOportunidades(e.id).then((e)=>setOportunidades(e));
            traerDebilidades(e.id).then((e)=>setDebilidades(e));
            traerFortalezas(e.id).then((e)=>setFortalezas(e));
            traerCompromisos(e.id).then((e)=>setCompromisos(e));
        
        });

        ;
        
      }, [visual]); 


    return (
        <>
        { visual=='a' &&
        <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-8">
            {visual === 'a' && (
                <div className="mt-6 bg-white w-[90%] rounded-xl shadow-md overflow-hidden">
                    <div className="flex flex-col md:flex-row border-b border-gray-200">
                        <div className="flex-1 flex flex-col md:flex-row">
                            <label className="p-3 bg-[#1E3766] text-white font-medium min-w-[120px]">Nombre</label>
                            <input
                                type="text"
                                id="input-editar-plan"
                                value={plan.nombre}
                                onChange={(e) => {console.log(e);setPlan({ ...plan, nombre: e.target.value })}}
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
                                setPlan({ ...plan, alcance: e.target.value });
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
            )}

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
                                setPlan({ ...plan, proceso: e.target.value });
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
                                setPlan({ ...plan, lider_proceso: e.target.value });
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
    {/* Reuniones */}
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
            onClick={agregarReunion}
        >
            Agregar Reunión
        </button>
    </div>

    {/* Auditores */}
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full md:w-[30%]  flex-shrink-0 h-[180px] flex flex-col justify-start">
        <h3 className="bg-[#1E3766] text-white text-center p-2 font-medium">Auditores</h3>
        {plan && trabajadores.length > 0 && (
            <table className="w-full">
                <tbody>
                    <tr className="border-b border-gray-200">
                        <td className="p-3 bg-[#1E3766] text-white font-medium">Líder auditoría</td>
                        <td className="p-3">
                            <select
                                id="liderAuditoria"
                                value={String(plan.auditor_lider || "")}
                                onChange={(e) => setPlan({ ...plan, auditor_lider: e.target.value })}
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
                                value={String(plan.auditor || "")}
                                onChange={(e) => setPlan({ ...plan, auditor: e.target.value })}
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
        )}
    </div>
</div>


            {/* Sección de Itinerario */}
            <div className="mt-10 flex flex-col bg-white w-[90%] rounded-xl shadow-md overflow-hidden">
                <h2 className="w-full bg-[#1E3766] text-white text-center p-2 font-medium">Itinerario</h2>
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
                <div className="flex justify-start">
                <button
                    className="bg-green-600 hover:bg-green-700 rounded-full text-white px-4 py-2 m-2 transition-colors duration-200"
                    onClick={agregarItinerario}
                >
                    Agregar Actividad
                </button>
                </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
            
                <button 
                id="btn-guardar-edicion" 
                className="btn"
                onClick={() => {
                    guardarPlanActividad();
                    sleep(1000).then(() => window.location.reload());}}>
                Guardar
                </button>

                <button
                id="eliminar-plan-cascada"
                className="btn-gray"
                onClick={() => {
                    console.log(prop.id);
                    borrarPlan(prop.id);
                    sleep(1000).then(() => window.location.reload());
                }}
                >
                Eliminar
                </button>

                <button
                id="btn-cancelar-edicion"
                className="btn-gray"
                onClick={() => {
                borrarPlan(prop.id);
                sleep(1000).then(() => window.location.reload());}}
                >
                Volver
                </button>

                <button id="btn-guardar-edicion" 
                className="btn"
                onClick={() => {setVisual('b')}}>
                Auditoria
                </button>
            </div>
        </div>
        }

    
       {/*     VISUAL PARA HACER LA AUDITORIA              */}


        {visual=='b' &&
            <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-8">
                <div className="mt-10 bg-white w-[90%] rounded-xl shadow-md overflow-hidden">
                    {/* Fecha y Auditoría */}
                    <div className="flex flex-col md:flex-row border-b border-gray-200">
                        <div className="flex-1 flex flex-col md:flex-row">
                            <label className="p-3 bg-[#1E3766] text-white font-medium min-w-[120px]">Fecha</label>
                            <p className="flex-1 border border-gray-300 rounded px-4 py-2 m-2 bg-gray-50">
                                {plan.fecha?.slice(0, 16) || ""}
                            </p>
                        </div>
                    </div>

                    {/* Alcance */}
                    <div className="flex flex-col md:flex-row border-b border-gray-200">
                        <div className="flex-1 flex flex-row">
                            <label className="p-3 bg-[#1E3766] text-white font-medium min-w-[120px]">Alcance</label>
                            <p className="flex-1 border border-gray-300 rounded px-4 py-2 m-2 bg-gray-50 text-start">
                                {plan.alcance}
                            </p>
                        </div>
                    </div>

                    {/* Propósito */}
                    <div className="flex flex-col border-b border-gray-200">
                        <div className="flex flex-col md:flex-row">
                            <label className="p-3 bg-[#1E3766] text-white font-medium min-w-[120px]">Propósito</label>
                            <div className="flex-1">
                                <table className="w-full">
                                    <tbody>
                                        {propositos.map((proposito, index) => (
                                            <tr key={index} className="border-t border-gray-200">
                                                <td className="w-full">
                                                    <p className="w-full border border-gray-300 rounded px-4 py-2 m-2 bg-gray-50 text-start">
                                                        {proposito.descripcion}
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Agrupamos las tablas en un solo contenedor y reducimos el margen superior */}
                    <div className="bg-white w-[100%] rounded-xl flex flex-row mt-4">
                        <div className="flex flex-col w-[25%]">
                            <h3 className="bg-[#1E3766] text-white text-center p-2 font-medium rounded-t">Procesos</h3>
                            <p id="proceso-planauditoria" type="text" className="w-full text-center px-4 py-2 m-2 border border-gray-300 rounded bg-gray-50">
                            {plan.proceso}</p>
                        </div>
                        <div className="flex flex-col w-[25%]">
                            <h3 className="bg-[#1E3766] text-white text-center p-2 font-medium rounded-t">Líder</h3>
                            <p id="liderProceso-planauditoria" className="w-full text-center px-4 py-2 m-2 border border-gray-300 rounded bg-gray-50">{plan.lider_proceso}</p>
                        </div>
                        <div className="flex flex-col w-[25%]">
                            <h3 className="bg-[#1E3766] text-white text-center p-2 font-medium rounded-t">Auditados</h3>
                            <table className="w-full">
                                <tbody>
                                    {auditados.map((auditado, index) => (
                                        <tr key={index}>
                                            <td>
                                                <p id={auditado.id} className="w-full text-center px-4 py-2 m-2 border border-gray-300 rounded bg-gray-50">{auditado.auditado}</p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-col w-[25%]">
                            <h3 className="bg-[#1E3766] text-white text-center p-2 font-medium rounded-t">Firma</h3>
                            <p className= "text-center py-4 text-gray-500">Espacio para firma</p>
                        </div>
                    </div>

                    {/* Tabla de reuniones y auditores */}
                    <div className="w-[100%] mt-6 flex flex-col md:flex-row gap-6">
                        {/* Reuniones */}
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reuniones && reuniones.map((reunion, index) => (
                                            <tr key={reunion.id} className="border-t border-gray-200 hover:bg-gray-50">
                                                <td className="p-3 text-center">
                                                    <span className="border border-gray-300 rounded px-3 py-2 bg-gray-50 block">
                                                        {reunion.apertura ? "apertura" : "cierre"}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-center">
                                                    <span className="border border-gray-300 rounded px-3 py-2 bg-gray-50 block">
                                                        {reunion.fecha}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-center">
                                                    <span className="border border-gray-300 rounded px-3 py-2 bg-gray-50 block">
                                                        {reunion.hora}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-center">
                                                    <span className="border border-gray-300 rounded px-3 py-2 bg-gray-50 block">
                                                        {reunion.lugar}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* Auditores */}
                                                <div className="bg-white rounded-xl shadow-md overflow-hidden w-full md:w-[30%] flex-shrink-0 flex flex-col justify-start">
                                                    <h3 className="bg-[#1E3766] text-white text-center p-2 font-medium">Auditores</h3>
                                                    {plan && trabajadores.length > 0 && (
                                                        <table className="w-full text-center">
                                                            <tbody>
                                                                <tr>
                                                                    <td className="bg-[#1E3766] text-white font-medium p-3">Líder auditoría</td>
                                                                    <td className="p-3">
                                                                        <span className="border border-gray-300 rounded px-3 py-2 bg-gray-50 block">
                                                                            {trabajadores.find(trabajador => trabajador.id == plan.auditor_lider)?.nombre || ""}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="bg-[#1E3766] text-white font-medium p-3">Auditor auxiliar</td>
                                                                    <td className="p-3">
                                                                        <span className="border border-gray-300 rounded px-3 py-2 bg-gray-50 block">
                                                                            {trabajadores.find(trabajador => trabajador.id == plan.auditor)?.nombre || ""}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    )}
                                                </div>
                                                </div>
                                                </div>
                                                
                                                <div className="w-[90%] bg-white shadow-md overflow-hidden mb-6 rounded-xl p-4">
                                                    <table className="w-full text-center">
                                                        <thead className="bg-[#1E3766] text-white">
                                                            <tr>
                                                                <th className="py-3 px-4 text-lg">Aspecto</th>
                                                                <th className="py-3 px-4 text-lg">Acciones</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {aspectos.map((aspecto, index) => (
                                                                <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                                                                    <td className="py-2 px-4">
                                                                        <input
                                                                            type="text"
                                                                            className="bg-gray-200 w-full m-2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                            value={aspecto.aspecto}
                                                                            onChange={(e) => {
                                                                                const nuevosAspectos = [...aspectos];
                                                                                nuevosAspectos[index].aspecto = e.target.value;
                                                                                setAspectos(nuevosAspectos);
                                                                            }}
                                                                        />
                                                                    </td>
                                                                    <td className="py-2 px-4">
                                                                        <button
                                                                            className="bg-red-600 hover:bg-red-700 rounded-full text-white px-4 py-1 transition-colors duration-200"
                                                                            onClick={() => {
                                                                                setAspectos(prev => prev.filter((_, i) => i !== index));
                                                                                if (aspecto.id != null) { borrarAspecto(aspecto.id) }
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
                                                    className="btn text-white px-4 py-2 m-2 transition-colors duration-200 ml-5"
                                                    onClick={agregarAspectoAuditado}
                                                >
                                                    Agregar
                                                </button>
                        {/* Tabla para seleccionar de la lista de verificación */}
                        <h3 className="text-white bg-[#1E3766] w-[90%] mt-3 text-center text-xl ">Lista de Verificación</h3>
                        <div className="w-[90%] bg-white  shadow-md overflow-hidden mb-6">
                            <table className="w-full text-center">
                                <thead className="bg-[#1E3766] text-white">
                                    <tr>
                                        <th className="py-3 px-4 text-lg">Descripción</th>
                                        <th className="py-3 px-4 text-lg">Cumple</th>
                                        <th className="py-3 px-4 text-lg">Incumple</th>
                                        <th className="py-3 px-4 text-lg">No aplica</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listas.map((lista, index) => (
                                        <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                                            <td className="py-2 px-4">{lista.descripcion}</td>
                                            <td className="py-2 px-4">
                                                <label className="flex items-center justify-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            listaAuditada.some(audit => audit.id_listaverificacion === lista.id)
                                                                ? listaAuditada.find(a => lista.id === a.id_listaverificacion).cumple === true &&
                                                                  listaAuditada.find(a => lista.id === a.id_listaverificacion).aplica === true
                                                                : false
                                                        }
                                                        onChange={(e) => {
                                                            const isChecked = e.target.checked;
                                                            if (listaAuditada.some(audit => audit.id_listaverificacion == lista.id)) {
                                                                const nuevasListas = listaAuditada.map(item =>
                                                                    item.id_listaverificacion == lista.id
                                                                        ? isChecked
                                                                            ? { ...item, cumple: true, aplica: true }
                                                                            : { ...item, cumple: false }
                                                                        : item
                                                                );
                                                                setListaAuditada(nuevasListas);
                                                            } else {
                                                                agregarListaAuditada(lista.id, isChecked, true);
                                                            }
                                                            if (isChecked) {
                                                                const nuevo = {
                                                                    id_auditoria: auditoria.id,
                                                                    virtud: lista.cumplimiento
                                                                };
                                                                setFortalezas([...fortalezas, nuevo]);
                                                            }
                                                        }}
                                                        className="w-5 h-5 accent-green-600"
                                                    />
                                                </label>
                                            </td>
                                            <td className="py-2 px-4">
                                                <label className="flex items-center justify-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            listaAuditada.some(audit => audit.id_listaverificacion === lista.id)
                                                                ? listaAuditada.find(a => lista.id === a.id_listaverificacion)?.cumple === false &&
                                                                  listaAuditada.find(a => lista.id === a.id_listaverificacion)?.aplica === true
                                                                : false
                                                        }
                                                        onChange={(e) => {
                                                            const isChecked = e.target.checked;
                                                            if (listaAuditada.some(audit => audit.id_listaverificacion == lista.id)) {
                                                                const nuevasListas = listaAuditada.map(item =>
                                                                    item.id_listaverificacion == lista.id
                                                                        ? isChecked
                                                                            ? { ...item, cumple: false, aplica: true }
                                                                            : { ...item, cumple: true }
                                                                        : item
                                                                );
                                                                setListaAuditada(nuevasListas);
                                                            } else {
                                                                agregarListaAuditada(lista.id, false, true);
                                                            }
                                                            if (isChecked) {
                                                                const nuevo = {
                                                                    id_auditoria: auditoria.id,
                                                                    falta: lista.incumplimiento
                                                                };
                                                                setDebilidades([...debilidades, nuevo]);
                                                            }
                                                        }}
                                                        className="w-5 h-5 accent-red-600"
                                                    />
                                                </label>
                                            </td>
                                            <td className="py-2 px-4">
                                                <label className="flex items-center justify-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            listaAuditada.some(audit => audit.id_listaverificacion === lista.id)
                                                                ? listaAuditada.find(a => lista.id === a.id_listaverificacion)?.aplica === false
                                                                : false
                                                        }
                                                        onChange={(e) => {
                                                            const isChecked = e.target.checked;
                                                            if (listaAuditada.some(audit => audit.id_listaverificacion == lista.id)) {
                                                                const nuevasListas = listaAuditada.map(item =>
                                                                    item.id_listaverificacion == lista.id
                                                                        ? isChecked
                                                                            ? { ...item, cumple: false, aplica: false }
                                                                            : { ...item, aplica: true }
                                                                        : item
                                                                );
                                                                setListaAuditada(nuevasListas);
                                                            } else {
                                                                agregarListaAuditada(lista.id, false, isChecked ? false : true);
                                                            }
                                                        }}
                                                        className="w-5 h-5 accent-gray-600"
                                                    />
                                                </label>
                                            </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

    {/* Tabla de Fortalezas */}
    <h3 className="text-white bg-[#1E3766] w-[90%] mt-3 text-center text-xl "> Fortalezas </h3>
    <div className="w-[90%] bg-white shadow-md overflow-hidden mb-6 ">
        <table className="w-full text-center">
            <thead className="bg-[#1E3766] text-white">
                <tr>
                    <th className="py-3 px-4 text-lg">Descripción</th>
                    <th className="py-3 px-4 text-lg">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {fortalezas.map((fortaleza, index) => (
                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="py-2 px-4">
                            <input
                                type="text"
                                className="bg-gray-200 w-full m-2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={fortaleza.virtud}
                                onChange={(e) => {
                                    const newFortalezas = [...fortalezas];
                                    newFortalezas[index].virtud = e.target.value;
                                    setFortalezas(newFortalezas);
                                }}
                            />
                        </td>
                        <td className="py-2 px-4">
                            <button
                                className="bg-red-600 hover:bg-red-700 rounded-full text-white px-4 py-1 transition-colors duration-200"
                                onClick={() => {
                                    setFortalezas(prev => prev.filter((_, i) => i !== index));
                                    ;
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
                                            className="btn text-white px-4 py-2 m-2 transition-colors duration-200 ml-5"
                                            onClick={agregarFortalezas}
                                        >
                                            Agregar
                                        </button>
                                        {/* Tabla de Debilidades */}
                                        <h3 className="text-white bg-[#1E3766] w-[90%] mt-3 text-center text-xl"> Debilidades </h3>
                                        <div className="w-[90%] bg-white shadow-md overflow-hidden mb-6 ">
                                            <table className="w-full text-center">
                                                <thead className="bg-[#1E3766] text-white">
                                                    <tr>
                                                        <th className="py-3 px-4 text-lg">Descripción</th>
                                                        <th className="py-3 px-4 text-lg">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {debilidades.map((debilidad, index) => (
                                                        <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                                                            <td className="py-2 px-4">
                                                                <input
                                                                    type="text"
                                                                    className="bg-gray-200 w-full m-2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    value={debilidad.falta}
                                                                    onChange={(e) => {
                                                                        const newDebilidades = [...debilidades];
                                                                        newDebilidades[index].falta = e.target.value;
                                                                        setDebilidades(newDebilidades);
                                                                    }}
                                                                />
                                                            </td>
                                                            <td className="py-2 px-4">
                                                                <button
                                                                    className="bg-red-600 hover:bg-red-700 rounded-full text-white px-4 py-1 transition-colors duration-200"
                                                                    onClick={() => {
                                                                        setDebilidades(prev => prev.filter((_, i) => i !== index));
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
                                                className="btn text-white px-4 py-2 m-2 transition-colors duration-200 ml-5"
                                                onClick={agregarDebilidades}
                                            >
                                                Agregar
                                            </button>

    {/* Tabla de oportunidades */}
    <h3 className="text-white bg-[#1E3766] w-[90%] mt-3 text-center text-xl "> Oportunidades de Mejora </h3>
    <div className="w-[90%] bg-white shadow-md overflow-hidden mb-6 ">
        <table className="w-full text-center">
            <thead className='bg-[#1E3766] text-white'>
                <tr>
                    <th className="py-3 px-4 text-lg">Descripción</th>
                    <th className="py-3 px-4 text-lg">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {oportunidades.map((oportunidad, index) => (
                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="py-2 px-4">
                            <input
                                type="text"
                                className="bg-gray-200 w-full m-2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={oportunidad.oportunidad}
                                onChange={(e) => {
                                    const newLista = [...oportunidades];
                                    newLista[index].oportunidad = e.target.value;
                                    setOportunidades(newLista);
                                }}
                            />
                        </td>
                        <td className="py-2 px-4">
                            <button
                                className="bg-red-600 hover:bg-red-700 rounded-full text-white px-4 py-1 transition-colors duration-200"
                                onClick={() => {
                                    setOportunidades(prev => prev.filter((_, i) => i !== index));
                                    if (oportunidad.id != null) { borrarOportunidades(oportunidad.id) };
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
        className="btn text-white px-4 py-2 m-2 transition-colors duration-200 ml-5"
        onClick={agregarOportunidades}
    >
        Agregar
    </button>

    {/* Tabla de Compromisos */}
    <h3 className="text-white bg-[#1E3766] w-[90%] mt-3 text-center text-xl "> Compromisos </h3>
    <div className="w-[90%] bg-white shadow-md overflow-hidden mb-6 ">
        <table className="w-full text-center">
            <thead className='bg-[#1E3766] text-white'>
                <tr>
                    <th className="py-3 px-4 text-lg">Compromiso</th>
                    <th className="py-3 px-4 text-lg">Responsable</th>
                    <th className="py-3 px-4 text-lg">Fecha Limite</th>
                    <th className="py-3 px-4 text-lg">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {compromisos.map((compromiso, index) => (
                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="py-2 px-4">
                            <input
                                type="text"
                                className="bg-gray-200 w-full m-2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={compromiso.compromiso}
                                onChange={(e) => {
                                    const newLista = [...compromisos];
                                    newLista[index].compromiso = e.target.value;
                                    setCompromisos(newLista);
                                }}
                            />
                        </td>
                        <td className="py-2 px-4">
                            <input
                                type="text"
                                className="bg-gray-200 w-full m-2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={compromiso.responsable}
                                onChange={(e) => {
                                    const newLista = [...compromisos];
                                    newLista[index].responsable = e.target.value;
                                    setCompromisos(newLista);
                                }}
                            />
                        </td>
                        <td className="py-2 px-4">
                            <input
                                type="datetime-local"
                                value={compromiso.fecha_limite?.slice(0, 16) || ""}
                                onChange={(e) => {
                                    const newLista = [...compromisos];
                                    newLista[index].fecha_limite = e.target.value;
                                    setCompromisos(newLista);
                                }}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </td>
                        <td className="py-2 px-4">
                            <button
                                className="bg-red-600 hover:bg-red-700 rounded-full text-white px-4 py-1 transition-colors duration-200"
                                onClick={() => {
                                    setCompromisos(prev => prev.filter((_, i) => i !== index));
                                    if (compromiso.id != null) { borrarCompromisos(compromiso.id) };
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
        className="btn text-white px-4 py-2 m-2 transition-colors duration-200 ml-5"
        onClick={agregarCompromisos}
    >
        Agregar
    </button>

                <div className="mt-10"
                
                >
                    <button id="btn-guardar-edicion" 
                    className="btn text-xl ml-5 p-2"
                    onClick={() => {

                    guardarAuditoria();



                    sleep(1000).then(() => window.location.reload());}}>

                Guardar
                </button>
                <button
                id="btn-cancelar-edicion"
                className="btn-gray text-xl ml-5 p-2"
                onClick={() => {
                    window.location.reload();}}
                >
                Cancelar
                </button>
            </div>
            


        </div>
                }
        </>
    )
}

export default PlanEdit;