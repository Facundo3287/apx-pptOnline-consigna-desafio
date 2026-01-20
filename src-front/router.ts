import pagInicio from "./paginas/inicio.js";
import pagRoom from "./paginas/room.js";
import state from './state.js';
import type { Ruta } from './tipos/router-tipos';

export default function initRouter(): void {
    let url: string = correccionPathname(location.pathname);
    goTo(url);
    routerSub()
};

function correccionPathname(url: string): string {
    if (url == '/') return '/inicio'
    else return url
};

function goTo(url: string): void {
    history.pushState({}, "", url);
    hanlderRouter(url)
};

function hanlderRouter(url: string): void {
    for (let aux of rutas) if (aux.ruta == url) aux.metodo()
};

function routerSub(): void {
    state.suscribirse( () => {
        let estado = state.getState();
        if (estado.contexto == 'roomCreada') goTo('/room') 
        else if (estado.contexto == 'roomEncontrada') goTo('/room')
        else if (estado.contexto == 'unificando') goTo('/partida')
        else if (estado.contexto == 'ganadorDefinido') { goTo('/resultados') }
    })
};

let rutas: Ruta[] = [
    { ruta: '/inicio', metodo: pagInicio },
    { ruta: '/room', metodo: pagRoom }
];