
import { Player } from '../models/player';
import { GamingPlayer } from '../models/player';

import { BoardDefense } from './models/board-defense';
import {BoardAttack} from "./models/board-attack";

export class Game {
    status: string;
    createdBy: string;
    aborted: boolean;
    startDate: string;
    endDate: string;
    winner: string;
    players: GamingPlayer[];

    


    //constructor() {  }

    startGame() {
        
    }

}

export class PlayerStateGame {


    //TODO GAME HEADER
    public idGame: string;
    public status: string;

    public boardDefense: BoardDefense;
    //boardAttack: BoardAttack[];


    constructor(idGame : string, status: string, boardDefense: BoardDefense){

        this.idGame = idGame;
        this.status = status;
        this.boardDefense = boardDefense;

    }

     /*constructor(idGame : string, status: string){

        this.idGame = idGame;
        this.status = status;
    }*/

}



