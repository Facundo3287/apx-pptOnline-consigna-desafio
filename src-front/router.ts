import pagInicio from "./paginas/inicio.js";

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
    for (let aux of rutas) if (aux.ruta == url) aux.metodo()
};

interface Ruta {
    ruta: string,
    metodo: () => void
    //metodo: ( goTo: (url: string) => void ) => void
};

let rutas: Ruta[] = [
    { ruta: '/inicio', metodo: pagInicio },
];