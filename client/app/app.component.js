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
var historical_service_1 = require('./services/historical.service');
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Dashboard';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <div>\n        <h1>{{title}}</h1>\n        <nav>\n            <a routerLink=\"/current-games\">Current Games</a>\n            <a routerLink=\"/dashboard\">Dashboard</a>\n            <a routerLink=\"/historical\">Historical</a>\n            <a routerLink=\"/login\">Login</a>\n            <a routerLink=\"/game-lobby\">Game Lobby</a>\n        </nav>\n    </div>\n    <my-top10></my-top10>\n    <router-outlet></router-outlet>\n    ",
            styles: ["\n    div {\n        width:15%;\n        height:100%;\n        /*background-color: #607D8B;*/\n        background-color: yellowgreen;\n        float:left;\n    }\n\n    .conteiner{\n        width:70%; \n        background-color:red;\n    }\n    "],
            providers: [historical_service_1.HistoricalService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map