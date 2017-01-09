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
var game_service_1 = require('./../services/game.service');
var game_1 = require('./game');
var tabuleiro_1 = require("./tabuleiro");
var navio_1 = require("./navio");
var board_defense_1 = require("./models/board-defense");
var websocket_service_1 = require('../sockets/notifications/websocket.service');
var authentication_service_1 = require("../login-register/_services/authentication.service");
var board_attack_1 = require("./models/board-attack");
var GameComponent = (function () {
    function GameComponent(gameService, websocketService, authenticationService) {
        var _this = this;
        this.gameService = gameService;
        this.websocketService = websocketService;
        this.authenticationService = authenticationService;
        this.COLUMNS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.LINES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        this._username = JSON.parse(localStorage.getItem('currentUser')).username;
        this.gameService.setUsername(this._username);
        this.playerStateGame = [];
        this.tabuleiro = new tabuleiro_1.Tabuleiro();
        this.gameService.getCurrentStateGames(this._username)
            .subscribe(function (response) {
            // console.log("------ No CLIENTE -------");
            // console.dir(response);
            // console.log("------ FIM No CLIENTE -------");
            _this.playerStateGame = response;
            //this.playerStateGame[0].boardDefense.adicionaNavio(TipoNavio.PortaAvioes, Orientacao.Normal, 'A', 1);
            // console.log("------ No CLIENTE -------");
            // console.dir(this.playerStateGame );
            // console.log("------ FIM No CLIENTE -------");
            // ----
            _this.playerStateGame.forEach(function (game) {
                _this.websocketService.joinGameRoom(game.idGame);
            });
            _this.websocketService.getGameState('change game state')
                .subscribe(function (json) {
                console.log("OBTEU JOGO POR SOCKET");
                // console.log("OBTEU JOGO POR SOCKET");
                json.forEach(function (jsonGame) {
                    _this.playerStateGame.forEach(function (myGame) {
                        if (myGame.idGame === jsonGame.idGame
                            && _this._username === jsonGame.username) {
                            // myGame = jsonGame;
                            myGame.status = jsonGame.status;
                        }
                    });
                });
                console.log("/OBTEU JOGO POR SOCKET");
                // console.log("/OBTEU JOGO POR SOCKET");
            });
            _this.websocketService.getCurrentPlayer('update current player')
                .subscribe(function (json) {
                console.log("OBTEU update current player POR SOCKET");
                _this.playerStateGame.forEach(function (myGame) {
                    if (myGame.idGame === json.idGame) {
                        myGame.currentPlayer = json.currentPlayer;
                        myGame.nrShotsRemaining = json.nrShotsRemaining;
                        console.log(myGame.currentPlayer + '|' + myGame.nrShotsRemaining);
                        console.log(json.currentPlayer + '|' + json.nrShotsRemaining);
                    }
                });
                console.log("/OBTEU update current player POR SOCKET");
            });
            _this.websocketService.getCurrentPlayer('update game status')
                .subscribe(function (json) {
                console.log("OBTEU update game status POR SOCKET");
                // console.log(json)
                // console.log(this._username)
                if (_this._username === json.username) {
                    // console.log('SOU EU')
                    _this.playerStateGame.forEach(function (myGame) {
                        if (myGame.idGame === json.idGame) {
                            // console.log('É O MEU JOGO')
                            // myGame = json;
                            myGame.status = json.status;
                        }
                    });
                }
                else if (json.username !== _this._username) {
                    _this.playerStateGame.forEach(function (game) {
                        if (game.idGame === json.idGame) {
                            game.boardsAttack.forEach(function (boardAttack) {
                                if (boardAttack.username === json.username) {
                                    boardAttack.stillInGame = false;
                                }
                            });
                        }
                    });
                }
                console.log("/OBTEU update game status POR SOCKET");
            });
        });
    }
    GameComponent.prototype.addNavioToBoardDefense = function (idGame) {
        document.getElementById('msgerro').innerText = '';
        try {
            var tipo = document.getElementById('tiponavio').value;
            var orient = document.getElementById('orientacao').value;
            var linha = document.getElementById('linha').value;
            if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].indexOf(linha) < 0) {
                throw Error("Linha Inválida");
            }
            var coluna = document.getElementById('coluna').value;
            var tipoNavio = navio_1.TipoNavio.PortaAvioes;
            switch (tipo) {
                case "1":
                    tipoNavio = navio_1.TipoNavio.Couracado;
                    break;
                case "2":
                    tipoNavio = navio_1.TipoNavio.Cruzador;
                    break;
                case "3":
                    tipoNavio = navio_1.TipoNavio.ContraTorpedeiro;
                    break;
                case "4":
                    tipoNavio = navio_1.TipoNavio.Submarino;
                    break;
            }
            var orientacao = navio_1.Orientacao.Normal;
            switch (orient) {
                case "1":
                    orientacao = navio_1.Orientacao.Roda90;
                    break;
                case "2":
                    orientacao = navio_1.Orientacao.Roda180;
                    break;
                case "3":
                    orientacao = navio_1.Orientacao.Roda270;
                    break;
            }
            // Força cast para numero
            var col = +coluna;
            //this.tabuleiro.adicionaNavio(tipoNavio, orientacao, linha, col);
            for (var _i = 0, _a = this.playerStateGame; _i < _a.length; _i++) {
                var game = _a[_i];
                if (game.idGame == idGame) {
                    game.boardDefense.adicionaNavio(tipoNavio, orientacao, linha, col);
                }
            }
        }
        catch (e) {
            document.getElementById('msgerro').innerText = e;
        }
    };
    GameComponent.prototype.ready = function (game) {
        var _this = this;
        if (game.boardDefense.isConfigDone() === false) {
            alert("Ainda não tem as peças todas");
        }
        else {
            // inicio websockets
            var json = {
                myMessage: 'I\'m ready.',
                othersMessage: 'Player ' + JSON.parse(localStorage.getItem("currentUser")).username + ' is ready.'
            };
            this.websocketService.useNotifications(game.idGame + ' notifications', json);
            // fim websockets
            this.gameService.putReadyOnGame(game)
                .subscribe(function (games) {
                if (game.boardsAttack.length + 1 === games.length) {
                    var json_1 = {
                        myMessage: 'Everyone is ready',
                        othersMessage: 'Everyone is ready.'
                    };
                    _this.websocketService.useNotifications(game.idGame + ' notifications', json_1);
                    games.forEach(function (g) {
                        if (g.username === _this._username) {
                            // altero o status do meu jogo
                            game.status = g.status;
                        }
                    });
                    // game.status = PlayerStateGame.gameStatus_toString(GameStatus.INPROGRESS);
                    _this.websocketService.alterGameState(game.idGame, games);
                }
            });
        }
    };
    GameComponent.prototype.shot = function (idGame, opponentUsername, line, column, status, event) {
        //DEGUB
        //alert("Game " + idGame + " Shot on : " + opponentUsername + " line: " + line + " column" + column);
        //alert("username: " + this.authenticationService.username)
        var _this = this;
        if (event.target.value) {
            alert("Já atirou nessa celula.");
            return;
        }
        var _loop_1 = function(game) {
            if (game.idGame == idGame) {
                if (game.currentPlayer != this_1.authenticationService.user.username) {
                    alert("Its not your turn. Wait.");
                    return { value: void 0 };
                }
                else {
                    //ver se foi tiro ?
                    var resp = void 0;
                    this_1.gameService.putHasShotCurrentStateGamePerUsernameByPosition(idGame, opponentUsername, line, column, this_1._username)
                        .subscribe(function (response) {
                        //DEBUG
                        // console.log("=======> TIRO ");
                        // console.dir(response);
                        // alert("TIRO: "+ response);
                        // alert("TIRO: "+ response.shot);
                        // resp = response;
                        // this.playerStateGame = response;
                        console.log(response);
                        game.nrShotsRemaining = response.nrShotsRemaining;
                        game.currentPlayer = response.currentPlayer;
                        // console.log(response.boardAttack);
                        //codigo a funcionar com o construtor
                        var arrayBoardsAttk = [];
                        for (var _i = 0, _a = response.boardAttack; _i < _a.length; _i++) {
                            var boardAtt = _a[_i];
                            arrayBoardsAttk.push(new board_attack_1.BoardAttack(boardAtt.username, boardAtt.stillInGame, boardAtt.board));
                        }
                        game.boardsAttack = arrayBoardsAttk;
                        //inicio websockets
                        var json = {
                            myMessage: 'You shot ' + response.defendingPlayer + '(' + line + ', ' + column + ') and ',
                            // othersMessage: 'Player ' + JSON.parse(localStorage.getItem("currentUser")).username + ' shot '+ response.defendingPlayer + '(' + line + ', ' + column + ') and '
                            othersMessage: 'Player ' + _this._username + ' shot ' + response.defendingPlayer + '(' + line + ', ' + column + ') and '
                        };
                        if (response.shot != '') {
                            json.myMessage += 'hit ' + response.shipType + '.';
                            json.othersMessage += 'hit ' + response.shipType + '.';
                        }
                        else {
                            json.myMessage += 'missed.';
                            json.othersMessage += 'missed.';
                        }
                        _this.websocketService.useNotifications(idGame + ' notifications', json);
                        if (response.sank) {
                            json.myMessage = 'Congratulations! You have sank ' + response.defendingPlayer + ' ' + response.shipType + '.';
                            // json.othersMessage = 'Player ' + JSON.parse(localStorage.getItem("currentUser")).username + ' has sank ' + response.defendingPlayer + ' ' + response.shipType + '.';
                            json.othersMessage = 'Player ' + _this._username + ' has sank ' + response.defendingPlayer + ' ' + response.shipType + '.';
                            _this.websocketService.useNotifications(idGame + ' notifications', json);
                        }
                        if (response.allShipsSanked) {
                            json.myMessage = 'You have sank all ' + response.defendingPlayer + ' ships.';
                            // json.othersMessage = 'Player ' + JSON.parse(localStorage.getItem("currentUser")).username + ' has sank all ' + response.defendingPlayer + ' ships.';
                            json.othersMessage = 'Player ' + _this._username + ' has sank all ' + response.defendingPlayer + ' ships.';
                            _this.websocketService.useNotifications(idGame + ' notifications', json);
                            // manda por websocket o status ENDED ao jogador que perdeu
                            var updateJson_1 = {
                                idGame: idGame,
                                username: opponentUsername,
                                status: game_1.PlayerStateGame.gameStatus_toString(game_1.GameStatus.ENDED),
                            };
                            _this.websocketService.updateGameStatus(idGame, updateJson_1);
                            console.log(response.gameEnded);
                            if (response.gameEnded) {
                                // nao deveria ser assim
                                game.status = game_1.PlayerStateGame.gameStatus_toString(game_1.GameStatus.ENDED);
                                game.won = true;
                                json.myMessage = 'Congratz!! You have won the game!';
                                json.othersMessage = 'Player ' + _this._username + ' has won the game.';
                                _this.websocketService.useNotifications(idGame + ' notifications', json);
                            }
                        }
                        var updateJson = {
                            idGame: idGame,
                            nrShotsRemaining: response.nrShotsRemaining,
                            currentPlayer: response.currentPlayer
                        };
                        _this.websocketService.updateCurrentPlayer(idGame, updateJson);
                        // fim sockets
                    });
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.playerStateGame; _i < _a.length; _i++) {
            var game = _a[_i];
            var state_1 = _loop_1(game);
            if (typeof state_1 === "object") return state_1.value;
        }
    };
    GameComponent.prototype.limparTabuleiro = function (idGame) {
        document.getElementById('msgerro').innerText = '';
        for (var _i = 0, _a = this.playerStateGame; _i < _a.length; _i++) {
            var game = _a[_i];
            if (game.idGame == idGame) {
                game.boardDefense = null;
                game.boardDefense = new board_defense_1.BoardDefense();
            }
        }
    };
    GameComponent.prototype.closeGame = function (idGame) {
        var _this = this;
        this.gameService.closeGame(idGame)
            .subscribe(function (response) {
            console.log('INI - RESPOSTA DO CLOSEGAME');
            console.log(response);
            console.log('FIM - RESPOSTA DO CLOSEGAME');
            _this.playerStateGame.forEach(function (stateGame) {
                if (stateGame.idGame == response.idGame) {
                    stateGame.isPlaying = response.isPlaying;
                }
            });
        });
    };
    GameComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-game',
            templateUrl: './game.html',
            styleUrls: [
                './game-attack.css',
                './game-defend.css'
            ]
        }), 
        __metadata('design:paramtypes', [game_service_1.GameService, websocket_service_1.WebSocketService, authentication_service_1.AuthenticationService])
    ], GameComponent);
    return GameComponent;
}());
exports.GameComponent = GameComponent;
//# sourceMappingURL=game.component.js.map