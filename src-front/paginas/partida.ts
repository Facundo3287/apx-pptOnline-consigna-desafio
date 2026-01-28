export default function pagPartida (): void {
    let app: HTMLElement = document.getElementById('app')!;
    let contenedor: HTMLElement = document.createElement('div');
    contenedor.setAttribute('class', 'cont-partida');
    app.innerHTML = '';
    contenedor.innerHTML = `<mi-partida></mi-partida>`;
    app.appendChild(contenedor);
}