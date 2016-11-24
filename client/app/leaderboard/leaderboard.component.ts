import { Component } from '@angular/core';

import { LeaderboardPlayer } from './leaderboard-player';
import { TestPlayer } from './leaderboard-player';

import { LeaderboardService } from './leaderboard.service';

@Component({
    moduleId: module.id,
    selector: 'leaderboard',
    templateUrl: 'leaderboard.component.html',
    styles: [`
        .tops{ 
            float:right;
            width:35%; 
            height:100%;
        }

        .points {
            background-color: deepskyblue;
        }

        .victories {
            background-color: gold;
        }

        th, td, h3{
            text-align: center;
        }

        th, td {
            border: 1px solid black;
            border-collapse: collapse;
        }
    `]
})
export class LeaderboardComponent { 
    //leaderboard: LeaderboardPlayer[]
    leaderboardVictories: TestPlayer[]
    leaderboardPoints: TestPlayer[]

    constructor(private leaderboardService:LeaderboardService){
        // this.leaderboard = [
        //         {name:'Albert Einstein',maxScore:9000,avatar:'https://api.adorable.io/avatars/285/albert.png'},
        //         {name:'Carl Sagan',maxScore:8000,avatar:'https://api.adorable.io/avatars/285/carl.png'},
        //         {name:'Richard Feynman',maxScore:8000,avatar:'https://api.adorable.io/avatars/285/richard.png'}
        //     ];

        // this.leaderboardService.getLeaderboard()
        //     .subscribe((leaderboard) => this.leaderboard = leaderboard);


        this.leaderboardService.getTestLeaderboardVictories()
            .subscribe((leaderboard) => this.leaderboardVictories = leaderboard);

        this.leaderboardService.getTestLeaderboardPoints()
            .subscribe((leaderboard) => this.leaderboardPoints = leaderboard);        
    }

}
