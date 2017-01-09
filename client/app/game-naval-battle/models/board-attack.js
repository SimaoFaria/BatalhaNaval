"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tabuleiro_1 = require('./../tabuleiro');
var game_1 = require("../game");
var BoardAttack = (function (_super) {
    __extends(BoardAttack, _super);
    function BoardAttack(username, stillInGame, cellsAttack) {
        _super.call(this);
        this.board = [];
        this.username = username;
        this.stillInGame = stillInGame;
        this.board = [];
        this.board = cellsAttack;
    }
    BoardAttack.prototype.getSank = function (line, column) {
        var value;
        for (var _i = 0, _a = this.board; _i < _a.length; _i++) {
            var cellAttack = _a[_i];
            if (cellAttack.line == line
                && cellAttack.column == column) {
                //console.log("CELLATACK: ");
                //console.log(cellAttack);
                if (cellAttack.sank == true) {
                    //value = cellAttack.hit;
                    value = 'red';
                }
                else {
                    //value = cellAttack.hit;
                    value = 'white';
                }
            }
        }
        return value;
    };
    BoardAttack.prototype.setHit = function (line, column, isHit) {
        for (var _i = 0, _a = this.board; _i < _a.length; _i++) {
            var cellAttack = _a[_i];
            if (cellAttack.line == line
                && cellAttack.column == column) {
                cellAttack.hit = isHit;
            }
        }
    };
    BoardAttack.prototype.getValue = function (line, column) {
        var value = '';
        for (var _i = 0, _a = this.board; _i < _a.length; _i++) {
            var cellAttack = _a[_i];
            if (cellAttack.line == line
                && cellAttack.column == column) {
                value = cellAttack.value;
            }
        }
        return value;
    };
    BoardAttack.prototype.getUsername = function () {
        return this.username;
    };
    BoardAttack.prototype.setValue = function (line, column, newValue) {
        var exist = false;
        for (var _i = 0, _a = this.board; _i < _a.length; _i++) {
            var cellAttack = _a[_i];
            if (cellAttack.line == line
                && cellAttack.column == column) {
                cellAttack.value = newValue;
                // if(newValue == 'X') {
                //     cellAttack.hit = true;
                // }else {
                //     cellAttack.hit = false;
                // }
                exist = true;
            }
        }
        if (!exist) {
            this.board.push(new game_1.CellAttack(line, column, newValue));
        }
    };
    BoardAttack.prototype.getCellsAtackObject = function () {
        return { "username": this.username, "board": this.board };
    };
    return BoardAttack;
}(tabuleiro_1.Tabuleiro));
exports.BoardAttack = BoardAttack;
//# sourceMappingURL=board-attack.js.map