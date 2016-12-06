'use strict';

var mongodb = require('mongodb');
var database = require('./mongo.database');
var games = module.exports = {};

function getGames(request, response, next){
	// TODO: query games collection 
	// and return a JSON response will all games
	
	database.db.collection("games").find({}).toArray(function(err, games) {
	//database.db.collection("games").find({"players.username": "Mario"}, { players: { $elemMatch: { username: "Mario" }}}).toArray(function(err, games) {
	
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
	var game = request.body;
	game._id = id;

	database.db.collection("games").save(game,function(err, result) {
		if(err) {
        console.log(err);
        next();
    } else {
	    database.db.collection("games").findOne({_id:id},function(err, returnedGame) {
	  		if(err) {
		        console.log(err);
		        next();
		    } else {

				// console.log(returnedGame);

				// if (returnedGame.status !== "INWAITINGROOM") {

					// database.db.collection("games-details").findOne({idGame:id},function(err, gameDetails) {
					// 	if(err) {
					// 		console.log(err);
					// 		next();
					// 	} else {

					// 		gameDetails.status = game.status;

					// 		database.db.collection("games-details").save(gameDetails,function(err, result) {
					// 			if(err) {
					// 				console.log(err);
					// 				next();
					// 			} else {
					// 				database.db.collection("games-details").findOne({idGame:id},function(err, gameDetails) {
					// 					if(err) {
					// 						console.log(err);
					// 						next();
					// 					} else {

					// 						//response.json(gameDetails);
					// 						next();
					// 					}
					// 				});
					// 			}
					// 		});

					// 		//response.json(gameDetails);
					// 		next();
					// 	}
					// });
				// }

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

	// games-details

	var game = request.body;

	database.db.collection("games").insertOne(game,function(err, result) {
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

				// var gameDetails = {
				// 	"idGame" : game._id,
				// 	"status" : game.status,
				// 	"username" : game.createdBy,
				// 	"boardDefense" : [],
				// 	"boardsAttack" : []
				// }

				// database.db.collection("games-details").insertOne(gameDetails,function(err, result) {
				// 	if(err) {
				// 		console.log(err);
				// 		next();
				// 	} else {
				// 		console.log (result);
				// 		var id = result.insertedId;
				// 		database.db.collection("games-details").findOne({_id:id},function(err, gameDetails) {
				// 			if(err) {
				// 				console.log(err);
				// 				next();
				// 			} else {
				// 				//response.json(gameDetails);
				// 				next();
				// 			}
				// 		});
				// 	}
				// });

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
	    // response.json({msg:"Game -"+id+"-  Deleted"});

		if (result.status !== "INWAITINGROOM") {

			database.db.collection("games-details").deleteOne({idGame:id},function(err, result) {
				if(err) {
					console.log(err);
					next();
				} else {
					// response.json({msg:"Game -"+id+"-  Deleted"});

					//response.json(result);
					next();
				}
			});
		}

	    response.json(result);
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


function getGamesInRoom(request, response, next){
	// return a JSON response will all pending games
	database.db.collection("games").find( { "status": "INWAITINGROOM" }).toArray(function(err, games) {
		if(err) {
        console.log(err);
        next();
    } else {
	    response.json(games);
	    next();
    }
  });
}

function startGame(request, response, next){
	// TODO: updates one game of the games collection
	// from the object sent on the request body. 
	// Return a JSON response with that game  

	var id = new mongodb.ObjectID(request.params.id);
	var game = request.body;
	game._id = id;

	database.db.collection("games").save(game,function(err, result) {
		if(err) {
        console.log(err);
        next();
    } else {
	    database.db.collection("games").findOne({_id:id},function(err, game) {
	  		if(err) {
		        console.log(err);
		        next();
		    } else {


				game.players.forEach((player) => {

					var gameDetails = {
						//"_id" : new mongodb.ObjectID(),
						"idGame" : game._id,
						"status" : game.status,
						// "username" : "",
						"username" : player.username,
						"boardDefense" : [],
						"boardsAttack" : []
					}
					// gameDetails._id = new mongodb.ObjectID(gameDetails.idGame, gameDetails.username);
					// gameDetails.username = player.username;

					database.db.collection("games-details").insertOne(gameDetails,function(err, result) {
						if(err) {
							console.log(err);
							next();
						} else {
							console.log (result);
							var id = result.insertedId;
							database.db.collection("games-details").findOne({_id:id},function(err, gameDetails) {
								if(err) {
									console.log(err);
									next();
								} else {
									//response.json(gameDetails);
									next();
								}
							});
						}
					});
				});

			    response.json(game);
			    next();
		    }
		  });
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

	//PARAMS
	var idGame = request.params.id;

	//BODY
	var body = request.body;
	var username = body.username;
	var status = body.status;
	var updateStatus = body.updateStatus;
	var boardDefense = body.boardDefense;
	var boardsAttack = body.boardsAttack;


	/**
	 * DEBUG
	 * */
	console.log("--------- putCurrentStateGames ---------");
	console.log("id: " + idGame);
	console.log("body: " + request.body);
	console.log("username: " + username);
	console.log("status" + status);
	console.log("updateStatus" + updateStatus);
	console.log("boardDefense: " + boardDefense);
	console.log("boardsAttack");
	for (var boardAttack in boardsAttack) {
		console.log();
		console.log(boardsAttack[boardAttack]);
	}


	console.log("-----------------------------------------");

	database.db.collection("games-details").updateOne(
		{ idGame: idGame, username: username},
		{
			$set: {
				status: status,
				boardDefense: boardDefense,
				boardsAttack: boardsAttack
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

						// response.json(game);
						// next();
					}
				});
			}
		}
	);
}

function getHasShot(request, response, next){

	//PARAMS
	var idGame = request.params.id;

	//BODY
	var body = request.body;
	var opponentUsername = body.opponentUsername;
	var line = body.line;
	var column = body.column;

	/**
	 * DEBUG
	 * */
	// console.log("idGame: " + idGame);
	// console.log("opponentUsername: " + opponentUsername);
	// console.log("line: " + line);
	// console.log("column: " + column);


	database.db.collection("games-details").findOne(
		{ idGame: idGame, username: opponentUsername},
		function(err, game) {
			if(err) {
				console.log(err);
				next();
			} else {

				var result = '';
				//var draw = '0';
				//var message = null;

				for (var idx in game.boardDefense) {

					//SHOT
					if(game.boardDefense[idx].position.line == line
						&& game.boardDefense[idx].position.column == column) {
						//draw = 'X';
						result = 'Posição '+line+column +' - Tiro no ' + game.boardDefense[idx].type;

						//Todo inserir na BD o X

					}

				}

				//TODO se nao estava na a posição inseriri o 0 (flag)


				// result = {
				// 	'draw': draw,
				// 	'message': message
				// }

				response.json(result);
				next();
			}
	});
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
	server.get(apiBaseUri+'waiting-room-games', getGamesInRoom);
	server.put(apiBaseUri+'start-game/:id', startGame);
	server.get(apiBaseUri+'current-games/:username', getCurrentGames);
	server.get(apiBaseUri+'current-state-games/:username', getCurrentStateGames);
	server.put(apiBaseUri+'current-state-games/:id', putCurrentStateGames);
	server.post(apiBaseUri+'current-state-games-shot/:id', getHasShot);

	console.log("Games routes registered");
}



  