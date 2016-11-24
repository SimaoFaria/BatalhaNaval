import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../game-naval-battle/game';


@Component({
    moduleId: module.id,
    providers:[],
    selector: 'my-dashboard',
    templateUrl: '../game-naval-battle/gameBoard.html',
    styleUrls: ['../game-naval-battle/css/main.css']
    //template: '<h3>Estou na Dasboard - Dasboard</h3>'
    //templateUrl: 'dashboard.component.html'
})

export class DashboardComponent {

    //games : Game[];

    //constructor(private router: Router)  {}

    //se tem login 

    //# getGames(User)

    //

    //getGames(username : string){}

    value : number = 1;

}