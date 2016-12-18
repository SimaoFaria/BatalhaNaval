"use strict";
var game_lobby_component_1 = require('./game-lobby/game-lobby.component');
var historical_component_1 = require('./historical/historical.component');
var game_component_1 = require('./game-naval-battle/game.component');
var login_component_1 = require('./login-register/login/login.component');
var auth_guard_1 = require('./login-register/_guards/auth.guard');
var register_component_1 = require("./login-register/register/register.component");
var top10_component_1 = require("./top10/top10.component");
exports.ROUTES = [
    { path: 'current-games', component: game_component_1.GameComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'historical', component: historical_component_1.HistoricalComponent },
    { path: 'game-lobby', component: game_lobby_component_1.GameLobbyComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'tops', component: top10_component_1.Top10Component },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: '', redirectTo: '/historical', pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];
//# sourceMappingURL=routes.js.map