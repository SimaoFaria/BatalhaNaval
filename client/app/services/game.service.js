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
var board_attack_1 = require("../game-naval-battle/models/board-attack");
var authentication_service_1 = require("../login-register/_services/authentication.service");
var GameService = (function () {
    function GameService(http, auth) {
        this.http = http;
        this.auth = auth;
        this.playerStateGame = [];
        this.token = this.auth.token;
    }
    GameService.prototype.setUsername = function (username) {
        this._username = username;
    };
    GameService.prototype.getCurrentGames = function (username) {
        var _this = this;
        return this.http.get('/api/v1/current-games/' + username)
            .map(function (response) { return _this.games = response.json(); });
    };
    /**
     *
     * */
    GameService.prototype.putHasShotCurrentStateGamePerUsernameByPosition = function (idGame, opponentUsername, line, column, username) {
        //DEBUG
        // console.log("idGame:"+idGame);
        // console.log("opponentUsername:"+opponentUsername);
        // console.log("line:"+line);
        // console.log("column"+column);
        var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + this.token });
        var options = new http_1.RequestOptions({ headers: headers });
        var bodyJSONObj = {
            "opponentUsername": opponentUsername,
            "line": line,
            "column": column,
            "username": username
        };
        //DEGUB
        console.dir(bodyJSONObj);
        return this.http.post('/api/v1/current-state-games-shot/' + idGame, bodyJSONObj)
            .map(function (response) { return response.json(); });
    };
    /**
     *
     * */
    GameService.prototype.putCurrentStateGames = function (playerStateGame, updateStatus) {
        var _this = this;
        var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + this.token });
        var options = new http_1.RequestOptions({ headers: headers });
        var shipsforBD = [];
        for (var _i = 0, _a = playerStateGame.boardDefense.navios; _i < _a.length; _i++) {
            var navio = _a[_i];
            var orientation_1 = navio_1.Navio.orientation_toString(navio.orientacao);
            var type = navio_1.Navio.type_toString(navio.tipoNavio);
            shipsforBD.push(new navio_1.ShipForDB(new navio_1.Position(navio.posicao.linha.toString(), navio.posicao.coluna), type, orientation_1, navio.posicoesOcupadas // occupiedPositions
            ));
        }
        var boardsAttack = [];
        for (var _b = 0, _c = playerStateGame.boardsAttack; _b < _c.length; _b++) {
            var boardAttack = _c[_b];
            var board = [];
            for (var _d = 0, _e = boardAttack.board; _d < _e.length; _d++) {
                var cellsAttack = _e[_d];
                //boardsAttack.push(board);
                board.push(cellsAttack);
            }
            boardsAttack.push({ "username": boardAttack.username, "board": board });
        }
        var bodyJSON = {
            "username": this._username,
            "status": playerStateGame.status,
            "updateStatus": updateStatus,
            "boardDefense": shipsforBD,
            "boardsAttack": boardsAttack
        };
        var body = bodyJSON;
        return this.http.put('/api/v1/current-state-games/' + playerStateGame.idGame, body)
            .map(function (response) {
            return _this.playerStateGame = response.json();
        });
    };
    GameService.prototype.getCurrentStateGames = function (username) {
        var _this = this;
        return this.http.get('/api/v1/current-state-games/' + username)
            .map(function (response) { return response.json(); })
            .map(function (playerStateGames) {
            // console.log("I - GAME.SERVICE");
            // console.log(playerStateGames);
            // console.log("F - GAME.SERVICE");
            _this.playerStateGame = null;
            _this.playerStateGame = [];
            playerStateGames.forEach(function (playerStateGame) {
                var boardDefense;
                boardDefense = new board_defense_1.BoardDefense();
                //tabuleiro 0 é o da defesa
                playerStateGame.boardDefense.forEach(function (ship) {
                    var orientation = ship.orientation;
                    var line = ship.position.line;
                    var column = ship.position.column;
                    // let line = ship.initialPosition.line;
                    // let column = ship.initialPosition.column;
                    var type = ship.type;
                    var ship_orientation;
                    var ship_position;
                    var ship_type;
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
                    boardDefense.adicionaNavio(ship_type, ship_orientation, ship_position.linha, ship_position.coluna);
                });
                var boardsAttack = [];
                if (!(playerStateGame.boardsAttack === undefined)) {
                    // // console.log("####################################################################################################################");
                    // // console.dir(playerStateGame.boardsAttack);
                    for (var _i = 0, _a = playerStateGame.boardsAttack; _i < _a.length; _i++) {
                        var attackBoard = _a[_i];
                        // console.dir(attackBoard);
                        var username_1 = attackBoard.username;
                        var stillInGame = attackBoard.stillInGame;
                        // console.log("username :" + username);
                        // let board : CellAttack[] = attackBoard.board;
                        // // console.log("board :");
                        // console.dir(attackBoard);
                        var boardAttack = [];
                        for (var _b = 0, _c = attackBoard.board; _b < _c.length; _b++) {
                            var cell = _c[_b];
                            // console.log("line: "+cell.line);
                            // console.log("column: "+cell.column);
                            // console.log("value: "+cell.value);
                            boardAttack.push(new game_1.CellAttack(cell.line, cell.column, cell.value, cell.sank));
                        }
                        // console.dir(boardAttack);
                        var bo = new board_attack_1.BoardAttack(username_1, stillInGame, boardAttack);
                        // console.log("bo");
                        // console.dir(bo);
                        boardsAttack.push(bo);
                    }
                }
                var playerStateGameDs = new game_1.PlayerStateGame(playerStateGame.idGame, playerStateGame.status, boardDefense, boardsAttack, playerStateGame.isPlaying, playerStateGame.won);
                // playerStateGameDs.user = playerStateGame.username;
                playerStateGameDs._username = playerStateGame.username;
                playerStateGameDs.currentPlayer = playerStateGame.currentPlayer;
                playerStateGameDs.nrShotsRemaining = playerStateGame.nrShotsRemaining;
                //playerStateGameDs._username = playerStateGame.username;
                // console.log("ramr");    
                //  console.dir(playerStateGameDs);
                _this.playerStateGame.push(
                // new PlayerStateGame(
                //     playerStateGame.idGame,
                //     playerStateGame.status,
                //     boardDefense,
                //     boardsAttack
                // )
                playerStateGameDs);
            });
            // console.log("-----------server side----------");
            // console.log(playerStateGames);
            // console.log("-----------server side----------");
            return _this.playerStateGame;
        });
    };
    GameService.prototype.putReadyOnGame = function (game) {
        game.status = game_1.PlayerStateGame.gameStatus_toString(game_1.GameStatus.READY);
        var shipsforBD = [];
        for (var _i = 0, _a = game.boardDefense.navios; _i < _a.length; _i++) {
            var navio = _a[_i];
            var orientation_2 = navio_1.Navio.orientation_toString(navio.orientacao);
            var type = navio_1.Navio.type_toString(navio.tipoNavio);
            shipsforBD.push(new navio_1.ShipForDB(new navio_1.Position(navio.posicao.linha.toString(), navio.posicao.coluna), type, orientation_2, navio.posicoesOcupadas));
        }
        var body = {
            "username": this._username,
            "status": game.status,
            "boardDefense": shipsforBD
        };
        return this.http.put('/api/v1/ready-on-game/' + game.idGame, body)
            .map(function (response) { return response.json(); });
    };
    GameService.prototype.closeGame = function (idGame) {
        var body = {
            "username": this._username
        };
        return this.http.put('/api/v1/close-game/' + idGame, body)
            .map(function (response) { return response.json(); });
    };
    GameService._G_BOARDDEFENSE = 0;
    GameService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, authentication_service_1.AuthenticationService])
    ], GameService);
    return GameService;
}());
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map