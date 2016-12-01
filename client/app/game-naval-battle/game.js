"use strict";
var Game = (function () {
    function Game() {
    }
    //constructor() {  }
    Game.prototype.startGame = function () {
    };
    return Game;
}());
exports.Game = Game;
var PlayerStateGame = (function () {
    //boardAttack: BoardAttack[];
    function PlayerStateGame(idGame, status, boardDefense) {
        this.idGame = idGame;
        this.status = status;
        this.boardDefense = boardDefense;
    }
    return PlayerStateGame;
}());
exports.PlayerStateGame = PlayerStateGame;
//# sourceMappingURL=game.js.map