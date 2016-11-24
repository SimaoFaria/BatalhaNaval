import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';


import { AppComponent }   from './app.component';

import { RouterModule }   from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoricalComponent } from './historical/historical.component';

import { AppRoutingModule } from './app-routing.module';

import { HistoricalService } from './services/historical.service';

import { GameNavalBattleModule } from './game-naval-battle/game.module';

import { Top10VictoriesComponent } from './top10/top10victories.component';
import { LeaderboardModule } from './leaderboard/leaderboard.module';

@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  HttpModule,
                  GameNavalBattleModule,
                  LeaderboardModule,
                  RouterModule.forRoot([
                      {
                        path: 'dashboard',
                        component: DashboardComponent
                      },
                      {
                        path: 'current-games',//duvia como meter um componente dentro de outra
                        component: GameNavalBattleModule
                      },
                       {
                        path: 'historical',
                        component: HistoricalComponent
                      },
                      {
                        path: 'top10victories',
                        component: Top10VictoriesComponent
                      },
                      {
                        path: '',
                        //redirectTo: '/dashboard',
                        redirectTo: '/top10victories',
                        pathMatch: 'full'
                      }
                    ])
  ],
  declarations: [ AppComponent,
                  DashboardComponent,
                  HistoricalComponent,              
                  Top10VictoriesComponent            
  ],
  providers: [HistoricalService],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
