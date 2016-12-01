import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { GameComponent } from './game.component';
import { GameDefendComponent } from './defend/defend.component';
import { GameAttackComponent } from './attack/attack.component';
import { ConfigBoarShipsComponent } from './config-board-ships/config.board.ships.component';

@NgModule({
  imports:      [ CommonModule,
                  BrowserModule ],
  declarations: [
                  ConfigBoarShipsComponent,
                  GameComponent,
                  GameDefendComponent,
                  GameAttackComponent
                 ],
  providers: []
})

export class GameNavalBattleModule { }