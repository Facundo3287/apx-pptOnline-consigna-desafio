import state from "../state";

export default function miDuelo() {
    class MiDuelo extends HTMLElement {
        etiquetas: HTMLElement[];
        constructor() {
            super();
            this.etiquetas = [];
            this.htmlPaginaDuelo;
            this.cssPaginaDuelo;
            this.render() };

        htmlPaginaDuelo(): HTMLElement {
            let estado = state.getState();
            let contenedor: HTMLElement = document.createElement('div');
            let propietarioJugada: HTMLElement = document.createElement('p');
            let invitadoJugada: HTMLElement = document.createElement('p');
            contenedor.setAttribute('class', 'contenedor');
            propietarioJugada.setAttribute('class', 'propietarioJugada');
            invitadoJugada.setAttribute('class', 'invitadoJugada');
            propietarioJugada.textContent = `Jugada del propietario: ${estado.jugadaPropietario}`;
            invitadoJugada.textContent = `Jugada del invitado: ${estado.jugadaInvitado}`;
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
                align-items: center }

                .propietarioJugada, .invitadoJugada {
                margin: 0px;
                padding-top: 3vh;
                padding-bottom: 3vh;
                padding-left: 2vw;
                padding-right: 2vw;
                border: 1px solid white;
                border-radius: 0px;
                width: 40vw;
                background-color: rgb(20, 20, 20);
                text-align: center;
                font-size: 25px;
                font-family: "Zalando Sans Expanded", sans-serif;
                font-optical-sizing: auto;
                font-weight: 200;
                font-style: normal;
                color: yellow }`

            return style};

        render() {
            let htmlPaginaDuelo: HTMLElement = this.htmlPaginaDuelo();
            let cssPaginaDuelo: HTMLElement = this.cssPaginaDuelo();
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(htmlPaginaDuelo);
            shadowRoot.appendChild(cssPaginaDuelo) }
    }

    customElements.define('mi-duelo', MiDuelo);
}