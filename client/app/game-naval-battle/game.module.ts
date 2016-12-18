import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NotificationModule } from '../sockets/notifications/notifications.module';

/**
 * Components
 * */
import { GameComponent } from './game.component';
import { GameDefendComponent } from './defend/defend.component';
import { GameAttackComponent } from './attack/attack.component';
import { ConfigBoarShipsComponent } from './config-board-ships/config.board.ships.component';
import { ChatComponent } from '../sockets/chat.component';
import {AuthenticationService} from "../login-register/_services/authentication.service";

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
                  ChatComponent,
                 ],
    providers: [ AuthenticationService ]
})

export class GameNavalBattleModule { }