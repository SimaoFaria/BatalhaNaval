import { Component } from '@angular/core';

import { SocketsService } from './sockets.service';

import { AuthService } from './auth.service';

@Component({
  moduleId: module.id,
  selector: 'my-sockets',
  templateUrl: './sockets.html',
  styleUrls: [
    './sockets.css'
  ]
})

export class SocketsComponent {

    username:string
    password:string
    players:any[] =[]
    user:any
  
    constructor(private authService :AuthService){}

    loginClick(){
        this.authService.login(this.username,this.password)
            .subscribe((user) => {
                this.user = user
                this.authService.getPlayers()
                .subscribe(players=>this.players = players);
        })
    }
}