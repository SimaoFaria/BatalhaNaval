"use strict";
(function (GameStatus) {
    GameStatus[GameStatus["INWATINGROOM"] = 0] = "INWATINGROOM";
    GameStatus[GameStatus["PENDING"] = 1] = "PENDING";
    GameStatus[GameStatus["INPROGRESS"] = 2] = "INPROGRESS";
    GameStatus[GameStatus["ENDED"] = 3] = "ENDED";
})(exports.GameStatus || (exports.GameStatus = {}));
var GameStatus = exports.GameStatus;
var Game = (function () {
    function Game() {
    }
    //constructor() {  }
    Game.prototype.startGame = function () {
    };
    return Game;
}());
exports.Game = Game;
/**
 * Description: Class that save a state of the game
 * */
var PlayerStateGame = (function () {
    //boardAttack: BoardAttack[];
    function PlayerStateGame(idGame, status, boardDefense, boardsAttack) {
        this.idGame = idGame;
        this.status = status;
        this.boardDefense = boardDefense;
        this.boardsAttack = boardsAttack;
    }
    Object.defineProperty(PlayerStateGame.prototype, "username", {
        get: function () {
            return this._username;
        },
        set: function (value) {
            this._username = value;
        },
        enumerable: true,
        configurable: true
    });
    PlayerStateGame.gameStatus_toString = function (gameStatus) {
        var gameStatusString = null;
        switch (gameStatus) {
            case GameStatus.INWATINGROOM:
                gameStatusString = 'INWATINGROOM';
                break;
            case GameStatus.PENDING:
                gameStatusString = 'PENDING';
                break;
            case GameStatus.INPROGRESS:
                gameStatusString = 'INPROGRESS';
                break;
            case GameStatus.ENDED:
                gameStatusString = 'ENDED';
                break;
        }
        return gameStatusString;
    };
    return PlayerStateGame;
}());
exports.PlayerStateGame = PlayerStateGame;
var CellAttack = (function () {
    function CellAttack(line, column, value) {
        this.line = line;
        this.column = column;
        this.value = value;
    }
    return CellAttack;
}());
exports.CellAttack = CellAttack;
//# sourceMappingURL=game.js.map