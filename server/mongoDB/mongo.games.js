'use strict';

var mongodb = require('mongodb');
var database = require('./mongo.database');
var games = module.exports = {};

function getGames(request, response, next){
	// TODO: query games collection 
	// and return a JSON response will all games
	database.db.collection("games").find({}).toArray(function(err, games) {
		if(err) {
        console.log(err);
        next();
    } else {
	    response.json(games);
	    next();
    }
  });
}

function getGame(request, response, next){
	// TODO: obtain one game (by ObjectID) from games collection 
	// and return a JSON response with that game
	// Endpoint URL example: api/v1/games/58299dfa515f3da86af58060
	var id = new mongodb.ObjectID(request.params.id);
	database.db.collection("games").findOne({_id:id},function(err, game) {
		if(err) {
        console.log(err);
        next();
    } else {
	    response.json(game);
	    next();
    }
  });
}

function updateGame(request, response, next){
	// TODO: updates one game of the games collection
	// from the object sent on the request body. 
	// Return a JSON response with that game  

	var id = new mongodb.ObjectID(request.params.id);
	var player = request.body;
	player._id = id;

	database.db.collection("games").save(player,function(err, result) {
		if(err) {
        console.log(err);
        next();
    } else {
	    database.db.collection("games").findOne({_id:id},function(err, game) {
	  		if(err) {
		        console.log(err);
		        next();
		    } else {
			    response.json(game);
			    next();
		    }
		  });
    }
  });
}

function createGame(request, response, next){
	// TODO: create a new game and save it on the games collection
	// New game data is obtained from the object sent on the request body. 
	// Return a JSON response with that game  

	var player = request.body;

	database.db.collection("games").insertOne(player,function(err, result) {
		if(err) {
        console.log(err);
        next();
    } else {
    	console.log (result);
    	var id = result.insertedId;
	    database.db.collection("games").findOne({_id:id},function(err, game) {
	  		if(err) {
		        console.log(err);
		        next();
		    } else {
			    response.json(game);
			    next();
		    }
		  });
    }
  });
}

function deleteGame(request, response, next){
	// TODO: removes one game from the games collection
	// Return a JSON response with a message "Game -XXX- Deleted"

	var id = new mongodb.ObjectID(request.params.id);
	database.db.collection("games").deleteOne({_id:id},function(err, result) {
		if(err) {
        console.log(err);
        next();
    } else {
	    response.json({msg:"Game -"+id+"-  Deleted"});
	    next();
    }
  });
}

function getHistoricals(request, response, next){
	// TODO: query games collection 
	// and return a JSON response will all games
	database.db.collection("games").find({"status":"ENDED"}).toArray(function(err, games) {
		if(err) {
        console.log(err);
        next();
    } else {
	    response.json(games);
	    next();
    }
  });
}

function getHistoricalsByUsername(request, response, next){
	// TODO: obtain one game (by ObjectID) from games collection 
	// and return a JSON response with that game
	// Endpoint URL example: api/v1/games/58299dfa515f3da86af58060
	//var username = new mongodb.ObjectID(request.params.username);
	var username = request.params.username;
	database.db.collection("games").find( {$and: [{"players.username":username}, {"status":"ENDED"}]}).toArray(function(err, games) {
		if(err) {
        console.log(err);
        next();
    } else {
	    response.json(games);
	    next();
    }
  });
}


function getPendingGames(request, response, next){
	// return a JSON response will all pending games
	database.db.collection("games").find({ "status": "PENDING", $where:'this.players.length < 4' }).toArray(function(err, games) {
		if(err) {
        console.log(err);
        next();
    } else {
	    response.json(games);
	    next();
    }
  });
}


/**
 * VERSÃO DIRETA DO GAMES
 * */
function getCurrentGames(request, response, next){
	// TODO: obtain one game (by ObjectID) from games collection
	// and return a JSON response with that game
	// Endpoint URL example: api/v1/games/58299dfa515f3da86af58060
	//var username = new mongodb.ObjectID(request.params.username);
	var username = request.params.username;
	database.db.collection("games").find({$and: [{status:{$in:["PENDING", "INPROGRESS"]}}, {"players.username":username}]}).toArray(function(err, games) {
		if(err) {
        console.log(err);
        next();
    } else {
	    response.json(games);
	    next();
    }
  });
}



function getCurrentStateGames(request, response, next){
	// TODO: obtain one game (by ObjectID) from games collection
	// and return a JSON response with that game
	// Endpoint URL example: api/v1/games/58299dfa515f3da86af58060
	//var username = new mongodb.ObjectID(request.params.username);

	//TODO fazer bem feito par nao haver falhas de segurança (so passar o tabuleiro do utilizar e o estado e o id e blablabla)
	//var select = {players[0].tabuleiros.};

	var username = request.params.username;
	//database.db.collection("games").find({$and: [{status:{$in:["pending", "INPROGRESS"]}}, {"players.username":username}]}, { players: { $elemMatch: { username: username }}}).toArray(function(err, games) {
	database.db.collection("games").find({$and: [{status:{$in:["PENDING", "INPROGRESS"]}}, {"players.username":username}]}).toArray(function(err, games) {
		if(err) {
			console.log(err);
			next();
		} else {

            var gamesIds = [];
            for(var idx in games){
                gamesIds.push(games[idx]._id.toString());
            }

            database.db.collection("games-details").find({idGame : {$in:gamesIds}}).toArray(function(err, gamesStates) {
                if(err) {
                    console.log(err);
                    next();
                } else {
                	console.log(gamesStates);
                    response.json(gamesStates);
                    next();
                }
            });

			// response.json(games);
			// next();
		}
	});
}


//TODO http://www.fusioncharts.com/blog/2013/12/jsdoc-vs-yuidoc-vs-doxx-vs-docco-choosing-a-javascript-documentation-generator/
/**
 * Takes a number and returns its square value
 *
 * @param {number} num - The number for squaring
 * @return {number}
 */
function putCurrentStateGames(request, response, next) {

	var idGame = request.params.id;
    console.log("id: " + idGame);

	var body = request.body;
    console.log("body: " + request.body);

	var username = body.username;
    console.log("username: " + username);

	var boardDefense = body.boardDefense;
    console.log("boardDefense: " + boardDefense);

	var status = body.status;
	console.log("status" + status);

	var updateStatus = body.updateStatus;
	console.log("updateStatus" + updateStatus);

    // if(typeof boardDefense === 'string'){
    //     console.log("entrou no if");
    //     boardDefense = '{"boardDefense" :' + boardDefense +'}';
    //     console.log(boardDefense);
    // }

    // console.log("Objecto");
    // var obj = '{"username" : "Cao de Agua","boardDefense" : [{"position": { "line": "B", "column": 5},"type": "PortaAvioes","orientation": "Normal"}]}';
    // console.log(JSON.stringify(obj));
    // //e utiliza JSON.parse(obj)


	database.db.collection("games-details").updateOne(
		{ idGame: idGame, username: username},
		{
			$set: {
				status: status,
				boardDefense: boardDefense
			}
		},
		function(err, result) {
			if(err) {
				console.log(err);
				next();
			} else {
				database.db.collection("games-details").findOne({ idGame: idGame, username: username},function(err, game) {
					if(err) {
						console.log(err);
						next();
					} else {

						/*********************************************/
						//TODO atualizar tbm na coleção games se updateStatus === true
						// var id = new mongodb.ObjectID(request.params.id);
						// var player = request.body;
						// player._id = id;
                        //
						// database.db.collection("games").save(player,function(err, result) {
						// 	if(err) {
						// 		console.log(err);
						// 		next();
						// 	} else {
						// 		database.db.collection("games").findOne({_id:id},function(err, game) {
						// 			if(err) {
						// 				console.log(err);
						// 				next();
						// 			} else {
						// 				response.json(game);
						// 				next();
						// 			}
						// 		});
						// 	}
						// });

						var id = new mongodb.ObjectID(idGame);

						database.db.collection("games").updateOne(
							{ _id: id},
							{
								$set: {
									status: status
								}
							},
							function(err, result) {
								if (err) {
									console.log(err);
									next();
								} else {
									//next();

									response.json(game);
									next();
								}
							}
						);



						/*********************************************/





						// response.json(game);
						// next();
					}
				});
			}
		}
	);
}



// Routes for the games
games.init = function(server,apiBaseUri){
	server.get(apiBaseUri+'games',getGames);
	server.get(apiBaseUri+'games/:id',getGame);
	server.put(apiBaseUri+'games/:id',updateGame);
	server.post(apiBaseUri+'games',createGame);
	server.del(apiBaseUri+'games/:id',deleteGame);
	server.get(apiBaseUri+'historicals', getHistoricals);
	server.get(apiBaseUri+'historicals/:username', getHistoricalsByUsername);
	server.get(apiBaseUri+'pending-games',getPendingGames);
	server.get(apiBaseUri+'current-games/:username', getCurrentGames);
	server.get(apiBaseUri+'current-state-games/:username', getCurrentStateGames);
	server.put(apiBaseUri+'current-state-games/:id', putCurrentStateGames);

	console.log("Games routes registered");
}



  