import type { Data } from './tipos/state-tipos';
import state from './state.js';

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
                resolve(respuesta) }
            else if (dataRoom.newRoom == false) console.log('api.crearRoom() => error')
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
        .then( (data) => { 
            if (data.registro == true) resolve(data) 
            else if (data.registro == false) console.log('api.guardarRoom() => error')
        })
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
            if (data.busqueda == true) resolve(data.longId.room) 
            else if (data.busqueda == false) console.log('api.buscarRoom() => error')
        })
    })
};

function preparado (estado: Data): void {
    let apiUrl: string = obtenerUrlDeEntorno();
    let endpoint: string = apiUrl + 'preparado'; 
    let body = { longId: estado.longId };
    let config = { 
        method: 'PUT', 
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json; charset=UTF-8" }  };
    fetch(endpoint, config)
    .then( (response) => { return response.json() } )
    .then( (data) => { 
        if (data.respuesta == true) return data 
        else if (data.respuesta == false) { 
            let estado = state.getState();
            estado.contexto = 'roomCerrada';
            state.setState(estado);
            console.log('api.buscarRoom() => error') }
    })
};

function subirJugada (estado: Data): void {
    let apiUrl: string = obtenerUrlDeEntorno();
    let endpoint: string = apiUrl + 'subirJugada'; 
    let body: any;
    if (estado.nombre != null) body = { longId: estado.longId, jugada: estado.jugadaPropietario, rol: 'propietario' }
    else if (estado.nombre == null) body = { longId: estado.longId, jugada: estado.jugadaInvitado, rol: 'invitado' };
    let config = { 
        method: 'PUT', 
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json; charset=UTF-8" }  };
    fetch(endpoint, config)
    .then( (response) => { return response.json() } )
    .then( (data) => { 
        if (data.respuesta == true) return data 
        else if (data.respuesta == false) console.log('api.subirJugada() => error')
    }) 
};

function actualizarDatos (estado: Data): void {
    let apiUrl: string = obtenerUrlDeEntorno();
    let endpoint: string = apiUrl + 'actualizarDatos'; 
    let body: any = { 
        longId: estado.longId,
        propietarioWins: estado.propietarioWins, 
        invitadoWins: estado.invitadoWins };
    let config = { 
        method: 'PUT', 
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json; charset=UTF-8" }  };
    fetch(endpoint, config)
    .then( (response) => { return response.json() } )
    .then( (data) => { 
        if (data.respuesta == true) return data 
        else if (data.respuesta == false) console.log('api.actualizarHistorial() => error')
    }) 
}

export default { cuenta, crearRoom, guardarRoom, buscarRoom, preparado, subirJugada, actualizarDatos }



