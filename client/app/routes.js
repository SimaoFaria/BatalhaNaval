"use strict";
var game_lobby_component_1 = require('./game-lobby/game-lobby.component');
var historical_component_1 = require('./historical/historical.component');
var game_component_1 = require('./game-naval-battle/game.component');
var login_component_1 = require('./login-register/login/login.component');
var register_component_1 = require("./login-register/register/register.component");
exports.ROUTES = [
    // { path: '', redirectTo: '/current-games', pathMatch: 'full' },
    { path: '', redirectTo: '/game-lobby', pathMatch: 'full' },
    // { path: '', redirectTo: '/sockets', pathMatch: 'full' },
    // { path: '', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'game-lobby', component: game_lobby_component_1.GameLobbyComponent },
    { path: 'historical', component: historical_component_1.HistoricalComponent },
    { path: 'current-games', component: game_component_1.GameComponent },
    // { path: 'sockets',  component: SocketsComponent },
    { path: 'login', component: login_component_1.LoginComponent /*, canActivate: [AuthGuard]*/ },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: '**', redirectTo: '' }
];
//# sourceMappingURL=routes.js.map