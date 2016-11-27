import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-game',
  //templateUrl: './game-naval-battle/gameBoard.html'
  template: `
    <my-defend></my-defend>
    <my-attack></my-attack>
  `
})

export class GameComponent { }