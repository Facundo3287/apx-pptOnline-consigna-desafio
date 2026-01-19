import type { State, Data } from './tipos/state-tipos';
import * as api from './api.js';

let state: State = {
    data: {
        nombre: null,
        idUser: null
    },
    listeners: [], 
    getState: function(): Data {
        return this.data 
    },
    setState: function(estado: Data): void {
        this.data = estado;
        for (let aux of this.listeners) aux()
    },
    suscribirse(sub: () => void): void {
        this.listeners.push(sub)
    },
    async stateCrearRoom(nombre: string): Promise<void> {
        try {
            let estado: Data = this.getState();
            estado.nombre = nombre;
            let idUser: string = await api.apiCuenta(estado);
            estado.idUser = idUser;
            console.log('stateCrearRoom ===> ', estado)
        }
        catch(e) {
            console.log('stateCrearRoom ====> error') }
    },
};

export default state