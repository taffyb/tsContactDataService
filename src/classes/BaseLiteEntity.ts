import {IEntity} from './interfaces';

export class BaseLiteEntity implements IEntity {
    type: string;
    uuid: string;
    display: string;

    static fromMap(e: any): IEntity {

        const entity: BaseLiteEntity = new BaseLiteEntity();
        entity.type = e.type;
        entity.uuid = e.uuid;
        entity.display = e.display;
        return entity;
    }
}
