
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptionsGet = {
    method: "GET",
    redirect: "follow"
};


const trabajador = {
    id: Int16Array,
    id_sector: Int16Array,
    nombre: String,
    celular: String,
    correo: String
}



export const traerID = async function(id){
    const respuesta = await fetch("http://127.0.0.1:5000/trabajador/getId/"+id, requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

export const borrarID = async function(id){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };

    
    const respuesta = await fetch("http://127.0.0.1:5000/trabajador/delete/"+id, requestOptions)
        .then((response) => response.json());

    return respuesta;

}

export const traerTodo = async function(){
    const respuesta = await fetch("http://127.0.0.1:5000/trabajador/getAll", requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

export const traerSectores = async function(){
    const respuesta = await fetch("http://127.0.0.1:5000/sector/getAll", requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

export const guardartrabajador = async function(e){
    //var form = e.target; // el formulario enviado
    //var formData = new FormData(form); // obtiene los datos
  
    // Si solo necesitas un campo:
    //var nombre = formData.get('nombre');
    //var celular = formData.get('celular');
    //var correo = formData.get('correo');
    //var sector = formData.get('sector');
    console.log(e);
/*
    const raw = JSON.stringify({
        "nombre": nombre,
        "celular": celular,
        "correo": correo,
        "id_sector": sector
      });
*/
    const requestOptionsPost = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(e),
    redirect: "follow"
    };



    const respuesta = await fetch("http://127.0.0.1:5000/trabajador/save", requestOptionsPost)
        .then((response) => response.json());
    
    return respuesta
  }

export const actualizartrabajador = async function(id, data) {
    const raw = JSON.stringify({
        "id": id,
        "nombre": data.nombre,
        "celular": data.celular,
        "correo": data.correo,
        "id_sector": data.id_sector
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    const respuesta = await fetch("http://127.0.0.1:5000/trabajador/update", requestOptions)
        .then((response) => response.json());

    return respuesta;
};
