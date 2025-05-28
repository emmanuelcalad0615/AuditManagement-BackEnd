
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
    const respuesta = await fetch("http://127.0.0.1:5000/trabajador/getAll", requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

/* Reuniones */

export const traerReunionPlan = async function(id){
    const respuesta = await fetch("http://127.0.0.1:5000/reunion/getByPlan/"+id, requestOptionsGet)
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

            await fetch("http://127.0.0.1:5000/reunion/update", requestOptions)
        }else{
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(reunion),
                redirect: "follow"
              };

            await fetch("http://127.0.0.1:5000/reunion/save", requestOptions)
        }
    }
}

export const borrarReunion = async function(id){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };
    const respuesta = await fetch("http://127.0.0.1:5000/reunion/delete/"+id, requestOptions)
        .then((response) => response.json());

    return respuesta;
}

/* Itinerarios */

export const traerItinerarioPlan = async function(id){
    const respuesta = await fetch("http://127.0.0.1:5000/itinerario/getByPlan/"+id, requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

export const guardarItinerarios = async function(lista){
    for(const itinerario of lista){
  
        if(itinerario.id != null){             
              const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(itinerario),
                redirect: "follow"
              };

            await fetch("http://127.0.0.1:5000/itinerario/update", requestOptions)
        }else{
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(itinerario),
                redirect: "follow"
              };

            await fetch("http://127.0.0.1:5000/itinerario/save", requestOptions)
        }
    }
}

export const borrarItinerario = async function(id){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };
    const respuesta = await fetch("http://127.0.0.1:5000/itinerario/delete/"+id, requestOptions)
        .then((response) => response.json());

    return respuesta;
}

/* Auditados en el plan */

export const traerAuditadosPlan = async function(id){
    const respuesta = await fetch("http://127.0.0.1:5000/auditado_plan/getidplan/"+id, requestOptionsGet)
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

            await fetch("http://127.0.0.1:5000/auditado_plan/update", requestOptions)
        }else{
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(auditados),
                redirect: "follow"
              };

            await fetch("http://127.0.0.1:5000/auditado_plan/save", requestOptions)
        }
    }
}

export const borrarAuditado = async function(id){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };
    const respuesta = await fetch("http://127.0.0.1:5000/auditado_plan/delete/"+id, requestOptions)
        .then((response) => response.json());

    return respuesta;
}
/*auditoria */

export const traerAuditoria = async function(id) {
    const auditoria = {
        id_plan: id,
        fecha: "0000-00-00"
    };

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(auditoria),
        redirect: "follow"
    };

    const respuesta = await fetch("http://127.0.0.1:5000/auditoria/getByPlan/" + id, requestOptionsGet)
        .then((response) => response.json());

    console.log("Respuesta de auditoría:", respuesta);

    let existente;

    if (Array.isArray(respuesta)) {
        existente = respuesta.find((e) => e.id_plan === id);
    } else if (respuesta && typeof respuesta === "object") {
        existente = respuesta; // si ya es el objeto directamente
    }

    if (!existente) {
        existente = await fetch("http://127.0.0.1:5000/auditoria/save", requestOptions)
            .then((response) => response.json());
    }

    console.log("Auditoría existente o creada:", existente);
    return existente;
}

/* auditoria x lista de verificacion */

export const traerListaxAuditoria = async function(id){
    const respuesta = await fetch("http://127.0.0.1:5000/auditoriaxlista/getByPlan/"+id, requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

export const guardarListaxAuditoria = async function(lista){
    for(const auditoriaxlista of lista){
        console.log(auditoriaxlista)
        if(auditoriaxlista.id != null){             
              const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(auditoriaxlista),
                redirect: "follow"
              };

            await fetch("http://127.0.0.1:5000/auditoriaxlista/update", requestOptions)
        }else{
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(auditoriaxlista),
                redirect: "follow"
              };

            await fetch("http://127.0.0.1:5000/auditoriaxlista/save", requestOptions)
        }
    }
}

/*aspectos */

export const traerAspectos = async function(id){
    const respuesta = await fetch("http://127.0.0.1:5000/aspecto/getByPlan/"+id, requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

export const guardarAspectos = async function(lista){
    for(const aspecto of lista){
       
        if(aspecto.id != null){             
              const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(aspecto),
                redirect: "follow"
              };

            await fetch("http://127.0.0.1:5000/aspecto/update", requestOptions)
        }else{
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(aspecto),
                redirect: "follow"
              };

            await fetch("http://127.0.0.1:5000/aspecto/save", requestOptions)
        }
    }
}

export const borrarAspecto = async function(id){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };

    const respuesta = await fetch("http://127.0.0.1:5000/aspecto/delete/"+id, requestOptions)
        .then((response) => response.json());

    return respuesta;

}

/* Propositos */

export const traerPropositos = async function(id){
    const respuesta = await fetch("http://127.0.0.1:5000/proposito/getByPlan/"+id, requestOptionsGet)
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

            await fetch("http://127.0.0.1:5000/proposito/update", requestOptions)
        }else{
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(proposito),
                redirect: "follow"
              };

            await fetch("http://127.0.0.1:5000/proposito/save", requestOptions)
        }
    }
}

export const borrarProposito = async function(id){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };

    
    const respuesta = await fetch("http://127.0.0.1:5000/proposito/delete/"+id, requestOptions)
        .then((response) => response.json());

    return respuesta;

}
/* lista verificacion */
export const traerListasV = async function(){
    const respuesta = await fetch("http://127.0.0.1:5000/lista_verificacion/getAll", requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

/* plan info */

export const traerID = async function(id){
    const respuesta = await fetch("http://127.0.0.1:5000/plan/getid/"+id, requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

export const borrarID = async function(id){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };

    
    const respuesta = await fetch("http://127.0.0.1:5000/plan/delete/"+id, requestOptions)
        .then((response) => response.json());

    return respuesta;

}

export const traerTodo = async function(){
    const respuesta = await fetch("http://127.0.0.1:5000/plan/getAll", requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

export const guardarplan = async function(plan){
    var nombre = document.getElementById("input-editar-plan").value;
    var fecha = document.getElementById("datetime").value;
    var alcance = document.getElementById("alcance-planauditoria").value;
    var proceso = document.getElementById("proceso-planauditoria").value;
    var lider_proceso = document.getElementById("liderProceso-planauditoria").value;
    var estado = document.getElementById("input-estado").value;
    var auditor = document.getElementById("auditor").value;
    var auditor_lider = document.getElementById("liderAuditoria").value;
    
    const raw = JSON.stringify({
        "nombre": nombre,
        "tipo": "interna",
        "fecha": fecha,
        "alcance": alcance,
        "proceso": proceso,
        "lider_proceso": lider_proceso,
        "estado": estado,
        "auditor": auditor,
        "auditor_lider": auditor_lider
      });

    const requestOptionsPost = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    const respuesta = await fetch("http://127.0.0.1:5000/plan/save", requestOptionsPost)
        .then((response) => response.json());
    return respuesta
  }

export const actualizarplan = async function(plan){

    
    const raw = JSON.stringify({
        "id": plan.id,
        "nombre": plan.nombre,
        "tipo": "interna",
        "fecha": plan.fecha,
        "alcance": plan.alcance,
        "estado": plan.estado,
        "proceso": plan.proceso,
        "lider_proceso": plan.lider_proceso,
        "auditor": plan.auditor,
        "auditor_lider": plan.auditor_lider
      });
      
      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      
    const respuesta = await  fetch("http://127.0.0.1:5000/plan/update", requestOptions)
        .then((response) => response.json());

    return respuesta;
    }

export const borrarPlan = (id) => {
    
    const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
    };

    fetch("http://127.0.0.1:5000/plan/delete/"+id, requestOptions)
}
/*compromisos */

export const traerCompromisos = async function(id){
    const respuesta = await fetch("http://127.0.0.1:5000/compromiso/getByPlan/"+id, requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

export const guardarCompromisos = async function(lista){
    for(const compromiso of lista){
       
        if(compromiso.id != null){             
              const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(compromiso),
                redirect: "follow"
              };

            await fetch("http://127.0.0.1:5000/compromiso/update", requestOptions)
        }else{
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(compromiso),
                redirect: "follow"
              };

            await fetch("http://127.0.0.1:5000/compromiso/save", requestOptions)
        }
    }
}

export const borrarCompromisos = async function(id){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };

    
    const respuesta = await fetch("http://127.0.0.1:5000/compromiso/delete/"+id, requestOptions)
        .then((response) => response.json());

    return respuesta;

}


/*fortaleza */

export const traerFortalezas = async function(id){
    const respuesta = await fetch("http://127.0.0.1:5000/fortaleza/getByPlan/"+id, requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

export const guardarFortalezas = async function(lista) {
  console.log(lista);

  for (const fortaleza of lista) {
    console.log("Procesando:", fortaleza);
    
    // Validación explícita: asegúrate de que NO estás considerando 0 como "falsy"
    const tieneId = fortaleza.id !== undefined && fortaleza.id !== null;

    console.log("¿Tiene ID?", tieneId);

    const requestOptions = {
      method: tieneId ? "PUT" : "POST",
      headers: myHeaders,
      body: JSON.stringify(fortaleza),
      redirect: "follow"
    };

    const url = tieneId 
      ? "http://127.0.0.1:5000/fortaleza/update" 
      : "http://127.0.0.1:5000/fortaleza/save";

    try {
      const response = await fetch(url, requestOptions);

      // Manejo de errores
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error en respuesta:", errorText);
        throw new Error(`HTTP ${response.status} - ${errorText}`);
      }

    } catch (err) {
      console.error("Error al guardar fortaleza:", err);
    }
  }
};

export const borrarFortalezas = async function(id){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };

    
    const respuesta = await fetch("http://127.0.0.1:5000/fortaleza/delete/"+id, requestOptions)
        .then((response) => response.json());

    return respuesta;

}


/*debilidad */

export const traerDebilidades = async function(id){
    const respuesta = await fetch("http://127.0.0.1:5000/debilidad/getByPlan/"+id, requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

export const guardarDebilidades = async function(lista){
    for(const debilidad of lista){
       
        if(debilidad.id != null){             
              const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(debilidad),
                redirect: "follow"
              };

            await fetch("http://127.0.0.1:5000/debilidad/update", requestOptions)
        }else{
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(debilidad),
                redirect: "follow"
              };

            await fetch("http://127.0.0.1:5000/debilidad/save", requestOptions)
        }
    }
}

export const borrarDebilidades = async function(id){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };

    
    const respuesta = await fetch("http://127.0.0.1:5000/debilidad/delete/"+id, requestOptions)
        .then((response) => response.json());

    return respuesta;

}

/*oportunidad */

export const traerOportunidades = async function(id){
    const respuesta = await fetch("http://127.0.0.1:5000/oportunidad/getByPlan/"+id, requestOptionsGet)
        .then((response) => response.json());

    return respuesta;

}

export const guardarOportunidades = async function(lista){
    for(const oportunidad of lista){
       
        if(oportunidad.id != null){             
              const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(oportunidad),
                redirect: "follow"
              };

            await fetch("http://127.0.0.1:5000/oportunidad/update", requestOptions)
        }else{
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(oportunidad),
                redirect: "follow"
              };

            await fetch("http://127.0.0.1:5000/oportunidad/save", requestOptions)
        }
    }
}

export const borrarOportunidades = async function(id){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };

    
    const respuesta = await fetch("http://127.0.0.1:5000/oportunidad/delete/"+id, requestOptions)
        .then((response) => response.json());

    return respuesta;

}