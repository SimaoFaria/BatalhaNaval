import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Top10Player } from './top10-player';

import { Top10Service } from './top10.service';

@Component({
    moduleId: module.id,
    selector: 'my-top10',
    templateUrl: 'top10.component.html',
    styleUrls: [ './top10.css']
})
export class Top10Component { 

    top10Victories: Top10Player[]
    top10Points: Top10Player[]

    constructor(private top10Service: Top10Service){

        this.top10Service.getTop10Victories()
            .subscribe((response) => this.top10Victories = response);
    
        this.top10Service.getTop10Points()
            .subscribe((response) => this.top10Points = response);
    }
}