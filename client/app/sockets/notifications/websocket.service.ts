import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Observable';

import * as io from 'socket.io-client';

@Injectable()
export class WebSocketService {
    private socket: SocketIOClient.Socket;
    constructor() {
        if (!this.socket) {
            this.socket = io(`http://${window.location.hostname}:${window.location.port}`);
        }
    }

    sendChatMessage(message: any) {
        this.socket.emit('chat', message);
    }

    getPlayersMessages(): Observable<any> {
        return new Observable((observer:any) => {
            this.socket.on('players', (data:any) => {
                observer.next(data);
            });
            return () => this.socket.disconnect();
        });
    }

    getChatMessages(): Observable<any> {
        return new Observable((observer:any) => {
            this.socket.on('chat', (data:any) => {
                observer.next(data);
            });
            return () => this.socket.disconnect();
        });
    }


    // sendMessageToGameRoom(message: any, room: any) {
    //     this.socket.emit(room, message);
    // }

    // getGameRoomMessages(room: any): Observable<any> {
    //     return new Observable((observer:any) => {
    //         this.socket.on(room, (data:any) => {
    //             observer.next(data);
    //         });
    //         return () => this.socket.disconnect();
    //     });
    // }
}
