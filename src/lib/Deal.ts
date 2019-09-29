import {TurnEnum} from './Enums';
import {Turn} from './Turn';

export class Deal extends Turn {
    constructor() {
        super();
        this.type = TurnEnum.DEALER;
    }
}
