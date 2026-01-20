import './style.css';
import miButtom from './componentes/buttom.js';
import miForm from './componentes/form.js';
import miText from './componentes/text.js';
import initRouter from './router.js';

function main(): void {
    miButtom();
    miForm();
    miText();
    initRouter()
};

main()