import React, { useState, useEffect } from 'react';
import './Trabajador.css'
import {guardartrabajador,traerSectores, actualizartrabajador, traerID, traerTodo, borrarID} from './metodos.js'
const Trabajador = () => {

  const [busqueda, setBusqueda] = useState('');
  const [trabajadores, setTrabajadores] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [vista, setVista] = useState('principal');
  const [trabajador, setTrabajador] = useState(1);
  const [objeto, setObjeto] = useState({})

  const handleReset = () => {
    setFormData({
      nombre: '',
      celular: '',
      correo: '',
      sector: 'Seleccionar',
    });
  };

  useEffect(() => {

      traerTodo().then(data => {
        setTrabajadores([...data]);
        
      });
      traerSectores().then(data =>
      {setSectores([...data]);}
      );
    
  }, [vista]);


  return (
    <>
    {vista == 'principal'  && (
      <section id="trabajadores" className="seccion activa">
        <div id="contenedor-tabla-trabajadores" 
        className="flex text-center
        justify-center flex-col bg-white rounded-2xl m-5">
        <h2 className="titulo-tabla text-[#1E3766]
          text-xl">Trabajadores</h2>

          <table className="tabla-trabajadores">
            <thead className='bg-[#1E3766] text-white'>
              <tr>
                <th>Nombre</th>
                <th>Celular</th>
                <th>Correo</th>
                <th>Sector</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="tbody-trabajadores">
              {trabajadores
                .map((trabajador, index) => (
                  <tr key={index}>
                    <td>{trabajador.nombre}</td>
                    <td>{trabajador.celular}</td>
                    <td>{trabajador.correo}</td>
                    <td>{trabajador.id_sector}</td>
                    <td>
                      <button 
                      className="bg-[#1E3766] m-2 p-1 rounded-full text-white text-xl" 
                      onClick={() => {setTrabajador(trabajador.id); 
                      traerID(trabajador.id).then((e)=>{setObjeto(e)});
                      console.log(objeto);
                      setVista('editar')}}>
                        Editar</button>
                      <button 
                      className="bg-[#1E3766] m-2 p-1 rounded-full text-white text-xl" 
                      onClick={() => { setVista('formulario'); borrarID(trabajador.id); setVista('principal')}}>
                        Borrar</button>

                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="botones">
        <button
        id="btn-agregar"
        className="bg-[#1E3766] rounded-full text-white text-xl ml-5 p-2"
        onClick={() => setVista('formulario')}
      >
        Agregar
      </button>
        </div>
        </section>

            )}

      { vista === 'formulario' && (     
        <>
              <h2 className='bg-[#1E3766] text-white w-full
      text-xl text-center rounded-xl m-5'>Agregar</h2>
      <form 
      className="bg-white rounded-xl m-5 flex 
      flex-col justify-center text-center" 
      onSubmit={(e) => {guardartrabajador(e); setVista('principal')}}
       onReset={handleReset}>
        <label className='m-2 text-xl'>Nombre
          <textarea
            type="text"
            name="nombre"
className='text-xl ml-3 bg-gray-100 rounded'
          />
        </label>
        <label className='m-2 text-xl'>Celular
          <textarea
            type="text"
            name="celular"
className='text-xl ml-3 bg-gray-100 rounded'
          />
        </label>
        <label className='m-2 text-xl'>Correo
          <textarea
            type="email"
            name="correo"
className='text-xl ml-3 bg-gray-100 rounded'
          />
        </label>
        <label className='m-2 text-xl'>Sector
          <select
            name="sector"
className='text-xl ml-3 bg-gray-100 rounded'
          >
            <option>Seleccionar</option>
            {sectores
                .map((sector, index) => (
                  <option key={index} value={sector.id}>{sector.nombre}</option>
                ))}
          </select>
        </label>
        <div className="botones">
          <button type="submit" 
          className="bg-[#1E3766] m-2 p-1 rounded-full text-white text-xl"
           >Guardar</button>
          <button type="reset" 
          className="bg-[#1E3766] m-2 p-1 rounded-full text-white text-xl"
           onClick={() => setVista('principal')}>Cancelar</button>
        </div>
      </form>
      </>
      )}

        {vista === 'editar' && (
          <section id="vista-editar-trabajador" 
          className="flex flex-col text-center justify-center items-center w-full"
           style={{ padding: '20px' }} >
            <h2
            className='bg-[#1E3766] w-full rounded-xl text-white text-xl'
            >Editar sector</h2>
  
            <div 
            className='m-3 flex flex-col text-center justify-center items-center w-full bg-white
            rounded-xl'
            >
              <div
                className='flex flex-col text-center justify-center items-center'
              >
                <input
                  type="text"
                  id="editar-nombre-trabajador"
                  placeholder={objeto.nombre}
                  style={{ padding: '10px', width: '300px' }}
                />
                                <input
                  type="text"
                  id="editar-celular-trabajador"
                  placeholder={objeto.celular}
                  style={{ padding: '10px', width: '300px' }}
                />
                                <input
                  type="text"
                  id="editar-correo-trabajador"
                  placeholder={objeto.correo}
                  style={{ padding: '10px', width: '300px' }}
                />

                <label>Sector
                <select
                id="input-editar-sector"  
                  name="sector"
                >
                  <option>Seleccionar</option>
                  {sectores
                      .map((sector, index) => (
                        <option key={index} value={sector.id}>{sector.nombre}</option>
                      ))}
                </select>
              </label>

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
               onClick={() => {actualizartrabajador(trabajador); setVista('principal')}}>
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
  );
};

export default Trabajador;
