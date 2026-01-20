import type { State, Data } from './tipos/state-tipos';
import api from './api.js';
import conectedRtdb from './rtdb.js';

let state: State = {
    data: {
        nombre: null,
        idUser: null,
        shortId: null,
        longId: null,
        contexto: 'preparacion',
        jugadaPropietario: 'ninguno',
        jugadaInvitado: 'ninguno',
        resultado: null,
        propietarioWins: 0,
        invitadoWins: 0
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
        let estado = this.getState();
        api.preparado(estado) 
    },
    stateSubirJugada(): void {
        let estado = this.getState();
        if (estado.nombre != null) api.subirJugada(estado)
        else if (estado.nombre == null) {
            setTimeout(() => { api.subirJugada(estado) }, 2000) }
    },
    duelo(): void { 
        let estado: Data = this.getState();
        if (estado.jugadaPropietario == 'piedra' && estado.jugadaInvitado == 'piedra') estado.resultado = 'empate'
        else if (estado.jugadaPropietario == 'piedra' && estado.jugadaInvitado == 'papel') estado.resultado = 'invitado'
        else if (estado.jugadaPropietario == 'piedra' && estado.jugadaInvitado == 'tijera') estado.resultado = 'propietario'
        else if (estado.jugadaPropietario == 'piedra' && estado.jugadaInvitado == 'ninguno') estado.resultado = 'empate'
        else if (estado.jugadaPropietario == 'papel' && estado.jugadaInvitado == 'piedra') estado.resultado = 'propietario'
        else if (estado.jugadaPropietario == 'papel' && estado.jugadaInvitado == 'papel') estado.resultado = 'empate'
        else if (estado.jugadaPropietario == 'papel' && estado.jugadaInvitado == 'tijera') estado.resultado = 'invitado'
        else if (estado.jugadaPropietario == 'papel' && estado.jugadaInvitado == 'ninguno') estado.resultado = 'empate'
        else if (estado.jugadaPropietario == 'tijera' && estado.jugadaInvitado == 'piedra') estado.resultado = 'invitado'
        else if (estado.jugadaPropietario == 'tijera' && estado.jugadaInvitado == 'papel') estado.resultado = 'propietario'
        else if (estado.jugadaPropietario == 'tijera' && estado.jugadaInvitado == 'tijera') estado.resultado = 'empate'
        else if (estado.jugadaPropietario == 'tijera' && estado.jugadaInvitado == 'ninguno') estado.resultado = 'empate'
        else if (estado.jugadaPropietario == 'ninguno' && estado.jugadaInvitado == 'piedra') estado.resultado = 'empate'
        else if (estado.jugadaPropietario == 'ninguno' && estado.jugadaInvitado == 'papel') estado.resultado = 'empate'
        else if (estado.jugadaPropietario == 'ninguno' && estado.jugadaInvitado == 'tijera') estado.resultado = 'empate'
        else if (estado.jugadaPropietario == 'ninguno' && estado.jugadaInvitado == 'ninguno') estado.resultado = 'empate'
        else console.log('state.duelo() - error');
        if (estado.resultado! == 'propietario') estado.propietarioWins++ 
        else if (estado.resultado! == 'invitado') estado.invitadoWins++;
        estado.contexto = 'ganadorDefinido';
        state.setState(estado)    
    },
    stateCoordinadorRtdb(dataRtdb: any): void {
        let estado: Data = this.getState();
        if (estado.contexto == 'coordinando' && dataRtdb.preparados == 2) {
            estado.contexto = 'unificando';
            this.setState(estado) }
        else if (estado.contexto == 'unificando' && dataRtdb.jugadas.propietario != 'null' && dataRtdb.jugadas.invitado != 'null') {
            console.log('stateCoordinadorRtdb() => ', dataRtdb);
            estado.contexto = 'jugadasObtenidas';
            estado.jugadaPropietario = dataRtdb.jugadas.propietario;
            estado.jugadaInvitado = dataRtdb.jugadas.invitado;
            this.setState(estado) } 
    },
};

export default state