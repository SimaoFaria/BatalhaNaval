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

	var player = request.body;

	database.db.collection("players").insertOne(player,function(err, result) {
		if(err) {
        console.log(err);
        next();
    } else {
    	console.log (result);
    	var id = result.insertedId;
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

// Routes for the players
players.init = function(server,apiBaseUri){
	server.get(apiBaseUri+'players',getPlayers);
	server.get(apiBaseUri+'players/:id',getPlayer);
	server.put(apiBaseUri+'players/:id',updatePlayer);
	server.post(apiBaseUri+'players',createPlayer);
	server.del(apiBaseUri+'players/:id',deletePlayer);

	server.get(apiBaseUri+'top10-victories',getTop10Victories);
	server.get(apiBaseUri+'top10-points',getTop10Points);

	console.log("Players routes registered");
}



  