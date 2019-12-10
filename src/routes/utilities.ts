import * as express from 'express';
import parse = require('csv-parse');
import {Readable} from 'stream';
import {Neo4jSvc} from '../classes/Neo4jSvc';
import {BaseEntity} from '../classes/BaseEntity';
import {IEntity, IEntityDef, IProperty, IPropertyGroup} from '../classes/interfaces';

export const register = ( app: express.Application, prefix: string= '/api' ) => {
    const neo4jSvc = Neo4jSvc.getInstance();
    app.get( prefix + '/template/:uuid', async ( req: any, res ) => {

        const uuid = req.params.uuid;
        const results = await neo4jSvc.executeCypher('getEntityDef.cyp', {uuid: uuid});
        const entityDef: IEntityDef = results[0].entityDef;
        const entityHeader: string = entityDef.name + ',' + entityDef.uuid;
        let groupHeader = '';
        let propHeader = '';

        for (let i = 0; i < entityDef.groups.length; i++) {
            const g: IPropertyGroup = entityDef.groups[i];
            groupHeader += g.name;
            for (let j = 0; j < g.props.length; j++) {
              const p: IProperty = g.props[j];
              propHeader += (p.label || p.name) + ',';
              groupHeader += ',';
            }
        }
        res.setHeader('Content-Disposition', `filename=${entityDef.name}.csv`);
        res.contentType('application/vnd.ms-excel');
        res.send(entityHeader + '\n' + groupHeader + '\n' + propHeader);
    });
    app.post( prefix + '/template',  ( req: any, res ) => {
        const UUID = 0;
        const file = req.files.file;
        parse(file.data, {
                delimiter: ',',
                trim: true,
                skip_empty_lines: true
                }, async function(err: Error, records: any[]) {
            if (err) {
                res.send(err);
            } else {
                const record: string = records[UUID];
                const defType = record[0];
                const uuid = record[1];
                const keys: string[] = await getEntityTypeKeys(defType, uuid);
                const entities: IEntity[] = recordsToEntityArr(defType, records, keys);
                console.log(`entities:${JSON.stringify(entities)}`);
                Promise.all(addEntities(entities))
                .then(val => {
                    res.send(`POST /template results:${JSON.stringify(val)}`);
                    res.send(val);
                })
                .catch(error => {
                    console.log(`POST /template ERROR:${error}`);
                    res.sendStatus(500);
                });
            }
        });
    });
};
async function getEntityTypeKeys(defType: string, uuid: string): Promise<string[]> {
    const neo4jSvc = Neo4jSvc.getInstance();
    let results;
    const params = {
                    entityDefType: defType,
                    uuid: uuid
                   };
    results = await neo4jSvc.executeCypher('entityDefExists.cyp', params);
    if (results[0].exists) {
        results = await neo4jSvc.executeCypher('getEntityDef.cyp', {uuid: uuid});
        const entityDef: IEntityDef = results[0].entityDef;
        const typeKeys: string[] = [];
        entityDef.groups.forEach(g => {
            g.props.forEach(p => {
                typeKeys.push(p.name);
            });
        });
        return new Promise<string[]>((resolve, reject) => {resolve(typeKeys); });

    } else {
        return new Promise<string[]>((resolve, reject) => {reject([]); });
    }

}

function recordsToEntityArr(entityType: string, records: string[], keys: string[]): IEntity[] {
    const TABS = 1;
    const KEYS = 2;
    const entities: IEntity[] = [];

    records.forEach((row, rowId) => {
        const entity: IEntity = new BaseEntity();
        entity.type = entityType;
        entity.props = [];
        if (rowId > KEYS) {
            keys.forEach((key, i) => {
                if (row[i].length > 0) {
                    entity.props.push({key: key, value: row[i]});
                }
            });
            entities.push(entity);
        }
    });
    return entities;
}

function addEntities(entities: IEntity[]): Promise<string>[] {
    const neo4jSvc = Neo4jSvc.getInstance();
    const promises: Promise<string>[] = [];

    entities.forEach((entity: IEntity, i) => {
        promises.push(
            new Promise((resolve, reject) => {
                neo4jSvc.executeCypher('addEntity.cyp', entity)
                .then((e) => {
                    resolve(`row ${i}: sucess`);
                })
                .catch((err) => {
                    resolve(`row ${i}:${err}`);
                });
             })
         );
    });
    return promises;
}

// function entityExists(entityType:string,uuid:string):boolean{
//    const neo4jSvc = Neo4jSvc.getInstance();
//
// // check that the uuid in the uploaded template matches an Entity Definition for the filename
//    const cypRes = neo4jSvc.executeCypher('entityDefExists.cyp', {uuid: uuid,
//                                                                 entityDefType: entityType});
//    cypRes.then(records=>{return records[0].exists;}).catch(err=>{return false});
//
// }
