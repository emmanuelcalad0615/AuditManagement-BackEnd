
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptionsGet = {
    method: "GET",
    redirect: "follow"
};


const sector = {
    id: Int16Array,
    nombre: String
}



export const traerID = async function(id){
    const respuesta = await fetch("http://127.0.0.1:5000/sector/getid/"+id, requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

export const borrarID = async function(id){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };

    
    const respuesta = await fetch("http://127.0.0.1:5000/sector/delete/"+id, requestOptions)
        .then((response) => response.json());

    return respuesta;

}

export const traerTodo = async function(){
    const respuesta = await fetch("http://127.0.0.1:5000/sector/getAll", requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

export const guardarSector = async function(nombre){
  const raw = JSON.stringify({ nombre });

  const requestOptionsPost = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const respuesta = await fetch("http://127.0.0.1:5000/sector/save", requestOptionsPost)
    .then(response => response.json());
  return respuesta;
}

export const actualizarSector = async function(id, nombre){
  const raw = JSON.stringify({ id, nombre });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const respuesta = await fetch("http://127.0.0.1:5000/sector/update", requestOptions)
    .then(response => response.json());
  return respuesta;
}
