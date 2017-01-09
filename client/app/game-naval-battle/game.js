"use strict";
(function (GameStatus) {
    GameStatus[GameStatus["INWAITINGROOM"] = 0] = "INWAITINGROOM";
    GameStatus[GameStatus["PENDING"] = 1] = "PENDING";
    GameStatus[GameStatus["READY"] = 2] = "READY";
    GameStatus[GameStatus["INPROGRESS"] = 3] = "INPROGRESS";
    GameStatus[GameStatus["ENDED"] = 4] = "ENDED";
})(exports.GameStatus || (exports.GameStatus = {}));
var GameStatus = exports.GameStatus;
var Game = (function () {
    function Game(game) {
        this._id = game._id;
        this.aborted = game.aborted;
        this.createdBy = game.createdBy;
        this.startDate = game.startDate;
        this.endDate = game.endDate;
        this.status = game.status;
        this.winner = game.winner;
        this.players = JSON.parse(JSON.stringify(game.players));
    }
    return Game;
}());
exports.Game = Game;
/**
 * Description: Class that save a state of the game
 * */
var PlayerStateGame = (function () {
    function PlayerStateGame(idGame, status, boardDefense, boardsAttack, isPlaying, won) {
        this.idGame = idGame;
        this.status = status;
        this.boardDefense = boardDefense;
        this.boardsAttack = boardsAttack;
        this.isPlaying = isPlaying;
        this.won = won;
    }
    PlayerStateGame.gameStatus_toString = function (gameStatus) {
        var gameStatusString = null;
        switch (gameStatus) {
            case GameStatus.INWAITINGROOM:
                gameStatusString = 'INWAITINGROOM';
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
            case GameStatus.READY:
                gameStatusString = 'READY';
                break;
        }
        return gameStatusString;
    };
    return PlayerStateGame;
}());
exports.PlayerStateGame = PlayerStateGame;
var CellAttack = (function () {
    function CellAttack(line, column, value, sank) {
        this.line = line;
        this.column = column;
        this.value = value;
        this.sank = sank;
    }
    return CellAttack;
}());
exports.CellAttack = CellAttack;
//# sourceMappingURL=game.js.map