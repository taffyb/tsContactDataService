import {IProperty} from './IProperty';

export interface IPropertyGroup {
    name: string;
    order: number;
    properties: IProperty[];
}
