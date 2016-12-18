import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, BaseRequestOptions }    from '@angular/http'; //TODO Faz sentido?

import { AppComponent }   from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { GameLobbyModule } from './game-lobby/game-lobby.module';
import { HistoricalModule } from './historical/historical.module';

import { Top10Module } from './top10/top10.module';
import { GameNavalBattleModule } from './game-naval-battle/game.module';
import { SocketsModule } from './sockets/sockets.module';

import { GameLobbyComponent } from './game-lobby/game-lobby.component';

// import { SocketsComponent} from './sockets/sockets.component';

import { GameService } from './services/game.service';

import { AuthService } from './sockets/auth.service';
import { WebSocketService } from './sockets/notifications/websocket.service';

import { AuthGuard } from './login-register/_guards/auth.guard';

// import { routing }        from './app.routing';

import { AuthenticationService } from './login-register/_services/authentication.service';
import { LoginComponent } from './login-register/login/login.component';
import { GameComponent } from './login-register/game/game.component';
import { RegisterComponent } from './login-register/register/register.component';
import {MenuComponent} from "./menu/menu.component";
import {MenuModule} from "./menu/menu.module";


// import { ChatComponent } from './sockets/chat.component';




@NgModule({
  imports:      [   BrowserModule,
                    FormsModule,
                    HttpModule,
                    AppRoutingModule,
                    //GameLobbyModule, //TODO porque rebenta, seria necessáro importa estes
                    HistoricalModule,
                    //LoginModule,
                    Top10Module,
                    GameNavalBattleModule,
                    //SocketsModule,
                    MenuModule

  ],
  declarations: [   AppComponent,
                    GameLobbyComponent,
                    // SocketsComponent
                    LoginComponent,
                    RegisterComponent,
                    // ChatComponent

  ],
  providers: [
                    GameService,
                    AuthService,
                    WebSocketService,
                    AuthenticationService,
                    AuthGuard,
                    BaseRequestOptions ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }

//TODO verificiar se todos os componentes tem module.id