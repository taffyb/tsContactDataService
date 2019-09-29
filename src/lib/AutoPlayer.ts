import {Game} from './Game';
import {IAutoplay} from './IAutoplay';
import {Move} from './Move';
import {Player} from './Player';

export abstract class AutoPlayer extends Player implements IAutoplay {

    constructor() {
        super();
    }
    public abstract findNextMove(game: Game): Move;
}
