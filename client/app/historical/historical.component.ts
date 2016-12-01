import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';


import { Historical } from './historical';

import { HistoricalService } from '../services/historical.service';

@Component({
  moduleId: module.id,
  selector: 'my-historical',
  template: ` <h1>Historico</h1>
              <h3>Filter by:</h3>
              <button type="button" (click)="getMyGames()">My Games</button>
              <button type="button" (click)="getAllGames()">All Games</button>
              <h3>Results:</h3>
              <ul>
                <li *ngFor="let historical of historicals">
                  <span>Create By: {{historical.createdBy}}</span>
                  <span>Aborted: {{historical.aborted}}</span>
                  <span>Start Date: {{historical.startDate}}</span>
                  <span>End Date: {{historical.endDate}}</span>
                  <span>Winner: {{historical.winner}}</span>
                  <ul>
                    <li *ngFor="let player of historical.players">
                      <span>
                        {{player.username}}
                      </span>
                    </li>
                   </ul>
                </li>
              </ul>`,
  providers: [HistoricalService]
})

export class HistoricalComponent{

  private historicals: Historical[];

  constructor(private historicalService: HistoricalService) {
    
     this.historicalService.getHistorical()
            .subscribe((response) => this.historicals = response);
  }


  getMyGames(event) {

    //TODO se a sessão estiver vazia carrega a rota de login (middleware)

    this.historicalService.getMyHistorical('Tonny')
            .subscribe((response) => this.historicals = response);

  }

  getAllGames(event) {

    this.historicalService.getHistorical()
            .subscribe((response) => this.historicals = response);

  }


  
}