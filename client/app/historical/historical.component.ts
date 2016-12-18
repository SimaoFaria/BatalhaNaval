//TODO: pesquiasr um id de um game errado e dar mensagem de erro ao inves de rebentar
//TODO: logica de apresentaçã - butoes disable e enable

//TODO: exemplo de como é os graficos - http://www.primefaces.org/primeng/#/chart/bar
// this.dataChartAVGGamesPerDay = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     datasets: [
//         {
//             label: 'My First dataset',
//             backgroundColor: '#42A5F5',
//             borderColor: '#1E88E5',
//             dataChartAVGGamesPerDay: [65, 59, 80, 81, 56, 55, 40]
//         },
//         {
//             label: 'My Second dataset',
//             backgroundColor: '#9CCC65',
//             borderColor: '#7CB342',
//             dataChartAVGGamesPerDay: [28, 48, 40, 19, 86, 27, 90]
//         }
//     ]
// }



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

            this.historicalService.getMyHistorical(this.authenticationService.username)
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
            default : ;//TODO ERRO? mostrar onde?
        }
    }

    /**
     * Method that call all operation that submit action should do
     * */
    public verifyResults(response) : void {

        try {

            //TODO como fazer quando a resposta devolvida é um erro EX 500 nternel server error
            // if(response.hasOwnProperty('code')){
            //     throw new Error('ERROR:\n' + 'code: ' + response.code + ' message: ' + response.message);
            // }

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

            this.statisticsService.getStatisticsAVGGamesDay()
                .subscribe((response) => {

                    try {

                        if(!response.length){
                            throw new Error('No data found!');
                        }

                        //TODO se tiver dados guardar numa class que transforma os dados recebidos num formato que o grafico consiga ler
                        //this.historicals = response;

                    }catch (e) {
                        this.errorDataChartAVGGamesPerDay = e.message;
                    }

                });

            this.statisticsService.getStatisticsTop5NumberGames()
                .subscribe((response) => {

                    try {

                        if(!response.length){
                            throw new Error('No data found!');
                        }

                        //TODO se tiver dados guardar numa class que transforma os dados recebidos num formato que o grafico consiga ler
                        //this.historicals = response;

                    }catch (e) {
                        this.errorDataChartTop5PlayerWithMoreGames = e.message;
                    }

                });



            this.dataChartAVGGamesPerDay = {
                labels: ['09/12/2016', '15/12/2016', '17/12/2016', '01/12/2121', '21/21/2121'],
                datasets: [
                    {
                        label: '09/12/2016',
                        backgroundColor: '#42A5F5',
                        borderColor: '#1E88E5',
                        data: [3]
                    },
                    {
                        label: '15/12/2016',
                        backgroundColor: '#9CCC65',
                        borderColor: '#7CB342',
                        data: [0, 2]
                    },
                    {
                        label: '15/12/2016',
                        backgroundColor: '#42A5F5',
                        borderColor: '#1E88E5',
                        data: [0, 0, 4]
                    },
                    {
                        label: '15/12/2016',
                        backgroundColor: '#9CCC65',
                        borderColor: '#7CB342',
                        data: [0, 0, 0, 7]
                    }
                ]
            }

            this.dataChartTop5PlayerWithMoreGames = {
                labels: ['Tonny do Rock','Albino','Travolta'],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ]
                    }]
            };
        }

    }

    /**
    * DEBUG
    * */
    get diagnostic() { return JSON.stringify(this); }
}