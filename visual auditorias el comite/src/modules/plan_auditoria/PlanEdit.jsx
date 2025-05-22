import { useState, useEffect } from "react";
import { traerID, traerPropositos, traerAuditadosPlan, traerTodoTrabajador,
    traerReunionPlan, traerItinerarioPlan, guardarReuniones, guardarAuditadosPlan,
    guardarItinerarios, borrarReunion, borrarItinerario, borrarAuditado, borrarProposito,
    traerListasV, traerAspectos,traerAuditoria, guardarPropositos, guardarAspectos, traerListaxAuditoria,
    borrarAspecto, guardarListaxAuditoria, actualizarplan,
    traerOportunidades, guardarOportunidades, borrarOportunidades,
    traerDebilidades, guardarDebilidades, borrarDebilidades,
    traerFortalezas, guardarFortalezas, borrarFortalezas,
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
        <div className=" w-full h-full flex flex-col items-center justify-center">
            <div className="mt-10 bg-white w-[90%] rounded-xl">
                <div
                className="flex flex-row">
                    <p className="p-2 bg-[#1E3766] text-white">Nombre</p>
                    <input
                    type="text"
                    id="input-editar-plan"
                    value={plan.nombre}
                    onChange={(e) => {
                        setPlan({ ...plan, nombre: e.target.value });
                    }}
                    className="border border-gray-300 rounded px-3 py-2"
                    />
                    <p className="p-2 bg-[#1E3766] text-white">Estado</p>
                    <input
                    type="text"
                    id="input-estado"
                    value={plan.estado}
                    onChange={(e) => {
                        setPlan({ ...plan, estado: e.target.value });
                    }}
                    className="border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div className="flex flex-row">
                    <p className="p-2 bg-[#1E3766] text-white"> fecha</p>

                    <input
                    type="datetime-local"
                    id="datetime"
                    value={plan.fecha?.slice(0, 16) || ""}
                    onChange={(e) => {
                        setPlan({ ...plan, fecha: e.target.value });
                    }}
                    className="border border-gray-300 rounded px-3 py-2"
                    />

                </div>

                <div className="flex flex-row">
                    <p className="p-2 bg-[#1E3766] text-white"> alcance</p>

                    <input
                  type="text"
                  id="alcance-planauditoria"
                  placeholder="alcance"
                  value={plan.alcance}
                  className="w-full text-center"
                  onChange={(e) => {
                    const newPlan = plan
                    newPlan.alcance = e.target.value;
                    setPlan(newPlan);
                  }}
                   />
                </div>

                <div className="flex flex-row">
                    <p className="p-2 bg-[#1E3766] text-white"> proposito</p>

                    <table
                        className="w-full"
                        >
                        <tbody>
                        {propositos.map((proposito, index) => (
                            <tr key={index}>
                            <td>
                            <input
                            type="text"
                            id={proposito.id}
                            placeholder="proposito"
                            value={proposito.descripcion}
                            className="w-full text-center"
                            onChange={(e) => {
                                const newPropositos = [...propositos];
                                newPropositos[index].descripcion = e.target.value;
                                setPropositos(newPropositos);
                            }}
                            />
                   </td>
                            <td> <button
                            className="bg-[#1E3766] rounded-full text-white text-xl ml-3 p-1"
                            onClick={() => {
                                setPropositos(prev => prev.filter((_, i) => i !== index));
                                if(proposito.id != null){borrarProposito(proposito.id)};
                              }}
                            >borrar</button></td>
                            </tr>
                        ))
                        }

                        </tbody>

                    </table>

                </div>
                <button
                    className="bg-[#1E3766] rounded-full text-white text-xl ml-3 p-1"
                    onClick={agregarProposito}
                    > agregar </button>

            </div>

            <div 
            className="bg-white w-[90%] rounded-xl
            flex flex-row mt-10 ">
                <div className="flex flex-col w-[25%]">
                    <h3 className="bg-[#1E3766] text-white text-center">Procesos</h3>
                    <input
                  type="text"
                  id="proceso-planauditoria"
                  placeholder="proceso a auditar"
                  value={plan.proceso}
                  className="w-full text-center"
                  onChange={(e) => {
                    const newPlan = plan
                    newPlan.proceso = e.target.value;
                    setPlan(newPlan);
                  }}
                   />

                </div>
                <div className="flex flex-col w-[25%]">
                    <h3 className="bg-[#1E3766] text-white text-center">Lider</h3>
                    <input
                  type="text"
                  id="liderProceso-planauditoria"
                  placeholder="lider del proceso auditado"
                  value={plan.lider_proceso}
                  className="w-full text-center"
                  onChange={(e) => {
                    const newPlan = plan
                    newPlan.lider_proceso = e.target.value;
                    setPlan(newPlan);
                  }}
                   />
                </div>

                <div className="flex flex-col w-[25%]">
                    <h3 className="bg-[#1E3766] text-white text-center">Auditados</h3>
                    <table
                        className="w-full"
                        >
                        <tbody >
                        { auditados.map( (auditado, index) => (
                       
                            <tr key={index}>
                            <td>
                            <input
                            type="text"
                            id={auditado.id}
                            placeholder="auditado"
                            value={auditado.auditado}
                            className="w-full text-center"
                            onChange={(e) => {
                                const newAuditados = [...auditados];
                                newAuditados[index].auditado = e.target.value;
                                setAuditados(newAuditados);
                            }}
                            />
                            </td>
                            <td> <button
                            className="bg-[#1E3766] rounded-full text-white text-xl ml-3 p-1"
                            onClick={() => {
                                setAuditados(prev => prev.filter((_, i) => i !== index));
                                if(auditado.id != null){borrarAuditado(auditado.id)};
                              }}
                            >borrar</button></td>
                            </tr>
                            
                        )
                        )}
                        </tbody>
                    </table>
                    <button
                    className="bg-[#1E3766] rounded-full text-white text-xl ml-3 p-1"
                    onClick={agregarAuditado}> Agregar</button>
                </div>
                <div className="flex flex-col w-[25%]">
                    <h3 className="bg-[#1E3766] text-white text-center">Firma</h3>
                    <p> </p>
                </div>

            </div>

            {/*                                                  REUNIONES                  */}


            <div className=" w-[90%] mt-10 flex flex-row">
                <div className="bg-white w-[70%] mr-10">
                    <table
                        className="w-full"
                        >
                        <thead className=" bg-[#1E3766] text-white text-center">
                        <tr>
                            <th>Tipo de reunion </th>
                            <th> Fecha </th>
                            <th> Hora </th>
                            <th> Lugar </th>
                            <th> Acciones </th>
                        </tr>

                        </thead>
                        <tbody>
                            {reuniones && (
                                reuniones.map((reunion,index)=>(
                                    <tr key={ reunion.id}>
                                    <td>
                                    <select
                                    id={"tipoReunion" + reunion.id}
                                    value={reunion.apertura ? "apertura" : "cierre"}
                                    onChange={(e) => {
                                        const value = e.target.value === "apertura";
                                        const nuevasReuniones = [...reuniones];
                                        nuevasReuniones[index].apertura = value;
                                        setReuniones(nuevasReuniones);
                                    }}
                                    className="w-full text-center"
                                    >
                                    <option value="apertura">apertura</option>
                                    <option value="cierre">cierre</option>
                                    </select>
                                    </td>
                                    <td>
                                    <input
                            type="text"
                            id={"fechaReunion"+reunion.id}
                            placeholder="reunion"
                            value={reunion.fecha}
                            className="w-full text-center"
                            onChange={(e) => {
                                const newReuniones = [...reuniones];
                                newReuniones[index].fecha = e.target.value;
                                setReuniones(newReuniones);
                            }}
                            />
                            </td>
                                    <td>
                                    <input
                            type="text"
                            id={"horaReunion"+reunion.id}
                            placeholder="hora"
                            value={reunion.hora}
                            className="w-full text-center"
                            onChange={(e) => {
                                const newReuniones = [...reuniones];
                                newReuniones[index].hora = e.target.value;
                                setReuniones(newReuniones);
                            }}
                            />
                            </td>
                                    <td>
                                    <input
                            type="text"
                            id={"lugarReunion"+reunion.id}
                            placeholder="auditado"
                            value={reunion.lugar}
                            className="w-full text-center"
                            onChange={(e) => {
                                const newReuniones = [...reuniones];
                                newReuniones[index].lugar = e.target.value;
                                setReuniones(newReuniones);
                            }}
                            />
                            </td>
                            <td> <button
                                className="bg-[#1E3766] rounded-full text-white text-xl ml-3 p-1"
                                onClick={() => {
                                    setReuniones(prev => prev.filter((_, i) => i !== index));
                                    if(reunion.id != null){borrarReunion(reunion.id)};
                                  }}
                                >borrar</button></td>
                                    </tr>
                                ))

                            )}

                        </tbody>

                    </table>
                    <button
                    className="bg-[#1E3766] rounded-full text-white text-xl ml-3 p-1"
                    onClick={agregarReunion}>
                        Agregar
                    </button>
                </div>
                <div className="bg-white w-[30%] ml-10">
                    <h2
                    className=" bg-[#1E3766] text-white text-center"
                    > Auditores</h2>
                    {plan && trabajadores.length > 0 && (
                        <table className="w-full text-center">
                            <tbody>
                                <tr>
                                    <td className=" bg-[#1E3766] text-white text-center">lider auditoria</td>
                                    <td>
                                    {trabajadores.length > 0 && (
                                    <select
                                        value={String(plan.auditor_lider || "")}
                                        onChange={(e) => {
                                        
                                        setPlan({ ...plan, auditor_lider: e.target.value });
                                        console.log(e.target.value);
                                        }}
                                        className="w-full text-center"
                                    >
                                        {trabajadores.map((trabajador, index) => (
                                        <option key={index} value={String(trabajador.id)}>
                                            {trabajador.nombre}
                                        </option>
                                        ))}
                                    </select>
                                    )}
                            </td>
                                </tr>
                                <tr>
                                    <td className=" bg-[#1E3766] text-white text-center">auditor auxiliar</td>
                                    <td>
                                    <select
                                    id={plan.auditor || ""}
                                    value={plan.auditor || ""}
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                        setPlan({ ...plan, auditor: e.target.value });
                                    }}
                                    className="w-full text-center"
                                    >
                                    {trabajadores.map((trabajador, index) => (
                                        <option key={index} value={trabajador.id}>
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

            <div className="mt-10 flex flex-col bg-white w-[90%]">
                <h2 className="w-full bg-[#1E3766] text-white text-center"> itinerario</h2>
                <div className="">
            
                <table
                        className="w-full"
                        >
                        <thead className=" bg-[#1E3766] text-white text-center">
                        <tr>
                            <th>Actividades</th>
                            <th> Auditado</th>
                            <th>Auditor</th>
                            <th>Fecha inicio</th>
                            <th> Fecha fin </th>
                            <th>Lugar</th>
                            <th> Acciones</th>
                        </tr>

                        </thead>
                        { itinerarios && (
                        <tbody>
                            {itinerarios.map((itinerario,index)=>(
                                <tr key={index}>
                                <td>
                                <input
                            type="text"
                            id={"actividad"+itinerario.id}
                            placeholder="actividad"
                            value={itinerario.actividad}
                            className="w-full text-center"
                            onChange={(e) => {
                                const newItinerarios = [...itinerarios];
                                newItinerarios[index].actividad = e.target.value;
                                setItinerarios(newItinerarios);
                            }}
                            /></td>
                                <td>
                                <input
                            type="text"
                            id={"auditado"+itinerario.id}
                            placeholder="auditado"
                            value={itinerario.auditado}
                            className="w-full text-center"
                            onChange={(e) => {
                                const newItinerarios = [...itinerarios];
                                newItinerarios[index].auditado = e.target.value;
                                setItinerarios(newItinerarios);
                            }}
                            /></td>
                                <td>
                                <input
                            type="text"
                            id={"auditor"+itinerario.id}
                            placeholder="auditor"
                            value={itinerario.auditor}
                            className="w-full text-center"
                            onChange={(e) => {
                                const newItinerarios = [...itinerarios];
                                newItinerarios[index].auditor = e.target.value;
                                setItinerarios(newItinerarios);
                            }}
                            /></td>
                                <td>
                                <input
                            type="text"
                            id={"horaInicio"+itinerario.id}
                            placeholder="hora inicio"
                            value={itinerario.inicio}
                            className="w-full text-center"
                            onChange={(e) => {
                                const newItinerarios = [...itinerarios];
                                newItinerarios[index].inicio = e.target.value;
                                setItinerarios(newItinerarios);
                            }}
                            /> </td>
                                <td>
                                <input
                            type="text"
                            id={"horaFin"+itinerario.id}
                            placeholder="hora fin"
                            value={itinerario.fin}
                            className="w-full text-center"
                            onChange={(e) => {
                                const newItinerarios = [...itinerarios];
                                newItinerarios[index].fin = e.target.value;
                                setItinerarios(newItinerarios);
                            }}
                            /> 
                            </td>
                                <td>
                                <input
                            type="text"
                            id={"lugar"+itinerario.id}
                            placeholder="lugar"
                            value={itinerario.lugar}
                            className="w-full text-center"
                            onChange={(e) => {
                                const newItinerarios = [...itinerarios];
                                newItinerarios[index].lugar = e.target.value;
                                setItinerarios(newItinerarios);
                            }}
                            /> 
                            </td>
                                <td> <button
                                className="bg-[#1E3766] rounded-full text-white text-xl ml-3 p-1"
                                onClick={() => {
                                    setItinerarios(prev => prev.filter((_, i) => i !== index));
                                    if(itinerario.id != null){borrarItinerario(itinerario.id)};
                                  }}
                                >borrar</button></td>
                                </tr>
                            ))}
                    </tbody>                        
                    )}


                    </table>
                    <button
                    className="bg-[#1E3766] rounded-full text-white text-xl ml-3 p-1"
                    onClick={agregarItinerario}
                    >
                        Agregar
                    </button>
                </div>

            </div>

            <div className="mt-10"
            
            >
                <button id="btn-guardar-edicion" 
                className="bg-[#1E3766] rounded-full text-white text-xl ml-5 p-2"
                onClick={() => {
                    guardarPlanActividad();
                    sleep(1000).then(() => window.location.reload());}}>
                Guardar
                </button>
                <button id="btn-guardar-edicion" 
                className="bg-[#1E3766] rounded-full text-white text-xl ml-5 p-2"
                onClick={() => {setVisual('b')}}>
                Auditoria
                </button>
                <button
                id="btn-cancelar-edicion"
                className="bg-[#1E3766] rounded-full text-white text-xl ml-5 p-2"
                onClick={() => {
                    window.location.reload();}}
                >
                Volver
                </button>
            </div>

        </div>
        }

        {/*     VISUAL PARA HACER LA AUDITORIA              */}

        {visual=='b' &&
        <div className=" w-full h-full flex flex-col items-center justify-center">
            <div className="mt-10 bg-white w-[90%] rounded-xl">
                <div className="flex flex-row">
                    <p className="p-2 bg-[#1E3766] text-white"> fecha</p>                <button id="btn-guardar-edicion" 
                className="bg-[#1E3766] rounded-full text-white text-xl ml-5 p-2"
                onClick={() => {setVisual('b')}}>
                Auditoria
                </button>

                    <p
                    type="datetime-local"
                    id="datetime2"
                    className="border border-gray-300 rounded px-3 py-2"
                    > {plan.fecha?.slice(0, 16) || ""}</p>

                </div>

                <div className="flex flex-row">
                    <p className="p-2 bg-[#1E3766] text-white"> alcance</p>

                    <p
                  type="text"
                  id="alcance-planauditoria"
                  placeholder="alcance"
                  className="w-full text-center"
                
                   >{plan.alcance}</p>
                </div>

                <div className="flex flex-row">
                    <p className="p-2 bg-[#1E3766] text-white"> proposito</p>

                    <table
                        className="w-full"
                        >
                        <tbody>
                        {propositos.map((proposito, index) => (
                            <tr key={index}>
                            <td>
                            <p
                            type="text"
                            className="w-full text-center"
                            >{proposito.descripcion}</p>
                   </td>
                            </tr>
                        ))
                        }

                        </tbody>

                    </table>

                </div>


            </div>

            <div 
            className="bg-white w-[90%] rounded-xl
            flex flex-row mt-10 ">
                <div className="flex flex-col w-[25%]">
                    <h3 className="bg-[#1E3766] text-white text-center">Procesos</h3>
                    <p
                  type="text"
                  id="proceso-planauditoria"
                  className="w-full text-center"

                   >{plan.proceso}</p>

                </div>
                <div className="flex flex-col w-[25%]">
                    <h3 className="bg-[#1E3766] text-white text-center">Lider</h3>
                    <p
                  type="text"
                  id="liderProceso-planauditoria" 
                  className="w-full text-center"

                   > {plan.lider_proceso}</p>
                </div>

                <div className="flex flex-col w-[25%]">
                    <h3 className="bg-[#1E3766] text-white text-center">Auditados</h3>
                    <table
                        className="w-full"
                        >
                        <tbody >
                        { auditados.map( (auditado, index) => (
                       
                            <tr key={index}>
                            <td>
                            <p
                            type="text"
                            id={auditado.id}
                            className="w-full text-center"

                            > {auditado.auditado}</p>
                            </td>
                            </tr>
                            
                        )
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col w-[25%]">
                    <h3 className="bg-[#1E3766] text-white text-center">Firma</h3>
                    <p> </p>
                </div>

            </div>

            {/*                                                  REUNIONES                  */}


            <div className=" w-[90%] mt-10 flex flex-row">
                <div className="bg-white w-[70%] mr-10">
                    <table
                        className="w-full"
                        >
                        <thead className=" bg-[#1E3766] text-white text-center">
                        <tr>
                            <th>Tipo de reunion </th>
                            <th> Fecha </th>
                            <th> Hora </th>
                            <th> Lugar </th>
       
                        </tr>

                        </thead>
                        <tbody>
                            {reuniones && (
                                reuniones.map((reunion,index)=>(
                                    <tr key={ reunion.id}>
                                    <td>
                                    <p
                                    id={"tipoReunion" + reunion.id}
                                    value={reunion.apertura ? "apertura" : "cierre"}
                                    className="w-full text-center"
                                    >
                                    {reunion.apertura ? "apertura" : "cierre"}
                                    </p>
                                    </td>
                                    <td>
                                    <p
                            type="text"
                            id={"fechaReunion"+reunion.id}
                            placeholder="reunion"
                            className="w-full text-center"
  
                            >{reunion.fecha}</p>
                            </td>
                                    <td>
                                    <p
                            type="text"
                            id={"horaReunion"+reunion.id}
                            placeholder="hora"
                            value={reunion.hora}
                            className="w-full text-center"

                            >{reunion.hora} </p>
                            </td>
                                    <td>
                                    <p
                            type="text"
                            id={"lugarReunion"+reunion.id}
                            placeholder="auditado"
                            className="w-full text-center"
                            > {reunion.lugar}</p>
                            </td>
                                    </tr>
                                ))

                            )}

                        </tbody>

                    </table>
                </div>
                <div className="bg-white w-[30%] ml-10">
                    <h2
                    className=" bg-[#1E3766] text-white text-center"
                    > Auditores</h2>
                    {plan && trabajadores.length > 0 && (
                        <table className="w-full text-center">
                            <tbody>
                                <tr>
                                    <td className=" bg-[#1E3766] text-white text-center">lider auditoria</td>
                                    <td>
                                    <p
                                    className="w-full text-center"
                                    >
                                    {trabajadores.find(trabajador => trabajador.id == plan.auditor_lider).nombre}
                                    </p>
                            </td>
                                </tr>
                                <tr>
                                    <td className=" bg-[#1E3766] text-white text-center">auditor auxiliar</td>
                                    <td>
                                    <p
                                    id={plan.auditor || ""}
                 
                                    className="w-full text-center"
                                    >
                                    {trabajadores.find(trabajador => trabajador.id == plan.auditor).nombre}
                                    </p>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}

                </div>

            </div>
            {/* tabla para ingresar los aspectos que fueron auditados*/}
            <table className="tabla-trabajadores mt-3 w-[90%] bg-white rounded-xl text-center">
                        <thead className='bg-[#1E3766] text-white'>
                          <tr>
                            <th>aspecto</th>
                            <th>accion</th>
                          </tr>
                        </thead>

                        <tbody id="tbody-aspectos">
                        
                        {aspectos.map((aspecto,index) => (
                        <tr key={index}>
                        <td>
    
                        <input
                        type="text"
                        value={aspecto.aspecto}
                        className="w-full h-5 bg-gray-200 text-center"
                        onChange={(e) => {
                            const nuevosAspectos = [...aspectos];
                            nuevosAspectos[index].aspecto = e.target.value;
                            setAspectos(nuevosAspectos);
                        }}
                        />
                        
                        </td>
                        <td>
                            <button className="bg-[#1E3766] rounded-full text-white text-xl p-1" 
                            onClick={() => {
                                    setAspectos(prev => prev.filter((_, i) => i !== index));
                                    if(aspecto.id != null){borrarAspecto(aspecto.id)};
                                  }}
                                  > Borrar </button>
                        </td>
                        </tr>
                        ) )}
                        
                        </tbody>
                      </table>
                    <button className="bg-[#1E3766] rounded-full text-white text-xl ml-5 p-2" 
                        onClick={agregarAspectoAuditado}>Agregar</button>

            {/* tabla para seleccionar de la lista de verificacion*/}
            <h3 className="text-white bg-[#1E3766] w-[90%] mt-3 text-center text-xl rounded-xl"> Lista de Verificacion</h3>
            <table className="tabla-trabajadores w-[90%] bg-white rounded-xl text-center">
                        <thead className='bg-[#1E3766] text-white'>
                          <tr>
                            <th>Descripcion</th>
                            <th>Cumple</th>
                            <th>Incumple</th>
                            <th>No aplica</th>
                          </tr>
                        </thead>
                        <tbody id="tbody-trabajadores">
                          {listas
                            .map((lista, index) => (
                              <tr key={index}>
                                <td>{lista.descripcion}</td>
                                
                                <td>
                                <label className="flex items-center space-x-2">
                                
                                <input
                                type="checkbox"
                                checked={
                                    listaAuditada.some(audit => audit.id_listaverificacion === lista.id)
                                    ? listaAuditada.find(a => lista.id === a.id_listaverificacion).cumple === true
                                    : false
                                }
                                onChange={(e) => {
                                    const isChecked = e.target.checked;

                                    // Ya existe: actualizamos
                                    if (listaAuditada.some(audit => audit.id_listaverificacion == lista.id)) {
                                    const nuevasListas = listaAuditada.map(item =>
                                        item.id_listaverificacion == lista.id
                                        ? isChecked == true? { ...item, cumple: true, aplica: true} : 
                                                             { ...item, cumple: false, aplica: true } 
                                        : item
                                    );
                                    setListaAuditada(nuevasListas); // ✅ corregido aquí
                                    } else {
                                    // No existe: agregamos
                                    agregarListaAuditada(lista.id, isChecked, false);
                                    }
                                    console.log(listaAuditada)
                                    
                                    if(isChecked == true){
                                        const nuevo = {
                                        id_auditoria: auditoria.id, 
                                        virtud: lista.cumplimiento
                                        };
                                        setFortalezas([...fortalezas, nuevo]);
                                    } 
                                }}
                                className="w-5 h-5"
                                />
                              
                                </label>
                                </td>
                                <td>
                                <label className="flex items-center space-x-2">
                                    <input
                                    type="checkbox"
                                    checked={
                                        listaAuditada.some(audit => audit.id_listaverificacion === lista.id)
                                        ? listaAuditada.find(a => lista.id === a.id_listaverificacion)?.cumple === false
                                        : true
                                    }
                                    onChange={(e) => {
                                        const isChecked = e.target.checked;

                                        // Ya existe: actualizamos
                                        if (listaAuditada.some(audit => audit.id_listaverificacion == lista.id)) {
                                        const nuevasListas = listaAuditada.map(item =>
                                            item.id_listaverificacion == lista.id
                                            ? isChecked == true? { ...item, cumple: false, aplica: true} : 
                                                                { ...item, cumple: true, aplica: true } 
                                            : item
                                        );
                                        setListaAuditada(nuevasListas); // ✅ corregido aquí
                                        } else {
                                        // No existe: agregamos
                                        agregarListaAuditada(lista.id, isChecked, false);
                                        }
                                        console.log(listaAuditada)
                                        if(isChecked == true){
                                        const nuevo = {
                                        id_auditoria: auditoria.id, 
                                        falta: lista.incumplimiento
                                        };
                                        setDebilidades([...debilidades, nuevo]);
                                        } 
                                    }}
                                    className="w-5 h-5"
                                    />
                
                                </label>
                                </td>
                                <td>
                                    <label className="flex items-center space-x-2">
                                    <input
                                    type="checkbox"
                                    checked={
                                        listaAuditada.some(audit => audit.id_listaverificacion === lista.id)
                                        ? listaAuditada.find(a => lista.id === a.id_listaverificacion)?.aplica === false
                                        : true
                                    }
                                    onChange={(e) => {
                                        const isChecked = e.target.checked;

                                        // Ya existe: actualizamos
                                        if (listaAuditada.some(audit => audit.id_listaverificacion == lista.id)) {
                                        const nuevasListas = listaAuditada.map(item =>
                                            item.id_listaverificacion == lista.id
                                            ? isChecked == true? { ...item, cumple: false, aplica: false} : 
                                                                { ...item,  aplica: true } 
                                            : item
                                        );
                                        setListaAuditada(nuevasListas); // ✅ corregido aquí
                                        } else {
                                        // No existe: agregamos
                                        agregarListaAuditada(lista.id, false, isChecked);
                                        }
                                        console.log(listaAuditada)

                                    }}
                                    className="w-5 h-5"
                                    />
     
                                </label>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>

                            {/* Tabla de Fortalezas */}
<h3 className="text-white bg-[#1E3766] w-[90%] mt-3 text-center text-xl rounded-xl"> Fortalezas </h3>
            <table className="tabla-trabajadores w-[90%] bg-white rounded-xl text-center">
                        <thead className='bg-[#1E3766] text-white'>
                          <tr>
                            <th>Descripcion</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody id="tbody-trabajadores">
                          {fortalezas
                            .map((fortaleza, index) => (
                              <tr key={index}>
                                <td>
                                    <input 
                                    type="text"
                                    className="bg-gray-200 w-[90%] m-2"
                                    value={fortaleza.virtud}
                                    onChange={(e) => {
                                        const newFortalezas = [...fortalezas];
                                        newFortalezas[index].virtud = e.target.value;
                                        setFortalezas(newFortalezas);
                                    }}
                                    />

                                </td>
                                                        <td>
                                <button className="bg-[#1E3766] rounded-full text-white text-xl p-1" 
                                onClick={() => {
                                        setFortalezas(prev => prev.filter((_, i) => i !== index));
                                        if(fortaleza.id != null){borrarFortalezas(fortaleza.id)};
                                    }}
                                    > Borrar </button>
                            </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                        <button className="bg-[#1E3766] rounded-full text-white text-xl ml-5 p-2" 
                        onClick={agregarFortalezas}>Agregar</button>



{/* Tabla de debilidades */}
<h3 className="text-white bg-[#1E3766] w-[90%] mt-3 text-center text-xl rounded-xl"> Debilidades </h3>
            <table className="tabla-trabajadores w-[90%] bg-white rounded-xl text-center">
                        <thead className='bg-[#1E3766] text-white'>
                          <tr>
                            <th>Descripcion</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody id="tbody-trabajadores">
                          {debilidades
                            .map((debilidad, index) => (
                              <tr key={index}>
                                <td>
                                    <input 
                                    type="text"
                                    className="bg-gray-200 w-[90%] m-2"
                                    value={debilidad.falta}
                                    onChange={(e) => {
                                        const newLista = [...debilidades];
                                        newLista[index].falta = e.target.value;
                                        setDebilidades(newLista);
                                    }}
                                    />

                                </td>
                                <td>
                                <button className="bg-[#1E3766] rounded-full text-white text-xl p-1" 
                                onClick={() => {
                                        setDebilidades(prev => prev.filter((_, i) => i !== index));
                                        if(debilidad.id != null){borrarDebilidades(debilidad.id)};
                                    }}
                                    > Borrar </button>
                            </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                        <button className="bg-[#1E3766] rounded-full text-white text-xl ml-5 p-2" 
                        onClick={agregarDebilidades}>Agregar</button>

{/* Tabla de oportunidades */}
<h3 className="text-white bg-[#1E3766] w-[90%] mt-3 text-center text-xl rounded-xl"> Oportunidades de Mejora </h3>
            <table className="tabla-trabajadores w-[90%] bg-white rounded-xl text-center">
                        <thead className='bg-[#1E3766] text-white'>
                          <tr>
                            <th>Descripcion</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody id="tbody-trabajadores">
                          {oportunidades
                            .map((oportunidad, index) => (
                              <tr key={index}>
                                <td>
                                    <input 
                                    type="text"
                                    className="bg-gray-200 w-[90%] m-2"
                                    value={oportunidad.oportunidad}
                                    onChange={(e) => {
                                        const newLista = [...oportunidades];
                                        newLista[index].oportunidad = e.target.value;
                                        setOportunidades(newLista);
                                    }}
                                    />

                                </td>
                                                                <td>
                                <button className="bg-[#1E3766] rounded-full text-white text-xl p-1" 
                                onClick={() => {
                                        setOportunidades(prev => prev.filter((_, i) => i !== index));
                                        if(oportunidad.id != null){borrarOportunidades(oportunidad.id)};
                                    }}
                                    > Borrar </button>
                            </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                        <button className="bg-[#1E3766] rounded-full text-white text-xl ml-5 p-2" 
                        onClick={agregarOportunidades}>Agregar</button>


{/* Tabla de Compromisos */}
<h3 className="text-white bg-[#1E3766] w-[90%] mt-3 text-center text-xl rounded-xl"> Compromisos </h3>
            <table className="tabla-trabajadores w-[90%] bg-white rounded-xl text-center">
                        <thead className='bg-[#1E3766] text-white'>
                          <tr>
                            <th>Compromiso</th>
                            <th>Responsable</th>
                            <th>Fecha Limite</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody >
                          {compromisos
                            .map((compromiso, index) => (
                              <tr key={index}>
                                <td>
                                    <input 
                                    type="text"
                                    className="bg-gray-200 w-[90%] m-2"
                                    value={compromiso.compromiso}
                                    onChange={(e) => {
                                        const newLista = [...compromisos];
                                        newLista[index].compromiso = e.target.value;
                                        setCompromisos(newLista);
                                    }}
                                    />

                                </td>
                                <td>
                                    <input 
                                    type="text"
                                    className="bg-gray-200 w-[90%] m-2"
                                    value={compromiso.responsable}
                                    onChange={(e) => {
                                        const newLista = [...compromisos];
                                        newLista[index].responsable = e.target.value;
                                        setCompromisos(newLista);
                                    }}
                                    />
                                </td>
                                <td>
                                <input
                                type="datetime-local"
                                id="datetime3"
                                value={compromiso.fecha_limite?.slice(0, 16) || ""}
                                onChange={(e) => {
                                    const newLista = [...compromisos];
                                    newLista[index].fecha_limite = e.target.value;
                                    setCompromisos(newLista);
                                }}
                                className="border border-gray-300 rounded px-3 py-2"
                                />
                                </td>
                                <td>
                                <button className="bg-[#1E3766] rounded-full text-white text-xl p-1" 
                                onClick={() => {
                                        setCompromisos(prev => prev.filter((_, i) => i !== index));
                                        if(compromiso.id != null){borrarCompromisos(compromiso.id)};
                                    }}
                                    > Borrar </button>
                            </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                        <button className="bg-[#1E3766] rounded-full text-white text-xl ml-5 p-2" 
                        onClick={agregarCompromisos}>Agregar</button>

            <div className="mt-10"
            
            >
                <button id="btn-guardar-edicion" 
                className="bg-[#1E3766] rounded-full text-white text-xl ml-5 p-2"
                onClick={() => {
                    guardarAuditoria();
                    sleep(1000).then(() => window.location.reload());}}>
                Guardar
                </button>
                <button
                id="btn-cancelar-edicion"
                className="bg-[#1E3766] rounded-full text-white text-xl ml-5 p-2"
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