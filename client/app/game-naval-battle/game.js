"use strict";
(function (GameStatus) {
    GameStatus[GameStatus["INWAITINGROOM"] = 0] = "INWAITINGROOM";
    GameStatus[GameStatus["PENDING"] = 1] = "PENDING";
    GameStatus[GameStatus["INPROGRESS"] = 2] = "INPROGRESS";
    GameStatus[GameStatus["ENDED"] = 3] = "ENDED";
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
        //deep clone para não atualizar na vista diretamente
        this.players = JSON.parse(JSON.stringify(game.players));
    }
    return Game;
}());
exports.Game = Game;
//TODO refactor do Hugo: fazer função no serviço que pegue so os campos pretendidos 
var GameWithoutId = (function () {
    function GameWithoutId(game) {
        this.aborted = game.aborted;
        this.createdBy = game.createdBy;
        this.startDate = game.startDate;
        this.endDate = game.endDate;
        this.status = game.status;
        this.winner = game.winner;
        //deep clone para não atualizar na vista diretamente
        this.players = JSON.parse(JSON.stringify(game.players));
    }
    return GameWithoutId;
}());
exports.GameWithoutId = GameWithoutId;
/**
 * Description: Class that save a state of the game
 * */
var PlayerStateGame = (function () {
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