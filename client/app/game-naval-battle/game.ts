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
    // startDate: string;
    startDate: Date;
    // endDate: string;
    endDate: Date;
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

        this.players = JSON.parse(JSON.stringify(game.players));

    }
}


/**
 * Description: Class that save a state of the game
 * */
export class PlayerStateGame {

    public currentPlayer : string;
    public nrShotsRemaining : number;
    // private _username: string;
    public _username: string;
    public idGame: string;
    public status: string;
    public boardDefense: BoardDefense;
    public boardsAttack: BoardAttack[];
    public isPlaying: boolean;
    public won: boolean;

    constructor(idGame : string, status: string, boardDefense: BoardDefense, boardsAttack : BoardAttack[], isPlaying: boolean, won: boolean){
        
        this.idGame = idGame;
        this.status = status;
        this.boardDefense = boardDefense;
        this.boardsAttack  = boardsAttack;

        this.isPlaying = isPlaying;
        this.won = won;
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
    public sank : boolean;

    constructor(line : string ,column : number, value : string, sank: boolean) {
        this.line = line;
        this.column = column;
        this.value = value;
        this.sank = sank;
    }

}



