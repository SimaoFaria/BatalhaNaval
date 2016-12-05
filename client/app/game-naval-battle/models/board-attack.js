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
    function BoardAttack(username, cellsAttack) {
        _super.call(this);
        this.board = [];
        this.username = username;
        this.board = [];
        this.board = cellsAttack;
    }
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
                exist = true;
            }
        }
        if (!exist) {
            this.board.push(new game_1.CellAttack(line, column, newValue));
        }
    };
    BoardAttack.prototype.getCellsAtackObject = function () {
        return { "username": this.username, "cellsAttack": this.board };
    };
    return BoardAttack;
}(tabuleiro_1.Tabuleiro));
exports.BoardAttack = BoardAttack;
//# sourceMappingURL=board-attack.js.map