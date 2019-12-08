import * as express from 'express';
import {Neo4jSvc} from '../classes/Neo4jSvc';
import {BaseEntity} from '../classes/BaseEntity';
import {IEntity} from '../classes/IEntity';
import {IEntityDef} from '../classes/IEntityDef';
import {EntityDefSvc} from '../classes/EntityDefSvc';

export const register = ( app: express.Application, prefix: string= '/api' ) => {
    const neo4jSvc = Neo4jSvc.getInstance();
    app.post( prefix + '/relationships', async ( req: any, res ) => {
        // add a new relationship
        // body= {euuid1,type,euuid2}
    });
    app.delete( prefix + '/relationships/:uuid', async ( req: any, res ) => {
       // remove a relationship by uuid
    });
    app.get( prefix + '/relationships', ( req: any, res ) => {
        console.log(`${JSON.stringify(req.params)}`);
        const types: string[] = req.query.types;
        if (!types) {
            neo4jSvc.executeCypher('getRelationships.cyp', {})
            .then(result => { res.send(result[0].links); })
            .catch(err => {console.log(`GET ${prefix}/relationships ${JSON.stringify(err)}`); res.sendStatus(500); });
        } else {
            neo4jSvc.executeCypher('getRelationshipLabels.cyp', {sourceType: types[0], targetType: types[1]})
            .then(result => { res.send(result[0].types); })
            .catch(err => {console.log(`GET ${prefix}/relationships ${JSON.stringify(err)}`); res.sendStatus(500); });
        }
    });
    app.get( prefix + '/relationships/:uuid/:source/:target', ( req: any, res ) => {
        const uuid: string = req.params.uuid;
        const source: string = req.params.source;
        const target: string = req.params.target;
    neo4jSvc.executeCypher('getRelationship.cyp', {source: source, target: target, uuid: uuid}, true)
    .then(result => { res.send(result[0].label); })
    .catch(err => {console.log(`GET ${prefix}/relationships ${JSON.stringify(err)}`); res.sendStatus(500); });

    });
};

