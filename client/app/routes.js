"use strict";
var game_lobby_component_1 = require('./game-lobby/game-lobby.component');
var historical_component_1 = require('./historical/historical.component');
var game_component_1 = require('./game-naval-battle/game.component');
//import { LoginComponent } from './/.component';
var sockets_component_1 = require('./sockets/sockets.component');
exports.ROUTES = [
    // { path: '', redirectTo: '/game-lobby', pathMatch: 'full' },
    { path: '', redirectTo: '/sockets', pathMatch: 'full' },
    { path: 'game-lobby', component: game_lobby_component_1.GameLobbyComponent },
    { path: 'historical', component: historical_component_1.HistoricalComponent },
    { path: 'current-games', component: game_component_1.GameComponent },
    //{ path: 'login',  component: LoginComponent }
    { path: 'sockets', component: sockets_component_1.SocketsComponent }
];
//# sourceMappingURL=routes.js.map