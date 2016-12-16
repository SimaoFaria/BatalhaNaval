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
var GameComponent = (function () {
    //private celulas : number[][];
    function GameComponent(gameService, websocketService) {
        //document.getElementById('container').innerText='';
        var _this = this;
        this.gameService = gameService;
        this.websocketService = websocketService;
        this.COLUMNS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.LINES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        // this._username = 'Cao de Agua';// = JSON.parse(localStorage.getItem('currentUser')); //TODO passar para o login
        this._username = JSON.parse(localStorage.getItem('currentUser')).username;
        //DUVIDA(simão) => porquê?
        this.gameService.setUsername(this._username);
        this.playerStateGame = [];
        this.tabuleiro = new tabuleiro_1.Tabuleiro();
        //TODO so para testar
        var value = 12;
        // let username : string;
        // username = 'Cao de Agua';
        /*this.gameService.getCurrentGames(username)
                .subscribe((response) => this.games = response);*/
        this.gameService.getCurrentStateGames(this._username)
            .subscribe(function (response) {
            // console.log("------ No CLIENTE -------");
            // console.dir(response);
            // console.log("------ FIM No CLIENTE -------");
            _this.playerStateGame = response;
            // this.playerStateGame.forEach((game) => {
            // });
            //this.playerStateGame[0].boardDefense.adicionaNavio(TipoNavio.PortaAvioes, Orientacao.Normal, 'A', 1);
            // console.log("------ No CLIENTE -------");
            // console.dir(this.playerStateGame );
            // console.log("------ FIM No CLIENTE -------");
        });
        //desenhaTabuleiro();
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
    // addNavio(_id : string) : void {
    //   console.log("add navio");
    //
    //   document.getElementById('msgerro').innerText='';
    //   try {
    //       let tipo = (document.getElementById('tiponavio') as any).value;
    //       let orient = (document.getElementById('orientacao') as any).value;
    //       let linha =  (document.getElementById('linha') as any).value;
    //       if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].indexOf(linha) < 0){
    //           throw Error("Linha Inválida");
    //       }
    //
    //       let coluna =  (document.getElementById('coluna') as any).value;
    //       let tipoNavio = TipoNavio.PortaAvioes;
    //       switch (tipo) {
    //           case "1": tipoNavio = TipoNavio.Couracado;
    //               break;
    //           case "2": tipoNavio = TipoNavio.Cruzador;
    //               break;
    //           case "3": tipoNavio = TipoNavio.ContraTorpedeiro;
    //               break;
    //           case "4": tipoNavio = TipoNavio.Submarino;
    //               break;
    //       }
    //       let orientacao = Orientacao.Normal;
    //       switch (orient) {
    //           case "1": orientacao = Orientacao.Roda90;
    //               break;
    //           case "2": orientacao = Orientacao.Roda180;
    //               break;
    //           case "3": orientacao = Orientacao.Roda270;
    //               break;
    //       }
    //       // Força cast para numero
    //       let col : number = +coluna;
    //       this.tabuleiro.adicionaNavio(tipoNavio, orientacao, linha, col);
    //       //this.games.getTabuleiroDefesaByID(_id).adicionaNavio(tipoNavio, orientacao, linha, col);
    //
    //       //console.table(this.tabuleiro);
    //
    //       //this.desenhaTabuleiro();
    //   } catch (e) {
    //       document.getElementById('msgerro').innerText=e;
    //   }
    //
    // }
    GameComponent.prototype.ready = function (idGame) {
        for (var _i = 0, _a = this.playerStateGame; _i < _a.length; _i++) {
            var game = _a[_i];
            if (game.idGame == idGame) {
                if (game.boardDefense.isConfigDone() === false) {
                    alert("Ainda não tem as peças todas");
                }
                else {
                    // alert("Começar jogo");
                    //console.log(game);
                    //TODO SIMAO estou a usar o websocket aqui uma vez que não dá para trabalhar o response(o gameService devolve o response como undefined)
                    // inicio websockets
                    var json = {
                        myMessage: 'I\'m ready.',
                        othersMessage: 'Player ' + JSON.parse(localStorage.getItem("currentUser")).username + ' is ready.'
                    };
                    this.websocketService.useNotifications(idGame + ' notifications', json);
                    // fim websockets
                    //TODO SIMAO nao faz sentido mudar aqui, so no ultimo a fazer ready ou no gajo que comece o jogo
                    // game.status = PlayerStateGame.gameStatus_toString(GameStatus.INPROGRESS);
                    game.status = game_1.PlayerStateGame.gameStatus_toString(game_1.GameStatus.READY);
                    this.gameService.putCurrentStateGames(game, true)
                        .subscribe(function (response) {
                        console.log("response do READY");
                        console.log(response);
                        console.log("/response do READY");
                        // this.websocketService
                        // this.playerStateGame = response; //TODO
                        //
                        // console.log("esperaça!!!");
                        // console.log(this.playerStateGame);
                        // console.log("fim da esperaça!!!");
                        //
                        // console.dir(this.playerStateGame[0].boardDefense.navios);
                        //this.playerStateGame[0].boardDefense.adicionaNavio(TipoNavio.PortaAvioes, Orientacao.Normal, 'A', 1);
                    });
                }
            }
        }
        // for (let game of this.playerStateGame) {
        //     if(game.idGame == idGame) {
        //
        //         //enivas as cenas para a bd
        //         this.gameService.putCurrentStateGames(game)
        //             .subscribe((response) => {
        //
        //                 // this.playerStateGame = response;
        //                 //
        //                 // console.log("esperaça!!!");
        //                 // console.log(this.playerStateGame);
        //                 // console.log("fim da esperaça!!!");
        //                 //
        //                 // console.dir(this.playerStateGame[0].boardDefense.navios);
        //
        //                 //this.playerStateGame[0].boardDefense.adicionaNavio(TipoNavio.PortaAvioes, Orientacao.Normal, 'A', 1);
        //
        //
        //         });
        //
        //         //break; //TODO avriguar a situation
        //     }
        // }
        //se tudo ok
        //mete a cena dos ships invisivel
    };
    GameComponent.prototype.shot = function (idGame, opponentUsername, line, column) {
        //alert("Game " + idGame + " Shot on : " + opponentUsername + " line: " + line + " column" + column);
        var _this = this;
        var _loop_1 = function(game) {
            if (game.idGame == idGame) {
                //ver se foi tiro ?
                var resp = void 0;
                this_1.gameService.putHasShotCurrentStateGamePerUsernameByPosition(idGame, opponentUsername, line, column)
                    .subscribe(function (response) {
                    // console.log("=======> TIRO ");
                    // console.dir(response);
                    // alert("TIRO: "+ response);
                    // alert("TIRO: "+ response.shot);
                    // resp = response;
                    // this.playerStateGame = response; //TODO ?
                    for (var _i = 0, _a = game.boardsAttack; _i < _a.length; _i++) {
                        var attackBoard = _a[_i];
                        if (attackBoard.getUsername() == opponentUsername) {
                            // attackBoard.setValue(line, column, (resp != '' ? 'X' : '0' ));
                            attackBoard.setValue(line, column, (response.shot != '' ? 'X' : '0'));
                            //inicio websockets
                            var json = {
                                myMessage: 'You shot (' + line + ', ' + column + ') and ',
                                othersMessage: 'Player ' + JSON.parse(localStorage.getItem("currentUser")).username + ' shot (' + line + ', ' + column + ') and '
                            };
                            //TODO SIMAO por agora recebo a string do response, mas se a response devolvesse um object seria mais facil
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
                                json.myMessage = 'Congratulations! You have sank ' + response.shipType + '.';
                                json.othersMessage = 'Player ' + JSON.parse(localStorage.getItem("currentUser")).username + ' has sank ' + response.shipType + '.';
                                _this.websocketService.useNotifications(idGame + ' notifications', json);
                            }
                            // TODO ainda falta tratar da situação de o jogador ter ficado sem navios
                            if (response.allShipsSanked) {
                                json.myMessage = 'Player TODO has all ship sank.';
                                json.othersMessage = 'Player TODO has all ship sank.';
                                _this.websocketService.useNotifications(idGame + ' notifications', json);
                            }
                            // TODO ainda falta tratar da situação do jogo terminar
                            //fim websockets
                            //TODO fazer post para a bd
                            _this.gameService.putCurrentStateGames(game, false)
                                .subscribe(function (response) {
                                // this.playerStateGame = response; //TODO
                            });
                        }
                    }
                });
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.playerStateGame; _i < _a.length; _i++) {
            var game = _a[_i];
            _loop_1(game);
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
    GameComponent.prototype.desenhaTabuleiro = function () {
        /*document.getElementById('msgerro').innerText='';
        try {
            document.getElementById('tabela').innerHTML = "";
            let plainHtml = "";
            Tabuleiro.todasLinhas().forEach(linha => {
                plainHtml += "<tr><td>" + linha + "</td>";
                Tabuleiro.todasColunas().forEach(coluna => {
                    if (this.tabuleiro.getCelula(linha, coluna).tipo == TipoCelula.Navio)
                        plainHtml += "<td>X</td>";
                    else
                        if (Posicao.existe(new Posicao(linha, coluna), this.tabuleiro.posicoesOcupadas))
                            plainHtml += "<td>.</td>";
                        else
                            plainHtml += "<td>&nbsp</td>";
  
                });
                plainHtml += "</tr>";
            });
            plainHtml += "<tr><td></td>";
            Tabuleiro.todasColunas().forEach(coluna => {
                    plainHtml += "<td>"+coluna+"</td>";
            });
            plainHtml += "</tr>";
            document.getElementById('tabela').innerHTML = plainHtml;
  
  
            plainHtml = "";
            document.getElementById('listanavios').innerHTML = "";
            this.tabuleiro.navios.forEach(navio => {
                plainHtml += "<li>"+navio.posicao.strValue()+" Tipo=" + navio.tipoNavio+ ", Orientação="+ navio.orientacao+"</li>";
            });
            document.getElementById('listanavios').innerHTML = plainHtml;
            
        } catch (e) {
            document.getElementById('msgerro').innerText=e;
        }*/
    };
    GameComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-game',
            templateUrl: './game.html',
            // styles: [`.selected {
            //   background-color: #CFD8DC !important;
            //   color: white;
            // }`]
            styleUrls: [
                './game-attack-simao.css',
                './game-defend-simao.css'
            ]
        }), 
        __metadata('design:paramtypes', [game_service_1.GameService, websocket_service_1.WebSocketService])
    ], GameComponent);
    return GameComponent;
}());
exports.GameComponent = GameComponent;
//# sourceMappingURL=game.component.js.map