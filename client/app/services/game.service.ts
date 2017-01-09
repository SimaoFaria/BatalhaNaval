import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import {Game, PlayerStateGame, CellAttack, GameStatus} from './../game-naval-battle/game';
import {BoardDefense} from "../game-naval-battle/models/board-defense";
import {Posicao} from "../game-naval-battle/posicao";
import {TipoNavio, Orientacao, Navio, ShipForDB, Position} from "../game-naval-battle/navio";
import {BoardAttack} from "../game-naval-battle/models/board-attack";
import {AuthenticationService} from "../login-register/_services/authentication.service";


@Injectable()
export class GameService {

    public static _G_BOARDDEFENSE : number = 0;

    private _username : string;

    private games: Game[];
    private playerStateGame: PlayerStateGame[];


    private token : string;

    constructor(private http: Http, private auth: AuthenticationService){
        this.playerStateGame = [];
        this.token = this.auth.token;
    }

    setUsername(username : string) {
        this._username = username;
    }

    getCurrentGames(username : string):Observable<Game[]>{

        return this.http.get('/api/v1/current-games/' + username)
            .map((response: any) => this.games = response.json());
    }


    /**
     *
     * */
    putHasShotCurrentStateGamePerUsernameByPosition(idGame, opponentUsername, line, column, username) : Observable<string> {

        //DEBUG
        // console.log("idGame:"+idGame);
        // console.log("opponentUsername:"+opponentUsername);
        // console.log("line:"+line);
        // console.log("column"+column);

        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        let options = new RequestOptions({ headers: headers });


        let bodyJSONObj = {
            "opponentUsername" : opponentUsername,
            "line" : line,
            "column": column,
            "username": username
        };

        //DEGUB
        console.dir(bodyJSONObj);

        return this.http.post('/api/v1/current-state-games-shot/' + idGame, bodyJSONObj)
            .map((response: any) => response.json());
    }

    /**
     *
     * */
    putCurrentStateGames(playerStateGame : PlayerStateGame, updateStatus : boolean) :Observable<PlayerStateGame>{

        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        let options = new RequestOptions({ headers: headers });

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
            "updateStatus" : updateStatus,
            "boardDefense" : shipsforBD,
            "boardsAttack" : boardsAttack
        };


        let body = bodyJSON;

        return this.http.put('/api/v1/current-state-games/' + playerStateGame.idGame, body)
            .map((response) =>
                this.playerStateGame = response.json()
            );
    }


    getCurrentStateGames(username : string):Observable<PlayerStateGame[]>{

        return this.http.get('/api/v1/current-state-games/' + username)

            .map((response: any) => <PlayerStateGame[]>response.json())
            .map((playerStateGames: any) => {

                // console.log("I - GAME.SERVICE");
                // console.log(playerStateGames);
                // console.log("F - GAME.SERVICE");

                this.playerStateGame = null;
                this.playerStateGame = [];


                playerStateGames.forEach((playerStateGame: any) => {

                    let boardDefense : BoardDefense;
                    boardDefense = new BoardDefense();



                    //tabuleiro 0 é o da defesa
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
                            let stillInGame : boolean = attackBoard.stillInGame;
                            // console.log("username :" + username);

                            // let board : CellAttack[] = attackBoard.board;
                            // // console.log("board :");
                            // console.dir(attackBoard);

                            let boardAttack : CellAttack[] = [];
                            for (let cell of attackBoard.board) {

                                // console.log("line: "+cell.line);
                                // console.log("column: "+cell.column);
                                // console.log("value: "+cell.value);

                                boardAttack.push(new CellAttack(cell.line, cell.column, cell.value, cell.sank));

                            }

                            // console.dir(boardAttack);

                            let bo : BoardAttack = new BoardAttack(username, stillInGame, boardAttack);
                            // console.log("bo");
                            // console.dir(bo);

                            boardsAttack.push(bo);
                            // console.dir(boardsAttack);


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
                            boardsAttack,
                            playerStateGame.isPlaying,
                            playerStateGame.won
                        );

                    // playerStateGameDs.user = playerStateGame.username;
                    playerStateGameDs._username = playerStateGame.username;


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
    }


    
    putReadyOnGame(game : PlayerStateGame) : Observable<PlayerStateGame>{



        game.status = PlayerStateGame.gameStatus_toString(GameStatus.READY);

        let shipsforBD: ShipForDB[] = [];
        for (let navio of game.boardDefense.navios) {

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
                        navio.posicoesOcupadas
                    )
            )

        }

        let body = {
            "username" : this._username,
            "status" : game.status,
            "boardDefense" : shipsforBD
        };

        return this.http.put('/api/v1/ready-on-game/' + game.idGame, body)
            .map((response: any) => response.json());
    }

    closeGame(idGame: string) : Observable<PlayerStateGame> {
        
        let body = {
            "username" : this._username
        };

        return this.http.put('/api/v1/close-game/' + idGame, body)
            .map((response: any) => response.json());
    }
}