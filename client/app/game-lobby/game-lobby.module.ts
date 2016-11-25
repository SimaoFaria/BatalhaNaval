import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GameLobbyComponent } from './game-lobby.component';
import { GameLobbyService } from './game-lobby.service';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ GameLobbyComponent ],
  bootstrap:    [ GameLobbyComponent ],
  exports:      [ GameLobbyService ]
})

export class GameLobbyModule { }