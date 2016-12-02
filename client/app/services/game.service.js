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
    GameService.prototype.putCurrentStateGames = function (playerStateGame) {
        console.log("VEIO AQUI VER !!!!!!!!!!!!!!!");
        var body;
        var shipsforBD = [];
        for (var _i = 0, _a = playerStateGame.boardDefense.navios; _i < _a.length; _i++) {
            var navio = _a[_i];
            //TODO fazer isto bem feitinho com uma class nova do ship para a db
            var type = void 0;
            var orientation_1 = void 0;
            switch (navio.orientacao) {
                case navio_1.Orientacao.Normal:
                    orientation_1 = 'Normal';
                    break;
                case navio_1.Orientacao.Roda90:
                    orientation_1 = 'Roda90';
                    break;
                case navio_1.Orientacao.Roda180:
                    orientation_1 = 'Roda180';
                    break;
                case navio_1.Orientacao.Roda270:
                    orientation_1 = 'Roda270';
                    break;
            }
            switch (navio.tipoNavio) {
                case navio_1.TipoNavio.PortaAvioes:
                    type = 'PortaAvioes';
                    break;
                case navio_1.TipoNavio.Couracado:
                    type = 'Couracado';
                    break;
                case navio_1.TipoNavio.Cruzador:
                    type = 'Cruzador';
                    break;
                case navio_1.TipoNavio.ContraTorpedeiro:
                    type = 'ContraTorpedeiro';
                    break;
                case navio_1.TipoNavio.Submarino:
                    type = 'Submarino';
                    break;
            }
            shipsforBD.push(new navio_1.ShipForDB(new navio_1.Position(navio.posicao.linha.toString(), navio.posicao.coluna), type, orientation_1));
        }
        console.log("********* AQUI ***********");
        body = JSON.stringify(shipsforBD);
        console.log(body);
        console.log("********* END AQUI ***********");
        return this.http.put('/api/v1/current-state-games/' + playerStateGame.idGame, body)
            .map(function (response) {
            //this.games = response.json();
            console.log("PUT");
            console.dir(response.json());
            console.log("END PUT");
        });
    };
    GameService.prototype.getCurrentGames = function (username) {
        var _this = this;
        return this.http.get('/api/v1/current-games/' + username)
            .map(function (response) { return _this.games = response.json(); });
        //TODO
        //por o json num arrya de game para mandar para o cliente
    };
    GameService.prototype.getCurrentStateGames = function (username) {
        var _this = this;
        return this.http.get('/api/v1/current-state-games/' + username)
            .map(function (response) { return response.json(); })
            .map(function (playerStateGames) {
            _this.playerStateGame = [];
            playerStateGames.forEach(function (playerStateGame) {
                var boardDefense;
                boardDefense = new board_defense_1.BoardDefense();
                //tabuleiro 0 é o da defesa
                playerStateGame.players[0].tabuleiros[0].boardDefense.forEach(function (ship) {
                    console.log("XXXXXXXXX  XXXXXXXX");
                    console.log(ship.orientation);
                    console.log(ship.position.line);
                    console.log(ship.position.column);
                    console.log(ship.type);
                    console.log("XXXXXXXXX  XXXXXXXX");
                    var orientation = ship.orientation;
                    var line = ship.position.line;
                    var column = ship.position.column;
                    var type = ship.type;
                    var ship_orientation;
                    var ship_position;
                    var ship_type;
                    //TODO fazer pela foreach pela lista de enumns para ORIENTACAO e TIPOBARCO
                    switch (orientation) {
                        case 'Normal':
                            ship_orientation = navio_1.Orientacao.Normal;
                            break;
                        case 'Roda90':
                            ship_orientation = navio_1.Orientacao.Roda90;
                            break;
                        case 'Roda180':
                            ship_orientation = navio_1.Orientacao.Roda180;
                            break;
                        case 'Roda270':
                            ship_orientation = navio_1.Orientacao.Roda270;
                            break;
                    }
                    ship_position = new posicao_1.Posicao(line, column);
                    switch (type) {
                        case 'PortaAvioes':
                            ship_type = navio_1.TipoNavio.PortaAvioes;
                            break;
                        case 'Couracado':
                            ship_type = navio_1.TipoNavio.Couracado;
                            break;
                        case 'Cruzador':
                            ship_type = navio_1.TipoNavio.Cruzador;
                            break;
                        case 'ContraTorpedeiro':
                            ship_type = navio_1.TipoNavio.ContraTorpedeiro;
                            break;
                        case 'Submarino':
                            ship_type = navio_1.TipoNavio.Submarino;
                            break;
                    }
                    boardDefense.adicionaNavio(ship_type, ship_orientation, 'A', 1);
                });
                _this.playerStateGame.push(new game_1.PlayerStateGame(playerStateGame._id, playerStateGame.status, boardDefense));
            });
            console.log("-----------server side----------");
            console.log(playerStateGames);
            console.log("-----------server side----------");
            return _this.playerStateGame;
        });
        // getCurrentStateGames_ANTIIGO(username : string):Observable<PlayerStateGame[]>{
        //
        //         /*return this.http.get('/api/v1/current-state-games/' + username)
        //          .map((response) => this.playerStateGame = response.json());*/
        //
        //         return this.http.get('/api/v1/current-state-games/' + username)
        //             .map(response => <PlayerStateGame[]>response.json())
        //             .map((playerStateGames) => {
        //
        //                 this.playerStateGame = [];
        //
        //                 playerStateGames.forEach((playerStateGame) => {
        //
        //                     let boardDefense : BoardDefense;
        //                     boardDefense = new BoardDefense();
        //
        //                     playerStateGame.players[0].tabuleiros[0].boardDefense.forEach((ship) => {
        //
        //                         // console.log("XXXXXXXXXXXXXXXXX");
        //                         // console.log(ships);
        //                         // console.log("XXXXXXXXXXXXXXXXX");
        //
        //                         //let type = ship.type; //TODO
        //                         let type = TipoNavio.PortaAvioes;
        //
        //
        //                         let allPositions: Posicao[] = [];
        //                         ship.positions.forEach((position) => {
        //                             allPositions.push(new Posicao(position.line.toString(), position.column));
        //                             console.log("position=> linha: "+ "'" +position.line.toString() + "coluna: "+ "'" + position.column + "'" );
        //                         });
        //
        //                         console.log("allPositions: ");
        //                         console.dir(allPositions);
        //
        //
        //                         console.log("passou antes....");
        //                         boardDefense.adicionaNavioToDefenseBoard(type, allPositions);
        //
        //                         console.log("passou....");
        //
        //                     });
        //
        //                     // console.log("##################################");
        //                     // console.log(playerStateGame.players[0].tabuleiros[0]);
        //                     // console.log("##################################");
        //
        //                     this.playerStateGame.push(
        //                         new PlayerStateGame(
        //                             playerStateGame._id,
        //                             playerStateGame.status,
        //                             boardDefense
        //                         )
        //                     )
        //
        //                 });
        //
        //                 console.log("-----------server side----------");
        //                 console.log(playerStateGames);
        //                 console.log("-----------server side----------");
        //
        //
        //                 return this.playerStateGame;
        //             });
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