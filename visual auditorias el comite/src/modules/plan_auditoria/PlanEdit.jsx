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
    const [errores, setErrores] = useState({});
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Permite letras (con tildes), números, espacios, comas, puntos y signos de puntuación del español
    const textoRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü0-9\s.,;:¡!¿?\-'"()]+$/;

    const formatearFechaLocal = (valor) => {
        if (!valor) return "";
        try {
            const fecha = new Date(valor);
            const offset = fecha.getTimezoneOffset() * 60000; // ajusta a hora local
            const local = new Date(fecha.getTime() - offset).toISOString().slice(0, 16);
            return local;
        } catch (err) {
            return "";
        }
        };

    function validarTexto(valor) {
        if (!valor || valor.trim() === "") {
            return { valido: false, invalidos: "", vacio: true };
        }
        let invalidos = valor.replace(textoRegex, "");
        if (invalidos.length > 0) {
            return { valido: false, invalidos, vacio: false };
        }
        return { valido: true, invalidos: "", vacio: false };
    }
    const transformarHora = (horaBackend) => {
        if (!horaBackend) return "";
        if (horaBackend.length >= 5) return horaBackend.slice(0, 5);
        return horaBackend;
        };

    const formatearHora = (valor) => {
        if (!valor) return "";
        if (typeof valor !== "string") return "";

        // Caso HH:MM (ej: "22:53")
        if (/^\d{2}:\d{2}$/.test(valor)) return valor;

        // Caso HH:MM:SS (ej: "22:53:00") -> devuelve solo HH:MM
        if (/^\d{2}:\d{2}:\d{2}$/.test(valor)) return valor.slice(0, 5);

        // Caso ISO con fecha (ej: "2024-06-01T22:53:00") -> extrae HH:MM
        if (valor.includes("T") && valor.length >= 16) return valor.slice(11, 16);

        return "";
        };

    function validarFechaFutura(valor) {
        if (!valor) return { valido: false, mensaje: "La fecha es obligatoria" };
        const fechaIngresada = new Date(valor);
        const ahora = new Date();
        if (fechaIngresada <= ahora) {
            return { valido: false, mensaje: "La fecha debe ser futura a la fecha actual" };
        }
        return { valido: true, mensaje: "" };
    }

    const handleNombreChange = (e) => {
        const valor = e.target.value;
        const validacion = validarTexto(valor);
        setPlan({ ...plan, nombre: valor });
        setErrores({
            ...errores,
            nombre: validacion.vacio
                ? "El campo es obligatorio"
                : validacion.valido
                    ? ""
                    : `Caracteres inválidos`,
        });
    };

    const handleEstadoChange = (e) => {
        const valor = e.target.value;
        const validacion = validarTexto(valor);
        setPlan({ ...plan, estado: valor });
        setErrores({
            ...errores,
            estado: validacion.vacio
                ? "El campo es obligatorio"
                : validacion.valido
                    ? ""
                    : `Caracteres inválidos`,
        });
    };

    const handleFechaChange = (e) => {
        const valor = e.target.value;
        const validacion = validarFechaFutura(valor);
        setPlan({ ...plan, fecha: valor });
        setErrores({
            ...errores,
            fecha: validacion.valido ? "" : validacion.mensaje,
        });
    };

    const handleAlcanceChange = (e) => {
        const valor = e.target.value;
        const validacion = validarTexto(valor);
        setPlan({ ...plan, alcance: valor });
        setErrores({
            ...errores,
            alcance: validacion.vacio
                ? "El campo es obligatorio"
                : validacion.valido
                    ? ""
                    : `Caracteres inválidos`,
        });
    };

    const handleProcesoChange = (e) => {
        const valor = e.target.value;
        const validacion = validarTexto(valor);
        setPlan({ ...plan, proceso: valor });
        setErrores({
            ...errores,
            proceso: validacion.vacio
                ? "El campo es obligatorio"
                : validacion.valido
                    ? ""
                    : `Caracteres inválidos`,
        });
    };

    const handleLiderProcesoChange = (e) => {
        const valor = e.target.value;
        const validacion = validarTexto(valor);
        setPlan({ ...plan, lider_proceso: valor });
        setErrores({
            ...errores,
            lider_proceso: validacion.vacio
                ? "El campo es obligatorio"
                : validacion.valido
                    ? ""
                    : `Caracteres inválidos`,
        });
    };

    const handlePropositosChange = (e) => {
        const valor = e.target.value;
        const validacion = validarTexto(valor);
        setPlan({ ...plan, propositos: valor });
        setErrores({
            ...errores,
            propositos: validacion.vacio
                ? "El campo es obligatorio"
                : validacion.valido
                    ? ""
                    : `Caracteres inválidos`,
        });
    };

    const handleAuditadosChange = (e) => {
        const valor = e.target.value;
        const validacion = validarTexto(valor);
        setPlan({ ...plan, auditados: valor });
        setErrores({
            ...errores,
            auditados: validacion.vacio
                ? "El campo es obligatorio"
                : validacion.valido
                    ? ""
                    : `Caracteres inválidos:  ${[...new Set(validacion.invalidos)].join("")}`,
        });
    };


    const agregarFortalezas = () => {
        const nuevo = {
          
          id_auditoria: auditoria.id, 
          virtud: ""
        };
        setFortalezas([...fortalezas, nuevo]);
        
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


    const  guardarPlanActividad = async () => {
        await Promise.all([
        guardarItinerarios(itinerarios),
        guardarReuniones(reuniones),
        guardarAuditadosPlan(auditados),
        guardarPropositos(propositos),
        actualizarplan(plan),
        ]);
    };

    const guardarAuditoria = async () => {

        await Promise.all([

        guardarAspectos(aspectos),
        guardarCompromisos(compromisos),
        guardarFortalezas(fortalezas),
        guardarDebilidades(debilidades),
        guardarOportunidades(oportunidades),
        guardarListaxAuditoria(listaAuditada),
        ]);

    };

    useEffect(() => {
        
        traerTodoTrabajador().then((e)=>setTrabajadores(e));
        traerPropositos(prop.id).then((e) => setPropositos(e));
        traerID(prop.id).then((e) => {
   
            setPlan(e);});
        traerAuditadosPlan(prop.id).then((e)=>setAuditados(e));
        traerItinerarioPlan(prop.id).then((e) => {
        const itinerariosFormateados = e.map((it) => ({
            ...it,
            inicio: transformarHora(it.inicio),
            fin: transformarHora(it.fin),
        }));
        setItinerarios(itinerariosFormateados);
       
        });
        traerReunionPlan(prop.id).then((e)=>setReuniones(e));
        traerListasV().then((e) => setListas(e));
  
        traerAuditoria(prop.id).then((e)=>{
          
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
                                onChange={(e) => {setPlan({ ...plan, nombre: e.target.value });{handleNombreChange(e)}}}
                                className="flex-1 border border-gray-300 rounded px-4 py-2 m-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errores.nombre && (
                                <div className="text-red-600 text-sm text-center">{errores.nombre}</div>
                            )}
                        </div>
                        <div className="flex-1 flex flex-col md:flex-row">
                            <label className="p-3 bg-[#1E3766] text-white font-medium min-w-[120px]">Estado</label>
                            <input
                                type="text"
                                id="input-estado"
                                value={plan.estado}
                                onChange={(e) => {setPlan({ ...plan, estado: e.target.value });{handleEstadoChange(e)}}}
                                className="flex-1 border border-gray-300 rounded px-4 py-2 m-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {errores.estado && (
                                    <div className="text-red-600 text-sm text-center">{errores.estado}</div>
                                )}
                    </div>
                    
                    <div className="flex flex-col md:flex-row border-b border-gray-200">
                        <label className="p-3 bg-[#1E3766] text-white font-medium min-w-[120px]">Fecha</label>
                        <input
                            type="datetime-local"
                            id="datetime"
                            value={plan.fecha?.slice(0, 16) || ""}
                            onChange={(e) => {setPlan({ ...plan, fecha: e.target.value });{handleFechaChange(e)}}}
                            className="flex-1 border border-gray-300 rounded px-4 py-2 m-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errores.fecha && (
                            <div className="text-red-600 text-sm">{errores.fecha}</div>
                        )}
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
                            handleAlcanceChange(e)}}
                                                        className="flex-1 border border-gray-300 rounded px-4 py-2 m-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                    {errores.alcance && (
                                                        <div className="text-red-600 text-sm">{errores.alcance}</div>
                                                    )}
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
                                                                                        // Solo muestra el error para este propósito
                                                                                        const validacion = validarTexto(e.target.value);
                                                                                        setErrores({
                                                                                            ...errores,
                                                                                            [`propositos_${index}`]: validacion.vacio
                                                                                                ? "El campo es obligatorio"
                                                                                                : validacion.valido
                                                                                                    ? ""
                                                                                                    : `Caracteres inválidos`,
                                                                                        });
                                                                                    }}
                                                                                    className="w-full border border-gray-300 rounded px-4 py-2 m-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                                />
                                                                                {errores[`propositos_${index}`] && (
                                                                                    <div className="text-red-600 text-sm">{errores[`propositos_${index}`]}</div>
                                                                                )}
                                                                            </td>
                                                                            <td className="text-right pr-4">
                                                                                <button
                                                                                    className="bg-red-600 hover:bg-red-700 rounded-full text-white px-4 py-1 transition-colors duration-200"
                                                                                    style={{ marginLeft: "0.5rem", marginTop: "0" }}
                                                                                    onClick={() => {
                                                                                        setPropositos(prev => prev.filter((_, i) => i !== index));
                                                                                        if (proposito.id != null) { borrarProposito(proposito.id) };
                                                                                        // Limpia el error al eliminar
                                                                                        setErrores(prev => {
                                                                                            const newErrores = { ...prev };
                                                                                            delete newErrores[`propositos_${index}`];
                                                                                            return newErrores;
                                                                                        });
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
                                {handleProcesoChange(e)}
                            }}
                            className="w-full border border-gray-300 rounded px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errores.proceso && (
                            <div className="text-red-600 text-sm">{errores.proceso}</div>
                        )}
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
                                handleLiderProcesoChange(e)}
                                }
                                                            className="w-full border border-gray-300 rounded px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                        {errores.lider_proceso && (
                                                            <div className="text-red-600 text-sm">{errores.lider_proceso}</div>
                                                        )}
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
                                                                                    // Solo muestra el error para este auditado
                                                                                    const validacion = validarTexto(e.target.value);
                                                                                    setErrores({
                                                                                        ...errores,
                                                                                        [`auditados_${index}`]: validacion.vacio
                                                                                            ? "El campo es obligatorio"
                                                                                            : validacion.valido
                                                                                                ? ""
                                                                                                : `Caracteres inválidos:  ${[...new Set(validacion.invalidos)].join("")}`,
                                                                                    });
                                                                                }}
                                                                                className="w-full border border-gray-300 rounded px-4 py-2 m-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                            />
                                                                            {errores[`auditados_${index}`] && (
                                                                                <div className="text-red-600 text-sm">{errores[`auditados_${index}`]}</div>
                                                                            )}
                                                                        </td>
                                                                        <td className="text-right pr-4">
                                                                            <button
                                                                                className="bg-red-600 hover:bg-red-700 rounded-full text-white px-4 py-1 transition-colors duration-200"
                                                                                style={{ marginLeft: "0.5rem", marginTop: "0" }}
                                                                                onClick={() => {
                                                                                    setAuditados(prev => prev.filter((_, i) => i !== index));
                                                                                    if (auditado.id != null) { borrarAuditado(auditado.id) };
                                                                                    // Limpia el error al eliminar
                                                                                    setErrores(prev => {
                                                                                        const newErrores = { ...prev };
                                                                                        delete newErrores[`auditados_${index}`];
                                                                                        return newErrores;
                                                                                    });
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
                                        const value = e.target.value;
                                        const nuevasReuniones = [...reuniones];
                                        nuevasReuniones[index].apertura = value === "apertura";
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
                                    type="date"
                                    id={"fechaReunion" + reunion.id}
                                    placeholder="Fecha"
                                    value={reunion.fecha}
                                    onChange={(e) => {
                                        const valor = e.target.value;
                                        const validacion = validarFechaFutura(valor);
                                        const newReuniones = [...reuniones];
                                        newReuniones[index].fecha = valor;
                                        setReuniones(newReuniones);
                                        setErrores({
                                            ...errores,
                                            [`reunion_fecha_${index}`]: validacion.valido ? "" : validacion.mensaje,
                                        });
                                    }}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errores[`reunion_fecha_${index}`] && (
                                    <div className="text-red-600 text-sm">{errores[`reunion_fecha_${index}`]}</div>
                                )}
                            </td>
                            <td className="p-3">
                                <input
                                    type="time"
                                    id={"horaReunion" + reunion.id}
                                    placeholder="Hora"
                                    value={reunion.hora}
                                    onChange={(e) => {
                                        const valor = e.target.value;
                                        // Validar formato HH:MM y solo números
                                        const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
                                        const valido = horaRegex.test(valor);
                                        const newReuniones = [...reuniones];
                                        newReuniones[index].hora = valor;
                                        setReuniones(newReuniones);
                                    }}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errores[`reunion_hora_${index}`] && (
                                    <div className="text-red-600 text-sm">{errores[`reunion_hora_${index}`]}</div>
                                )}
                            </td>
                            <td className="p-3">
                                <input
                                    type="text"
                                    id={"lugarReunion" + reunion.id}
                                    placeholder="Lugar"
                                    value={reunion.lugar}
                                    onChange={(e) => {
                                        const valor = e.target.value;
                                        const validacion = validarTexto(valor);
                                        const newReuniones = [...reuniones];
                                        newReuniones[index].lugar = valor;
                                        setReuniones(newReuniones);
                                        setErrores({
                                            ...errores,
                                            [`reunion_lugar_${index}`]: validacion.vacio
                                                ? "El campo es obligatorio"
                                                : validacion.valido
                                                    ? ""
                                                    : `Caracteres inválidos`,
                                        });
                                    }}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errores[`reunion_lugar_${index}`] && (
                                    <div className="text-red-600 text-sm">{errores[`reunion_lugar_${index}`]}</div>
                                )}
                            </td>
                            <td className="p-3 text-center">
                                <button
                                    className="bg-red-600 hover:bg-red-700 rounded-full text-white px-4 py-1 transition-colors duration-200"
                                    onClick={() => {
                                        setReuniones(prev => prev.filter((_, i) => i !== index));
                                        if (reunion.id != null) { borrarReunion(reunion.id) };
                                        setErrores(prev => {
                                            const newErrores = { ...prev };
                                            delete newErrores[`reunion_fecha_${index}`];
                                            delete newErrores[`reunion_hora_${index}`];
                                            delete newErrores[`reunion_lugar_${index}`];
                                            return newErrores;
                                        });
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
                                                                const valor = e.target.value;
                                                                const validacion = validarTexto(valor);
                                                                const newItinerarios = [...itinerarios];
                                                                newItinerarios[index].actividad = valor;
                                                                setItinerarios(newItinerarios);
                                                                setErrores({
                                                                    ...errores,
                                                                    [`itinerario_actividad_${index}`]: validacion.vacio
                                                                        ? "El campo es obligatorio"
                                                                        : validacion.valido
                                                                            ? ""
                                                                            : `Caracteres inválidos`,
                                                                });
                                                            }}
                                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                        {errores[`itinerario_actividad_${index}`] && (
                                                            <div className="text-red-600 text-sm">{errores[`itinerario_actividad_${index}`]}</div>
                                                        )}
                                                    </td>
                                                    <td className="p-3">
                                                        <input
                                                            type="text"
                                                            id={"auditado" + itinerario.id}
                                                            placeholder="Auditado"
                                                            value={itinerario.auditado}
                                                            onChange={(e) => {
                                                                const valor = e.target.value;
                                                                const validacion = validarTexto(valor);
                                                                const newItinerarios = [...itinerarios];
                                                                newItinerarios[index].auditado = valor;
                                                                setItinerarios(newItinerarios);
                                                                setErrores({
                                                                    ...errores,
                                                                    [`itinerario_auditado_${index}`]: validacion.vacio
                                                                        ? "El campo es obligatorio"
                                                                        : validacion.valido
                                                                            ? ""
                                                                            : `Caracteres inválidos`,
                                                                });
                                                            }}
                                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                        {errores[`itinerario_auditado_${index}`] && (
                                                            <div className="text-red-600 text-sm">{errores[`itinerario_auditado_${index}`]}</div>
                                                        )}
                                                    </td>
                                                    <td className="p-3">
                                                        <input
                                                            type="text"
                                                            id={"auditor" + itinerario.id}
                                                            placeholder="Auditor"
                                                            value={itinerario.auditor}
                                                            onChange={(e) => {

                                                                const valor = e.target.value;
                                                                const validacion = validarTexto(valor);
                                                                const newItinerarios = [...itinerarios];
                                                                newItinerarios[index].auditor = valor;

                                                                setItinerarios(newItinerarios);
                                                                setErrores({
                                                                    ...errores,
                                                                    [`itinerario_auditor_${index}`]: validacion.vacio
                                                                        ? "El campo es obligatorio"
                                                                        : validacion.valido
                                                                            ? ""
                                                                            : `Caracteres inválidos`,
                                                                });
                                                            }}
                                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                        {errores[`itinerario_auditor_${index}`] && (
                                                            <div className="text-red-600 text-sm">{errores[`itinerario_auditor_${index}`]}</div>
                                                        )}
                                                    </td>
                                                    <td className="p-3">
                                                        <input
                                                        type="time"
                                                        id={"horaInicio" + itinerario.id}
                                                        placeholder="Hora inicio"
                                                        value={formatearHora(itinerario.inicio) || ""}
                                                        onChange={(e) => {
                                                            const valor = e.target.value; // ej: "14:30"
                                                            const newItinerarios = [...itinerarios];
                                                            newItinerarios[index].inicio = valor;
                                                        
                                                            setItinerarios(newItinerarios);

                                                          
                                                        }}
                                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                        {errores[`itinerario_inicio_${index}`] && (
                                                            <div className="text-red-600 text-sm">{errores[`itinerario_inicio_${index}`]}</div>
                                                        )}
                                                    </td>
                                                    <td className="p-3">
                                                        <input
                                                        type="time"
                                                        id={"horaFin" + itinerario.id}
                                                        placeholder="Hora fin"
                                                        value={formatearHora(itinerario.fin) || ""}
                                                        onChange={(e) => {
                                                            const valor = e.target.value; // ej: "15:45"
                                                            const newItinerarios = [...itinerarios];
                                                            newItinerarios[index].fin = valor;
                                                            setItinerarios(newItinerarios);
                                                        }}
                                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                        {errores[`itinerario_fin_${index}`] && (
                                                            <div className="text-red-600 text-sm">{errores[`itinerario_fin_${index}`]}</div>
                                                        )}
                                                    </td>
                                                    <td className="p-3">
                                                        <input
                                                            type="text"
                                                            id={"lugar" + itinerario.id}
                                                            placeholder="Lugar"
                                                            value={itinerario.lugar}
                                                            onChange={(e) => {
                                                                const valor = e.target.value;
                                                                const validacion = validarTexto(valor);
                                                                const newItinerarios = [...itinerarios];
                                                                newItinerarios[index].lugar = valor;
                                                                setItinerarios(newItinerarios);
                                                                setErrores({

                                                                    ...errores,
                                                                    [`itinerario_lugar_${index}`]: validacion.vacio
                                                                        ? "El campo es obligatorio"
                                                                        : validacion.valido
                                                                            ? ""
                                                                            : `Caracteres inválidos`,

                                                                });
                                                            }}
                                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                        {errores[`itinerario_lugar_${index}`] && (
                                                            <div className="text-red-600 text-sm">{errores[`itinerario_lugar_${index}`]}</div>
                                                        )}
                                                    </td>
                                                    <td className="p-3 text-center">
                                                        <button
                                                            className="bg-red-600 hover:bg-red-700 rounded-full text-white px-4 py-1 transition-colors duration-200"
                                                            onClick={() => {
                                                                setItinerarios(prev => prev.filter((_, i) => i !== index));
                                                                if (itinerario.id != null) { borrarItinerario(itinerario.id) };
                                                                setErrores(prev => {

                                                                    const newErrores = { ...prev };
                                                                    delete newErrores[`itinerario_actividad_${index}`];
                                                                    delete newErrores[`itinerario_auditado_${index}`];
                                                                    delete newErrores[`itinerario_auditor_${index}`];
                                                                    delete newErrores[`itinerario_inicio_${index}`];
                                                                    delete newErrores[`itinerario_fin_${index}`];
                                                                    delete newErrores[`itinerario_lugar_${index}`];
                                                                    return newErrores;

                                                                })
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
                                    onClick={() => agregarItinerario()}
                                >
                                    Agregar Actividad
                                </button>
                                </div>
                            </div>

                            {/* VALIDACIÓN DE CAMPOS */}
                            <div className="mt-8 flex flex-wrap justify-center gap-4">

                                <button 
                                    id="btn-guardar-edicion" 
                                    className="btn"
                                    onClick={async () => {
                                        // Validación antes de guardar
                                        const validarCampos = () => {
                                            let erroresVal = {};
                                            let valido = true;

                                            // Validar campos principales
                                            if (!plan.nombre || !validarTexto(plan.nombre).valido) {
                                                erroresVal.nombre = "El campo es obligatorio y debe ser válido";
                                                valido = false;
                                            }
                                            if (!plan.estado || !validarTexto(plan.estado).valido) {
                                                erroresVal.estado = "El campo es obligatorio y debe ser válido";
                                                valido = false;
                                            }
                                            if (!plan.fecha || plan.fecha === "00:00:00" || !validarFechaFutura(plan.fecha).valido) {
                                                erroresVal.fecha = "La fecha es obligatoria y debe ser futura";
                                                valido = false;
                                            }
                                            if (!plan.alcance || !validarTexto(plan.alcance).valido) {
                                                erroresVal.alcance = "El campo es obligatorio y debe ser válido";
                                                valido = false;
                                            }
                                            if (!plan.proceso || !validarTexto(plan.proceso).valido) {
                                                erroresVal.proceso = "El campo es obligatorio y debe ser válido";
                                                valido = false;
                                            }
                                            if (!plan.lider_proceso || !validarTexto(plan.lider_proceso).valido) {
                                                erroresVal.lider_proceso = "El campo es obligatorio y debe ser válido";
                                                valido = false;
                                            }


                                            // Validar propositos
                                            propositos.forEach((p, i) => {
                                                if (!p.descripcion || !validarTexto(p.descripcion).valido) {
                                                    erroresVal[`propositos_${i}`] = "El campo es obligatorio y debe ser válido";
                                                    valido = false;
                                                }
                                            });

                                            // Validar auditados
                                            auditados.forEach((a, i) => {
                                                if (!a.auditado || !validarTexto(a.auditado).valido) {
                                                    erroresVal[`auditados_${i}`] = "El campo es obligatorio y debe ser válido";
                                                    valido = false;
                                                }
                                            });

                                            // Validar reuniones
                                            reuniones.forEach((r, i) => {
                                                if (!r.fecha || r.fecha === "0000-00-00" || !validarFechaFutura(r.fecha).valido) {
                                                    erroresVal[`reunion_fecha_${i}`] = "La fecha es obligatoria y debe ser futura";
                                                    valido = false;
                                                }
                                                // Hora debe ser diferente de "00:00:00" y formato válido
                                                const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
                                                if (!r.lugar || !validarTexto(r.lugar).valido) {
                                                    erroresVal[`reunion_lugar_${i}`] = "El campo es obligatorio y debe ser válido";
                                                    valido = false;
                                                }
                                            });

                                            // Validar itinerarios
                                            itinerarios.forEach((it, i) => {
                                                if (!it.actividad || !validarTexto(it.actividad).valido) {
                                                    erroresVal[`itinerario_actividad_${i}`] = "El campo es obligatorio y debe ser válido";
                                                    valido = false;
                                                }
                                                if (!it.auditado || !validarTexto(it.auditado).valido) {
                                                    erroresVal[`itinerario_auditado_${i}`] = "El campo es obligatorio y debe ser válido";
                                                    valido = false;
                                                }
                                                if (!it.auditor || !validarTexto(it.auditor).valido) {
                                                    erroresVal[`itinerario_auditor_${i}`] = "El campo es obligatorio y debe ser válido";
                                                    valido = false;
                                                }
                                                if (!it.lugar || !validarTexto(it.lugar).valido) {
                                                    erroresVal[`itinerario_lugar_${i}`] = "El campo es obligatorio y debe ser válido";
                                                    valido = false;
                                                }
                                            });

                                            setErrores(erroresVal);
                                            return valido;
                                        };

                                        if (!validarCampos()) {
                                            // Construir un mensaje de error amigable
                                            const mensajes = Object.values(errores).filter(Boolean);
                                            let mensaje = "Por favor, complete todos los campos obligatorios correctamente antes de guardar.";
                                            
                                            // Mostrar alerta personalizada usando un modal simple
                                            const alerta = document.createElement("div");
                                            alerta.style.position = "fixed";
                                            alerta.style.top = "0";
                                            alerta.style.left = "0";
                                            alerta.style.width = "100vw";
                                            alerta.style.height = "100vh";
                                            alerta.style.background = "rgba(0,0,0,0.3)";
                                            alerta.style.display = "flex";
                                            alerta.style.alignItems = "center";
                                            alerta.style.justifyContent = "center";
                                            alerta.style.zIndex = "9999";
                                            alerta.innerHTML = `
                                                <div style="background: white; padding: 2rem 2.5rem; border-radius: 12px; box-shadow: 0 2px 16px rgba(0,0,0,0.15); max-width: 90vw; min-width: 320px;">
                                                    <h2 style="color: #1E3766; margin-bottom: 1rem; font-size: 1.2rem;">Campos incompletos o inválidos</h2>
                                                    <pre style="white-space: pre-wrap; color: #333; font-size: 1rem; margin-bottom: 1.5rem;">${mensaje}</pre>
                                                    <button style="background: #1E3766; color: white; border: none; border-radius: 6px; padding: 0.5rem 1.5rem; font-size: 1rem; cursor: pointer;">Cerrar</button>
                                                </div>
                                            `;
                                            alerta.querySelector("button").onclick = () => document.body.removeChild(alerta);
                                            document.body.appendChild(alerta);
                                            return;
                                        }

                                        await guardarPlanActividad();
                                        sleep(1000).then(() => window.location.reload());
                                    }}
                                >
                                    Guardar
                                </button>

                                <button
                                    id="eliminar-plan-cascada"
                                    className="btn-gray"
                                    onClick={() => {
                  
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
                                                        const valor = e.target.value;
                                                        const validacion = validarTexto(valor);
                                                        const nuevosAspectos = [...aspectos];
                                                        nuevosAspectos[index].aspecto = valor;
                                                        setAspectos(nuevosAspectos);
                                                        setErrores({
                                                            ...errores,
                                                            [`aspecto_${index}`]: validacion.vacio
                                                                ? "El campo es obligatorio"
                                                                : validacion.valido
                                                                    ? ""
                                                                    : "Caracteres inválidos",
                                                        });
                                                    }}
                                                />
                                                {errores[`aspecto_${index}`] && (
                                                    <div className="text-red-600 text-sm">{errores[`aspecto_${index}`]}</div>
                                                )}
                                            </td>
                                            <td className="py-2 px-4">
                                                <button
                                                    className="bg-red-600 hover:bg-red-700 rounded-full text-white px-4 py-1 transition-colors duration-200"
                                                    onClick={() => {
                                                        setAspectos(prev => prev.filter((_, i) => i !== index));
                                                        if (aspecto.id != null) { borrarAspecto(aspecto.id) }
                                                        setErrores(prev => {
                                                            const newErrores = { ...prev };
                                                            delete newErrores[`aspecto_${index}`];
                                                            return newErrores;
                                                        });
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
                                    const valor = e.target.value;
                                    const validacion = validarTexto(valor);
                                    const newFortalezas = [...fortalezas];
                                    newFortalezas[index].virtud = valor;
                                    setFortalezas(newFortalezas);
                                    setErrores({
                                        ...errores,
                                        [`fortaleza_${index}`]: validacion.vacio
                                            ? "El campo es obligatorio"
                                            : validacion.valido
                                                ? ""
                                                : "Caracteres inválidos",
                                    });
                                }}
                            />
                            {errores[`fortaleza_${index}`] && (
                                <div className="text-red-600 text-sm">{errores[`fortaleza_${index}`]}</div>
                            )}
                        </td>
                        <td className="py-2 px-4">
                            <button
                                className="bg-red-600 hover:bg-red-700 rounded-full text-white px-4 py-1 transition-colors duration-200"
                                onClick={() => {
                                    setFortalezas(prev => prev.filter((_, i) => i !== index));
                                  
                                    if (fortaleza.id != null){
                                    
                                        borrarFortalezas(fortaleza.id); };

                                    setErrores(prev => {
                                        const newErrores = { ...prev };
                                        delete newErrores[`fortaleza_${index}`];
                                        return newErrores;
                                    });
                                  
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
            onClick={() => agregarFortalezas()}
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
                                        const valor = e.target.value;
                                        const validacion = validarTexto(valor);
                                        const newDebilidades = [...debilidades];
                                        newDebilidades[index].falta = valor;
                                        setDebilidades(newDebilidades);
                                        setErrores({
                                            ...errores,
                                            [`debilidad_${index}`]: validacion.vacio
                                                ? "El campo es obligatorio"
                                                : validacion.valido
                                                    ? ""
                                                    : "Caracteres inválidos",
                                        });
                                    }}
                                />
                                {errores[`debilidad_${index}`] && (
                                    <div className="text-red-600 text-sm">{errores[`debilidad_${index}`]}</div>
                                )}
                            </td>
                            <td className="py-2 px-4">
                                <button
                                    className="bg-red-600 hover:bg-red-700 rounded-full text-white px-4 py-1 transition-colors duration-200"
                                    onClick={() => {
                                        setDebilidades(prev => prev.filter((_, i) => i !== index));
                                        if (debilidad.id != null) { borrarDebilidades(debilidad.id) };
                                        setErrores(prev => {
                                            const newErrores = { ...prev };
                                            delete newErrores[`debilidad_${index}`];
                                            return newErrores;
                                        });
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
            onClick={() => agregarDebilidades()}
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
                                        const valor = e.target.value;
                                        const validacion = validarTexto(valor);
                                        const newLista = [...oportunidades];
                                        newLista[index].oportunidad = valor;
                                        setOportunidades(newLista);
                                        setErrores({
                                            ...errores,
                                            [`oportunidad_${index}`]: validacion.vacio
                                                ? "El campo es obligatorio"
                                                : validacion.valido
                                                    ? ""
                                                    : "Caracteres inválidos",
                                        });
                                    }}
                                />
                                {errores[`oportunidad_${index}`] && (
                                    <div className="text-red-600 text-sm">{errores[`oportunidad_${index}`]}</div>
                                )}
                            </td>
                            <td className="py-2 px-4">
                                <button
                                    className="bg-red-600 hover:bg-red-700 rounded-full text-white px-4 py-1 transition-colors duration-200"
                                    onClick={() => {
                                        setOportunidades(prev => prev.filter((_, i) => i !== index));
                                        if (oportunidad.id != null) { borrarOportunidades(oportunidad.id) };
                                        setErrores(prev => {
                                            const newErrores = { ...prev };
                                            delete newErrores[`oportunidad_${index}`];
                                            return newErrores;
                                        })}}
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
                onClick={() => agregarOportunidades()}
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
                            <th className="py-3 px-4 text-lg">Fecha Límite</th>
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
                                            const valor = e.target.value;
                                            const validacion = validarTexto(valor);
                                            const newLista = [...compromisos];
                                            newLista[index].compromiso = valor;
                                            setCompromisos(newLista);
                                            
                                            setErrores({
                                                ...errores,
                                                [`compromiso_${index}`]: validacion.vacio
                                                    ? "El campo es obligatorio"
                                                    : validacion.valido
                                                        ? ""
                                                        : "Caracteres inválidos",
                                            });

                                        }}
                                    />
                                    {errores[`compromiso_${index}`] && (
                                        <div className="text-red-600 text-sm">{errores[`compromiso_${index}`]}</div>
                                    )}
                                </td>
                                <td className="py-2 px-4">
                                    <input
                                        type="text"
                                        className="bg-gray-200 w-full m-2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={compromiso.responsable}
                                        onChange={(e) => {
                                            const valor = e.target.value;
                                            const validacion = validarTexto(valor);
                                            const newLista = [...compromisos];
                                            newLista[index].responsable = valor;
                                            setCompromisos(newLista);
                                            setErrores({
                                                ...errores,
                                                [`compromiso_responsable_${index}`]: validacion.vacio
                                                    ? "El campo es obligatorio"
                                                    : validacion.valido
                                                        ? ""
                                                        : "Caracteres inválidos",
                                            });
                                        }}
                                    />
                                    {errores[`compromiso_responsable_${index}`] && (
                                        <div className="text-red-600 text-sm">{errores[`compromiso_responsable_${index}`]}</div>
                                    )}
                                </td>
                                <td className="py-2 px-4">
                                    <input
                                    type="datetime-local"
                                    value={formatearFechaLocal(compromiso.fecha_limite) || ""}
                                    onChange={(e) => {
                                        const valor = e.target.value;
                                        const validacion = !valor || valor === "0000-00-00T00:00"
                                        ? { valido: false, mensaje: "La fecha es obligatoria" }
                                        : validarFechaFutura(valor);
                                   
                                        const newLista = [...compromisos];
                                        newLista[index].fecha_limite = valor;
                                        setCompromisos(newLista);

                                        setErrores({
                                        ...errores,
                                        [`compromiso_fecha_${index}`]: validacion.valido ? "" : validacion.mensaje,
                                        });
                                    }}
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                    />
                                    {errores[`compromiso_fecha_${index}`] && (
                                        <div className="text-red-600 text-sm">{errores[`compromiso_fecha_${index}`]}</div>
                                    )}
                                </td>
                                <td className="py-2 px-4">
                                    <button
                                        className="bg-red-600 hover:bg-red-700 rounded-full text-white px-4 py-1 transition-colors duration-200"
                                        onClick={() => {
                                            setCompromisos(prev => prev.filter((_, i) => i !== index));
                                            if (compromiso.id != null) { borrarCompromisos(compromiso.id) };
                                            setErrores(prev => {
                                                const newErrores = { ...prev };
                                                delete newErrores[`compromiso_${index}`];
                                                delete newErrores[`compromiso_responsable_${index}`];
                                                delete newErrores[`compromiso_fecha_${index}`];
                                                return newErrores;
                                            })}}
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
                    <button
                        id="btn-guardar-edicion"
                        className="btn text-xl ml-5 p-2"
                        onClick={async () => {

                            // Validación antes de guardar auditoría
                            const validarCamposAuditoria = () => {
                                let erroresVal = {};
                                let valido = true;

                                // Validar aspectos
                                aspectos.forEach((a, i) => {
                                    if (!a.aspecto || !validarTexto(a.aspecto).valido) {
                                        erroresVal[`aspecto_${i}`] = "El campo es obligatorio y debe ser válido";
                                        valido = false;
                                    }
                                });

                                // Validar fortalezas
                                fortalezas.forEach((f, i) => {
                                    if (!f.virtud || !validarTexto(f.virtud).valido) {
                                        erroresVal[`fortaleza_${i}`] = "El campo es obligatorio y debe ser válido";
                                        valido = false;
                                    }
                                });

                                // Validar debilidades
                                debilidades.forEach((d, i) => {
                                    if (!d.falta || !validarTexto(d.falta).valido) {
                                        erroresVal[`debilidad_${i}`] = "El campo es obligatorio y debe ser válido";
                                        valido = false;
                                    }
                                });

                                // Validar oportunidades
                                oportunidades.forEach((o, i) => {
                                    if (!o.oportunidad || !validarTexto(o.oportunidad).valido) {
                                        erroresVal[`oportunidad_${i}`] = "El campo es obligatorio y debe ser válido";
                                        valido = false;
                                    }
                                });

                                // Validar compromisos
                                compromisos.forEach((c, i) => {
                                    if (!c.compromiso || !validarTexto(c.compromiso).valido) {
                                        erroresVal[`compromiso_${i}`] = "El campo es obligatorio y debe ser válido";
                                        valido = false;
                                    }
                                    if (!c.responsable || !validarTexto(c.responsable).valido) {
                                        erroresVal[`compromiso_responsable_${i}`] = "El campo es obligatorio y debe ser válido";
                                        valido = false;
                                    }
                                    if (
                                    !c.fecha_limite ||                               // vacío o null
                                    c.fecha_limite.trim() === "" ||                 // string vacío
                                    c.fecha_limite === "0000-00-00T00:00" ||         // valor por defecto inválido
                                    isNaN(Date.parse(c.fecha_limite)) ||            // no es una fecha válida
                                    !validarFechaFutura(c.fecha_limite).valido       // fecha no es futura
                                    ) {
                                    erroresVal[`compromiso_fecha_${i}`] = "La fecha es obligatoria y debe ser futura";
                                    valido = false;
                                    }
                                });

                                setErrores(erroresVal);
                                return valido;
                            };

                            if (!validarCamposAuditoria()) {
                                // Mostrar alerta personalizada usando un modal simple
                                const mensaje = "Por favor, complete todos los campos obligatorios correctamente antes de guardar.";
                                const alerta = document.createElement("div");
                                alerta.style.position = "fixed";
                                alerta.style.top = "0";
                                alerta.style.left = "0";
                                alerta.style.width = "100vw";
                                alerta.style.height = "100vh";
                                alerta.style.background = "rgba(0,0,0,0.3)";
                                alerta.style.display = "flex";
                                alerta.style.alignItems = "center";
                                alerta.style.justifyContent = "center";
                                alerta.style.zIndex = "9999";
                                alerta.innerHTML = `
                                    <div style="background: white; padding: 2rem 2.5rem; border-radius: 12px; box-shadow: 0 2px 16px rgba(0,0,0,0.15); max-width: 90vw; min-width: 320px;">
                                        <h2 style="color: #1E3766; margin-bottom: 1rem; font-size: 1.2rem;">Campos incompletos o inválidos</h2>
                                        <pre style="white-space: pre-wrap; color: #333; font-size: 1rem; margin-bottom: 1.5rem;">${mensaje}</pre>
                                        <button style="background: #1E3766; color: white; border: none; border-radius: 6px; padding: 0.5rem 1.5rem; font-size: 1rem; cursor: pointer;">Cerrar</button>
                                    </div>
                                `;
                                alerta.querySelector("button").onclick = () => document.body.removeChild(alerta);
                                document.body.appendChild(alerta);
                                return;
                            }

                            await guardarAuditoria();
                            sleep(1000).then(() => window.location.reload());
                        }}
                    >
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