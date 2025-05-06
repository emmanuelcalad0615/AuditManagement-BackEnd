import React, { useState, useEffect } from 'react';
import './ListaVerificacion.css'
import {traerID, traerTodo, borrarID, guardarlista_verificacion, actualizarlista_verificacion} from './metodos.js'

const ListaVerificacion = () => {

  const [listas, setListas] = useState([]);
  const [vista, setVista] = useState('principal');
  const [lista, setLista] = useState(1);
  const [objeto, setObjeto] = useState({})

  const handleReset = () => {
    setFormData({
      descripcion: '',
      cumplimiento: '',
      incumplimiento: '',

    });
  };

  

  useEffect(() => {
    // Trae todos los elementos cuando la vista sea 'principal'
    if (vista === 'principal') {
      traerTodo().then(data => {
        setListas([...data]);
      });
    }
  }, [vista]); 


  return (
    <>
    {vista == 'principal'  && (
      <section id="trabajadores" className="seccion activa ">
        <div id="contenedor-tabla-trabajadores" 
        className="flex text-center
        justify-center flex-col bg-white rounded-2xl m-5">
          <h3 className="titulo-tabla text-[#1E3766]
          text-xl">Lista de Verificacion</h3>
          <table className="tabla-trabajadores">
            <thead className='bg-[#1E3766] text-white'>
              <tr>
                <th>descripcion</th>
                <th>cumplimiento</th>
                <th>incumplimiento</th>
                <th>acciones</th>
              </tr>
            </thead>
            <tbody id="tbody-trabajadores">
              {listas
                .map((lista, index) => (
                  <tr key={index}>
                    <td>{lista.descripcion}</td>
                    <td>{lista.cumplimiento}</td>
                    <td>{lista.incumplimiento}</td>
                    <td>
                      <button className="bg-[#1E3766] m-2 p-1 rounded-full text-white text-xl" 
                      onClick={() => {setLista(lista.id); traerID(lista.id).then((e)=>{setObjeto(e)});setVista('editar')}}
                      >Editar</button>

                      <button className="bg-[#1E3766] m-2 p-1 rounded-full text-white text-xl" onClick={() => { 
                        setVista('formulario'); borrarID(lista.id); setVista('principal'); setReload(!reload)}}>Borrar</button>

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
      onSubmit={(e) => {guardarlista_verificacion(e); setVista('principal'); setReload(!reload)}} 
      onReset={handleReset}>
        <label className='m-2 text-xl'>descripcion
          <textarea
            type="text"
            name="descripcion"
            className='text-xl ml-3 bg-gray-100 rounded'
          />
        </label>
        <label className='m-2 text-xl'>cumplimiento
          <textarea
            type="text"
            name="cumplimiento"
className='text-xl ml-3 bg-gray-100 rounded'
          />
        </label>
        <label className='m-2 text-xl'>incumplimiento
          <textarea
            type="text"
            name="incumplimiento"
            className='text-xl ml-3 bg-gray-100 rounded'

          />
        </label>
        <div className="botones">
          <button type="submit" 
          className="bg-[#1E3766] m-2 p-1 rounded-full text-white text-xl"  >Guardar</button>
          <button type="reset" 
          className="bg-[#1E3766] m-2 p-1 rounded-full text-white text-xl"  onClick={() => {setVista('principal'); setReload(!reload)}}>Cancelar</button>
        </div>
      </form>
      </>
      )}

        {vista === 'editar' && (
          <section id="vista-editar-lista" 
          className="flex flex-col text-center justify-center items-center w-full" style={{ padding: '20px' }} >
            <h2 className='bg-[#1E3766] w-full rounded-xl text-white text-xl'>Editar sector</h2>
  
            <div 
            className='m-3 flex flex-col text-center justify-center items-center w-full bg-white
            rounded-xl'
            >
              <div

                className='flex flex-col text-center justify-center items-center'
              >
                <input
                  type="text"
                  id="editar-descripcion-lista"
                  placeholder={objeto.descripcion}
                  style={{ padding: '10px', width: '300px' }}
                />
                <input
                  type="text"
                  id="editar-cumplimiento-lista"
                  placeholder={objeto.cumplimiento}
                  style={{ padding: '10px', width: '300px' }}
                />
                <input
                  type="text"
                  id="editar-incunmplimiento-lista"
                  placeholder={objeto.incumplimiento}
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
          </section>
        )}
  </>
  );
};

export default ListaVerificacion;
