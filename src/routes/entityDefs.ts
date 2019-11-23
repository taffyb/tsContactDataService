import * as express from 'express';
import {Neo4jSvc} from '../classes/Neo4jSvc';

export const register = ( app: express.Application, prefix: string= '/api' ) => {
    const neo4jSvc = Neo4jSvc.getInstance();
    app.get( prefix + '/entity-defs/:uuid', async ( req: any, res ) => {
        const uuid = req.params.uuid;
        const results = await neo4jSvc.executeCypher('getEntityDef.cyp', {uuid: uuid});

        res.send( results[0].entityDef );
    });
    app.delete( prefix + '/entity-defs/:uuid', async ( req: any, res ) => {
        const uuid = req.params.uuid;
        const results = await neo4jSvc.executeCypher('deleteEntityDef.cyp', {uuid: uuid});

        res.send( results[0] );
    });
    app.get( prefix + '/entity-defs', async ( req: any, res ) => {
        const results = await neo4jSvc.executeCypher('getEntityDefs.cyp', {});

        res.send( results[0].entityDefs );
    });
    app.post( prefix + '/entity-defs', async ( req: any, res ) => {
        const params = req.body;
        const results = await neo4jSvc.executeCypher('addEntityDef.cyp', params);

        res.send( results[0] );
    });
};
