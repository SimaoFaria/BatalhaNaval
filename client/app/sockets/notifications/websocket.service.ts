import { Injectable } from '@angular/core';
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

    getGameMessages(any: any): Observable<any> {
        return new Observable((observer:any) => {
            this.socket.on(any, (data:any) => {
                observer.next(data);
            });
            return () => this.socket.disconnect();
        });
    }

    joinGameChannel(json: any) {
        this.socket.emit('join game channel', json);
    }

    joinGameRoom(gameId: any) {
        this.socket.emit('join game room', gameId);
    }

    useChat(room: any, message: any) {
        this.socket.emit('use chat', room, message);
    }

    useNotifications(room: any, json: any) {
        this.socket.emit('use notifications', room, json);
    }

    alterGameState(room: any, json: any) {
        this.socket.emit('change game state', room, json);
    }

    getGameState(any: any): Observable<any> {
        return new Observable((observer:any) => {
            this.socket.on(any, (data:any) => {
                observer.next(data);
            });
            return () => this.socket.disconnect();
        });
    }
    
    updateCurrentPlayer(room: any, json: any) {
        this.socket.emit('update current player', room, json);
    }

    getCurrentPlayer(any: any): Observable<any> {
        return new Observable((observer:any) => {
            this.socket.on(any, (data:any) => {
                observer.next(data);
            });
            return () => this.socket.disconnect();
        });
    }

    updateGameStatus(room: any, json: any) {
        this.socket.emit('update game status', room, json);
    }

    getUpdateGameStatus(any: any): Observable<any> {
        return new Observable((observer:any) => {
            this.socket.on(any, (data:any) => {
                observer.next(data);
            });
            return () => this.socket.disconnect();
        });
    }
}
