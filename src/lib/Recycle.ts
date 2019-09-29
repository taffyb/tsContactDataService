import {TurnEnum} from './Enums';
import {Turn} from './Turn';

export class Recycle extends Turn {
    constructor() {
        super();
        this.type = TurnEnum.RECYCLE;
    }

}
