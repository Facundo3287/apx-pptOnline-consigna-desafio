import type { State, Data } from './tipos/state-tipos';
import api from './api.js';
import conectedRtdb from './rtdb.js';

let state: State = {
    data: {
        nombre: null,
        idUser: null,
        shortId: null,
        longId: null,
        contexto: 'preparacion'
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
    async stateCrearRoom(nombre): Promise<void> {
        try {
            let estado: Data = this.getState();
            estado.nombre = nombre;
            let idUser: string = await api.cuenta(estado);
            estado.idUser = idUser;
            let idRoom: any = await api.crearRoom(estado);
            estado.shortId = idRoom.shortId;
            estado.longId = idRoom.longId;
            await api.guardarRoom(estado);
            estado.contexto = 'roomCreada';
            await conectedRtdb(estado);
            this.setState(estado) }
        catch(e) {
            console.log('stateCrearRoom ====> error') }
    },
    async stateBuscarRoom(shortId: string): Promise<void> {
        try {
            let estado: Data = this.getState();
            estado.shortId = shortId;
            let longId = await api.buscarRoom(estado);
            estado.longId = longId;
            estado.contexto = 'roomEncontrada';
            await conectedRtdb(estado);
            this.setState(estado) }
        catch(e) {
            console.log('stateBuscarRoom ====> error') }
    },
    statePreparado(): void {
        console.log('estoy preparado') },
    stateCoordinadorRtdb(dataRtdb: any): void {
        let estado: Data = this.getState();
        if (estado.contexto == 'coordinando' && dataRtdb.preparados == 2) {
            estado.contexto = 'unificando';
            console.log('stateCoordinadorRtdb() =====> ', dataRtdb);
          //  this.setState(estado) 
        }
            /*
        else if (estado.contexto == 'unificando' && dataRtdb.jugadas.propietario != 'null' && dataRtdb.jugadas.invitado != 'null') {
            estado.contexto = 'jugadasObtenidas';
            estado.jugadaPropietario = dataRtdb.jugadas.propietario;
            estado.jugadaInvitado = dataRtdb.jugadas.invitado;
            this.setState(estado) } */
    },
};

export default state