
import { Player } from '../_models/player';
import { GamingPlayer } from '../_models/player';

import { BoardDefense } from './models/board-defense';
import {BoardAttack} from "./models/board-attack";



export enum GameStatus {
    INWAITINGROOM,
    PENDING,
    READY,
    INPROGRESS,
    ENDED
}

export class Game {
    _id: string;
    status: string;
    createdBy: string;
    aborted: boolean;
    startDate: string;
    endDate: string;
    winner: string;
    players: GamingPlayer[];

    constructor(game: Game) {
        this._id = game._id;
        this.aborted = game.aborted;
        this.createdBy = game.createdBy;
        this.startDate = game.startDate;
        this.endDate = game.endDate;
        this.status = game.status;
        this.winner = game.winner;

        // TODO confirmar se ainda é preciso
        // deep clone para não atualizar na vista diretamente
        this.players = JSON.parse(JSON.stringify(game.players));

        
    }
}

//TODO refactor do Hugo: fazer função no serviço que pegue so os campos pretendidos 
//TODO apagar
export class GameWithoutId {
    status: string;
    createdBy: string;
    aborted: boolean;
    startDate: string;
    endDate: string;
    winner: string;
    players: GamingPlayer[];

    constructor(game: Game) {
        this.aborted = game.aborted;
        this.createdBy = game.createdBy;
        this.startDate = game.startDate;
        this.endDate = game.endDate;
        this.status = game.status;
        this.winner = game.winner;

        //deep clone para não atualizar na vista diretamente
        this.players = JSON.parse(JSON.stringify(game.players));
    }


    //constructor() {  }

    // startGame() {
        
    // }


}

/**
 * Description: Class that save a state of the game
 * */
export class PlayerStateGame {

    public currentPlayer : string;
    public nrShotsRemaining : number;
    // private _username: string;
    public _username: string;
    public idGame: string; //TODO GAME HEADER
    public status: string;
    public boardDefense: BoardDefense;
    public boardsAttack: BoardAttack[];
    //boardAttack: BoardAttack[];
    public user;

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
            case GameStatus.READY:
                gameStatusString = 'READY';
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



