import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StatisticsService {

    URLAPI : string = '/api/v1';

    constructor(private http: Http){}

    /**
     * Method of a service that allows through the API '/api/v1' to make a GET request that returns number of games played per day, if they exist
     * @returns {JSON}
     * */
    public getStatisticsAVGGamesDay() : Observable<any[]>{
        return this.http.get(this.URLAPI + '/statistics/avg/games/day')
            .map((response) => response.json());
    }

    /**
     * Method of a service that allows through the API '/api/v1' to make a GET request that returns the number of games played by 5 players with more games, if they exist
     * @returns {JSON}
     * */
    public getStatisticsTop5NumberGames() : Observable<any[]>{
        return this.http.get(this.URLAPI + '/statistics/top5/number-games')
            .map((response) => response.json());
    }
}