
import { Player } from '../models/player';
import { GamingPlayer } from '../models/player';

import { BoardDefense } from './models/board-defense';
import {BoardAttack} from "./models/board-attack";





export enum GameStatus {
    INWAITINGROOM,
    PENDING,
    INPROGRESS,
    ENDED
}



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

/**
 * Description: Class that save a state of the game
 * */
export class PlayerStateGame {

    private _username: string;
    public idGame: string; //TODO GAME HEADER
    public status: string;
    public boardDefense: BoardDefense;
    public boardsAttack: BoardAttack[];
    //boardAttack: BoardAttack[];

    constructor(idGame : string, status: string, boardDefense: BoardDefense, boardsAttack : BoardAttack[]){

        this.idGame = idGame;
        this.status = status;
        this.boardDefense = boardDefense;
        this.boardsAttack  = boardsAttack;

    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    public static gameStatus_toString(gameStatus: GameStatus): string {

        let gameStatusString : string = null;

        switch (gameStatus) {
            case GameStatus.INWAITINGROOM:
                gameStatusString = 'INWAITINGROOM';
                break;
            case GameStatus.PENDING:
                gameStatusString =  'PENDING';
                break;
            case GameStatus.INPROGRESS:
                gameStatusString = 'INPROGRESS';
                break;
            case GameStatus.ENDED:
                gameStatusString = 'ENDED';
                break;
        }

        return gameStatusString;
    }

}



export class CellAttack {

    public line : string;
    public column : number;
    public value : string;

    constructor(line : string ,column : number, value : string) {
        this.line = line;
        this.column = column;
        this.value = value;
    }

}



