import {IProp} from './IProp';

export interface IEntity {
    [key: string]: any;
    type: string;
    uuid: string;
    display: string;
    props: IProp[];
}
