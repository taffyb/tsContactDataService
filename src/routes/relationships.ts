import * as express from 'express';
import {Neo4jSvc} from '../classes/Neo4jSvc';

export const register = ( app: express.Application, prefix: string= '/api' ) => {
    const neo4jSvc = Neo4jSvc.getInstance();
    app.post( prefix + '/relationships', async ( req: any, res ) => {
        const results = await neo4jSvc.executeCypher('addRelationship.cyp', req.body, true);

        res.send(results.relationship);
    });
    app.put( prefix + '/relationships/:uuid', async ( req: any, res ) => {
        const results = await neo4jSvc.executeCypher('updateRelationship.cyp', req.body, true);
        res.send(results.relationship);
    });
    app.delete( prefix + '/relationships/:uuid', async ( req: any, res ) => {
       // remove a relationship by uuid
    });
    app.get( prefix + '/relationships', ( req: any, res ) => {
        console.log(`${JSON.stringify(req.params)}`);
        const types: string[] = req.query.types;
        if (!types) {
            neo4jSvc.executeCypher('getRelationships.cyp', {})
            .then(result => {
                const links = result[0].links;
                res.send(links);
            })
            .catch(err => {console.log(`GET ${prefix}/relationships ${JSON.stringify(err)}`); res.sendStatus(500); });
        } else {
            neo4jSvc.executeCypher('getRelationshipLabels.cyp', {sourceType: types[0], targetType: types[1]})
            .then(result => { res.send(result[0].types); })
            .catch(err => {console.log(`GET ${prefix}/relationships ${JSON.stringify(err)}`); res.sendStatus(500); });
        }
    });
    app.get( prefix + '/relationships/:uuid', ( req: any, res ) => {
        const uuid: string = req.params.uuid;
        neo4jSvc.executeCypher('getRelationship.cyp', {uuid: uuid}, true)
        .then(result => { res.send(result[0].label); })
        .catch(err => {console.log(`GET ${prefix}/relationships ${JSON.stringify(err)}`); res.sendStatus(500); });

    });
};

