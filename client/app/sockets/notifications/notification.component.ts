import { Component, OnInit, Input } from '@angular/core';

import {WebSocketService } from './websocket.service';

@Component({
    moduleId: module.id,
    selector: 'notification-panel',
    templateUrl: 'notification.component.html'
})


export class NotificationComponent implements OnInit {
    notificationsChannel: string[] = [];
    chatChannel: string[] = [];

    @Input() roomId: string;

    constructor(private websocketService: WebSocketService){ }

    ngOnInit() {

        this.websocketService.getGameMessages(this.roomId + ' notifications')
            .subscribe( message => {
                // let text = '('+this.chatRoom+') -> '+message.user.username+'---'+message.message;
                // this.notificationsChannel.push(text);
                this.notificationsChannel.push(message);
            } );

        this.websocketService.getGameMessages(this.roomId + ' chat')
            .subscribe( message => {
                // let text = '('+this.roomId+') -> '+message.user.username+'---'+message.message;
                let date = new Date(message.time);
                let d = {
                    Y: date.getFullYear(),
                    M: date.getUTCMonth(),
                    D: date.getUTCDay(),
                    H: date.getHours(),
                    m: date.getMinutes(),
                    s: date.getSeconds()
                };

                //o mes e o dia não estão certo
                // let day = [d.Y, d.M, d.D].join('/');
                let hours = [d.H,
                            d.m,
                            // d.s
                            ].join(':');
                // let time = [day, hours].join(' ');

                let text = hours + ' ' + message.user.username+' -> '+message.message;
                this.chatChannel.push(text);
            } );
    }

}
