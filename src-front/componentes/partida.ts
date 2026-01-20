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
            this.suscripcion;
            this.htmlPaginaDuelo;
            this.cssPaginaDuelo;
            this.tiempoDelDuelo;
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
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                outline: 1px solid red }

                .cronometro {
                color: white;
                text-align: center }

                .contenedorJugadas {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: flex-start;
                outline: 1px solid black }

                .piedra, .papel, .tijera {
                border: 1px solid red;
                text-align: center;
                color: white }`;
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

        suscripcion(shadowRoot: any) {
            state.suscribirse( () => { 
                let estado = state.getState();
                if (estado.contexto == 'jugadasObtenidas') { 
                    let secondContainer: HTMLElement = this.htmlPaginaDuelo();
                    let secondStyle: HTMLElement = this.cssPaginaDuelo();
                    shadowRoot.innerHTML = ``;
                    shadowRoot.appendChild(secondContainer);
                    shadowRoot.appendChild(secondStyle);
                    this.tiempoDelDuelo() } 
            })
        };

        htmlPaginaDuelo(): HTMLElement {
            let estado = state.getState();
            let contenedor: HTMLElement = document.createElement('div');
            let propietarioJugada: HTMLElement = document.createElement('div');
            let invitadoJugada: HTMLElement = document.createElement('div');
            contenedor.setAttribute('class', 'contenedor');
            propietarioJugada.setAttribute('class', 'propietarioJugada');
            invitadoJugada.setAttribute('class', 'invitadoJugada');
            propietarioJugada.textContent = estado.jugadaPropietario;
            invitadoJugada.textContent = estado.jugadaInvitado;
            contenedor.appendChild(propietarioJugada);
            contenedor.appendChild(invitadoJugada);
            return contenedor };

        cssPaginaDuelo(): HTMLElement {  
            let style: HTMLElement = document.createElement('style');
            style.innerHTML = `
                * {  box-sizing: border-box }

                .contenedor {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                outline: 1px solid black }

                .propietarioJugada, .invitadoJugada {
                border: 1px solid red;
                text-align: center;
                color: white }`;
            return style};

        tiempoDelDuelo() {
            setTimeout(() => {
                state.duelo()
            }, 5000)
        };

        main() {
            let htmlPaginaEleccionDeJugadas: HTMLElement = this.htmlPaginaEleccionDeJugadas();
            let cssPaginaElccionDeJugadas: HTMLElement = this.cssPaginaEleccionDeJugadas();
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(htmlPaginaEleccionDeJugadas);
            shadowRoot.appendChild(cssPaginaElccionDeJugadas);
            this.tiempoParaElegirJUgada();
            this.suscripcion(shadowRoot) }
    }

    customElements.define('mi-partida', MiPartida);
}