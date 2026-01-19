import state from '../state.js';

export default function miForm() {
    class MiForm extends HTMLElement {
        constructor() {
            super();
            this.etiqueta;
            this.css;
            this.render() };

        etiqueta() {
            let placeholder: string;
            let textButtom: string;
            let tipo: string = this.getAttribute('tipo')!;
            if (tipo == 'ingresar') {
                textButtom = 'Ingresar a sala';
                placeholder = 'Codigo'}
            else if (tipo == 'crear' ) {
                textButtom = 'Empezar';
                placeholder = 'Tu nombre'};
            let form: HTMLFormElement = document.createElement('form');
            let input: HTMLInputElement = document.createElement('input');
            let submit: HTMLInputElement = document.createElement('input');
            form.setAttribute('class', 'form');
            input.setAttribute('class', 'input');
            input.setAttribute('name', 'input');
            input.setAttribute('type', 'text');
            input.setAttribute('placeholder', placeholder!);
            submit.setAttribute('class', 'submit');
            submit.setAttribute('type', 'submit');
            submit.setAttribute('value', textButtom!);
            form.appendChild(input);
            form.appendChild(submit);
            form.addEventListener('submit', (e: SubmitEvent) => {
                e.preventDefault();
                if (tipo == 'crear') state.stateCrearRoom(input.value)
                //else if (tipo == 'ingresar') state.stateBuscarRoom(input.value)
            });
            return form };

        css() {
            let style: HTMLElement = document.createElement('style');
            style.innerHTML = `
                * { box-sizing: border-box }

                .form {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center }
                
                .input {
                margin: 5px;
                padding-top: 5px;
                padding-bottom: 5px;
                width: 100%;
                background-color: #05172f;
                text-align: center;
                color: white }
                
                .submit {
                margin: 5px;
                padding-top: 5px;
                padding-bottom: 5px;
                width: 100%;
                background-color: #05172f;
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
    customElements.define('mi-form', MiForm);
}