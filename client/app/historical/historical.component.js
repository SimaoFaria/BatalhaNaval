//TODO: pesquiasr um id de um game errado e dar mensagem de erro ao inves de rebentar
//TODO: logica de apresentaçã - butoes disable e enable
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var core_1 = require('@angular/core');
/**
 * Services
 * */
var historical_service_1 = require('./services/historical.service');
var authentication_service_1 = require("../login-register/_services/authentication.service");
var statistics_service_1 = require("../services/statistics/statistics.service");
var HistoricalComponent = (function () {
    function HistoricalComponent(historicalService, authenticationService, statisticsService) {
        this.historicalService = historicalService;
        this.authenticationService = authenticationService;
        this.statisticsService = statisticsService;
        this._FILTERS = [{ value: 'IDGame', label: 'IDGame' }, { value: 'createdBy', label: 'Created By' }, { value: 'winner', label: 'Winner' }, { value: 'player', label: 'Player' }];
        this.inicializeFields();
    }
    /**
     * Inicialize variable values
     * */
    HistoricalComponent.prototype.inicializeFields = function () {
        this.resetFields();
    };
    /**
     * Reset variable values
     * */
    HistoricalComponent.prototype.resetFields = function () {
        this.historicals = [];
        this.error = '';
        this.selectedFilterString = 'IDGame';
        this.hasStatisticsSelected = false;
    };
    /**
     * Method that call the API service method that returns all my games if I was logged
     * otherwise returns an exception
     * */
    HistoricalComponent.prototype.getMyGames = function () {
        var _this = this;
        this.resetFields();
        try {
            if (!this.authenticationService.hasLogged) {
                throw new Error('To see this option you must be logged in!');
            }
            this.historicalService.getMyHistorical(this.authenticationService.username)
                .subscribe(function (response) {
                try {
                    if (!response.length) {
                        throw new Error('No data found!');
                    }
                    _this.historicals = response;
                }
                catch (e) {
                    _this.historicals = [];
                    _this.error = e.message;
                }
            });
        }
        catch (e) {
            this.historicals = [];
            this.error = e.message;
        }
    };
    /**
     * Method that call the API service method that returns all games
     * */
    HistoricalComponent.prototype.getAllGames = function () {
        var _this = this;
        this.resetFields();
        this.historicalService.getHistorical()
            .subscribe(function (response) {
            try {
                if (!response.length) {
                    throw new Error('No data found!');
                }
                _this.historicals = response;
            }
            catch (e) {
                _this.historicals = [];
                _this.error = e.message;
            }
        });
    };
    /**
     * Update place holder for value to search
     * */
    HistoricalComponent.prototype.select = function (event) { this.selectedFilterString = event.target.value; };
    /**
     * Method that decide what service call to handler de search values and load if exit otherwise return a exception
     * */
    HistoricalComponent.prototype.search = function () {
        var _this = this;
        var filter = this.selectedFilterString;
        var value = this.valueToSearch;
        this.resetFields();
        switch (filter) {
            case 'IDGame':
                this.historicalService.getHistoricalsByIDGame(value)
                    .subscribe(function (response) {
                    _this.verifyResults(response);
                });
                break;
            case 'createdBy':
                this.historicalService.getHistoricalsByGameCreator(value)
                    .subscribe(function (response) {
                    _this.verifyResults(response);
                });
                break;
            case 'winner':
                this.historicalService.getHistoricalsByWinnerPlayer(value)
                    .subscribe(function (response) {
                    _this.verifyResults(response);
                });
                break;
            case 'player':
                this.historicalService.getHistoricalsByPlayer(value)
                    .subscribe(function (response) {
                    _this.verifyResults(response);
                });
                break;
            default: ; //TODO ERRO? mostrar onde?
        }
    };
    /**
     * Method that call all operation that submit action should do
     * */
    HistoricalComponent.prototype.verifyResults = function (response) {
        try {
            //TODO como fazer quando a resposta devolvida é um erro EX 500 nternel server error
            // if(response.hasOwnProperty('code')){
            //     throw new Error('ERROR:\n' + 'code: ' + response.code + ' message: ' + response.message);
            // }
            if (!response.length) {
                throw new Error('No data found for ' + this.selectedFilterString + ' => ' + this.valueToSearch);
            }
            this.historicals = response;
        }
        catch (e) {
            this.error = e.message;
        }
    };
    /**
     * Method that call all operation that submit action should do
     * */
    HistoricalComponent.prototype.onSubmit = function (event) { this.search(); event.preventDefault(); };
    /**
     * Method call on component is initialized
     * */
    HistoricalComponent.prototype.ngOnInit = function () { this.getAllGames(); };
    /**
     * Toogle the Statistics graph on template
     * */
    HistoricalComponent.prototype.toogleStatistics = function () {
        var _this = this;
        this.hasStatisticsSelected = (this.hasStatisticsSelected) ? false : true;
        if (this.hasStatisticsSelected) {
            this.statisticsService.getStatisticsAVGGamesDay()
                .subscribe(function (response) {
                try {
                    if (!response.length) {
                        throw new Error('No data found!');
                    }
                }
                catch (e) {
                    _this.errorDataChartAVGGamesPerDay = e.message;
                }
            });
            this.statisticsService.getStatisticsTop5NumberGames()
                .subscribe(function (response) {
                try {
                    if (!response.length) {
                        throw new Error('No data found!');
                    }
                }
                catch (e) {
                    _this.errorDataChartTop5PlayerWithMoreGames = e.message;
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
            };
            this.dataChartTop5PlayerWithMoreGames = {
                labels: ['Tonny do Rock', 'Albino', 'Travolta'],
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
    };
    Object.defineProperty(HistoricalComponent.prototype, "diagnostic", {
        /**
        * DEBUG
        * */
        get: function () { return JSON.stringify(this); },
        enumerable: true,
        configurable: true
    });
    HistoricalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'historical',
            templateUrl: './historical.component.html',
            styleUrls: ['./historical.component.css'],
        }), 
        __metadata('design:paramtypes', [historical_service_1.HistoricalService, authentication_service_1.AuthenticationService, statistics_service_1.StatisticsService])
    ], HistoricalComponent);
    return HistoricalComponent;
}());
exports.HistoricalComponent = HistoricalComponent;
//# sourceMappingURL=historical.component.js.map