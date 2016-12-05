import { Tabuleiro } from './../tabuleiro';
import {CellAttack} from "../game";

export class BoardAttack extends Tabuleiro{

    public username: string;
    public board : CellAttack[] = [];

    constructor(username : string, cellsAttack : CellAttack[]) {
        super();
        this.username = username;
        this.board = [];
        this.board = cellsAttack;


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
                exist = true;
            }
        }

        if(!exist){
            this.board.push(new CellAttack(line, column, newValue));
        }


    }

    public getCellsAtackObject() : Object{
        return { "username" : this.username, "cellsAttack" : this.board};
    }


}