export interface State {  
    data: Data;
    listeners: Array<() => void>;
    getState: () => Data;
    setState: (estado: Data) => void;
    stateGuardar: (data: Data) => void;
    suscribirse: ( sub: () => void ) => void;
    stateInit: () => boolean;
    stateRetomarRoom: () => Promise<void> ;
    stateCrearRoom: (nombre: string) => Promise<void>;
    stateBuscarRoom: (shortId: string) => Promise<void>;
    statePreparado: () => void;
    stateSubirJugada: () => void;
    duelo: () => void;
    stateActualizarDatos: (estado: Data) => void;
    stateCoordinadorRtdb: (dataRtdb: any) => void
};

export interface Data {
    nombre: string | null;
    idUser: string | null;
    shortId: string | null;
    longId: string | null;
    contexto: string;
    jugadaPropietario: string;
    jugadaInvitado: string;
    resultado: string | null;
    propietarioWins: number;
    invitadoWins: number };