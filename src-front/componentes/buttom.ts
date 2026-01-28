import state from '../state';

export default function miButtom() {
    class MiButttom extends HTMLElement {
        constructor() {
            super();
            this.etiquetas;
            this.css;
            this.render() };

        etiquetas() {
            let buttom: HTMLElement = document.createElement('div');
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
                    let tipoDeRoom: boolean = state.stateInit();
                    if (tipoDeRoom == false ) {
                        console.log('2.1');
                        this.setAttribute('hidden', '');
                        document.querySelector('.buttomCrear')!.setAttribute('hidden', '');
                        document.querySelector('.formIngresar')!.removeAttribute('hidden') }
                    else if (tipoDeRoom == true) { 
                        console.log('2.2');
                        state.stateRetomarRoom() } } 
                else if (tipo == 'siguiente') {
                    document.querySelector('.textoCodigo')!.setAttribute('hidden', '');
                    this.setAttribute('hidden', '');
                    document.querySelector('.textoJugar')!.removeAttribute('hidden');
                    document.querySelector('.buttomJugar')!.removeAttribute('hidden') }
                else if (tipo == 'jugar') {
                    document.querySelector('.textoJugar')!.setAttribute('hidden', '');
                    document.querySelector('.buttomJugar')!.setAttribute('hidden', '');
                    document.querySelector('.textoEspera')!.removeAttribute('hidden');
                    state.statePreparado() }
                else if (tipo == 'duelo') {
                    state.duelo() }
            });

            return buttom  }; 

        css() {
            let style: HTMLElement = document.createElement('style');
            style.innerHTML = `

                * {  box-sizing: border-box }
            
                .buttom {
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

                .buttom:hover {
                background-color: rgb(60, 60, 60)}
                .buttom:active {
                background-color: rgb(20, 20, 20) }`;

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