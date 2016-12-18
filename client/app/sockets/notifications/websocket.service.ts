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

    // sendChatMessage(message: any) {
    //     this.socket.emit('chat', message);
    // }

    // getPlayersMessages(): Observable<any> {
    //     return new Observable((observer:any) => {
    //         this.socket.on('players', (dataChartAVGGamesPerDay:any) => {
    //             observer.next(dataChartAVGGamesPerDay);
    //         });
    //         return () => this.socket.disconnect();
    //     });
    // }

    // getChatMessages(): Observable<any> {
    //     return new Observable((observer:any) => {
    //         this.socket.on('chat', (dataChartAVGGamesPerDay:any) => {
    //             observer.next(dataChartAVGGamesPerDay);
    //         });
    //         return () => this.socket.disconnect();
    //     });
    // }


    // sendMessageToGameRoom(room: any, message: any) {
    //     this.socket.emit(room, message);    
    // }

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
}
