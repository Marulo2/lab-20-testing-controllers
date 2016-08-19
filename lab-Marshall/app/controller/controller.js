'use strict';

const angular = require('angular');
const demoApp = angular.module('demoApp');

demoApp.controller('GameController', ['$log', GameController]);

function GameController($log){

  this.player = {};
  this.classes = ['Knight', 'Hacker', 'Pirate', 'Intern'];
  this.player.playerIsDone = false;

  this.monster = {};
  this.species = ['Baby Seal', 'Taurus Demon', 'Moose', 'Hell Witch', 'Several Chickens'];
  this.monster.monsterIsDone = false;


  this.history = [{ id: 0, text: 'It begins...' }];

  this.directions = ['north', 'south', 'east', 'west'];

  this.playerSignUp = function(player){
    this.player = player;
    this.playerIsDone = true;
    this.player.location = 'The Lobby';
  };

  this.monsterSignUp = function(monster){
    this.monster = monster;
    this.monsterIsDone = true;
    this.monster.location = 'The Room of Doom';
  };

  this.map = require('../lib/map.js');

  this.randomMove = function(){
    var randomDirection = this.directions[Math.floor(this.directions.length * Math.random())];
    return randomDirection;
  };

  this.monsterMove = function(direction){
    $log.debug('gameCtrl.moveDirection');

    direction = this.randomMove();

    if (this.map[this.monster.location]){
      let currentLocation = this.map[this.monster.location];
      $log.log('Monster currentLocation', currentLocation);
      let nextRoom = currentLocation[direction];
      $log.log('Monster nextRoom', nextRoom);
      if (nextRoom !== 'wall') {
        this.logHistory('The monster has moved... but where?');
        return;
      }
      this.logHistory('You heard a strange thumping sound...?');
    }
  };

  this.moveDirection = function(direction){
    $log.debug('gameCtrl.moveDirection');

    this.monsterMove();

    if (this.map[this.player.location]){
      let currentLocation = this.map[this.player.location];
      $log.log('currentLocation', currentLocation);
      let nextRoom = currentLocation[direction];
      $log.log('nextRoom', nextRoom);
      if (nextRoom !== 'wall') {
        this.player.location = nextRoom;
        this.logHistory('You have entered ' + this.player.location);
        return;
      }
      this.logHistory('You hit a wall, dummy.');
    }

    this.monsterInteraction();
  };

  this.monsterInteraction = function(){
    if (this.player.location === this.monster.location){
      this.logHistory('Oh no! You found the monster! And... and... it is ');
    }
  };


  this.logHistory = function(info){
    this.history.push({id: this.history.length, text: `${this.player.name}, ${info}`});
  };
}
