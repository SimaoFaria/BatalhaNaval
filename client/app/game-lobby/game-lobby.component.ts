import { Component } from '@angular/core';

import { Game } from '../game-naval-battle/game';
import { GameLobbyService } from './game-lobby.service';

@Component({
    moduleId: module.id,
    selector: 'my-game-lobby',
    templateUrl: './game-lobby.html',
    styleUrls: [ './game-lobby.css'],
    providers: [ GameLobbyService]
})

export class GameLobbyComponent{

    pendingGames:Game[];

    constructor(private pendingGamesService: GameLobbyService) { 

        this.pendingGamesService.getPendingGames()
            .subscribe((leaderboard) => this.pendingGames = leaderboard);
    }
 }