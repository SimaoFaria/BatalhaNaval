import { Routes } from '@angular/router';

import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { HistoricalComponent } from './historical/historical.component';
import { GameComponent } from './game-naval-battle/game.component';

import { LoginComponent } from './login-register/login/login.component';
import { AuthGuard } from './login-register/_guards/auth.guard';
import { RegisterComponent } from "./login-register/register/register.component";
import { Top10Component } from "./top10/top10.component";

export const ROUTES: Routes = [
  { path: 'current-games',  component: GameComponent, canActivate: [AuthGuard]},
  { path: 'historical',  component: HistoricalComponent },
  { path: 'game-lobby',  component: GameLobbyComponent, canActivate: [AuthGuard] },
  { path: 'tops',  component: Top10Component },
  { path: 'register',  component: RegisterComponent },
  { path: 'login',  component: LoginComponent},
  { path: '', redirectTo: '/historical', pathMatch: 'full' },
  { path: '**', redirectTo: ''}
];