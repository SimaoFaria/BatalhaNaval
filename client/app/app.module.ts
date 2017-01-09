import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, BaseRequestOptions }    from '@angular/http';

import { AppComponent }   from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HistoricalModule } from './historical/historical.module';

import { Top10Module } from './top10/top10.module';
import { GameNavalBattleModule } from './game-naval-battle/game.module';

import { GameLobbyComponent } from './game-lobby/game-lobby.component';


import { GameService } from './services/game.service';

import { WebSocketService } from './sockets/notifications/websocket.service';

import { AuthGuard } from './login-register/_guards/auth.guard';

// import { routing }        from './app.routing';

import { AuthenticationService } from './login-register/_services/authentication.service';
import {MenuModule} from "./menu/menu.module";

import { LoginModule } from './login-register/login.module';

@NgModule({
  imports:      [   BrowserModule,
                    FormsModule,
                    HttpModule,
                    AppRoutingModule,
                    //GameLobbyModule,
                    HistoricalModule,
                    LoginModule,
                    Top10Module,
                    GameNavalBattleModule,
                    //SocketsModule,
                    MenuModule

  ],
  declarations: [   AppComponent,
                    GameLobbyComponent,
                    // SocketsComponent
                    // LoginComponent,
                    // RegisterComponent,
                    // EqualValidator
                    // ChatComponent

  ],
  providers: [
                    GameService,
                    WebSocketService,
                    AuthenticationService,
                    AuthGuard,
                    BaseRequestOptions ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }