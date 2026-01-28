import './style.css';
import miButtom from './componentes/buttom.js';
import miForm from './componentes/form.js';
import miText from './componentes/text.js';
import miPartida from './componentes/partida.js';
import miDuelo from './componentes/duelo.js';
import miResultado from './componentes/resultado.js';
import initRouter from './router.js';

function main(): void {
    miButtom();
    miForm();
    miText();
    miPartida();
    miDuelo();
    miResultado();
    initRouter()
};

main()