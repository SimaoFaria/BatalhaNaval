import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { LeaderboardComponent }  from './leaderboard.component';

import { LeaderboardService } from './leaderboard.service';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ LeaderboardComponent ],
  providers:    [ LeaderboardService ],
  exports:      [ LeaderboardComponent ]
})
export class LeaderboardModule { }
