import {IEntityDef, IEntity} from './interfaces';
import {Neo4jSvc} from './Neo4jSvc';


export class EntityDefSvc {
    private static neo4jSvc = Neo4jSvc.getInstance();
    private static entityDefs: IEntityDef[];

    static getDisplayString(type: string, e: IEntity): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            let entityDef: IEntityDef;
            if (!this.entityDefs) {
                const result = await EntityDefSvc.neo4jSvc.executeCypher('getEntityDefs.cyp', {});
                this.entityDefs = result[0].entityDefs;
            }

            this.entityDefs.forEach((ed: IEntityDef) => {
                if (ed.name === type) {
                    entityDef = ed;
                }
            });
            const display: string = this.replace(entityDef.display, e);
            resolve(display);
        });
    }
    private static replace(display: string, e: IEntity): string {
        let d = display;
        const regex = /\b(\w[A-Za-z]*)/g;
        const found = display.match(regex);
//        console.log(`display string:${display} regex found:${found.length}`);
        found.forEach((key) => {
//            console.log(`key ${key} e:${JSON.stringify(e)}`);
            d = d.replace(key, e[key]);
        });
//        console.log(`display template:${display} regex found:${found.length} display string:${d}`);
        return d;
    }
}
