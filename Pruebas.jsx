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
                <button
                    className="bg-green-600 hover:bg-green-700 rounded-full text-white px-4 py-2 m-2 transition-colors duration-200"
                    onClick={agregarItinerario}
                >
                    Agregar Actividad
                </button>
            </div>