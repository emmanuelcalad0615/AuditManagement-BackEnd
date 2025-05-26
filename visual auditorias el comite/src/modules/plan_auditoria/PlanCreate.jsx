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

       const textoRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü0-9\s.,;:¡!¿?\-'"()]+$/;
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

    // Estado para errores de validación
    const [errores, setErrores] = useState({});


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
                                onChange={handleNombreChange}
                                className="flex-1 border border-gray-300 rounded px-4 py-2 m-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errores.nombre && (
                                <div className="text-red-600 text-sm text-center">
                                    {errores.nombre === "El campo es obligatorio"
                                        ? "El campo es obligatorio"
                                        : errores.nombre === "Caracteres inválidos"
                                        ? "El campo contiene caracteres inválidos"
                                        : errores.nombre}
                                </div>
                            )}
                        </div>
                        <div className="flex-1 flex flex-col md:flex-row">
                            <label className="p-3 bg-[#1E3766] text-white font-medium min-w-[120px]">Estado</label>
                            <input
                                type="text"
                                id="input-estado"
                                value={plan.estado}
                                onChange={handleEstadoChange}
                                className="flex-1 border border-gray-300 rounded px-4 py-2 m-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errores.estado && (
                                <div className="text-red-600 text-sm text-center">
                                    {errores.estado === "El campo es obligatorio"
                                        ? "El campo es obligatorio"
                                        : errores.estado === "Caracteres inválidos"
                                        ? "El campo contiene caracteres inválidos"
                                        : errores.estado}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row border-b border-gray-200">
                        <label className="p-3 bg-[#1E3766] text-white font-medium min-w-[120px]">Fecha</label>
                        <input
                            type="datetime-local"
                            id="datetime"
                            value={plan.fecha?.slice(0, 16) || ""}
                            onChange={handleFechaChange}
                            className="flex-1 border border-gray-300 rounded px-4 py-2 m-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errores.fecha && (
                            <div className="text-red-600 text-sm text-center">{errores.fecha}</div>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row border-b border-gray-200">
                        <label className="p-3 bg-[#1E3766] text-white font-medium min-w-[120px]">Alcance</label>
                        <input
                            type="text"
                            id="alcance-planauditoria"
                            placeholder="Alcance"
                            value={plan.alcance}
                            onChange={handleAlcanceChange}
                            className="flex-1 border border-gray-300 rounded px-4 py-2 m-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errores.alcance && (
                            <div className="text-red-600 text-sm text-center">
                                {errores.alcance === "El campo es obligatorio"
                                    ? "El campo es obligatorio"
                                    : errores.alcance === "Caracteres inválidos"
                                    ? "El campo contiene caracteres inválidos"
                                    : errores.alcance}
                            </div>
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
                                                        <div className="text-red-600 text-sm">
                                                            {errores[`propositos_${index}`] === "El campo es obligatorio"
                                                                ? "El campo es obligatorio"
                                                                : errores[`propositos_${index}`] === "Caracteres inválidos"
                                                                ? "El campo contiene caracteres inválidos"
                                                                : errores[`propositos_${index}`]}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="text-right pr-4">
                                                    <button
                                                        className="bg-red-600 hover:bg-red-700 rounded-full text-white px-4 py-1 transition-colors duration-200"
                                                        style={{ marginLeft: "0.5rem", marginTop: "0" }}
                                                        onClick={() => {
                                                            setPropositos(prev => prev.filter((_, i) => i !== index));
                                                            if (proposito.id != null) { borrarProposito(proposito.id) };
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
                                    setPlan({ ...plan, proceso: e.target.value });
                                    { handleProcesoChange(e) }
                                }}
                                className="w-full border border-gray-300 rounded px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errores.proceso && (
                                <div className="text-red-600 text-sm">
                                    {errores.proceso === "El campo es obligatorio"
                                        ? "El campo es obligatorio"
                                        : errores.proceso === "Caracteres inválidos"
                                        ? "El campo contiene caracteres inválidos"
                                        : errores.proceso}
                                </div>
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
                                    handleLiderProcesoChange(e)
                                }}
                                className="w-full border border-gray-300 rounded px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errores.lider_proceso && (
                                <div className="text-red-600 text-sm">
                                    {errores.lider_proceso === "El campo es obligatorio"
                                        ? "El campo es obligatorio"
                                        : errores.lider_proceso === "Caracteres inválidos"
                                        ? "El campo contiene caracteres inválidos"
                                        : errores.lider_proceso}
                                </div>
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
                                                    <div className="text-red-600 text-sm">
                                                        {errores[`auditados_${index}`].startsWith("El campo es obligatorio")
                                                            ? "El campo es obligatorio"
                                                            : errores[`auditados_${index}`].startsWith("Caracteres inválidos")
                                                            ? "El campo contiene caracteres inválidos"
                                                            : errores[`auditados_${index}`]}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="text-right pr-4">
                                                <button
                                                    className="bg-red-600 hover:bg-red-700 rounded-full text-white px-4 py-1 transition-colors duration-200"
                                                    style={{ marginLeft: "0.5rem", marginTop: "0" }}
                                                    onClick={() => {
                                                        setAuditados(prev => prev.filter((_, i) => i !== index));
                                                        if (auditado.id != null) { borrarAuditado(auditado.id) };
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
                                        <tr key={reunion.id || index} className="border-t border-gray-200 hover:bg-gray-50">
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
                                                        const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
                                                        const valido = horaRegex.test(valor);
                                                        const newReuniones = [...reuniones];
                                                        newReuniones[index].hora = valor;
                                                        setReuniones(newReuniones);
                                                        setErrores({
                                                            ...errores,
                                                            [`reunion_hora_${index}`]: valido ? "" : "Hora inválida (formato HH:MM, solo números)",
                                                        });
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
                                                    <div className="text-red-600 text-sm">
                                                        {errores[`reunion_lugar_${index}`] === "El campo es obligatorio"
                                                            ? "El campo es obligatorio"
                                                            : errores[`reunion_lugar_${index}`] === "Caracteres inválidos"
                                                            ? "El campo contiene caracteres inválidos"
                                                            : errores[`reunion_lugar_${index}`]}
                                                    </div>
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
                                                    <div className="text-red-600 text-sm">
                                                        {errores[`itinerario_actividad_${index}`] === "El campo es obligatorio"
                                                            ? "El campo es obligatorio"
                                                            : errores[`itinerario_actividad_${index}`] === "Caracteres inválidos"
                                                            ? "El campo contiene caracteres inválidos"
                                                            : errores[`itinerario_actividad_${index}`]}
                                                    </div>
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
                                                    <div className="text-red-600 text-sm">
                                                        {errores[`itinerario_auditado_${index}`] === "El campo es obligatorio"
                                                            ? "El campo es obligatorio"
                                                            : errores[`itinerario_auditado_${index}`] === "Caracteres inválidos"
                                                            ? "El campo contiene caracteres inválidos"
                                                            : errores[`itinerario_auditado_${index}`]}
                                                    </div>
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
                                                    <div className="text-red-600 text-sm">
                                                        {errores[`itinerario_auditor_${index}`] === "El campo es obligatorio"
                                                            ? "El campo es obligatorio"
                                                            : errores[`itinerario_auditor_${index}`] === "Caracteres inválidos"
                                                            ? "El campo contiene caracteres inválidos"
                                                            : errores[`itinerario_auditor_${index}`]}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-3">
                                                <input
                                                    type="datetime-local"
                                                    id={"horaInicio" + itinerario.id}
                                                    placeholder="Hora inicio"
                                                    value={itinerario.inicio?.slice(0, 16) || ""}
                                                    onChange={(e) => {
                                                        const valor = e.target.value;
                                                        const validacion = validarFechaFutura(valor);
                                                        const newItinerarios = [...itinerarios];
                                                        newItinerarios[index].inicio = valor;
                                                        setItinerarios(newItinerarios);
                                                        setErrores({
                                                            ...errores,
                                                            [`itinerario_inicio_${index}`]: validacion.valido ? "" : validacion.mensaje,
                                                        });
                                                    }}
                                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                {errores[`itinerario_inicio_${index}`] && (
                                                    <div className="text-red-600 text-sm">{errores[`itinerario_inicio_${index}`]}</div>
                                                )}
                                            </td>
                                            <td className="p-3">
                                                <input
                                                    type="datetime-local"
                                                    id={"horaFin" + itinerario.id}
                                                    placeholder="Hora fin"
                                                    value={itinerario.fin?.slice(0, 16) || ""}
                                                    onChange={(e) => {
                                                        const valor = e.target.value;
                                                        const validacion = validarFechaFutura(valor);
                                                        const newItinerarios = [...itinerarios];
                                                        newItinerarios[index].fin = valor;
                                                        setItinerarios(newItinerarios);
                                                        setErrores({
                                                            ...errores,
                                                            [`itinerario_fin_${index}`]: validacion.valido ? "" : validacion.mensaje,
                                                        });
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
                                                    <div className="text-red-600 text-sm">
                                                        {errores[`itinerario_lugar_${index}`] === "El campo es obligatorio"
                                                            ? "El campo es obligatorio"
                                                            : errores[`itinerario_lugar_${index}`] === "Caracteres inválidos"
                                                            ? "El campo contiene caracteres inválidos"
                                                            : errores[`itinerario_lugar_${index}`]}
                                                    </div>
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

                {/* Botones de Acción */}
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
                                if (!plan.nombre || plan.nombre.trim() === "") {
                                    erroresVal.nombre = "El campo es obligatorio";
                                    valido = false;
                                } else if (!validarTexto(plan.nombre).valido) {
                                    erroresVal.nombre = "Caracteres inválidos";
                                    valido = false;
                                }
                                if (!plan.estado || plan.estado.trim() === "") {
                                    erroresVal.estado = "El campo es obligatorio";
                                    valido = false;
                                } else if (!validarTexto(plan.estado).valido) {
                                    erroresVal.estado = "Caracteres inválidos";
                                    valido = false;
                                }
                                if (!plan.fecha || plan.fecha === "00:00:00" || !validarFechaFutura(plan.fecha).valido) {
                                    erroresVal.fecha = "La fecha es obligatoria y debe ser futura";
                                    valido = false;
                                }
                                if (!plan.alcance || plan.alcance.trim() === "") {
                                    erroresVal.alcance = "El campo es obligatorio";
                                    valido = false;
                                } else if (!validarTexto(plan.alcance).valido) {
                                    erroresVal.alcance = "Caracteres inválidos";
                                    valido = false;
                                }
                                if (!plan.proceso || plan.proceso.trim() === "") {
                                    erroresVal.proceso = "El campo es obligatorio";
                                    valido = false;
                                } else if (!validarTexto(plan.proceso).valido) {
                                    erroresVal.proceso = "Caracteres inválidos";
                                    valido = false;
                                }
                                if (!plan.lider_proceso || plan.lider_proceso.trim() === "") {
                                    erroresVal.lider_proceso = "El campo es obligatorio";
                                    valido = false;
                                } else if (!validarTexto(plan.lider_proceso).valido) {
                                    erroresVal.lider_proceso = "Caracteres inválidos";
                                    valido = false;
                                }

                                // Validar propositos
                                propositos.forEach((p, i) => {
                                    if (!p.descripcion || p.descripcion.trim() === "") {
                                        erroresVal[`propositos_${i}`] = "El campo es obligatorio";
                                        valido = false;
                                    } else if (!validarTexto(p.descripcion).valido) {
                                        erroresVal[`propositos_${i}`] = "Caracteres inválidos";
                                        valido = false;
                                    }
                                });

                                // Validar auditados
                                auditados.forEach((a, i) => {
                                    if (!a.auditado || a.auditado.trim() === "") {
                                        erroresVal[`auditados_${i}`] = "El campo es obligatorio";
                                        valido = false;
                                    } else if (!validarTexto(a.auditado).valido) {
                                        erroresVal[`auditados_${i}`] = "Caracteres inválidos";
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
                                    if (!r.hora || r.hora === "00:00:00" || !horaRegex.test(r.hora)) {
                                        erroresVal[`reunion_hora_${i}`] = "Hora inválida (formato HH:MM, solo números)";
                                        valido = false;
                                    }
                                    if (!r.lugar || r.lugar.trim() === "") {
                                        erroresVal[`reunion_lugar_${i}`] = "El campo es obligatorio";
                                        valido = false;
                                    } else if (!validarTexto(r.lugar).valido) {
                                        erroresVal[`reunion_lugar_${i}`] = "Caracteres inválidos";
                                        valido = false;
                                    }
                                });

                                // Validar itinerarios
                                itinerarios.forEach((it, i) => {
                                    if (!it.actividad || it.actividad.trim() === "") {
                                        erroresVal[`itinerario_actividad_${i}`] = "El campo es obligatorio";
                                        valido = false;
                                    } else if (!validarTexto(it.actividad).valido) {
                                        erroresVal[`itinerario_actividad_${i}`] = "Caracteres inválidos";
                                        valido = false;
                                    }
                                    if (!it.auditado || it.auditado.trim() === "") {
                                        erroresVal[`itinerario_auditado_${i}`] = "El campo es obligatorio";
                                        valido = false;
                                    } else if (!validarTexto(it.auditado).valido) {
                                        erroresVal[`itinerario_auditado_${i}`] = "Caracteres inválidos";
                                        valido = false;
                                    }
                                    if (!it.auditor || it.auditor.trim() === "") {
                                        erroresVal[`itinerario_auditor_${i}`] = "El campo es obligatorio";
                                        valido = false;
                                    } else if (!validarTexto(it.auditor).valido) {
                                        erroresVal[`itinerario_auditor_${i}`] = "Caracteres inválidos";
                                        valido = false;
                                    }
                                    if (!it.inicio || it.inicio === "00:00:00" || !validarFechaFutura(it.inicio).valido) {
                                        erroresVal[`itinerario_inicio_${i}`] = "La fecha/hora es obligatoria y debe ser futura";
                                        valido = false;
                                    }
                                    if (!it.fin || it.fin === "00:00:00" || !validarFechaFutura(it.fin).valido) {
                                        erroresVal[`itinerario_fin_${i}`] = "La fecha/hora es obligatoria y debe ser futura";
                                        valido = false;
                                    }
                                    if (!it.lugar || it.lugar.trim() === "") {
                                        erroresVal[`itinerario_lugar_${i}`] = "El campo es obligatorio";
                                        valido = false;
                                    } else if (!validarTexto(it.lugar).valido) {
                                        erroresVal[`itinerario_lugar_${i}`] = "Caracteres inválidos";
                                        valido = false;
                                    }
                                });

                                setErrores(erroresVal);
                                return valido;
                            };

                            if (!validarCampos()) {
                                // Construir un mensaje de error amigable
                                const camposVacios = [];
                                const camposInvalidos = [];
                                Object.entries(errores).forEach(([key, value]) => {
                                    if (value === "El campo es obligatorio") {
                                        camposVacios.push(key);
                                    } else if (value === "Caracteres inválidos" || (typeof value === "string" && value.startsWith("Caracteres inválidos"))) {
                                        camposInvalidos.push(key);
                                    }
                                });

                                let mensaje = "";
                                if (camposVacios.length > 0) {
                                    mensaje += "Por favor, complete todos los campos obligatorios antes de guardar.\n";
                                }
                                if (camposInvalidos.length > 0) {
                                    mensaje += "Algunos campos contienen caracteres inválidos. Corríjalos antes de guardar.";
                                }
                                if (!mensaje) {
                                    mensaje = "Por favor, complete todos los campos obligatorios correctamente antes de guardar.";
                                }

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