import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from './classes.model';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    private url = 'http://localhost:3000';
    private socket: SocketIOClient.Socket;

    constructor() {}

    /**
     * Initialize socket connection
     */
    connect() {
        this.socket = io(this.url);
    }

    /**
     * Create socket channel
     */
    onNewMessage = () => new Observable((observer) => {
        this.socket.on('message', (message: Message) => {
            observer.next(message);
        });
    });

    /**
     * Emit socket events
     * @param message event to be emitted
     */
    sendMessage(message: Message) {
        this.socket.emit('message', message)
    }

    addUserToList(userName: string) {
        console.log('socket emit add user: ', userName);
        this.socket.emit('add user', userName);
    }

    // onUserJoined = () => new Observable((observer) => {
    //     this.socket.on('user joined', (userName) => {
    //         console.log('user joined at service: ', userName);
    //         observer.next(userName)
    //     });
    // });

    
}