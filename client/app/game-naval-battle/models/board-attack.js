"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tabuleiro_1 = require('./../tabuleiro');
var BoardAttack = (function (_super) {
    __extends(BoardAttack, _super);
    function BoardAttack(username, cellsAttack) {
        _super.call(this);
        this.cellAtack = [];
        this.usename = username;
        this.cellAtack = [];
        this.cellAtack = cellsAttack;
    }
    BoardAttack.prototype.getValue = function (line, column) {
        var value = '';
        for (var _i = 0, _a = this.cellAtack; _i < _a.length; _i++) {
            var cellAttack = _a[_i];
            if (cellAttack.line == line
                && cellAttack.column == column) {
                value = cellAttack.value;
            }
        }
        return value;
    };
    return BoardAttack;
}(tabuleiro_1.Tabuleiro));
exports.BoardAttack = BoardAttack;
//# sourceMappingURL=board-attack.js.map