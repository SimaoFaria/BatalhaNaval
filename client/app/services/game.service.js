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
var http_1 = require('@angular/http');
var game_1 = require('./../game-naval-battle/game');
var board_defense_1 = require("../game-naval-battle/models/board-defense");
var posicao_1 = require("../game-naval-battle/posicao");
var navio_1 = require("../game-naval-battle/navio");
var GameService = (function () {
    function GameService(http) {
        this.http = http;
        this.playerStateGame = [];
    }
    /*starGame(idGame : number):Observable<Game>{
        return this.http.get('/api/v1/create-game/' + idGame)
            .map((response) => this.game = response.json());
    }*/
    GameService.prototype.getCurrentGames = function (username) {
        var _this = this;
        return this.http.get('/api/v1/current-games/' + username)
            .map(function (response) { return _this.games = response.json(); });
        //TODO
        //por o json num arrya de game para mandar para o cliente
    };
    GameService.prototype.getCurrentStateGames = function (username) {
        /*return this.http.get('/api/v1/current-state-games/' + username)
            .map((response) => this.playerStateGame = response.json());*/
        var _this = this;
        return this.http.get('/api/v1/current-state-games/' + username)
            .map(function (response) { return response.json(); })
            .map(function (playerStateGames) {
            _this.playerStateGame = [];
            playerStateGames.forEach(function (playerStateGame) {
                var boardDefense;
                boardDefense = new board_defense_1.BoardDefense();
                playerStateGame.players[0].tabuleiros[0].boardDefense.forEach(function (ship) {
                    // console.log("XXXXXXXXXXXXXXXXX");
                    // console.log(ships);
                    // console.log("XXXXXXXXXXXXXXXXX");
                    //let type = ship.type; //TODO
                    var type = navio_1.TipoNavio.PortaAvioes;
                    var allPositions = [];
                    ship.positions.forEach(function (position) {
                        allPositions.push(new posicao_1.Posicao(position.line.toString(), position.column));
                        console.log("position=> linha: " + "'" + position.line.toString() + "coluna: " + "'" + position.column + "'");
                    });
                    console.log("allPositions: ");
                    console.dir(allPositions);
                    console.log("passou antes....");
                    boardDefense.adicionaNavioToDefenseBoard(type, allPositions);
                    console.log("passou....");
                });
                // console.log("##################################");
                // console.log(playerStateGame.players[0].tabuleiros[0]);
                // console.log("##################################");
                _this.playerStateGame.push(new game_1.PlayerStateGame(playerStateGame._id, playerStateGame.status, boardDefense));
            });
            console.log("-----------server side----------");
            console.log(playerStateGames);
            console.log("-----------server side----------");
            return _this.playerStateGame;
        });
        // return this.http.get('/api/v1/current-state-games/' + username)
        //     .map((response) => {
        //
        //         console.log("-------------------");
        //         let size = response.json().length;
        //         if(size > 0){
        //
        //                 /*console.log(response.json()[1]._id);
        //                 console.log(response.json()[1].players[0].tabuleiros[0]);
        //
        //                 return [{
        //                     id: response.json()[0]._id,
        //                     status: response.json()[0].status,
        //                     boardDefense: response.json()[0].players[0].tabuleiros[0]
        //                 },
        //                     {
        //                         id: response.json()[1]._id,
        //                         status: response.json()[1].status,
        //                         boardDefense: response.json()[1].players[0].tabuleiros[0]
        //                     }
        //                 ];*/
        //
        //         }else{
        //             this.playerStateGame = response.json(); //[]
        //         }
        //
        //
        //         console.log("-------------------");
        //
        //     });
    };
    GameService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], GameService);
    return GameService;
}());
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map