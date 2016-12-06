import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { GameComponent } from './game.component';
import { GameDefendComponent } from './defend/defend.component';
import { GameAttackComponent } from './attack/attack.component';
import { ConfigBoarShipsComponent } from './config-board-ships/config.board.ships.component';






import { ChatComponent } from '../sockets/chat.component';

import { NotificationModule } from '../sockets/notifications/notifications.module';

import { WebSocketService } from '../sockets/notifications/websocket.service';
import { AuthService } from '../sockets/auth.service';

import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';


@NgModule({
  imports:      [ CommonModule,
                  BrowserModule,
                  HttpModule,
                  FormsModule,
                  NotificationModule
                   ],
  declarations: [
                  ConfigBoarShipsComponent,
                  GameComponent,
                  GameDefendComponent,
                  GameAttackComponent,
                  ChatComponent
                 ],
  providers: [ WebSocketService, AuthService ]
})

export class GameNavalBattleModule { }