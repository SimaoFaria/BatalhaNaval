'use strict';

var mongodb = require('mongodb');
var database = require('./mongo.database');
var players = module.exports = {};

function getPlayers(request, response, next){
	// TODO: query players collection 
	// and return a JSON response will all players
	database.db.collection("players").find({}).toArray(function(err, players) {
		if(err) {
        console.log(err);
        next();
    } else {
	    response.json(players);
	    next();
    }
  });
}

function getTop10Victories(request, response, next){
	// TODO: query players collection 
	// and return a JSON response will all players
	database.db.collection("players").find({}).sort( { "totalVictories": -1 } ).toArray(function(err, players) {
		if(err) {
        console.log(err);
        next();
    } else {
	    response.json(players);
	    next();
    }
  });
}

function getTop10Points(request, response, next){
	// TODO: query players collection 
	// and return a JSON response will all players
	database.db.collection("players").find({}).sort( { "totalPoints": -1 } ).toArray(function(err, players) {
		if(err) {
        console.log(err);
        next();
    } else {
	    response.json(players);
	    next();
    }
  });
}

function getPlayer(request, response, next){
	// TODO: obtain one player (by ObjectID) from players collection 
	// and return a JSON response with that player
	// Endpoint URL example: api/v1/players/34299dfa515f3da86af58060
	var id = new mongodb.ObjectID(request.params.id);
	database.db.collection("players").findOne({_id:id},function(err, player) {
		if(err) {
        console.log(err);
        next();
    } else {
	    response.json(player);
	    next();
    }
  });
}

function updatePlayer(request, response, next){
	// TODO: updates one player of the players collection
	// from the object sent on the request body. 
	// Return a JSON response with that player  	
	var id = new mongodb.ObjectID(request.params.id);
	var player = request.body;
	player._id = id;

	database.db.collection("players").save(player,function(err, result) {
		if(err) {
        console.log(err);
        next();
    } else {
	    database.db.collection("players").findOne({_id:id},function(err, player) {
	  		if(err) {
		        console.log(err);
		        next();
		    } else {
			    response.json(player);
			    next();
		    }
		  });
    }
  });
}

function createPlayer(request, response, next){
	// TODO: create a new player and save it on the players collection
	// New player data is obtained from the object sent on the request body. 
	// Return a JSON response with that player  

	const player = request.body;
    player.passwordHash = sha1(player.password);
    delete player.password;
    if (player === undefined) {
        response.send(400, 'No player data');
        return next();
    }

    database.db.collection('players')
        .insertOne(player)
        .then(result => returnPlayer(result.insertedId, response, next))
        .catch(err => handleError(err, response, next));



	// database.db.collection("players").insertOne(player,function(err, result) {
	// 	if(err) {
  //       console.log(err);
  //       next();
  //   } else {
  //   	console.log (result);
  //   	var id = result.insertedId;
	//     database.db.collection("players").findOne({_id:id},function(err, player) {
	//   		if(err) {
	// 	        console.log(err);
	// 	        next();
	// 	    } else {
	// 		    response.json(player);
	// 		    next();
	// 	    }
	// 	  });
  //   }
  // });
}

function deletePlayer(request, response, next){
	// TODO: removes one player from the players collection
	// Return a JSON response with a message "Player -XXX- Deleted"

	var id = new mongodb.ObjectID(request.params.id);
	database.db.collection("players").deleteOne({_id:id},function(err, result) {
		if(err) {
        console.log(err);
        next();
    } else {
	    response.json({msg:"Player -"+id+"-  Deleted"});
	    next();
    }
  });
}

function getUser(request, response, next) {
    const username = request.params.id;
    console.log("testejhg");
    database.db.collection('players')
    .findOne({
        username: username
    })
    .then((player) => {
        if (player === null) {
            response.send(404, 'Player not found');
        } else {
            response.json(player);
        }
        next();
    })
    .catch(err => handleError(err, response, next));
}

function handleError(err, response, next) {
	response.send(500, err);
	next();
}

function returnPlayer(id, response, next) {
    database.db.collection('players')
        .findOne({
            _id: id
        })
        .then((player) => {
            if (player === null) {
                response.send(404, 'Player not found');
            } else {
                response.json(player);
            }
            next();
        })
        .catch(err => handleError(err, response, next));
}

// Routes for the players
players.init = function(server,apiBaseUri, settings){
	server.get(apiBaseUri+'players',getPlayers);
	server.get(apiBaseUri+'players/:id',getPlayer);
	server.put(apiBaseUri+'players/:id',updatePlayer);
	server.post(apiBaseUri+'players',createPlayer);
	server.del(apiBaseUri+'players/:id',deletePlayer);

	server.get(apiBaseUri+'top10-victories',getTop10Victories);
	server.get(apiBaseUri+'top10-points',getTop10Points);

	// server.get(settings.prefix + 'getUser/:id', getUser);
	server.get(apiBaseUri + 'getUser/:id', getUser);

	console.log("Players routes registered");
}



  