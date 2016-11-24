import { Injectable } from '@angular/core';

import { Http } from '@angular/http'; 

import { LeaderboardPlayer } from './leaderboard-player';
import { TestPlayer } from './leaderboard-player';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class LeaderboardService {

    //private leaderboard: LeaderboardPlayer[]
    private leaderboard: TestPlayer[]

    constructor(private http: Http){}

    getLeaderboard():Observable<LeaderboardPlayer[]>{
        return this.http.get('/api/leaderboard')
            .map((response) => this.leaderboard = response.json());
    }

    getTestLeaderboardVictories():Observable<TestPlayer[]>{
        return this.http.get('/api/v1/top10victories')
            .map((response) => this.leaderboard = response.json());
    }

    getTestLeaderboardPoints():Observable<TestPlayer[]>{
        return this.http.get('/api/v1/top10points')
            .map((response) => this.leaderboard = response.json());
    }
}