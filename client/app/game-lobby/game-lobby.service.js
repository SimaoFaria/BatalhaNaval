"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var GameLobbyService = (function () {
    function GameLobbyService(http) {
        this.http = http;
    }
    GameLobbyService.prototype.getGamesInRoom = function () {
        var _this = this;
        return this.http.get('/api/v1/waiting-room-games')
            .map(function (response) { return _this.gamesInRoom = response.json(); });
    };
    GameLobbyService.prototype.createNewGame = function (game) {
        return this.http.post('/api/v1/games', game)
            .map(function (response) { return response.json(); });
    };
    GameLobbyService.prototype.updateGame = function (gameId, game) {
        return this.http.put('/api/v1/games/' + gameId, game)
            .map(function (response) { return response.json(); });
    };
    GameLobbyService.prototype.enterGame = function (gameId, game) {
        return this.http.put('/api/v1/enter-game/' + gameId, game)
            .map(function (response) { return response.json(); });
    };
    GameLobbyService.prototype.leaveGame = function (gameId, game) {
        return this.http.put('/api/v1/leave-game/' + gameId, game)
            .map(function (response) { return response.json(); });
    };
    GameLobbyService.prototype.deleteGame = function (gameId) {
        return this.http.delete('/api/v1/games/' + gameId)
            .map(function (response) { return response.json(); });
    };
    GameLobbyService.prototype.startGame = function (gameId, game) {
        // updateGame(game: Game):Observable<Game>{
        return this.http.put('/api/v1/start-game/' + gameId, game)
            .map(function (response) { return response.json(); });
    };
    GameLobbyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], GameLobbyService);
    return GameLobbyService;
}());
exports.GameLobbyService = GameLobbyService;
//# sourceMappingURL=game-lobby.service.js.map