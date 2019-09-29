import { v4 as uuid } from 'uuid';
import {TurnEnum} from './Enums';
import {Move} from './Move';

export class Turn {
  public moves: Move[] = [];
  protected type: number = TurnEnum.PLAYER;
  private guid: string;

  constructor() {
      this.guid = uuid();
  }
}
