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
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var router_1 = require('@angular/router');
var dashboard_component_1 = require('./dashboard/dashboard.component');
var historical_component_1 = require('./historical/historical.component');
var historical_service_1 = require('./services/historical.service');
var game_module_1 = require('./game-naval-battle/game.module');
var top10victories_component_1 = require('./top10/top10victories.component');
var leaderboard_module_1 = require('./leaderboard/leaderboard.module');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                game_module_1.GameNavalBattleModule,
                leaderboard_module_1.LeaderboardModule,
                router_1.RouterModule.forRoot([
                    {
                        path: 'dashboard',
                        component: dashboard_component_1.DashboardComponent
                    },
                    {
                        path: 'current-games',
                        component: game_module_1.GameNavalBattleModule
                    },
                    {
                        path: 'historical',
                        component: historical_component_1.HistoricalComponent
                    },
                    {
                        path: 'top10victories',
                        component: top10victories_component_1.Top10VictoriesComponent
                    },
                    {
                        path: '',
                        //redirectTo: '/dashboard',
                        redirectTo: '/top10victories',
                        pathMatch: 'full'
                    }
                ])
            ],
            declarations: [app_component_1.AppComponent,
                dashboard_component_1.DashboardComponent,
                historical_component_1.HistoricalComponent,
                top10victories_component_1.Top10VictoriesComponent
            ],
            providers: [historical_service_1.HistoricalService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map