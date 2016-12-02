import { Component } from '@angular/core';


@Component({
    selector: 'dashboard',
    templateUrl: './app/dashboard/dashboard.html', //TODO porque não dá ./ ???
    styleUrls: [ './app/dashboard/dashboard.css' ]
    /*styles: [`
    div {
        width:15%;
        height:100%;
        background-color: yellowgreen;
        float:left;
    }
    `]*/
})

export class DashboardComponent {
    title = 'Dashboard';
}