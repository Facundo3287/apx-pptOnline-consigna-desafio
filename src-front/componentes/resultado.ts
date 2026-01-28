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
            let resultado: HTMLElement = document.createElement('h1');
            let ganados: HTMLElement = document.createElement('p');
            let periddos: HTMLElement = document.createElement('p');
            let boton: HTMLElement = document.createElement('div');
            contenedor.setAttribute('class', 'contenedor');
            resultado.setAttribute('class', 'resultado');
            ganados.setAttribute('class', 'ganados');
            periddos.setAttribute('class', 'perdidos');
            boton.setAttribute('class', 'boton');
            boton.textContent = 'Volver a jugar';
            if (estado.nombre != null && estado.resultado == 'propietario') {
                resultado.textContent = `Ganaste!` }
            else if (estado.nombre != null && estado.resultado == 'invitado') {
                resultado.textContent = 'Perdiste!' }
            else if (estado.nombre == null && estado.resultado == 'propietario') {
                resultado.textContent = 'Perdiste!' }
            else if (estado.nombre == null && estado.resultado == 'invitado') {
                resultado.textContent = 'Ganaste!' }
            else if (estado.resultado == 'empate') {
                resultado.textContent = 'Empate' };
            if (estado.nombre != null) {
                ganados.textContent = `Ganados: ${estado.propietarioWins}`;
                periddos.textContent = `Perdidos: ${estado.invitadoWins}` }
            else if (estado.nombre == null) {
                ganados.textContent = `Ganados: ${estado.invitadoWins}`;
                periddos.textContent = `Perdidos: ${estado.propietarioWins}` };
            boton.addEventListener('click', () => {
                let estado = state.getState();
                estado.contexto = 'nuevaPartida';
                state.setState(estado) });
            contenedor.appendChild(resultado);
            contenedor.appendChild(ganados);
            contenedor.appendChild(periddos);
            contenedor.appendChild(boton);
            return contenedor };

        css() {
            let style: HTMLElement = document.createElement('style');
            style.innerHTML = `
                * {  box-sizing: border-box }

                .contenedor {
                padding-top: 3vh;
                padding-bottom: 3vh;
                padding-left: 2vw;
                padding-right: 2vw;
                border: 1px solid white;
                border-radius: 0px;
                width: 40vw;
                background-color: rgb(20, 20, 20);
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center }

                .resultado { 
                margin: 0px;
                padding-top: 2vh;
                text-align: center;
                font-size: 30px;
                font-family: "Sixtyfour", sans-serif;
                font-optical-sizing: auto;
                font-weight: 400;
                font-style: normal;
                font-variation-settings: "BLED" 0, "SCAN" 0;
                color: white }
                
                .ganados, .perdidos {
                margin: 0px;
                padding: 15px;
                font-family: "Zalando Sans Expanded", sans-serif;
                font-optical-sizing: auto;
                font-weight: 200;
                font-style: normal;
                color: yellow }
       
                .boton {
                margin-top: 10px;
                padding-top: 1vh;
                padding-bottom: 1vh;
                padding-left: 2vw;
                padding-right: 2vw;
                border: 1px solid white;
                border-radius: 0px;
                width: 20vw;
                background-color: rgb(40, 40, 40);
                text-align: center;
                font-size: 20px;
                font-family: "Zain", sans-serif;
                font-weight: 700;
                font-style: normal;
                line-height: 3;
                color: white }
                
                .boton:hover {
                background-color: rgb(60, 60, 60)}
                .boton:active {
                background-color: rgb(20, 20, 20) }`;
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