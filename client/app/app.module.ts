import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http'; //TODO Faz sentido?

import { AppComponent }   from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { GameLobbyModule } from './game-lobby/game-lobby.module';
import { HistoricalModule } from './historical/historical.module';

import { Top10Module } from './top10/top10.module';
import { GameNavalBattleModule } from './game-naval-battle/game.module';
import { SocketsModule } from './sockets/sockets.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { HistoricalComponent } from './historical/historical.component';
// import { SocketsComponent} from './sockets/sockets.component';

import { HistoricalService } from './services/historical.service';
import { GameService } from './services/game.service';

import { AuthService } from './sockets/auth.service';
import { WebSocketService } from './sockets/notifications/websocket.service';

@NgModule({
  imports:      [   BrowserModule,
                    FormsModule,
                    HttpModule,
                    AppRoutingModule,
                    //GameLobbyModule, //TODO porque rebenta, seria necessáro importa estes
                    //HistoricalModule,
                    //LoginModule,
                    Top10Module,
                    GameNavalBattleModule,
                    SocketsModule
  ],
  declarations: [   AppComponent,
                    DashboardComponent,
                    GameLobbyComponent,
                    HistoricalComponent,
                    // SocketsComponent
  ],
  providers: [HistoricalService, GameService, AuthService, WebSocketService],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }

//TODO verificiar se todos os componentes tem module.id