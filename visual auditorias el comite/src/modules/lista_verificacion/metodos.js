
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptionsGet = {
    method: "GET",
    redirect: "follow"
};


const lista_verificacion = {
    id: Int16Array,
    descripcion: String,
    cumplimiento: String,
    incumplimiento: String,
}



export const traerID = async function(id){
    const respuesta = await fetch("http://localhost:5000/lista_verificacion/getid/"+id, requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

export const borrarID = async function(id){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };

    
    const respuesta = await fetch("http://localhost:5000/lista_verificacion/delete/"+id, requestOptions)
        .then((response) => response.json());

    return respuesta;

}

export const traerTodo = async function(){
    const respuesta = await fetch("http://localhost:5000/lista_verificacion/getAll", requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

export const guardarlista_verificacion = async function(e){
    e.preventDefault();
    var form = e.target; // el formulario enviado
    var formData = new FormData(form); // obtiene los datos
  
    // Si solo necesitas un campo:
    var descripcion = formData.get('descripcion');
    var cumplimiento = formData.get('cumplimiento');
    var incumplimiento = formData.get('incumplimiento');

    const raw = JSON.stringify({
        "descripcion": descripcion,
        "cumplimiento": cumplimiento,
        "incumplimiento": incumplimiento
      });

    const requestOptionsPost = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    const respuesta = await fetch("http://localhost:5000/lista_verificacion/save", requestOptionsPost)
        .then((response) => response.json());
    return respuesta
  }

export const actualizarlista_verificacion = async function(id){
    var descripcion = document.getElementById("editar-descripcion-lista").value;
    var cumplimiento = document.getElementById("editar-cumplimiento-lista").value;
    var incumplimiento = document.getElementById("editar-incunmplimiento-lista").value;

    const raw = JSON.stringify({
        "id": id,
        "descripcion": descripcion,
        "cumplimiento": cumplimiento,
        "incumplimiento": incumplimiento
      });
      
      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      
    const respuesta = await  fetch("http://localhost:5000/lista_verificacion/update", requestOptions)
        .then((response) => response.json());

    return respuesta;
    }