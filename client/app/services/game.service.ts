import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 

import { Observable } from 'rxjs/Observable';

import {Game, PlayerStateGame} from './../game-naval-battle/game';
import {BoardDefense} from "../game-naval-battle/models/board-defense";
import {Posicao} from "../game-naval-battle/posicao";
import {TipoNavio} from "../game-naval-battle/navio";
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


    
    getCurrentGames(username : string):Observable<Game[]>{

        return this.http.get('/api/v1/current-games/' + username)
            .map((response) => this.games = response.json());

            //TODO
            //por o json num arrya de game para mandar para o cliente
    }


    getCurrentStateGames(username : string):Observable<PlayerStateGame[]>{

        /*return this.http.get('/api/v1/current-state-games/' + username)
            .map((response) => this.playerStateGame = response.json());*/

        return this.http.get('/api/v1/current-state-games/' + username)
            .map(response => <PlayerStateGame[]>response.json())
            .map((playerStateGames) => {

                this.playerStateGame = [];

                playerStateGames.forEach((playerStateGame) => {

                    let boardDefense : BoardDefense;
                    boardDefense = new BoardDefense();

                    playerStateGame.players[0].tabuleiros[0].boardDefense.forEach((ship) => {

                        // console.log("XXXXXXXXXXXXXXXXX");
                        // console.log(ships);
                        // console.log("XXXXXXXXXXXXXXXXX");

                        //let type = ship.type; //TODO
                        let type = TipoNavio.PortaAvioes;


                        let allPositions: Posicao[] = [];
                        ship.positions.forEach((position) => {
                                allPositions.push(new Posicao(position.line.toString(), position.column));
                                console.log("position=> linha: "+ "'" +position.line.toString() + "coluna: "+ "'" + position.column + "'" );
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