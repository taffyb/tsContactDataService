import {IEntity} from './IEntity';
import {IProp} from './IProp';

export class BaseEntity implements IEntity {
    type: string;
    uuid: string;
    props: IProp[];

    static fromMap(e: any): IEntity {

        const entity: BaseEntity = new BaseEntity();
        entity.type = e.type;
        entity.uuid = e.uuid;
        entity.props = [];

        let key: string;
        for (key in e) {
            if (!(key === 'uuid' || key === 'type') ) {
                const value: string = e[key];
                if (value.length > 0) {
                    entity.props.push({key: key, value: value});
                }
            }
        }
        return entity;
    }
}
