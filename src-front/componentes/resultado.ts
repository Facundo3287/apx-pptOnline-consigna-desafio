import state from "../state";

export default function miResultado() {
    class MiResultado extends HTMLElement {
        constructor() {
            super();
            this.html;
            this.css;
            this.render() };

        html() {
            let estado = state.getState();
            let contenedor: HTMLElement = document.createElement('div');
            let resultado: HTMLElement = document.createElement('div');
            let contenedorHistorial: HTMLElement = document.createElement('div');
            let boton: HTMLElement = document.createElement('div');
            contenedor.setAttribute('class', 'contenedor');
            resultado.setAttribute('class', 'resultado');
            contenedorHistorial.setAttribute('class', 'contenedorHistorial');
            boton.setAttribute('class', 'boton');
            contenedorHistorial.textContent = 'score';
            boton.textContent = 'Volver a Jugar';
            if (estado.resultado == 'propietario' && estado.nombre != null) resultado.textContent = 'Ganaste'
            else if (estado.resultado == 'propietario' && estado.nombre == null) resultado.textContent = 'Perdiste'
            else if (estado.resultado == 'invitado' && estado.nombre != null) resultado.textContent = 'Perdiste'
            else if (estado.resultado == 'invitado' && estado.nombre == null) resultado.textContent = 'Ganaste'
            else if (estado.resultado == 'empate') resultado.textContent = 'Empate';
            contenedor.appendChild(resultado);
            contenedor.appendChild(contenedorHistorial);
            contenedor.appendChild(boton);
            return contenedor };

        css() {
            let style: HTMLElement = document.createElement('style');
            style.innerHTML = `
                * {  box-sizing: border-box }

                .contenedor {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                outline: 1px solid red }

                .contenedorHistorial, .resultado, .boton { 
                color: white;
                outline: 1px solid black }`;
            return style };

        render() {
            let html: HTMLElement = this.html();
            let css: HTMLElement = this.css();
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(html);
            shadowRoot.appendChild(css) }
    }

    customElements.define('mi-resultado', MiResultado);
}