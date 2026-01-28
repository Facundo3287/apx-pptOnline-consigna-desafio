import state from "../state";

export default function miPartida() {
    class MiPartida extends HTMLElement {
        etiquetas: HTMLElement[];
        constructor() {
            super();
            this.etiquetas = [];
            this.htmlPaginaEleccionDeJugadas;
            this.cssPaginaEleccionDeJugadas;
            this.tiempoParaElegirJUgada;
            this.main() };

        htmlPaginaEleccionDeJugadas() {
            let contenedor: HTMLElement = document.createElement('div');
            let cronometro: HTMLElement = document.createElement('div');
            let contenedorJugadas: HTMLElement = document.createElement('div');
            let piedra: HTMLElement = document.createElement('div');
            let papel: HTMLElement = document.createElement('div');
            let tijera: HTMLElement = document.createElement('div');
            contenedor.setAttribute('class', 'contenedor');
            cronometro.setAttribute('class', 'cronometro');
            contenedorJugadas.setAttribute('class', 'contenedorJugadas');
            piedra.setAttribute('class', 'piedra');
            piedra.setAttribute('seleccionado', 'false');
            papel.setAttribute('class', 'papel');
            papel.setAttribute('seleccionado', 'false');
            tijera.setAttribute('class', 'tijera');
            tijera.setAttribute('seleccionado', 'false');
            piedra.textContent = 'Piedra';
            papel.textContent = 'Papel';
            tijera.textContent = 'Tijera';
            piedra.addEventListener('click', () => { 
                let estado = state.getState();
                if (estado.nombre != null) state.data.jugadaPropietario = 'piedra'
                else if (estado.nombre == null) state.data.jugadaInvitado = 'piedra' } );
            papel.addEventListener('click', () => { 
                let estado = state.getState();
                if (estado.nombre != null) state.data.jugadaPropietario = 'papel'
                else if (estado.nombre == null) state.data.jugadaInvitado = 'papel' } );
            tijera.addEventListener('click', () => { 
                let estado = state.getState();
                if (estado.nombre != null) state.data.jugadaPropietario = 'tijera'
                else if (estado.nombre == null) state.data.jugadaInvitado = 'tijera' } );
            this.etiquetas.push(contenedor);
            this.etiquetas.push(cronometro);
            this.etiquetas.push(contenedorJugadas);
            this.etiquetas.push(piedra);
            this.etiquetas.push(papel);
            this.etiquetas.push(tijera);
            contenedorJugadas.appendChild(piedra);
            contenedorJugadas.appendChild(papel);
            contenedorJugadas.appendChild(tijera);
            contenedor.appendChild(cronometro);
            contenedor.appendChild(contenedorJugadas);
            return contenedor };

        cssPaginaEleccionDeJugadas() {
            let style: HTMLElement = document.createElement('style');
            style.innerHTML = `
                * {  box-sizing: border-box }
            
                .contenedor {
                border: 1px solid rgb(140, 140, 140);
                border-radius: 0px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center }

                .cronometro {
                padding-top: 3vh;
                padding-bottom: 3vh;
                padding-left: 2vw;
                padding-right: 2vw;
                width: 40vw;
                color: white;
                text-align: center;
                font-size: 80px;
                font-family: "Sixtyfour", sans-serif;
                font-optical-sizing: auto;
                font-weight: 400;
                font-style: normal;
                font-variation-settings:"BLED" 0, "SCAN" 0;
                background-color: rgb(20, 20, 20) }

                .contenedorJugadas {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start }

                .piedra, .papel, .tijera {
                padding-top: 2vh;
                padding-bottom: 2vh;
                padding-left: 2vw;
                padding-right: 2vw;
                border: 1px solid white;
                border-radius: 0px;
                width: 40vw;
                background-color: rgb(40, 40, 40);
                text-align: center;
                font-size: 20px;
                font-family: "Zain", sans-serif;
                font-weight: 700;
                font-style: normal;
                line-height: 3;
                color: white }
                
                .piedra:hover {
                background-color: rgb(60, 60, 60)}
                .piedra:active {
                background-color: rgb(20, 20, 20) }

                .papel:hover {
                background-color: rgb(60, 60, 60)}
                .papel:active {
                background-color: rgb(20, 20, 20) }

                .tijera:hover {
                background-color: rgb(60, 60, 60)}
                .tijera:active {
                background-color: rgb(20, 20, 20) }`;

            return style };

        tiempoParaElegirJUgada() {
            let cronometro: HTMLElement = this.etiquetas[1];
            let aux: number = 0;
            cronometro.textContent = `${aux}`;
            let intervalo = setInterval( () => {
                aux++;
                cronometro.textContent = `${aux}`;
                if (aux == 7) { 
                    clearInterval(intervalo);
                    state.stateSubirJugada() }
            }, 1000)
        };

        main() {
            let htmlPaginaEleccionDeJugadas: HTMLElement = this.htmlPaginaEleccionDeJugadas();
            let cssPaginaElccionDeJugadas: HTMLElement = this.cssPaginaEleccionDeJugadas();
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(htmlPaginaEleccionDeJugadas);
            shadowRoot.appendChild(cssPaginaElccionDeJugadas);
            this.tiempoParaElegirJUgada() }
    }

    customElements.define('mi-partida', MiPartida);
}