import { Component, OnInit, Input } from '@angular/core';
import {WebSocketService } from './notifications/websocket.service';

@Component({
    moduleId: module.id,
    selector: 'chat-control',
    templateUrl: 'chat.component.html'
})
export class ChatComponent implements OnInit{
    message: string;

    @Input() roomId: string;

    constructor(private websocketService: WebSocketService
               ) {
                    // console.log("this.chatRoom");
                    // console.log(this.chatRoom);
                }

    ngOnInit() {
        // console.log("chat this.chatRoom");
        // console.log(this.chatRoom);


        let json = {
            // user:this.authService.user,
            user: {
                username: JSON.parse(localStorage.getItem("currentUser")).username
            },
            chatChannel: this.roomId + ' chat',
            notificationsChannel: this.roomId + ' notifications'
        }

        this.websocketService.joinGameChannel(json);
    }

    sendMessageToChat(): void {
        
        // let date = new Date();
        

        let json = {
            // user:this.authService.user,
            user: {
                username: JSON.parse(localStorage.getItem("currentUser")).username
            },
            message:this.message,
            channel: this.roomId + ' chat',
            time: Date.now()
        }

        this.websocketService.useChat(this.roomId + ' chat', json);
        // this.websocketService.useChat('chat', json);
        this.message = '';

        // console.log("chat this.chatRoom");
        // console.log(this.chatRoom);
    }
}
