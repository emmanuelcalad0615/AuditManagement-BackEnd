import './Proceso.css'
import { useState, useEffect } from 'react';
import {guardarSector, actualizarSector, traerID, traerTodo, borrarID} from './metodos.js'
function Proceso() {
  const [vista, setVista] = useState('principal');
  const [sector, setSector] = useState(1);
  const [sectores, setSectores] = useState([]);
  const [objeto, setObjecto] = useState({})

  useEffect(() => {

      traerTodo().then(data => {
        setSectores([...data]);
      });
    
  }, [vista]);

  return (
    <>
      {/* Vista Procesos */}
      {vista === 'principal' && (
        <section id="procesos" className="seccion" style={{ padding: '20px' }}>

          <div className="flex text-center
        justify-center flex-col bg-white rounded-2xl m-5">
            <h2 className="titulo-tabla text-[#1E3766]
          text-xl">Procesos</h2>
            <table className="tabla-procesos">
              <thead className='bg-[#1E3766] text-white'>
                <tr>
                  <th className="encabezado-tabla">Nombre</th>
                  <th className="encabezado-tabla">Acciones</th>
                </tr>
              </thead>
              <tbody id="tabla-principal-body">
                {sectores.length > 0 ? (
                sectores.map((sector,index) => (
                  <tr key={sector.id}>
                    <td>{sector.nombre}</td>
                    <td>
                      <button 
                      className="bg-[#1E3766] m-2 p-1 rounded-full text-white text-xl"
                      onClick={() => { traerID(sector.id).then((e) => setObjecto(e));setVista('editar'); setSector(sector.id) }}>
                        Editar</button>

                      <button 
                      className="bg-[#1E3766] m-2 p-1 rounded-full text-white text-xl"
                      onClick={() => {setVista('editar'); borrarID(sector.id); setVista('principal') }}>
                        Borrar</button>
                    </td>
                  </tr>
                ))
              ):(
                <tr>
                  <td colSpan="2">Cargando sectores...</td>
                </tr>
              )}
              </tbody>
            </table>
          </div>

          <div className="contenedor-agregar">
            <button
              id="btn-agregar"
              className="bg-[#1E3766] rounded-full text-white text-xl ml-5 p-2"
              onClick={() => setVista('agregar')}
            >
              Agregar
            </button>
          </div>
        </section>
      )}

      {/* Vista Agregar Sector */}
      {vista === 'agregar' && (
        <section id="vista-agregar-sector" className="seccion" style={{ padding: '20px' }} >
          <h2 className='bg-[#1E3766] text-white w-full
      text-xl text-center rounded-xl m-5'>Agregar nuevo sector</h2>

      
          <div className="bg-white rounded-xl m-5 flex 
            flex-col justify-center text-center" 
          >
            <label className='w-full flex flex-row items-center text-center justify-center'>Nombre Sector
            <input
              type="text"
              id="input-nuevo-sector"
              placeholder="Nombre del nuevo sector"
              className='w-[50%] mt-5 ml-3 bg-gray-100 rounded-xl text-xl'
            />
            </label>
            <img
              src="/logo-comite.jpg"
              alt="Logo El Comité"
              className='w-[20%] h-[30%]'              />
          </div>
     

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              marginLeft: '10px',
            }}
          >
            <button id="btn-guardar" 
            className="bg-[#1E3766] m-2 p-1 rounded-full text-white text-xl"
             onClick={() => {guardarSector();  setVista('principal')}}>
              Guardar
            </button>
            <button
              id="btn-cancelar"
              className="bg-[#1E3766] m-2 p-1 rounded-full text-white text-xl"
              onClick={() => setVista('principal')}
            >
              Cancelar
            </button>
          </div>
        </section>
      )}

      {/* Vista Editar Sector */}
      {vista === 'editar' && (
        <section id="vista-editar-sector" 
        className="flex flex-col text-center justify-center items-center w-full"
         style={{ padding: '20px' }} >
          <h2 className='bg-[#1E3766] w-full rounded-xl text-white text-xl'
          >Editar sector</h2>

          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <input
                type="text"
                id="input-editar-sector"
                placeholder={objeto.nombre}
                style={{ padding: '10px', width: '300px' }}
              />
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
            }}
          >
            <button id="btn-guardar-edicion" 
            className="bg-[#1E3766] rounded-full text-white text-xl ml-5 p-2"
            onClick={() => {actualizarSector(sector); setVista('principal')}}>
              Guardar
            </button>
            <button
              id="btn-cancelar-edicion"
              className="bg-[#1E3766] rounded-full text-white text-xl ml-5 p-2"
              onClick={() => setVista('principal')}
            >
              Cancelar
            </button>
          </div>
        </section>
      )}
    </>
  )
}

export default Proceso
