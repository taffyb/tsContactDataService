import * as express from 'express';
import parse = require('csv-parse');
import {Readable} from 'stream';
import {Neo4jSvc} from '../classes/Neo4jSvc';
import {BaseEntity} from '../classes/BaseEntity';
import {IEntity} from '../classes/IEntity';
import {IEntityDef} from '../classes/IEntityDef';
import {IProperty} from '../classes/IProperty';
import {IPropertyGroup} from '../classes/IPropertyGroup';

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
//    app.post( prefix + '/template', async ( req: any, res ) => {
//        const UUID = 0;
//        const TABS = 1;
//        const KEYS = 2;
//        const file = req.files.file;
//        let cypRes;
//        const results: Promise<String>[] = [];
//
//        if (file.name.endsWith('.csv')) {
//            const buf = new Buffer(file.data);
//
//            const rows = buf.toString().split('\n');
//            const type = rows[UUID].split(',')[0];
//            console.log(`POST /template rows[${rows.length}]`);
//
//            // check that the uuid in the uploaded template matches an Entity Definition for the filename
//            cypRes = await neo4jSvc.executeCypher('entityDefExists.cyp', {uuid: rows[UUID].split(',')[1],
//                                                                         entityDefType: type});
//
//            console.log(`POST /template EntityDef Exists :${cypRes[0].exists}`);
//
//            if (cypRes[0].exists) {
//                // ignore the 2 header rows
//                // split the 3rd row into an array of keys
//                const keys = rows[KEYS].split(',');
//                let entity: IEntity;
//                let values: string[];
//
//                // for each row create a new BaseEntity
//                for (let rowId = KEYS + 1; rowId < rows.length; rowId++) {
//                    if (rows[rowId].length > 0) {
//                        values = rows[rowId].split(',');
//                        entity = new BaseEntity;
//                        entity.type = type;
//                        entity.props = [];
//                        console.log(`row[${rowId}]\n${rows[rowId]}\n${JSON.stringify(values)}`);
//                        for (let i = 0; i < keys.length; i++) {
//                            entity.props.push({key: keys[i], value: values[i]});
//                        }
//                        console.log(`POST /template entity[${rowId}] ${JSON.stringify(entity)}`);
//                        results.push(
//                           new Promise((resolve, reject) => {
//                               neo4jSvc.executeCypher('addEntity.cyp', entity)
//                                   .then((e) => {
//                                       resolve(`row ${rowId}: ${JSON.stringify(e)}`);
//                                   })
//                                   .catch((err) => {
//                                       resolve(`row x:${err}`);
//                                   });
//                              })
//                        );
//                    }
//                }
//
//              Promise.all(results)
//                  .then(val => {
//                      res.send(`POST /template results:${JSON.stringify(val)}`);
//                  })
//                  .catch(err => {
//                      console.log(`POST /template ERROR:${err}`);
//                      res.sendStatus(500);
//                  });
//
//            } else {
//                res.sendStatus(500);
//            }
//        } else {
//            res.sendStatus(500);
//        }
//
//    });
    app.post( prefix + '/template', async ( req: any, res ) => {
        const file = req.files.file;
        parse(file.data, {
                delimiter: ',',
                trim: true,
                skip_empty_lines: true
                }, function(err: Error, records: any[]) {
            if (err) {
                res.send(err);
            } else {
                // If EntityTypeDef exists
                const entities: IEntity[] = recordsToEntityArr(records);
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

function recordsToEntityArr(records: any[]): IEntity[] {
    const UUID = 0;
    const TABS = 1;
    const KEYS = 2;
    const keys: string[] = records[KEYS];
    const entityType: string = records[UUID][0];
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
