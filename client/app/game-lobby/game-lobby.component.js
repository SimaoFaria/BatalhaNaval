"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var game_lobby_service_1 = require('./game-lobby.service');
var GameLobbyComponent = (function () {
    function GameLobbyComponent(pendingGamesService) {
        var _this = this;
        this.pendingGamesService = pendingGamesService;
        this.pendingGamesService.getPendingGames()
            .subscribe(function (leaderboard) { return _this.pendingGames = leaderboard; });
    }
    GameLobbyComponent.prototype.createGame = function () {
        var player = {
            "username": "Mario",
            "score": 0,
            "classification": ""
        };
        var game = {
            "status": "pending",
            "createdBy": player.username,
            "aborted": false,
            "startDate": "DATA A POR",
            "endDate": "DATA A POR",
            "winner": "",
            "players": [
                {
                    "username": player.username,
                    "score": player.score,
                    "classification": player.classification
                }
            ]
        };
        //DUVIDA: onde se lida com a atualização no gameLobby com este novo jogo criado?
        this.pendingGamesService.createNewGame(game)
            .subscribe(function (response) { return response; });
    };
    GameLobbyComponent.prototype.enterGame = function () {
        var player = {
            "username": "Mario",
            "score": 0,
            "classification": ""
        };
        var gameId = "";
        this.pendingGamesService.enterGame(gameId, player)
            .subscribe(function (response) { return response; });
    };
    GameLobbyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-game-lobby',
            templateUrl: './game-lobby.html',
            styleUrls: ['./game-lobby.css'],
            providers: [game_lobby_service_1.GameLobbyService]
        }), 
        __metadata('design:paramtypes', [game_lobby_service_1.GameLobbyService])
    ], GameLobbyComponent);
    return GameLobbyComponent;
}());
exports.GameLobbyComponent = GameLobbyComponent;
//# sourceMappingURL=game-lobby.component.js.map