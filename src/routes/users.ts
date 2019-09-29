import * as express from 'express';
import {Neo4jSvc} from '../classes/Neo4jSvc';

export const register = ( app: express.Application, prefix: string= '/api' ) => {
    const neo4jSvc = Neo4jSvc.getInstance();
    app.get( prefix + '/users/:uuid', async ( req: any, res ) => {
        const uuid = req.params.uuid;
        const results = await neo4jSvc.executeCypher('getUser.cyp', {uuid: uuid});

        res.send( results[0] );
    });
    app.get( prefix + '/users', async ( req: any, res ) => {
        const results = await neo4jSvc.executeCypher('getUsers.cyp', {});

        res.send( results[0] );
    });
};
