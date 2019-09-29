import { v4 as uuid } from 'uuid';

import {PlayerPositionsEnum} from './Enums';
import {CardsEnum} from './Enums';
import {Player} from './Player';

// import {DealerService} from '../services/Dealer.Service';
// import {MovesService} from '../services/Moves.Service';

export class Game {

  constructor() {
      this.guid = uuid();
      this.name = 'New Game';
  }
  public guid: string;
  public name: string;
  public players: Player[] = [];
  public centreStacks: number[][] = [[CardsEnum.NO_CARD], [CardsEnum.NO_CARD], [CardsEnum.NO_CARD], [CardsEnum.NO_CARD]];
  public activePlayer = 0;
  public inPlay = false;
  public recyclePile: number[] = [];
  public gameOver = '';
  public includeJokers = 4; // maximum 4 (per deck)
  public static fromJSON(json: string): Game {
      const game = new Game();
      const jsonGame = JSON.parse(json);

      game.guid = jsonGame.guid;
      game.name = jsonGame.name;
      jsonGame.players.forEach((p: Player) => {game.players.push(Player.fromJSON(JSON.stringify(p))); });
      game.centreStacks = jsonGame.centreStacks;
      game.activePlayer = jsonGame.activePlayer;
      game.inPlay = jsonGame.inPlay;
      game.recyclePile = jsonGame.recyclePile;
      game.includeJokers = jsonGame.includeJokers;
      return game;
  }
  public nextTurn() {
      const gameClone: Game = this.clone();
  }
  public clone(): Game {
      const clone = JSON.parse(JSON.stringify(this));
      return clone;
  }
  public viewTopOfStack(stack: number): number {
      const centreStack: number[] = this.centreStacks[stack];
      let tos: number = centreStack[centreStack.length - 1];
      let j = 0;
      while (tos > CardsEnum.DECK) {
          j++;
          // its a joker
          tos = centreStack[centreStack.length - (1 + j)] + j;
      }
      return tos;
  }
}
