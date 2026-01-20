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
                margin-top: 10px;
                margin-bottom: 10px;
                display: block;
                padding-top: 5px;
                padding-bottom: 5px;
                width: 100%;
                text-align: center;
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