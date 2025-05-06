import { useState } from "react";
import { traerID, traerPropositos } from "./metodos";

const PlanEdit = (prop) => {
    
    const [propositos, setPropositos] = useState([])
    const [plan, setPlan] = useState({})

    useEffect(() => {
        traerPropositos(prop.id).then((e) => setPropositos(e));
        traerID(prop.id).then((e) => setPlan(e));
      }, []); 


    return (
        <>
        <div className=" w-full h-full flex flex-col items-center justify-center">
            <div className="mt-10 bg-white w-[90%] rounded-xl">
                <div className="flex flex-row">
                    <p className="p-2 bg-[#1E3766] text-white"> fecha</p>

                    <input
                  type="text"
                  id="fecha-planauditoria"
                  placeholder="algo"
                  defaultValue={plan.fecha}
                  className="w-full"
                   ></input>
                </div>
                <div className="flex flex-row">
                    <p className="p-2 bg-[#1E3766] text-white"> proposito</p>

                    <table
                        className="w-full"
                        >
                        <tbody>
                            <tr>
                            <td>algooooooooooooooooooo</td>
                            <td> <button>borrar</button></td>
                            </tr>
                        </tbody>

                    </table>
                    <button> agregar </button>
                </div>
                <div className="flex flex-row">
                    <p className="p-2 bg-[#1E3766] text-white"> alcance</p>

                    <input
                  type="text"
                  id="alcance-planauditoria"
                  placeholder="algo"
                  defaultValue={plan.alcance}
                  className="w-full"
                   />
                </div>

            </div>

            <div 
            className="bg-white w-[90%] rounded-xl
            flex flex-row mt-10 ">
                <div className="flex flex-col w-[25%]">
                    <h3 className="bg-[#1E3766] text-white text-center">Procesos</h3>
                    <input
                  type="text"
                  id="proceso-planauditoria"
                  placeholder="algo"
                  defaultValue={plan.proceso}
                  className="w-full"
                   />

                </div>
                <div className="flex flex-col w-[25%]">
                    <h3 className="bg-[#1E3766] text-white text-center">Lider</h3>
                    <input
                  type="text"
                  id="liderProceso-planauditoria"
                  placeholder="algo"
                  defaultValue={"lider"}
                  className="w-full"
                   />
                </div>
                <div className="flex flex-col w-[25%]">
                    <h3 className="bg-[#1E3766] text-white text-center">Auditados</h3>
                    <p>algo</p>
                </div>
                <div className="flex flex-col w-[25%]">
                    <h3 className="bg-[#1E3766] text-white text-center">Firma</h3>
                    <p> </p>
                </div>

            </div>

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
                            <tr>
                            <td>algo</td>
                            <td> algo</td>
                            <td>algo</td>
                            <td>algo</td>
                            </tr>
                        </tbody>

                    </table>

                </div>
                <div className="bg-white w-[30%] ml-10">
                    <h2
                    className=" bg-[#1E3766] text-white text-center"
                    > Auditores</h2>
                    <table
                        className="w-full text-center"
                        >
                        <tbody>
                            <tr>
                            <td>algo</td>
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
                        </tr>

                        </thead>
                        <tbody>
                            <tr>
                            <td>Actividades</td>
                            <td> Auditado</td>
                            <td>Auditor</td>
                            <td>Fecha inicio</td>
                            <td> Fecha fin </td>
                            <td>Lugar</td>
                            </tr>
                        </tbody>

                    </table>
                </div>

            </div>

            <div className="mt-10"
            
            >
                <button id="btn-guardar-edicion" 
                className="bg-[#1E3766] rounded-full text-white text-xl ml-5 p-2"
                onClick={() => {actualizarlista_verificacion(lista); setVista('principal'); setReload(!reload)}}>
                Guardar
                </button>
                <button
                id="btn-cancelar-edicion"
                className="bg-[#1E3766] rounded-full text-white text-xl ml-5 p-2"
                onClick={() => {setVista('principal'); setReload(!reload)}}
                >
                Cancelar
                </button>
            </div>

        </div>
        </>

    )
}

export default PlanEdit;