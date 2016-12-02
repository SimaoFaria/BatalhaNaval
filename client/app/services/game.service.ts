import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 

import { Observable } from 'rxjs/Observable';

import {Game, PlayerStateGame} from './../game-naval-battle/game';
import {BoardDefense} from "../game-naval-battle/models/board-defense";
import {Posicao} from "../game-naval-battle/posicao";
import {TipoNavio, Orientacao, Navio, ShipForDB, Position} from "../game-naval-battle/navio";
import {isUndefined} from "util";


@Injectable()
export class GameService {

    private games: Game[];
    private playerStateGame: PlayerStateGame[];

    constructor(private http: Http){

        this.playerStateGame = [];
    }

    /*starGame(idGame : number):Observable<Game>{
        return this.http.get('/api/v1/create-game/' + idGame)
            .map((response) => this.game = response.json());
    }*/

    putCurrentStateGames(playerStateGame : PlayerStateGame) :Observable<PlayerStateGame>{

        console.log("VEIO AQUI VER !!!!!!!!!!!!!!!");

        let body: string;

        let shipsforBD: ShipForDB[] = [];

        for (let navio of playerStateGame.boardDefense.navios) {

            //TODO fazer isto bem feitinho com uma class nova do ship para a db
            let type : string;
            let orientation: string;

            switch (navio.orientacao) {
                case Orientacao.Normal:
                    orientation = 'Normal';
                    break;
                case Orientacao.Roda90:
                    orientation= 'Roda90';
                    break;
                case Orientacao.Roda180:
                    orientation = 'Roda180';
                    break;
                case Orientacao.Roda270:
                    orientation= 'Roda270';
                    break;
            }

            switch (navio.tipoNavio) {
                case TipoNavio.PortaAvioes:
                    type = 'PortaAvioes';
                    break;
                case TipoNavio.Couracado:
                    type = 'Couracado';
                    break;
                case TipoNavio.Cruzador:
                    type = 'Cruzador';
                    break;
                case TipoNavio.ContraTorpedeiro:
                    type = 'ContraTorpedeiro';
                    break;
                case TipoNavio.Submarino:
                    type = 'Submarino';
                    break;
            }


            shipsforBD.push(
                    new ShipForDB(
                        new Position(
                            navio.posicao.linha.toString(),
                            navio.posicao.coluna,
                        ),
                        type,
                        orientation
                    )
            )
        }


        console.log("********* AQUI ***********");
        body =  JSON.stringify(shipsforBD);
        console.log(body);
        console.log("********* END AQUI ***********");

        return this.http.put('/api/v1/current-state-games/' + playerStateGame.idGame, body)
            .map((response) => {
                //this.games = response.json();

                console.log("PUT");
                console.dir(response.json());
                console.log("END PUT");
            });

    }


    
    getCurrentGames(username : string):Observable<Game[]>{

        return this.http.get('/api/v1/current-games/' + username)
            .map((response) => this.games = response.json());

            //TODO
            //por o json num arrya de game para mandar para o cliente
    }


    getCurrentStateGames(username : string):Observable<PlayerStateGame[]>{

        return this.http.get('/api/v1/current-state-games/' + username)
            .map(response => <PlayerStateGame[]>response.json())
            .map((playerStateGames) => {

                this.playerStateGame = [];


                playerStateGames.forEach((playerStateGame) => {

                    let boardDefense : BoardDefense;
                    boardDefense = new BoardDefense();


                    //tabuleiro 0 é o da defesa
                    playerStateGame.players[0].tabuleiros[0].boardDefense.forEach((ship) => {

                        console.log("XXXXXXXXX  XXXXXXXX");
                        console.log(ship.orientation);
                        console.log(ship.position.line);
                        console.log(ship.position.column);
                        console.log(ship.type);
                        console.log("XXXXXXXXX  XXXXXXXX");

                        let orientation = ship.orientation;
                        let line = ship.position.line;
                        let column = ship.position.column;
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


                        boardDefense.adicionaNavio(ship_type, ship_orientation, 'A', 1);

                    });

                    this.playerStateGame.push(
                        new PlayerStateGame(
                            playerStateGame._id,
                            playerStateGame.status,
                            boardDefense
                        )
                    )

                });

                console.log("-----------server side----------");
                console.log(playerStateGames);
                console.log("-----------server side----------");


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