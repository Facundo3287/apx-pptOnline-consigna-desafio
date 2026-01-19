export interface State {  
    data: Data;
    listeners: Array<() => void>;
    getState: () => Data;
    setState: (estado: Data) => void;
    suscribirse: ( sub: () => void ) => void;
    stateCrearRoom: (nombre: string) => Promise<void>
};

export interface Data {
    nombre: string | null;
    idUser: string | null };