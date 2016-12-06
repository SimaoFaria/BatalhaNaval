import { Component, OnInit } from '@angular/core';

import {WebSocketService } from './websocket.service';

@Component({
    moduleId: module.id,
    selector: 'notification-panel',
    templateUrl: 'notification.component.html'
})
export class NotificationComponent implements OnInit {
    playersChannel: string[] = [];
    chatChannel: string[] = [];

    constructor(private websocketService: WebSocketService){
    }

    ngOnInit() {
        // TODO: subscribe each type of event on websocketService
        // Every time a message is served just push it to the proper channel
        this.websocketService.getPlayersMessages()
            .subscribe( message => 
            this.playersChannel.push(message) );

        this.websocketService.getChatMessages()
            .subscribe( message => {
                let text = message.user.username+'---'+message.message
                this.chatChannel.push(text)
            }
             );
    }

}
