import { Component, OnInit  } from '@angular/core';

/**
 * Models
 * */
import { Historical } from './models/historical';


/**
 * Services
 * */
import { HistoricalService } from './services/historical.service';
import {AuthenticationService} from "../login-register/_services/authentication.service";
import {StatisticsService} from "../services/statistics/statistics.service";
import {Statistic, Statistic} from "../_models/statistics";
import push = require("core-js/fn/array/push");


@Component({
    moduleId: module.id,
    selector: 'historical',
    templateUrl: './historical.component.html',
    styleUrls: [ './historical.component.css' ],
})

export class HistoricalComponent implements OnInit{

    private _FILTERS = [{ value: 'IDGame', label: 'IDGame'}, { value: 'createdBy', label: 'Created By'}, {value:'winner', label: 'Winner'}, {value:'player', label:'Player'}];

    private historicals: Historical[];
    private error : string;

    private selectedFilterString : string;
    private valueToSearch : string;

    private hasStatisticsSelected : boolean;

    private dataChartAVGGamesPerDay: any;
    private errorDataChartAVGGamesPerDay : string;

    private dataChartTop5PlayerWithMoreGames : any;
    private errorDataChartTop5PlayerWithMoreGames : string;

    constructor(
        private historicalService: HistoricalService,
        private authenticationService: AuthenticationService,
        private statisticsService: StatisticsService) {

        this.inicializeFields();
    }

    /**
     * Inicialize variable values
     * */
    private inicializeFields() : void {

        this.resetFields();
    }

    /**
     * Reset variable values
     * */
    private resetFields() : void {
        this.historicals = [];
        this.error = '';
        this.selectedFilterString = 'IDGame';
        this.hasStatisticsSelected = false;
    }

    /**
     * Method that call the API service method that returns all my games if I was logged
     * otherwise returns an exception
     * */
    public getMyGames() : void {

        this.resetFields();

        try {

            if(!this.authenticationService.hasLogged){
                throw new Error('To see this option you must be logged in!');
            }

            console.log(this.authenticationService.user.username);

            this.historicalService.getMyHistorical(this.authenticationService.user.username)
                .subscribe((response) => {

                    try {

                        console.log(response);

                        if(!response.length){
                            throw new Error('No data found!');
                        }

                        this.historicals = response;

                    }catch (e) {
                        this.historicals = [];
                        this.error = e.message;
                    }

                });

        }catch (e) {
            this.historicals = [];
            this.error = e.message;
        }

    }

    /**
     * Method that call the API service method that returns all games
     * */
    public getAllGames() : void {

        this.resetFields();

        this.historicalService.getHistorical()
            .subscribe((response) => {

                try {

                    if(!response.length){
                        throw new Error('No data found!');
                    }

                    this.historicals = response;

                }catch (e) {
                    this.historicals = [];
                    this.error = e.message;
                }

            });


        this.statisticsService.getStatisticsAVGGamesDay()
            .subscribe((response) => {

                try {

                    if(!response.length){
                        throw new Error('No data found!');
                    }

                    let statistics : Statistic[] = [];
                    let labels : string[] = [];
                    let datasets : any[] = [];
                    let currentBackgroundColor : string = '';
                    let currentBorderColor : string = '';

                    let i : number = 0;
                    for(var itStatistic of response) {
                        statistics.push(new Statistic(itStatistic._id, itStatistic.resultCount));
                        labels.push(itStatistic._id);
                        console.log("_id: " + itStatistic._id);
                        console.log("resultCount" + itStatistic.resultCount);

                        if(i % 2 == 0) {
                            currentBackgroundColor = '#42A5F5';
                            currentBorderColor = '#1E88E5';
                        }else {
                            currentBackgroundColor = '#9CCC65';
                            currentBorderColor = '#7CB342';
                        }


                        datasets.push({
                            label: itStatistic._id,
                            backgroundColor: currentBackgroundColor,
                            borderColor: currentBorderColor,
                            data: [itStatistic.resultCount]
                        });

                        i++;
                    }

                    this.dataChartAVGGamesPerDay = {
                        labels: labels,
                        datasets: datasets
                    };

                    console.log("xxxxxxx");
                    console.dir(this.dataChartAVGGamesPerDay);
                    console.log("xxxxxxx");

                }catch (e) {
                    this.errorDataChartAVGGamesPerDay = e.message;
                }

            });

        this.statisticsService.getStatisticsTop5NumberGames()
            .subscribe((response2 : any) => {

                try {

                    console.dir(response2);

                    /*if(response2.length){
                     throw new Error('No data found!');
                     }*/


                    let numbreOfGames : number;
                    //numbreOfGames = response.numbreOfGames;

                    let labels  : string[] = [];
                    let values : number;
                    let datasets : any[] = [];
                    let backgroundColor : string[] = ["#FF6384", "#36A2EB", "#FFCE56"];
                    let hoverBackgroundColor : string[] = ["#FF6384", "#36A2EB", "#FFCE56"];
                    let dataR : number[] = [];

                    for(var itStatistic2 of response2.result){
                        labels.push(itStatistic2._id);
                        //dataR.push(itStatistic.resultCount)
                        console.log(itStatistic2);
                        dataR.push(itStatistic2.resultCount);
                    }

                    console.dir(labels);
                    console.dir(dataR);


                    this.dataChartTop5PlayerWithMoreGames = {
                        labels: labels,
                        datasets: [
                            {
                                data: dataR,
                                backgroundColor: backgroundColor,
                                hoverBackgroundColor: hoverBackgroundColor
                            }]
                    };

                }catch (e) {
                    this.errorDataChartTop5PlayerWithMoreGames = e.message;
                }

            });
    }

    /**
     * Update place holder for value to search
     * */
    public select(event) : void{ this.selectedFilterString = event.target.value; }

    /**
     * Method that decide what service call to handler de search values and load if exit otherwise return a exception
     * */
    public search() : void {

        let filter : string = this.selectedFilterString;
        let value : string = this.valueToSearch;

        this.resetFields();

        switch (filter) {
            case 'IDGame':
                this.historicalService.getHistoricalsByIDGame(value)
                    .subscribe((response) => {
                        this.verifyResults(response);
                    });
                break;

            case 'createdBy':
                this.historicalService.getHistoricalsByGameCreator(value)
                    .subscribe((response) => {
                        this.verifyResults(response);
                    });
                break;

            case 'winner':
                this.historicalService.getHistoricalsByWinnerPlayer(value)
                    .subscribe((response) => {
                        this.verifyResults(response);
                    });
                break;

            case 'player':
                this.historicalService.getHistoricalsByPlayer(value)
                    .subscribe((response) => {
                        this.verifyResults(response);
                    });
                break;
            default : ;
        }
    }

    /**
     * Method that call all operation that submit action should do
     * */
    public verifyResults(response) : void {

        try {

            if(!response.length){
                throw new Error('No data found for ' + this.selectedFilterString + ' => ' + this.valueToSearch);
            }

            this.historicals = response;

        }catch (e) {
            this.error = e.message;
        }
    }

    /**
     * Method that call all operation that submit action should do
     * */
    public onSubmit(event) : void { this.search(); event.preventDefault();}

    /**
     * Method call on component is initialized
     * */
    public ngOnInit(): void { this.getAllGames(); }

    /**
     * Toogle the Statistics graph on template
     * */
    toogleStatistics(){
        this.hasStatisticsSelected = (this.hasStatisticsSelected) ? false : true;

        if(this.hasStatisticsSelected) {

        }
    }

    /**
     * DEBUG
     * */
    get diagnostic() { return JSON.stringify(this); }
}