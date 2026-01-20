export default function pagPartida (): void {
    let app: HTMLElement = document.getElementById('app')!;
    app.innerHTML = '';
    app.innerHTML = `<mi-partida></mi-partida>`;
}