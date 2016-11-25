'use strict';
(function(){

    var database = require('./mongo.database');
    var url = 'mongodb://localhost:27017/db_mongo_proj_battle_naval';

    var players = [
        {
            "name" : "Albert Einstein",
            "username" : "albert",
            "passwordHash" : "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8",
            "avatar" : "https://api.adorable.io/avatars/285/albert.png",
            "totalVictories" : 10,
            "totalPoints" : 500
        },
        {
            "name" : "Carl Sagan cenas",
            "username" : "carl",
            "passwordHash" : "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8",
            "avatar" : "https://api.adorable.io/avatars/285/carl.png",
            "totalVictories" : 5,
            "totalPoints" : 324
        },
        {
            "name" : "Richard Feynman",
            "username" : "richard",
            "passwordHash" : "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8",
            "avatar" : "https://api.adorable.io/avatars/285/richard.png",
            "totalVictories" : 1,
            "totalPoints" : 1000
        },
        {
            "name" : "Test Player",
            "username" : "P1",
            "passwordHash" : "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8",
            "avatar" : "https://api.adorable.io/avatars/285/albert.png",
            "totalVictories" : 13,
            "totalPoints" : 11
        },
        {
            "name" : "Test Player2",
            "username" : "P2",
            "passwordHash" : "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8",
            "avatar" : "https://api.adorable.io/avatars/285/albert.png",
            "totalVictories" : 123,
            "totalPoints" : 999
        }
    ];

    var games = [
        {
            "status" : "pending",
            "createdBy" : "Tonny do rock",
            "aborted" : false,
            "startDate" : "21-21-2121",
            "endDate" : "21-21-2221",
            "winner" : "Travolta",
            "players" : [ 
                {
                    "username" : "Tonny",
                    "score" : 12,
                    "classification" : "1"
                }, 
                {
                    "username" : "Manuel",
                    "score" : 20,
                    "classification" : "2"
                }
            ]
        },
        {
            "status" : "ended",
            "createdBy" : "Tonny do rock",
            "aborted" : false,
            "startDate" : "21-21-2121",
            "endDate" : "21-21-2221",
            "winner" : "Travolta",
            "players" : [ 
                {
                    "username" : "Tonny",
                    "score" : 12,
                    "classification" : "1"
                }, 
                {
                    "username" : "Manuel",
                    "score" : 20,
                    "classification" : "2"
                }
            ]
        },
        {
            "status" : "pending",
            "createdBy" : "Zeca Estancionancio",
            "aborted" : false,
            "startDate" : "21-21-2121",
            "endDate" : "21-21-2221",
            "winner" : "Travolta",
            "players" : [ 
                {
                    "username" : "Tonny",
                    "score" : 12,
                    "classification" : "1"
                }, 
                {
                    "username" : "Manuel",
                    "score" : 20,
                    "classification" : "2"
                }, 
                {
                    "username" : "Manuel",
                    "score" : 20,
                    "classification" : "2"
                }, 
                {
                    "username" : "Manuel",
                    "score" : 20,
                    "classification" : "2"
                }
            ]
        },
        {
            "status" : "pending",
            "createdBy" : "Tonny do rock",
            "aborted" : false,
            "startDate" : "21-21-2121",
            "endDate" : "21-21-2221",
            "winner" : "Travolta",
            "players" : [ 
                {
                    "username" : "Manuel",
                    "score" : 20,
                    "classification" : "2"
                }
            ]
        },
        {
            "status" : "ended",
            "createdBy" : "Cao de Agua",
            "aborted" : true,
            "startDate" : "21-21-2121",
            "endDate" : "21-21-2221",
            "winner" : "Stalone",
            "players" : [ 
                {
                    "username" : "Tonny",
                    "score" : 12,
                    "classification" : "1"
                }, 
                {
                    "username" : "Manuel",
                    "score" : 20,
                    "classification" : "2"
                }
            ]
        }
    ];

    function createPlayer(player){
    	database.db.collection("players").insertOne(player,function(err, result) {
            if(err) {
                console.log(err);
            } else {
                var id = result.insertedId;
                database.db.collection("players").findOne({_id:id},function(err, player) {
                    if(err) {
                        console.log(err);
                    } else {
                        //console.log('Player ' + player._id + ' created.');
                        console.log('Player "' + player.username + '" created.');
                    }
                });
            }
        });
    }

    function createGame(game){
        database.db.collection("games").insertOne(game,function(err, result) {
            if(err) {
            console.log(err);
            } else {
                var id = result.insertedId;
                database.db.collection("games").findOne({_id:id},function(err, game) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log('Game "' + game._id + '" created.');                    
                    }
                });
            }
        });
    }

    database.connect(url, function () {

        console.log('\nInserting data...\n');

        players.forEach(function(player) {
            createPlayer(player);
        });

        games.forEach(function(game) {
            createGame(game);
        });

        //process.exit(0);
    });
}());