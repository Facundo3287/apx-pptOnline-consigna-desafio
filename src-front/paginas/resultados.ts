export default function pageResultados (): void {
    let app: HTMLElement = document.getElementById('app')!;
    app.innerHTML = ``;
    app.innerHTML = `<mi-resultado></mi-resultado>`;
}