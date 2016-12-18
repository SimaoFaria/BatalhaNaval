import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Historical } from '../models/historical.ts';

@Injectable()
export class HistoricalService {

    URLAPI : string = '/api/v1';

    constructor(private http: Http){}

    /**
     * Method of a service that allows through the API '/api/v1' to make a GET request that returns all the games, if they exist
     * @returns {JSON}
     * */
    public getHistorical() : Observable<Historical[]> {
        return this.http.get(this.URLAPI + '/historicals')
            .map((response) => response.json());
    }

    /**
     * Method of a service that allows through the API '/api/v1' to make a request GET that returns all the games of the user with session initiated, if it exists
     * @param {string} username - The username with session initiated.
     * @returns {JSON}
     * */
    public getMyHistorical(username : string) : Observable<Historical[]> {
        return this.http.get(this.URLAPI + '/historicals/' + username)
            .map((response) => response.json());
    }

    /**
     * Method of a service that allows through the API '/api/v1' to make a request GET that return a games, if it exists
     * @param {string} username - The id game
     * @returns {JSON}
     * */
    public getHistoricalsByIDGame(valueToSearch: string) : Observable<Historical[]> {
        return this.http.get(this.URLAPI + '/historicals/gameID/' + valueToSearch)
            .map((response) => response.json());
    }

    /**
     * Method of a service that allows through the API '/api/v1' to make a request GET that return all games that was created by an specific user, if it exists
     * @param {string} username - The username
     * @returns {JSON}
     * */
    public getHistoricalsByGameCreator(valueToSearch: string) : Observable<Historical[]> {
        return this.http.get(this.URLAPI + '/historicals/cretedBy/' + valueToSearch)
            .map((response) => response.json());
    }

    /**
     * Method of a service that allows through the API '/api/v1' to make a request GET that return all games that the winner was a specific user, if it exists
     * @param {string} username - The player username
     * @returns {JSON}
     * */
    public getHistoricalsByWinnerPlayer(valueToSearch: string) : Observable<Historical[]> {
        return this.http.get(this.URLAPI + '/historicals/winner/' + valueToSearch)
            .map((response) => response.json());
    }

    /**
     * Method of a service that allows through the API '/api/v1' to make a request GET that return all games that a specific user has played, if it exists
     * @param {string} username - The player username
     * @returns {JSON}
     * */
    getHistoricalsByPlayer(valueToSearch: string) : Observable<Historical[]> {
        return this.http.get(this.URLAPI + '/historicals/player/' + valueToSearch)
            .map((response) => response.json());
    }
}