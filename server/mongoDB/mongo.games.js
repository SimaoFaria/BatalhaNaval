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
	database.db.collection("games").find({"status":"ended"}).toArray(function(err, games) {
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
	database.db.collection("games").find( {$and: [{"players.username":username}, {"status":"ended"}]}).toArray(function(err, games) {
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
	database.db.collection("games").find({ "status": "pending", $where:'this.players.length < 4' }).toArray(function(err, games) {
		if(err) {
        console.log(err);
        next();
    } else {
	    response.json(games);
	    next();
    }
  });
}



function getCurrentGames(request, response, next){
	// TODO: obtain one game (by ObjectID) from games collection 
	// and return a JSON response with that game
	// Endpoint URL example: api/v1/games/58299dfa515f3da86af58060
	//var username = new mongodb.ObjectID(request.params.username);
	var username = request.params.username;
	database.db.collection("games").find({$and: [{status:{$in:["pending", "INPROGRESS"]}}, {"players.username":username}]}).toArray(function(err, games) {
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
	database.db.collection("games").find({$and: [{status:{$in:["pending", "INPROGRESS"]}}, {"players.username":username}]}).toArray(function(err, games) {
		if(err) {
			console.log(err);
			next();
		} else {
			response.json(games);
			next();
		}
	});
}

function putCurrentStateGames(request, response, next) {

	console.log("BANANAS");

	var id = new mongodb.ObjectID(request.params.id);
	var boardDefense = request.body; //PlayerStateGame
	//game._id = id;

	console.log("BANANAS2");

	var username = "Cao de Agua";



	database.db.collection("games").update(
		{ _id: id, "players[0].username": username},
		{
			$set: {
				"players[0].tabuleiros[0].boardDefense": boardDefense
			}
		},
		function(err, result) {
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



  