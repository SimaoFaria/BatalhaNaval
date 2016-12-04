import { Tabuleiro } from './../tabuleiro';
import {CellAttack} from "../game";

export class BoardAttack extends Tabuleiro{

    private usename: string;
    private cellAtack : CellAttack[] = [];

    constructor(username : string, cellsAttack : CellAttack[]) {
        super();
        this.usename = username;
        this.cellAtack = [];
        this.cellAtack = cellsAttack;


    }

    public getValue(line : string, column : string) : string {

        let value : string = '';

        for (let cellAttack of this.cellAtack) {

            if(cellAttack.line == line
                && cellAttack.column == column){
                value = cellAttack.value;
            }
        }

        return value;
    }



}