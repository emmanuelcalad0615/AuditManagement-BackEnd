
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptionsGet = {
    method: "GET",
    redirect: "follow"
};


const plan = {
    id: Int16Array,
    tipo: String,
    nombre: String,
    alcance: String,
    proveso: String,
    lider_proceso: String,
    auditor: Int16Array,
    auditor_lider: Int16Array,
    
}

export const traerTodoTrabajador = async function(){
    const respuesta = await fetch("http://localhost:5000/trabajador/getAll", requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}


export const traerPropositos = async function(id){
    const respuesta = await fetch("http://localhost:5000/proposito/getByPlan/"+id, requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}


export const traerID = async function(id){
    const respuesta = await fetch("http://localhost:5000/plan/getid/"+id, requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

export const borrarID = async function(id){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };

    
    const respuesta = await fetch("http://localhost:5000/plan/delete/"+id, requestOptions)
        .then((response) => response.json());

    return respuesta;

}

export const traerTodo = async function(){
    const respuesta = await fetch("http://localhost:5000/plan/getAll", requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

export const guardarplan = async function(){
    var nombre = document.getElementById("input-nuevo-plan").value;
    console.log(nombre)

    const raw = JSON.stringify({
        "nombre": nombre
      });

    const requestOptionsPost = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    const respuesta = await fetch("http://localhost:5000/plan/save", requestOptionsPost)
        .then((response) => response.json());
    return respuesta
  }

export const actualizarplan = async function(id){
    var nombre = document.getElementById("input-editar-plan").value;
    const raw = JSON.stringify({
        "id": id,
        "nombre": nombre
      });
      
      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      
    const respuesta = await  fetch("http://localhost:5000/plan/update", requestOptions)
        .then((response) => response.json());

    return respuesta;
    }