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
var GameComponent = (function () {
    //private celulas : number[][];
    function GameComponent(gameService) {
        var _this = this;
        this.gameService = gameService;
        this.COLUMNS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.LINES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        this._username = 'Cao de Agua'; //TODO passar para o login
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
            _this.playerStateGame = response;
            //this.playerStateGame[0].boardDefense.adicionaNavio(TipoNavio.PortaAvioes, Orientacao.Normal, 'A', 1);
            console.log("------ No CLIENTE -------");
            console.dir(_this.playerStateGame);
            console.log("------ FIM No CLIENTE -------");
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
                    alert("Começar jogo");
                    game.status = game_1.PlayerStateGame.gameStatus_toString(game_1.GameStatus.INPROGRESS);
                    this.gameService.putCurrentStateGames(game, true)
                        .subscribe(function (response) {
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
        __metadata('design:paramtypes', [game_service_1.GameService])
    ], GameComponent);
    return GameComponent;
}());
exports.GameComponent = GameComponent;
//# sourceMappingURL=game.component.js.map