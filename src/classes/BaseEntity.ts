import {IEntity, IProp} from './interfaces';

export class BaseEntity implements IEntity {
    type: string;
    uuid: string;
    display: string;
    props: IProp[];

    static fromMap(e: any): IEntity {

        const entity: BaseEntity = new BaseEntity();
        entity.type = e.type;
        entity.uuid = e.uuid;
        entity.display = e.display;
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
    static fromArrays(entityType: string, keys: string[], values: string[]): IEntity {
        const e = new BaseEntity();
        e.type = entityType;
        e.props = [];

        keys.forEach((key, i) => {
            e.props.push({key: key, value: values[i]});
        });

        return e;
    }
}
