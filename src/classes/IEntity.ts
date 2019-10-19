import {IProp} from './IProp';

export interface IEntity {
    type: string;
    uuid: string;
    props: IProp[];
}
