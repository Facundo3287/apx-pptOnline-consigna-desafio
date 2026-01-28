export default function miText(): void {
    class MiText extends HTMLElement {
        constructor() {
            super();
            this.etiqueta;
            this.css;
            this.render() };

        etiqueta() {
            let contenido: string = this.getAttribute('contenido')!;
            let p: HTMLElement = document.createElement('p');
            p.setAttribute('class', 'p');
            p.textContent = contenido;
            return p };

        css() {
            let style: HTMLElement = document.createElement('style');
            style.innerHTML = `
                * {  box-sizing: border-box }
            
                .p {
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
                color: white }`;

            return style };

        render() {
            let etiqueta: HTMLElement = this.etiqueta();
            let style: HTMLElement = this.css();
            const shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(etiqueta);
            shadowRoot.appendChild(style) }
    }

    customElements.define('mi-text', MiText);
}