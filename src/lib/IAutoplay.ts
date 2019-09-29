import {Game} from './Game';
import {Move} from './Move';

export interface IAutoplay {
    findNextMove(game: Game): Move;
}
