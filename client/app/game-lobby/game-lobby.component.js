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
var game_1 = require('../game-naval-battle/game');
var game_lobby_service_1 = require('./game-lobby.service');
var GameLobbyComponent = (function () {
    function GameLobbyComponent(gameInRoomService) {
        var _this = this;
        this.gameInRoomService = gameInRoomService;
        //Workaround do players.length
        //totalPlayers: Number[] = []; NOT WORKING
        this.player = {
            "username": "mario",
            "score": 0,
            "classification": ""
        };
        this.gameInRoomService.getGamesInRoom()
            .subscribe(function (gamesInRoom) {
            _this.gamesInRoom = gamesInRoom;
            console.log(gamesInRoom);
            /* este workaround não serve
            this.totalPlayers = [];
            this.gamesInRoom.forEach((game) => {
                this.totalPlayers.push(game.players.length);
            });*/
        });
    }
    GameLobbyComponent.prototype.createGame = function () {
        var _this = this;
        var newGame = {
            "_id": undefined,
            "status": game_1.PlayerStateGame.gameStatus_toString(game_1.GameStatus.INWAITINGROOM),
            "createdBy": this.player.username,
            "aborted": false,
            "startDate": new Date(Date.now()).toLocaleString(),
            "endDate": "",
            "winner": "",
            "players": [
                {
                    "username": this.player.username,
                    "score": this.player.score,
                    "classification": this.player.classification
                }
            ]
        };
        this.gameInRoomService.createNewGame(newGame)
            .subscribe(function (game) {
            console.log(game);
            _this.gamesInRoom.push(game);
        });
    };
    GameLobbyComponent.prototype.removeGame = function (game) {
        var _this = this;
        if (this.player.username !== game.createdBy) {
            console.log("Player '" + this.player.username + "' não tem permissão para remover o jogo(createdBy: '" + game.createdBy + "')");
        }
        else {
            this.gameInRoomService.deleteGame(game._id)
                .subscribe(function (response) {
                if (response.ok) {
                    //console.log(this.gameInRoom.indexOf(game));
                    var gameIndex = _this.gamesInRoom.indexOf(game);
                    _this.gamesInRoom.splice(gameIndex, 1);
                }
            });
        }
    };
    GameLobbyComponent.prototype.enterGame = function (game) {
        var gameToUpdate = new game_1.Game(game);
        gameToUpdate.players.push(this.player);
        this.gameInRoomService.updateGame(game._id, gameToUpdate)
            .subscribe(function (game2) {
            // TODO a atualizaçao
            // console.log(game2);
            // console.log(this.gamesInRoom);
            //  let gameIndex : number = this.gamesInRoom.indexOf(game);
            // console.log(gameIndex);
            // DUVIDA: porque que é que esta abordagem não funciona?
            // this.gamesInRoom[gameIndex] = game;
            // this.gamesInRoom.;
            // this.gamesInRoom[gameIndex].players.push(this.player);
            // meh~
            // if (gameToUpdate.players === game.players) {
            //     this.gamesInRoom[gameIndex].players.push(this.player);
            // }
        });
    };
    GameLobbyComponent.prototype.leaveGame = function (game) {
        var gameToUpdate = new game_1.Game(game);
        /*
        //necessito fazer isto para não perder o acesso do this.player dentro do map feito aseguir
        let playerTest: GamingPlayer = this.player;
        
        gameToUpdate.players =
        //não funciona para < IE9
        gameToUpdate.players.filter(function(pl){
            return pl.username !== playerTest.username;
        });
        */
        var playerIndex = gameToUpdate.players.indexOf(this.player);
        console.log(playerIndex);
        console.log(gameToUpdate.players);
        gameToUpdate.players.splice(playerIndex, 1);
        console.log(gameToUpdate.players);
        this.gameInRoomService.updateGame(game._id, gameToUpdate)
            .subscribe(function (response) {
            /** TODO||DUVIDA
             *  porque é que a vista nao é atualizada?
             *  como atualizar os *ngIfs?
             */
            game = response;
            console.log(game);
        });
    };
    GameLobbyComponent.prototype.startGame = function (game) {
        var gameToStart = new game_1.Game(game);
        gameToStart.status = game_1.PlayerStateGame.gameStatus_toString(game_1.GameStatus.PENDING);
        this.gameInRoomService.startGame(game._id, gameToStart)
            .subscribe(function (game) { });
    };
    GameLobbyComponent.prototype.playerIn = function (game) {
        var exists = false;
        for (var _i = 0, _a = game.players; _i < _a.length; _i++) {
            var player = _a[_i];
            if (player.username === this.player.username) {
                exists = true;
                break;
            }
        }
        return exists;
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