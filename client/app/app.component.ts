import { Component } from '@angular/core';

import { HistoricalService } from './services/historical.service';

@Component({
  selector: 'my-app',
  template: `
    <div>
        <h1>{{title}}</h1>
        <nav>
            <a routerLink="/current-games">Current Games</a>
            <a routerLink="/dashboard">Dashboard</a>
            <a routerLink="/historical">Historical</a>
            <a routerLink="/login">Login</a>
            <a routerLink="/game-lobby">Game Lobby</a>
        </nav>
    </div>
    <my-top10></my-top10>
    <router-outlet></router-outlet>
    `,
  styles: [`
    div {
        width:15%;
        height:100%;
        /*background-color: #607D8B;*/
        background-color: yellowgreen;
        float:left;
    }

    .conteiner{
        width:70%; 
        background-color:red;
    }
    `],
  providers: [HistoricalService]
  
})

export class AppComponent {
  title = 'Dashboard';
}
