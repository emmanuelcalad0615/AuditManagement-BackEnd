const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptionsGet = {
    method: "GET",
    redirect: "follow"
};

/* Trabajadores */

export const traerTodoTrabajador = async function () {
    const respuesta = await fetch("http://localhost:5000/trabajador/getAll", requestOptionsGet);
    return await respuesta.json();
};

/* Reuniones */

export const traerReunionPlan = async function (id) {
    const respuesta = await fetch(`http://localhost:5000/reunion/getByPlan/${id}`, requestOptionsGet);
    return await respuesta.json();
};

export const guardarReuniones = async function (lista) {
    for (const reunion of lista) {
        const metodo = reunion.id ? "PUT" : "POST";
        const url = reunion.id
            ? "http://localhost:5000/reunion/update"
            : "http://localhost:5000/reunion/save";

        const requestOptions = {
            method: metodo,
            headers: myHeaders,
            body: JSON.stringify(reunion),
            redirect: "follow"
        };

        await fetch(url, requestOptions);
    }
};

export const borrarReunion = async function (id) {
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };
    const respuesta = await fetch(`http://localhost:5000/reunion/delete/${id}`, requestOptions);
    return await respuesta.json();
};

/* Itinerarios */

export const traerItinerarioPlan = async function (id) {
    const respuesta = await fetch(`http://localhost:5000/itinerario/getByPlan/${id}`, requestOptionsGet);
    return await respuesta.json();
};

export const guardarItinerarios = async function (lista) {
    for (const itinerario of lista) {
        const metodo = itinerario.id !== null ? "PUT" : "POST";
        const url = itinerario.id !== null
            ? "http://localhost:5000/itinerario/update"
            : "http://localhost:5000/itinerario/save";

        const requestOptions = {
            method: metodo,
            headers: myHeaders,
            body: JSON.stringify(itinerario),
            redirect: "follow"
        };

        await fetch(url, requestOptions);
    }
};

export const borrarItinerario = async function (id) {
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };
    const respuesta = await fetch(`http://localhost:5000/itinerario/delete/${id}`, requestOptions);
    return await respuesta.json();
};

/* Auditados en el plan */

export const traerAuditadosPlan = async function (id) {
    const respuesta = await fetch(`http://localhost:5000/auditado_plan/getidplan/${id}`, requestOptionsGet);
    return await respuesta.json();
};

export const guardarAuditadosPlan = async function (lista) {
    for (const auditado of lista) {
        const metodo = auditado.id !== null ? "PUT" : "POST";
        const url = auditado.id !== null
            ? "http://localhost:5000/auditado_plan/update"
            : "http://localhost:5000/auditado_plan/save";

        const requestOptions = {
            method: metodo,
            headers: myHeaders,
            body: JSON.stringify(auditado),
            redirect: "follow"
        };

        await fetch(url, requestOptions);
    }
};

export const borrarAuditado = async function (id) {
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };
    const respuesta = await fetch(`http://localhost:5000/auditado_plan/delete/${id}`, requestOptions);
    return await respuesta.json();
};

/* Propósitos */

export const traerPropositos = async function (id) {
    const respuesta = await fetch(`http://localhost:5000/proposito/getByPlan/${id}`, requestOptionsGet);
    return await respuesta.json();
};

export const guardarPropositos = async function (lista) {
    for (const proposito of lista) {
        const metodo = proposito.id !== null ? "PUT" : "POST";
        const url = proposito.id !== null
            ? "http://localhost:5000/proposito/update"
            : "http://localhost:5000/proposito/save";

        const requestOptions = {
            method: metodo,
            headers: myHeaders,
            body: JSON.stringify(proposito),
            redirect: "follow"
        };

        await fetch(url, requestOptions);
    }
};

export const borrarProposito = async function (id) {
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };
    const respuesta = await fetch(`http://localhost:5000/proposito/delete/${id}`, requestOptions);
    return await respuesta.json();
};

/* Planes */

export const traerID = async function (id) {
    const respuesta = await fetch(`http://localhost:5000/plan/getid/${id}`, requestOptionsGet);
    return await respuesta.json();
};

export const borrarID = async function (id) {
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };
    const respuesta = await fetch(`http://localhost:5000/plan/delete/${id}`, requestOptions);
    return await respuesta.json();
};

export const traerTodo = async function () {
    const respuesta = await fetch("http://localhost:5000/plan/getAll", requestOptionsGet);
    return await respuesta.json();
};

export const crearPlan = async function (datos) {
    const raw = JSON.stringify(datos);

    const requestOptionsPost = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    const respuesta = await fetch("http://localhost:5000/plan/save", requestOptionsPost);
    return await respuesta.json();
};



export const actualizarplan = async function (datos) {
    const raw = JSON.stringify(datos);

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    const respuesta = await fetch("http://localhost:5000/plan/update", requestOptions);
    return await respuesta.json();
};

