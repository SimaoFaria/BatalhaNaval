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
var core_1 = require('@angular/core');
/**
 * Services
 * */
var historical_service_1 = require('./services/historical.service');
var authentication_service_1 = require("../login-register/_services/authentication.service");
var statistics_service_1 = require("../services/statistics/statistics.service");
var statistics_1 = require("../_models/statistics");
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
            console.log(this.authenticationService.user.username);
            this.historicalService.getMyHistorical(this.authenticationService.user.username)
                .subscribe(function (response) {
                try {
                    console.log(response);
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
        this.statisticsService.getStatisticsAVGGamesDay()
            .subscribe(function (response) {
            try {
                if (!response.length) {
                    throw new Error('No data found!');
                }
                var statistics = [];
                var labels = [];
                var datasets = [];
                var currentBackgroundColor = '';
                var currentBorderColor = '';
                var i = 0;
                for (var _i = 0, response_1 = response; _i < response_1.length; _i++) {
                    var itStatistic = response_1[_i];
                    statistics.push(new statistics_1.Statistic(itStatistic._id, itStatistic.resultCount));
                    labels.push(itStatistic._id);
                    console.log("_id: " + itStatistic._id);
                    console.log("resultCount" + itStatistic.resultCount);
                    if (i % 2 == 0) {
                        currentBackgroundColor = '#42A5F5';
                        currentBorderColor = '#1E88E5';
                    }
                    else {
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
                _this.dataChartAVGGamesPerDay = {
                    labels: labels,
                    datasets: datasets
                };
                console.log("xxxxxxx");
                console.dir(_this.dataChartAVGGamesPerDay);
                console.log("xxxxxxx");
            }
            catch (e) {
                _this.errorDataChartAVGGamesPerDay = e.message;
            }
        });
        this.statisticsService.getStatisticsTop5NumberGames()
            .subscribe(function (response2) {
            try {
                console.dir(response2);
                /*if(response2.length){
                 throw new Error('No data found!');
                 }*/
                var numbreOfGames = void 0;
                //numbreOfGames = response.numbreOfGames;
                var labels = [];
                var values = void 0;
                var datasets = [];
                var backgroundColor = ["#FF6384", "#36A2EB", "#FFCE56"];
                var hoverBackgroundColor = ["#FF6384", "#36A2EB", "#FFCE56"];
                var dataR = [];
                for (var _i = 0, _a = response2.result; _i < _a.length; _i++) {
                    var itStatistic2 = _a[_i];
                    labels.push(itStatistic2._id);
                    //dataR.push(itStatistic.resultCount)
                    console.log(itStatistic2);
                    dataR.push(itStatistic2.resultCount);
                }
                console.dir(labels);
                console.dir(dataR);
                _this.dataChartTop5PlayerWithMoreGames = {
                    labels: labels,
                    datasets: [
                        {
                            data: dataR,
                            backgroundColor: backgroundColor,
                            hoverBackgroundColor: hoverBackgroundColor
                        }]
                };
            }
            catch (e) {
                _this.errorDataChartTop5PlayerWithMoreGames = e.message;
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
            default: ;
        }
    };
    /**
     * Method that call all operation that submit action should do
     * */
    HistoricalComponent.prototype.verifyResults = function (response) {
        try {
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
        this.hasStatisticsSelected = (this.hasStatisticsSelected) ? false : true;
        if (this.hasStatisticsSelected) {
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