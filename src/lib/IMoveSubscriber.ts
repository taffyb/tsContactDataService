import {Move} from './Move';

export interface IMoveSubscriber {
    onNewMoves(move: Move[]): never;
    onUndo(move: Move[]): never;
    onUndoActivePlayer(): never;
}
