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
var historical_service_1 = require('../services/historical.service');
var HistoricalComponent = (function () {
    function HistoricalComponent(historicalService) {
        var _this = this;
        this.historicalService = historicalService;
        this.historicalService.getHistorical()
            .subscribe(function (response) { return _this.historicals = response; });
    }
    HistoricalComponent.prototype.getMyGames = function (event) {
        //TODO se a sessão estiver vazia carrega a rota de login (middleware)
        var _this = this;
        this.historicalService.getMyHistorical('Tonny')
            .subscribe(function (response) { return _this.historicals = response; });
    };
    HistoricalComponent.prototype.getAllGames = function (event) {
        var _this = this;
        this.historicalService.getHistorical()
            .subscribe(function (response) { return _this.historicals = response; });
    };
    HistoricalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-historical',
            template: " <h1>Historico</h1>\n              <h3>Filter by:</h3>\n              <button type=\"button\" (click)=\"getMyGames()\">My Games</button>\n              <button type=\"button\" (click)=\"getAllGames()\">All Games</button>\n              <h3>Results:</h3>\n              <ul>\n                <li *ngFor=\"let historical of historicals\">\n                  <span>Create By: {{historical.createdBy}}</span>\n                  <span>Aborted: {{historical.aborted}}</span>\n                  <span>Start Date: {{historical.startDate}}</span>\n                  <span>End Date: {{historical.endDate}}</span>\n                  <span>Winner: {{historical.winner}}</span>\n                  <ul>\n                    <li *ngFor=\"let player of historical.players\">\n                      <span>\n                        {{player.username}}\n                      </span>\n                    </li>\n                   </ul>\n                </li>\n              </ul>",
            providers: [historical_service_1.HistoricalService]
        }), 
        __metadata('design:paramtypes', [historical_service_1.HistoricalService])
    ], HistoricalComponent);
    return HistoricalComponent;
}());
exports.HistoricalComponent = HistoricalComponent;
//# sourceMappingURL=historical.component.js.map