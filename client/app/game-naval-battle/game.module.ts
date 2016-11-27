import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { GameComponent } from './game.component';
import { GameDefendComponent } from './defend/defend.component';
import { GameAttackComponent } from './attack/attack.component';

@NgModule({
  imports:      [ CommonModule, BrowserModule ],
  declarations: [ GameComponent, GameDefendComponent, GameAttackComponent ]
  //bootstrap:    [ GameDefendComponent ]
})

export class GameNavalBattleModule { }