import { Routes } from '@angular/router';

import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { HistoricalComponent } from './historical/historical.component';
import { GameComponent } from './game-naval-battle/game.component';
//import { LoginComponent } from './/.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/game-lobby', pathMatch: 'full' },
  { path: 'game-lobby',  component: GameLobbyComponent },
  { path: 'historical',  component: HistoricalComponent },
  { path: 'current-games',  component: GameComponent },
  //{ path: 'login',  component: LoginComponent }
];