import type { Data } from './tipos/state-tipos';

function obtenerUrlDeEntorno(): string {
    if (import.meta.env.MODE == 'development') return 'http://localhost:8000/'
    else return import.meta.env.VITE_URL_API 
;}

function cuenta (estado: Data): Promise<string> {
    let apiUrl: string = obtenerUrlDeEntorno();
    let endpoint: string = apiUrl + 'cuenta';
    let body = { nombre: estado.nombre };
    let config = { 
        method: 'POST', 
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json; charset=UTF-8" }  };
    return new Promise( (resolve) => {
        fetch(endpoint, config)
        .then( (response) => { return response.json() } )
        .then( (data) => { resolve(data.idUser) } )
    })
};

function crearRoom (estado: Data): Promise<any> {
    let apiUrl: string = obtenerUrlDeEntorno();
    let endpoint: string = apiUrl + 'crearRoom';
    let body = { idUser: estado.idUser };
    let config = { 
        method: 'POST', 
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json; charset=UTF-8" }  };
    return new Promise( (resolve) => {
        fetch(endpoint, config)
        .then( (response) => { return response.json() } )
        .then( (dataRoom) => { 
            if (dataRoom.newRoom == true) {
                let respuesta = { longId: dataRoom.longId, shortId: dataRoom.shortId };
                resolve(respuesta) 
            }
        })
    })  
};

function guardarRoom(estado: Data): Promise<any> {
    let apiUrl: string = obtenerUrlDeEntorno();
    let endpoint: string = apiUrl + 'guardarRoom';
    let body = { 
        shortId: estado.shortId,
        longId: estado.longId };
    let config = { 
        method: 'POST', 
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json; charset=UTF-8" }  };
    return new Promise ( (resolve) => {
        fetch(endpoint, config)
        .then( (response) => { return response.json() } )
        .then( (data) => { resolve(data) } )
    })   
};

function buscarRoom(estado: Data): Promise <any> {
    let apiUrl: string = obtenerUrlDeEntorno();
    let endpoint: string = apiUrl + 'buscarRoom'; 
    let body = { shortId: estado.shortId };
    let config = { 
        method: 'POST', 
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json; charset=UTF-8" }  };
    return new Promise ( (resolve) => {
        fetch(endpoint, config)
        .then( (response) => { return response.json() } )
        .then( (data) => { 
            if (data.busqueda == true) { 
                resolve(data.longId.room) }
        })
    })
};

export default { cuenta, crearRoom, guardarRoom, buscarRoom }



