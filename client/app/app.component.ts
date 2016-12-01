import { Component } from '@angular/core';

import { HistoricalService } from './services/historical.service';
import { GameService } from './services/game.service';

@Component({
  selector: 'my-app',
  templateUrl: './app/app-index.html',
  //styleUrls: [ './app/app-styles.css' ], //TODO dps para os primefaces e bootstrapes
  providers: [HistoricalService, GameService]
  
})

export class AppComponent {}
