import { Component } from '@angular/core';
import {WebSocketService } from './notifications/websocket.service';

import { AuthService } from './auth.service';

@Component({
    moduleId: module.id,
    selector: 'chat-control',
    templateUrl: 'chat.component.html'
})
export class ChatComponent {
    message: string;

    // room: string;

    constructor(private websocketService: WebSocketService,
                private authService: AuthService,
                // room: string
                ) {
                    // this.room = room;
                }
                
    send(): void {
        // TODO: sends a chat messsage
        let json = {
            // user:this.authService.user,
            user: {
                username: JSON.parse(localStorage.getItem("currentUser")).username
            },
            message:this.message
        }

        this.websocketService.sendChatMessage(json);
        this.message = '';

        // this.websocketService.sendMessageToGameRoom(this.room, json);
        // this.message = '';
    }
}
