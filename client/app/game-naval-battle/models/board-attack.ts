import { Tabuleiro } from './../tabuleiro';
import {CellAttack} from "../game";

export class BoardAttack extends Tabuleiro{

    public username: string;
    public stillInGame: boolean;
    public board : CellAttack[] = [];

    constructor(username : string, stillInGame : boolean, cellsAttack : CellAttack[]) {
        super();
        this.username = username;
        this.stillInGame = stillInGame;
        this.board = [];
        this.board = cellsAttack;
    }

    public getSank(line : string, column : number) : string {

        let value : string;

        for (let cellAttack of this.board) {

            if(cellAttack.line == line
                && cellAttack.column == column){
                //console.log("CELLATACK: ");
                //console.log(cellAttack);

                if(cellAttack.sank == true){
                    //value = cellAttack.hit;
                    value = 'red';
                } else {
                    //value = cellAttack.hit;
                    value = 'white';
                }

            }
        }

        return value;
    }

    public setHit(line : string, column : number, isHit : boolean) : void{

        for (let cellAttack of this.board) {

            if(cellAttack.line == line
                && cellAttack.column == column){

                cellAttack.hit = isHit;

            }
        }
    }




    public getValue(line : string, column : string) : string {

        let value : string = '';

        for (let cellAttack of this.board) {

            if(cellAttack.line == line
                && cellAttack.column == column){
                value = cellAttack.value;
            }
        }

        return value;
    }

    public getUsername() : string {
        return this.username;
    }

    public setValue(line : string, column : number, newValue : string) : void{

        let exist : boolean = false;

        for (let cellAttack of this.board) {

            if(cellAttack.line == line
                && cellAttack.column == column){

                cellAttack.value = newValue;

                // if(newValue == 'X') {
                //     cellAttack.hit = true;

                // }else {
                //     cellAttack.hit = false;
                // }

                exist = true;
            }
        }

        if(!exist){
            this.board.push(new CellAttack(line, column, newValue));
        }


    }

    public getCellsAtackObject() : Object{
        return { "username" : this.username, "board" : this.board};
    }


}