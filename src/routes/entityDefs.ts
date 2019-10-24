import * as express from 'express';
import {Neo4jSvc} from '../classes/Neo4jSvc';

export const register = ( app: express.Application, prefix: string= '/api' ) => {
    const neo4jSvc = Neo4jSvc.getInstance();
    app.get( prefix + '/entity-defs/:eduuid', async ( req: any, res ) => {
        const eduuid = req.params.eduuid;
        const results = await neo4jSvc.executeCypher('getEntityDef.cyp', {eduuid: eduuid});

        res.send( results[0].entityDef );
    });
    app.get( prefix + '/entity-defs', async ( req: any, res ) => {
        const results = await neo4jSvc.executeCypher('getEntityDefs.cyp', {}, true);

        res.send( results[0].entityDefs );
    });
    app.post( prefix + '/entity-defs', async ( req: any, res ) => {
        const params = req.body;
        const results = await neo4jSvc.executeCypher('addEntityDef.cyp', params);

        res.send( results[0] );
    });
};
