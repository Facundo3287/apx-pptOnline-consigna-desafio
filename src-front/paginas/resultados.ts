export default function pageResultados (): void {
    let app: HTMLElement = document.getElementById('app')!;
    let contenedor: HTMLElement = document.createElement('div');
    contenedor.setAttribute('class', 'cont-resultados');
    app.innerHTML = ``;
    contenedor.innerHTML = `<mi-resultado></mi-resultado>`;
    app.appendChild(contenedor)
}