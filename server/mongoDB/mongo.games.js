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

  	database.db.collection("games").findOne({_id:id},function(err, returnedGame) {
	if(err) {
		console.log(err);
	} else {

		if (returnedGame.players.length > 3) {
			response.json({
				ok: false,
				message: 'game is full.'
			});	
		} else {
			database.db.collection("games").save(game,function(err, result) {
				if(err) {
					console.log(err);
					next();
				} else {
					database.db.collection("games").findOne({_id:id},function(err, returnedGame) {
						if(err) {
							console.log(err);
						} else {
							response.json({
								ok: true,
								game: returnedGame
							});
						}
					});
				}
			});
		}

		
	}
	});
}

function enterGame(request, response, next){

	var id = new mongodb.ObjectID(request.params.id);
	var game = request.body;
	game._id = id;

  	database.db.collection("games").findOne({_id:id},function(err, returnedGame) {
	if(err) {
		console.log(err);
	} else {

		if (returnedGame.players.length > 3) {
			response.json({
				ok: false,
				message: 'game is full.'
			});	
		} else {
			database.db.collection("games").save(game,function(err, result) {
				if(err) {
					console.log(err);
					next();
				} else {
					database.db.collection("games").findOne({_id:id},function(err, returnedGame) {
						if(err) {
							console.log(err);
						} else {
							response.json({
								ok: true,
								game: returnedGame
							});
						}
					});
				}
			});
		}

		
	}
	});
}

function leaveGame(request, response, next){

	var id = new mongodb.ObjectID(request.params.id);
	var game = request.body;
	game._id = id;

  	database.db.collection("games").save(game,function(err, result) {
		if(err) {
			console.log(err);
		} else {
			database.db.collection("games").findOne({_id:id},function(err, returnedGame) {
				if(err) {
					console.log(err);
				} else {
					response.json({
						ok: true,
						game: returnedGame
					});
				}
			});
		}
	});
}

function createGame(request, response, next){
	// TODO: create a new game and save it on the games collection
	// New game dataChartAVGGamesPerDay is obtained from the object sent on the request body.
	// Return a JSON response with that game  

	// games-details

	var game = request.body;
	game.startDate = new Date(game.startDate);

	database.db.collection("games").insertOne(game,function(err, result) {
		if(err) {
        console.log(err);
        next();
    } else {
    	//console.log (result);
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

/**********************************************************************************************************************
 * 												HISTORICAL															  *
 **********************************************************************************************************************/

/**
 *
 * */
function getHistoricals(request, response, next){
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

/**
 *
 * */
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

/**
 *
 * */
function getHistoricalsByGameID(request, response, next){

	var gameID = request.params.gameID;
	var _id = new mongodb.ObjectID(gameID);

	database.db.collection("games").find({_id:_id, status:"ENDED"}).toArray(function(err, games) {
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
 *
 * */
function getHistoricalsByGameCreator(request, response, next){

	var createdBy = request.params.gameCreator;

	database.db.collection("games").find({createdBy:createdBy, status:"ENDED"}).toArray(function(err, games) {
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
 *
 * */
function getHistoricalsByWinnerPlayer(request, response, next){

	var winner = request.params.playerUsername;

	database.db.collection("games").find({winner:winner, status:"ENDED"}).toArray(function(err, games) {
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
 *
 * */
function getHistoricalsByPlayer(request, response, next){

	var player = request.params.playerUsername;

	database.db.collection("games").find({$and: [{"players.username":player}, {"status":"ENDED"}]}).toArray(function(err, games) {
		if(err) {
			console.log(err);
			next();
		} else {
			response.json(games);
			next();
		}
	});
}

/**********************************************************************************************************************
 * 												STATISTICS															  *
 **********************************************************************************************************************/

/**
 *
 * */
function getStatisticsAVGGamesDay(request, response, next){
	// TODO: query games collection
	// and return a JSON response will all games

	//database.db.collection("games").find({"status":"ENDED"}).count();
	//var nrGames = database.db.collection("games").find({}).count();
	// var nrGames = database.db.collection("games").count();
	// console.log('nrGames' + nrGames);
	//
	// database.db.collection("games").find({"startDate" : "21-21-2121"}).toArray(function(err, games) {
	// if(err) {
	// 	console.log(err);
	// 	next();
	// } else {
	//     var size = games.length;
	//         console.log("AQUI" + size);
	// 	//response.json(games);
	// 	//response.json({'size' : size});
	// 	next();
	// }
	// });



	// var x = database.db.collection("games").aggregate( [ { $group : { _id : "$startDate" } } ] );
	// for (var property in x) {
	//     if (x.hasOwnProperty(property)) {
	//         console.log(x);
	//     }
	// }






	// var result = database.db.collection("games").aggregate( [
	// 	{
	// 		$group : { startDate : "$by_date", num_per_day : {$sum : 1}}
	// 	}
	// ]);
    //
	// console.log(result);
	// response.json(result);

	// response.json({
	// 	"result" : [
	// 	{
	// 		"_id" : "tutorials point",
	// 		"num_tutorial" : 2
	// 	},
	// 	{
	// 		"_id" : "Neo4j",
	// 		"num_tutorial" : 1
	// 	}
	// ],
	// 	"ok" : 1
	// });


	response.json({});
}

/**
 *
 * */
function getStatisticsTop5NumberGames(request, response, next){
	//TODO
	response.json({});
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

					var nrShots = game.players.length - 1;
					nrShots *= 2;

					var otherPlayers = [];
					game.players.forEach((pl) => {
						
						if(pl.username != player.username) {

							var p = {
								"username" : pl.username,
								"board" : []
							}
							otherPlayers.push(p);
						}
					});

					var gameDetails = {
						//"_id" : new mongodb.ObjectID(),
						"idGame" : game._id.toString(),
						"status" : game.status,
						"isPlaying" : true,
						"won" : false,
						"username" : player.username,
						"boardDefense" : [],
						"boardsAttack" : otherPlayers,
						"currentPlayer": game.createdBy,
						"nrShotsRemaining": nrShots,
						"score": 0
					}
					// gameDetails._id = new mongodb.ObjectID(gameDetails.idGame, gameDetails.username);
					// gameDetails.username = player.username;

					database.db.collection("games-details").insertOne(gameDetails,function(err, result) {
						if(err) {
							console.log(err);
						} else {
							console.log (result);
							var id = result.insertedId;
							database.db.collection("games-details").findOne({_id:id},function(err, gameDetails) {
								if(err) {
									console.log(err);
								} else {
									//response.json(gameDetails);
								}
							});
						}
					});
				});

			    response.json({
					ok: true,
					game: game
				});
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
	// database.db.collection("games").find({$and: [{status:{$in:["PENDING", "INPROGRESS"]}}]}).toArray(function(err, games) {
	// 	// console.log("----------------------------------------------");
	// 	// console.log(games);
	// 	// console.log("----------------------------------------------");
		
	// 	if(err) {
	// 		console.log(err);
	// 		next();
	// 	} else {

    //         var gamesIds = [];

	// 		games.forEach((game) => {
	// 			game.players.forEach((player) => {
	// 				if (player.username == username) {
	// 					gamesIds.push(game._id.toString());
	// 				}
	// 			});
	// 		});

    //         database.db.collection("games-details").find({idGame : {$in:gamesIds}, username: username}).toArray(function(err, gamesStates) {
    //             if(err) {
    //                 console.log(err);
    //                 next();
    //             } else {
    //             	//console.log(gamesStates);
    //                 response.json(gamesStates);
    //                 next();
    //             }
    //         });

	// 		// TODO depois considerar este next em vez de dentro do pedido
	// 		// next();
	// 	}
	// });




	// SIMAO mudei isto para em vez de ir primeiro procurar nos GAMES, ir direto aos STATEGAMES
	// TODO mudar depois caso seja apenas usada um documento game com os stategames la dentro
	database.db.collection("games-details").find(
		{ username: username }).toArray(function(err, gamesStates) {
		if(err) {
			console.log(err);
		} else {
			//console.log(gamesStates);
			response.json(gamesStates);
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
	// console.log("--------- putCurrentStateGames ---------");
	// console.log("id: " + idGame);
	// console.log("body: " + request.body);
	// console.log("username: " + username);
	// console.log("status" + status);
	// console.log("updateStatus" + updateStatus);
	// console.log("boardDefense: " + boardDefense);
	// console.log("boardsAttack");
	// for (var boardAttack in boardsAttack) {
	// 	console.log();
	// 	console.log(boardsAttack[boardAttack]);
	// }
    //
    //
	// console.log("-----------------------------------------");

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
				database.db.collection("games-details").findOne({ idGame: idGame, username: username },function(err, game) {
					if(err) {
						console.log(err);
						next();
					} else {

						//SIMAO só faz sentido se for o ultimo a pôr ready ou o owner?
						// var id = new mongodb.ObjectID(idGame);

						// database.db.collection("games").updateOne(
						// 	{ _id: id},
						// 	{
						// 		$set: {
						// 			status: status
						// 		}
						// 	},
						// 	function(err, result) {
						// 		if (err) {
						// 			console.log(err);
						// 			next();
						// 		} else {
						// 			//next();

						// 			response.json(game);
						// 			next();
						// 		}
						// 	}
						// );

						response.json(game);
						next();
					}
				});
			}
		}
	);
}

function swatpTurn(idGame, currentPlayer) {

	// console.log("swatpTurn(" + idGame + "," +  currentPlayer +")");

	//procurar o game que tem o vetor de jogadores

	var id = new mongodb.ObjectID(idGame);
	database.db.collection("games").findOne({ _id: id },function(err, game) {
		if(err) {
			// console.log(err);
			next();
		} else {

			var nextPlayerName = null;

			for(var idx in game.players) {

				// console.log("PLAYER=>" +game.players[idx].username);

				//ver qual o indice do jogador currente
				if(currentPlayer == game.players[idx].username) {

					// console.log("PLAYER CURRENT=>" +game.players[idx].username + "index" + idx);

					//se igual ao tamanho do vetor

					var nrPlayers = game.players.length - 1;
					// console.log("#players: " + nrPlayers);

					if(idx == nrPlayers){
						//passa o primeiro jogador a jogar
						nextPlayerName = game.players[0].username;
						// console.log("New Player 0:" + nextPlayerName);
						//return nextPlayerName;
					}else {
						//se nao passa ao proximo
						var nextIndex = parseInt(idx) + 1;
						// console.log("Nexte index" + nextIndex);
						nextPlayerName = game.players[nextIndex].username;
						// console.log("New Player next:" + nextPlayerName);
						//return nextPlayerName;
					}

				}

			}

			console.log("CONFIRMAÇAO")
			console.log(nextPlayerName)
			return nextPlayerName;
			//next(); //TODO DUVIDA
		}
	});
}

function getHasShot(request, response, next){

	console.log('INICIO getHasShot')

	//PARAMS
	var idGame = request.params.id;

	//BODY
	var body = request.body;
	var opponentUsername = body.opponentUsername;
	var line = body.line;
	var column = body.column;
	var username = body.username;

	var jsonResponse = {
		hit: false,
		shot: '',
		shipType: '', 
		sank: false,
		allShipsSanked: true,
		defendingPlayer: '',
		gameEnded: false,
		nrShotsRemaining: -1,
		currentPlayer: '',
		boardAttack: [],
		obtainedPoints: 0
	}

	var shotterScore = -1;

	/**
	 * 	obtainShotOpponentStateGame
	 * 	treatShips
	 * 	updateOpponentStateGame
	 * 
	 *  obtainMyStateGame
	 *  addShotToMyBoardAttack
	 *  updateMyStateGame
	 * 
	 * 	obtainStateGames
	 *  currentPlayerWithRemainingShots
	 *  updatePlayersWithCurrentPlayerAndNrShots
	 * 
	 *  findPlayersWhoLost
	 *  allPlayersDefeated
	 *  updateMyStatusInGame
	 *  classifyPlayersByScore
	 *  updateStatusInGame
	 * 
	 *  obtainPlayerStats
	 *  updatePlayerScoreAndVictories
	 */

	function obtainShotOpponentStateGame(idGame, opponentUsername, callback) { 
		console.log('1 - obtainShotOpponentStateGame')
		database.db.collection("games-details").findOne(
			{ idGame: idGame, username: opponentUsername},
			function(err, stateGame) {
				console.log('	1 - obtainShotOpponentStateGame')
				if(err) {
					console.log(err);
				} else {
					jsonResponse.defendingPlayer = stateGame.username

					// // callback = obtainGameById
					// callback(idGame, stateGame, updateOpponentStateGame);

					var foo = treatShips(stateGame.boardDefense);
					stateGame.boardDefense = foo.boardDefense;
					jsonResponse.hit = foo.hit;
					jsonResponse.shot = foo.shot;
					jsonResponse.shipType = foo.shipType;
					jsonResponse.allShipsSanked = foo.allShipsSanked;
					jsonResponse.sank = foo.sank;

					if (foo.allShipsSanked) {
						stateGame.status = 'ENDED';
					}

					// callback = updateOpponentStateGame
					callback(stateGame, obtainMyStateGame);
				}
			}
		);
	};

	// obtainShotOpponentStateGame(idGame, opponentUsername, obtainGameById);
	obtainShotOpponentStateGame(idGame, opponentUsername, updateOpponentStateGame);

	function obtainGameById(idGame, stateGame, callback) { 
		console.log('2 - obtainGameById')
		database.db.collection("games").findOne(
			{ _id: new mongodb.ObjectID(idGame) },
			function(err, game) {
				console.log('	2 - obtainGameById')
				if(err) {
					console.log(err);
				} else {

					// TODO isto daqui só pode ser feito depois do update(ou seja pode ser feito no update many)
					// var foo = currentPlayerWithRemainingShots(game, stateGame.nrShotsRemaining, stateGame.currentPlayer);
					// jsonResponse.nrShotsRemaining = foo.nrShotsRemaining;
					// jsonResponse.currentPlayer = foo.currentPlayer;
					
					// stateGame.nrShotsRemaining = foo.nrShotsRemaining;
					// stateGame.currentPlayer = foo.currentPlayer;

					// foo = treatShips(stateGame.boardDefense);
					// var foo = treatShips(stateGame.boardDefense);
					// stateGame.boardDefense = foo.boardDefense;
					// jsonResponse.hit = foo.hit;
					// jsonResponse.shot = foo.shot;
					// jsonResponse.shipType = foo.shipType;
					// jsonResponse.allShipsSanked = foo.allShipsSanked;
					// jsonResponse.sank = foo.sank;

					// if (foo.allShipsSanked) {
					// 	stateGame.status = 'ENDED';
					// }

					// // callback = updateOpponentStateGame
					// callback(stateGame, obtainMyStateGame);
				}
		});
	}

	function treatShips(boardDefense) {
		console.log('2 - treatShips')

		var hit = false;

		var shot = '';
		var shipType = '';
		var sank = false;
		var allShipsSanked = true;

		var obtainedPoints = 0;
		
		//verifica se navio afundou
			// se sim, 
				// atualiza a prop sank do navio
				// e atualiza jsonResponse.afundou
		for (var ship of boardDefense) {
			for (var occupiedPosition of ship.occupiedPositions) {
				if(occupiedPosition.position.line == line
					&& occupiedPosition.position.column == column) {
					
					// TODO entender para que isto serve
					// game._id = new mongodb.ObjectID(game._id);

					hit = true;
					occupiedPosition.hit = true;
					obtainedPoints++;

					shot = 'Posição '+line+column +' - Tiro no ' + ship.type;
					shipType = ship.type;	

					if (ship.type == 'Submarino') {
						ship.sank = true;
						obtainedPoints += 3;
					} else {

						var numTargets = ship.occupiedPositions.length;
						var targetsShot = 0;
						for (var p of ship.occupiedPositions) {
							if (p.hit) {
								targetsShot++;
							}
						}

						if (targetsShot == numTargets) {
							switch (ship.type) {
								case 'ContraTorpedeiro':
									if(numTargets == 2) {
										ship.sank = true;
										obtainedPoints += 5;
									}
									break;
								case 'Cruzador':
									if(numTargets == 3) {
										ship.sank = true;
										obtainedPoints += 10;
									}
									break;
								case 'Couracado':
									if(numTargets == 4) {
										ship.sank = true;
										obtainedPoints += 15;
									}
									break;
								case 'PortaAvioes':
									if(numTargets == 5) {
										ship.sank = true;
										obtainedPoints += 20;
									}
									break;
							}
						}

					}

					if (ship.sank) {
						sank = true;	
					}

					break;
				}
			}
		}

		// TODO se isto fosse uma prop já não era preciso este ciclo, discutir com grupo
		// verifica se jogador tem todos os navios afundados
		for (var ship of boardDefense) {
			if (!ship.sank) {
				allShipsSanked = false;
				break;
			}
		}

		if (allShipsSanked) {
			obtainedPoints += 50;
		}

		jsonResponse.obtainedPoints = obtainedPoints;
		
		console.log('	2 - treatShips')
		return {
			boardDefense: boardDefense,
			hit: hit,
			shot: shot,
			shipType: shipType,
			allShipsSanked: allShipsSanked,
			sank: sank
		};
	}

	function updateOpponentStateGame(stateGame, callback) {
		console.log('3 - updateOpponentStateGame');

		database.db.collection("games-details").save(
			stateGame,
			function(err, result) {
				console.log('	3 - updateOpponentStateGame');
				if(err) {
					console.log(err);
				} else {
					// callback = obtainMyStateGame
					callback(updateMyStateGame);
				}
			}
		);
	}

	function obtainMyStateGame(callback) { 
		console.log('4 - obtainMyStateGame')
		
		database.db.collection("games-details").findOne(
			{ idGame: idGame, username: username},
			function(err, myStateGame) {
				console.log('	4 - obtainMyStateGame')
				if(err) {
					console.log(err);
				} else {

					myStateGame.boardsAttack = addShotToMyBoardAttack(myStateGame.boardsAttack, opponentUsername, line, column, jsonResponse.hit);

					jsonResponse.obtainedPoints = (myStateGame.score += jsonResponse.obtainedPoints);

					// callback = updateMyStateGame
					callback(myStateGame, obtainStateGames);
				}
			}
		);
	};

	function addShotToMyBoardAttack(boardsAttack, opponentUsername, line, column, hit) {
		console.log('5 - addShotToMyBoardAttack');

		for(var opponent of boardsAttack) {
			if(opponent.username == opponentUsername) {
				var newAttack = {
					"line" : line,
					"column" : column,
					"value" : hit ? 'X' : '0'
				}
				opponent.board.push(newAttack);

				// esta linha é para passar os dados para o cliente
				// TODO talvez deveria ser feito depois do update com sucesso mas é granda volta a meu ver, discutir
				jsonResponse.boardAttack = opponent.board;
			}
		}

		console.log('	5 - addShotToMyBoardAttack');
		return boardsAttack;
	}

	// TODO transformar depois o updateOpponentStateGame e o updateMyStateGame num so
	function updateMyStateGame(stateGame, callback) {
		console.log('6 - updateMyStateGame');

		database.db.collection("games-details").save(
			stateGame,
			function(err, result) {
				console.log('	6 - updateMyStateGame');
				if(err) {
					console.log(err);
				} else {
					// callback = obtainStateGames
					callback(updatePlayersWithCurrentPlayerAndNrShots);
				}
			}
		);
	}

	function obtainStateGames(callback) { 
		console.log('7 - obtainStateGames')
		
		database.db.collection("games-details").find(
			{ idGame: idGame }
			// , { 
			// 	username:true,
			// 	isPlaying:true,
			// 	nrShotsRemaining:true,
			// 	currentPlayer:true 
			// }
			, function(err, cursor) {
				console.log('	7 - obtainStateGames')
				if (err) {
					console.log(err);
				} else {

					cursor.toArray(function(err, stateGames) {
						if (err) {
							console.log(err);
						} else {
								
							var foo = currentPlayerWithRemainingShots(stateGames, stateGames[0].nrShotsRemaining, stateGames[0].currentPlayer);
							jsonResponse.nrShotsRemaining = foo.nrShotsRemaining;
							jsonResponse.currentPlayer = foo.currentPlayer;

							// if (stateGames.length > 0 && stateGames.length == stateGames[0].boardsAttack.length) {
							// 	jsonResponse.gameEnded = true;
							// }

							// var gameHasEnded = jsonResponse.gameEnded ? 'ENDED' : 'INPROGRESS';
								
							// callback = updatePlayersWithCurrentPlayerAndNrShots
							callback(findPlayersWhoLost);
						}
					});
				}
			} 
		); 
	}

	function currentPlayerWithRemainingShots(stateGames, nrShotsRemaining, currentPlayer) {
		console.log('8 - currentPlayerWithRemainingShots');		

		nrShotsRemaining -= 1;

		if(nrShotsRemaining == 0) {

			// TODO passar para uma linha
			nrShotsRemaining = stateGames.length - 1;
			nrShotsRemaining *= 2;

			var playingPlayers = [];
			for(var stateGame of stateGames) {
				if (stateGame.status == 'INPROGRESS') {
					playingPlayers.push({
						username: stateGame.username
					});
				}
			}

			var nextPlayerName = null;
			for(var idx in playingPlayers) {
				if(currentPlayer == playingPlayers[idx].username) {
					if(idx == playingPlayers.length - 1){
						nextPlayerName = playingPlayers[0].username;
					}else {
						var nextIndex = parseInt(idx) + 1;
						nextPlayerName = playingPlayers[nextIndex].username;
					}
					break;
				}
			}
			currentPlayer = nextPlayerName;
		}

		console.log('	8 - currentPlayerWithRemainingShots');	
		return {
			currentPlayer: currentPlayer,
			nrShotsRemaining: nrShotsRemaining
		};
	}

	function updatePlayersWithCurrentPlayerAndNrShots(callback) {
		console.log('9 - updatePlayersWithCurrentPlayerAndNrShots');

		database.db.collection("games-details").updateMany(
			{ idGame: idGame },
			// {
			// 	$and: [
			// 		{ idGame: idGame },
			// 		{ 
			// 			username: { 
			// 				$nin: [ 
			// 					// username, 
			// 					// opponentUsername 
			// 				] 
			// 			} 
			// 		}
			// 	]
			// },
			{
				$set: {
					nrShotsRemaining : jsonResponse.nrShotsRemaining,
					currentPlayer : jsonResponse.currentPlayer 
				}
			},
			// { upsert: true },
			function(err, result) {
				console.log('	9 - updatePlayersWithCurrentPlayerAndNrShots');
				if (err) {
					console.log(err);
				} else {
					// callback = findPlayersWhoLost
					callback(updateMyStatusInGame);
				}
			}
		);
	}

	function findPlayersWhoLost(callback) {		
		console.log('10 - findPlayersWhoLost')
		
		database.db.collection("games-details").find(
			{ idGame: idGame },
			// {
			// $and: [
			// 	{ idGame: idGame },
			// 	// { username: { $nin: [ username ] } }, 
			// 	// { status: 'ENDED' }
			// ]},
			{ 
				username: true,
				status: true,
				boardsAttack:true,
				score: true,
				classification: true,
				won: true
			}
			, function(err, cursor) {
				console.log('	10 - findPlayersWhoLost')
				if (err) {
					console.log(err);
				} else {

					cursor.toArray(function(err, stateGames) {
						if (err) {
							console.log(err);
						} else {

							if (allPlayersDefeated(stateGames)) {
								jsonResponse.gameEnded = true;

								var gameStatus = 'ENDED';
								var gameWon = true;
								
								// callback = updateMyStatusInGame
								callback(gameStatus, gameWon, stateGames, updateStatusInGame);
							} else {

								console.log('FIM getHasShot')
								response.json(jsonResponse)
							}
						}
					});
				}
			} 
		); 
	}

	function allPlayersDefeated(stateGames) {

		console.log("11 - allPlayersDefeated")

		var numPlayersInGame = stateGames.length;
		var numOpponentsWhoLost = 0;
	
		for(var player of stateGames) {
			if (player.status == 'ENDED') {
				numOpponentsWhoLost++;
			}
		}	

		console.log("	11 - allPlayersDefeated")
		
		return (numPlayersInGame - 1) == numOpponentsWhoLost;
	}

	function updateMyStatusInGame(stateGameStatus, gameWon, stateGames, callback) {
		console.log('12 - updateMyStatusInGame')
		database.db.collection("games-details").updateOne(
			{ idGame: idGame, username: username},
			{
				$set: {
					status: stateGameStatus,
					won: gameWon
				}
			}, 
			function(err, result) {
				console.log('	12 - updateMyStatusInGame')
				if (err) {
					console.log(err)
				} else {

					var winner = username;

					var playersStats = [];
					playersStats = classifyPlayersByScore(stateGames);								

					// callback = updateStatusInGame
					callback(stateGameStatus, playersStats, winner, obtainPlayerStats);
				}
			}
		);
	}

	function classifyPlayersByScore(stateGames) {

		console.log('13 - classifyPlayersByScore')

		var playersStats = [];
		var classification = 1;
		var maxPlayerScore = {
			username: "",
			score: 0
		};
		var playersClassified = [];

		for(var p of stateGames) {

			maxPlayerScore.username = "";
			maxPlayerScore.score = -1;

			// obter max
			for(var player of stateGames) {
				if ((playersClassified.indexOf(player.username) == -1) && player.score > maxPlayerScore.score) {
					maxPlayerScore.username = player.username
					maxPlayerScore.score = player.score;
				}
			}

			playersStats.push({
				"username" : maxPlayerScore.username,
				"score" : maxPlayerScore.score,
				"classification" : classification++
			});

			// classification++;

			playersClassified.push(maxPlayerScore.username);

		}

		console.log('	13 - classifyPlayersByScore');

		return playersStats;
	}

	function updateStatusInGame(gameStatus, players, winner, callback) {
		console.log('14 - updateStatusInGame')
		database.db.collection("games").updateOne(
			{ _id: new mongodb.ObjectID(idGame) },
			{
				$set: {
					status: gameStatus,
					players: players,
					winner: winner,
					// endDate: new Date(Date.now()).toLocaleString() //TODO não está a mandar as nossas horas corretas
					endDate: new Date()
				}
			}, 
			function(err, resu) {
				console.log('	14 - updateStatusInGame')
				if (err) {
					console.log(err)
				} else {

					for(var player of players) {
						// callback = obtainPlayerStats
						callback(player, updatePlayerScoreAndVictories);
					}

					console.log('FIM getHasShot3 com GAME a ENDED')
					response.json(jsonResponse)
				}
			}
		);
	}

	function obtainPlayerStats(player, callback) { 
		console.log('15 - obtainPlayerStats')
		
		database.db.collection("players").findOne(
			{ username: player.username },
			function(err, obtainedPlayer) {
				console.log('	15 - obtainPlayerStats')
				if(err) {
					console.log(err);
				} else {

					var playerStats = {
						username: player.username,
						totalPoints: player.score + obtainedPlayer.totalPoints,
						totalVictories: obtainedPlayer.totalVictories + (player.classification === 1 ? 1 : 0)
					}

					// callback = updatePlayerScoreAndVictories
					callback(playerStats, obtainStateGames);
				}
			}
		);
	};

	function updatePlayerScoreAndVictories(playerStats, callback) {
		console.log('16 - updatePlayerScoreAndVictories')
		database.db.collection("players").updateOne(
			{ username: playerStats.username },
			{
				$set: {
					totalPoints: playerStats.totalPoints,
					totalVictories: playerStats.totalVictories
				}
			}, 
			function(err, resu) {
				if (err) {
					console.log(err)
				} else {
					console.log('	16 - updatePlayerScoreAndVictories')
				}
			}
		);
	}
}

function readyOnGame(request, response, next){
	
	//PARAMS
	var idGame = request.params.id;

	//BODY
	var body = request.body;
	var username = body.username;
	var status = body.status;
	var boardDefense = body.boardDefense;

	var numPlayers;

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
				database.db.collection("games").findOne({_id: new mongodb.ObjectID(idGame)})
				.then(game => {
					numPlayers = game.players.length;
				});

				database.db.collection("games-details").find({
						$and: [
							{ idGame: idGame },
							// { username: { $nin: [ username ] } }, 
							{ status: 'READY' }
						]}
						// , { status:true }
					)
					.toArray()
					.then(games => {

						// console.log(games.length);

						if (games.length === numPlayers) {

							games.forEach((game) => {
								game.status = 'INPROGRESS';
							
								database.db.collection("games-details").updateOne(
									{ idGame: game.idGame, username: game.username},
									{
										$set: {
											status: game.status
										}
									});
							});
						}


						response.json(games || []);
						next();
					});
			}
		}
	);
}

function closeGame(request, response, next) {
	
	//PARAMS
	var idGame = request.params.id;

	//BODY
	var body = request.body;
	var username = body.username;
	
	database.db.collection("games-details").updateOne(
		{ idGame: idGame, username: username},
		{
			$set: {
				isPlaying: false
			}
		},
		function(err, result) {
			if(err) {
				console.log(err);
				next();
			} else {

				database.db.collection("games-details").findOne(
					{
						$and: [
							{ idGame: idGame },
							{ username: username }
						]
					},
					function(err, stateGame) {
						if(err) {
							console.log(err);
						} else {
							console.log(stateGame)
							response.json(stateGame);
						}
					}
				);
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

	server.get(apiBaseUri+'waiting-room-games', getGamesInRoom);
	server.put(apiBaseUri+'start-game/:id', startGame);
	server.put(apiBaseUri+'enter-game/:id',enterGame);
	server.put(apiBaseUri+'leave-game/:id',leaveGame);

	/* Routes for historical */
	server.get(apiBaseUri+'historicals', getHistoricals); // all games endded
	server.get(apiBaseUri+'historicals/:username', getHistoricalsByUsername); // all games endded by user
	server.get(apiBaseUri+'historicals/gameID/:gameID', getHistoricalsByGameID); // the game endded by id
	server.get(apiBaseUri+'historicals/cretedBy/:gameCreator', getHistoricalsByGameCreator); // all games ended created by player XPTO
	server.get(apiBaseUri+'historicals/winner/:playerUsername', getHistoricalsByWinnerPlayer); // all games winner by player XPTO
	server.get(apiBaseUri+'historicals/player/:playerUsername', getHistoricalsByPlayer); // all games that player XPTO had played
	console.log("Historical routes registered");

	/* Routes for statistics */
	server.get(apiBaseUri+'statistics/avg/games/day', getStatisticsAVGGamesDay); // the number the games played per day
	server.get(apiBaseUri+'statistics/top5/number-games', getStatisticsTop5NumberGames); // the number of games played by 5 players with more games
	console.log("Statistics routes registered");

	server.get(apiBaseUri+'current-games/:username', getCurrentGames);
	server.get(apiBaseUri+'current-state-games/:username', getCurrentStateGames);
	server.put(apiBaseUri+'current-state-games/:id', putCurrentStateGames);
	
	server.post(apiBaseUri+'current-state-games-shot/:id', getHasShot);

	server.put(apiBaseUri+'ready-on-game/:id', readyOnGame);
	server.put(apiBaseUri+'close-game/:id', closeGame);

	console.log("Games routes registered");
}



  