import type { Data } from './tipos/state-tipos';

function obtenerUrlDeEntorno(): string {
    if (import.meta.env.MODE == 'development') return 'http://localhost:8000/'
    else return import.meta.env.VITE_URL_API 
;}

export function apiCuenta (estado: Data): Promise<string> {
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
        .then( (data) => { resolve(data) } )
    })
};



