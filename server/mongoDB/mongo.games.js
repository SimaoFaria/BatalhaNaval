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
	// New game dataChartAVGGamesPerDay is obtained from the object sent on the request body.
	// Return a JSON response with that game  

	// games-details

	var game = request.body;

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
						"nrShotsRemaining": nrShots
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

	//PARAMS
	var idGame = request.params.id;

	//BODY
	var body = request.body;
	var opponentUsername = body.opponentUsername;
	var line = body.line;
	var column = body.column;
	var username = body.username;

	//DEBUG
	// console.log('Inside getHasShot');
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

				var result = {
					shot: '',
					shipType: '', 
					sank: false,
					allShipsSanked: true,
					defendingPlayer: game.username,
					gameEnded: false,
					nrShotsRemaining: -1,
					currentPlayer: '',
					boardAttack: []
				}

				// //Tirar um tiro ao layer
				// // console.log("Number of current shots: " +  game.nrShotsRemaining);
				// var nrShotsRemaining = game.nrShotsRemaining;
				// nrShotsRemaining = nrShotsRemaining -1;
				// // console.log("Number of current shots ater: " + nrShotsRemaining);

				// //caso 0
				// var currentPlayer = game.currentPlayer;
				// if(nrShotsRemaining == 0) {
				// 	//RECARRGAR 3 TIROS DO PLAYER
				// 	nrShotsRemaining = 3;

				// 	//mudar de player
				// 	var idGameSwap = game.idGame;
				// 	var currentPlayerSwap = game.currentPlayer;

				// 	//TODO por em promise(vem a null)
				// 	// currentPlayer = swatpTurn(idGameSwap, currentPlayerSwap);
				// 	// currentPlayer = "richard";

				// 	// TODO tratar disto
				// 	var id = new mongodb.ObjectID(idGame);
				// 	database.db.collection("games").findOne({ _id: id },function(err, game) {
				// 		if(err) {
				// 			// console.log(err);
				// 			next();
				// 		} else {

				// 			console.log('query do game')

				// 			var nextPlayerName = null;

				// 			for(var idx in game.players) {
				// 				if(currentPlayer == game.players[idx].username) {
				// 					var nrPlayers = game.players.length - 1;
				// 					if(idx == nrPlayers){
				// 						nextPlayerName = game.players[0].username;
				// 					}else {
				// 						var nextIndex = parseInt(idx) + 1;
				// 						nextPlayerName = game.players[nextIndex].username;
										
				// 					}
				// 				}
				// 			}

				// 			currentPlayer = nextPlayerName;

				// 			// versao simao pus o updatemany aqui que assim sei que funciona, fiz refactoring para funcionar assim tambem
				// 			database.db.collection("games-details").updateMany(
				// 				{ idGame: idGame },
				// 				{
				// 					$set: {
				// 						nrShotsRemaining : nrShotsRemaining,
				// 						currentPlayer : currentPlayer //TODO SO PODE SER EXECUTADO AQUI QUANDO JA TIVERMOS O NOVO PLAYER (ESPERAR PELA RESPOSTA DO MONGO . CALLBACK ?)
				// 					}
				// 				},
				// 				function(err, result) {
				// 					if (err) {
				// 						console.log(err);
				// 						next();
				// 					} else {
				// 						console.log('update many games details')
				// 						//response.json(result);
				// 						//next();
				// 					}
				// 				}
				// 			);
				// 		}
				// 	});
				
				// inicio versao simao da cena do current player
				
				var nrShotsRemaining = game.nrShotsRemaining - 1;
				var currentPlayer = game.currentPlayer;
				database.db.collection("games").findOne({ _id: new mongodb.ObjectID(idGame) },function(err, gam) {
					if(err) {
						// console.log(err);
						next();
					} else {

						console.log('query do game')

						if(nrShotsRemaining > 0) {
							currentPlayer = game.currentPlayer;
						} else {

							nrShotsRemaining = gam.players.length - 1;
							nrShotsRemaining *= 2;

							var nextPlayerName = null;
							for(var idx in gam.players) {
								if(currentPlayer == gam.players[idx].username) {
									var nrPlayers = gam.players.length - 1;
									if(idx == nrPlayers){
										nextPlayerName = gam.players[0].username;
									}else {
										var nextIndex = parseInt(idx) + 1;
										nextPlayerName = gam.players[nextIndex].username;
									}
								}
							}
							currentPlayer = nextPlayerName;
						}

						console.log(currentPlayer + '|' + nrShotsRemaining)
						
						result.nrShotsRemaining = nrShotsRemaining;
						result.currentPlayer = currentPlayer;
					}
				});

				// fim versao simao da cena do current player
				
				// 	/****************************** PROXIMO JOGAFOR ******************************************/
                //
                //
				// 	console.log("swatpTurn(" + idGame + "," +  currentPlayer +")");
                //
				// 	//procurar o game que tem o vetor de jogadores
                //
                //
				// 	var id = new mongodb.ObjectID(idGame);
				// 	database.db.collection("games").findOne({ _id: id },function(err, game) {
				// 		if(err) {
				// 			console.log(err);
				// 			next();
				// 		} else {
                //
				// 			var nextPlayerName = null;
                //
				// 			for(var idx in game.players) {
                //
				// 				console.log("PLAYER=>" +game.players[idx].username);
                //
				// 				//ver qual o indice do jogador currente
				// 				if(currentPlayer == game.players[idx].username) {
                //
				// 					console.log("PLAYER CURRENT=>" +game.players[idx].username + "index" + idx);
                //
				// 					//se igual ao tamanho do vetor
                //
				// 					var nrPlayers = game.players.length - 1;
				// 					console.log("#players: " + nrPlayers);
                //
				// 					if(idx == nrPlayers){
				// 						//passa o primeiro jogador a jogar
				// 						nextPlayerName = game.players[0].username;
				// 						console.log("New Player 0:" + nextPlayerName);
				// 						//return nextPlayerName;
				// 					}else {
				// 						//se nao passa ao proximo
				// 						var nextIndex = parseInt(idx) + 1;
				// 						console.log("Nexte index" + nextIndex);
				// 						nextPlayerName = game.players[nextIndex].username;
				// 						console.log("New Player next:" + nextPlayerName);
				// 						//return nextPlayerName;
                //
				// 					}
                //
				// 				}
                //
				// 			}
                //
				// 			//return nextPlayerName;
				// 			//next(); //TODO DUVIDA
                //
				// 			currentPlayer = nextPlayerName;
				// 			console.log("=>>>>>>>>>>>>>> New player : " + currentPlayer);
                //
                //
				// 			/******************************  BROADCAST GERIR TURNOS ******************************************/
                //
				// 			//RETIRA UM TIRO AO JOGADOR
				// 			database.db.collection("games-details").updateMany(
				// 				{ idGame: idGame },
				// 				{
				// 					$set: {
				// 						nrShotsRemaining : nrShotsRemaining,
				// 						currentPlayer : currentPlayer
				// 					}
				// 				},
				// 				function(err, result) {
				// 					if(err) {
				// 						console.log(err);
				// 						next();
				// 					} else {
				// 						//response.json(result);
				// 						//next();
                //
				// 						/******************************  ENVIAR RESULTADO DO TIRO ******************************************/
                //
                //
				// 						var result = '';
                //
				// 						for (var idx in game.boardDefense) {
                //
				// 							console.log("=>>AQUI");
				// 							//SHOT
				// 							if(game.boardDefense[idx].position.line == line
				// 								&& game.boardDefense[idx].position.column == column) {
                //
				// 								console.log("=>>>>>>>>>>>>>entrou");
				// 								result = 'Posição '+line+column +' - Tiro no ' + game.boardDefense[idx].type;
                //
                //
                //
				//
                //
				// 							}
				// 						}
                //
				// 						response.json(result);
				// 						next();
                //
                //
				// 						/******************************  FIM ENVIAR RESULTADO DO TIRO ******************************************/
                //
                //
				// 					}
				// 				}
				// 			);
                //
				//
                //
                //
                //
                //
				// 			/******************************  FIM BROADCAST GERIR TURNOS ******************************************/
                //
                //
                //
				// 		}
				// 	});
                //
                //
                //
                //
				// 	/******************************  FIM PROXIMO JOGAFOR ******************************************/
				 
				// }

				//  versao hugo
				// database.db.collection("games-details").updateMany(
				// 				{ idGame: idGame },
				// 				{
				// 					$set: {
				// 						nrShotsRemaining : nrShotsRemaining,
				// 						currentPlayer : currentPlayer //TODO SO PODE SER EXECUTADO AQUI QUANDO JA TIVERMOS O NOVO PLAYER (ESPERAR PELA RESPOSTA DO MONGO . CALLBACK ?)
				// 					}
				// 				},
				// 				function(err, result) {
				// 					if (err) {
				// 						console.log(err);
				// 						next();
				// 					} else {
				// 						//response.json(result);
				// 						//next();
				// 					}
				// 				}
				// );

				var hitted = false;
				//verifica se navio afundou
					// se sim, 
						// atualiza a prop sank do navio
						// e atualiza result.afundou
				for (var ship of game.boardDefense) {
					for (var occupiedPosition of ship.occupiedPositions) {
						if(occupiedPosition.position.line == line
							&& occupiedPosition.position.column == column) {
							
							// var id = new mongodb.ObjectID(game._id);
							// game._id = id;
							game._id = new mongodb.ObjectID(game._id);

							hitted = true;
							occupiedPosition.hit = true;
							result.shot = 'Posição '+line+column +' - Tiro no ' + ship.type;
							result.shipType = ship.type;	

							if (ship.type == 'Submarino') {
								ship.sank = true;
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
											}
											break;
										case 'Cruzador':
											if(numTargets == 3) {
												ship.sank = true;
											}
											break;
										case 'Couracado':
											if(numTargets == 4) {
												ship.sank = true;
											}
											break;
										case 'PortaAvioes':
											if(numTargets == 5) {
												ship.sank = true;
											}
											break;
									}
								}

							}

							if (ship.sank) {
								result.sank = true;	
							}

							break;
						}
					}
				}

				// verifica se jogador tem todos os navios afundados
				for (var ship of game.boardDefense) {
					if (!ship.sank) {
						result.allShipsSanked = false;
						break;
					}
				}

				if(result.allShipsSanked) {
					game.status = 'ENDED';
				}

				var findPlayersWhoLost = function() {
					
					console.log('findPlayersWhoLost')
					
					database.db.collection("games-details").find({
						$and: [
							{ idGame: idGame },
							{ username: { $nin: [ username ] } }, 
							{ status: 'ENDED' }
						]}
						, { boardsAttack:true }
						, verifyGameEnded
					); 
				}

				var verifyGameEnded = function(err, cursor) {
					
					console.log('verifyGameEnded')

					cursor.toArray(function(err, games) {
						if (games.length > 0 && games.length == games[0].boardsAttack.length) {
							result.gameEnded = true;
						}

						database.db.collection("games").updateOne(
							{ _id: new mongodb.ObjectID(idGame) },
							{
								$set: {
									status: result.gameEnded ? 'ENDED' : 'INPROGRESS'
								}
							}, 
							function(err, resu) {
								if (err) {
									console.log(err)
								} else {
									// console.log('result.gameEnded')
									// console.log(result.gameEnded)

									database.db.collection("games-details").updateOne(
										{ idGame: idGame, username: username},
										{
											$set: {
												status: result.gameEnded ? 'ENDED' : 'INPROGRESS'
											}
										},
										function(err, res) {
											if(err) {
												console.log(err);
												next();
											} else {
												console.log('FIM')
												response.json(result);
											}
										});
								}
							});
					});
				}

				// database.db.collection("games-details").save(game,function(err, res) {
				// 	if(err) {
				// 		console.log(err);
				// 		next();
				// 	} else {
				// 		findPlayersWhoLost();
				// 	}
				// });

				// --------------------------------

				// versao funcional mas falta a atualizacao do boardsAttack
				// database.db.collection("games-details").save(game,function(err, res) {
				// 	if(err) {
				// 		console.log(err);
				// 		next();
				// 	} else {

				// 		console.log('games-details save')

				// 		database.db.collection("games-details").updateMany(
				// 			{ idGame: idGame },
				// 			{
				// 				$set: {
				// 					nrShotsRemaining : nrShotsRemaining,
				// 					currentPlayer : currentPlayer 
				// 				}
				// 			},
				// 			{ upsert: true },
				// 			function(err, result) {

				// 				console.log('query do update many')

				// 				if (err) {
				// 					console.log(err);
				// 					next();
				// 				} else {
				// 					// console.log(result);
				// 					findPlayersWhoLost();
				// 					next();
				// 				}
				// 			}
				// 		);
				// 		next();
				// 	}
				// });

				// ----------------

				// versao com a atualizacao do boardsAttack
				database.db.collection("games-details").findOne({ idGame: idGame, username: username },function(err, myGame) {
					if(err) {
						console.log(err);
						next();
					} else {

						for(var opponent of myGame.boardsAttack) {
							if(opponent.username == opponentUsername) {
								var newAttack = {
									"line" : line,
									"column" : column,
									"value" : hitted ? 'X' : '0'
								}
								opponent.board.push(newAttack);

								// esta linha é para passar os dados para o cliente
								// TODO penso que devaria ser feito depois da resposta do update, ver depois
								result.boardAttack = opponent.board;
							}
						}

						database.db.collection("games-details").updateOne(
							{ idGame: idGame, username: username},
							// myGame,
							{
								$set: {
									boardsAttack: myGame.boardsAttack,
									status: myGame.status
								}
							},
							function(err, resu) {
								if(err) {
									console.log(err);
									next();
								} else {
									
									// TODO penso que devaria ser feito aqui, ver depois
									// resu.boardAttack = boardsAttack

									database.db.collection("games-details").save(game,function(err, res) {
										if(err) {
											console.log(err);
											next();
										} else {

											console.log('games-details save')

											database.db.collection("games-details").updateMany(
												{ idGame: idGame },
												{
													$set: {
														nrShotsRemaining : nrShotsRemaining,
														currentPlayer : currentPlayer 
													}
												},
												{ upsert: true },
												function(err, result) {

													console.log('query do update many')

													if (err) {
														console.log(err);
														next();
													} else {
														// console.log(result);
														findPlayersWhoLost();
														next();
													}
												}
											);
											next();
										}
									});
									next();
								}
							}
						);
						next();
					}
				});

				// -----------------------------
			}
	});
}

function getHasShot2(request, response, next){

	console.log('INICIO getHasShot2')

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
		boardAttack: []
	}

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

					// callback = obtainGameById
					callback(idGame, stateGame, updateOpponentStateGame);
				}
			}
		);
	};

	obtainShotOpponentStateGame(idGame, opponentUsername, obtainGameById);

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
		});
	}

	function currentPlayerWithRemainingShots(game, nrShotsRemaining, currentPlayer) {
		console.log('3 - currentPlayerWithRemainingShots');		

		nrShotsRemaining -= 1;

		if(nrShotsRemaining == 0) {

			// TODO passar para uma linha
			nrShotsRemaining = game.players.length - 1;
			nrShotsRemaining *= 2;

			// TODO prop lost do GAME ainda não existe
			playingPlayers = [];
			for(var player of game.players) {
				if (!player.lost) {
					playingPlayers.push(player);
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
				}
			}
			currentPlayer = nextPlayerName;
		}

		console.log('	3 - currentPlayerWithRemainingShots');	
		return {
			currentPlayer: currentPlayer,
			nrShotsRemaining: nrShotsRemaining};
	}

	function treatShips(boardDefense) {
		console.log('4 - treatShips')

		var hit = false;

		var shot = '';
		var shipType = '';
		var sank = false;
		var allShipsSanked = true;
		
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

					shot = 'Posição '+line+column +' - Tiro no ' + ship.type;
					shipType = ship.type;	

					if (ship.type == 'Submarino') {
						ship.sank = true;
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
									}
									break;
								case 'Cruzador':
									if(numTargets == 3) {
										ship.sank = true;
									}
									break;
								case 'Couracado':
									if(numTargets == 4) {
										ship.sank = true;
									}
									break;
								case 'PortaAvioes':
									if(numTargets == 5) {
										ship.sank = true;
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
		
		console.log('	4 - treatShips')
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
		console.log('5 - updateOpponentStateGame');

		database.db.collection("games-details").save(
			stateGame,
			function(err, result) {
				console.log('	5 - updateOpponentStateGame');
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
		console.log('6 - obtainMyStateGame')
		
		database.db.collection("games-details").findOne(
			{ idGame: idGame, username: username},
			function(err, myStateGame) {
				console.log('	6 - obtainMyStateGame')
				if(err) {
					console.log(err);
				} else {

					// TODO tratar no updateMany
					// myStateGame.nrShotsRemaining = jsonResponse.nrShotsRemaining;
					// myStateGame.currentPlayer = jsonResponse.currentPlayer;

					myStateGame.boardsAttack = addShotToMyBoardAttack(myStateGame.boardsAttack, opponentUsername, line, column, jsonResponse.hit);

					// callback = updateMyStateGame
					callback(myStateGame, updatePlayersWithCurrentPlayerAndNrShots);
				}
			}
		);
	};

	function addShotToMyBoardAttack(boardsAttack, opponentUsername, line, column, hit) {
		console.log('7 - addShotToMyBoardAttack');

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

		console.log('	7 - addShotToMyBoardAttack');
		return boardsAttack;
	}

	// TODO transformar depois o updateOpponentStateGame e o updateMyStateGame num so
	function updateMyStateGame(stateGame, callback) {
		console.log('8 - updateMyStateGame');

		database.db.collection("games-details").save(
			stateGame,
			function(err, result) {
				console.log('	8 - updateMyStateGame');
				if(err) {
					console.log(err);
				} else {
					// callback = updatePlayersWithCurrentPlayerAndNrShots
					callback(findPlayersWhoLost);
				}
			}
		);
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
					callback(updateStatusInGame);
				}
			}
		);
	}

	function findPlayersWhoLost(callback) {		
		console.log('10 - findPlayersWhoLost')
		
		database.db.collection("games-details").find({
			$and: [
				{ idGame: idGame },
				{ username: { $nin: [ username ] } }, 
				{ status: 'ENDED' }
			]}
			, { boardsAttack:true }
			, function(err, cursor) {
				console.log('	10 - findPlayersWhoLost')
				if (err) {
					console.log(err);
				} else {

					cursor.toArray(function(err, stateGames) {
						if (err) {
							console.log(err);
						} else {

							if (stateGames.length > 0 && stateGames.length == stateGames[0].boardsAttack.length) {
								jsonResponse.gameEnded = true;
							}

							var gameHasEnded = jsonResponse.gameEnded ? 'ENDED' : 'INPROGRESS';
								
							// callback = updateStatusInGame
							callback(gameHasEnded, updateMyStatusInGame);
						}
					});
				}
			} 
		); 
	}

	function updateStatusInGame(gameStatus, callback) {
		console.log('11 - updateStatusInGame')
		database.db.collection("games").updateOne(
			{ _id: new mongodb.ObjectID(idGame) },
			{
				$set: {
					status: gameStatus
				}
			}, 
			function(err, resu) {
				console.log('	11 - updateStatusInGame')
				if (err) {
					console.log(err)
				} else {
					// callback = updateMyStatusInGame
					callback(gameStatus);
				}
			}
		);
	}

	function updateMyStatusInGame(stateGameStatus) {
		console.log('12 - updateMyStatusInGame')
		database.db.collection("games-details").updateOne(
			{ idGame: idGame, username: username},
			{
				$set: {
					status: stateGameStatus
				}
			}, 
			function(err, result) {
				console.log('	12 - updateMyStatusInGame')
				if (err) {
					console.log(err)
				} else {
					console.log('FIM getHasShot2')
					response.json(jsonResponse)
				}
			}
		);
	}
}

function getHasShot3(request, response, next){

	console.log('INICIO getHasShot3')

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
		boardAttack: []
	}

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
	 *  updatePlayersWithCurrentPlayerAndNrShots
	 *  updateStateGames
	 * 
	 *  findPlayersWhoLost
	 *  updateStatusInGame
	 *  updateMyStatusInGame
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

					shot = 'Posição '+line+column +' - Tiro no ' + ship.type;
					shipType = ship.type;	

					if (ship.type == 'Submarino') {
						ship.sank = true;
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
									}
									break;
								case 'Cruzador':
									if(numTargets == 3) {
										ship.sank = true;
									}
									break;
								case 'Couracado':
									if(numTargets == 4) {
										ship.sank = true;
									}
									break;
								case 'PortaAvioes':
									if(numTargets == 5) {
										ship.sank = true;
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

					// TODO tratar no updateMany
					// myStateGame.nrShotsRemaining = jsonResponse.nrShotsRemaining;
					// myStateGame.currentPlayer = jsonResponse.currentPlayer;

					myStateGame.boardsAttack = addShotToMyBoardAttack(myStateGame.boardsAttack, opponentUsername, line, column, jsonResponse.hit);

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
					callback(updateStatusInGame);
				}
			}
		);
	}

	function findPlayersWhoLost(callback) {		
		console.log('10 - findPlayersWhoLost')
		
		database.db.collection("games-details").find({
			$and: [
				{ idGame: idGame },
				{ username: { $nin: [ username ] } }, 
				{ status: 'ENDED' }
			]}
			, { boardsAttack:true }
			, function(err, cursor) {
				console.log('	10 - findPlayersWhoLost')
				if (err) {
					console.log(err);
				} else {

					cursor.toArray(function(err, stateGames) {
						if (err) {
							console.log(err);
						} else {

							if (stateGames.length > 0 && stateGames.length == stateGames[0].boardsAttack.length) {
								jsonResponse.gameEnded = true;

								var gameStatus = 'ENDED';
								
								// callback = updateStatusInGame
								callback(gameStatus, updateMyStatusInGame);
							} else {

								console.log('FIM getHasShot3')
								response.json(jsonResponse)
							}
						}
					});
				}
			} 
		); 
	}

	function updateStatusInGame(gameStatus, callback) {
		console.log('11 - updateStatusInGame')
		database.db.collection("games").updateOne(
			{ _id: new mongodb.ObjectID(idGame) },
			{
				$set: {
					status: gameStatus
				}
			}, 
			function(err, resu) {
				console.log('	11 - updateStatusInGame')
				if (err) {
					console.log(err)
				} else {
					// callback = updateMyStatusInGame
					callback(gameStatus);
				}
			}
		);
	}

	function updateMyStatusInGame(stateGameStatus) {
		console.log('12 - updateMyStatusInGame')
		database.db.collection("games-details").updateOne(
			{ idGame: idGame, username: username},
			{
				$set: {
					status: stateGameStatus
				}
			}, 
			function(err, result) {
				console.log('	12 - updateMyStatusInGame')
				if (err) {
					console.log(err)
				} else {
					console.log('FIM getHasShot3 com GAME a ENDED')
					response.json(jsonResponse)
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


	server.get(apiBaseUri+'waiting-room-games', getGamesInRoom);
	server.put(apiBaseUri+'start-game/:id', startGame);
	server.get(apiBaseUri+'current-games/:username', getCurrentGames);
	server.get(apiBaseUri+'current-state-games/:username', getCurrentStateGames);
	server.put(apiBaseUri+'current-state-games/:id', putCurrentStateGames);
	// server.post(apiBaseUri+'current-state-games-shot/:id', getHasShot);
	server.post(apiBaseUri+'current-state-games-shot/:id', getHasShot3); // TODO este esta com as callbacks, não apago o anterior para caso queiram ver

	server.put(apiBaseUri+'ready-on-game/:id', readyOnGame);
	server.put(apiBaseUri+'close-game/:id', closeGame);

	console.log("Games routes registered");
}



  