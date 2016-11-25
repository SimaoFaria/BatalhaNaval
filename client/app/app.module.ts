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

import { Top10Module } from './top10/top10.module';

import { GameLobbyComponent } from './game-lobby/game-lobby.component';

@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  HttpModule,
                  GameNavalBattleModule,
                  Top10Module,
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
                        path: 'game-lobby',
                        component: GameLobbyComponent
                      },
                      {
                        path: '',
                        redirectTo: '/game-lobby',
                        pathMatch: 'full'
                      }
                    ])
  ],
  declarations: [ AppComponent,
                  DashboardComponent,
                  HistoricalComponent,              
                  GameLobbyComponent            
  ],
  providers: [HistoricalService],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
