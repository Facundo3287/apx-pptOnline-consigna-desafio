import state from "../state.js";

export default function pagRoom (): void {
    let app: HTMLElement = document.getElementById('app')!;
    app.innerHTML = '';
    let estado = state.getState();
    
    if (estado.contexto == 'roomCreada') {
        estado.contexto = 'coordinando';
        state.setState(estado);
        app.innerHTML = `
            <mi-text class = 'textoCodigo' contenido = '${estado.shortId}'></mi-text>
            <mi-buttom class = 'buttomSiguiente' tipo = 'siguiente' class = 'buttomSiguiente' contenido = 'Siguiente'></mi-buttom>
            <mi-text hidden = '' class = 'textoJugar' contenido = 'Presiona jugar y elegi piedra, papel o tijera antes de que acaben los 3 segundos.'></mi-text>
            <mi-buttom hidden = '' class = 'buttomJugar' tipo = 'jugar' contenido = 'Jugar'></mi-buttom>
            <mi-text hidden = '' class = 'textoEspera' contenido = 'Esperando a que alguien se una a la partida...'></mi-text>` }
    else if (estado.contexto == 'roomEncontrada') {
        estado.contexto = 'coordinando';
        state.setState(estado);
        app.innerHTML = `
            <mi-text class = 'textoJugar' contenido = 'Presiona jugar y elegi piedra, papel o tijera antes de que acaben los 3 segundos.'></mi-text>
            <mi-buttom class = 'buttomJugar' tipo = 'jugar' contenido = 'Jugar'></mi-buttom>
            <mi-text hidden = '' class = 'textoEspera' contenido = 'Esperando a que alguien se una a la partida...'></mi-text>` }
    else if (estado.contexto == 'a') {
        app.innerHTML = `
            <mi-text contenido = 'Upps, esta sala esta completa y tu nombre no coincide con nadie en la sala.'></mi-text>` } 
}