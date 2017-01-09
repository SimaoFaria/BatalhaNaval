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
var common_1 = require('@angular/common');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var notifications_module_1 = require('../sockets/notifications/notifications.module');
/**
 * Components
 * */
var game_component_1 = require('./game.component');
var chat_component_1 = require('../sockets/chat.component');
var authentication_service_1 = require("../login-register/_services/authentication.service");
var GameNavalBattleModule = (function () {
    function GameNavalBattleModule() {
    }
    GameNavalBattleModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule,
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                notifications_module_1.NotificationModule
            ],
            declarations: [
                game_component_1.GameComponent,
                chat_component_1.ChatComponent,
            ],
            providers: [authentication_service_1.AuthenticationService]
        }), 
        __metadata('design:paramtypes', [])
    ], GameNavalBattleModule);
    return GameNavalBattleModule;
}());
exports.GameNavalBattleModule = GameNavalBattleModule;
//# sourceMappingURL=game.module.js.map