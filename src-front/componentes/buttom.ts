// import { state } from '../state';

export default function miButtom() {
    class MiButttom extends HTMLElement {
        constructor() {
            super();
            this.etiquetas;
            this.css;
            this.render() };

        etiquetas() {
            let buttom: HTMLElement = document.createElement('buttom');
            let contenido: string = this.getAttribute('contenido')!;
            let tipo: string = this.getAttribute('tipo')!;
            buttom.setAttribute('class', 'buttom');
            buttom.textContent = contenido;

            buttom.addEventListener('click', () => {
                if (tipo == 'crear') {
                    this.setAttribute('hidden', '');
                    document.querySelector('.buttomIngresar')!.setAttribute('hidden', '');
                    document.querySelector('.formCrear')!.removeAttribute('hidden') }
                else if (tipo == 'ingresar') {
                    this.setAttribute('hidden', '');
                    document.querySelector('.buttomCrear')!.setAttribute('hidden', '');
                    document.querySelector('.formIngresar')!.removeAttribute('hidden') } 
                else if (tipo == 'siguiente') {
                    document.querySelector('.textoCodigo')!.setAttribute('hidden', '');
                    this.setAttribute('hidden', '');
                    document.querySelector('.textoJugar')!.removeAttribute('hidden');
                    document.querySelector('.buttomJugar')!.removeAttribute('hidden') }
                else if (tipo == 'jugar') {
                    document.querySelector('.textoJugar')!.setAttribute('hidden', '');
                    document.querySelector('.buttomJugar')!.setAttribute('hidden', '');
                    document.querySelector('.textoEspera')!.removeAttribute('hidden');
                    //state.statePreparado() 
                }
            });

            return buttom  }; 

        css() {
            let style: HTMLElement = document.createElement('style');
            style.innerHTML = `
                * {  box-sizing: border-box }
            
                .buttom {
                margin-top: 10px;
                margin-bottom: 10px;
                display: block;
                padding-top: 5px;
                padding-bottom: 5px;
                width: 100%;
                background-color: #05172f;
                text-align: center;
                color: white }`;
            return style };

        render() {
            let buttom: HTMLElement = this.etiquetas();
            let style: HTMLElement = this.css();
            const shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(buttom);
            shadowRoot.appendChild(style) }
    }

    customElements.define('mi-buttom', MiButttom);
}