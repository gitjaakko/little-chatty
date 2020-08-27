export interface User {
    id: number;
    name: string;
}

export interface Message {
    id: string;
    message: string;
    action: Actions;
    from: User;
}

export enum Actions {
    JOINED,
    LEFT,
    MESSAGE
}

export enum SocketEvent {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect'
}