import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 

import { Observable } from 'rxjs/Observable';

import {Game, PlayerStateGame, CellAttack} from './../game-naval-battle/game';
import {BoardDefense} from "../game-naval-battle/models/board-defense";
import {Posicao} from "../game-naval-battle/posicao";
import {TipoNavio, Orientacao, Navio, ShipForDB, Position} from "../game-naval-battle/navio";
import {isUndefined} from "util";
import {BoardAttack} from "../game-naval-battle/models/board-attack";


@Injectable()
export class GameService {

    public static _G_BOARDDEFENSE : number = 0;

    private _username : string;

    private games: Game[];
    private playerStateGame: PlayerStateGame[];

    constructor(private http: Http){
        this.playerStateGame = [];
    }

    //TODO [DUVIDA] não da para passar no contrutor no gamecomponent o utilizador??
    setUsername(username : string) {
        this._username = username;
    }

    getCurrentGames(username : string):Observable<Game[]>{

        return this.http.get('/api/v1/current-games/' + username)
            .map((response: any) => this.games = response.json());

        //TODO
        //por o json num arrya de game para mandar para o cliente
    }


    /**
     *
     * */
    putHasShotCurrentStateGamePerUsernameByPosition(idGame, opponentUsername, line, column) : Observable<string> {

        //DEBUG
        // console.log("idGame:"+idGame);
        // console.log("opponentUsername:"+opponentUsername);
        // console.log("line:"+line);
        // console.log("column"+column);

        let bodyJSONObj = {
            "opponentUsername" : opponentUsername,
            "line" : line,
            "column": column,
        };

        //DEGUB
        console.dir(bodyJSONObj);

        return this.http.post('/api/v1/current-state-games-shot/' + idGame, bodyJSONObj)
            .map((response) => response.json());
    }


    /**
     *
     * */
    putCurrentStateGames(playerStateGame : PlayerStateGame, updateStatus : boolean) :Observable<PlayerStateGame>{

        let shipsforBD: ShipForDB[] = [];

        for (let navio of playerStateGame.boardDefense.navios) {

            let orientation : string = Navio.orientation_toString(navio.orientacao);
            let type: string = Navio.type_toString(navio.tipoNavio);

            shipsforBD.push(
                    new ShipForDB(
                        new Position(
                            navio.posicao.linha.toString(),
                            navio.posicao.coluna,
                        ),
                        type,
                        orientation,
                        navio.posicoesOcupadas // occupiedPositions
                    )
            )

        }

        let boardsAttack = [];
        for (let boardAttack of playerStateGame.boardsAttack) {

            let board = [];
            for (let cellsAttack of boardAttack.board) {
                //boardsAttack.push(board);
                board.push(cellsAttack)
            }
            boardsAttack.push({"username" : boardAttack.username, "board": board});
        }


        let bodyJSON = {
            "username" : this._username,
            "status" : playerStateGame.status,
            "updateStatus": updateStatus,
            "boardDefense" : shipsforBD,
            "boardsAttack" : boardsAttack
        };


        let body = bodyJSON;

        return this.http.put('/api/v1/current-state-games/' + playerStateGame.idGame, body)
            .map((response) => 
            // {

                //TODO [DUVIDA] procurar na lista o jogo atualizado e guardar na variavel? mesmo o jogo nao tendo mudado?))
            //     for (let game of this.playerStateGame) {

            //         if(game.idGame === response.json().idGame){
            //             game.boardDefense = null;
            //             game.boardDefense = new BoardDefense();

            //             let naviosJSON = response.json().boardDefense;
            //             for (let navio of naviosJSON) {
            //                 game.boardDefense.adicionaNavio(
            //                     Navio.convertTypeToEnumTipoNavio(navio.type),
            //                     Navio.convertOrientationToEnumOrientacao(navio.orientation),
            //                     navio.position.line,
            //                     navio.position.column);
            //             }
            //         }
            //     }
            // }
                this.playerStateGame = response.json()
            );
    }


    getCurrentStateGames(username : string):Observable<PlayerStateGame[]>{

        return this.http.get('/api/v1/current-state-games/' + username)
            // verso simao para testes 
            // .map((response: any) => 
            // this.playerStateGame = response.json()
            // {
            //     console.log("I - GAME.SERVICE");
            //     console.log(response);
            //     console.log("F - GAME.SERVICE");
            //     return this.playerStateGame = response.json();
            // }
            // );
            
            
            // versao hugo
            .map((response: any) => <PlayerStateGame[]>response.json())
            .map((playerStateGames: any) => {

                // console.log("I - GAME.SERVICE");
                // console.log(playerStateGames);
                // console.log("F - GAME.SERVICE");

                this.playerStateGame = null;
                this.playerStateGame = [];


                playerStateGames.forEach((playerStateGame: PlayerStateGame) => {

                    let boardDefense : BoardDefense;
                    boardDefense = new BoardDefense();



                    //tabuleiro 0 é o da defesa
                    //TODO a prop boardDefense não foi declarada como array provavelmente
                    playerStateGame.boardDefense.forEach((ship: any) => {

                        let orientation = ship.orientation;
                        let line = ship.position.line;
                        let column = ship.position.column;
                        // let line = ship.initialPosition.line;
                        // let column = ship.initialPosition.column;
                        let type = ship.type;

                        let ship_orientation: Orientacao;
                        let ship_position: Posicao;
                        let ship_type: TipoNavio;

                        //TODO fazer pela foreach pela lista de enumns para ORIENTACAO e TIPOBARCO

                        switch (orientation) {
                            case 'Normal':
                                ship_orientation = Orientacao.Normal;
                                break;
                            case 'Roda90':
                                ship_orientation = Orientacao.Roda90;
                                break;
                            case 'Roda180':
                                ship_orientation = Orientacao.Roda180;
                                break;
                            case 'Roda270':
                                ship_orientation = Orientacao.Roda270;
                                break;
                        }

                        ship_position = new Posicao(line, column);

                        switch (type) {
                            case 'PortaAvioes':
                                ship_type = TipoNavio.PortaAvioes;
                                break;
                            case 'Couracado':
                                ship_type = TipoNavio.Couracado;
                                break;
                            case 'Cruzador':
                                ship_type = TipoNavio.Cruzador;
                                break;
                            case 'ContraTorpedeiro':
                                ship_type = TipoNavio.ContraTorpedeiro;
                                break;
                            case 'Submarino':
                                ship_type = TipoNavio.Submarino;
                                break;
                        }


                        boardDefense.adicionaNavio(ship_type, ship_orientation, ship_position.linha, ship_position.coluna);

                    });


                    let boardsAttack : BoardAttack[] = [];
                    if(!(playerStateGame.boardsAttack === undefined)){
                        // // console.log("####################################################################################################################");
                        // // console.dir(playerStateGame.boardsAttack);


                        for (let attackBoard of playerStateGame.boardsAttack) {

                            // console.dir(attackBoard);

                            let username : string = attackBoard.username;
                            // console.log("username :" + username);

                            // let board : CellAttack[] = attackBoard.board;
                            // // console.log("board :");
                            // console.dir(attackBoard);

                            let boardAttack : CellAttack[] = [];
                            for (let cell of attackBoard.board) {

                                // console.log("line: "+cell.line);
                                // console.log("column: "+cell.column);
                                // console.log("value: "+cell.value);

                                boardAttack.push(new CellAttack(cell.line, cell.column, cell.value));
                            }

                            // console.dir(boardAttack);

                            let bo : BoardAttack = new BoardAttack(username, boardAttack);
                            // console.log("bo");
                            // console.dir(bo);




                            boardsAttack.push(bo);
                            // console.dir(boardsAttack);


                            //TODO navios??

                            // let boardAttack : BoardAttack = null;
                            // boardsAttack = new BoardAttack();




                            //playerStateGame.boardsAttack.forEach((attackBoard) => {
                            // attackBoard.forEach((attackBoard) => {
                            // //     console.log("zzz");
                            // //     console.dir(attackBoard);
                            // });
                            //});
                        }
                        // console.log("####################################################################################################################");
                        // console.dir(boardsAttack);
                    }



                    let playerStateGameDs = new PlayerStateGame(
                            playerStateGame.idGame,
                            playerStateGame.status,
                            boardDefense,
                            boardsAttack
                        );

                        playerStateGameDs.user = playerStateGame.username;
                        playerStateGameDs.currentPlayer = playerStateGame.currentPlayer;
                        playerStateGameDs.nrShotsRemaining = playerStateGame.nrShotsRemaining;

                         //playerStateGameDs._username = playerStateGame.username;

                        // console.log("ramr");    
                        //  console.dir(playerStateGameDs);

                    this.playerStateGame.push(
                        // new PlayerStateGame(
                        //     playerStateGame.idGame,
                        //     playerStateGame.status,
                        //     boardDefense,
                        //     boardsAttack
                        // )
                        playerStateGameDs
                    )

                });

                // console.log("-----------server side----------");
                // console.log(playerStateGames);
                // console.log("-----------server side----------");


                return this.playerStateGame;
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

    }

}