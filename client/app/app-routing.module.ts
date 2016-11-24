import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';

import { HistoricalComponent }   from './historical/historical.component';
//import { routes } from './routes';
import { GameNavalBattleModule } from './game-naval-battle/game.module'

import { Top10VictoriesComponent } from './top10/top10victories.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'current-games',  component: GameNavalBattleModule },
  { path: 'historical',  component: HistoricalComponent },
  { path: 'top10victories',  component: Top10VictoriesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}