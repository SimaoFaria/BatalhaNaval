import { Routes } from '@angular/router';

import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { HistoricalComponent } from './historical/historical.component';
import { GameComponent } from './game-naval-battle/game.component';

import { SocketsComponent} from './sockets/sockets.component';

import { LoginComponent } from './login-register/login/login.component';
import { AuthGuard } from './login-register/_guards/auth.guard';
import {RegisterComponent} from "./login-register/register/register.component";

export const ROUTES: Routes = [
  { path: '', redirectTo: '/game-lobby', pathMatch: 'full' },
  // { path: '', redirectTo: '/sockets', pathMatch: 'full' },
  // { path: '', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'game-lobby',  component: GameLobbyComponent },
  { path: 'historical',  component: HistoricalComponent },
  { path: 'current-games',  component: GameComponent }, 
  // { path: 'sockets',  component: SocketsComponent },
  
  { path: 'login',  component: LoginComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'register',  component: RegisterComponent },

  { path: '**', redirectTo: ''}
];