import pagInicio from "./paginas/inicio.js";
import pagRoom from "./paginas/room.js";
import pagPartida from "./paginas/partida.js";
import pagResultado from "./paginas/resultados.js";

export default function initRouter(): void {
    let url: string = correccionPathname(location.pathname);
    goTo(url)
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
    for (let aux of rutas) if (aux.ruta == url) aux.metodo(goTo)
};

interface Ruta {
    ruta: string,
    metodo: ( goTo: (url: string) => void ) => void
};

let rutas: Ruta[] = [
    { ruta: '/inicio', metodo: pagInicio },
    { ruta: '/room', metodo: () => pagRoom },
    { ruta: '/partida', metodo: () => pagPartida },
    { ruta: '/resultados', metodo: () => pagResultado },
];