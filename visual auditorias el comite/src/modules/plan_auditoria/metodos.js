
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

/* Reuniones */

export const traerReunionPlan = async function(id){
    const respuesta = await fetch("http://localhost:5000/reunion/getByPlan/"+id, requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

export const guardarReuniones = async function(lista){
    for(const reunion of lista){
        if(reunion.id){             
              const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(reunion),
                redirect: "follow"
              };

            await fetch("http://localhost:5000/reunion/update", requestOptions)
        }else{
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(reunion),
                redirect: "follow"
              };

            await fetch("http://localhost:5000/reunion/save", requestOptions)
        }
    }
}

export const borrarReunion = async function(id){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };
    const respuesta = await fetch("http://localhost:5000/reunion/delete/"+id, requestOptions)
        .then((response) => response.json());

    return respuesta;
}

/* Itinerarios */

export const traerItinerarioPlan = async function(id){
    const respuesta = await fetch("http://localhost:5000/itinerario/getByPlan/"+id, requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

export const guardarItinerarios = async function(lista){
    for(const itinerario of lista){
        console.log(itinerario)
        if(itinerario.id != null){             
              const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(itinerario),
                redirect: "follow"
              };

            await fetch("http://localhost:5000/itinerario/update", requestOptions)
        }else{
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(itinerario),
                redirect: "follow"
              };

            await fetch("http://localhost:5000/itinerario/save", requestOptions)
        }
    }
}

export const borrarItinerario = async function(id){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };
    const respuesta = await fetch("http://localhost:5000/itinerario/delete/"+id, requestOptions)
        .then((response) => response.json());

    return respuesta;
}

/* Auditados en el plan */

export const traerAuditadosPlan = async function(id){
    const respuesta = await fetch("http://localhost:5000/auditado_plan/getidplan/"+id, requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

export const guardarAuditadosPlan = async function(lista){
    for(const auditados of lista){
       
        if(auditados.id != null){             
              const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(auditados),
                redirect: "follow"
              };

            await fetch("http://localhost:5000/auditado_plan/update", requestOptions)
        }else{
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(auditados),
                redirect: "follow"
              };

            await fetch("http://localhost:5000/auditado_plan/save", requestOptions)
        }
    }
}

export const borrarAuditado = async function(id){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };
    const respuesta = await fetch("http://localhost:5000/auditado_plan/delete/"+id, requestOptions)
        .then((response) => response.json());

    return respuesta;
}

/* Propositos */

export const traerPropositos = async function(id){
    const respuesta = await fetch("http://localhost:5000/proposito/getByPlan/"+id, requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}


export const guardarPropositos = async function(lista){
    for(const proposito of lista){
       
        if(proposito.id != null){             
              const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(proposito),
                redirect: "follow"
              };

            await fetch("http://localhost:5000/proposito/update", requestOptions)
        }else{
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(proposito),
                redirect: "follow"
              };

            await fetch("http://localhost:5000/proposito/save", requestOptions)
        }
    }
}

export const borrarProposito = async function(id){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };

    
    const respuesta = await fetch("http://localhost:5000/proposito/delete/"+id, requestOptions)
        .then((response) => response.json());

    return respuesta;

}
/* plan info */

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