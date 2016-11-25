import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';

import { HistoricalComponent }   from './historical/historical.component';
//import { routes } from './routes';
import { GameNavalBattleModule } from './game-naval-battle/game.module'

import { GameLobbyComponent } from './game-lobby/game-lobby.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'current-games',  component: GameNavalBattleModule },
  { path: 'historical',  component: HistoricalComponent },
  { path: 'game-lobby',  component: GameLobbyComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}