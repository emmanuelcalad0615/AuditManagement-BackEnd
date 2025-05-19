import { useState, useEffect } from "react";
import { guardarplan, guardarReuniones, guardarAuditadosPlan,
    guardarItinerarios, borrarReunion, borrarItinerario, borrarAuditado, borrarProposito,
    guardarPropositos
 } from "./metodos";

const PlanCreate = () => {
    

    const [propositos, setPropositos] = useState([])
    const [plan, setPlan] = useState({})
    const [auditados, setAuditados] = useState([])
    const [reuniones, setReuniones] = useState([])
    const [itinerarios, setItinerarios] = useState([])
    const [trabajadores, setTrabajadores] = useState([])
    const [liderAuditor, setLiderAuditor] = useState({})
    const [auditorAuxiliar, setAuditorAuxiliar] = useState({})

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
        setAuditados([...reuniones, nuevo]);
    };


    return (
        <>
       
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
                
                        <table className="w-full text-center">
                            <tbody>
                                <tr>
                                    <td className=" bg-[#1E3766] text-white text-center">lider auditoria</td>
                                    <td>
                                    <select
                                    id={"liderAuditoria"}
                                    value={trabajadores[0].nombre}
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
                                <tr>
                                    <td className=" bg-[#1E3766] text-white text-center">auditor auxiliar</td>
                                    <td>
                                    <select
                                    id={plan.auditor || ""}
                                    value={trabajadores[0].nombre}
                                    onChange={(e) => {
                                        setAuditorAuxiliar(e.target.value);
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
                    actualizarIdPlan();
                    sleep(1000).then(() => window.location.reload());
                 }}>
                Guardar
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
        

        </>
    )
}

export default PlanCreate;