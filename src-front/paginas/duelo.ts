export default function pagDuelo(): void {
    let app: HTMLElement = document.getElementById('app')!;
    let contenedor: HTMLElement = document.createElement('div');
    contenedor.setAttribute('class', 'cont-duelo');
    app.innerHTML = '';
    contenedor.innerHTML = `
        <mi-duelo></mi-duelo>
        <mi-buttom contenido = 'Siguiente' tipo = 'duelo'></mi-buttom>`;
    app.appendChild(contenedor);
}