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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http'); //TODO Faz sentido?
var app_component_1 = require('./app.component');
var app_routing_module_1 = require('./app-routing.module');
var top10_module_1 = require('./top10/top10.module');
var game_module_1 = require('./game-naval-battle/game.module');
var sockets_module_1 = require('./sockets/sockets.module');
var dashboard_component_1 = require('./dashboard/dashboard.component');
var game_lobby_component_1 = require('./game-lobby/game-lobby.component');
var historical_component_1 = require('./historical/historical.component');
// import { SocketsComponent} from './sockets/sockets.component';
var historical_service_1 = require('./services/historical.service');
var game_service_1 = require('./services/game.service');
var auth_service_1 = require('./sockets/auth.service');
var websocket_service_1 = require('./sockets/notifications/websocket.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_module_1.AppRoutingModule,
                //GameLobbyModule, //TODO porque rebenta, seria necessáro importa estes
                //HistoricalModule,
                //LoginModule,
                top10_module_1.Top10Module,
                game_module_1.GameNavalBattleModule,
                sockets_module_1.SocketsModule
            ],
            declarations: [app_component_1.AppComponent,
                dashboard_component_1.DashboardComponent,
                game_lobby_component_1.GameLobbyComponent,
                historical_component_1.HistoricalComponent,
            ],
            providers: [historical_service_1.HistoricalService, game_service_1.GameService, auth_service_1.AuthService, websocket_service_1.WebSocketService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//TODO verificiar se todos os componentes tem module.id 
//# sourceMappingURL=app.module.js.map